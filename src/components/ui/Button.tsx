import { Component, JSX } from "solid-js";
import { clsx } from "../../lib/utils";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
}

export const Button: Component<ButtonProps> = (props) => {
	const baseStyles =
		"inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

	const variants = {
		primary: "bg-primary text-primary-foreground hover:bg-primary/90",
		secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
		outline: "border border-input hover:bg-accent hover:text-accent-foreground",
	};

	const sizes = {
		sm: "h-9 px-3 text-sm",
		md: "h-10 px-4 py-2",
		lg: "h-11 px-8",
	};

	return (
		<button
			{...props}
			class={clsx(
				baseStyles,
				variants[props.variant || "primary"],
				sizes[props.size || "md"],
				props.class
			)}
		>
			{props.children}
		</button>
	);
};
