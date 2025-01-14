import { Component, JSX } from "solid-js";
import { clsx } from "../../lib/utils";

interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
	padding?: "none" | "sm" | "md" | "lg";
	shadow?: boolean;
}

export const Card: Component<CardProps> = (props) => {
	const baseStyles = "rounded-lg border bg-card text-card-foreground";

	const paddings = {
		none: "",
		sm: "p-4",
		md: "p-6",
		lg: "p-8",
	};

	return (
		<div
			{...props}
			class={clsx(
				baseStyles,
				paddings[props.padding || "md"],
				props.shadow && "shadow-lg",
				props.class
			)}
		>
			{props.children}
		</div>
	);
};
