import { Component, JSX, Show, splitProps } from "solid-js";
import { clsx } from "../../lib/utils";

interface SwitchProps
	extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> {
	label?: string;
	helperText?: string;
	error?: string;
}

export const Switch: Component<SwitchProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"label",
		"helperText",
		"error",
		"class",
	]);

	return (
		<div class="space-y-2">
			<label class="flex items-center gap-2">
				<button
					type="button"
					role="switch"
					aria-checked={rest.checked ? "true" : "false"}
					class={clsx(
						"peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						"disabled:cursor-not-allowed disabled:opacity-50",
						rest.checked ? "bg-primary" : "bg-input",
						local.error && "border-destructive",
						local.class
					)}
					{...rest}
				>
					<span
						class={clsx(
							"pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
							rest.checked ? "translate-x-5" : "translate-x-0"
						)}
					/>
				</button>
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
