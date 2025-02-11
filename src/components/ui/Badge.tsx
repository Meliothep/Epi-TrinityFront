import { Component, JSX } from "solid-js";
import { cn } from "../../lib/utils";

interface BadgeProps extends JSX.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "secondary" | "destructive" | "outline";
}

export const Badge: Component<BadgeProps> = (props) => {
	const variants = {
		default: "bg-primary text-primary-foreground hover:bg-primary/80",
		secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
		outline: "text-foreground",
		destructive:
			"bg-destructive text-destructive-foreground hover:bg-destructive/80",
	};

	return (
		<div
			class={cn(
				"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
				variants[props.variant || "default"],
				props.class
			)}
			{...props}
		>
			{props.children}
		</div>
	);
};
