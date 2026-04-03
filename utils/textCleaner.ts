/**
 * Text cleaning utilities for TaskMind AI
 * Prepares text for AI analysis
 */

export interface CleanedText {
  original: string;
  cleaned: string;
  removedCount: number;
  isTooShort: boolean;
  language?: 'en' | 'fil' | 'unknown';
}

/**
 * Clean and normalize text for AI processing
 */
export function cleanText(text: string): CleanedText {
  if (!text || typeof text !== 'string') {
    return {
      original: text || '',
      cleaned: '',
      removedCount: 0,
      isTooShort: true,
    };
  }

  let cleaned = text;
  let removedCount = 0;

  // Remove excessive whitespace
  cleaned = normalizeWhitespace(cleaned);

  // Remove email signatures (common patterns)
  const signaturePatterns = [
    /(--\s*\n.*)$/i,
    /(\nBest regards,?\n.*)$/i,
    /(\nSincerely,?\n.*)$/i,
    /(\nThanks,?\n.*)$/i,
    /(\nRegards,?\n.*)$/i,
  ];

  for (const pattern of signaturePatterns) {
    const match = cleaned.match(pattern);
    if (match) {
      cleaned = cleaned.replace(pattern, '');
      removedCount++;
    }
  }

  // Remove email headers (From:, Sent:, To:, Subject:)
  const headerPattern = /^(From:.*?\n|Sent:.*?\n|To:.*?\n|Subject:.*?\n)+/i;
  const headerMatch = cleaned.match(headerPattern);
  if (headerMatch) {
    cleaned = cleaned.replace(headerPattern, '');
    removedCount++;
  }

  // Remove quoted replies (common in emails)
  cleaned = removeQuotedReplies(cleaned);

  // Remove HTML tags if present
  cleaned = removeHtmlTags(cleaned);

  // Remove URLs (keep the text but remove the URL)
  cleaned = simplifyUrls(cleaned);

  // Normalize punctuation
  cleaned = normalizePunctuation(cleaned);

  // Trim and ensure minimum length
  cleaned = cleaned.trim();

  return {
    original: text,
    cleaned,
    removedCount,
    isTooShort: cleaned.length < 10,
    language: detectLanguage(cleaned),
  };
}

function normalizeWhitespace(text: string): string {
  // Replace multiple spaces/tabs with single space
  text = text.replace(/[ \t]+/g, ' ');
  
  // Replace multiple newlines with double newline
  text = text.replace(/\n\s*\n/g, '\n\n');
  
  // Remove trailing whitespace from lines
  text = text.split('\n').map(line => line.trimEnd()).join('\n');
  
  return text;
}

function removeQuotedReplies(text: string): string {
  // Remove "On [date], [person] wrote:" patterns
  text = text.replace(/^On\s+.*?wrote:\s*/i, '');
  
  // Remove lines starting with > (email quotes)
  const lines = text.split('\n');
  const filteredLines = lines.filter(line => !line.trim().startsWith('>'));
  
  return filteredLines.join('\n');
}

function removeHtmlTags(text: string): string {
  // Simple HTML tag removal
  return text.replace(/<[^>]*>/g, '');
}

function simplifyUrls(text: string): string {
  // Replace URLs with placeholder
  return text.replace(/https?:\/\/\S+/g, '[link]');
}

function normalizePunctuation(text: string): string {
  // Replace multiple punctuation marks with single
  text = text.replace(/([.!?])\1+/g, '$1');
  text = text.replace(/,+/g, ',');
  
  // Ensure space after punctuation
  text = text.replace(/([.!?])([A-Z])/g, '$1 $2');
  
  return text;
}

