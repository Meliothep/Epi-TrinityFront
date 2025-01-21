import { Component } from "solid-js";
import { A } from "@solidjs/router";

export const DemoNavigation: Component = () => {
	return (
		<nav class="bg-background border-b border-border">
			<div class="container mx-auto px-4">
				<div class="flex h-14 items-center justify-between">
					<div class="flex items-center space-x-8">
						<A
							href="/"
							class="text-sm font-medium transition-colors hover:text-primary"
							activeClass="text-primary"
							end
						>
							Feature Examples
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
			</div>
		</nav>
	);
};
