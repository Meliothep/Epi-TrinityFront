# Trinity Frontend Review & Improvement Roadmap

## 🔍 Current State Analysis

### Project Structure

✅ **Strengths**

- Well-organized directory structure following modern best practices
- Clear separation of concerns (components, services, stores, etc.)
- Proper configuration files for TypeScript, Tailwind, and Docker
- Good documentation in README.md

⚠️ **Areas for Improvement**

- Multiple CSS approaches (App.module.css and Tailwind) might lead to inconsistency
- Routes directory alongside pages directory might cause confusion
- Lack of clear distinction between feature-based and shared components
- Missing strong typing definitions in some areas

### Technology Stack

✅ **Current Stack**

- SolidJS (UI Framework)
- TypeScript (Type Safety)
- Tailwind CSS (Styling)
- Shadcn (UI Components)
- Nginx (Web Server)
- Docker (Containerization)

## 🎯 Improvement Roadmap

### 1. Immediate Improvements (Sprint 1)

#### 1.1 Project Structure Refinement

- [ ] Consolidate routing approach
  - Move all routing logic to `/routes`
  - Use `/pages` for page components only
  - Implement lazy loading for routes
- [ ] Standardize styling approach
  - Remove CSS modules in favor of Tailwind
  - Create consistent design tokens
  - Implement dark mode properly

#### 1.2 Type Safety Enhancements

- [ ] Create comprehensive type definitions
  - Add proper interfaces for all components
  - Implement strict prop typing
  - Add proper return types for all functions
- [ ] Implement strict TypeScript configurations
  - Enable strict mode
  - Add proper ESLint rules

### 2. Architecture Improvements (Sprint 2)

#### 2.1 State Management

- [ ] Implement proper store patterns

  ```typescript
  // Example store structure
  export const createStore = () => {
    const [state, setState] = createSignal<State>(initialState);
    
    return {
      // Getters
      get current() { return state() },
      
      // Actions
      actions: {
        update: (newState: Partial<State>) => 
          setState(prev => ({ ...prev, ...newState }))
      }
    };
  };
  ```

#### 2.2 Component Architecture

- [ ] Implement proper component composition
- [ ] Create reusable UI components library
- [ ] Add proper error boundaries
- [ ] Implement proper loading states

### 3. Testing & Quality (Sprint 3)

#### 3.1 Testing Implementation

- [ ] Set up Vitest properly
- [ ] Add unit tests for components
- [ ] Add integration tests
- [ ] Implement E2E testing with Playwright

#### 3.2 Code Quality

- [ ] Implement proper ESLint rules
- [ ] Add Prettier configuration
- [ ] Set up pre-commit hooks
- [ ] Implement proper error handling

### 4. Performance Optimization (Sprint 4)

#### 4.1 Build Optimization

- [ ] Implement proper code splitting
- [ ] Optimize asset loading
- [ ] Implement proper caching strategies
- [ ] Add proper PWA support

#### 4.2 Runtime Optimization

- [ ] Implement proper memoization
- [ ] Optimize re-renders
- [ ] Implement proper lazy loading
- [ ] Add proper performance monitoring

### 5. DevOps & Deployment (Sprint 5)

#### 5.1 Docker Optimization

- [ ] Optimize Docker builds
- [ ] Implement proper multi-stage builds
- [ ] Add proper development workflow
- [ ] Implement proper CI/CD

#### 5.2 Nginx Configuration

- [ ] Optimize Nginx configuration
- [ ] Implement proper SSL
- [ ] Add proper caching headers
- [ ] Implement proper security headers

## 📝 Best Practices Implementation

### Component Structure

```typescript
// Example of ideal component structure
interface Props {
  title: string;
  onAction?: () => void;
}

export const Component: Component<Props> = (props) => {
  // 1. Signals/State
  const [state, setState] = createSignal(initialState);
  
  // 2. Computed values
  const computed = createMemo(() => {
    // Computation
  });
  
  // 3. Effects
  createEffect(() => {
    // Side effects
  });
  
  // 4. Event handlers
  const handleAction = () => {
    // Handle action
  };
  
  // 5. Render
  return (
    <div class="component">
      {/* Component JSX */}
    </div>
  );
};
```

### Store Pattern

```typescript
// Example of ideal store pattern
export const createStore = () => {
  // 1. State
  const [state, setState] = createSignal(initialState);
  
  // 2. Computed values
  const computed = createMemo(() => {
    // Computation
  });
  
  // 3. Actions
  const actions = {
    update: (payload: Payload) => {
      // Update logic
    }
  };
  
  // 4. Public API
  return {
    state,
    computed,
    ...actions
  };
};
```

## 🔄 Continuous Improvement

### Code Review Process

