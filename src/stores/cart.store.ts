import { createStore } from './core/createStore';
import { createRoot, createEffect } from 'solid-js';
import { useProducts } from './products.store';

export interface CartItem {
	id: string;
	quantity: number;
}

interface CartState {
	items: CartItem[];
	loading: boolean;
	error: string | null;
}

const STORAGE_KEY = "trinity_cart";

// Load initial cart from localStorage
const loadCart = (): CartItem[] => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch (error) {
		console.error('Failed to load cart:', error);
		return [];
	}
};

// Create middleware for validation
const validateCartMiddleware = (state: CartState, nextState: CartState): CartState => {
	// Ensure quantities are positive
	const validItems = nextState.items.map(item => ({
		...item,
		quantity: Math.max(1, item.quantity)
	}));

	return {
		...nextState,
		items: validItems
	};
};

// Create store instance with proper root
let _store: ReturnType<typeof createStore<CartState>> | undefined;

const initStore = () => {
	if (!_store) {
		createRoot(() => {
			_store = createStore({
				initialState: {
					items: loadCart(),
					loading: false,
					error: null
				} as CartState,
				storageKey: STORAGE_KEY,
				middleware: [validateCartMiddleware],
				onStateChange: (state) => {
					try {
						localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
						console.debug('Cart updated:', state.items.length, 'items');
					} catch (error) {
						console.error('Failed to save cart:', error);
					}
				}
			});

			// Set up product sync
			const { products } = useProducts();
			createEffect(() => {
				const currentProducts = products();
				if (currentProducts) {
					const items = _store!.state().items;
					// Filter out items that don't exist in products
					const validItems = items.filter(item => 
						currentProducts.some(p => p.id === item.id)
					);
					if (validItems.length !== items.length) {
						_store!.setState(prev => ({
							...prev,
							items: validItems
						}));
					}
				}
			});
		});
	}
	return _store!;
};

// Create a hook for components to use
export const useCart = () => {
	const store = initStore();
	const state = store.state;
	
	// Computed values
	const itemCount = () => {
		const items = state().items;
		return items ? items.reduce((total, item) => total + item.quantity, 0) : 0;
	};

	const totalItems = () => state().items?.length || 0;

	// Actions
	const addToCart = (productId: string) => {
		const currentItems = state().items || [];
		const existingItem = currentItems.find((item) => item.id === productId);

		store.setState(prev => ({
			...prev,
			items: existingItem
				? currentItems.map((item) =>
						item.id === productId
							? { ...item, quantity: item.quantity + 1 }
							: item
				  )
				: [...currentItems, { id: productId, quantity: 1 }]
		}));
	};

	const removeFromCart = (productId: string) => {
		store.setState(prev => ({
			...prev,
			items: (prev.items || []).filter((item) => item.id !== productId)
		}));
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}

		store.setState(prev => ({
			...prev,
			items: (prev.items || []).map((item) =>
				item.id === productId ? { ...item, quantity } : item
			)
		}));
	};

	const clearCart = () => {
		store.setState(prev => ({
			...prev,
			items: []
		}));
	};

	return {
		// State
		items: () => state().items || [],
		loading: () => state().loading,
		error: () => state().error,
		
		// Computed
		itemCount,
		totalItems,
		
		// Actions
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart
	};
};

// Export a singleton instance for backward compatibility
export const cartStore = {
	items: () => useCart().items(),
	getItemCount: () => useCart().itemCount(),
	addToCart: (productId: string) => useCart().addToCart(productId),
	removeFromCart: (productId: string) => useCart().removeFromCart(productId),
	updateQuantity: (productId: string, quantity: number) => useCart().updateQuantity(productId, quantity),
	clearCart: () => useCart().clearCart()
}; 