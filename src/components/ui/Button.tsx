import { Component, JSX } from "solid-js";
import { cn } from "../../lib/utils";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?: "default" | "sm" | "lg" | "icon";
}

const buttonVariants = {
	default:
		"bg-primary text-primary-foreground hover:motion-safe:motion-scale-105 hover:bg-primary/90",
	destructive:
		"bg-destructive text-destructive-foreground hover:motion-safe:motion-scale-105 hover:bg-destructive/90",
	outline:
		"border border-input bg-background hover:motion-safe:motion-scale-102 hover:bg-accent hover:text-accent-foreground",
	secondary:
		"bg-secondary text-secondary-foreground hover:motion-safe:motion-scale-102 hover:bg-secondary/80",
	ghost:
		"hover:motion-safe:motion-scale-102 hover:bg-accent hover:text-accent-foreground",
	link: "text-primary underline-offset-4 hover:underline hover:motion-safe:motion-scale-102",
};

const buttonSizes = {
	default: "h-10 px-4 py-2",
	sm: "h-9 rounded-md px-3",
	lg: "h-11 rounded-md px-8",
	icon: "h-10 w-10",
};

export const Button: Component<ButtonProps> = (props) => {
	return (
		<button
			{...props}
			class={cn(
				"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background motion-safe:motion-duration-150 motion-safe:motion-ease-spring-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:motion-safe:motion-scale-95",
				buttonVariants[props.variant || "default"],
				buttonSizes[props.size || "default"],
				props.class
			)}
		>
			{props.children}
		</button>
	);
};