- Implement proper PR templates
- Set up automated code review
- Implement proper documentation requirements
- Set up proper CI/CD checks

### Documentation

- Add proper JSDoc comments
- Create proper API documentation
- Add proper usage examples
- Create proper architecture documentation

### Monitoring & Analytics

- Implement proper error tracking
- Add proper performance monitoring
- Implement proper usage analytics
- Add proper logging

## 📊 Progress Tracking

### Sprint 1 (Current)

- [x] Standardize styling approach (Completed)
  - Removed CSS modules in favor of Tailwind
  - Added Tailwind plugins (@tailwindcss/forms, typography, aspect-ratio)
  - Configured proper color tokens and theme variables
- [x] Project structure refinement (Completed)
  - Moved all routing logic to `/routes` directory
  - Implemented route types and interfaces
  - Created separate route configurations for public, protected, and admin routes
  - Added proper route guards with loading states
- [x] Type safety enhancements (Completed)
  - Enhanced TypeScript configuration with stricter rules
  - Added comprehensive global type declarations
  - Implemented utility types for common patterns
  - Added proper environment variable typing
- [x] Component architecture improvements (Completed)
  - Created base component template with consistent structure
  - Implemented reusable ErrorBoundary component
  - Added standardized Loading component
  - Created component documentation template
  - Established component organization structure

### Sprint 2

- [x] State management implementation (Completed)
  - Created base store creator with TypeScript support
  - Implemented middleware system for store enhancements
  - Added store hooks for component integration
  - Created example UI store with new system
- [ ] Testing setup (In Progress)
  - [ ] Setup Vitest configuration
  - [ ] Add testing utilities and helpers
  - [ ] Implement component testing patterns
  - [ ] Add store testing utilities
  - [ ] Create E2E testing setup with Playwright
- [ ] Code quality improvements

### Sprint 3

- [ ] Performance optimization
- [ ] Build optimization
- [ ] DevOps implementation

### Sprint 4

- [ ] Documentation improvements
- [ ] Monitoring setup
- [ ] Final polish

## 🎉 Expected Outcomes

After implementing these improvements, we expect:

1. Improved code quality and maintainability
2. Better developer experience
3. Improved performance
4. Better user experience
5. More robust application
6. Better scalability
7. Easier onboarding for new developers
8. More consistent codebase

## 📈 Metrics for Success

1. **Performance Metrics**
   - Lighthouse score > 90
   - First contentful paint < 1.5s
   - Time to interactive < 3.5s

2. **Code Quality Metrics**
   - Test coverage > 80%
   - Zero critical security vulnerabilities
   - ESLint errors = 0

3. **Developer Experience Metrics**
   - Build time < 30s
   - Hot reload time < 2s
   - PR review time < 24h

This roadmap will be updated as we progress and new requirements or improvements are identified.

## 🔧 Technical Improvements

### TypeScript Configuration Enhancements

```json
{
  "compilerOptions": {
    // Existing good configurations
    "strict": true,
    "target": "ESNext",
    "module": "ESNext",
    
    // Additional recommended configurations
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Docker Optimization

```dockerfile
# Build stage
FROM node:20-alpine as build

# Add build-time arguments
ARG NODE_ENV=production
ARG VITE_API_URL

# Set environment variables
ENV NODE_ENV=$NODE_ENV
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

# Use cache mount for better performance
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm

# Copy only necessary files first
COPY package.json pnpm-lock.yaml ./

# Use cache mount for dependencies
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

# Copy and build
COPY . .
RUN pnpm build

# Production stage
FROM nginx:alpine-slim

# Security: Run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built assets and configurations
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set proper permissions
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Switch to non-root user
USER appuser

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration Improvements

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Improved security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;

    # Improved caching strategy
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, no-transform, immutable";
        access_log off;
    }

    location /api/ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;
    gzip_disable "MSIE [1-6]\.";

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

### SolidJS Best Practices

#### 1. Signal Management

```typescript
// ❌ Bad Practice
const [count, setCount] = createSignal(0);
const double = () => count() * 2; // Recomputed every time

// ✅ Good Practice
const [count, setCount] = createSignal(0);
const double = createMemo(() => count() * 2); // Memoized value
```

#### 2. Component Props

```typescript
// ❌ Bad Practice
interface Props {
  data: any;
  onEvent: Function;
}

// ✅ Good Practice
interface Props {
  data: {
    id: string;
    name: string;
    value: number;
  };
  onEvent: (value: string) => void;
}
```

#### 3. Error Boundaries

```typescript
// Create error boundary component
export const ErrorBoundary: ParentComponent = (props) => {
  const [error, setError] = createSignal<Error>();

  onError((e: Error) => {
    setError(e);
  });

  return (
    <Show when={!error()} fallback={
      <div class="error-container">
        <h2>Something went wrong</h2>
        <pre>{error()?.message}</pre>
      </div>
    }>
      {props.children}
    </Show>
  );
};
```

