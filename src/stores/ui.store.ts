import { createSignal, createEffect } from 'solid-js';

interface UIState {
	theme: 'light' | 'dark';
	isMobileMenuOpen: boolean;
	sidebarCollapsed: boolean;
	toasts: Array<{
		id: string;
		type: 'success' | 'error' | 'info' | 'warning';
		message: string;
		duration?: number;
	}>;
}

const STORAGE_KEY = 'ui-state';

// Load initial state from storage
const loadInitialState = () => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			return {
				theme: parsed.theme || 'light',
				isMobileMenuOpen: false, // Always start with mobile menu closed
				sidebarCollapsed: parsed.sidebarCollapsed || false,
				toasts: [], // Always start with empty toasts
			};
		}
	} catch (error) {
		console.error('Failed to load UI state:', error);
	}
	return {
		theme: 'light',
		isMobileMenuOpen: false,
		sidebarCollapsed: false,
		toasts: [],
	};
};

const initialState = loadInitialState();

// Create signals for each piece of state
const [theme, setTheme] = createSignal<UIState['theme']>(initialState.theme);
const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(initialState.isMobileMenuOpen);
const [sidebarCollapsed, setSidebarCollapsed] = createSignal(initialState.sidebarCollapsed);
const [toasts, setToasts] = createSignal<UIState['toasts']>(initialState.toasts);

// Actions
export const toggleTheme = () => {
	setTheme(prev => prev === 'light' ? 'dark' : 'light');
};

export const toggleMobileMenu = () => {
	setIsMobileMenuOpen(prev => !prev);
};

export const toggleSidebar = () => {
	setSidebarCollapsed(prev => !prev);
};

export const addToast = (
	message: string,
	type: UIState['toasts'][number]['type'] = 'info',
	duration = 5000
) => {
	const id = Math.random().toString(36).substr(2, 9);
	
	setToasts(prev => [...prev, { id, type, message, duration }]);

	if (duration > 0) {
		setTimeout(() => removeToast(id), duration);
	}

	return id;
};

export const removeToast = (id: string) => {
	setToasts(prev => prev.filter(toast => toast.id !== id));
};

// Hook to handle persistence
export const usePersistentUI = () => {
	createEffect(() => {
		const state = {
			theme: theme(),
			isMobileMenuOpen: isMobileMenuOpen(),
			sidebarCollapsed: sidebarCollapsed(),
			toasts: toasts(),
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	});
};

// Export store state and hooks
export const useUI = () => {
	return {
		theme,
		isMobileMenuOpen,
		sidebarCollapsed,
		toasts,
		toggleTheme,
		toggleMobileMenu,
		toggleSidebar,
		addToast,
		removeToast,
	};
}; 