# Quick Start Guide

Get TaskMind AI up and running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Modern web browser (Chrome, Firefox, Edge, Safari)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your Turso credentials (optional - the app works without a database):

```env
# Turso Database Configuration
TURSO_DATABASE_URL=libsql://your-database-name-your-username.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here

# Application Settings
NEXT_PUBLIC_APP_NAME=TaskMind AI
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note:** The database is optional. TaskMind AI works fully with browser-based storage.

## Step 3: Start Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

## Step 4: Try It Out

### Analyze Text

1. Navigate to `/analyze`
2. Paste an email, message, or announcement
3. Click "Analyze"
4. Review extracted tasks, deadlines, and decisions

**Example text to try:**

```
Team meeting tomorrow at 3pm. Please prepare the Q4 report and send it to John by Friday. 
We need to finalize the budget decision next week. Also, someone needs to update the 
presentation slides before the client call on Monday.
```

### Upload a File

1. Navigate to `/upload`
2. Drag and drop a `.txt` file or click to browse
3. Review the text preview
4. Click "Process File"

### View Dashboard

1. Navigate to `/dashboard`
2. See overview of all tasks
3. Filter by urgency or deadline
4. Track completion rate

### Browse History

1. Navigate to `/history`
2. Search past analyses
3. Export results (JSON, Markdown, PDF)
4. Delete old entries

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Project Structure

```
taskmind/
├── app/               # Next.js app directory
│   ├── analyze/       # Text analysis page
│   ├── dashboard/     # Dashboard page
│   ├── upload/        # File upload page
│   ├── history/       # History page
│   └── layout.tsx     # Root layout
├── components/        # React components
│   ├── analysis/      # Analysis components
│   └── ui/            # UI components
├── lib/               # Core libraries
│   ├── ai-engine.ts   # AI processing
│   └── prompts.ts     # AI prompts
├── store/             # Zustand store
├── utils/             # Utility functions
└── docs/              # Documentation
```

## Next Steps

- Read the [Features Guide](./FEATURES.md) to learn all capabilities
- Check the [AI Architecture](./AI_ARCHITECTURE.md) to understand how it works
- See [Development Guide](./DEVELOPMENT.md) for contribution guidelines

## Troubleshooting

### AI Model Not Loading

- Ensure you have a stable internet connection (model downloads on first use)
- Try a different browser (Chrome/Edge recommended)
- Check browser console for errors

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### TypeScript Errors

```bash
# Run type checking
npm run build
```

## Need Help?

- Check the [full documentation](./README.md)
- Review the [API Reference](./API.md)
- See the [Database Guide](./DATABASE.md)

---

**Happy analyzing!** 🚀
