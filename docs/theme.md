Theme Concept: AeroForm
Precision. Breathability. Adaptive Clarity.
AeroForm is a contemporary, function-first web theme built on mathematical spacing, fluid typography, and seamless light/dark adaptation. It strips visual noise while preserving emotional depth through subtle depth cues, intentional contrast, and micro-interactions. Ideal for SaaS, tech startups, modern portfolios, editorial platforms, and premium e-commerce.
🎨 Color System
Uses perceptually uniform oklch for better cross-device consistency, with fallback hex values.
Token
Light Mode
Dark Mode
Usage
--bg-primary
#F8F9FB
#0F1115
Page background
--bg-surface
#FFFFFF
#1A1D24
Cards, modals, headers
--text-primary
#111827
#F9FAFB
Headings, body
--text-secondary
#6B7280
#9CA3AF
Captions, labels, placeholders
--accent
#4F46E5
#60A5FA
Primary actions, links, focus rings
--accent-hover
#4338CA
#93C5FD
Hover states
--border
#E5E7EB
#374151
Dividers, inputs, cards
--success
#10B981
#34D399
Validation, positive states
--warning
#F59E0B
#FBBF24
Alerts, attention states
--error
#EF4444
#F87171
Errors, destructive actions
CSS Variables Setup:
css
1234567891011121314151617
🔤 Typography
Headings: Plus Jakarta Sans (geometric, modern, highly legible at scale)
Body/UI: Inter (neutral, optimized for screens)
Fluid Scale: clamp() based on viewport
css
12345678
Weights: 500 for UI labels, 600/700 for headings, 400/500 for body
Line Heights: 1.2 (headings), 1.6 (body), 1.4 (UI/labels)
📐 Layout & Spacing
Grid: 12-column, max-width 1280px, gutter 24px
Spacing Scale: 4px base → 4, 8, 12, 16, 24, 32, 48, 64, 96
Whitespace Strategy: Asymmetric balance, generous section padding (py-16 to py-24 on desktop)
Container Queries: Component-level responsiveness (.card, .nav, .hero)
Sticky Header: backdrop-filter: blur(12px) + --bg-surface at 85% opacity
🧩 UI Components
Component
Light Mode Style
Dark Mode Style
Buttons
Flat, 8px radius, 1px --border on secondary, --accent fill on primary. Hover: scale(1.02) + --accent-hover. Focus: 3px outline offset.
Same structure, adjusted contrast. Primary uses lighter --accent to avoid glare.
Cards
No drop shadows. 1px --border, --bg-surface, padding: 24px. Hover: border shifts to --accent.
Subtle inner glow box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05). Hover: border + slight surface lift.
Inputs
Floating labels, border: 1px solid --border, focus: --accent ring + box-shadow: 0 0 0 3px oklch(0.54 0.21 264 / 0.2).
Same, with --bg-surface fill and adjusted focus ring opacity.
Navigation
Horizontal on desktop, gap: 32px. Active: border-bottom: 2px solid --accent. Mobile: slide-out drawer with transform: translateX(100%) → 0.
Identical layout. Background shifts to --bg-surface with backdrop-filter.
🖼️ Imagery & Graphics
Photography: High-contrast subjects on muted/desaturated backgrounds. Avoid pure white/black backdrops; use --bg-surface or subtle gradients.
Illustrations: Geometric line art, duotone using --accent + --text-secondary. SVG-optimized, responsive stroke widths.
Icons: 1.5px stroke, consistent corner radius (2px), filled on hover/active. Use currentColor for theme adaptation.
Data/Charts: Colorblind-safe palette (oklch-based), grid lines at 15% opacity, tooltips with --bg-surface + border.
✨ Motion & Micro-interactions
Page Transitions: opacity 0.3s ease-out, transform: translateY(8px) → 0
Scroll Reveal: Intersection Observer + CSS @keyframes fadeSlideUp
Hover States: transform: translateY(-2px) scale(1.02), transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)
Loading: Skeleton screens with @keyframes shimmer (gradient pan), never spinners
Reduced Motion: Respects @media (prefers-reduced-motion: reduce) → disables transforms, keeps opacity fades
Dark/Light Toggle: color-scheme swap + transition: background-color 0.3s, color 0.3s
♿ Accessibility & Performance
Contrast: All text ≥ 4.5:1 (AA), critical UI ≥ 7:1 (AAA)
Focus Management: Visible, 3px offset, never removed (outline: none banned)
Semantic HTML: <header>, <main>, <nav>, <section>, aria-label, role
Performance:
will-change: transform only on animated elements
contain: layout style for cards/sections
Lazy-load below-fold images + fetchpriority="low"
CSS @layer for theme, base, components, utilities
🛠️ Implementation Workflow
Design Tokens: Define in Figma → export via Tokens Studio → generate CSS/JSON
CSS Architecture:
css
1
Theme Toggle: Sync with prefers-color-scheme, store in localStorage, apply data-theme="dark" to <html>
Browser Support: Targets evergreen browsers. Use @supports for oklch fallbacks if needed (most 2024+ browsers support it).
Testing: Lighthouse, axe DevTools, prefers-contrast, prefers-reduced-motion, mobile touch targets (≥44px)
📦 Best Use Cases
SaaS dashboards & marketing sites
Tech/product portfolios
Modern editorial/blogging platforms
Premium e-commerce (minimalist product grids)
AI/tool landing pages requiring trust + clarity