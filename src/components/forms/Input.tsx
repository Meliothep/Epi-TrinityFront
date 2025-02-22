import { Component, JSX } from "solid-js";
import { clsx } from "../../lib/utils";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	helperText?: string;
}

export const Input: Component<InputProps> = (props) => {
	const { label, error, helperText, class: className, ...inputProps } = props;

	return (
		<div class="space-y-2">
			{label && (
				<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					{label}
				</label>
			)}
			<input
				{...inputProps}
				class={clsx(
					"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
					"file:border-0 file:bg-transparent file:text-sm file:font-medium",
					"placeholder:text-muted-foreground",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					"disabled:cursor-not-allowed disabled:opacity-50",
					error && "border-destructive",
					className
				)}
			/>
			{(error || helperText) && (
				<p
					class={clsx(
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
