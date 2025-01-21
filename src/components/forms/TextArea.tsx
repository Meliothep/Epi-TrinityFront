import { Component, JSX, Show, splitProps } from "solid-js";
import { clsx } from "../../lib/utils";

interface TextAreaProps
	extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	helperText?: string;
	error?: string;
}

export const TextArea: Component<TextAreaProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"label",
		"helperText",
		"error",
		"class",
	]);

	return (
		<div class="space-y-2">
			<Show when={local.label}>
				<label
					for={rest.id}
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{local.label}
				</label>
			</Show>

			<textarea
				{...rest}
				aria-invalid={local.error ? "true" : "false"}
				aria-describedby={
					local.error
						? `${rest.id}-error`
						: local.helperText
						? `${rest.id}-description`
						: undefined
				}
				class={clsx(
					"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					"disabled:cursor-not-allowed disabled:opacity-50",
					local.error && "border-destructive",
					local.class
				)}
			/>

			<Show when={local.error || local.helperText}>
				<p
					id={local.error ? `${rest.id}-error` : `${rest.id}-description`}
					class={clsx(
						"text-sm",
						local.error ? "text-destructive" : "text-muted-foreground"
					)}
				>
					{local.error || local.helperText}
				</p>
			</Show>
		</div>
	);
};
