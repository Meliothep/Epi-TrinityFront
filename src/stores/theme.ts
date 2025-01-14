import { createSignal } from "solid-js";

const [isDark, setIsDark] = createSignal(
	window.matchMedia("(prefers-color-scheme: dark)").matches
);

export const useTheme = () => {
	const toggleTheme = () => {
		setIsDark(!isDark());
		document.documentElement.classList.toggle("dark", isDark());
	};

	// Initialize theme
	document.documentElement.classList.toggle("dark", isDark());

	return { isDark, toggleTheme };
}; 