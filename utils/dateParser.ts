/**
 * Date parsing utilities for TaskMind AI
 * Converts natural language time expressions to specific dates
 */

import { format, addDays, startOfMonth } from 'date-fns';

export interface ParsedDate {
  original: string;
  iso: string | null;
  display: string;
  confidence: number;
}

/**
 * Parse natural language time expressions
 */
export function parseNaturalDate(expression: string, referenceDate: Date = new Date()): ParsedDate {
  const normalized = expression.toLowerCase().trim();

  // Try direct parsing first
  const directDate = new Date(expression);
  if (!isNaN(directDate.getTime())) {
    return {
      original: expression,
      iso: directDate.toISOString(),
      display: formatDisplayDate(directDate),
      confidence: 0.9,
    };
  }

  // Handle relative expressions
  if (normalized.includes('tomorrow')) {
    const date = addDays(referenceDate, 1);
    const time = extractTime(normalized);
    return createDate(expression, setTime(date, time), 0.95);
  }

  if (normalized.includes('today')) {
    const time = extractTime(normalized);
    return createDate(expression, setTime(new Date(), time), 0.95);
  }

  if (normalized.includes('yesterday')) {
    const date = addDays(referenceDate, -1);
    const time = extractTime(normalized);
    return createDate(expression, setTime(date, time), 0.95);
  }

  // Handle "next" expressions
  if (normalized.startsWith('next ')) {
    return parseNextExpression(normalized, referenceDate);
  }

  // Handle "in X days/weeks"
  const inMatch = normalized.match(/in\s+(\d+)\s*(day|week|month|hour)s?/);
  if (inMatch) {
    const [, amount, unit] = inMatch;
    const date = addUnits(referenceDate, parseInt(amount), unit);
    return createDate(expression, date, 0.85);
  }

  // Handle "by end of" expressions
  if (normalized.includes('end of')) {
    return parseEndOfExpression(normalized, referenceDate);
  }

  // Handle "beginning/start of" expressions
  if (normalized.includes('beginning of') || normalized.includes('start of')) {
    return parseStartOfExpression(normalized, referenceDate);
  }

  // Handle quarter expressions (Q1, Q2, Q3, Q4)
  const quarterMatch = normalized.match(/q([1-4])\s*(\d{4})?/);
  if (quarterMatch) {
    return parseQuarterExpression(quarterMatch, referenceDate);
  }

  // Handle "within X days"
  const withinMatch = normalized.match(/within\s+(\d+)\s*days?/);
  if (withinMatch) {
    const days = parseInt(withinMatch[1]);
    const date = addDays(referenceDate, days);
    return createDate(expression, date, 0.8);
  }

  // Handle weekday names
  const weekdayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const weekdayIndex = weekdayNames.findIndex((name) => normalized.includes(name));
  if (weekdayIndex !== -1) {
    return parseWeekdayExpression(weekdayIndex, referenceDate, normalized);
  }

  // Unable to parse - return null result
  return {
    original: expression,
    iso: null,
    display: expression,
    confidence: 0,
  };
}

function formatDisplayDate(date: Date): string {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const yesterday = addDays(today, -1);

  const isToday = isSameDay(date, today);
  const isTomorrow = isSameDay(date, tomorrow);
  const isYesterday = isSameDay(date, yesterday);

  const timeStr = format(date, 'h:mm a');
  const dayStr = format(date, 'EEEE');

  if (isToday) {
    return `Today, ${timeStr}`;
  }
  if (isTomorrow) {
    return `Tomorrow, ${timeStr}`;
  }
  if (isYesterday) {
    return `Yesterday, ${timeStr}`;
  }

  // If within 7 days, show day name
  const diffDays = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays > 0 && diffDays <= 7) {
    return `${dayStr}, ${timeStr}`;
  }

  return format(date, 'MMM d, yyyy h:mm a');
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function extractTime(expression: string): { hours: number; minutes: number } {
  // Try to extract time from expression
  const timeMatch = expression.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)/i);
  if (timeMatch) {
    let hours = parseInt(timeMatch[1]);
    const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
    const period = timeMatch[3].toLowerCase().replace(/\./g, '');

    if (period === 'pm' && hours !== 12) {
      hours += 12;
    } else if (period === 'am' && hours === 12) {
      hours = 0;
    }

    return { hours, minutes };
  }

  // Default to 9 AM for business contexts
  return { hours: 9, minutes: 0 };
}

function setTime(date: Date, time: { hours: number; minutes: number }): Date {
  const newDate = new Date(date);
  newDate.setHours(time.hours, time.minutes, 0, 0);
  return newDate;
}

function createDate(original: string, date: Date, confidence: number): ParsedDate {
  return {
    original,
    iso: date.toISOString(),
    display: formatDisplayDate(date),
    confidence,
  };
}

