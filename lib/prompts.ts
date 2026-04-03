/**
 * AI Prompt Engineering for TaskMind AI
 * Core prompts for action extraction, deadline detection, urgency scoring, and confusion detection
 */

export const SYSTEM_PROMPT = `You are TaskMind AI, an advanced action and decision intelligence assistant.
Your purpose is to analyze text (emails, messages, announcements) and extract:
1. Clear, actionable tasks
2. Deadlines with specific dates/times
3. Urgency levels based on context
4. Decisions made or needed
5. Confusing or unclear items that need clarification

You MUST respond ONLY with valid JSON in this exact format:
{
  "summary": "Brief 1-2 sentence summary of the text",
  "tasks": [
    {
      "content": "Clear, actionable task description",
      "urgencyLevel": "low|medium|high|critical",
      "urgencyScore": 0-100,
      "deadline": "YYYY-MM-DD HH:mm or null if not specified",
      "deadlineDisplay": "Human-readable deadline (e.g., 'Tomorrow, 3:00 PM') or null",
      "category": "work|personal|meeting|email|document|other"
    }
  ],
  "decisions": [
    {
      "content": "Decision that was made or needs to be made",
      "stakeholders": "People involved or null"
    }
  ],
  "confusionItems": [
    {
      "item": "Unclear or ambiguous item",
      "suggestion": "Question to clarify or null"
    }
  ],
  "language": "en|fil"
}`;

export const ANALYSIS_PROMPT = `Analyze the following text and extract all action items, deadlines, decisions, and unclear points.

Rules:
- Extract EVERY action item, no matter how small
- Convert vague time references to specific dates (assume current year if not specified)
- Calculate urgency based on: deadline proximity, importance keywords, consequences
- Identify any ambiguous or confusing statements
- Keep task descriptions clear and actionable (start with verbs)
- If no tasks/decisions/confusion found, return empty arrays

Text to analyze:
"""
{{TEXT}}
"""

Respond with valid JSON only.`;

export const URGENCY_SCORING_GUIDELINES = `
Urgency Score Guidelines:
- 90-100 (critical): Today/tomorrow deadlines, emergencies, "ASAP", "urgent", "immediately"
- 70-89 (high): This week, important meetings, boss/client requests, external deadlines
- 40-69 (medium): Next week, routine tasks, internal deadlines, follow-ups
- 0-39 (low): Someday/maybe, no deadline, nice-to-have, informational

Urgency Keywords to detect:
- Critical: ASAP, urgent, emergency, immediately, today, right now, critical
- High: tomorrow, this week, important, priority, deadline, must, should
- Medium: next week, soon, when possible, consider, review
- Low: someday, maybe, optional, no rush, whenever
`;

export const DATE_PARSING_PROMPT = `Convert the following time expressions to specific dates.
Current date reference: {{CURRENT_DATE}}

Examples:
- "tomorrow at 3pm" → "YYYY-MM-DD 15:00"
- "next Friday" → "YYYY-MM-DD 09:00" (assume 9 AM for business)
- "by end of week" → "YYYY-MM-DD 17:00" (Friday 5 PM)
- "in 2 days" → "YYYY-MM-DD 00:00"
- "next month" → "YYYY-MM-01 00:00" (first of next month)
- "Q4" → "YYYY-10-01 00:00" (start of Q4)

Time expressions to convert:
{{TIME_EXPRESSIONS}}

Respond with JSON array: [{"original": "expression", "converted": "YYYY-MM-DD HH:mm", "display": "Human readable"}]`;

export const CLARIFICATION_PROMPT = `Identify unclear or ambiguous items in the following text that need clarification.

Look for:
- Vague references ("soon", "later", "some people")
- Missing information (no deadline, no owner, no specifics)
- Contradictory statements
- Unclear responsibilities
- Missing context or dependencies

Text:
"""
{{TEXT}}
"""

For each unclear item, suggest a specific question that would clarify it.
Respond with JSON: [{"item": "unclear item", "suggestion": "clarifying question"}]`;

export const MULTI_LANGUAGE_PROMPT = `Detect the primary language of the text and respond in the same language.
Supported languages: English (en), Filipino (fil)

If text is mixed, use the dominant language.
If unsure, default to English.

Text:
"""
{{TEXT}}
"""

Respond with: {"language": "en|fil", "confidence": 0-1}`;

export const REFINEMENT_PROMPT = `The user has edited the following extracted tasks. 
Learn from these edits to improve future extractions.

Original AI extraction:
{{ORIGINAL}}

User's edited version:
{{EDITED}}

What patterns or preferences should be noted for future extractions?
Respond with JSON: {"preferences": ["preference1", "preference2"], "notes": "summary"}`;
