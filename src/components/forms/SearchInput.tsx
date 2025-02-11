import { Component, JSX, Show, splitProps } from "solid-js";
import { cn } from "../../lib/utils";
import { Spinner } from "../ui/Spinner";
import { IoSearch } from "solid-icons/io";

interface SearchInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	helperText?: string;
	error?: string;
	isLoading?: boolean;
}

export const SearchInput: Component<SearchInputProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"label",
		"helperText",
		"error",
		"isLoading",
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

			<div class="relative">
				<IoSearch
					class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
					aria-hidden="true"
				/>

				<input
					{...rest}
					type="search"
					aria-invalid={local.error ? "true" : "false"}
					aria-describedby={
						local.error
							? `${rest.id}-error`
							: local.helperText
							? `${rest.id}-description`
							: undefined
					}
					class={cn(
						"flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background",
						"placeholder:text-muted-foreground",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						"disabled:cursor-not-allowed disabled:opacity-50",
						local.isLoading && "pr-10",
						local.error && "border-destructive focus-visible:ring-destructive",
						local.class
					)}
				/>

				<Show when={local.isLoading}>
					<div class="absolute right-3 top-1/2 -translate-y-1/2">
						<Spinner size="sm" />
					</div>
				</Show>
			</div>

			<Show when={local.error || local.helperText}>
				<p
					id={local.error ? `${rest.id}-error` : `${rest.id}-description`}
					class={cn(
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
