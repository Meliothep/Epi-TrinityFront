import { Component, Show } from "solid-js";
import { cn } from "@/lib/utils";

interface LoadingProps extends BaseProps {
	/** Size of the loading spinner */
	size?: "sm" | "md" | "lg";
	/** Text to display below the spinner */
	text?: string;
	/** Whether to show the loading spinner */
	show?: boolean;
	/** Whether to take up full height of parent */
	fullHeight?: boolean;
}

/**
 * Loading component for displaying loading states
 *
 * @example
 * ```tsx
 * <Loading size="lg" text="Loading data..." />
 * ```
 */
export const Loading: Component<LoadingProps> = (props) => {
	const sizeClasses = {
		sm: "w-4 h-4 border-2",
		md: "w-8 h-8 border-3",
		lg: "w-12 h-12 border-4",
	};

	return (
		<Show when={props.show !== false}>
			<div
				class={cn(
					"flex flex-col items-center justify-center",
					props.fullHeight && "h-full min-h-[12rem]",
					props.class
				)}
				style={props.style}
			>
				<div
					class={cn(
						"animate-spin rounded-full border-primary",
						"border-r-transparent border-t-transparent",
						sizeClasses[props.size || "md"]
					)}
				/>
				{props.text && (
					<p class="mt-4 text-sm text-muted-foreground">{props.text}</p>
				)}
			</div>
		</Show>
	);
};
