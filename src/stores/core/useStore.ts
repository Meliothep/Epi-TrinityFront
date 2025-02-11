import { createEffect, onCleanup } from 'solid-js';
import type { Store } from './createStore';

/**
 * Hook to use store state in components with automatic cleanup
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const state = useStore(myStore);
 *   return <div>{state().value}</div>;
 * };
 * ```
 */
export function useStore<T>(store: Store<T>) {
  let mounted = true;

  // Subscribe to store updates
  createEffect(() => {
    const unsubscribe = store.subscribe((state) => {
      if (mounted) {
        // Force component update
        store.state();
      }
    });

    onCleanup(() => {
      mounted = false;
      unsubscribe();
    });
  });

  return store.state;
}

/**
 * Hook to use a specific slice of store state
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const count = useStoreSelector(counterStore, state => state.count);
 *   return <div>{count()}</div>;
 * };
 * ```
 */
export function useStoreSelector<T, R>(
  store: Store<T>,
  selector: (state: T) => R
) {
  let mounted = true;
  let currentValue = selector(store.state());

  // Subscribe to store updates
  createEffect(() => {
    const unsubscribe = store.subscribe((state) => {
      if (mounted) {
        const newValue = selector(state);
        if (newValue !== currentValue) {
          currentValue = newValue;
          // Force component update
          store.state();
        }
      }
    });

    onCleanup(() => {
      mounted = false;
      unsubscribe();
    });
  });

  return () => selector(store.state());
} 