import { createStore } from "solid-js/store";
import { createRoot } from "solid-js";

export interface CartItem {
	id: string;
	quantity: number;
}

interface CartStore {
	items: CartItem[];
	isOpen: boolean;
}

const [store, setStore] = createStore<CartStore>({
	items: [],
	isOpen: false,
});

export const useCart = () => {
	const addToCart = (productId: string) => {
		const existingItem = store.items.find((item) => item.id === productId);
		if (existingItem) {
			updateQuantity(productId, existingItem.quantity + 1);
		} else {
			setStore("items", (items) => [...items, { id: productId, quantity: 1 }]);
		}
	};

	const removeFromCart = (productId: string) => {
		setStore("items", (items) => items.filter((item) => item.id !== productId));
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity < 1) {
			removeFromCart(productId);
			return;
		}
		setStore("items", (items) =>
			items.map((item) =>
				item.id === productId ? { ...item, quantity } : item
			)
		);
	};

	const clearCart = () => {
		setStore("items", []);
	};

	const toggleCart = () => {
		setStore("isOpen", (isOpen) => !isOpen);
	};

	const closeCart = () => {
		setStore("isOpen", false);
	};

	const openCart = () => {
		setStore("isOpen", true);
	};

	const getItemCount = () => {
		return store.items.reduce((total, item) => total + item.quantity, 0);
	};

	return {
		items: () => store.items,
		isOpen: () => store.isOpen,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		toggleCart,
		closeCart,
		openCart,
		getItemCount,
	};
};

// Create a root-level cart store
export const cartStore = createRoot(() => useCart()); 