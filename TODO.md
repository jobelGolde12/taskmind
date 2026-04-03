You are a senior DevOps engineer. Your task is to Dockerize an existing Next.js application that is already running locally in the current directory.

## 🎯 Objective

Transform the current Next.js project into a fully Dockerized application that supports:

* Local development (optional but preferred)
* Production build and deployment
* Clean, optimized Docker image
* Future scalability (database, Redis, etc.)

The system must work with Docker version 29.3.0.

---

## 📦 Project Context

* The project is already a working Next.js app
* It uses npm (detect if yarn/pnpm is used and adjust)
* The app runs locally using `npm run dev` or `npm run build && npm start`
* No Docker setup exists yet

---

## 🧠 Tasks to Perform

### 1. Analyze the project

* Detect:

  * Package manager (npm, yarn, pnpm)
  * Presence of `.env` or `.env.local`
  * Next.js version (App Router or Pages Router)
  * Build/start scripts in `package.json`
* Ensure compatibility with Node 18+ (prefer `node:18-alpine` or newer stable)

---

### 2. Create a production-ready Dockerfile (MANDATORY)

Requirements:

* Use multi-stage build for optimization
* Minimize final image size
* Follow best practices for Next.js production

Steps:

* Stage 1 (builder):

  * Install dependencies
  * Copy project files
  * Run `npm run build`
* Stage 2 (runner):

  * Copy only necessary build files
  * Use non-root user if possible
  * Expose port 3000
  * Run `npm start`

Ensure:

* `.next`, `node_modules`, and build output handled correctly
* Avoid unnecessary files in final image

---

### 3. Create `.dockerignore` (MANDATORY)

Exclude:

* node_modules
* .next
* .git
* Dockerfile
* docker-compose.yml
* logs
* environment files if needed

---

### 4. Add docker-compose setup (IMPORTANT)

Create `docker-compose.yml` that:

* Runs the Next.js app
* Maps port 3000:3000
* Supports environment variables
* Allows easy scaling later

Optional (if detected or needed):

* Add database service (PostgreSQL or MySQL)
* Add Redis service if caching/session is used

---

### 5. Environment variables handling

* Detect `.env.local` or `.env`
* Ensure Docker supports environment variables securely
* Use `.env` file in docker-compose
* Do NOT hardcode secrets in Dockerfile

---

### 6. Optimize for production

* Use `NODE_ENV=production`
* Disable dev dependencies in final image
* Ensure fast startup
* Keep image lightweight

---

### 7. Add scripts to package.json (if needed)

Ensure:

* `"build"` exists → `next build`
* `"start"` exists → `next start`
* `"dev"` exists → `next dev`

---

### 8. Provide commands to run

The setup must support:

Build image:

```
docker build -t nextjs-app .
```

Run container:

```
docker run -p 3000:3000 nextjs-app
```

OR using docker-compose:

```
docker-compose up --build
```

---

### 9. Validate setup

Ensure:

* App runs on http://localhost:3000
* No missing dependencies
* No build errors
* Works exactly like local environment

---

### 10. Optional (ADVANCED but recommended)

If applicable:

* Enable hot reload in development mode using volumes
* Add separate dev and prod Docker configs
* Prepare for deployment (VPS, cloud, etc.)

---

## 🚀 Output Requirements

You MUST generate:

1. Dockerfile (multi-stage, production-ready)
2. .dockerignore
3. docker-compose.yml
4. Any required modifications to package.json
5. Clear instructions to run the container

Ensure:

* No errors
* Clean and professional structure
* Follows modern DevOps best practices

---

## ⚠️ Important Constraints

* Do NOT break existing Next.js functionality
* Do NOT assume unnecessary dependencies
* Keep setup minimal but scalable
* Ensure compatibility with Docker 29.3.0
* Avoid overengineering

---

## ✅ Final Goal

After execution, the developer should be able to run:

```
docker-compose up --build
```

And access the app at:

```
http://localhost:3000
```

with the same behavior as the original Next.js project.
