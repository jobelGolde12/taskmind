# Development Guide

How to develop and contribute to TaskMind AI.

## Prerequisites

- Node.js 18+
- Git
- Code editor (VS Code recommended)
- Modern browser with DevTools

## Getting Started

### 1. Clone and Install

```bash
# Navigate to project
cd taskmind

# Install dependencies
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Set Up Environment

```bash
# Create .env file
cp .env.example .env

# Edit with your settings (optional)
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Edit files in your code editor. The dev server auto-reloads.

### 3. Test Changes

- Test in browser
- Check console for errors
- Verify TypeScript compiles

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

## Code Style

### TypeScript

- Use strict typing
- Define interfaces for data structures
- Avoid `any` type when possible

```typescript
// Good
interface Task {
  id: string;
  content: string;
  completed: boolean;
}

// Avoid
const task: any = {};
```

### Component Structure

```typescript
'use client';

import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';

interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export function Component({ prop1, prop2 = 0 }: ComponentProps) {
  return (
    <div className="...">
      {/* Content */}
    </div>
  );
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ActionList.tsx` |
| Functions | camelCase | `parseDate()` |
| Variables | camelCase | `urgencyScore` |
| Constants | UPPER_SNAKE | `SYSTEM_PROMPT` |
| Files | camelCase | `dateParser.ts` |
| Pages | lowercase | `analyze/page.tsx` |

### CSS Classes

Use Tailwind utility classes:

```typescript
// Good
<div className="flex items-center gap-2 rounded-lg bg-blue-500 p-4" />

// Avoid
<div className="my-custom-class" />
```

## Available Scripts

```bash
# Development
npm run dev           # Start dev server (port 3000)

# Production
npm run build         # Build for production
npm run start         # Start production server

# Code Quality
npm run lint          # Run ESLint
```

## Project Structure

See [Project Structure](./STRUCTURE.md) for detailed overview.

## Key Directories

### `/app` - Pages

```
app/
├── analyze/page.tsx      # Main analysis page
├── dashboard/page.tsx    # Dashboard
├── upload/page.tsx       # File upload
└── history/page.tsx      # History view
```

### `/components` - UI Components

```
components/
├── analysis/             # Analysis components
│   ├── ActionList.tsx
│   ├── DeadlineCard.tsx
│   ├── UrgencyBadge.tsx
│   └── ConfusionBox.tsx
└── ui/                   # Base components
    ├── button.tsx
    ├── card.tsx
    └── textarea.tsx
```

### `/lib` - Core Logic

```
lib/
├── ai-engine.ts          # AI processing
├── prompts.ts            # AI prompts
├── db.ts                 # Database client
└── repository.ts         # Data access
```

### `/store` - State

```
store/
└── useAppStore.ts        # Zustand store
```

### `/utils` - Helpers

```
utils/
├── dateParser.ts         # Date utilities
├── textCleaner.ts        # Text utilities
└── export.ts             # Export utilities
```

## Common Tasks

### Adding a New Page

1. Create folder in `/app`
2. Add `page.tsx` file
3. Import and add to navigation

```typescript
// app/new-feature/page.tsx
export default function NewFeaturePage() {
  return (
    <div>
      <h1>New Feature</h1>
      {/* Content */}
    </div>
  );
}
```

### Adding a New Component

1. Create file in `/components`
2. Export component
3. Import where needed

```typescript
// components/analysis/NewComponent.tsx
interface NewComponentProps {
  data: string;
}

export function NewComponent({ data }: NewComponentProps) {
  return <div>{data}</div>;
}
```

### Modifying AI Prompts

Edit `/lib/prompts.ts`:

```typescript
export const SYSTEM_PROMPT = `
  Updated prompt here...
`;
```

### Adding State

Edit `/store/useAppStore.ts`:

```typescript
interface AppState {
  // Add new state
  newFeature: boolean;
  
  // Add actions
  setNewFeature: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      newFeature: false,
      setNewFeature: (value) => set({ newFeature: value }),
      // ...existing state
    }),
    { name: 'taskmind-storage' }
  )
);
```

## Testing

### Manual Testing

1. Test in multiple browsers
2. Test responsive design
3. Test offline functionality
4. Test with various input lengths

### Browser DevTools

```javascript
// Check store state
useAppStore.getState()

// Check AI engine
import { aiEngine } from '@/lib/ai-engine'
aiEngine.isReady()
```

## Debugging

### Common Issues

#### AI Not Loading

```typescript
// Check browser console
// Look for WebLLM errors
// Verify model download completed
```

#### State Not Persisting

```typescript
// Check localStorage
localStorage.getItem('taskmind-storage')

// Clear and reset
localStorage.removeItem('taskmind-storage')
```

#### Build Errors

```bash
# Clear cache
rm -rf .next node_modules

# Reinstall
npm install

# Rebuild
npm run build
```

## Performance Tips

### Optimize Images

```typescript
import Image from 'next/image';

// Use Next.js Image component
<Image src="/logo.png" alt="Logo" width={100} height={100} />
```

### Lazy Load Components

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### Memoize Expensive Operations

```typescript
import { useMemo } from 'react';

const processed = useMemo(() => {
  return expensiveOperation(data);
}, [data]);
```

## Git Workflow

### Commit Message Format

```
type: description

[optional body]

[optional footer]
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Tests
- `chore:` - Maintenance

### Examples

```bash
feat: add PDF export functionality
fix: resolve date parsing edge case
docs: update installation guide
refactor: simplify AI engine initialization
```

## Contributing

### Pull Request Process

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit PR with description

### PR Checklist

- [ ] Code follows style guide
- [ ] TypeScript compiles without errors
- [ ] Tested in multiple browsers
- [ ] Documentation updated
- [ ] No console errors or warnings

## Documentation

### Updating Docs

1. Edit files in `/docs`
2. Update index if needed
3. Use clear, concise language
4. Include code examples

### Documentation Standards

- Use Markdown formatting
- Include code examples
- Add screenshots when helpful
- Keep language simple

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)
- [WebLLM](https://webllm.mlc.ai/)

---

**Ready to contribute?** Start with the [Quick Start Guide](./QUICKSTART.md)
