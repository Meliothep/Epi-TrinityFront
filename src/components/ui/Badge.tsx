import { Component, JSX, splitProps } from "solid-js";
import { clsx } from "../../lib/utils";

interface BadgeProps extends JSX.HTMLAttributes<HTMLSpanElement> {
	variant?:
		| "default"
		| "secondary"
		| "outline"
		| "destructive"
		| "success"
		| "warning";
	size?: "sm" | "md" | "lg";
}

export const Badge: Component<BadgeProps> = (props) => {
	const [local, rest] = splitProps(props, ["variant", "size", "class"]);

	const variants = {
		default: "bg-primary text-primary-foreground hover:bg-primary/80",
		secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
		outline:
			"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
		destructive:
			"bg-destructive text-destructive-foreground hover:bg-destructive/80",
		success: "bg-green-500/15 text-green-600 dark:text-green-400",
		warning: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
	};

	const sizes = {
		sm: "text-xs px-2 py-0.5",
		md: "text-sm px-2.5 py-0.5",
		lg: "text-base px-3 py-1",
	};

	return (
		<span
			{...rest}
			class={clsx(
				"inline-flex items-center font-medium rounded-full transition-colors",
				variants[local.variant || "default"],
				sizes[local.size || "md"],
				local.class
			)}
		/>
	);
};
