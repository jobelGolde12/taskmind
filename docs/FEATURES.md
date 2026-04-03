# Features Guide

Complete guide to TaskMind AI features.

## Core Features

### 1. Smart Action Extraction

Automatically detect and extract tasks from any text.

**How it works:**
1. User inputs text (email, message, announcement)
2. AI analyzes the content
3. Tasks are extracted with:
   - Clear descriptions
   - Urgency levels
   - Deadlines (if mentioned)
   - Categories

**Example:**

Input:
```
Please prepare the Q4 report and send it to John by Friday. 
Also schedule a team meeting for next week.
```

Output:
```
✓ Task 1: Prepare the Q4 report
  - Urgency: High (75/100)
  - Deadline: Friday, EOD
  - Category: work

✓ Task 2: Send report to John
  - Urgency: High (75/100)
  - Deadline: Friday, EOD
  - Category: work

✓ Task 3: Schedule team meeting
  - Urgency: Medium (50/100)
  - Deadline: Next week
  - Category: meeting
```

**Usage:**
```typescript
// In the analyze page
const result = await aiEngine.analyze(text);
// result.tasks contains extracted tasks
```

---

### 2. Intelligent Deadline Detection

Convert vague time references into specific dates.

**Supported Formats:**

| Input | Output |
|-------|--------|
| "tomorrow at 3pm" | 2024-01-15 15:00 |
| "next Friday" | 2024-01-19 09:00 |
| "by end of week" | 2024-01-19 17:00 |
| "in 2 days" | 2024-01-17 00:00 |
| "next month" | 2024-02-01 00:00 |
| "Q4" | 2024-10-01 00:00 |
| "within 5 days" | 2024-01-20 00:00 |

**Features:**
- Relative date parsing
- Time extraction
- Business context awareness
- Confidence scoring

**Usage:**
```typescript
import { parseNaturalDate } from '@/utils/dateParser';

const result = parseNaturalDate('tomorrow at 3pm');
console.log(result);
// {
//   original: 'tomorrow at 3pm',
//   iso: '2024-01-15T15:00:00.000Z',
//   display: 'Tomorrow, 3:00 PM',
//   confidence: 0.95
// }
```

---

### 3. AI Urgency Scoring

Dynamic urgency calculation for prioritization.

**Scoring Levels:**

| Score | Level | Color | Criteria |
|-------|-------|-------|----------|
| 90-100 | Critical | Red | Today/tomorrow, emergencies, "ASAP" |
| 70-89 | High | Orange | This week, important meetings |
| 40-69 | Medium | Yellow | Next week, routine tasks |
| 0-39 | Low | Blue | Someday, no deadline |

**Urgency Keywords:**

```typescript
const keywords = {
  critical: ['ASAP', 'urgent', 'emergency', 'immediately', 'today'],
  high: ['tomorrow', 'this week', 'important', 'priority', 'deadline'],
  medium: ['next week', 'soon', 'when possible', 'consider'],
  low: ['someday', 'maybe', 'optional', 'no rush'],
};
```

**Visual Indicators:**

- **UrgencyBadge** - Color-coded badge
- **UrgencyMeter** - Visual progress bar

**Usage:**
```typescript
import { UrgencyBadge, UrgencyMeter } from '@/components/analysis/UrgencyBadge';

<UrgencyBadge level="high" score={75} />
<UrgencyMeter score={75} />
```

---

### 4. Confusion Detection Engine

Identify unclear or ambiguous items.

**What it detects:**
- Vague time references ("soon", "later")
- Missing deadlines
- Unclear responsibilities
- Contradictory statements
- Missing context

**Example:**

Input:
```
Someone needs to update the presentation soon.
```

Output:
```
⚠️ Confusion Item: "Someone needs to update"
   Suggestion: Who is responsible for this task?

⚠️ Confusion Item: "soon"
   Suggestion: What is the specific deadline?
```

**Usage:**
```typescript
const result = await aiEngine.analyze(text);
// result.confusionItems contains flagged items
```

---

### 5. Multi-Language Support

Support for English and Filipino.

**Features:**
- Automatic language detection
- Language-specific prompts
- Culturally aware parsing

**Detection:**
```typescript
function detectLanguage(text: string): 'en' | 'fil' {
  const filipinoWords = ['ang', 'ng', 'sa', 'mga', 'na', 'ay'];
  const matchCount = filipinoWords.filter(word => 
    text.toLowerCase().includes(word)
  ).length;
  
  return matchCount > 5 ? 'fil' : 'en';
}
```

**Example (Filipino):**

