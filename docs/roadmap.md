# Project Roadmap: TaskMind AI

## Phase 1: Core Stability (Current)
- [✅] Next.js 15+ App Router setup.
- [✅] Basic AI Engine integration with Web-LLM.
- [✅] State management with Zustand.
- [✅] Essential pages: Analyze, History, Dashboard, Upload.
- [✅] Basic UI/UX with dark mode and glassmorphism.

## Phase 2: Feature Parity & Polish (Next 2-4 Weeks)
- [ ] **Complete History Detail View:** Render full results in the history modal.
- [ ] **PDF/DOCX Extraction:** Implement browser-based document parsing in the Upload flow.
- [ ] **Task & Decision Editing:** Allow users to refine AI-extracted content manually.
- [ ] **Interactive Onboarding:** Guided tour for new users explaining local AI processing.
- [ ] **Micro-interactions:** Add sparkles, pops, and staggered animations for a more "alive" feel.

## Phase 3: Performance & Robustness (Next 1-2 Months)
- [ ] **IndexedDB Migration:** Replace `localStorage` with a robust local database for large histories.
- [ ] **Granular Store Selectors:** Optimize re-renders across all views.
- [ ] **Zod Schema Validation:** Strictly validate all AI outputs.
- [ ] **Progressive Model Loading:** Smarter caching and progress reporting for AI models.
- [ ] **Error Boundaries:** Graceful handling of local model or browser worker crashes.

## Phase 4: Advanced Features & Ecosystem (Next 3-6 Months)
- [ ] **Browser Notifications:** Reminders for tasks with upcoming deadlines.
- [ ] **Mobile App (PWA):** Enhance the app for full "offline-first" mobile usage.
- [ ] **Light Mode:** Add a high-contrast theme option.
- [ ] **Optional Cloud Sync:** Opt-in backend for users who want cross-device history.
- [ ] **Browser Extension:** Directly analyze text from any webpage or email client.
- [ ] **Task Export Integrations:** Directly send tasks to Jira, Notion, or Trello.
