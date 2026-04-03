// Database schema for TaskMind AI

export const schema = `
-- Users table (optional, for future auth)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Analysis history table
CREATE TABLE IF NOT EXISTS analyses (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  original_text TEXT NOT NULL,
  summary TEXT,
  language TEXT DEFAULT 'en',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  analysis_id TEXT NOT NULL,
  content TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  urgency_level TEXT DEFAULT 'medium',
  urgency_score INTEGER DEFAULT 50,
  deadline DATETIME,
  deadline_display TEXT,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (analysis_id) REFERENCES analyses(id) ON DELETE CASCADE
);

-- Decisions table (extracted decisions from text)
CREATE TABLE IF NOT EXISTS decisions (
  id TEXT PRIMARY KEY,
  analysis_id TEXT NOT NULL,
  content TEXT NOT NULL,
  stakeholders TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (analysis_id) REFERENCES analyses(id) ON DELETE CASCADE
);

-- Confusion items table (unclear items needing clarification)
CREATE TABLE IF NOT EXISTS confusion_items (
  id TEXT PRIMARY KEY,
  analysis_id TEXT NOT NULL,
  item TEXT NOT NULL,
  suggestion TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (analysis_id) REFERENCES analyses(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tasks_analysis_id ON tasks(analysis_id);
CREATE INDEX IF NOT EXISTS idx_tasks_urgency ON tasks(urgency_level);
CREATE INDEX IF NOT EXISTS idx_tasks_deadline ON tasks(deadline);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses(created_at);
`;
