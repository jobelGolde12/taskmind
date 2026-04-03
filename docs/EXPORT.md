# Export System Guide

How to export analysis results in various formats.

## Overview

TaskMind AI supports four export formats:
- **JSON** - Raw data for backup/integration
- **CSV** - Spreadsheet-compatible task lists
- **Markdown** - Documentation-friendly format
- **PDF** - Printable, shareable documents

## Usage

### Import Export Functions

```typescript
import {
  exportToJSON,
  exportToCSV,
  exportToMarkdown,
  exportToPDF,
  exportAll,
} from '@/utils/export';
```

### Export Data Structure

All export functions accept the same data structure:

```typescript
interface ExportData {
  summary: string;
  originalText: string;
  tasks: Array<{
    content: string;
    completed: boolean;
    urgencyLevel: string;
    urgencyScore: number;
    deadline: string | null;
    deadlineDisplay: string | null;
    category: string;
  }>;
  decisions: Array<{
    content: string;
    stakeholders: string | null;
  }>;
  confusionItems: Array<{
    item: string;
    suggestion: string | null;
  }>;
  language: string;
  createdAt: string;
}
```

---

## JSON Export

Best for: Data backup, API integration, programmatic access

### Usage

```typescript
exportToJSON(analysisData, 'my-analysis');
```

### Output Example

```json
{
  "summary": "Team meeting scheduled with action items",
  "originalText": "Meeting tomorrow at 3pm...",
  "tasks": [
    {
      "content": "Prepare Q4 report",
      "completed": false,
      "urgencyLevel": "high",
      "urgencyScore": 75,
      "deadline": "2024-01-19T17:00:00.000Z",
      "deadlineDisplay": "Friday, EOD",
      "category": "work"
    }
  ],
  "decisions": [
    {
      "content": "Finalize budget next week",
      "stakeholders": "Team, John"
    }
  ],
  "confusionItems": [],
  "language": "en",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### File Details

- **Extension:** `.json`
- **MIME Type:** `application/json`
- **Size:** Smallest format
- **Human-readable:** Yes (formatted)

---

## CSV Export

Best for: Excel, Google Sheets, data analysis

### Usage

```typescript
exportToCSV(analysisData, 'tasks');
```

### Output Example

```csv
Task,Status,Urgency,Score,Deadline,Category
"Prepare Q4 report",Pending,high,75,"Friday, EOD",work
"Send report to John",Pending,high,75,"Friday, EOD",work
"Attend team meeting",Pending,medium,60,"Tomorrow, 3:00 PM",meeting
```

### Columns

| Column | Description |
|--------|-------------|
| Task | Task content |
| Status | Completed/Pending |
| Urgency | Urgency level |
| Score | Urgency score (0-100) |
| Deadline | Deadline display |
| Category | Task category |

### File Details

- **Extension:** `.csv`
- **MIME Type:** `text/csv`
- **Size:** Small
- **Human-readable:** In spreadsheet apps

### Notes

- Only exports tasks (not decisions or confusion items)
- Special characters are escaped
- Compatible with Excel, Google Sheets, Numbers

---

## Markdown Export

Best for: Documentation, notes, README files

### Usage

```typescript
exportToMarkdown(analysisData, 'report');
```

### Output Example

```markdown
# Team Meeting Summary

**Generated:** January 15, 2024 10:30 AM
**Language:** English
**Original Text:** Meeting tomorrow at 3pm. Please prepare...

---

## Tasks (3)

### 1. Prepare Q4 report

- **Status:** ⏳ Pending
- **Priority:** 🔴 HIGH
- **Urgency Score:** 75/100
- **Deadline:** Friday, EOD
- **Category:** work

### 2. Send report to John

- **Status:** ⏳ Pending
- **Priority:** 🔴 HIGH
- **Urgency Score:** 75/100
- **Deadline:** Friday, EOD
- **Category:** work

### 3. Attend team meeting

- **Status:** ⏳ Pending
- **Priority:** 🟡 MEDIUM
- **Urgency Score:** 60/100
- **Deadline:** Tomorrow, 3:00 PM
- **Category:** meeting

---

## Decisions (1)

### 1. Finalize budget next week

**Stakeholders:** Team, John

---

## Needs Clarification (0)

*No confusion items*

---

## Summary

