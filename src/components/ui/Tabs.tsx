import { Component, For, JSX, Show, createSignal, splitProps } from "solid-js";
import { cn } from "../../lib/utils";

interface Tab {
	id: string;
	label: string;
	content: JSX.Element;
	disabled?: boolean;
}

interface TabsProps extends JSX.HTMLAttributes<HTMLDivElement> {
	tabs: Tab[];
	defaultTab?: string;
	variant?: "default" | "underline";
	size?: "sm" | "md" | "lg";
}

export const Tabs: Component<TabsProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"tabs",
		"defaultTab",
		"variant",
		"size",
		"class",
	]);

	const [activeTab, setActiveTab] = createSignal(
		local.defaultTab || local.tabs[0]?.id
	);

	const variants = {
		default:
			"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1",
		underline:
			"inline-flex h-10 items-center justify-center border-b border-muted",
	};

	const tabStyles = {
		default: {
			base: "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
			active: "bg-background text-foreground shadow-sm",
			inactive: "text-muted-foreground hover:bg-muted-foreground/20",
		},
		underline: {
			base: "inline-flex items-center justify-center px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
			active: "border-b-2 border-primary text-foreground",
			inactive: "text-muted-foreground hover:text-foreground",
		},
	};

	const sizes = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
	};

	const handleKeyDown = (e: KeyboardEvent, tabId: string) => {
		const tabIds = local.tabs.map((tab) => tab.id);
		const currentIndex = tabIds.indexOf(tabId);

		switch (e.key) {
			case "ArrowRight":
				e.preventDefault();
				setActiveTab(tabIds[(currentIndex + 1) % tabIds.length]);
				break;
			case "ArrowLeft":
				e.preventDefault();
				setActiveTab(
					tabIds[(currentIndex - 1 + tabIds.length) % tabIds.length]
				);
				break;
			case "Home":
				e.preventDefault();
				setActiveTab(tabIds[0]);
				break;
			case "End":
				e.preventDefault();
				setActiveTab(tabIds[tabIds.length - 1]);
				break;
		}
	};

	return (
		<div {...rest} class={cn("w-full", local.class)}>
			{/* Tab List */}
			<div
				role="tablist"
				class={cn(
					variants[local.variant || "default"],
					sizes[local.size || "md"]
				)}
			>
				<For each={local.tabs}>
					{(tab) => (
						<button
							type="button"
							role="tab"
							id={`tab-${tab.id}`}
							aria-controls={`panel-${tab.id}`}
							aria-selected={activeTab() === tab.id ? "true" : "false"}
							disabled={tab.disabled}
							onClick={() => setActiveTab(tab.id)}
							onKeyDown={(e) => handleKeyDown(e, tab.id)}
							class={cn(
								tabStyles[local.variant || "default"].base,
								activeTab() === tab.id
									? tabStyles[local.variant || "default"].active
									: tabStyles[local.variant || "default"].inactive
							)}
						>
							{tab.label}
						</button>
					)}
				</For>
			</div>

			{/* Tab Panels */}
			<div class="mt-4">
				<For each={local.tabs}>
					{(tab) => (
						<div
							role="tabpanel"
							id={`panel-${tab.id}`}
							aria-labelledby={`tab-${tab.id}`}
							aria-hidden={activeTab() !== tab.id ? "true" : "false"}
							class={cn(activeTab() === tab.id && "animate-fade-in")}
						>
							{tab.content}
						</div>
					)}
				</For>
			</div>
		</div>
	);
};
