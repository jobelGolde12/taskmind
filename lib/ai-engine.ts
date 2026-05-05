/**
 * Shared AI analysis utilities and client API wrapper
 */

export interface AnalysisResult {
  summary: string;
  tasks: Task[];
  decisions: Decision[];
  confusionItems: ConfusionItem[];
  language: 'en' | 'fil';
}

export interface Task {
  content: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  urgencyScore: number;
  deadline: string | null;
  deadlineDisplay: string | null;
  category: 'work' | 'personal' | 'meeting' | 'email' | 'document' | 'other';
}

export interface Decision {
  content: string;
  stakeholders: string | null;
}

export interface ConfusionItem {
  item: string;
  suggestion: string | null;
}

const ANALYSIS_ERROR_MESSAGE =
  'Analysis is unavailable right now. Please try again in a moment.';

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return '';
}

export function validateAnalysisText(text: string): string | null {
  const trimmed = text.trim();

  if (!trimmed) {
    return 'Please enter some text to analyze';
  }

  if (trimmed.length < 10) {
    return 'Please enter more text (at least 10 characters)';
  }

  if (trimmed.length > 50000) {
    return 'Text is too long. Please limit to 50,000 characters for optimal performance.';
  }

  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  if (wordCount < 3) {
    return 'Please enter more meaningful text (at least 3 words)';
  }

  return null;
}

export function getAIEngineErrorMessage(error: unknown): string {
  const message = extractErrorMessage(error);

  if (!message) {
    return ANALYSIS_ERROR_MESSAGE;
  }

  return message;
}

function validateUrgencyLevel(level: string): Task['urgencyLevel'] {
  const validLevels = ['low', 'medium', 'high', 'critical'];
  if (validLevels.includes(level)) {
    return level as Task['urgencyLevel'];
  }
  return 'medium';
}

function clampUrgencyScore(score: number): number {
  if (typeof score !== 'number') {
    return 50;
  }

  return Math.max(0, Math.min(100, score));
}

function validateCategory(category: string): Task['category'] {
  const validCategories = ['work', 'personal', 'meeting', 'email', 'document', 'other'];
  if (validCategories.includes(category)) {
    return category as Task['category'];
  }
  return 'other';
}

function normalizeTask(task: Record<string, unknown>): Task {
  return {
    content: (task.content as string) || 'Unnamed task',
    urgencyLevel: validateUrgencyLevel(task.urgencyLevel as string),
    urgencyScore: clampUrgencyScore(task.urgencyScore as number),
    deadline: (task.deadline as string) || null,
    deadlineDisplay: (task.deadlineDisplay as string) || null,
    category: validateCategory(task.category as string),
  };
}

export function parseAnalysisResponse(content: string): AnalysisResult {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : content;
    const parsed = JSON.parse(jsonString);

    return {
      summary: parsed.summary || 'No summary available',
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks.map(normalizeTask) : [],
      decisions: Array.isArray(parsed.decisions) ? parsed.decisions : [],
      confusionItems: Array.isArray(parsed.confusionItems) ? parsed.confusionItems : [],
      language: parsed.language === 'fil' ? 'fil' : 'en',
    };
  } catch (parseError) {
    console.error('Failed to parse AI response:', parseError);
    console.log('Raw response:', content);

    return {
      summary: 'Unable to parse response. Please try again.',
      tasks: [],
      decisions: [],
      confusionItems: [
        {
          item: 'Failed to parse AI response',
          suggestion: 'Please rephrase your text or try again',
        },
      ],
      language: 'en',
    };
  }
}

export async function analyzeText(text: string): Promise<AnalysisResult> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    let errorMessage = ANALYSIS_ERROR_MESSAGE;

    try {
      const errorBody = (await response.json()) as { error?: string };
      if (errorBody.error) {
        errorMessage = errorBody.error;
      }
    } catch (parseError) {
      console.error('Failed to parse analyze API error response:', parseError);
    }

    throw new Error(errorMessage);
  }

  return (await response.json()) as AnalysisResult;
}
