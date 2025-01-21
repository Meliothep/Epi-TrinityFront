import { Component } from "solid-js";

const Home: Component = () => {
	return (
		<div class="container mx-auto px-4 py-8">
			<div class="max-w-3xl mx-auto text-center space-y-4">
				<h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
					Welcome to Trinity
				</h1>
				<p class="text-muted-foreground">
					Your one-stop shop for all your needs
				</p>
			</div>
		</div>
	);
};

export default Home;
