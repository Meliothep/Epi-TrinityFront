# Router Configuration

## Overview
Our application uses `@solidjs/router` v0.15.3 with the v0.10.0+ API configuration. This document outlines our routing setup and best practices.

## Basic Structure
```tsx
<Router
  root={(props) => (
    // Root layout wrapper
    <div>
      <Header />
      <main>{props.children}</main>
    </div>
  )}
>
  <Route path="/" component={Home} />
  <Route path="/products" component={Products} />
  {/* Additional routes */}
</Router>
```

## Key Features

### 1. Root Layout
- Layout is defined in the `root` prop of `Router`
- Provides consistent structure across all pages
- Handles main layout elements (Header, main content area)

### 2. Lazy Loading
All page components are lazy loaded for better performance:
```tsx
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
```

### 3. Navigation
- Use `<A>` component from `@solidjs/router` for internal navigation
- Supports `activeClass` and `end` props for styling active links
```tsx
<A href="/products" activeClass="text-primary">Products</A>
```

## Important Notes
1. No `<Outlet>` or `<Routes>` components (removed in v0.10.0+)
2. Routes are direct children of `<Router>`
3. Layout content is passed via `props.children`
4. Page components receive route data through props

## Current Routes
- `/` - Home page
- `/products` - Products listing
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/showcase` - Feature showcase and component demonstrations
- `*` - 404 Not Found

## Feature Demonstration
The `/showcase` route serves as a living documentation of our components and features:
- Demonstrates component integration patterns
- Shows real-world usage examples
- Provides interactive examples of state management
- Showcases theme switching and responsive design

## Best Practices
1. Always use lazy loading for page components
2. Keep route definitions in `App.tsx`
3. Use the `<A>` component for internal navigation
4. Maintain consistent layout structure through the root prop
5. Group related features in feature-specific routes
6. Use showcase routes for component documentation

## Migration Notes
This setup follows the v0.10.0+ migration guidelines:
- Removed `<Outlet>`, `<Routes>`, and `useRoutes`
- Layout is handled through the root prop
- Direct route children in Router
- No nested Routes components 