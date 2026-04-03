# Design System: TaskMind AI

## Color Palette

### Core Theme (Dark Mode)
- **Background:** `hsl(var(--background))` - Deep dark (near-black).
- **Foreground:** `hsl(var(--foreground))` - High-contrast white/light-gray.
- **Muted:** `hsl(var(--muted))` - Lower contrast for secondary text/borders.
- **Card/Surface:** `bg-white/5` with `border-white/10` - Glassmorphism surface.

### Functional Accents
- **Primary (Blue/Purple):**
  - Gradient: `from-blue-500 to-purple-600`
  - Purpose: Buttons, primary actions, progress indicators.
- **Critical (Red):**
  - Text: `text-red-400`
  - Background: `bg-red-500/20`
  - Purpose: Critical urgency, deletion, errors.
- **High (Orange/Yellow):**
  - Text: `text-orange-400` / `text-yellow-400`
  - Purpose: High priority tasks, warnings.
- **Success (Green):**
  - Text: `text-green-400`
  - Purpose: Task completion, successful processing.

---

## Typography

### Font Families
- **Sans:** `Geist Sans` (Variable) - Modern, clean, professional.
- **Mono:** `Geist Mono` (Variable) - For data, previews, and code-like elements.

### Scale
- **H1 (Page Title):** `text-2xl font-bold`
- **H2 (Section Header):** `text-lg font-semibold`
- **Body:** `text-sm font-normal`
- **Caption/Subtle:** `text-xs font-medium text-muted-foreground`

---

## Spacing & Grid

### Vertical Spacing
- **Major Sections:** `space-y-6`
- **Minor Groupings:** `space-y-4` / `space-y-3`
- **Inline Items:** `space-y-1.5`

### Grid System
- **Stats:** `grid gap-4 sm:grid-cols-2 lg:grid-cols-4`
- **Split Views:** `grid gap-6 lg:grid-cols-2`
- **List Items:** `grid gap-4`

---

## Components

### Glassmorphism Card
```css
.card {
  @apply rounded-xl border border-white/10 bg-white/5 backdrop-blur-md;
}
```

### Interactive Hover State
```css
.interactive-hover {
  @apply transition-all hover:bg-white/[0.07] hover:scale-[1.01];
}
```

---

## Visual Accents
- **Gradients:** Subtle use of `bg-gradient-to-br` for background highlights.
- **Borders:** Extremely thin, semi-transparent borders (`border-white/10`) to define structure without heavy visual weight.
- **Shadows:** Minimal usage, preferring border contrast for definition.
