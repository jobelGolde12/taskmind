# API Reference

Code-level API documentation for TaskMind AI.

## Table of Contents

- [AI Engine](#ai-engine)
- [Store](#store)
- [Components](#components)
- [Utilities](#utilities)
- [Database](#database)

---

## AI Engine

### `aiEngine`

Main AI processing engine.

**Location:** `lib/ai-engine.ts`

```typescript
import { aiEngine } from '@/lib/ai-engine';
```

### Methods

#### `initialize(config?)`

Initialize the AI engine with a model.

```typescript
await aiEngine.initialize({
  modelId: 'Llama-3.2-1B-Instruct-q4f32_1-MLC',
  initProgressCallback: (progress) => {
    console.log(`${progress.text}: ${progress.progress * 100}%`);
  },
});
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `config.modelId` | string | No | Model to load (default: Llama-3.2-1B) |
| `config.initProgressCallback` | function | No | Progress callback |

**Returns:** `Promise<void>`

---

#### `analyze(text)`

Analyze text and extract tasks, deadlines, and decisions.

```typescript
const result = await aiEngine.analyze(text);
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | Text to analyze |

**Returns:** `Promise<AnalysisResult>`

**AnalysisResult Structure:**

```typescript
interface AnalysisResult {
  summary: string;
  tasks: Task[];
  decisions: Decision[];
  confusionItems: ConfusionItem[];
  language: 'en' | 'fil';
}
```

**Example:**

```typescript
const result = await aiEngine.analyze(
  'Meeting tomorrow at 3pm. Send report by Friday.'
);

console.log(result.tasks);
// [
//   {
//     content: 'Attend meeting',
//     urgencyLevel: 'medium',
//     urgencyScore: 60,
//     deadline: '2024-01-15T15:00:00.000Z',
//     deadlineDisplay: 'Tomorrow, 3:00 PM',
//     category: 'meeting'
//   },
//   {
//     content: 'Send report',
//     urgencyLevel: 'high',
//     urgencyScore: 75,
//     deadline: '2024-01-19T17:00:00.000Z',
//     deadlineDisplay: 'Friday, EOD',
//     category: 'work'
//   }
// ]
```

---

#### `chat(messages)`

Send chat messages to the AI.

```typescript
const response = await aiEngine.chat([
  { role: 'user', content: 'What tasks did I have?' },
]);
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messages` | array | Yes | Array of message objects |

**Returns:** `Promise<string>`

---

#### `isReady()`

Check if the AI engine is initialized.

```typescript
if (aiEngine.isReady()) {
  // Engine is ready
}
```

**Returns:** `boolean`

---

#### `reset()`

Reset the AI engine.

```typescript
await aiEngine.reset();
```

**Returns:** `Promise<void>`

---

## Store

### `useAppStore`

Zustand store for application state.

**Location:** `store/useAppStore.ts`

```typescript
import { useAppStore } from '@/store/useAppStore';
```

### State

```typescript
interface AppState {
  // Current analysis
  currentAnalysis: Analysis | null;
  isAnalyzing: boolean;
  analysisProgress: { progress: number; text: string } | null;
  
  // History
  analyses: Analysis[];
  
  // UI State
  darkMode: boolean;
  sidebarOpen: boolean;
  
  // Filters
  filterUrgency: string | null;
  filterCategory: string | null;
  searchQuery: string;
}
```

### Actions

#### `setCurrentAnalysis(analysis)`

```typescript
useAppStore.getState().setCurrentAnalysis(analysis);
```

#### `addAnalysis(analysis)`

```typescript
useAppStore.getState().addAnalysis({
  id: 'analysis_123',
  originalText: 'Meeting tomorrow...',
  summary: 'Meeting scheduled',
  tasks: [],
  decisions: [],
  confusionItems: [],
  language: 'en',
  createdAt: new Date().toISOString(),
});
```

#### `deleteAnalysis(id)`

```typescript
useAppStore.getState().deleteAnalysis('analysis_123');
```

#### `updateTask(taskId, updates)`

```typescript
useAppStore.getState().updateTask('task_123', {
  content: 'Updated task content',
  urgencyLevel: 'high',
});
```

#### `toggleTaskCompletion(taskId)`

```typescript
useAppStore.getState().toggleTaskCompletion('task_123');
```

#### `deleteTask(taskId)`

```typescript
useAppStore.getState().deleteTask('task_123');
```

#### `toggleDarkMode()`

```typescript
useAppStore.getState().toggleDarkMode();
```

#### `toggleSidebar()`

```typescript
useAppStore.getState().toggleSidebar();
```

#### `setFilterUrgency(urgency)`

```typescript
useAppStore.getState().setFilterUrgency('high');
```

#### `setFilterCategory(category)`

```typescript
useAppStore.getState().setFilterCategory('work');
```

#### `setSearchQuery(query)`

```typescript
useAppStore.getState().setSearchQuery('meeting');
```

#### `clearFilters()`

```typescript
useAppStore.getState().clearFilters();
```

### Subscribe to State

```typescript
// In a component
const currentAnalysis = useAppStore((state) => state.currentAnalysis);
const darkMode = useAppStore((state) => state.darkMode);

// Subscribe to changes
useAppStore.subscribe(
  (state) => state.analyses,
  (analyses) => console.log('Analyses changed:', analyses)
);
```

---

## Components

### Analysis Components

#### `ActionList`

**Location:** `components/analysis/ActionList.tsx`

```typescript
import { ActionList } from '@/components/analysis/ActionList';

<ActionList
  tasks={tasks}
  onToggleComplete={(id) => handleToggle(id)}
  onDelete={(id) => handleDelete(id)}
  onEdit={(id, content) => handleEdit(id, content)}
  editable={true}
/>
```

**Props:**

| Prop | Type | Required |
|------|------|----------|
| `tasks` | Task[] | Yes |
| `onToggleComplete` | (id: string) => void | No |
| `onDelete` | (id: string) => void | No |
| `onEdit` | (id: string, content: string) => void | No |
| `editable` | boolean | No |

---

#### `DeadlineCard`

**Location:** `components/analysis/DeadlineCard.tsx`

```typescript
import { DeadlineCard } from '@/components/analysis/DeadlineCard';

<DeadlineCard
  deadline="2024-01-15T15:00:00.000Z"
  deadlineDisplay="Tomorrow, 3:00 PM"
  compact={false}
/>
```

**Props:**

| Prop | Type | Required |
|------|------|----------|
| `deadline` | string \| null | No |
| `deadlineDisplay` | string \| null | No |
| `compact` | boolean | No |

---

#### `UrgencyBadge`

**Location:** `components/analysis/UrgencyBadge.tsx`

```typescript
import { UrgencyBadge } from '@/components/analysis/UrgencyBadge';

<UrgencyBadge
  level="high"
  score={75}
  size="md"
  showLabel={true}
/>
```

**Props:**

| Prop | Type | Required |
|------|------|----------|
| `level` | 'low' \| 'medium' \| 'high' \| 'critical' | Yes |
| `score` | number | No |
| `size` | 'sm' \| 'md' \| 'lg' | No |
| `showLabel` | boolean | No |

---

#### `UrgencyMeter`

**Location:** `components/analysis/UrgencyBadge.tsx`

```typescript
import { UrgencyMeter } from '@/components/analysis/UrgencyBadge';

<UrgencyMeter score={75} showLabel={true} />
```

**Props:**

| Prop | Type | Required |
|------|------|----------|
| `score` | number | Yes |
| `showLabel` | boolean | No |

---

#### `ConfusionList`

**Location:** `components/analysis/ConfusionBox.tsx`

```typescript
import { ConfusionList } from '@/components/analysis/ConfusionBox';

<ConfusionList
  items={[
    { item: 'Unclear deadline', suggestion: 'When is this due?' }
  ]}
  title="Needs Clarification"
/>
```

**Props:**

| Prop | Type | Required |
|------|------|----------|
| `items` | array | Yes |
| `title` | string | No |

---

### UI Components

#### `Button`

**Location:** `components/ui/button.tsx`

```typescript
import { Button } from '@/components/ui/button';

<Button
  variant="default"
  size="md"
  onClick={handleClick}
  disabled={false}
>
  Click me
</Button>
```

**Props:**

| Prop | Type | Default |
|------|------|---------|
| `variant` | 'default' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive' | 'default' |
| `size` | 'sm' \| 'md' \| 'lg' | 'md' |
| `disabled` | boolean | false |
| `onClick` | function | - |

---

#### `Card`

**Location:** `components/ui/card.tsx`

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

---

#### `Textarea`

**Location:** `components/ui/textarea.tsx`

```typescript
import { Textarea } from '@/components/ui/textarea';

<Textarea
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Enter text..."
  className="min-h-[200px]"
/>
```

---

## Utilities

### Date Parser

**Location:** `utils/dateParser.ts`

```typescript
import { parseNaturalDate, detectTimeExpressions } from '@/utils/dateParser';
```

#### `parseNaturalDate(expression, referenceDate?)`

```typescript
const result = parseNaturalDate('tomorrow at 3pm');
// {
//   original: 'tomorrow at 3pm',
//   iso: '2024-01-15T15:00:00.000Z',
//   display: 'Tomorrow, 3:00 PM',
//   confidence: 0.95
// }
```

#### `detectTimeExpressions(text)`

```typescript
const expressions = detectTimeExpressions('Meeting tomorrow and next week');
// ['tomorrow', 'next week']
```

---

### Text Cleaner

**Location:** `utils/textCleaner.ts`

```typescript
import { cleanText, extractKeyInfo, getTextStats } from '@/utils/textCleaner';
```

#### `cleanText(text)`

```typescript
const result = cleanText(emailText);
// {
//   original: '...',
//   cleaned: '...',
//   removedCount: 2,
//   isTooShort: false,
//   language: 'en'
// }
```

#### `extractKeyInfo(text)`

```typescript
const info = extractKeyInfo(text);
// {
//   people: ['John', 'Jane'],
//   dates: ['tomorrow', 'Friday'],
//   actions: ['send', 'prepare']
// }
```

#### `getTextStats(text)`

```typescript
const stats = getTextStats(text);
// {
//   characterCount: 500,
//   wordCount: 100,
//   sentenceCount: 5,
//   estimatedReadTime: 24
// }
```

---

### Export

**Location:** `utils/export.ts`

```typescript
import {
  exportToJSON,
  exportToCSV,
  exportToMarkdown,
  exportToPDF,
} from '@/utils/export';
```

#### `exportToJSON(data, filename?)`

```typescript
exportToJSON(analysisData, 'my-analysis');
// Downloads: my-analysis.json
```

#### `exportToCSV(data, filename?)`

```typescript
exportToCSV(analysisData, 'tasks');
// Downloads: tasks.csv
```

#### `exportToMarkdown(data, filename?)`

```typescript
exportToMarkdown(analysisData, 'report');
// Downloads: report.md
```

#### `exportToPDF(data, filename?)`

```typescript
exportToPDF(analysisData, 'report');
// Downloads: report.pdf
```

---

## Database

### Repository

**Location:** `lib/repository.ts`

```typescript
import {
  getAnalyses,
  getAnalysisById,
  getTasksByAnalysisId,
  createAnalysis,
  createTask,
  updateTaskCompletion,
  deleteAnalysis,
} from '@/lib/repository';
```

#### `getAnalyses(limit?)`

```typescript
const analyses = await getAnalyses(50);
```

#### `getAnalysisById(id)`

```typescript
const analysis = await getAnalysisById('analysis_123');
```

#### `getTasksByAnalysisId(analysisId)`

```typescript
const tasks = await getTasksByAnalysisId('analysis_123');
```

#### `createAnalysis(id, text, summary, language?)`

```typescript
await createAnalysis('analysis_123', 'Text...', 'Summary...', 'en');
```

#### `createTask(...)`

```typescript
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
```

#### `updateTaskCompletion(taskId, completed)`

```typescript
await updateTaskCompletion('task_123', true);
```

#### `deleteAnalysis(analysisId)`

```typescript
await deleteAnalysis('analysis_123');
```

---

## Types

### Analysis

```typescript
interface Analysis {
  id: string;
  originalText: string;
  summary: string;
  tasks: Task[];
  decisions: Decision[];
  confusionItems: ConfusionItem[];
  language: 'en' | 'fil';
  createdAt: string;
}
```

### Task

```typescript
interface Task {
  id: string;
  content: string;
  completed: boolean;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  urgencyScore: number;
  deadline: string | null;
  deadlineDisplay: string | null;
  category: 'work' | 'personal' | 'meeting' | 'email' | 'document' | 'other';
}
```

### Decision

```typescript
interface Decision {
  id: string;
  content: string;
  stakeholders: string | null;
}
```

### ConfusionItem

```typescript
interface ConfusionItem {
  id: string;
  item: string;
  suggestion: string | null;
}
```

---

**Need more info?** Check the [Development Guide](./DEVELOPMENT.md)
