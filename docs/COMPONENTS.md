# UI Components Guide

TaskMind AI component library documentation.

## Overview

TaskMind AI uses custom-built React components with a modern, glassmorphic design. All components are built with:
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons

---

## Analysis Components

Specialized components for displaying analysis results.

### ActionList

Display a list of extracted tasks.

**Location:** `components/analysis/ActionList.tsx`

**Usage:**
```typescript
import { ActionList } from '@/components/analysis/ActionList';

<ActionList
  tasks={tasks}
  onToggleComplete={(id) => handleToggle(id)}
  onDelete={(id) => handleDelete(id)}
  onEdit={(id, content) => handleEdit(id, content)}
  editable={true}
/>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `tasks` | Task[] | Yes | Array of task objects |
| `onToggleComplete` | (id: string) => void | No | Toggle completion |
| `onDelete` | (id: string) => void | No | Delete task |
| `onEdit` | (id: string, content: string) => void | No | Edit task content |
| `editable` | boolean | No | Show edit/delete buttons |

**Features:**
- Checkbox for completion
- Urgency badges
- Deadline display
- Category tags
- Hover actions (when editable)
- Smooth animations

**Example Task Object:**
```typescript
{
  id: 'task_123',
  content: 'Prepare Q4 report',
  completed: false,
  urgencyLevel: 'high',
  urgencyScore: 75,
  deadline: '2024-01-19T17:00:00.000Z',
  deadlineDisplay: 'Friday, EOD',
  category: 'work'
}
```

---

### DeadlineCard

Display deadline information with visual indicators.

**Location:** `components/analysis/DeadlineCard.tsx`

**Usage:**
```typescript
import { DeadlineCard } from '@/components/analysis/DeadlineCard';

// Full card
<DeadlineCard
  deadline="2024-01-19T17:00:00.000Z"
  deadlineDisplay="Friday, EOD"
  compact={false}
/>

// Compact version
<DeadlineCard
  deadline="2024-01-19T17:00:00.000Z"
  deadlineDisplay="Friday, EOD"
  compact={true}
/>
```

**Props:**

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `deadline` | string \| null | No | null |
| `deadlineDisplay` | string \| null | No | null |
| `compact` | boolean | No | false |

**Visual States:**
- **Overdue** - Red background, timer icon
- **Due Today** - Orange background, clock icon
- **Future** - Default background, calendar icon

**Features:**
- Automatic overdue detection
- Days-until-deadline display
- Human-readable formatting
- Responsive design

---

### UrgencyBadge

Color-coded urgency indicator.

**Location:** `components/analysis/UrgencyBadge.tsx`

**Usage:**
```typescript
import { UrgencyBadge } from '@/components/analysis/UrgencyBadge';

<UrgencyBadge
  level="high"
  score={75}
  size="md"
  showLabel={true}
/>
```

**Props:**

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `level` | UrgencyLevel | Yes | - |
| `score` | number | No | - |
| `size` | 'sm' \| 'md' \| 'lg' | No | 'md' |
| `showLabel` | boolean | No | true |

**Urgency Levels:**

| Level | Color | Icon | Score Range |
|-------|-------|------|-------------|
| `low` | Blue | Info | 0-39 |
| `medium` | Yellow | Alert Circle | 40-69 |
| `high` | Orange | Alert Triangle | 70-89 |
| `critical` | Red | Flame | 90-100 |

**Size Variants:**
- **sm** - Small, icon only or minimal
- **md** - Medium, with label
- **lg** - Large, with score

---

### UrgencyMeter

Visual progress bar showing urgency score.

**Location:** `components/analysis/UrgencyBadge.tsx`

**Usage:**
```typescript
import { UrgencyMeter } from '@/components/analysis/UrgencyBadge';

<UrgencyMeter score={75} showLabel={true} />
```

**Props:**

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `score` | number | Yes | - |
| `showLabel` | boolean | No | true |

**Features:**
- Gradient color based on score
- Animated fill
- Scale indicators (0-100)
- Level label

**Color Gradients:**
- 90-100: Red
- 70-89: Orange
- 40-69: Yellow
- 0-39: Blue

---

### ConfusionBox

Display a single confusion item.

**Location:** `components/analysis/ConfusionBox.tsx`

**Usage:**
```typescript
import { ConfusionBox } from '@/components/analysis/ConfusionBox';

<ConfusionBox
  item="Unclear deadline mentioned"
  suggestion="When is this due?"
  index={0}
/>
```

**Props:**

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `item` | string | Yes | - |
| `suggestion` | string \| null | No | null |
| `index` | number | No | 0 |

**Features:**
- Amber/warning styling
- Alert icon
- Optional suggestion with help icon
- Staggered animation

---

### ConfusionList

Display list of confusion items.

**Location:** `components/analysis/ConfusionBox.tsx`

**Usage:**
```typescript
import { ConfusionList } from '@/components/analysis/ConfusionBox';