### Tailwind & Shadcn Integration

#### 1. Theme Configuration

```javascript
// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.purple,
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
        // Shadcn color tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... other Shadcn tokens
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
```

#### 2. Component Styling

```typescript
// ❌ Bad Practice
<div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">

// ✅ Good Practice
const cardStyles = {
  base: "p-4 rounded-lg shadow-md transition-colors duration-200",
  light: "bg-card text-card-foreground",
  dark: "dark:bg-card-dark dark:text-card-dark-foreground"
};

<div class={clsx(cardStyles.base, cardStyles.light, cardStyles.dark)}>
```

### Store Pattern Implementation

```typescript
// store/createStore.ts
export interface Store<T> {
  state: () => T;
  setState: (value: T | ((prev: T) => T)) => void;
  subscribe: (callback: (state: T) => void) => () => void;
}

export const createStore = <T>(initialState: T): Store<T> => {
  const [state, setState] = createSignal(initialState);
  const subscribers = new Set<(state: T) => void>();

  const notifySubscribers = (newState: T) => {
    subscribers.forEach(callback => callback(newState));
  };

  return {
    state,
    setState: (value) => {
      const newState = typeof value === 'function'
        ? (value as ((prev: T) => T))(state())
        : value;
      setState(newState);
      notifySubscribers(newState);
    },
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    }
  };
};

// Example usage
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export const createAuthStore = () => {
  const store = createStore<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: false
  });

  const actions = {
    login: async (credentials: Credentials) => {
      store.setState(prev => ({ ...prev, loading: true }));
      try {
        const user = await authService.login(credentials);
        store.setState({ user, isAuthenticated: true, loading: false });
      } catch (error) {
        store.setState({ user: null, isAuthenticated: false, loading: false });
        throw error;
      }
    },
    logout: () => {
      store.setState({ user: null, isAuthenticated: false, loading: false });
    }
  };

  return {
    ...store,
    ...actions
  };
};
```

## 🔬 Deep Analysis & Additional Improvements

### 1. Component Architecture Refinements

#### 1.1 Atomic Design Implementation

- [ ] Implement atomic design principles

  ```typescript
  src/components/
  ├── atoms/       # Basic building blocks (Button, Input, etc.)
  ├── molecules/   # Simple combinations of atoms
  ├── organisms/   # Complex combinations of molecules
  ├── templates/   # Page layouts
  └── pages/       # Actual pages
  ```

#### 1.2 Component Composition Patterns

- [ ] Implement compound components pattern

  ```typescript
  // Example: Select Component
  const Select = {
    Root: (props) => {...},
    Trigger: (props) => {...},
    Content: (props) => {...},
    Item: (props) => {...},
  }

  // Usage
  <Select.Root>
    <Select.Trigger>
      <Select.Value />
    </Select.Trigger>
    <Select.Content>
      <Select.Item>Option 1</Select.Item>
      <Select.Item>Option 2</Select.Item>
    </Select.Content>
  </Select.Root>
  ```

### 2. State Management Enhancements

#### 2.1 Store Segmentation

- [ ] Implement domain-driven store organization

  ```typescript
  src/stores/
  ├── auth/
  │   ├── types.ts
  │   ├── store.ts
  │   └── actions.ts
  ├── products/
  │   ├── types.ts
  │   ├── store.ts
  │   └── actions.ts
  └── shared/
      ├── types.ts
      ├── store.ts
      └── actions.ts
  ```

#### 2.2 Store Middleware System

- [ ] Implement middleware for common operations

  ```typescript
  type Middleware<T> = (
    store: Store<T>,
    next: (action: Action) => void,
    action: Action
  ) => void;

  const loggerMiddleware: Middleware<State> = (store, next, action) => {
    console.log('Before:', store.state());
    next(action);
    console.log('After:', store.state());
  };
  ```

### 3. Performance Optimizations

#### 3.1 Code Splitting Strategy

- [ ] Implement route-based code splitting

  ```typescript
  // routes.ts
  export const routes = [
    {
      path: '/',
      component: lazy(() => import('./pages/Home')),
    },
    {
      path: '/products',
      component: lazy(() => import('./pages/Products')),
    },
  ];
  ```

#### 3.2 Asset Optimization

- [ ] Implement image optimization pipeline

  ```typescript
  // vite.config.ts
  export default defineConfig({
    plugins: [
      imageOptimizer({
        quality: 80,
        formats: ['webp', 'avif'],
        sizes: [640, 1280, 1920],
      }),
    ],
  });
  ```

### 4. Testing Strategy Enhancement

