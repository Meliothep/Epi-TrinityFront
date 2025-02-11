import { Component, ParentComponent, createEffect } from "solid-js";
import { Router } from "@solidjs/router";
import { Header } from "./components/layout/Header";
import { AdminLayout } from "./components/layout/AdminLayout";
import { AppRoutes } from "./routes";
import { useUI, usePersistentUI } from "./stores/ui.store";

// Root layout component
const RootLayout: ParentComponent = (props) => {
	const { theme } = useUI();

	// Initialize UI persistence
	usePersistentUI();

	// Handle theme changes
	createEffect(() => {
		const currentTheme = theme();
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(currentTheme);
	});

	return (
		<div class="min-h-screen bg-background text-foreground">
			<Header sticky />
			<main>{props.children}</main>
		</div>
	);
};

export const App: Component = () => {
	return (
		<Router root={RootLayout}>
			<AppRoutes />
		</Router>
	);
};
