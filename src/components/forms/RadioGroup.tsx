import { Component, For, JSX, Show, createSignal, splitProps } from "solid-js";
import { clsx } from "../../lib/utils";

interface RadioOption {
	value: string;
	label: string;
	description?: string;
	disabled?: boolean;
}

interface RadioGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
	name: string;
	options: RadioOption[];
	defaultValue?: string;
	label?: string;
	helperText?: string;
	error?: string;
	onChange?: (value: string) => void;
}

export const RadioGroup: Component<RadioGroupProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"name",
		"options",
		"defaultValue",
		"label",
		"helperText",
		"error",
		"onChange",
		"class",
	]);

	const [value, setValue] = createSignal(local.defaultValue || "");

	const handleChange = (newValue: string) => {
		setValue(newValue);
		local.onChange?.(newValue);
	};

	return (
		<div {...rest} class={clsx("space-y-2", local.class)}>
			<Show when={local.label}>
				<label
					id={`${local.name}-label`}
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{local.label}
				</label>
			</Show>

			<div
				role="radiogroup"
				aria-labelledby={local.label ? `${local.name}-label` : undefined}
				aria-describedby={
					local.error
						? `${local.name}-error`
						: local.helperText
						? `${local.name}-description`
						: undefined
				}
				class="space-y-2"
			>
				<For each={local.options}>
					{(option) => (
						<label class="flex items-start space-x-3 space-y-0">
							<input
								type="radio"
								name={local.name}
								value={option.value}
								checked={value() === option.value}
								disabled={option.disabled}
								onChange={() => handleChange(option.value)}
								class={clsx(
									"mt-1 h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
									"disabled:cursor-not-allowed disabled:opacity-50",
									local.error && "border-destructive"
								)}
							/>
							<div class="space-y-1">
								<div class="text-sm font-medium leading-none">
									{option.label}
								</div>
								<Show when={option.description}>
									<div class="text-sm text-muted-foreground">
										{option.description}
									</div>
								</Show>
							</div>
						</label>
					)}
				</For>
			</div>

			<Show when={local.error || local.helperText}>
				<p
					id={local.error ? `${local.name}-error` : `${local.name}-description`}
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