Input:
```
Meeting bukas sa 3pm. Maghanda ng report bago Friday.
```

Output:
```
Language: Filipino
Tasks:
- Attend meeting (Tomorrow, 3:00 PM)
- Prepare report (Before Friday)
```

---

### 6. File Upload Analyzer

Upload and analyze documents.

**Supported Formats:**
- `.txt` - Text files (fully supported)
- `.pdf` - PDF files (coming soon)
- `.doc/.docx` - Word documents (coming soon)

**Features:**
- Drag and drop upload
- Text preview
- File size validation (max 5MB)
- Automatic text extraction

**Usage:**
1. Navigate to `/upload`
2. Drag file or click to browse
3. Review text preview
4. Click "Process File"

---

### 7. Task Dashboard

Overview of all tasks and statistics.

**Dashboard Features:**

| Widget | Description |
|--------|-------------|
| Total Tasks | Count with completion status |
| Pending | Tasks awaiting completion |
| Due Soon | Tasks due today/tomorrow |
| Completion Rate | Percentage completed |
| High Priority | Critical/high urgency tasks |
| Deadline Overview | Breakdown by timeframe |
| Recent Analyses | Latest analysis sessions |

**Statistics:**

```typescript
// Example calculations
const totalTasks = allTasks.length;
const completedTasks = allTasks.filter(t => t.completed).length;
const completionRate = (completedTasks / totalTasks) * 100;

const dueToday = tasks.filter(t => 
  t.deadline && isToday(new Date(t.deadline))
).length;
```

---

### 8. History & Saved Analysis

Browse and manage past analyses.

**Features:**
- Search by keyword
- Filter by urgency
- Export in multiple formats
- Delete old entries
- View full details

**Search:**
```typescript
const filtered = analyses.filter(analysis => 
  analysis.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
  analysis.originalText.toLowerCase().includes(searchQuery.toLowerCase())
);
```

**Filter:**
```typescript
const filtered = analyses.filter(analysis => 
  !filterUrgency || 
  analysis.tasks.some(t => t.urgencyLevel === filterUrgency)
);
```

---

### 9. Export System

Export analysis results in multiple formats.

**Export Formats:**

| Format | Use Case | Extension |
|--------|----------|-----------|
| JSON | Data backup, integration | `.json` |
| CSV | Spreadsheets, Excel | `.csv` |
| Markdown | Documentation, notes | `.md` |
| PDF | Printing, sharing | `.pdf` |

**Export Functions:**

```typescript
import {
  exportToJSON,
  exportToCSV,
  exportToMarkdown,
  exportToPDF,
} from '@/utils/export';

// Export as JSON
exportToJSON(analysis, 'my-analysis');

// Export as CSV (tasks only)
exportToCSV(analysis, 'tasks');

// Export as Markdown
exportToMarkdown(analysis, 'report');

// Export as PDF
exportToPDF(analysis, 'document');
```

**Markdown Output Example:**

```markdown
# Meeting Summary

**Date:** January 15, 2024

## Tasks (3)

1. [ ] Prepare the Q4 report
   - **Priority:** HIGH
   - **Deadline:** Friday, EOD

2. [ ] Send report to John
   - **Priority:** HIGH
   - **Deadline:** Friday, EOD

## Summary
- Total Tasks: 3
- Completed: 0
- High Priority: 2
```

---

### 10. Smart Reminder System (Foundation)

Foundation for deadline reminders.

**Current Implementation:**
- Visual deadline indicators
- Overdue task highlighting
- Days-until-deadline display

**Future Features:**
- Browser notifications
- Email reminders
- Calendar integration

---

## UI/UX Features

### Glassmorphism Design

Modern frosted glass effects:

```css
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Dark Mode

Default dark theme with toggle:

```typescript
const { darkMode, toggleDarkMode } = useAppStore();
```

### Smooth Animations

Framer Motion animations:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>
```

### Responsive Design

Mobile-first responsive layout:

```typescript
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {/* Responsive grid */}
</div>
```

---

## Performance Features

### Browser Caching

- AI model cached after first download
- State persisted in localStorage
- Offline-capable after load

### Optimized Rendering

- React memoization
- Lazy loading
- Virtual scrolling (for large lists)

### Fast Build Times

- Turbopack bundling
- Next.js optimization
- Tree shaking

---

## Accessibility Features

- Keyboard navigation
- ARIA labels
- Focus indicators
- Reduced motion support
- High contrast design

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

---

**Want to contribute features?** See the [Development Guide](./DEVELOPMENT.md)
