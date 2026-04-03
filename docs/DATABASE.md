# Database Schema

TaskMind AI Turso database documentation.

## Overview

TaskMind AI uses **Turso** (libSQL) for optional persistent storage. The database is fully optional - the app works with browser localStorage by default.

## Connection

```typescript
// lib/db.ts
import { createClient } from '@libsql/client';

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
```

## Schema

### Tables

#### `users` (Optional)

For future authentication support.

```sql
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | TEXT | PRIMARY KEY | User ID |
| `email` | TEXT | UNIQUE | User email |
| `name` | TEXT | - | User name |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| `updated_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

---

#### `analyses`

Stores text analysis sessions.

```sql
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
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | TEXT | PRIMARY KEY | Analysis ID |
| `user_id` | TEXT | FOREIGN KEY | Owner user ID (optional) |
| `original_text` | TEXT | NOT NULL | Original input text |
| `summary` | TEXT | - | AI-generated summary |
| `language` | TEXT | DEFAULT 'en' | Language code |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| `updated_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

---

#### `tasks`

Extracted tasks from analyses.

```sql
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
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | TEXT | PRIMARY KEY | Task ID |
| `analysis_id` | TEXT | FOREIGN KEY, NOT NULL | Parent analysis ID |
| `content` | TEXT | NOT NULL | Task description |
| `completed` | BOOLEAN | DEFAULT FALSE | Completion status |
| `urgency_level` | TEXT | DEFAULT 'medium' | low/medium/high/critical |
| `urgency_score` | INTEGER | DEFAULT 50 | Score 0-100 |
| `deadline` | DATETIME | - | Deadline timestamp |
| `deadline_display` | TEXT | - | Human-readable deadline |
| `category` | TEXT | - | Task category |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| `updated_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

---

#### `decisions`

Decisions extracted from analyses.