#### 4.1 Test Organization

```typescript
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.test.tsx
│       ├── Button.stories.tsx
│       └── Button.e2e.test.tsx
└── __tests__/
    ├── unit/
    ├── integration/
    └── e2e/
```

#### 4.2 Test Utilities

```typescript
// test-utils.ts
export const createWrapper = (component: Component) => {
  return render(() => (
    <TestProvider>
      {component}
    </TestProvider>
  ));
};

export const mockStore = <T extends object>(initialState: T) => {
  return createStore(initialState);
};
```

### 5. API Integration Improvements

#### 5.1 API Layer Architecture

```typescript
src/services/
├── api/
│   ├── client.ts
│   └── endpoints/
│       ├── auth.ts
│       └── products.ts
├── mock/
│   └── handlers/
└── types/
```

#### 5.2 Error Handling

```typescript
class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
    public data?: unknown
  ) {
    super(message);
  }
}

const errorHandler = (error: unknown) => {
  if (error instanceof APIError) {
    toast.error(error.message);
    if (error.status === 401) {
      authStore.logout();
    }
  }
};
```

### 6. Security Enhancements

#### 6.1 Input Sanitization

```typescript
const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],
    ALLOWED_ATTR: [],
  });
};
```

#### 6.2 Authentication Flow

```typescript
const authGuard = (next: () => void) => {
  const { isAuthenticated, checkAuth } = useAuth();
  
  createEffect(() => {
    if (!isAuthenticated()) {
      checkAuth().catch(() => {
        navigate('/login');
      });
    } else {
      next();
    }
  });
};
```

### 7. Accessibility Improvements

#### 7.1 Focus Management

```typescript
const FocusTrap = (props: ParentProps) => {
  let ref: HTMLDivElement | undefined;
  
  onMount(() => {
    const focusable = ref?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusable?.[0]) {
      (focusable[0] as HTMLElement).focus();
    }
  });
  
  return <div ref={ref}>{props.children}</div>;
};
```

#### 7.2 ARIA Implementation

```typescript
const Dialog = (props: DialogProps) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={props.titleId}
      aria-describedby={props.descriptionId}
    >
      <h2 id={props.titleId}>{props.title}</h2>
      <p id={props.descriptionId}>{props.description}</p>
      {props.children}
    </div>
  );
};
```

### 8. Development Experience Improvements

#### 8.1 Development Tools

- [ ] Implement development tools panel

  ```typescript
  const DevTools = () => {
    const { state } = useStore();
    
    return (
      <div class="fixed bottom-0 right-0 p-4 bg-background">
        <pre>{JSON.stringify(state(), null, 2)}</pre>
        <button onClick={() => localStorage.clear()}>
          Clear Storage
        </button>
      </div>
    );
  };
  ```

#### 8.2 Error Boundaries

```typescript
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" class="error-boundary">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
```

## 📈 Updated Success Metrics

### Performance

- Time to First Byte (TTFB) < 100ms
- First Contentful Paint (FCP) < 1s
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

### Code Quality

- Test coverage > 85%
- SonarQube quality gate: Passed
- Lighthouse accessibility score > 95
- Zero high or critical vulnerabilities

### Developer Experience

- Hot reload time < 1.5s
- Build time < 25s
- PR review time < 12h
- Documentation coverage > 90%

This roadmap will continue to evolve as we implement these improvements and identify new areas for enhancement.

## 📚 Library Analysis & Improvements

### 1. Session Management (`session.ts`)

#### Current Implementation Review

```typescript
// Strengths:
// ✅ Good separation of concerns
// ✅ Proper type safety
// ✅ Handles session expiry
// ✅ Implements "remember me" functionality

// Areas for Improvement:
// ❌ No refresh token mechanism
// ❌ Limited session security
// ❌ No encryption for stored data
// ❌ No cross-tab synchronization
```

#### Improved Implementation

