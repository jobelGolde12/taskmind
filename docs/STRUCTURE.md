# Project Structure

Overview of the TaskMind AI file and folder organization.

## Root Structure

```
taskmind/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                    # Core libraries and utilities
├── store/                  # Zustand state management
├── utils/                  # Helper functions
├── docs/                   # Documentation
├── public/                 # Static assets
├── node_modules/           # Dependencies
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS config
├── next.config.ts          # Next.js configuration
└── README.md               # Project README
```

## App Directory (`/app`)

Next.js 14+ App Router structure:

```
app/
├── layout.tsx              # Root layout (server component)
├── layout-wrapper.tsx      # Client layout wrapper
├── providers.tsx           # Context providers
├── page.tsx                # Home page
├── globals.css             # Global styles
├── favicon.ico             # Site favicon
│
├── analyze/
│   └── page.tsx            # Text analysis page
│
├── dashboard/
│   └── page.tsx            # Dashboard overview page
│
├── upload/
│   └── page.tsx            # File upload page
│
└── history/
    └── page.tsx            # Analysis history page
```

### Page Responsibilities

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Landing page with features |
| Analyze | `/analyze` | Main text analysis interface |
| Dashboard | `/dashboard` | Task overview and statistics |
| Upload | `/upload` | File upload and processing |
| History | `/history` | Past analyses management |

## Components Directory (`/components`)

```
components/
├── analysis/               # Analysis-specific components
│   ├── ActionList.tsx      # Task checklist component
│   ├── DeadlineCard.tsx    # Deadline display component
│   ├── UrgencyBadge.tsx    # Urgency indicator
│   └── ConfusionBox.tsx    # Confusion display
│
└── ui/                     # Reusable UI components
    ├── button.tsx          # Button component
    ├── card.tsx            # Card components
    └── textarea.tsx        # Text input component
```

### Component Hierarchy

```
Page Components
├── Analysis Components
│   ├── ActionList
│   │   └── ActionItem
│   ├── DeadlineCard
│   ├── UrgencyBadge
│   │   └── UrgencyMeter
│   └── ConfusionBox
│       └── ConfusionList
│
└── UI Components
    ├── Button
    ├── Card
    │   ├── CardHeader
    │   ├── CardContent
    │   └── CardFooter
    └── Textarea
```

## Library Directory (`/lib`)

Core business logic and integrations:

```
lib/
├── ai-engine.ts            # WebLLM AI engine
├── prompts.ts              # AI prompt templates
├── db.ts                   # Turso database client
├── schema.ts               # Database schema
├── seed.ts                 # Database seeders
├── repository.ts           # Data access layer
└── utils.ts                # Utility functions
```

### Key Files

#### `ai-engine.ts`
- WebLLM integration
- Text analysis logic
- Response parsing
- Urgency validation

#### `prompts.ts`
- System prompts
- Analysis prompts
- Date parsing prompts
- Multi-language support

#### `repository.ts`
- Database CRUD operations
- Type-safe queries
- Data transformation

## Store Directory (`/store`)

State management with Zustand:

```
store/
└── useAppStore.ts          # Main application store
```

### Store Structure

```typescript
{
  // Current analysis
  currentAnalysis: Analysis | null
  isAnalyzing: boolean
  analysisProgress: Progress | null
  
  // History
  analyses: Analysis[]
  
  // UI State
  darkMode: boolean
  sidebarOpen: boolean
  
  // Filters
  filterUrgency: string | null
  filterCategory: string | null
  searchQuery: string
}
```

## Utils Directory (`/utils`)

Helper functions:

```
utils/
├── dateParser.ts           # Natural language date parsing
├── textCleaner.ts          # Text preprocessing
└── export.ts               # Export functionality
```

### Utility Functions

#### `dateParser.ts`
- `parseNaturalDate()` - Convert text to dates
- `detectTimeExpressions()` - Find time references
- Date formatting helpers

#### `textCleaner.ts`
- `cleanText()` - Preprocess text
- `extractKeyInfo()` - Extract people, dates, actions
- `getTextStats()` - Text statistics
- `isEmail()` - Detect email format

#### `export.ts`
- `exportToJSON()` - JSON export
- `exportToCSV()` - CSV export
- `exportToMarkdown()` - Markdown export
- `exportToPDF()` - PDF export

## Configuration Files

### `package.json`
Dependencies and npm scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

### `tsconfig.json`
TypeScript configuration for strict type safety.

### `tailwind.config.ts`
Tailwind CSS customization with custom colors and animations.

### `next.config.ts`
Next.js configuration for optimization and routing.

### `.env`
Environment variables (not committed to git):

```env
TURSO_DATABASE_URL=...
TURSO_AUTH_TOKEN=...
NEXT_PUBLIC_APP_NAME=TaskMind AI
```

## File Naming Conventions

- **Components:** PascalCase (e.g., `ActionList.tsx`)
- **Utilities:** camelCase (e.g., `dateParser.ts`)
- **Pages:** lowercase with hyphens (e.g., `analyze/page.tsx`)
- **Styles:** kebab-case (e.g., `globals.css`)

## Import Paths

Absolute imports are configured:

```typescript
// Instead of relative paths
import { Button } from '@/components/ui/button';
import { aiEngine } from '@/lib/ai-engine';
import { useAppStore } from '@/store/useAppStore';
```

## Code Organization Principles

1. **Separation of Concerns** - UI, logic, and data are separate
2. **Colocation** - Related files are grouped together
3. **Single Responsibility** - Each file has one purpose
4. **Type Safety** - TypeScript throughout
5. **Reusability** - Shared components in `/components/ui`

---

**Need more details?** Check the [API Reference](./API.md)