- **Total Tasks:** 3
- **Completed:** 0
- **Pending:** 3
- **High Priority:** 2
- **Completion Rate:** 0%
```

### Features

- Emoji indicators
- Hierarchical structure
- Summary statistics
- Preserves all data

### File Details

- **Extension:** `.md`
- **MIME Type:** `text/markdown`
- **Size:** Medium
- **Human-readable:** Yes (very)

### Use Cases

- Meeting notes
- Project documentation
- Personal knowledge base
- GitHub READMEs

---

## PDF Export

Best for: Printing, sharing, official documents

### Usage

```typescript
exportToPDF(analysisData, 'analysis-report');
```

### Output Structure

```
┌─────────────────────────────────────────┐
│     TaskMind AI Analysis                │
│                                         │
│ Summary: Team meeting scheduled...      │
│ Generated: Jan 15, 2024 10:30 AM        │
│ Tasks: 3 | Decisions: 1 | ...           │
├─────────────────────────────────────────┤
│ Tasks                                   │
│ ┌─────┬──────────────┬────────┬────────┐│
│ │Task │Status        │Priority│Deadline││
│ ├─────┼──────────────┼────────┼────────┤│
│ │Prep │○             │High    │Friday  ││
│ │Send │○             │High    │Friday  ││
│ │Meet │○             │Medium  │Tomorrow││
│ └─────┴──────────────┴────────┴────────┘│
├─────────────────────────────────────────┤
│ Decisions                               │
│ • Finalize budget next week             │
├─────────────────────────────────────────┤
│ Needs Clarification                     │
│ (none)                                  │
└─────────────────────────────────────────┘
```

### Features

- Professional formatting
- Tables for tasks
- Page numbers
- Optimized for printing

### File Details

- **Extension:** `.pdf`
- **MIME Type:** `application/pdf`
- **Size:** Largest format
- **Human-readable:** Yes (formatted)

### Limitations

- Basic styling (no colors in tables)
- Single page for short reports
- May span multiple pages for long reports

---

## Export All Formats

Export all formats at once:

```typescript
import { exportAll } from '@/utils/export';

exportAll(analysisData, 'complete-report');
```

This downloads four files:
- `complete-report.json`
- `complete-report.csv`
- `complete-report.md`
- `complete-report.pdf`

---

## Implementation Details

### Download Function

```typescript
function downloadFile(
  content: string,
  filename: string,
  mimeType: string
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

### Helper Functions

```typescript
// Escape CSV special characters
function escapeCsv(text: string): string {
  return text.replace(/"/g, '""');
}

// Get urgency emoji
function getUrgencyEmoji(level: string): string {
  switch (level) {
    case 'critical': return '🔴';
    case 'high': return '🟠';
    case 'medium': return '🟡';
    case 'low': return '🔵';
    default: return '⚪';
  }
}
```

---

## Best Practices

### When to Use Each Format

| Scenario | Recommended Format |
|----------|-------------------|
| Backup data | JSON |
| Import to spreadsheet | CSV |
| Documentation | Markdown |
| Share with others | PDF |
| Complete archive | All formats |

### File Naming

Use descriptive names:

```typescript
// Good
exportToMarkdown(analysis, 'team-meeting-2024-01-15');
exportToJSON(analysis, 'project-tasks-backup');

// Avoid
exportToMarkdown(analysis, 'export');
exportToJSON(analysis, 'data');
```

### Timestamp in Filename

```typescript
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const filename = `analysis-${timestamp}`;
exportToJSON(analysis, filename);
```

---

## Troubleshooting

### Download Not Starting

**Cause:** Browser popup blocker

**Solution:** Allow downloads from the site

### PDF Looks Cut Off

**Cause:** Long content

**Solution:** Use Markdown format for long reports

### CSV Opens in Text Editor

**Cause:** Default app association

**Solution:** Open with Excel/Sheets, or change default app

### Special Characters in PDF

**Cause:** Font limitations

**Solution:** Use Markdown format for better character support

---

## Future Enhancements

Planned export improvements:

- [ ] Excel format (`.xlsx`) with styling
- [ ] HTML format for web viewing
- [ ] Custom export templates
- [ ] Batch export multiple analyses
- [ ] Export to cloud storage (Google Drive, Dropbox)
- [ ] Email export directly

---

**Need more?** See the [API Reference](./API.md#export)
