# AI Architecture

How TaskMind AI's browser-based AI engine works.

## Overview

TaskMind AI uses **WebLLM** to run large language models directly in the browser. This means:

- ✅ **No API calls** - Everything runs locally
- ✅ **Complete privacy** - Your text never leaves your browser
- ✅ **Offline capable** - Works after initial model download
- ✅ **No costs** - Free to use indefinitely

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   User Input Text                        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Text Cleaner                           │
│  - Remove signatures, headers, quotes                   │
│  - Normalize whitespace                                 │
│  - Detect language                                      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  AI Prompt Engine                        │
│  - System prompt (role definition)                      │
│  - Analysis prompt (task extraction)                    │
│  - JSON output format                                   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   WebLLM Engine                          │
│  - Llama-3.2-1B-Instruct model                          │
│  - Runs in browser via WebAssembly                      │
│  - Temperature: 0.3 (focused output)                    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                Response Parser                           │
│  - Extract JSON from response                           │
│  - Validate and normalize data                          │
│  - Handle errors gracefully                             │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Output Structure                        │
│  - Tasks with urgency scores                            │
│  - Deadlines with dates                                 │
│  - Decisions identified                                 │
│  - Confusion items flagged                              │
└─────────────────────────────────────────────────────────┘
```

## AI Engine Implementation

### Initialization

```typescript
// lib/ai-engine.ts
import * as webllm from '@mlc-ai/web-llm';

class AIEngine {
  private engine: webllm.MLCEngine | null = null;

  async initialize(config: EngineConfig = {}) {
    const modelId = config.modelId || 'Llama-3.2-1B-Instruct-q4f32_1-MLC';
    
    this.engine = await webllm.CreateMLCEngine(modelId, {
      initProgressCallback: config.initProgressCallback,
    });
  }
}
```

### Text Analysis

```typescript
async analyze(text: string): Promise<AnalysisResult> {
  const prompt = ANALYSIS_PROMPT.replace('{{TEXT}}', text);
  
  const response = await this.engine.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ],
    temperature: 0.3,
    max_tokens: 2048,
  });

  return this.parseResponse(response.choices[0].message.content);
}
```

## Prompt Engineering

### System Prompt

Defines the AI's role and output format:

```typescript
export const SYSTEM_PROMPT = `You are TaskMind AI, an advanced action and decision intelligence assistant.
Your purpose is to analyze text and extract:
1. Clear, actionable tasks
2. Deadlines with specific dates/times
3. Urgency levels based on context
4. Decisions made or needed
5. Confusing or unclear items

You MUST respond ONLY with valid JSON in this exact format:
{
  "summary": "Brief summary",
  "tasks": [...],
  "decisions": [...],
  "confusionItems": [...],
  "language": "en|fil"
}`;
```

### Analysis Prompt

Instructions for text analysis:

```typescript
export const ANALYSIS_PROMPT = `Analyze the following text and extract all action items, deadlines, decisions, and unclear points.

Rules:
- Extract EVERY action item, no matter how small
- Convert vague time references to specific dates
- Calculate urgency based on: deadline proximity, importance keywords, consequences
- Identify any ambiguous or confusing statements
- Keep task descriptions clear and actionable (start with verbs)

Text to analyze:
"""
{{TEXT}}
"""

Respond with valid JSON only.`;
```

## Output Structure

### Analysis Result

```typescript
interface AnalysisResult {
  summary: string;
  tasks: Task[];
  decisions: Decision[];
  confusionItems: ConfusionItem[];
  language: 'en' | 'fil';
}
```

### Task Structure

```typescript
interface Task {
  content: string;              // "Prepare the Q4 report"
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  urgencyScore: number;         // 0-100
  deadline: string | null;      // ISO date or null
  deadlineDisplay: string | null; // "Tomorrow, 3:00 PM"
  category: 'work' | 'personal' | 'meeting' | 'email' | 'document' | 'other';
}
```

## Urgency Scoring

### Scoring Algorithm

```typescript
// Urgency Score Guidelines
90-100: Critical - Today/tomorrow, emergencies, "ASAP"
70-89:  High    - This week, important meetings, boss requests
40-69:  Medium  - Next week, routine tasks, internal deadlines
0-39:   Low     - Someday, no deadline, nice-to-have
```

### Keyword Detection

```typescript
const urgencyKeywords = {
  critical: ['ASAP', 'urgent', 'emergency', 'immediately', 'today'],
  high: ['tomorrow', 'this week', 'important', 'priority', 'deadline'],
  medium: ['next week', 'soon', 'when possible', 'consider'],
  low: ['someday', 'maybe', 'optional', 'no rush'],
};
```

## Date Parsing

### Natural Language Processing

The AI converts natural language to dates:

| Input | Output |
|-------|--------|
| "tomorrow at 3pm" | 2024-01-15 15:00 |
| "next Friday" | 2024-01-19 09:00 |
| "by end of week" | 2024-01-19 17:00 |
| "in 2 days" | 2024-01-17 00:00 |
| "Q4" | 2024-10-01 00:00 |

### Implementation

```typescript
// utils/dateParser.ts
export function parseNaturalDate(
  expression: string,
  referenceDate: Date = new Date()
): ParsedDate {
  const normalized = expression.toLowerCase().trim();
  
  if (normalized.includes('tomorrow')) {
    const date = addDays(referenceDate, 1);
    return createDate(expression, date, 0.95);
  }
  
  // ... more patterns
}
```

## Response Parsing

### JSON Extraction

```typescript
private parseResponse(content: string): AnalysisResult {
  // Extract JSON from response (handles extra text)
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  const jsonString = jsonMatch ? jsonMatch[0] : content;
  
  const parsed = JSON.parse(jsonString);
  
  // Validate and normalize
  return {
    summary: parsed.summary || 'No summary available',
    tasks: parsed.tasks.map(this.normalizeTask),
    decisions: parsed.decisions || [],
    confusionItems: parsed.confusionItems || [],
    language: parsed.language === 'fil' ? 'fil' : 'en',
  };
}
```

### Error Handling

```typescript
try {
  const parsed = JSON.parse(jsonString);
  return normalizedResult;
} catch (parseError) {
  // Fallback result on parse failure
  return {
    summary: 'Unable to parse response. Please try again.',
    tasks: [],
    decisions: [],
    confusionItems: [{
      item: 'Failed to parse AI response',
      suggestion: 'Please rephrase your text or try again',
    }],
    language: 'en',
  };
}
```

## Model Information

### Default Model: Llama-3.2-1B-Instruct

| Property | Value |
|----------|-------|
| Parameters | 1.3 billion |
| Quantization | q4f32_1 (4-bit) |
| Size | ~800MB download |
| RAM Usage | ~2GB |
| Speed | ~10-20 tokens/sec |

### Alternative Models

```typescript
// Larger, more accurate (slower)
'Llama-3.2-3B-Instruct-q4f32_1-MLC'

