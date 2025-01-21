import { Component, JSX, Show } from "solid-js";
import { clsx } from "../../lib/utils";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?:
		| "primary"
		| "secondary"
		| "outline"
		| "ghost"
		| "link"
		| "destructive";
	size?: "sm" | "md" | "lg";
	loading?: boolean;
}

export const Button: Component<ButtonProps> = (props) => {
	const { loading, ...rest } = props;

	const baseStyles =
		"inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

	const variants = {
		primary: "bg-primary text-primary-foreground hover:bg-primary/90",
		secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
		outline: "border border-input hover:bg-accent hover:text-accent-foreground",
		ghost: "hover:bg-accent hover:text-accent-foreground",
		link: "text-primary underline-offset-4 hover:underline",
		destructive:
			"bg-destructive text-destructive-foreground hover:bg-destructive/90",
	};

	const sizes = {
		sm: "h-9 px-3 text-sm",
		md: "h-10 px-4 py-2",
		lg: "h-11 px-8",
	};

	return (
		<button
			{...rest}
			disabled={props.disabled || loading}
			class={clsx(
				baseStyles,
				variants[props.variant || "primary"],
				sizes[props.size || "md"],
				props.class
			)}
		>
			<Show when={loading}>
				<svg
					class="mr-2 h-4 w-4 animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			</Show>
			{props.children}
		</button>
	);
};
