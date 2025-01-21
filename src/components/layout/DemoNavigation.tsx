import { Component } from "solid-js";
import { A } from "@solidjs/router";

export const DemoNavigation: Component = () => {
	return (
		<nav class="bg-background border-b sticky top-0 z-50">
			<div class="container mx-auto px-4">
				<div class="flex items-center justify-center h-14 space-x-8">
					<A
						href="/"
						class="text-sm font-medium transition-colors hover:text-primary"
						activeClass="text-primary"
						end
					>
						Feature Showcase
					</A>
					<A
						href="/components"
						class="text-sm font-medium transition-colors hover:text-primary"
						activeClass="text-primary"
					>
						Component Library
					</A>
				</div>
			</div>
		</nav>
	);
};
