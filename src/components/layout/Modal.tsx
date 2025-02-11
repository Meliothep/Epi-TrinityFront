import {
	Component,
	JSX,
	Show,
	createSignal,
	onCleanup,
	onMount,
	splitProps,
} from "solid-js";
import { Portal } from "solid-js/web";
import { cn } from "../../lib/utils";
import { IoClose } from "solid-icons/io";

interface ModalProps extends JSX.HTMLAttributes<HTMLDivElement> {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	description?: string;
	size?: "sm" | "md" | "lg" | "xl" | "full";
}

export const Modal: Component<ModalProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"isOpen",
		"onClose",
		"title",
		"description",
		"size",
		"class",
		"children",
	]);

	const [isClosing, setIsClosing] = createSignal(false);

	const sizes = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		full: "max-w-[calc(100%-2rem)]",
	};

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsClosing(false);
			local.onClose();
		}, 300); // Increased duration to match our animations
	};

	const handleEscape = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			handleClose();
		}
	};

	onMount(() => {
		document.addEventListener("keydown", handleEscape);
	});

	onCleanup(() => {
		document.removeEventListener("keydown", handleEscape);
	});

	return (
		<Show when={local.isOpen}>
			<Portal>
				{/* Backdrop */}
				<div
					class={cn(
						"fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
						isClosing()
							? "motion-opacity-out-0 motion-duration-200"
							: "motion-opacity-in-0 motion-duration-300"
					)}
					onClick={handleClose}
					aria-hidden="true"
				/>
				{/* Modal */}
				<div
					class={cn(
						"fixed inset-0 z-50 flex items-center justify-center",
						isClosing()
							? "motion-opacity-out-0 motion-duration-200"
							: "motion-opacity-in-0 motion-duration-300"
					)}
					role="dialog"
					aria-modal="true"
					aria-labelledby={local.title ? "modal-title" : undefined}
					aria-describedby={local.description ? "modal-description" : undefined}
				>
					<div
						class={cn(
							"relative w-full rounded-lg border bg-background p-6 shadow-lg",
							isClosing()
								? "motion-scale-out-95 motion-duration-200"
								: "motion-scale-in-95 motion-duration-300 motion-ease-spring-smooth",
							sizes[local.size || "md"],
							local.class
						)}
						{...rest}
					>
						{/* Close button */}
						<button
							type="button"
							onClick={handleClose}
							class={cn(
								"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background",
								"motion-preset-pulse-sm motion-ease-spring-smooth",
								"hover:opacity-100",
								"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
							)}
						>
							<IoClose class="h-4 w-4" />
							<span class="sr-only">Close</span>
						</button>
						{/* Content */}
						<div
							class={cn(
								"space-y-4",
								"motion-opacity-in-0 motion-duration-500 motion-delay-100"
							)}
						>
							<Show when={local.title}>
								<h2
									id="modal-title"
									class={cn(
										"text-lg font-semibold leading-none",
										"motion-translate-y-in-25 motion-duration-300 motion-delay-200"
									)}
								>
									{local.title}
								</h2>
							</Show>
							<Show when={local.description}>
								<p
									id="modal-description"
									class={cn(
										"text-sm text-muted-foreground",
										"motion-translate-y-in-25 motion-duration-300 motion-delay-300"
									)}
								>
									{local.description}
								</p>
							</Show>
							<div
								class={cn(
									"motion-translate-y-in-25 motion-duration-300 motion-delay-400"
								)}
							>
								{local.children}
							</div>
						</div>
					</div>
				</div>
			</Portal>
		</Show>
	);
};
