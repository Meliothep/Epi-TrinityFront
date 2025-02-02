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
				{/* Backdrop */}
				<div
					class={cn(
						"fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
						isClosing() ? "animate-fade-out" : "animate-fade-in"
					)}
					onClick={handleClose}
					aria-hidden="true"
				/>
				{/* Modal */}
				<div
					class={cn(
						"fixed inset-0 z-50 flex items-center justify-center",
						isClosing() ? "animate-fade-out" : "animate-fade-in"
					)}
					role="dialog"
					aria-modal="true"
					aria-labelledby={local.title ? "modal-title" : undefined}
					aria-describedby={local.description ? "modal-description" : undefined}
				>
					<div
						class={cn(
							"relative w-full rounded-lg border bg-background p-6 shadow-lg",
							"animate-in fade-in-0 zoom-in-95",
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
								"transition-opacity hover:opacity-100",
								"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
							)}
						>
							<IoClose class="h-4 w-4" />
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
