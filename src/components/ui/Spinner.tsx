import { Component, splitProps } from "solid-js";
import { clsx } from "../../lib/utils";

interface SpinnerProps {
	size?: "sm" | "md" | "lg";
	class?: string;
}

export const Spinner: Component<SpinnerProps> = (props) => {
	const [local, rest] = splitProps(props, ["size", "class"]);

	const sizes = {
		sm: "h-4 w-4",
		md: "h-6 w-6",
		lg: "h-8 w-8",
	};

	return (
		<svg
			{...rest}
			class={clsx(
				"animate-spin text-muted-foreground",
				sizes[local.size || "md"],
				local.class
			)}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<circle
				class="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				stroke-width="4"
			/>
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	);
};
