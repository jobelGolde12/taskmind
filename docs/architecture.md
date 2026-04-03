# Architecture Analysis: TaskMind AI

## Folder Structure
```text
/
├── app/                  # Next.js App Router (pages and layouts)
│   ├── analyze/          # Core text analysis page
│   ├── dashboard/        # Task statistics and overview
│   ├── history/          # Past analyses management
│   ├── upload/           # File upload interface
│   └── (layouts)/        # Root layouts and global styling
├── components/           # Reusable UI and domain components
│   ├── analysis/         # Components for displaying analysis results
│   └── ui/               # Base UI primitives (shadcn-inspired)
├── lib/                  # Core business logic and integrations
│   ├── ai-engine.ts      # MLC-AI Web-LLM wrapper
│   ├── db.ts             # IndexedDB/SQLite wrappers (future proofing)
│   ├── schema.ts         # Data model definitions
│   └── repository.ts     # Data access layer abstractions
├── store/                # State management
│   └── useAppStore.ts    # Zustand store for app state and history
├── utils/                # General-purpose utility functions
│   ├── dateParser.ts     # Smart date/deadline parsing
│   ├── export.ts         # JSON/Markdown export logic
│   └── textCleaner.ts    # Input normalization for AI
└── docs/                 # Documentation (this folder)
```

## Routing System
TaskMind AI uses the **Next.js App Router** with several core routes:
- `/` - Landing page with marketing overview.
- `/dashboard` - Visual metrics and pending task highlights.
- `/analyze` - The primary functional interface for text processing.
- `/upload` - Document-based task extraction.
- `/history` - Data management and export interface.

Navigation is handled globally via `LayoutWrapper` in `app/layout-wrapper.tsx`, which provides a consistent sidebar across all pages.

## State Management
The project uses **Zustand** for centralized state management (`store/useAppStore.ts`). 
- **Persistence:** The store uses `persist` middleware (likely syncing with `localStorage`) to ensure that analyses and user preferences remain available across sessions.
- **Key Stores:**
  - `analyses`: History of all processed text and extracted items.
  - `currentAnalysis`: The analysis currently being viewed or processed.
  - `uiState`: Management of sidebar expansion and theme.

## AI Integration (Local Engine)
The core logic resides in `lib/ai-engine.ts`.
- **Engine:** `@mlc-ai/web-llm` is used to load and run LLMs entirely in the browser.
- **Isolation:** Processing happens within a **Web Worker** to prevent the main UI thread from freezing during heavy computation.
- **Prompting:** Specialized prompts in `lib/prompts.ts` guide the model to output structured JSON for tasks, deadlines, and decisions.

## Database Usage
Currently, the system uses client-side persistence via Zustand. However, `lib/schema.ts` and `lib/db.ts` indicate an intended migration toward a more robust local storage solution like **IndexedDB** or **SQLite (WASM)** for handling larger datasets and complex queries in the future.

## Environment Variables
The project uses standard Next.js environmental configuration:
- `NEXT_PUBLIC_...` variables would be used for any future external API integrations (e.g., optional cloud-based AI fallbacks).
- Currently, the project is mostly zero-config for local development.
