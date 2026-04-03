# Technology Stack

Overview of technologies and libraries used in TaskMind AI.

## Core Technologies

### Frontend Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.2.2 | React framework with App Router |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5.x | Type safety |

**Why Next.js?**
- Server-side rendering capabilities
- App Router for modern routing
- Built-in optimization
- API routes for backend functionality
- Excellent Vercel deployment

### Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4.x | Utility-first CSS |
| **PostCSS** | 8.x | CSS processing |

**Why Tailwind CSS?**
- Rapid UI development
- Consistent design system
- Small bundle size with purging
- Dark mode support built-in

### Animation & Icons

| Technology | Version | Purpose |
|------------|---------|---------|
| **Framer Motion** | Latest | Animations |
| **Lucide React** | Latest | Icon library |

**Why Framer Motion?**
- Declarative animations
- Gesture support
- Layout animations
- Performance optimized

## AI & Machine Learning

### WebLLM

| Technology | Version | Purpose |
|------------|---------|---------|
| **@mlc-ai/web-llm** | Latest | Browser-based AI |

**Why WebLLM?**
- **Privacy-first** - All processing in browser
- **Offline capable** - Works without internet after load
- **No API costs** - Free to use
- **Multiple models** - Support for LLaMA, Mistral, etc.

**Supported Models:**
- Llama-3.2-1B-Instruct (default)
- Llama-3.2-3B-Instruct
- Mistral-7B-Instruct
- Phi-3-mini-Instruct

**Model Loading:**
```typescript
import * as webllm from '@mlc-ai/web-llm';

const engine = await webllm.CreateMLCEngine('Llama-3.2-1B-Instruct-q4f32_1-MLC');
```

## State Management

### Zustand

| Technology | Version | Purpose |
|------------|---------|---------|
| **Zustand** | Latest | State management |

**Why Zustand?**
- Minimal boilerplate
- Built-in persistence
- TypeScript support
- Small bundle size (~1KB)

**Store Example:**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // State and actions
    }),
    { name: 'taskmind-storage' }
  )
);
```

## Database

### Turso (Optional)

| Technology | Version | Purpose |
|------------|---------|---------|
| **@libsql/client** | Latest | Edge database |

**Why Turso?**
- SQLite-compatible
- Edge-optimized
- Free tier available
- Simple setup

**Alternative:** Browser localStorage (default, no setup required)

## Date & Text Processing

### date-fns

| Technology | Version | Purpose |
|------------|---------|---------|
| **date-fns** | Latest | Date utilities |

**Why date-fns?**
- Modular (tree-shakeable)
- Immutable
- TypeScript support
- Modern API

### Custom Utilities

Built-in utilities for:
- Natural language date parsing
- Text cleaning and normalization
- Key information extraction

## Export Libraries

### jsPDF

| Technology | Version | Purpose |
|------------|---------|---------|
| **jspdf** | Latest | PDF generation |
| **jspdf-autotable** | Latest | PDF tables |

**Export Formats:**
- JSON - Raw data export
- CSV - Spreadsheet compatible
- Markdown - Documentation friendly
- PDF - Printable format

## Development Tools

### Code Quality

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **TypeScript** | Type checking |
| **Prettier** | Code formatting |

### Build Tools

| Tool | Purpose |
|------|---------|
| **Turbopack** | Fast bundling (Next.js 16) |
| **Next.js Compiler** | Optimization |

## UI Components

### Custom Component Library

TaskMind AI uses custom-built components inspired by shadcn/ui:

| Component | File |
|-----------|------|
| Button | `components/ui/button.tsx` |
| Card | `components/ui/card.tsx` |
| Textarea | `components/ui/textarea.tsx` |

**Design System:**
- Glassmorphism effects
- Dark mode first
- Consistent spacing (Tailwind)
- Accessible (ARIA support)

## Browser Requirements

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 110+ |
| Edge | 110+ |
| Firefox | 115+ |
| Safari | 16+ |

**Required Features:**
- WebAssembly (for WebLLM)
- SharedArrayBuffer (for WebLLM)
- localStorage
- Modern JavaScript (ES2020+)

## Package Dependencies

### Production Dependencies

```json
{
  "dependencies": {
    "next": "16.2.2",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "@mlc-ai/web-llm": "latest",
    "zustand": "latest",
    "framer-motion": "latest",
    "lucide-react": "latest",
    "date-fns": "latest",
    "zod": "latest",
    "react-hook-form": "latest",
    "@libsql/client": "latest",
    "jspdf": "latest",
    "jspdf-autotable": "latest",
    "clsx": "latest"
  }
}
```

### Development Dependencies

```json
{
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "16.2.2",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4"
  }
}
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    TaskMind AI                          │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │              Presentation Layer                  │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐ │   │
│  │  │  Home   │ │ Analyze │ │Dashboard│ │Upload │ │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └───────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Component Layer                     │   │
│  │  ActionList │ DeadlineCard │ UrgencyBadge │ ... │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │              State Management                    │   │
│  │              Zustand Store                       │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Business Logic                      │   │
│  │  AI Engine │ Date Parser │ Text Cleaner │ ...  │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Data Layer                          │   │
│  │  localStorage │ Turso (optional) │ Export       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Why This Stack?

1. **Privacy-First** - Browser-based AI means no data leaves the user's device
2. **Performance** - Next.js + Turbopack for fast builds and loads
3. **Type Safety** - TypeScript throughout for fewer bugs
4. **Modern UX** - Framer Motion for smooth animations
5. **Scalable** - Clean architecture for easy maintenance
6. **Offline-Capable** - Works without internet after initial load
7. **Cost-Effective** - No API costs with WebLLM

---

**Want to learn more?** Check the [AI Architecture](./AI_ARCHITECTURE.md) guide.
