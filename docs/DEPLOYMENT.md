# Deployment Guide

How to deploy TaskMind AI to production.

## Deployment Options

TaskMind AI can be deployed to various platforms:

- **Vercel** - Recommended (creators of Next.js)
- **Netlify** - Alternative option
- **Docker** - Self-hosted
- **Manual** - Any Node.js host

---

## Vercel Deployment (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Prerequisites

- Vercel account (free tier available)
- GitHub/GitLab/Bitbucket account
- Git repository

### Step 1: Push to Git

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Visit [https://vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### Step 3: Environment Variables

Add environment variables in Vercel dashboard:

```
TURSO_DATABASE_URL=libsql://your-db.your-user.turso.io
TURSO_AUTH_TOKEN=your_token_here
NEXT_PUBLIC_APP_NAME=TaskMind AI
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Step 4: Deploy

Click "Deploy" - Vercel will build and deploy your app.

### Step 5: Custom Domain (Optional)

1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Automatic Deployments

Vercel automatically deploys:
- **Production** - On push to `main` branch
- **Preview** - On pull requests

---

## Netlify Deployment

Alternative deployment platform.

### Step 1: Connect to Git

1. Visit [https://netlify.com](https://netlify.com)
2. Click "Add new site"
3. Import from Git

### Step 2: Build Settings

```
Build command: npm run build
Publish directory: .next
```

### Step 3: Environment Variables

Add same environment variables as Vercel.

### Step 4: Deploy

Click "Deploy site".

---

## Docker Deployment

Self-host using Docker.

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### .dockerignore

```
node_modules
.next
.git
.env.local
*.md
docs/
```

### Build Docker Image

```bash
docker build -t taskmind-ai .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e TURSO_DATABASE_URL=your_url \
  -e TURSO_AUTH_TOKEN=your_token \
  taskmind-ai
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  taskmind:
    build: .
    ports:
      - "3000:3000"
    environment:
      - TURSO_DATABASE_URL=${TURSO_DATABASE_URL}
      - TURSO_AUTH_TOKEN=${TURSO_AUTH_TOKEN}
      - NEXT_PUBLIC_APP_NAME=TaskMind AI
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

---

## Manual Deployment

Deploy to any Node.js host.

### Step 1: Build Locally

```bash
npm run build
```

### Step 2: Upload Files

Upload these to your server:
- `.next/` directory
- `public/` directory
- `package.json`
- `package-lock.json`
- `next.config.ts`

### Step 3: Install Dependencies

```bash
npm install --production
```

### Step 4: Set Environment Variables

```bash
export TURSO_DATABASE_URL=your_url
export TURSO_AUTH_TOKEN=your_token
```

### Step 5: Start Server

```bash
npm run start
```

### Process Manager (PM2)

For production, use PM2:

```bash
npm install -g pm2

pm2 start npm --name "taskmind" -- run start
pm2 save
pm2 startup
```

---

## Production Checklist

Before deploying to production:

### Code Quality

- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] All tests pass
- [ ] No console errors in browser

### Performance

- [ ] Build size is optimized
- [ ] Images are optimized
- [ ] Lighthouse score is good

### Security

- [ ] Environment variables are set
- [ ] No sensitive data in code
- [ ] HTTPS is enabled
- [ ] Security headers configured

### Functionality

- [ ] All features work in production
- [ ] AI model loads correctly
- [ ] Database connection works
- [ ] Export functions work

### SEO

- [ ] Meta tags are correct
- [ ] Open Graph tags work
- [ ] Sitemap is generated
- [ ] Robots.txt configured

---

## Post-Deployment

### Monitoring

Set up monitoring:

**Vercel Analytics:**
- Built-in for Vercel deployments
- Visit Vercel dashboard > Analytics

**Custom Monitoring:**
```typescript
// Add error tracking
import { trackError } from './monitoring';

try {
  // Code
} catch (error) {
  trackError(error);
}
```

### Backups

**Database Backup:**
```typescript
// Export data regularly
const backup = await exportDatabase();
await saveToCloud(backup);
```

**Code Backup:**
- Use Git (already configured)
- Tag releases

### Updates

**Deploy Updates:**

```bash
# Pull latest changes
git pull origin main

# Rebuild
npm run build

# Restart (if using PM2)
pm2 restart taskmind
```

**Vercel:** Push to Git - automatic deployment.

---

## Troubleshooting

### Build Fails

```
Error: Build failed
```

**Solutions:**
- Check TypeScript errors: `npm run build`
- Clear cache: `rm -rf .next && npm run build`
- Check Node version: `node --version` (need 18+)

### AI Model Not Loading

```
Error: Failed to load model
```

**Solutions:**
- Check CDN access
- Verify browser compatibility
- Check browser console for errors

### Database Connection Fails

```
Error: Failed to connect to database
```

**Solutions:**
- Verify environment variables
- Check Turso credentials
- Test connection locally

### Port Already in Use

```
Error: Port 3000 is already in use
```

**Solutions:**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run start
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `TURSO_DATABASE_URL` | No | Turso database URL |
| `TURSO_AUTH_TOKEN` | No | Turso auth token |
| `NEXT_PUBLIC_APP_NAME` | No | App name display |
| `NEXT_PUBLIC_APP_URL` | No | App base URL |

---

## Performance Optimization

### Enable Compression

Next.js handles compression automatically.

### CDN for Static Assets

Vercel/Netlify provide CDN by default.

### Database Optimization

```typescript
// Use indexes
CREATE INDEX idx_tasks_urgency ON tasks(urgency_level);

// Limit query results
SELECT * FROM analyses ORDER BY created_at DESC LIMIT 50;
```

---

## Scaling

### Horizontal Scaling

- Deploy multiple instances
- Use load balancer
- Shared database (Turso)

### Vertical Scaling

- Increase server resources
- Use larger Vercel plan
- Upgrade database tier

### Caching

- Browser caching (static assets)
- CDN caching (Vercel/Netlify)
- Database query caching

---

**Need help?** Check the [Troubleshooting Guide](#troubleshooting)
