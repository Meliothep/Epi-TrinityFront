import { Component, JSX, ErrorBoundary as SolidErrorBoundary } from "solid-js";
import { cn } from "@/lib/utils";

interface ErrorBoundaryProps extends BaseProps {
	/** Fallback component to render when an error occurs */
	fallback?: JSX.Element | ((error: Error, reset: () => void) => JSX.Element);
	/** Children to wrap with error boundary */
	children: JSX.Element;
	/** Callback fired when an error occurs */
	onError?: (error: Error) => void;
}

/**
 * Error Boundary component to handle errors in child components
 *
 * @example
 * ```tsx
 * <ErrorBoundary
 *   fallback={(error, reset) => (
 *     <div>
 *       <p>Something went wrong: {error.message}</p>
 *       <button onClick={reset}>Try again</button>
 *     </div>
 *   )}
 * >
 *   <ChildComponent />
 * </ErrorBoundary>
 * ```
 */
export const ErrorBoundary: Component<ErrorBoundaryProps> = (props) => {
	const defaultFallback = (error: Error, reset: () => void) => (
		<div
			class={cn(
				"p-4 rounded-lg border border-destructive/50 bg-destructive/10",
				"flex flex-col items-center justify-center gap-4",
				props.class
			)}
			style={props.style}
		>
			<div class="text-center">
				<h2 class="text-lg font-semibold text-destructive mb-2">
					Something went wrong
				</h2>
				<p class="text-sm text-muted-foreground">{error.message}</p>
			</div>
			<button
				class={cn(
					"px-4 py-2 text-sm font-medium rounded-md",
					"bg-destructive text-destructive-foreground",
					"hover:bg-destructive/90 transition-colors"
				)}
				onClick={reset}
			>
				Try again
			</button>
		</div>
	);

	return (
		<SolidErrorBoundary
			fallback={(error, reset) => {
				props.onError?.(error);
				if (typeof props.fallback === "function") {
					return props.fallback(error, reset);
				}
				return props.fallback || defaultFallback(error, reset);
			}}
		>
			{props.children}
		</SolidErrorBoundary>
	);
};
