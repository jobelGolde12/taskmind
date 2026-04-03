import { turso } from './db';

export interface Analysis {
  id: string;
  original_text: string;
  summary: string;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  analysis_id: string;
  content: string;
  completed: boolean;
  urgency_level: string;
  urgency_score: number;
  deadline: string | null;
  deadline_display: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export interface Decision {
  id: string;
  analysis_id: string;
  content: string;
  stakeholders: string | null;
  created_at: string;
}

export interface ConfusionItem {
  id: string;
  analysis_id: string;
  item: string;
  suggestion: string | null;
  created_at: string;
}

export async function getAnalyses(limit = 50): Promise<Analysis[]> {
  const result = await turso.execute({
    sql: 'SELECT * FROM analyses ORDER BY created_at DESC LIMIT ?',
    args: [limit],
  });
  return result.rows as unknown as Analysis[];
}

export async function getAnalysisById(id: string): Promise<Analysis | null> {
  const result = await turso.execute({
    sql: 'SELECT * FROM analyses WHERE id = ?',
    args: [id],
  });
  return (result.rows[0] as unknown as Analysis) || null;
}

export async function getTasksByAnalysisId(analysisId: string): Promise<Task[]> {
  const result = await turso.execute({
    sql: 'SELECT * FROM tasks WHERE analysis_id = ? ORDER BY urgency_score DESC, deadline ASC',
    args: [analysisId],
  });
  return result.rows as unknown as Task[];
}

export async function getDecisionsByAnalysisId(analysisId: string): Promise<Decision[]> {
  const result = await turso.execute({
    sql: 'SELECT * FROM decisions WHERE analysis_id = ?',
    args: [analysisId],
  });
  return result.rows as unknown as Decision[];
}

export async function getConfusionItemsByAnalysisId(analysisId: string): Promise<ConfusionItem[]> {
  const result = await turso.execute({
    sql: 'SELECT * FROM confusion_items WHERE analysis_id = ?',
    args: [analysisId],
  });
  return result.rows as unknown as ConfusionItem[];
}

export async function createAnalysis(
  id: string,
  originalText: string,
  summary: string,
  language = 'en'
): Promise<void> {
  await turso.execute({
    sql: `
      INSERT INTO analyses (id, original_text, summary, language)
      VALUES (?, ?, ?, ?)
    `,
    args: [id, originalText, summary, language],
  });
}

export async function createTask(
  id: string,
  analysisId: string,
  content: string,
  urgencyLevel: string,
  urgencyScore: number,
  deadline: string | null,
  deadlineDisplay: string | null,
  category: string | null
): Promise<void> {
  await turso.execute({
    sql: `
      INSERT INTO tasks (id, analysis_id, content, urgency_level, urgency_score, deadline, deadline_display, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [id, analysisId, content, urgencyLevel, urgencyScore, deadline, deadlineDisplay, category],
  });
}

export async function createDecision(
  id: string,
  analysisId: string,
  content: string,
  stakeholders: string | null
): Promise<void> {
  await turso.execute({
    sql: `
      INSERT INTO decisions (id, analysis_id, content, stakeholders)
      VALUES (?, ?, ?, ?)
    `,
    args: [id, analysisId, content, stakeholders],
  });
}

export async function createConfusionItem(
  id: string,
  analysisId: string,
  item: string,
  suggestion: string | null
): Promise<void> {
  await turso.execute({
    sql: `
      INSERT INTO confusion_items (id, analysis_id, item, suggestion)
      VALUES (?, ?, ?, ?)
    `,
    args: [id, analysisId, item, suggestion],
  });
}

export async function updateTaskCompletion(taskId: string, completed: boolean): Promise<void> {
  await turso.execute({
    sql: 'UPDATE tasks SET completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    args: [completed, taskId],
  });
}

export async function deleteAnalysis(analysisId: string): Promise<void> {
  await turso.execute({
    sql: 'DELETE FROM analyses WHERE id = ?',
    args: [analysisId],
  });
}
