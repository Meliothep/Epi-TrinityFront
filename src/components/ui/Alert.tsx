import { Component, JSX } from "solid-js";
import { cn } from "../../lib/utils";

interface AlertProps extends JSX.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "destructive" | "warning" | "success";
	title?: string;
	description?: string;
	icon?: JSX.Element;
}

export const Alert: Component<AlertProps> = (props) => {
	return (
		<div
			role="alert"
			class={cn(
				"relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
				props.variant === "destructive" &&
					"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
				props.class
			)}
			{...props}
		>
			{props.children}
		</div>
	);
};
