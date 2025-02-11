import { MockError } from "../mocks/products.mock";

interface RetryOptions {
    maxAttempts?: number;
    delayMs?: number;
    backoff?: boolean;
}

export async function withRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const {
        maxAttempts = 3,
        delayMs = 1000,
        backoff = true
    } = options;

    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            
            // If it's not a mock error (like network error), don't retry
            if (!(error instanceof MockError)) {
                throw error;
            }
            
            // If this was the last attempt, throw the error
            if (attempt === maxAttempts) {
                throw error;
            }
            
            // Wait before retrying
            const delay = backoff ? delayMs * attempt : delayMs;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    // This should never happen due to the loop above
    throw lastError || new Error("Retry failed");
} 