```typescript
import { encrypt, decrypt } from '../utils/crypto';

interface Session {
  user: User;
  expiresAt: number;
  refreshToken?: string;
}

interface SessionOptions {
  remember?: boolean;
  secure?: boolean;
  expiryDays?: number;
}

export class SessionManager {
  private static readonly SESSION_KEY = "trinity_session";
  private static readonly REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
  private refreshInterval?: number;

  constructor(private options: SessionOptions = {}) {
    this.setupRefreshInterval();
    this.setupBroadcastChannel();
  }

  private setupRefreshInterval() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    
    this.refreshInterval = window.setInterval(() => {
      this.refreshSessionIfNeeded();
    }, SessionManager.REFRESH_INTERVAL);
  }

  private setupBroadcastChannel() {
    const channel = new BroadcastChannel('session_channel');
    channel.onmessage = (event) => {
      if (event.data.type === 'session_updated') {
        this.syncSession();
      }
    };
  }

  private encryptSession(session: Session): string {
    return this.options.secure ? encrypt(JSON.stringify(session)) : JSON.stringify(session);
  }

  private decryptSession(data: string): Session | null {
    try {
      const decrypted = this.options.secure ? decrypt(data) : data;
      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  }

  saveSession(user: User, options?: SessionOptions) {
    const session: Session = {
      user,
      expiresAt: Date.now() + (options?.expiryDays || 1) * 24 * 60 * 60 * 1000,
      refreshToken: crypto.randomUUID(),
    };

    const encrypted = this.encryptSession(session);
    sessionStorage.setItem(SessionManager.SESSION_KEY, encrypted);

    if (options?.remember) {
      localStorage.setItem(`${SessionManager.SESSION_KEY}_remember`, encrypted);
    }

    this.broadcastSessionUpdate();
  }

  private broadcastSessionUpdate() {
    const channel = new BroadcastChannel('session_channel');
    channel.postMessage({ type: 'session_updated' });
  }

  private async refreshSessionIfNeeded() {
    const session = this.getSession();
    if (!session) return;

    const timeToExpiry = session.expiresAt - Date.now();
    if (timeToExpiry < SessionManager.REFRESH_INTERVAL) {
      try {
        const newSession = await this.refreshSession(session.refreshToken);
        this.saveSession(newSession.user);
      } catch {
        this.clearSession();
      }
    }
  }
}
```

### 2. Retry Mechanism (`retry.ts`)

#### Current Implementation Review

```typescript
// Strengths:
// ✅ Generic type support
// ✅ Configurable retry options
// ✅ Exponential backoff support

// Areas for Improvement:
// ❌ Limited error handling
// ❌ No retry condition customization
// ❌ No progress tracking
// ❌ No timeout mechanism
```

#### Improved Implementation

```typescript
interface RetryOptions<T> {
  maxAttempts?: number;
  delayMs?: number;
  backoff?: boolean;
  timeout?: number;
  shouldRetry?: (error: Error) => boolean;
  onRetry?: (attempt: number, error: Error) => void;
  onTimeout?: () => void;
  onSuccess?: (result: T) => void;
  onError?: (error: Error) => void;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions<T> = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    backoff = true,
    timeout,
    shouldRetry = (error) => error instanceof MockError,
    onRetry,
    onTimeout,
    onSuccess,
    onError,
  } = options;

  let timeoutId: NodeJS.Timeout | undefined;

  const executeWithTimeout = async (): Promise<T> => {
    if (timeout) {
      return Promise.race([
        fn(),
        new Promise<never>((_, reject) => {
          timeoutId = setTimeout(() => {
            const error = new Error('Operation timed out');
            onTimeout?.();
            reject(error);
          }, timeout);
        }),
      ]);
    }
    return fn();
  };

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await executeWithTimeout();
      onSuccess?.(result);
      return result;
    } catch (error) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const typedError = error as Error;
      onError?.(typedError);

      if (!shouldRetry(typedError) || attempt === maxAttempts) {
        throw typedError;
      }

      onRetry?.(attempt, typedError);
      const delay = backoff ? delayMs * Math.pow(2, attempt - 1) : delayMs;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error('Retry failed');
}
```

### 3. Styles Management (`styles.ts`)

#### Current Implementation Review

```typescript
// Strengths:
// ✅ Well-organized style patterns
// ✅ Type-safe style combinations
// ✅ Reusable components

// Areas for Improvement:
// ❌ No theme customization
// ❌ Limited responsive patterns
// ❌ No style composition utilities
// ❌ No dynamic style generation
```

#### Improved Implementation