// Balanced performance
'Mistral-7B-Instruct-v0.3-q4f16_1-MLC'

// Fast, smaller (less accurate)
'Phi-3-mini-4k-instruct-q4f16_1-MLC'
```

## Performance

### Loading Times

| Phase | Time |
|-------|------|
| Model Download | 10-30s (first time) |
| Model Initialization | 5-15s |
| Analysis (500 chars) | 2-5s |
| Analysis (2000 chars) | 5-10s |

### Optimization Tips

1. **Cache the model** - Browser caches after first download
2. **Use smaller models** - Faster but less accurate
3. **Limit input length** - Shorter text = faster analysis
4. **Lower temperature** - More focused, faster convergence

## Multi-Language Support

### Supported Languages

- **English (en)** - Default
- **Filipino (fil)** - Tagalog support

### Language Detection

```typescript
function detectLanguage(text: string): 'en' | 'fil' {
  const filipinoWords = ['ang', 'ng', 'sa', 'mga', 'na', 'ay'];
  
  const matchCount = filipinoWords.filter(word => 
    text.toLowerCase().includes(word)
  ).length;
  
  return matchCount > 5 ? 'fil' : 'en';
}
```

## Security Considerations

### Privacy Guarantees

1. **No data transmission** - All processing is local
2. **No logging** - No analytics or tracking
3. **No persistence** - Text not stored unless user saves
4. **Sandboxed** - Browser security model

### Limitations

1. **Model integrity** - Models loaded from CDN
2. **Browser security** - Depends on browser implementation
3. **Local storage** - Saved data in browser storage

## Future Enhancements

Planned AI improvements:

- [ ] **Fine-tuned model** - Custom trained for task extraction
- [ ] **OCR integration** - Extract text from images
- [ ] **Voice input** - Speech-to-text processing
- [ ] **Learning mode** - Improve from user edits
- [ ] **Multi-step workflows** - Complex task chains

---

**Want to contribute?** See the [Development Guide](./DEVELOPMENT.md)
