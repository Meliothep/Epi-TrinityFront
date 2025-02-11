# Trinity Frontend Style Guide

## 🎨 Design System

### Colors

```typescript
// Design tokens for colors
const colors = {
  // Brand Colors
  primary: {
    50: 'hsl(var(--primary-50))',
    100: 'hsl(var(--primary-100))',
    200: 'hsl(var(--primary-200))',
    300: 'hsl(var(--primary-300))',
    400: 'hsl(var(--primary-400))',
    500: 'hsl(var(--primary-500))', // Main brand color
    600: 'hsl(var(--primary-600))',
    700: 'hsl(var(--primary-700))',
    800: 'hsl(var(--primary-800))',
    900: 'hsl(var(--primary-900))',
    950: 'hsl(var(--primary-950))',
  },
  
  // Semantic Colors
  success: 'hsl(var(--success))',
  warning: 'hsl(var(--warning))',
  error: 'hsl(var(--error))',
  info: 'hsl(var(--info))',
  
  // UI Colors
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  card: 'hsl(var(--card))',
  'card-foreground': 'hsl(var(--card-foreground))',
  popover: 'hsl(var(--popover))',
  'popover-foreground': 'hsl(var(--popover-foreground))',
  muted: 'hsl(var(--muted))',
  'muted-foreground': 'hsl(var(--muted-foreground))',
  accent: 'hsl(var(--accent))',
  'accent-foreground': 'hsl(var(--accent-foreground))',
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
}

// Usage in Tailwind classes
const examples = {
  primary: 'bg-primary-500 text-primary-50',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  error: 'bg-error text-error-foreground',
}
```

### Typography

```typescript
// Font Scale
const typography = {
  fonts: {
    sans: ['Inter var', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  sizes: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  },
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
}

// Usage examples
const textExamples = {
  heading1: 'text-4xl font-bold text-foreground',
  heading2: 'text-3xl font-semibold text-foreground',
  heading3: 'text-2xl font-semibold text-foreground',
  body: 'text-base text-foreground',
  small: 'text-sm text-muted-foreground',
}
```

### Spacing & Layout

```typescript
// Spacing Scale
const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  // ... continue with 8px increments
}

// Layout Components
const layoutExamples = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12 sm:py-16 lg:py-20',
  card: 'rounded-lg border bg-card p-4 shadow-sm',
  grid: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
}
```

## 🎯 Component Patterns

### Button Variants

```typescript
const buttonStyles = {
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  
  variants: {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  },
  
  sizes: {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  },
}
```

### Form Elements

```typescript
const formStyles = {
  label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  
  input: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  
  select: 'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  
  checkbox: 'h-4 w-4 rounded border border-primary text-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
}
```

### Card Patterns

```typescript
const cardStyles = {
  base: 'rounded-lg border bg-card text-card-foreground shadow-sm',
  
  variants: {
    default: 'p-6',
    compact: 'p-4',
    interactive: 'p-6 hover:shadow-md transition-shadow duration-200',
  },
  
  header: 'flex flex-col space-y-1.5 pb-4',
  title: 'text-2xl font-semibold leading-none tracking-tight',
  description: 'text-sm text-muted-foreground',
  content: 'pb-4',
  footer: 'flex items-center pt-4',
}
```

## 📱 Responsive Design

### Breakpoints

```typescript
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// Usage examples
const responsiveExamples = {
  container: 'w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl',
  columns: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
  padding: 'p-4 sm:p-6 lg:p-8',
}
```

## 🌗 Dark Mode

### Implementation

```typescript
// In tailwind.config.js
const config = {
  darkMode: 'class',
  // ...
}

// Usage in components
const darkModeExamples = {
  background: 'bg-background dark:bg-slate-950',
  text: 'text-slate-900 dark:text-slate-50',
  border: 'border-slate-200 dark:border-slate-800',
}
```

## 🎭 Animation & Transitions

### Motion Utilities

