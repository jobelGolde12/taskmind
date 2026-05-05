import {
  getAIEngineErrorMessage,
  parseAnalysisResponse,
  validateAnalysisText,
} from '@/lib/ai-engine';
import { ANALYSIS_PROMPT, SYSTEM_PROMPT } from '@/lib/prompts';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = 'openrouter/free';
const UPSTREAM_ERROR_MESSAGE =
  'Task analysis is temporarily unavailable. Please try again shortly.';

type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { text?: unknown };
    const text = typeof body.text === 'string' ? body.text : '';

    const validationError = validateAnalysisText(text);
    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    const apiKey = process.env.OPEN_ROUTER_API_KEY;
    if (!apiKey) {
      console.error('Missing OPEN_ROUTER_API_KEY environment variable.');
      return Response.json({ error: UPSTREAM_ERROR_MESSAGE }, { status: 500 });
    }

    const upstreamResponse = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: ANALYSIS_PROMPT.replace('{{TEXT}}', text) },
        ],
        temperature: 0.3,
        max_tokens: 2048,
      }),
    });

    if (!upstreamResponse.ok) {
      const upstreamBody = await upstreamResponse.text();
      console.error('OpenRouter request failed:', upstreamResponse.status, upstreamBody);
      return Response.json({ error: UPSTREAM_ERROR_MESSAGE }, { status: 502 });
    }

    const data = (await upstreamResponse.json()) as OpenRouterResponse;
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('OpenRouter returned no message content:', data);
      return Response.json({ error: UPSTREAM_ERROR_MESSAGE }, { status: 502 });
    }

    return Response.json(parseAnalysisResponse(content));
  } catch (error) {
    console.error('Analyze API failed:', error);
    return Response.json(
      { error: getAIEngineErrorMessage(error) },
      { status: 500 }
    );
  }
}
