/* @refresh reload */
import { render } from "solid-js/web";

import "./styles/theme.css";
import "./index.css";
import { App } from "./App";

// Initialize theme class early to prevent flash
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("ui-state");
let initialTheme = "light";

try {
	if (savedTheme) {
		const parsed = JSON.parse(savedTheme);
		initialTheme = parsed.theme || (prefersDark ? "dark" : "light");
	} else {
		initialTheme = prefersDark ? "dark" : "light";
	}
} catch (error) {
	console.error("Failed to parse saved theme:", error);
	initialTheme = prefersDark ? "dark" : "light";
}

document.documentElement.classList.add("theme-initializing", initialTheme);

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
	);
}

render(() => <App />, root!);
