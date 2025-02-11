import { Component, JSX } from "solid-js";
import { cn } from "../../lib/utils";

interface CardProps {
	children: JSX.Element;
	class?: string;
	onClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>;
}

export const Card: Component<CardProps> = (props) => {
	return (
		<div
			class={cn(
				"rounded-lg border bg-card text-card-foreground shadow-sm",
				props.class
			)}
			onClick={props.onClick}
		>
			{props.children}
		</div>
	);
};