```typescript
import { createTheme } from '../theme';

type ThemeMode = 'light' | 'dark';
type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;
type StyleValue = string | ResponsiveValue<string>;

interface StyleOptions {
  theme?: ThemeMode;
  responsive?: boolean;
  variants?: Record<string, StyleValue>;
}

export class StyleManager {
  private theme = createTheme('light');
  private mediaQueries: Record<Breakpoint, string>;

  constructor() {
    this.mediaQueries = {
      sm: '(min-width: 640px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 1024px)',
      xl: '(min-width: 1280px)',
      '2xl': '(min-width: 1536px)',
    };
  }

  setTheme(mode: ThemeMode) {
    this.theme = createTheme(mode);
  }

  createStyles(styles: Record<string, StyleValue>, options: StyleOptions = {}) {
    return Object.entries(styles).reduce((acc, [key, value]) => {
      acc[key] = this.processStyle(value, options);
      return acc;
    }, {} as Record<string, string>);
  }

  private processStyle(style: StyleValue, options: StyleOptions): string {
    if (typeof style === 'string') {
      return this.applyTheme(style, options.theme);
    }

    return Object.entries(style as Record<Breakpoint, string>)
      .map(([breakpoint, value]) => {
        const processed = this.applyTheme(value, options.theme);
        return breakpoint === 'base'
          ? processed
          : `@media ${this.mediaQueries[breakpoint as Breakpoint]} { ${processed} }`;
      })
      .join(' ');
  }

  private applyTheme(style: string, mode?: ThemeMode): string {
    return style.replace(/var\(--([^)]+)\)/g, (_, variable) => {
      return this.theme.getValue(variable);
    });
  }
}

// Usage example
const styleManager = new StyleManager();

const buttonStyles = styleManager.createStyles({
  base: 'px-4 py-2 rounded-md transition-colors',
  primary: {
    base: 'bg-primary-500 text-white',
    hover: 'hover:bg-primary-600',
    active: 'active:bg-primary-700',
  },
  responsive: {
    base: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  },
});
```

### 4. API Configuration (`api.ts`)

#### Current Implementation Review

```typescript
// Strengths:
// ✅ Simple and clean API
// ✅ Environment-based configuration
// ✅ Type-safe URL generation

// Areas for Improvement:
// ❌ No request/response interceptors
// ❌ Limited error handling
// ❌ No request caching
// ❌ No request cancellation
```

#### Improved Implementation

```typescript
import { createCache } from '../utils/cache';

interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
  cache?: boolean;
  retries?: number;
}

interface RequestConfig extends RequestInit {
  cache?: boolean;
  timeout?: number;
  retries?: number;
}

export class ApiClient {
  private cache = createCache();
  private controller = new AbortController();

  constructor(private config: ApiConfig) {}

  async request<T>(path: string, config?: RequestConfig): Promise<T> {
    const mergedConfig = this.mergeConfigs(config);
    const cacheKey = this.getCacheKey(path, mergedConfig);

    if (mergedConfig.cache) {
      const cached = this.cache.get(cacheKey);
      if (cached) return cached as T;
    }

    try {
      const response = await this.executeRequest<T>(path, mergedConfig);
      
      if (mergedConfig.cache) {
        this.cache.set(cacheKey, response);
      }
      
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw this.enhanceError(error);
      }
      throw error;
    }
  }

  private mergeConfigs(config?: RequestConfig): RequestConfig {
    return {
      headers: { ...this.config.headers, ...config?.headers },
      timeout: config?.timeout ?? this.config.timeout,
      cache: config?.cache ?? this.config.cache,
      retries: config?.retries ?? this.config.retries,
      signal: this.controller.signal,
      ...config,
    };
  }

  private async executeRequest<T>(
    path: string,
    config: RequestConfig
  ): Promise<T> {
    const url = this.createUrl(path);
    const timeoutPromise = this.createTimeout(config.timeout);
    
    try {
      const response = await Promise.race([
        fetch(url, config),
        timeoutPromise,
      ]);
      
      if (!response.ok) {
        throw new ApiError(response.statusText, response.status);
      }
      
      return response.json();
    } catch (error) {
      if (config.retries && config.retries > 0) {
        return withRetry(() => this.executeRequest<T>(path, {
          ...config,
          retries: config.retries - 1,
        }));
      }
      throw error;
    }
  }

  private createUrl(path: string): string {
    return new URL(path, this.config.baseUrl).toString();
  }

  private createTimeout(ms?: number): Promise<never> {
    if (!ms) return new Promise(() => {});
    
    return new Promise((_, reject) => {
      setTimeout(() => {
        this.controller.abort();
        reject(new Error('Request timeout'));
      }, ms);
    });
  }

  private enhanceError(error: Error): Error {
    if (error.name === 'AbortError') {
      return new Error('Request was cancelled');
    }
    return error;
  }

  cancelRequests() {
    this.controller.abort();
    this.controller = new AbortController();
  }
}

// Usage example
const api = new ApiClient({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  cache: true,
  retries: 3,
});
```

These improvements focus on:

1. Enhanced type safety
2. Better error handling
3. Performance optimizations
4. Security improvements
5. Better developer experience
6. More robust functionality

The implementation will be done incrementally following the sprint plan.

## 📄 Page Analysis & Improvements

### 1. Current Page Structure

```typescript
src/pages/
├── admin/          # Admin section pages
├── Home.tsx        # Landing page (290 lines)
├── Products.tsx    # Product listing (219 lines)
├── Profile.tsx     # User profile (496 lines)
├── Checkout.tsx    # Checkout process (246 lines)
├── OrderHistory.tsx # Order tracking (335 lines)
├── Categories.tsx  # Category listing (148 lines)
├── Login.tsx       # Authentication (13 lines)
├── Register.tsx    # User registration (13 lines)
├── NotFound.tsx    # 404 page (28 lines)
└── Showcase.tsx    # Component showcase (342 lines)
```

