# Component Analysis: TaskMind AI

## Reusable UI Components (Shadcn-inspired)
Located in `components/ui/`

| Component | Purpose | Props & Reusability |
|-----------|---------|---------------------|
| `Button`  | Standard UI button with variants (outline, ghost, etc.) | High (standard shadcn pattern) |
| `Card`    | Container for grouping content (header, content, footer) | High |
| `Textarea`| Multiline text input field | High |

## Domain-Specific Components
Located in `components/analysis/`

| Component | Purpose | Props & Reusability |
|-----------|---------|---------------------|
| `ActionList`| Renders a list of extracted tasks with priority indicators | High (used in Analyze, History, Dashboard) |
| `UrgencyBadge`| Visual tag for task priority levels (low, medium, high, critical) | High (central priority indicator) |
| `UrgencyMeter`| Horizontal bar showing aggregate analysis urgency score | Medium (Analyze page) |
| `DeadlineCard`| Compact display for task due dates | High (within ActionItem) |
| `ConfusionBox`| Renders items flagged as ambiguous by the AI | Medium (Analyze, Detail views) |

## Quality Assessment

### ✅ Strengths
- **Consistent Design Language:** All components follow the same glassmorphism/dark-mode theme.
- **Good Use of Composition:** The `Card` component is effectively used to build complex UIs.
- **Strong Typing:** All components use TypeScript interfaces for props.

### ❌ Duplicate or Inefficient Components
- **None Major:** The project is lean and avoids obvious duplication in the `components/` folder.

### ❌ Poorly Structured Components
- **ActionList / ActionItem:** The `ActionItem` sub-component is defined inside the same file as `ActionList`. For better maintainability as the project grows, these should be separated into their own files.

### ❌ Components That Should Be Reusable But Are Not
- **StatCard (Dashboard):** Currently defined locally in `app/dashboard/page.tsx`. This is a highly reusable pattern for any analytics view and should be moved to `components/ui/` or a new `components/dashboard/`.
- **FeatureCard (Upload):** Currently defined locally in `app/upload/page.tsx`. A generic "Feature" or "Info" card could be useful elsewhere.
- **Layout Logic:** The sidebar navigation items and rendering logic are embedded in `app/layout-wrapper.tsx`. Moving navigation configuration and items to a separate component or config file would improve readability.

## Recommendations for Improvement
1. **Promote StatCard:** Move the `StatCard` component from `dashboard/page.tsx` to a shared component folder.
2. **Refactor ActionItems:** Separate `ActionItem` into its own file to facilitate easier testing and independent development.
3. **Abstract Navigation:** Create a `Sidebar` and `MobileNav` component to clean up `layout-wrapper.tsx`.
