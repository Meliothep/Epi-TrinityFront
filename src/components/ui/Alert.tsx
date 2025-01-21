import { Component, JSX, Show, splitProps } from "solid-js";
import { clsx } from "../../lib/utils";

interface AlertProps extends JSX.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "destructive" | "warning" | "success";
	title?: string;
	description?: string;
	icon?: JSX.Element;
}

export const Alert: Component<AlertProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"variant",
		"title",
		"description",
		"icon",
		"class",
		"children",
	]);

	const variants = {
		default: "bg-background text-foreground",
		destructive:
			"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
		warning:
			"border-yellow-500/50 text-yellow-600 dark:text-yellow-400 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
		success:
			"border-green-500/50 text-green-600 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
	};

	return (
		<div
			role="alert"
			{...rest}
			class={clsx(
				"relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
				variants[local.variant || "default"],
				local.class
			)}
		>
			<Show when={local.icon}>{local.icon}</Show>
			<Show when={local.title}>
				<h5 class="mb-1 font-medium leading-none tracking-tight">
					{local.title}
				</h5>
			</Show>
			<Show when={local.description}>
				<div class="text-sm [&_p]:leading-relaxed">{local.description}</div>
			</Show>
			{local.children}
		</div>
	);
};
