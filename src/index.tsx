/* @refresh reload */
import { render } from "solid-js/web";

import "./styles/theme.css";
import "./index.css";
import { App } from "./App";

// Initialize theme class early to prevent flash
const savedTheme =
	localStorage.getItem("theme") ||
	(window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light");
document.documentElement.classList.add("theme-initializing", savedTheme);

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
	);
}

render(() => <App />, root!);
