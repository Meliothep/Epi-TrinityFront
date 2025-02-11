import { Component, For, JSX, Show } from "solid-js";
import { Button } from "./Button";
import { cn } from "../../lib/utils";

interface SelectOption {
	label: string;
	value: string;
}

interface SelectProps {
	value: string;
	onChange: (value: string) => void;
	options: SelectOption[];
	placeholder?: string;
	class?: string;
	disabled?: boolean;
	label?: string;
}

export const Select: Component<SelectProps> = (props) => {
	return (
		<select
			class={cn(
				"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
				"motion-safe:motion-duration-200 motion-safe:motion-ease-spring-2",
				"hover:motion-safe:motion-scale-101 hover:motion-safe:motion-translate-y-neg-1",
				"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:motion-safe:motion-scale-101",
				props.class
			)}
			value={props.value}
			onChange={(e) => props.onChange(e.currentTarget.value)}
			disabled={props.disabled}
			aria-label={props.label || props.placeholder || "Select an option"}
		>
			<option value="" class="text-muted-foreground">
				{props.placeholder || "Select an option..."}
			</option>
			<For each={props.options}>
				{(option) => (
					<option
						value={option.value}
						class="motion-safe:motion-duration-200 motion-safe:motion-ease-spring-2 hover:motion-safe:motion-scale-101"
					>
						{option.label}
					</option>
				)}
			</For>
		</select>
	);
};
