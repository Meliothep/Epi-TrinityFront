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
import { clsx } from "../../lib/utils";

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
		}, 150);
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
				<div
					class={clsx(
						"fixed inset-0 z-50 flex items-center justify-center p-4",
						isClosing() ? "animate-fade-out" : "animate-fade-in"
					)}
				>
					{/* Backdrop */}
					<div
						class={clsx(
							"fixed inset-0 bg-background/80 backdrop-blur-sm",
							isClosing() ? "animate-fade-out" : "animate-fade-in"
						)}
						onClick={handleClose}
						aria-hidden="true"
					/>

					{/* Modal */}
					<div
						role="dialog"
						aria-modal="true"
						aria-labelledby={local.title ? "modal-title" : undefined}
						aria-describedby={
							local.description ? "modal-description" : undefined
						}
						{...rest}
						class={clsx(
							"relative w-full rounded-lg bg-background p-6 shadow-lg",
							"animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10",
							sizes[local.size || "md"],
							local.class
						)}
					>
						{/* Close button */}
						<button
							type="button"
							onClick={handleClose}
							class={clsx(
								"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background",
								"transition-opacity hover:opacity-100",
								"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
							)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M18 6L6 18" />
								<path d="M6 6L18 18" />
							</svg>
							<span class="sr-only">Close</span>
						</button>

						{/* Content */}
						<div class="space-y-4">
							<Show when={local.title}>
								<h2 id="modal-title" class="text-lg font-semibold leading-none">
									{local.title}
								</h2>
							</Show>
							<Show when={local.description}>
								<p id="modal-description" class="text-sm text-muted-foreground">
									{local.description}
								</p>
							</Show>
							{local.children}
						</div>
					</div>
				</div>
			</Portal>
		</Show>
	);
};