<ConfusionList
  items={[
    { item: 'Unclear deadline', suggestion: 'When?' },
    { item: 'Missing owner', suggestion: 'Who?' }
  ]}
  title="Needs Clarification"
/>
```

**Props:**

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `items` | ConfusionItem[] | Yes | - |
| `title` | string | No | 'Needs Clarification' |

---

## UI Components

Base components for building interfaces.

### Button

Interactive button component.

**Location:** `components/ui/button.tsx`

**Usage:**
```typescript
import { Button } from '@/components/ui/button';

<Button
  variant="default"
  size="md"
  onClick={handleClick}
  disabled={false}
>
  Click me
</Button>
```

**Props:**

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `variant` | ButtonVariant | No | 'default' |
| `size` | ButtonSize | No | 'md' |
| `disabled` | boolean | No | false |
| `onClick` | function | No | - |
| `className` | string | No | - |

**Variants:**

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Primary blue | Main actions |
| `secondary` | Muted gray | Secondary actions |
| `outline` | Border only | Tertiary actions |
| `ghost` | Transparent | Subtle actions |
| `destructive` | Red | Delete/danger |

**Sizes:**

| Size | Height | Padding | Text |
|------|--------|---------|------|
| `sm` | 36px | 12px | xs |
| `md` | 40px | 16px | sm |
| `lg` | 44px | 24px | base |

---

### Card

Container component for content grouping.

**Location:** `components/ui/card.tsx`

**Usage:**
```typescript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

**Components:**

| Component | Description |
|-----------|-------------|
| `Card` | Container wrapper |
| `CardHeader` | Header section |
| `CardTitle` | Title heading |
| `CardDescription` | Subtitle text |
| `CardContent` | Main content area |
| `CardFooter` | Footer section |

**Features:**
- Glassmorphism styling
- Rounded corners
- Subtle border
- Consistent padding

---

### Textarea

Multi-line text input.

**Location:** `components/ui/textarea.tsx`

**Usage:**
```typescript
import { Textarea } from '@/components/ui/textarea';

<Textarea
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Enter text..."
  className="min-h-[200px]"
  disabled={false}
/>
```

**Props:**

| Prop | Type | Required |
|------|------|----------|
| `value` | string | No |
| `onChange` | function | No |
| `placeholder` | string | No |
| `disabled` | boolean | No |
| `className` | string | No |

**Features:**
- Auto-resize support
- Focus ring
- Disabled state
- Glassmorphism styling

---

## Design System

### Colors

```css
/* Background */
--background: 0 0% 3.9%
--foreground: 0 0% 98%

/* Primary */
--primary: 0 0% 98%
--primary-foreground: 0 0% 9%

/* Muted */
--muted: 0 0% 14.9%
--muted-foreground: 0 0% 63.9%

/* Border */
--border: 0 0% 14.9%
--ring: 0 0% 83.1%
```

### Typography

```css
--font-sans: var(--font-geist-sans)
--font-mono: var(--font-geist-mono)
```

### Spacing

Use Tailwind's spacing scale:
- `p-4` = 1rem (16px)
- `gap-2` = 0.5rem (8px)
- `m-6` = 1.5rem (24px)

### Border Radius

```css
--radius: 0.75rem  /* 12px */
```

### Animations

```css
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(20px); } to { transform: translateY(0); } }
@keyframes scaleIn { from { transform: scale(0.95); } to { transform: scale(1); } }
```

---

## Component Patterns

### Basic Component Structure

```typescript
'use client';

import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';

interface ComponentProps {
  prop1: string;
  prop2?: number;
  className?: string;
}

export function Component({ prop1, prop2 = 0, className }: ComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`custom-class ${className}`}
    >
      {/* Content */}
    </motion.div>
  );
}
```

### Using Variants

```typescript
const variants = {
  default: 'bg-blue-500',
  secondary: 'bg-gray-500',
  outline: 'border border-white/10',
};

className={variants[variant]}
```

### Conditional Rendering

```typescript
{showElement && (
  <div>Conditional content</div>
)}

{items.length > 0 ? (
  <List items={items} />
) : (
  <EmptyState />
)}
```

---

## Best Practices

### Accessibility

- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation
- Maintain focus indicators

```typescript
<button
  onClick={handleClick}
  aria-label="Close dialog"
  className="focus-ring"
>
  <X className="h-4 w-4" />
</button>
```

### Performance

- Memoize expensive components
- Use React.memo for pure components
- Lazy load heavy components

```typescript
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { loading: () => <p>Loading...</p> }
);
```

### Responsive Design

```typescript
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {/* Responsive grid */}
</div>
```

---

**Need more?** See the [API Reference](./API.md#components)
