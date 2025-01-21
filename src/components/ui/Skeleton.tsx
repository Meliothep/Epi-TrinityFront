import { Component, splitProps } from "solid-js";
import { clsx } from "../../lib/utils";

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

export const Skeleton: Component<SkeletonProps> = (props) => {
	const [local, rest] = splitProps(props, ["class", "variant"]);

	return (
		<div
			{...rest}
			class={clsx(
				"animate-pulse bg-muted",
				{
					"rounded-full": local.variant === "circle",
					"rounded-md": local.variant === "rect" || !local.variant,
					"w-[200px] rounded-md": local.variant === "text",
				},
				local.class
			)}
		/>
	);
};
