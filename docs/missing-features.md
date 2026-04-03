# Missing Features: TaskMind AI

## Incomplete Functionality

### ❌ Document Parsing (PDF/DOCX)
- **Status:** ⚠️ Placeholder in `app/upload/page.tsx`.
- **Observation:** The UI allows users to select PDF and DOCX files, but the logic currently throws an error or message saying it's not supported.
- **Requirement:** Integrate a library like `pdf-parse` or a browser-based PDF reader to extract text before passing it to the AI engine.

### ❌ Settings & User Profile
- **Status:** ❌ Missing.
- **Observation:** The `LayoutWrapper` contains profile-like UI elements (avatar, dropdown potential), but there is no `/settings` page or profile management.
- **Requirement:** Create a settings page for managing local storage, AI model preferences (e.g., model size), and UI themes.

### ❌ Form Validation & Edge Case Handling
- **Status:** ⚠️ Basic.
- **Observation:** While `app/analyze/page.tsx` has basic empty-text checks, it lacks sophisticated validation for very long inputs that might exceed token limits or very short, non-sensical inputs.
- **Requirement:** Robust input length and content-type validation.

### ❌ Detail View in History
- **Status:** ❌ Placeholder text.
- **Observation:** The modal that opens when clicking "View" on an analysis in the history page contains placeholder text: `"Full analysis view - implement as needed"`.
- **Requirement:** A full, scrollable rendering of the analysis results (Summary, Tasks, Decisions, Confusion items) identical to or better than the one shown on the Analyze page.

### ❌ "Delete All" Analyses
- **Status:** ❌ Missing.
- **Observation:** Users must currently delete analyses one by one in the history page.
- **Requirement:** A "Clear History" button with a confirmation dialog.

---

## Features Implied by UI But Not Implemented

### ❌ Categorization System
- **Observation:** The `ActionItem` component and `schema.ts` include a `category` field (`work`, `personal`, etc.), but there is currently no way for the user to change this category or for the AI to reliably assign it without manual overrides.
- **Requirement:** UI for editing task categories and better prompt engineering to auto-categorize.

### ❌ Stakeholder Selection
- **Observation:** Decisions have a `stakeholders` field in the schema, but the current UI for displaying decisions doesn't allow for easy editing or deep searching of stakeholders.
- **Requirement:** Better visualization and tagging for people involved in decisions.

### ❌ Authentication & Sync
- **Observation:** The project title and general quality suggest a SaaS-like product, but it is currently strictly local.
- **Requirement:** Optional cloud sync (Firebase/Supabase) for users who want their history across devices.

### ❌ Reminders & Notifications
- **Observation:** With deadlines being extracted, the logical next step is a reminder system.
- **Requirement:** Browser notifications for tasks with upcoming deadlines.
