import { turso } from './db';
import { schema } from './schema';

export async function initializeDatabase() {
  try {
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    // Execute each statement
    for (const statement of statements) {
      await turso.execute(statement);
    }

    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

export async function seedDatabase() {
  try {
    // Seed sample data for testing
    const sampleAnalysisId = `analysis_${Date.now()}`;

    await turso.execute({
      sql: `
        INSERT INTO analyses (id, original_text, summary, language)
        VALUES (?, ?, ?, ?)
      `,
      args: [
        sampleAnalysisId,
        'Team meeting tomorrow at 3pm. Please prepare the Q4 report and send it to John by Friday. We need to finalize the budget decision next week.',
        'Meeting scheduled with action items for Q4 report and budget decision',
        'en',
      ],
    });

    // Sample tasks
    const tasks = [
      {
        id: `task_${Date.now()}_1`,
        analysis_id: sampleAnalysisId,
        content: 'Prepare the Q4 report',
        urgency_level: 'high',
        urgency_score: 80,
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        deadline_display: 'Friday, 11:59 PM',
        category: 'work',
      },
      {
        id: `task_${Date.now()}_2`,
        analysis_id: sampleAnalysisId,
        content: 'Send report to John',
        urgency_level: 'high',
        urgency_score: 75,
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        deadline_display: 'Friday, EOD',
        category: 'work',
      },
      {
        id: `task_${Date.now()}_3`,
        analysis_id: sampleAnalysisId,
        content: 'Attend team meeting',
        urgency_level: 'medium',
        urgency_score: 60,
        deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        deadline_display: 'Tomorrow, 3:00 PM',
        category: 'meeting',
      },
    ];

    for (const task of tasks) {
      await turso.execute({
        sql: `
          INSERT INTO tasks (id, analysis_id, content, urgency_level, urgency_score, deadline, deadline_display, category)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          task.id,
          task.analysis_id,
          task.content,
          task.urgency_level,
          task.urgency_score,
          task.deadline,
          task.deadline_display,
          task.category,
        ],
      });
    }

    // Sample decision
    await turso.execute({
      sql: `
        INSERT INTO decisions (id, analysis_id, content, stakeholders)
        VALUES (?, ?, ?, ?)
      `,
      args: [
        `decision_${Date.now()}`,
        sampleAnalysisId,
        'Finalize the budget decision next week',
        'Team, John',
      ],
    });

    console.log('Database seeded successfully');
    return true;
  } catch (error) {
    console.error('Database seeding failed:', error);
    throw error;
  }
}
