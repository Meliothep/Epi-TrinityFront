import { Component, JSX, splitProps } from "solid-js";
import { cn } from "../../lib/utils";
import { FiCheck } from "solid-icons/fi";

interface CheckboxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}

export const Checkbox: Component<CheckboxProps> = (props) => {
	const [local, others] = splitProps(props, ["class", "checked", "onChange"]);

	return (
		<div class="relative">
			<input
				type="checkbox"
				class={cn(
					"peer h-4 w-4 shrink-0 rounded-sm border border-primary",
					"ring-offset-background focus-visible:outline-none",
					"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					"disabled:cursor-not-allowed disabled:opacity-50",
					"data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
					"motion-safe:motion-duration-200 motion-safe:motion-ease-spring-2",
					"hover:motion-safe:motion-scale-105",
					"active:motion-safe:motion-scale-95",
					local.class
				)}
				checked={local.checked}
				onChange={(e) => local.onChange?.(e.currentTarget.checked)}
				{...others}
			/>
			<FiCheck
				class={cn(
					"absolute left-0 top-0 h-4 w-4 stroke-[3] text-primary-foreground pointer-events-none",
					"motion-safe:motion-duration-200 motion-safe:motion-ease-spring-2",
					local.checked
						? "motion-scale-in-100 motion-opacity-in-0"
						: "motion-scale-out-95 motion-opacity-out-0"
				)}
			/>
		</div>
	);
};