```typescript
const motionUtilities = {
  // Base animations
  opacity: {
    fadeIn: "motion-opacity-in-0",
    fadeOut: "motion-opacity-out-0"
  },
  translate: {
    slideUp: "motion-translate-y-in-100",
    slideDown: "motion-translate-y-out-100",
    slideRight: "motion-translate-x-in-100",
    slideLeft: "motion-translate-x-out-100"
  },
  scale: {
    scaleUp: "motion-scale-in-75",
    scaleDown: "motion-scale-out-75"
  },
  rotate: {
    rotateIn: "motion-rotate-in-180",
    rotateOut: "motion-rotate-out-180"
  },
  
  // Presets
  presets: {
    pulse: "motion-preset-pulse-sm",
    bounce: "motion-preset-bounce",
    slide: "motion-preset-slide-up"
  },
  
  // Modifiers
  modifiers: {
    duration: {
      fast: "motion-duration-200",
      normal: "motion-duration-300",
      slow: "motion-duration-500"
    },
    delay: {
      short: "motion-delay-100",
      medium: "motion-delay-300",
      long: "motion-delay-500"
    },
    easing: {
      spring: {
        smooth: "motion-ease-spring-smooth",
        bouncy: "motion-ease-spring-bouncy",
        snappy: "motion-ease-spring-snappy"
      },
      standard: "motion-ease-in-quart"
    },
    loop: {
      infinite: "motion-translate-y-loop-25",
      reset: "motion-translate-y-loop-25/reset",
      twice: "motion-loop-twice"
    }
  }
}

// Usage examples
const examples = {
  // Modal backdrop
  backdrop: cn(
    "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
    "motion-opacity-in-0 motion-duration-200"
  ),
  
  // Modal panel
  panel: cn(
    "fixed right-0 top-0 h-full w-full max-w-md border-l bg-background p-6",
    "motion-translate-x-in-100 motion-duration-300"
  ),
  
  // Interactive button
  button: cn(
    "rounded-full relative",
    "motion-preset-pulse-sm motion-ease-spring-smooth"
  ),
  
  // List item with staggered animation
  listItem: (index: number) => cn(
    "motion-preset-slide-up",
    { style: { "--motion-delay": `${index * 100}ms` } }
  ),
  
  // Loading states
  loading: {
    skeleton: "motion-preset-pulse-sm",
    spinner: "motion-rotate-loop-360",
    shimmer: "motion-translate-x-loop-100"
  }
}
```

### Component-Specific Patterns

1. **Modal/Dialog**
```typescript
const modalStyles = {
  overlay: cn(
    "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
    "motion-opacity-in-0 motion-duration-200"
  ),
  content: cn(
    "fixed right-0 top-0 h-full w-full max-w-md border-l bg-background",
    "motion-translate-x-in-100 motion-duration-300 motion-ease-spring-smooth"
  )
}
```

2. **Dropdown Menu**
```typescript
const dropdownStyles = {
  trigger: cn(
    "inline-flex items-center justify-center",
    "motion-preset-pulse-sm motion-ease-spring-smooth"
  ),
  content: cn(
    "absolute top-full mt-2 w-48 rounded-md bg-popover shadow-md",
    "motion-translate-y-in-25 motion-duration-200"
  )
}
```

3. **Cart Item**
```typescript
const cartItemStyles = {
  container: cn(
    "flex items-center space-x-4 py-4",
    "motion-preset-slide-up motion-duration-300"
  ),
  image: cn(
    "relative h-16 w-16 overflow-hidden rounded-lg border",
    "motion-scale-in-95 motion-duration-200"
  ),
  removeButton: cn(
    "h-8 w-8",
    "motion-rotate-in-90 motion-duration-200"
  )
}
```

### Loading States

```typescript
const loadingStyles = {
  skeleton: cn(
    "h-4 bg-muted rounded",
    "motion-preset-pulse-sm"
  ),
  spinner: cn(
    "w-5 h-5 border-2 border-primary rounded-full",
    "motion-rotate-loop-360"
  ),
  shimmer: cn(
    "relative overflow-hidden",
    "motion-translate-x-loop-100"
  )
}
```

### Property-Specific Modifiers

```typescript
// Apply different delays to different properties
const staggeredAnimation = cn(
  "motion-delay-500/rotate motion-rotate-in-180",
  "motion-opacity-in-0"  // Immediate fade
)

// Different durations for different properties
const mixedDuration = cn(
  "motion-duration-300/translate motion-translate-y-in-100",
  "motion-duration-500/opacity motion-opacity-in-0"
)
```

### Best Practices