```sql
CREATE TABLE IF NOT EXISTS decisions (
  id TEXT PRIMARY KEY,
  analysis_id TEXT NOT NULL,
  content TEXT NOT NULL,
  stakeholders TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (analysis_id) REFERENCES analyses(id) ON DELETE CASCADE
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | TEXT | PRIMARY KEY | Decision ID |
| `analysis_id` | TEXT | FOREIGN KEY, NOT NULL | Parent analysis ID |
| `content` | TEXT | NOT NULL | Decision description |
| `stakeholders` | TEXT | - | People involved |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

---

#### `confusion_items`

Unclear items needing clarification.

```sql
CREATE TABLE IF NOT EXISTS confusion_items (
  id TEXT PRIMARY KEY,
  analysis_id TEXT NOT NULL,
  item TEXT NOT NULL,
  suggestion TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (analysis_id) REFERENCES analyses(id) ON DELETE CASCADE
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | TEXT | PRIMARY KEY | Item ID |
| `analysis_id` | TEXT | FOREIGN KEY, NOT NULL | Parent analysis ID |
| `item` | TEXT | NOT NULL | Unclear item description |
| `suggestion` | TEXT | - | Clarification suggestion |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

---

## Indexes

Performance indexes:

```sql
CREATE INDEX IF NOT EXISTS idx_tasks_analysis_id ON tasks(analysis_id);
CREATE INDEX IF NOT EXISTS idx_tasks_urgency ON tasks(urgency_level);
CREATE INDEX IF NOT EXISTS idx_tasks_deadline ON tasks(deadline);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses(created_at);
```

## Entity Relationship Diagram

```
┌─────────────┐
│   users     │
│─────────────│
│ id          │
│ email       │
│ name        │
└──────┬──────┘
       │
       │ 1:N (optional)
       │
       ▼
┌─────────────┐
│  analyses   │
│─────────────│
│ id          │◄──────┐
│ user_id     │       │
│ original_tx│       │
│ summary     │       │
│ language    │       │
└──────┬──────┘       │
       │              │
       │ 1:N          │ 1:N
       ├──────────────┼──────────────┐
       │              │              │
       ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   tasks     │ │  decisions  │ │ confusion_  │
│─────────────│ │─────────────│ │    items    │
│ id          │ │ id          │ │─────────────│
│ analysis_id │ │ analysis_id │ │ id          │
│ content     │ │ content     │ │ analysis_id │
│ completed   │ │ stakeholders│ │ item        │
│ urgency_... │ │             │ │ suggestion  │
│ deadline    │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘
```

## Repository Functions

### Read Operations

```typescript
// Get all analyses
const analyses = await getAnalyses(50);

// Get single analysis
const analysis = await getAnalysisById('analysis_123');

// Get tasks for analysis
const tasks = await getTasksByAnalysisId('analysis_123');

// Get decisions for analysis
const decisions = await getDecisionsByAnalysisId('analysis_123');

// Get confusion items for analysis
const confusionItems = await getConfusionItemsByAnalysisId('analysis_123');
```

### Write Operations

```typescript
// Create analysis
await createAnalysis(
  'analysis_123',
  'Original text...',
  'AI summary...',
  'en'
);

// Create task
await createTask(
  'task_123',
  'analysis_123',
  'Task content',
  'high',
  75,
  '2024-01-15T15:00:00.000Z',
  'Tomorrow, 3 PM',
  'work'
);

// Create decision
await createDecision(
  'decision_123',
  'analysis_123',
  'Decision content',
  'John, Jane'
);

// Create confusion item
await createConfusionItem(
  'confusion_123',
  'analysis_123',
  'Unclear item',
  'What is the deadline?'
);

// Update task completion
await updateTaskCompletion('task_123', true);

// Delete analysis (cascades to tasks, decisions, confusion items)
await deleteAnalysis('analysis_123');
```

## Setup

### 1. Create Turso Account

Visit [https://turso.tech](https://turso.tech) and sign up.

### 2. Create Database

```bash
# Using Turso CLI
turso db create taskmind
```

### 3. Get Credentials

```bash
# Get database URL
turso db show taskmind

# Create auth token
turso db tokens create taskmind
```

### 4. Update .env

```env
TURSO_DATABASE_URL=libsql://taskmind-youruser.turso.io
TURSO_AUTH_TOKEN=your_token_here
```

### 5. Initialize Schema

```typescript
import { initializeDatabase } from '@/lib/seed';

await initializeDatabase();
```

### 6. Seed Sample Data (Optional)

```typescript
import { seedDatabase } from '@/lib/seed';

await seedDatabase();
```

## Migrations

To update the schema:

1. Edit `lib/schema.ts`
2. Create migration script
3. Run migration

```typescript
// Example migration
await turso.execute(`
  ALTER TABLE tasks ADD COLUMN priority TEXT DEFAULT 'normal';
`);
```

## Backup

### Export Data

```typescript
const result = await turso.execute('SELECT * FROM analyses');
const backup = JSON.stringify(result.rows, null, 2);
```

### Import Data

```typescript
// Parse backup JSON and insert rows
const data = JSON.parse(backupJson);
for (const analysis of data.analyses) {
  await createAnalysis(analysis.id, analysis.original_text, ...);
}
```

## Performance Tips

### Query Optimization

```typescript
// Good - uses index
const tasks = await getTasksByAnalysisId('analysis_123');

// Good - limited results
const analyses = await getAnalyses(50);

// Avoid - no filter
const allTasks = await turso.execute('SELECT * FROM tasks');
```

### Batch Operations

```typescript
// Good - batch insert
for (const task of tasks) {
  await turso.execute({
    sql: 'INSERT INTO tasks (...) VALUES (...)',
    args: [...],
  });
}
```

## Troubleshooting

### Connection Error

```
Error: Failed to connect to database
```

**Solution:**
- Check TURSO_DATABASE_URL format
- Verify TURSO_AUTH_TOKEN is valid
- Ensure network connection

### Schema Not Created

```
Error: Table doesn't exist
```

**Solution:**
```typescript
await initializeDatabase();
```

### Foreign Key Violation

```
Error: FOREIGN KEY constraint failed
```

**Solution:**
- Ensure parent record exists first
- Check analysis_id is valid

---

**Need more?** See the [Repository API](./API.md#database)
