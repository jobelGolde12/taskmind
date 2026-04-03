# Bugs and Issues: TaskMind AI

## Identified Issues

### 🔴 Critical: Missing Detail View in History
- **Description:** The "View" button in the History page opens a modal that only displays placeholder text instead of the actual analysis results.
- **Impact:** Users cannot review past work effectively, undermining the purpose of the history feature.
- **Path:** `app/history/page.tsx`

### 🟠 Medium: Hydration Warnings
- **Description:** In `app/layout.tsx`, the `suppressHydrationWarning` attribute is used on the `<html>` tag. This is a common workaround in Next.js when using things like `localStorage` (via Zustand) which can cause a mismatch between server-side and client-side rendering.
- **Impact:** May lead to subtle UI flickering or "flashes" of unstyled content during hydration.
- **Recommendation:** Refactor state-dependent UI to only render after `useEffect` has confirmed client-side hydration.

### 🟠 Medium: Web Worker Initialization Race Condition
- **Description:** `lib/ai-engine.ts` initializes the Web-LLM model. If a user triggers an analysis before the model is ready, the current error handling might result in a "failed to analyze" message without explaining that it's still loading.
- **Impact:** Poor user experience during the initial multi-gigabyte model download.
- **Recommendation:** Better UI signaling for the initial model download phase.

### 🟢 Minor: Incomplete PDF/DOCX Error
- **Description:** The upload page accepts PDF/DOCX files but throws a generic error rather than a clear "Feature coming soon" or "Use TXT for now" message in a consistent way.
- **Impact:** Minor frustration for users trying to use common document formats.
- **Path:** `app/upload/page.tsx`

### 🟢 Minor: Local Storage Size Limits
- **Description:** Using `localStorage` via Zustand `persist` middleware can hit the ~5MB browser limit if a user has hundreds of large text analyses with deep history.
- **Impact:** At some point, new analyses will fail to save.
- **Recommendation:** Migrate from `localStorage` to **IndexedDB** for the primary history store.

---

## Technical Debt & Warnings

- **⚠️ Type Safety in AI Outputs:** The results from the AI are currently cast to typed interfaces (`tasksWithIds`, etc.). If the model's output schema changes or the prompt fails to generate valid JSON, the application could crash during rendering.
  - **Proposed Fix:** Use **Zod** to validate and safely parse the JSON output from the AI engine before updating the state.
- **⚠️ Inline Component Definitions:** Several pages define large sub-components within the same file (e.g., `StatCard` in `dashboard/page.tsx`). This makes unit testing these specific parts difficult.
