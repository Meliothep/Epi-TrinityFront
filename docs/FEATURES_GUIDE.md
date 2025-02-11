# Trinity Frontend Features Guide

This guide provides detailed information about the features implemented in the Trinity Frontend project and how to use them effectively.

## Table of Contents

1. [Component Architecture](#component-architecture)
2. [State Management](#state-management)
3. [Error Handling](#error-handling)
4. [Loading States](#loading-states)
5. [Routing System](#routing-system)
6. [Theme System](#theme-system)

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