### 2. Page Component Analysis

#### 2.1 Current Patterns

```typescript
// ❌ Current Issues:
// 1. Large component files (Profile.tsx: 496 lines)
// 2. Mixed concerns (UI, state, API calls)
// 3. Duplicated loading/error states
// 4. Inconsistent form handling
// 5. Limited component composition

// ✅ Good Practices:
// 1. Consistent use of stores
// 2. Type safety with interfaces
// 3. Proper error handling
// 4. Responsive design patterns
// 5. Loading state handling
```

#### 2.2 Improved Page Structure

```typescript
// Example: Profile Page Refactoring
src/pages/Profile/
├── index.tsx                # Main component
├── components/             
│   ├── PersonalInfo.tsx     # Personal information section
│   ├── AddressForm.tsx      # Address management
│   ├── Preferences.tsx      # User preferences
│   └── PasswordChange.tsx   # Password change form
├── hooks/
│   ├── useProfileForm.ts    # Form logic
│   └── useAddressValidation.ts
├── types.ts                 # Page-specific types
└── utils.ts                 # Helper functions

// index.tsx
const ProfilePage: Component = () => {
  const { formState, handlers } = useProfileForm();
  
  return (
    <PageLayout title="Profile" description="Manage your account settings">
      <Show when={formState.success || formState.error}>
        <AlertBanner
          type={formState.success ? "success" : "error"}
          message={formState.success || formState.error}
        />
      </Show>
      
      <ProfileSections>
        <PersonalInfo
          data={formState.personal}
          onChange={handlers.updatePersonal}
        />
        <AddressForm
          addresses={formState.addresses}
          onChange={handlers.updateAddress}
        />
        <Preferences
          data={formState.preferences}
          onChange={handlers.updatePreferences}
        />
        <PasswordChange
          onSubmit={handlers.changePassword}
          error={formState.passwordError}
        />
      </ProfileSections>
    </PageLayout>
  );
};
```

### 3. Common Patterns Implementation

#### 3.1 Page Layout Pattern

```typescript
interface PageLayoutProps {
  title: string;
  description?: string;
  children: JSX.Element;
  actions?: JSX.Element;
}

const PageLayout: Component<PageLayoutProps> = (props) => {
  return (
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto space-y-8">
        <header class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold">{props.title}</h1>
            <Show when={props.description}>
              <p class="text-muted-foreground mt-2">{props.description}</p>
            </Show>
          </div>
          <Show when={props.actions}>
            <div>{props.actions}</div>
          </Show>
        </header>
        {props.children}
      </div>
    </div>
  );
};
```

#### 3.2 Form Handling Pattern

```typescript
interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  submitCount: number;
}

function createForm<T extends object>(options: FormOptions<T>) {
  const [state, setState] = createStore<FormState<T>>({
    data: options.initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    submitCount: 0,
  });

  const validate = (values: T) => {
    const errors = options.validate?.(values) ?? {};
    setState('errors', errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setState('isSubmitting', true);
    
    try {
      if (validate(state.data)) {
        await options.onSubmit(state.data);
      }
    } finally {
      setState('isSubmitting', false);
      setState('submitCount', c => c + 1);
    }
  };

  return {
    state,
    handleSubmit,
    handleChange: (field: keyof T) => (value: any) => {
      setState('data', field as any, value);
      setState('touched', field as any, true);
      if (options.validateOnChange) {
        validate(state.data);
      }
    },
  };
}
```

#### 3.3 Data Loading Pattern

```typescript
interface LoaderState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function createLoader<T>(fetcher: () => Promise<T>) {
  const [state, setState] = createStore<LoaderState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = async () => {
    setState('loading', true);
    setState('error', null);
    
    try {
      const data = await fetcher();
      setState('data', data);
    } catch (error) {
      setState('error', error as Error);
    } finally {
      setState('loading', false);
    }
  };

  createEffect(() => {
    load();
  });

  return {
    state,
    reload: load,
  };
}

// Usage in page
const ProductsPage: Component = () => {
  const { state, reload } = createLoader(() => 
    productStore.fetchProducts()
  );

  return (
    <PageLayout title="Products">
      <Show
        when={!state.loading}
        fallback={<ProductsSkeleton />}
      >
        <Show
          when={!state.error}
          fallback={
            <ErrorState
              error={state.error!}
              onRetry={reload}
            />
          }
        >
          <ProductGrid products={state.data!} />
        </Show>
      </Show>
    </PageLayout>
  );
};
```

### 4. Page-Specific Improvements

