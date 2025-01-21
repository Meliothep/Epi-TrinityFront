import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { Button } from "../components/ui/Button";

const NotFound: Component = () => {
	return (
		<div class="container mx-auto px-4 py-16">
			<div class="max-w-md mx-auto text-center space-y-8">
				<div class="space-y-4">
					<h1 class="text-4xl font-bold">404</h1>
					<h2 class="text-2xl font-semibold">Page Not Found</h2>
					<p class="text-muted-foreground">
						The page you're looking for doesn't exist or has been moved.
					</p>
				</div>

				<A href="/">
					<Button variant="default" class="w-full">
						Return Home
					</Button>
				</A>
			</div>
		</div>
	);
};

export default NotFound;
