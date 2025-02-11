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

interface TooltipProps extends JSX.HTMLAttributes<HTMLDivElement> {
	content: JSX.Element;
	position?: "top" | "right" | "bottom" | "left";
	delay?: number;
	children: JSX.Element;
}

export const Tooltip: Component<TooltipProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"content",
		"position",
		"delay",
		"children",
		"class",
	]);

	const [isVisible, setIsVisible] = createSignal(false);
	const [isClosing, setIsClosing] = createSignal(false);
	const [coords, setCoords] = createSignal({ x: 0, y: 0 });
	let triggerRef: HTMLDivElement | undefined;
	let timeoutId: number;

	const positions = {
		top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
		right: "left-full top-1/2 -translate-y-1/2 ml-2",
		bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
		left: "right-full top-1/2 -translate-y-1/2 mr-2",
	};

	const arrows = {
		top: "bottom-[-6px] left-1/2 -translate-x-1/2 border-t-foreground border-x-transparent border-b-transparent",
		right:
			"left-[-6px] top-1/2 -translate-y-1/2 border-r-foreground border-y-transparent border-l-transparent",
		bottom:
			"top-[-6px] left-1/2 -translate-x-1/2 border-b-foreground border-x-transparent border-t-transparent",
		left: "right-[-6px] top-1/2 -translate-y-1/2 border-l-foreground border-y-transparent border-r-transparent",
	};

	const handleMouseEnter = () => {
		setIsClosing(false);
		if (triggerRef) {
			const rect = triggerRef.getBoundingClientRect();
			setCoords({ x: rect.left, y: rect.top });
		}
		timeoutId = window.setTimeout(() => setIsVisible(true), local.delay || 200);
	};

	const handleMouseLeave = () => {
		clearTimeout(timeoutId);
		setIsClosing(true);
		setTimeout(() => {
			setIsVisible(false);
			setIsClosing(false);
		}, 200);
	};

	onMount(() => {
		if (triggerRef) {
			const rect = triggerRef.getBoundingClientRect();
			setCoords({ x: rect.left, y: rect.top });
		}
	});

	onCleanup(() => {
		clearTimeout(timeoutId);
	});

	const getAnimationClasses = () => {
		const position = local.position || "top";
		const baseClasses = "motion-duration-200 motion-ease-spring-smooth";

		if (isClosing()) {
			return {
				top: `motion-translate-y-out-25 motion-opacity-out-0 ${baseClasses}`,
				right: `motion-translate-x-out-25 motion-opacity-out-0 ${baseClasses}`,
				bottom: `motion-translate-y-out-25 motion-opacity-out-0 ${baseClasses}`,
				left: `motion-translate-x-out-25 motion-opacity-out-0 ${baseClasses}`,
			}[position];
		}

		return {
			top: `motion-translate-y-in-25 motion-opacity-in-0 ${baseClasses}`,
			right: `motion-translate-x-in-25 motion-opacity-in-0 ${baseClasses}`,
			bottom: `motion-translate-y-in-25 motion-opacity-in-0 ${baseClasses}`,
			left: `motion-translate-x-in-25 motion-opacity-in-0 ${baseClasses}`,
		}[position];
	};

	return (
		<>
			<div
				ref={triggerRef}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onFocus={handleMouseEnter}
				onBlur={handleMouseLeave}
				class={cn("relative inline-block", local.class)}
			>
				{local.children}
			</div>

			<Show when={isVisible()}>
				<Portal>
					<div
						{...rest}
						role="tooltip"
						style={{
							position: "fixed",
							left: `${coords().x}px`,
							top: `${coords().y}px`,
						}}
						class={cn(
							"absolute z-50 rounded-md bg-foreground px-3 py-1.5 text-sm text-background shadow-md",
							positions[local.position || "top"],
							getAnimationClasses(),
							local.class
						)}
					>
						{local.content}
						<span
							class={cn(
								"absolute border-[6px]",
								arrows[local.position || "top"],
								"motion-scale-in-95 motion-duration-200 motion-delay-100"
							)}
							aria-hidden="true"
						/>
					</div>
				</Portal>
			</Show>
		</>
	);
};
