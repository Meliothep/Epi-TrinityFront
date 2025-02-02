import { Component, JSX, Show } from "solid-js";
import { cn } from "../../lib/utils";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	helperText?: string;
	rightAddon?: JSX.Element;
}

export const Input: Component<InputProps> = (props) => {
	const {
		label,
		error,
		helperText,
		class: className,
		rightAddon,
		...inputProps
	} = props;

	return (
		<div class="space-y-2">
			{label && (
				<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					{label}
				</label>
			)}
			<div class="relative">
				<input
					{...inputProps}
					class={cn(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
						"file:border-0 file:bg-transparent file:text-sm file:font-medium",
						"placeholder:text-muted-foreground",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						"disabled:cursor-not-allowed disabled:opacity-50",
						rightAddon ? "pr-10" : "",
						error && "border-destructive focus-visible:ring-destructive",
						className
					)}
				/>
				<Show when={rightAddon}>
					<div class="absolute inset-y-0 right-0 flex items-center pr-3">
						{rightAddon}
					</div>
				</Show>
			</div>
			{(error || helperText) && (
				<p
					class={cn(
						"text-sm",
						error ? "text-destructive" : "text-muted-foreground"
					)}
				>
					{error || helperText}
				</p>
			)}
		</div>
	);
};
