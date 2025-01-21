import { Component, JSX, Show, splitProps } from "solid-js";
import { clsx } from "../../lib/utils";

interface CheckboxProps
	extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> {
	label?: string;
	helperText?: string;
	error?: string;
}

export const Checkbox: Component<CheckboxProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"label",
		"helperText",
		"error",
		"class",
	]);

	return (
		<div class="space-y-2">
			<label class="flex items-center gap-2">
				<input
					{...rest}
					type="checkbox"
					class={clsx(
						"h-4 w-4 rounded border border-input bg-background text-primary",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						"disabled:cursor-not-allowed disabled:opacity-50",
						local.error && "border-destructive",
						local.class
					)}
				/>
				<Show when={local.label}>
					<span class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						{local.label}
					</span>
				</Show>
			</label>

			<Show when={local.error || local.helperText}>
				<p
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