function detectLanguage(text: string): 'en' | 'fil' | 'unknown' {
  const lowerText = text.toLowerCase();
  
  // Filipino common words
  const filipinoWords = [
    'ang', 'ng', 'sa', 'mga', 'na', 'ay', 'ito', 'yan', 'yon',
    'ako', 'ikaw', 'siya', 'kami', 'kayo', 'sila',
    'at', 'o', 'pero', 'kasi', 'kapag', 'kung',
    'para', 'tungkol', 'tungkol', 'gamit', 'bilang',
    'magandang', 'salamat', 'paalam', 'kamusta',
    'buong', 'araw', 'gabi', 'umaga', 'hapon',
  ];
  
  let filipinoCount = 0;
  const words = lowerText.split(/\s+/);
  
  for (const word of words) {
    if (filipinoWords.includes(word)) {
      filipinoCount++;
    }
  }
  
  // If more than 5% of words are Filipino, classify as Filipino
  const filipinoRatio = filipinoCount / words.length;
  
  if (filipinoRatio > 0.05) {
    return 'fil';
  }
  
  // Default to English
  return 'en';
}

/**
 * Split text into sentences
 */
export function splitIntoSentences(text: string): string[] {
  // Split on common sentence endings
  const sentences = text
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  return sentences;
}

/**
 * Extract key information from text
 */
export function extractKeyInfo(text: string): {
  people: string[];
  dates: string[];
  actions: string[];
} {
  const people: string[] = [];
  const dates: string[] = [];
  const actions: string[] = [];
  
  // Extract names (capitalized words after common prefixes)
  const namePatterns = [
    /\b(to|from|cc|for)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi,
    /\b([A-Z][a-z]+)\s+([A-Z][a-z]+)/g,
  ];
  
  for (const pattern of namePatterns) {
    const matches = text.match(pattern);
    if (matches) {
      people.push(...matches.map(m => m.replace(/^(to|from|cc|for)\s+/i, '').trim()));
    }
  }
  
  // Extract date-like patterns
  const datePatterns = [
    /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g,
    /\b\d{1,2}-\d{1,2}-\d{2,4}\b/g,
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s*\d{4}?/gi,
    /\b(today|tomorrow|yesterday|next\s+week|next\s+month)\b/gi,
  ];
  
  for (const pattern of datePatterns) {
    const matches = text.match(pattern);
    if (matches) {
      dates.push(...matches);
    }
  }
  
  // Extract action verbs (simplified)
  const actionPatterns = [
    /\b(please|must|should|need\s+to|have\s+to)\s+(\w+)/gi,
    /\b(send|submit|complete|finish|prepare|review|attend|schedule|call|email|write|create)\b/gi,
  ];
  
  for (const pattern of actionPatterns) {
    const matches = text.match(pattern);
    if (matches) {
      actions.push(...matches);
    }
  }
  
  return {
    people: [...new Set(people)],
    dates: [...new Set(dates)],
    actions: [...new Set(actions)],
  };
}

/**
 * Calculate text statistics
 */
export function getTextStats(text: string): {
  characterCount: number;
  wordCount: number;
  sentenceCount: number;
  estimatedReadTime: number; // in seconds
} {
  const characterCount = text.length;
  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const estimatedReadTime = Math.ceil(wordCount / 4); // ~250 words per minute
  
  return {
    characterCount,
    wordCount,
    sentenceCount,
    estimatedReadTime,
  };
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number, ellipsis = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  // Try to cut at word boundary
  const truncated = text.slice(0, maxLength - ellipsis.length);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.5) {
    return truncated.slice(0, lastSpace) + ellipsis;
  }
  
  return truncated + ellipsis;
}

/**
 * Check if text appears to be an email
 */
export function isEmail(text: string): boolean {
  const emailIndicators = [
    /^from:/i,
    /^sent:/i,
    /^to:/i,
    /^subject:/i,
    /on\s+.*?\s+wrote:/i,
    /best\s+regards/i,
    /sincerely/i,
  ];
  
  return emailIndicators.some(pattern => pattern.test(text));
}

/**
 * Check if text appears to be a meeting announcement
 */
export function isMeetingAnnouncement(text: string): boolean {
  const meetingIndicators = [
    /\bmeeting\b/i,
    /\bscheduled\b/i,
    /\bcalendar\b/i,
    /\binvite\b/i,
    /\battend\b/i,
    /\bconference\b/i,
    /\bzoom\b/i,
    /\bteams\b/i,
    /\bgoogle\s+meet\b/i,
  ];
  
  const matchCount = meetingIndicators.filter(pattern => pattern.test(text)).length;
  return matchCount >= 2;
}
