import { createSignal, createEffect, onMount } from "solid-js";

type Theme = "light" | "dark";

// Get system preference
const getSystemPreference = (): Theme => {
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

// Get theme from local storage or system preference
const getInitialTheme = (): Theme => {
	const savedTheme = localStorage.getItem("theme") as Theme;
	return savedTheme || getSystemPreference();
};

// Create theme signal with initial value
const [theme, setTheme] = createSignal<Theme>(getInitialTheme());

// Apply theme to document
const applyTheme = (newTheme: Theme) => {
	// Remove both classes first to ensure clean state
	document.documentElement.classList.remove("light", "dark");
	// Add the new theme class
	document.documentElement.classList.add(newTheme);
	// Store in localStorage
	localStorage.setItem("theme", newTheme);
};

// Watch for system theme changes
const watchSystemTheme = () => {
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const handleChange = (e: MediaQueryListEvent) => {
		// Only update if there's no user preference stored
		if (!localStorage.getItem("theme")) {
			const newTheme = e.matches ? "dark" : "light";
			setTheme(newTheme);
			applyTheme(newTheme);
		}
	};
	
	mediaQuery.addEventListener("change", handleChange);
	return () => mediaQuery.removeEventListener("change", handleChange);
};

// Initialize theme
const initializeTheme = () => {
	// Add a class to prevent theme flash
	document.documentElement.classList.add("theme-initializing");
	
	// Apply initial theme
	applyTheme(theme());
	
	// Watch for system theme changes
	const cleanup = watchSystemTheme();
	
	// Remove initialization class after a short delay
	setTimeout(() => {
		document.documentElement.classList.remove("theme-initializing");
	}, 0);
	
	return cleanup;
};

export const useTheme = () => {
	const isDark = () => theme() === "dark";
	
	const toggleTheme = () => {
		const newTheme = isDark() ? "light" : "dark";
		setTheme(newTheme);
		applyTheme(newTheme);
	};
	
	const setThemePreference = (newTheme: Theme) => {
		setTheme(newTheme);
		applyTheme(newTheme);
	};

	// Initialize theme when the store is first used
	let cleanup: (() => void) | undefined;
	onMount(() => {
		cleanup = initializeTheme();
		return cleanup;
	});

	return {
		theme,
		isDark,
		toggleTheme,
		setThemePreference
	};
}; 