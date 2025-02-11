import { DeepPartial } from '@/types/global';

/**
 * Logs all state changes to the console
 */
export const loggerMiddleware = <T>(prevState: T, nextState: T) => {
  console.group('State Update');
  console.log('Previous:', prevState);
  console.log('Next:', nextState);
  console.groupEnd();
  return nextState;
};

/**
 * Validates state changes against a schema
 */
export const validatorMiddleware = <T>(schema: (state: T) => boolean) => {
  return (prevState: T, nextState: T) => {
    if (!schema(nextState)) {
      console.error('Invalid state:', nextState);
      return prevState;
    }
    return nextState;
  };
};

/**
 * Prevents specific fields from being modified
 */
export const immutableFieldsMiddleware = <T>(fields: (keyof T)[]) => {
  return (prevState: T, nextState: T) => {
    const protectedState = { ...nextState };
    fields.forEach(field => {
      protectedState[field] = prevState[field];
    });
    return protectedState;
  };
};

/**
 * Debounces state updates
 */
export const debounceMiddleware = <T>(delay: number) => {
  let timeoutId: NodeJS.Timeout;
  let pendingState: T | null = null;

  return (prevState: T, nextState: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      pendingState = nextState;
    }

    timeoutId = setTimeout(() => {
      if (pendingState) {
        // Update the state with the latest pending state
        pendingState = null;
      }
    }, delay);

    return pendingState || nextState;
  };
};

/**
 * Merges partial updates with existing state
 */
export const mergeMiddleware = <T extends object>() => {
  return (prevState: T, nextState: DeepPartial<T>) => {
    return {
      ...prevState,
      ...nextState,
    } as T;
  };
}; 