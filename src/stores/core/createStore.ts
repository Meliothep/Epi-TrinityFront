import { createSignal, createMemo, createEffect, batch } from 'solid-js';

export interface Store<T> {
  /** Current state */
  state: () => T;
  /** Subscribe to state changes */
  subscribe: (callback: (state: T) => void) => () => void;
  /** Update state */
  setState: (updater: ((prev: T) => T) | T) => void;
}

export interface StoreOptions<T> {
  /** Initial state */
  initialState: T;
  /** Storage key for persistence */
  storageKey?: string;
  /** Storage type (localStorage or sessionStorage) */
  storage?: Storage;
  /** Middleware to run before state updates */
  middleware?: Array<(state: T, nextState: T) => T>;
  /** Called when state changes */
  onStateChange?: (state: T) => void;
}

/**
 * Creates a store with optional persistence and middleware
 * 
 * @example
 * ```ts
 * const counterStore = createStore({
 *   initialState: { count: 0 },
 *   storageKey: 'counter',
 *   onStateChange: (state) => console.log('New state:', state)
 * });
 * ```
 */
export function createStore<T extends object>({
  initialState,
  storageKey,
  storage = typeof window !== 'undefined' ? localStorage : undefined,
  middleware = [],
  onStateChange,
}: StoreOptions<T>): Store<T> {
  // Initialize state from storage if available
  const getInitialState = (): T => {
    if (storageKey && storage) {
      const stored = storage.getItem(storageKey);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (error) {
          console.error(`Failed to parse stored state for key "${storageKey}":`, error);
        }
      }
    }
    return initialState;
  };

  const [state, setState] = createSignal<T>(getInitialState());
  const subscribers = new Set<(state: T) => void>();

  // Create persistence effect
  if (storageKey && storage) {
    createEffect(() => {
      const currentState = state();
      storage.setItem(storageKey, JSON.stringify(currentState));
    });
  }

  const updateState = (updater: ((prev: T) => T) | T) => {
    batch(() => {
      setState(prev => {
        const nextState = typeof updater === 'function'
          ? (updater as ((prev: T) => T))(prev)
          : updater;

        // Apply middleware
        const finalState = middleware.reduce(
          (state, middleware) => middleware(prev, state),
          nextState
        );

        // Notify subscribers
        subscribers.forEach(callback => callback(finalState));
        onStateChange?.(finalState);

        return finalState;
      });
    });
  };

  return {
    state,
    setState: updateState,
    subscribe: (callback: (state: T) => void) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },
  };
} 