import { Component, JSX, Show, createSignal } from "solid-js";
import { clsx } from "../../lib/utils";
import { IoCheckmark } from "solid-icons/io";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?:
		| "primary"
		| "secondary"
		| "outline"
		| "ghost"
		| "link"
		| "destructive";
	size?: "sm" | "md" | "lg";
	loading?: boolean;
}

export const Button: Component<ButtonProps> = (props) => {
	const [loading, setLoading] = createSignal(false);
	const [success, setSuccess] = createSignal(false);

	const handleClick = async (e: MouseEvent) => {
		if (props.onClick) {
			setLoading(true);
			await props.onClick(e);
			setLoading(false);
			setSuccess(true);
			setTimeout(() => setSuccess(false), 1500); // Reset after 1.5s
		}
	};

	const baseStyles =
		"inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

	const variants = {
		primary: "bg-primary text-primary-foreground hover:bg-primary/90",
		secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
		outline: "border border-input hover:bg-accent hover:text-accent-foreground",
		ghost: "hover:bg-accent hover:text-accent-foreground",
		link: "text-primary underline-offset-4 hover:underline",
		destructive:
			"bg-destructive text-destructive-foreground hover:bg-destructive/90",
	};

	const sizes = {
		sm: "h-9 px-3 text-sm",
		md: "h-10 px-4 py-2",
		lg: "h-11 px-8",
	};

	return (
		<button
			{...props}
			onClick={handleClick}
			disabled={props.disabled || loading()}
			class={clsx(
				baseStyles,
				variants[props.variant || "primary"],
				sizes[props.size || "md"],
				props.class
			)}
		>
			<Show
				when={!loading() && !success()}
				fallback={
					<Show
						when={loading()}
						fallback={
							<div class="flex items-center gap-2">
								<IoCheckmark class="w-4 h-4 animate-in fade-in zoom-in" />
								<span>Added!</span>
							</div>
						}
					>
						<div class="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
					</Show>
				}
			>
				{props.children}
			</Show>
		</button>
	);
};