function parseNextExpression(expression: string, referenceDate: Date): ParsedDate {
  const normalized = expression.replace('next ', '').trim();
  const time = extractTime(normalized);

  // Handle "next week"
  if (normalized.includes('week')) {
    const date = addDays(referenceDate, 7);
    return createDate(expression, setTime(date, time), 0.85);
  }

  // Handle "next month"
  if (normalized.includes('month')) {
    const date = startOfMonth(addDays(referenceDate, 31));
    return createDate(expression, setTime(date, time), 0.85);
  }

  // Handle weekday (next Monday, next Friday, etc.)
  const weekdayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const targetDay = weekdayNames.findIndex((name) => normalized.includes(name));

  if (targetDay !== -1) {
    return parseWeekdayExpression(targetDay, referenceDate, expression, true);
  }

  // Fallback
  return createDate(expression, addDays(referenceDate, 7), 0.6);
}

function parseWeekdayExpression(
  targetDay: number,
  referenceDate: Date,
  expression: string,
  isNext = false
): ParsedDate {
  const currentDay = referenceDate.getDay();
  let daysUntilTarget = targetDay - currentDay;

  if (daysUntilTarget <= 0 && !isNext) {
    daysUntilTarget += 7;
  } else if (daysUntilTarget <= 7 && isNext) {
    daysUntilTarget += 7;
  }

  const date = addDays(referenceDate, daysUntilTarget);
  const time = extractTime(expression);
  return createDate(expression, setTime(date, time), 0.9);
}

function addUnits(date: Date, amount: number, unit: string): Date {
  switch (unit) {
    case 'day':
      return addDays(date, amount);
    case 'week':
      return addDays(date, amount * 7);
    case 'month':
      return addDays(date, amount * 30);
    case 'hour':
      return new Date(date.getTime() + amount * 60 * 60 * 1000);
    default:
      return date;
  }
}

function parseEndOfExpression(expression: string, referenceDate: Date): ParsedDate {
  const normalized = expression.replace('end of', '').trim();
  const time = { hours: 17, minutes: 0 }; // 5 PM default

  if (normalized.includes('day') || normalized.trim() === '') {
    return createDate(expression, setTime(new Date(), { hours: 23, minutes: 59 }), 0.85);
  }

  if (normalized.includes('week')) {
    // Find next Friday
    const date = getNextFriday(referenceDate);
    return createDate(expression, setTime(date, time), 0.85);
  }

  if (normalized.includes('month')) {
    const date = startOfMonth(addDays(referenceDate, 60));
    const lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    return createDate(expression, setTime(lastDay, time), 0.85);
  }

  return createDate(expression, referenceDate, 0.6);
}

function parseStartOfExpression(expression: string, referenceDate: Date): ParsedDate {
  const normalized = expression.replace('beginning of', '').replace('start of', '').trim();
  const time = { hours: 8, minutes: 0 }; // 8 AM default

  if (normalized.includes('day') || normalized.trim() === '') {
    return createDate(expression, setTime(new Date(), time), 0.85);
  }

  if (normalized.includes('week')) {
    // Find next Monday
    const date = getNextMonday(referenceDate);
    return createDate(expression, setTime(date, time), 0.85);
  }

  if (normalized.includes('month')) {
    const date = startOfMonth(addDays(referenceDate, 31));
    return createDate(expression, setTime(date, time), 0.85);
  }

  return createDate(expression, referenceDate, 0.6);
}

function parseQuarterExpression(match: RegExpMatchArray, referenceDate: Date): ParsedDate {
  const quarter = parseInt(match[1]);
  const year = match[2] ? parseInt(match[2]) : referenceDate.getFullYear();

  const month = (quarter - 1) * 3 + 1; // Q1=Jan, Q2=Apr, Q3=Jul, Q4=Oct
  const date = new Date(year, month - 1, 1);

  return {
    original: match[0],
    iso: date.toISOString(),
    display: format(date, 'MMMM yyyy'),
    confidence: 0.9,
  };
}

function getNextFriday(date: Date): Date {
  const day = date.getDay();
  const daysUntilFriday = (5 - day + 7) % 7 || 7;
  return addDays(date, daysUntilFriday);
}

function getNextMonday(date: Date): Date {
  const day = date.getDay();
  const daysUntilMonday = (1 - day + 7) % 7 || 7;
  return addDays(date, daysUntilMonday);
}

/**
 * Detect time expressions in text
 */
export function detectTimeExpressions(text: string): string[] {
  const patterns = [
    /\b(today|tomorrow|yesterday)\b/i,
    /\bnext\s+(week|month|year|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    /\bin\s+\d+\s*(day|week|month|hour)s?\b/i,
    /\bwithin\s+\d+\s*days?\b/i,
    /\bend\s+of\s+(day|week|month|year)\b/i,
    /\b(beginning|start)\s+of\s+(day|week|month|year)\b/i,
    /\bQ([1-4])\s*(\d{4})?\b/i,
    /\d{1,2}:\d{2}\s*(am|pm|a\.m\.|p\.m\.)/i,
    /\b\d{1,2}\s*(am|pm|a\.m\.|p\.m\.)\b/i,
  ];

  const expressions: string[] = [];

  for (const pattern of patterns) {
    const matches = text.match(pattern);
    if (matches) {
      expressions.push(matches[0]);
    }
  }

  return expressions;
}