#### 4.1 Product Detail Page

```typescript
// Improved product data loading
const ProductDetail: Component = () => {
  const params = useParams();
  const { product, loading, error, retry } = useProduct(params.id);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <PageLayout
      title="Product Details"
      actions={
        <BackButton onClick={() => navigate("/products")}>
          Back to Products
        </BackButton>
      }
    >
      <ErrorBoundary fallback={ErrorState}>
        <Suspense fallback={<ProductDetailSkeleton />}>
          <Show when={product()} keyed>
            {(data) => (
              <ProductView
                product={data}
                onAddToCart={() => addToCart(data.id)}
                onToggleFavorite={() => toggleFavorite(data.id)}
                isFavorite={isFavorite(data.id)}
              />
            )}
          </Show>
        </Suspense>
      </ErrorBoundary>
    </PageLayout>
  );
};
```

#### 4.2 Checkout Page

```typescript
// Improved checkout flow
const CheckoutPage: Component = () => {
  const { state, dispatch } = useCheckoutFlow();
  
  return (
    <PageLayout title="Checkout">
      <CheckoutProgress step={state.currentStep} />
      
      <Switch>
        <Match when={state.currentStep === 'shipping'}>
          <ShippingForm
            data={state.shipping}
            onSubmit={(data) => {
              dispatch({ type: 'SET_SHIPPING', data });
              dispatch({ type: 'NEXT_STEP' });
            }}
          />
        </Match>
        <Match when={state.currentStep === 'payment'}>
          <PaymentForm
            data={state.payment}
            onSubmit={(data) => {
              dispatch({ type: 'SET_PAYMENT', data });
              dispatch({ type: 'NEXT_STEP' });
            }}
          />
        </Match>
        <Match when={state.currentStep === 'review'}>
          <OrderReview
            order={state}
            onConfirm={() => dispatch({ type: 'SUBMIT_ORDER' })}
            onEdit={(step) => dispatch({ type: 'GO_TO_STEP', step })}
          />
        </Match>
      </Switch>
    </PageLayout>
  );
};
```

### 5. Implementation Roadmap

1. **Phase 1: Page Structure Refactoring**
   - Split large components into smaller, focused components
   - Implement consistent page layouts
   - Extract common patterns into reusable hooks

2. **Phase 2: Form Handling**
   - Implement form management system
   - Add validation patterns
   - Create reusable form components

3. **Phase 3: Data Loading**
   - Implement consistent loading patterns
   - Add error boundaries
   - Create skeleton loading states

4. **Phase 4: State Management**
   - Refine store usage
   - Implement proper state persistence
   - Add state synchronization

5. **Phase 5: Testing & Documentation**
   - Add page-level tests
   - Document page patterns
   - Create page templates

These improvements will be implemented incrementally, focusing on one page at a time to ensure stability and consistency.

### Testing Implementation Plan

#### 1. Vitest Configuration
```typescript
// vite.config.ts additions
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.ts'],
  include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  coverage: {
    reporter: ['text', 'json', 'html'],
    exclude: ['node_modules/', 'src/test/setup.ts']
  }
}
```

#### 2. Testing Utilities
```typescript
// src/test/utils.ts
export function createWrapper(component: Component) {
  return render(() => (
    <TestProvider>
      {component}
    </TestProvider>
  ));
}

export function createTestStore<T>(initialState: T) {
  return createStore({
    initialState,
    middleware: [/* test middleware */]
  });
}
```

#### 3. Component Testing Pattern
```typescript
// src/components/Button/Button.test.tsx
describe('Button', () => {
  it('renders correctly', () => {
    const { getByRole } = createWrapper(
      <Button>Click me</Button>
    );
    
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClickMock = vi.fn();
    const { getByRole } = createWrapper(
      <Button onClick={onClickMock}>Click me</Button>
    );
    
    getByRole('button').click();
    expect(onClickMock).toHaveBeenCalled();
  });
});
```

#### 4. Store Testing Pattern
```typescript
// src/stores/ui.store.test.ts
describe('UI Store', () => {
  it('updates theme correctly', () => {
    const { result } = renderHook(() => useUI());
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('dark');
  });
});
```

#### 5. E2E Testing Setup
```typescript
// e2e/navigation.spec.ts
test('user can navigate through protected routes', async ({ page }) => {
  await page.goto('/');
  await page.login(); // Custom helper
  
  await page.click('text=Dashboard');
  await expect(page).toHaveURL('/dashboard');
  
  await expect(page.locator('h1')).toHaveText('Dashboard');
});
```

Next Steps:
1. Set up Vitest with the configuration above
2. Create test utilities and helpers
3. Implement first component tests
4. Add store testing utilities
5. Set up Playwright for E2E testing
