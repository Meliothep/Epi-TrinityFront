# Trinity Frontend Features Guide

This guide provides detailed information about the features implemented in the Trinity Frontend project and how to use them effectively.

## Table of Contents

1. [Component Architecture](#component-architecture)
2. [State Management](#state-management)
3. [Error Handling](#error-handling)
4. [Loading States](#loading-states)
5. [Routing System](#routing-system)
6. [Theme System](#theme-system)
7. [Animation System](#animation-system)

## Component Architecture

### Base Component Structure

All components in Trinity follow a consistent structure:

```tsx
import { Component } from "solid-js";

interface ComponentProps extends BaseProps {
  // Component-specific props
}

export const MyComponent: Component<ComponentProps> = (props) => {
  // 1. Signals (State)
  const [state, setState] = createSignal(initialState);

  // 2. Computed Values
  const computed = createMemo(() => {
    // Derived state calculations
    return state();
  });

  // 3. Effects
  createEffect(() => {
    // Side effects
  });

  // 4. Event Handlers
  const handleAction = () => {
    // Handle events
  };

  // 5. Render
  return (
    <div class={cn("base-classes", props.class)} style={props.style}>
      {/* Component JSX */}
    </div>
  );
};
```

### Component Documentation

Each component should have a documentation file following this structure:

```markdown
# Component Name

Brief description

## Usage

\```tsx
import { ComponentName } from '@/components/ComponentName';

<ComponentName prop1="value" />
\```

## Props

| Name  | Type       | Default | Description |
| ----- | ---------- | ------- | ----------- |
| prop1 | \`string\` | -       | Description |

## Examples

### Basic Usage
### Advanced Usage

## Best Practices
```

## State Management

### Creating a Store

Trinity uses a custom store implementation with middleware support:

```typescript
import { createStore } from '@/stores/core/createStore';
import { loggerMiddleware, mergeMiddleware } from '@/stores/core/middleware';

interface MyState {
  value: string;
  count: number;
}

const initialState: MyState = {
  value: '',
  count: 0
};

const myStore = createStore({
  initialState,
  storageKey: 'my-store', // Optional: for persistence
  middleware: [
    loggerMiddleware,
    mergeMiddleware()
  ]
});

// Create actions
export const increment = () => {
  myStore.setState(prev => ({
    ...prev,
    count: prev.count + 1
  }));
};

// Create hook for components
export const useMyStore = () => {
  const state = myStore.state();
  
  return {
    ...state,
    increment
  };
};
```

### Available Middleware

1. **Logger Middleware**
   ```typescript
   loggerMiddleware // Logs all state changes
   ```

2. **Validator Middleware**
   ```typescript
   validatorMiddleware<T>(schema: (state: T) => boolean)
   ```

3. **Immutable Fields Middleware**
   ```typescript
   immutableFieldsMiddleware<T>(fields: (keyof T)[])
   ```

4. **Debounce Middleware**
   ```typescript
   debounceMiddleware<T>(delay: number)
   ```

5. **Merge Middleware**
   ```typescript
   mergeMiddleware<T>()
   ```

### Using Stores in Components

```tsx
const MyComponent = () => {
  const { count, increment } = useMyStore();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};
```

## Error Handling

### Error Boundary Component

```tsx
import { ErrorBoundary } from '@/components/base/ErrorBoundary';

const MyComponent = () => {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div>
          <p>Error: {error.message}</p>
          <button onClick={reset}>Try Again</button>
        </div>
      )}
      onError={(error) => {
        // Log error to service
      }}
    >
      <ChildComponent />
    </ErrorBoundary>
  );
};
```

### Best Practices for Error Handling

1. Use Error Boundaries for component-level errors
2. Implement proper error states in forms
3. Show user-friendly error messages
4. Provide recovery actions when possible

## Loading States

### Loading Component

```tsx
import { Loading } from '@/components/base/Loading';

// Simple usage
<Loading />

// With customization
<Loading 
  size="lg"
  text="Loading data..."
  fullHeight
/>

// Conditional rendering
<Show
  when={!loading}
  fallback={<Loading text="Loading..." />}
>
  <Content />
</Show>
```

### Loading States Best Practices

1. Use appropriate loading indicators for the context
2. Show loading states for operations over 300ms
3. Implement skeleton loading for content-heavy pages
4. Maintain layout stability during loading

## Routing System

### Route Configuration

Routes are organized into three categories:
- Public routes (`/routes/public`)
- Protected routes (`/routes/protected`)
- Admin routes (`/routes/admin`)

```typescript
// Example route configuration
const routes: AppRoute[] = [
  {
    path: '/dashboard',
    component: lazy(() => import('@/pages/Dashboard')),
    title: 'Dashboard',
    showInNav: true,
    requiresAuth: true
  }
];
```

### Route Guards

```tsx
// Protect routes requiring authentication
<AuthGuard>
  <ProtectedComponent />
</AuthGuard>

// Protect admin routes
<AdminGuard>
  <AdminComponent />
</AdminGuard>

// Public only routes (like login)
<PublicOnlyGuard>
  <LoginComponent />
</PublicOnlyGuard>
```

## Theme System

### Theme Configuration

Trinity uses a custom theme system built on Tailwind CSS:

```typescript
// Using theme classes
<div class={cn(
  "bg-background text-foreground",
  "dark:bg-background-dark dark:text-foreground-dark"
)}>
  Content
</div>
```

### Theme Toggle

```tsx
import { useUI } from '@/stores/ui.store';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useUI();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};
```

### Available Theme Tokens

- Background: `bg-background`
- Foreground: `text-foreground`
- Primary: `bg-primary text-primary-foreground`
- Secondary: `bg-secondary text-secondary-foreground`
- Accent: `bg-accent text-accent-foreground`
- Muted: `bg-muted text-muted-foreground`
- Card: `bg-card text-card-foreground`

## 🎭 Animation System

Trinity uses the `tailwindcss-motion` plugin to provide subtle, purposeful animations that enhance the user experience without being overwhelming. Our animation system follows these key principles:

1. **Purposeful**: Each animation serves a specific function
2. **Subtle**: Animations are gentle and non-distracting
3. **Consistent**: Similar interactions use similar animations
4. **Accessible**: All animations respect user motion preferences

### Core Animation Patterns

```typescript
// Entry Animations - Subtle and functional
const entryAnimations = {
  // Gentle fade in
  fadeIn: "motion-safe:motion-opacity-in-0 motion-safe:motion-duration-300",
  
  // Subtle slide up
  slideUp: "motion-safe:motion-translate-y-in-25 motion-safe:motion-duration-300",
  
  // Smooth scale in
  scaleIn: "motion-safe:motion-scale-in-95 motion-safe:motion-duration-300"
}

// Interactive States - Minimal and responsive
const interactiveStates = {
  // Simple color transitions
  hover: "transition-colors duration-200",
  
  // Subtle scale feedback
  active: "active:motion-safe:motion-scale-95",
  
  // Gentle transform
  focus: "focus:motion-safe:motion-translate-y-neg-1"
}

// Transition Animations - Smooth and natural
const transitions = {
  // Natural spring easing
  spring: "motion-safe:motion-ease-spring-smooth",
  
  // Quick and subtle
  quick: "motion-safe:motion-duration-200",
  
  // Smooth and deliberate
  smooth: "motion-safe:motion-duration-300"
}
```

### Best Practices

1. **Keep Animations Minimal**
```typescript
// ✅ Good: Simple, purposeful animation
const goodExample = {
  button: "transition-colors duration-200 hover:bg-accent",
  modal: "motion-safe:motion-scale-in-95 motion-safe:motion-duration-300",
  menu: "motion-safe:motion-translate-y-in-0 motion-safe:motion-duration-200"
}

// ❌ Bad: Excessive, distracting animations
const badExample = {
  button: "motion-preset-pulse hover:motion-scale-110 hover:motion-rotate-12",
  modal: "motion-preset-bounce motion-duration-500 motion-delay-300",
  menu: "motion-preset-shake motion-loop-infinite"
}
```

2. **Use Consistent Timing**
```typescript
const timingGuidelines = {
  // Quick transitions
  hover: "duration-200",
  
  // Standard animations
  entry: "motion-safe:motion-duration-300",
  
  // Complex transitions
  exit: "motion-safe:motion-duration-200"
}
```

3. **Respect Motion Preferences**
```typescript
// Always use motion-safe prefix
const accessibleAnimations = {
  entry: "motion-safe:motion-translate-y-in-0",
  hover: "hover:motion-safe:motion-scale-102",
  active: "active:motion-safe:motion-scale-95"
}
```

### Common Use Cases

1. **Navigation Elements**
```typescript
const navExample = {
  // Subtle entry animation
  container: cn(
    "bg-background/50 backdrop-blur-sm",
    "motion-safe:motion-translate-y-in-0",
    "motion-safe:motion-duration-300"
  ),
  
  // Simple hover state
  link: cn(
    "transition-colors duration-200",
    "hover:text-primary"
  )
}
```

2. **Modal/Dialog**
```typescript
const modalExample = {
  // Subtle backdrop fade
  backdrop: cn(
    "bg-background/80 backdrop-blur-sm",
    "motion-safe:motion-opacity-in-0",
    "motion-safe:motion-duration-200"
  ),
  
  // Gentle scale animation
  content: cn(
    "bg-background p-6",
    "motion-safe:motion-scale-in-95",
    "motion-safe:motion-duration-300",
    "motion-safe:motion-ease-spring-smooth"
  )
}
```

3. **Interactive Elements**
```typescript
const buttonExample = {
  // Simple, effective feedback
  base: cn(
    "rounded-md px-4 py-2",
    "transition-colors duration-200",
    "hover:bg-accent",
    "active:motion-safe:motion-scale-95"
  )
}
```

### Animation Timing Guidelines

```typescript
const timings = {
  // Instant feedback
  hover: "duration-200",
  active: "duration-150",
  
  // Smooth transitions
  entry: "motion-safe:motion-duration-300",
  exit: "motion-safe:motion-duration-200",
  
  // Complex animations
  stagger: "motion-safe:motion-delay-[var(--delay)]" // 50ms increments
}
```

### Performance Considerations

1. **Optimize for Rendering**
```typescript
// ✅ Good: Use transform and opacity
const performant = {
  scale: "motion-safe:motion-scale-95",
  fade: "motion-safe:motion-opacity-in-0",
  move: "motion-safe:motion-translate-y-in-25"
}

// ❌ Bad: Animate expensive properties
const expensive = {
  height: "transition-[height]",
  boxShadow: "transition-[box-shadow]",
  filter: "transition-[filter]"
}
```

2. **Reduce Animation Load**
```typescript
// ✅ Good: Minimal, purposeful animations
const minimal = {
  card: "transition-transform hover:motion-safe:motion-translate-y-neg-1",
  button: "transition-colors hover:bg-accent"
}

// ❌ Bad: Multiple simultaneous animations
const overwhelming = {
  card: "motion-preset-pulse motion-preset-bounce motion-preset-spin",
  button: "hover:motion-scale-110 hover:motion-rotate-12 hover:motion-translate-y-neg-2"
}
```

### Examples from Trinity

1. **Header Navigation**
```typescript
// Subtle entry animation
"motion-safe:motion-translate-y-in-0 motion-safe:motion-duration-300"

// Simple hover states
"hover:text-primary transition-colors duration-200"

// Mobile menu transition
"motion-safe:motion-translate-y-in-0 motion-safe:motion-duration-300"
```

2. **Interactive Components**
```typescript
// Button states
"transition-colors duration-200 hover:bg-accent active:motion-safe:motion-scale-95"

// Avatar loading
"motion-safe:motion-scale-in-95 motion-safe:motion-duration-300"

// Theme toggle
"transition-transform duration-200"
```

These guidelines ensure that animations enhance the user experience while maintaining a professional, polished feel throughout the application.

## Best Practices

### 1. Component Development

- Follow the established component structure
- Document components using the template
- Implement proper prop types
- Use composition over inheritance

### 2. State Management

- Keep stores focused and minimal
- Use appropriate middleware
- Implement proper cleanup in components
- Use selectors for optimal performance

### 3. Error Handling

- Always provide fallback UI
- Log errors appropriately
- Give users clear error messages
- Implement recovery mechanisms

### 4. Performance

- Use lazy loading for routes
- Implement proper memoization
- Optimize re-renders
- Use appropriate loading states

### 5. Accessibility

- Implement proper ARIA attributes
- Ensure keyboard navigation
- Provide proper contrast
- Test with screen readers

## Contributing

When contributing new features:

1. Follow the established patterns
2. Add proper documentation
3. Include examples
4. Add tests
5. Update this guide

## Troubleshooting

### Common Issues

1. **Store updates not reflecting**
   - Check if you're using the store hook correctly
   - Verify the subscription cleanup

2. **Route guards not working**
   - Ensure proper authentication state
   - Check route configuration

3. **Theme not applying**
   - Verify theme class application
   - Check dark mode configuration

### Getting Help

- Check the documentation first
- Search existing issues
- Ask in the development channel
- Create a detailed issue if needed

---

This guide will be updated as new features are added or existing ones are modified. For the latest information, always refer to the source code and comments. 