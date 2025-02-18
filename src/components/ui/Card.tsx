import { Component, JSX } from "solid-js";
import { cn } from "../../lib/utils";

interface CardProps {
	class?: string;
	children?: JSX.Element;
	onClick?: () => void;
}

export const Card: Component<CardProps> = (props) => {
	return (
		<div
			class={cn(
				"rounded-lg border bg-card text-card-foreground shadow-sm",
				props.onClick && "cursor-pointer",
				props.class
			)}
			onClick={props.onClick}
		>
			{props.children}
		</div>
	);
};

export const CardHeader: Component<{
	class?: string;
	children?: JSX.Element;
}> = (props) => {
	return (
		<div class={cn("flex flex-col space-y-1.5 p-6", props.class)}>
			{props.children}
		</div>
	);
};

export const CardTitle: Component<{
	class?: string;
	children?: JSX.Element;
}> = (props) => {
	return (
		<h3
			class={cn(
				"text-2xl font-semibold leading-none tracking-tight",
				props.class
			)}
		>
			{props.children}
		</h3>
	);
};

export const CardDescription: Component<{
	class?: string;
	children?: JSX.Element;
}> = (props) => {
	return (
		<p class={cn("text-sm text-muted-foreground", props.class)}>
			{props.children}
		</p>
	);
};

export const CardContent: Component<{
	class?: string;
	children?: JSX.Element;
}> = (props) => {
	return <div class={cn("p-6 pt-0", props.class)}>{props.children}</div>;
};

export const CardFooter: Component<{
	class?: string;
	children?: JSX.Element;
}> = (props) => {
	return (
		<div class={cn("flex items-center p-6 pt-0", props.class)}>
			{props.children}
		</div>
	);
};
