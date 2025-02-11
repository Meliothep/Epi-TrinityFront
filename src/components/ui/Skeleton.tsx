import { Component, JSX } from "solid-js";
import { cn } from "../../lib/utils";

interface SkeletonProps {
	class?: string;
	/**
	 * The shape of the skeleton.
	 * - circle: Rounded full, good for avatars
	 * - rect: Rectangle with small border radius
	 * - text: Shorter width, good for text lines
	 */
	variant?: "circle" | "rect" | "text";
}

export const Skeleton: Component<JSX.HTMLAttributes<HTMLDivElement>> = (
	props
) => {
	return (
		<div
			class={cn("animate-pulse rounded-md bg-muted", props.class)}
			{...props}
		>
			{props.children}
		</div>
	);
};
