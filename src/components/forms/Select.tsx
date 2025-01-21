import { Component, JSX, Show, createSignal, splitProps } from "solid-js";
import { clsx } from "../../lib/utils";

interface SelectOption {
	label: string;
	value: string;
	disabled?: boolean;
}

interface SelectProps
	extends Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, "value"> {
	label?: string;
	helperText?: string;
	error?: string;
	options: SelectOption[];
	value?: string;
	placeholder?: string;
}

export const Select: Component<SelectProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"label",
		"helperText",
		"error",
		"options",
		"value",
		"placeholder",
		"class",
		"onChange",
	]);

	const [isFocused, setIsFocused] = createSignal(false);

	return (
		<div class="space-y-2">
			<Show when={local.label}>
				<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					{local.label}
				</label>
			</Show>

			<div class="relative">
				<select
					{...rest}
					value={local.value}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					class={clsx(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						"disabled:cursor-not-allowed disabled:opacity-50",
						local.error && "border-destructive",
						local.class
					)}
				>
					<Show when={local.placeholder}>
						<option value="" disabled selected={!local.value}>
							{local.placeholder}
						</option>
					</Show>
					{local.options.map((option) => (
						<option value={option.value} disabled={option.disabled}>
							{option.label}
						</option>
					))}
				</select>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class={clsx(
						"absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform",
						isFocused() && "rotate-180"
					)}
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 8.25l-7.5 7.5-7.5-7.5"
					/>
				</svg>
			</div>

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