1. **Animation Timing**
```typescript
const timingPatterns = {
  // Entry animations
  entry: "motion-duration-300 motion-ease-spring-smooth",
  
  // Exit animations
  exit: "motion-duration-200 motion-ease-spring-snappy",
  
  // Hover states
  hover: "motion-duration-200 motion-ease-spring-smooth",
  
  // Loading states
  loading: "motion-preset-pulse-sm"
}
```

2. **Performance**
```typescript
// ✅ Good: Hardware-accelerated properties
const goodPerformance = {
  transform: "motion-translate-y-in-100",
  opacity: "motion-opacity-in-0"
}

// ❌ Bad: Layout-triggering properties
const badPerformance = {
  height: "h-0 hover:h-full transition-all",
  width: "w-0 hover:w-full transition-all"
}
```

3. **Accessibility**
```typescript
// The plugin automatically handles reduced motion preferences
// No need for manual motion-safe: prefixes
const accessibleAnimation = {
  button: "motion-preset-pulse-sm",
  modal: "motion-translate-y-in-25",
  list: "motion-preset-slide-up"
}
```

## 📏 Best Practices

### 1. Class Organization

```typescript
// ✅ Good: Organized by category
const goodExample = `
  // Layout
  flex flex-col items-center justify-between
  // Spacing
  p-4 gap-2
  // Typography
  text-lg font-medium text-foreground
  // Visual
  bg-background rounded-lg border
  // Interactive
  hover:bg-accent focus:ring-2
  // Responsive
  sm:flex-row sm:text-xl
`

// ❌ Bad: Mixed and hard to read
const badExample = `text-lg p-4 flex hover:bg-accent sm:text-xl border bg-background rounded-lg font-medium items-center gap-2 text-foreground focus:ring-2 justify-between flex-col sm:flex-row`
```

### 2. Component Composition

```typescript
// ✅ Good: Reusable style objects
const styles = {
  card: {
    base: 'rounded-lg border bg-card p-4',
    interactive: 'hover:shadow-md transition-shadow duration-200',
    header: 'text-lg font-semibold mb-2',
    content: 'text-muted-foreground',
  }
}

// Usage
<div class={clsx(styles.card.base, styles.card.interactive)}>
  <h3 class={styles.card.header}>Title</h3>
  <p class={styles.card.content}>Content</p>
</div>
```

### 3. Responsive Design

```typescript
// ✅ Good: Mobile-first approach
const responsiveGood = `
  // Base (mobile)
  flex flex-col p-4 text-sm
  // Tablet
  sm:flex-row sm:p-6 sm:text-base
  // Desktop
  lg:p-8 lg:text-lg
`

// ❌ Bad: Desktop-first
const responsiveBad = `
  flex-row p-8 text-lg
  sm:text-base sm:p-6
  xs:flex-col xs:p-4 xs:text-sm
`
```

## 🔧 Tools & Utilities

### 1. Class Merging

```typescript
import { clsx } from 'clsx'

// Example usage
const Button = (props: ButtonProps) => {
  const classes = clsx(
    // Base styles
    'rounded-md px-4 py-2',
    // Variant styles
    {
      'bg-primary text-white': props.variant === 'primary',
      'bg-secondary text-white': props.variant === 'secondary',
      'bg-transparent border': props.variant === 'outline',
    },
    // Additional classes
    props.class
  )
  
  return <button class={classes}>{props.children}</button>
}
```

### 2. Custom Utilities

```typescript
// utilities/styles.ts
export const createVariants = <T extends Record<string, string>>(
  base: string,
  variants: T
) => {
  return (variant: keyof T) => clsx(base, variants[variant])
}

// Usage
const buttonVariants = createVariants(
  'rounded-md px-4 py-2',
  {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    outline: 'bg-transparent border',
  }
)
```

## 📚 Documentation

### Component Documentation Template

```typescript
/**
 * @component Button
 * @description A reusable button component with multiple variants and sizes
 *
 * @example
 * ```tsx
 * <Button
 *   variant="primary"
 *   size="md"
 *   class="mt-4"
 * >
 *   Click me
 * </Button>
 * ```
 *
 * @prop {ButtonVariant} variant - The visual style variant of the button
 * @prop {ButtonSize} size - The size variant of the button
 * @prop {string} [class] - Additional CSS classes
 * @prop {ReactNode} children - The button content
 */
```

This style guide should be treated as a living document and updated as the project evolves. 