# Project Overview: TaskMind AI

## Project Title and Purpose
**TaskMind AI** is a privacy-first, browser-based AI application designed to convert unstructured text (emails, messages, announcements) into actionable tasks, deadlines, and decisions. It leverages local Large Language Models (LLMs) to ensure that sensitive data never leaves the user's device.

## Tech Stack
- **Framework:** Next.js 15.1 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand (Client-side persistence)
- **AI Engine:** @mlc-ai/web-llm (Browser-based local LLM)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **UI Components:** Radix UI primitives (via Shadcn UI patterns)

## Key Features Implemented
- ✅ **Local AI Analysis:** Real-time text analysis using browser-based LLMs.
- ✅ **Task Extraction:** Automatic identification of action items with urgency scoring.
- ✅ **Deadline Detection:** Smart extraction and formatting of dates/deadlines.
- ✅ **Decision Tracking:** Capturing key decisions and stakeholders from text.
- ✅ **Clarification Identification:** Highlighting ambiguous points that need user attention.
- ✅ **File Upload:** Support for `.txt` file processing (local reading).
- ✅ **Dashboard:** Visual overview of task statistics and upcoming deadlines.
- ✅ **History & Export:** Persistence of past analyses with Markdown/JSON export.
- ✅ **Responsive Design:** Fully adaptive UI with a modern dark-themed "glassmorphism" aesthetic.

## General Assessment
**Status:** Intermediate / Production-Ready (Beta)

The project is highly functional and demonstrates a sophisticated use of modern web technologies, particularly local AI processing. The architectural foundation is solid, with clear separation of concerns between the AI engine, state management, and UI.

**Strengths:**
- Exceptional privacy model (no server-side AI).
- Polished, modern UI/UX with consistent design language.
- Robust state management with Zustand.

**Weaknesses:**
- Initial AI model loading is heavy (typical for Web-LLM).
- Placeholder support for PDF/DOCX parsing.
- Lack of multi-device sync (inherent to local-only approach without backend).
