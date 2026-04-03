# Installation Guide

Detailed installation instructions for TaskMind AI.

## System Requirements

- **Node.js:** Version 18 or higher
- **npm:** Version 9 or higher
- **Browser:** Chrome, Firefox, Edge, or Safari (latest versions)
- **Storage:** At least 500MB free space (for AI model cache)
- **RAM:** Minimum 4GB (8GB recommended for AI processing)

## Installation Steps

### 1. Clone or Navigate to Project

If you haven't already, navigate to the project directory:

```bash
cd /path/to/taskmind
```

### 2. Install Dependencies

Install all required npm packages:

```bash
npm install
```

This installs:
- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **WebLLM** - Browser-based AI
- **Zustand** - State management
- **date-fns** - Date utilities
- **jsPDF** - PDF export
- And more...

### 3. Environment Configuration

Create a `.env` file in the project root:

```bash
touch .env
```

Add the following variables:

```env
# Turso Database (Optional)
# Get credentials from https://turso.tech
TURSO_DATABASE_URL=libsql://your-database-name-your-username.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here

# Application Settings
NEXT_PUBLIC_APP_NAME=TaskMind AI
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note:** The database is optional. The app works with browser localStorage by default.

### 4. Verify Installation

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the TaskMind AI homepage.

## Optional: Set Up Turso Database

### Step 1: Create Turso Account

1. Visit [https://turso.tech](https://turso.tech)
2. Sign up for a free account
3. Create a new database

### Step 2: Get Credentials

1. Go to your database dashboard
2. Copy the database URL
3. Generate an auth token

### Step 3: Update .env

```env
TURSO_DATABASE_URL=libsql://your-db.your-user.turso.io
TURSO_AUTH_TOKEN=your_token_here
```

### Step 4: Initialize Database

The database schema will be created automatically on first run. To manually seed:

```typescript
// In a Node.js script or REPL
import { initializeDatabase, seedDatabase } from './lib/seed';

await initializeDatabase();
await seedDatabase();
```

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 110+ | ✅ Full |
| Edge | 110+ | ✅ Full |
| Firefox | 115+ | ✅ Full |
| Safari | 16+ | ✅ Full |
| Opera | 95+ | ✅ Full |

## Troubleshooting

### Node Version Error

```bash
# Check Node version
node --version

# If below 18, update Node.js
# Visit https://nodejs.org or use nvm:
nvm install 18
nvm use 18
```

### Permission Issues (Linux/Mac)

```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### AI Model Download Fails

The WebLLM model downloads on first use. If it fails:

1. Check internet connection
2. Disable ad blockers
3. Try in incognito mode
4. Check browser console for errors

### Memory Issues

If you experience memory problems during build:

```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

## Production Build

For production deployment:

```bash
# Build the application
npm run build

# Start production server
npm run start
```

The build output will be in the `.next` directory.

## Deployment Options

See the [Deployment Guide](./DEPLOYMENT.md) for:
- Vercel deployment
- Docker deployment
- Self-hosted options

## Next Steps

- [Quick Start Guide](./QUICKSTART.md) - Get started using the app
- [Features Guide](./FEATURES.md) - Learn all features
- [Development Guide](./DEVELOPMENT.md) - Start developing

---

**Installation complete!** 🎉
