import {
	Component,
	JSX,
	createSignal,
	createMemo,
	createEffect,
} from "solid-js";
import { cn } from "@/lib/utils";

interface ComponentProps extends BaseProps {
	/** Description of the title prop */
	title?: string;
	/** Description of the children prop */
	children?: JSX.Element;
	/** Description of the onAction prop */
	onAction?: () => void;
}

/**
 * Component description
 *
 * @example
 * ```tsx
 * <BaseComponent title="Example" onAction={() => console.log('clicked')}>
 *   Content
 * </BaseComponent>
 * ```
 */
export const BaseComponent: Component<ComponentProps> = (props) => {
	// 1. Signals (State)
	const [state, setState] = createSignal(initialState);

	// 2. Computed Values (Memos)
	const computed = createMemo(() => {
		// Derived state calculations
		return state();
	});

	// 3. Effects (Side Effects)
	createEffect(() => {
		// Side effects go here
		console.log("Component mounted or dependencies changed");
	});

	// 4. Event Handlers
	const handleAction = () => {
		setState((prev) => !prev);
		props.onAction?.();
	};

	// 5. Render
	return (
		<div
			class={cn(
				"base-component",
				// Add conditional classes here
				props.class
			)}
			style={props.style}
		>
			{props.title && <h2 class="text-lg font-semibold">{props.title}</h2>}
			<div class="content">{props.children}</div>
			<button onClick={handleAction}>Click me</button>
		</div>
	);
};
