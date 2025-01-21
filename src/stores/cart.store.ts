import { createSignal } from "solid-js";

export interface CartItem {
	id: string;
	quantity: number;
}

const [cartItems, setCartItems] = createSignal<CartItem[]>([]);

export const useCart = () => {
	const addToCart = (itemId: string) => {
		const existingItem = cartItems().find((item) => item.id === itemId);
		if (existingItem) {
			updateQuantity(itemId, existingItem.quantity + 1);
		} else {
			setCartItems([...cartItems(), { id: itemId, quantity: 1 }]);
		}
	};

	const removeFromCart = (itemId: string) => {
		setCartItems(cartItems().filter((item) => item.id !== itemId));
	};

	const updateQuantity = (itemId: string, quantity: number) => {
		setCartItems(
			cartItems().map((item) =>
				item.id === itemId ? { ...item, quantity } : item
			)
		);
	};

	return {
		cartItems,
		setCartItems,
		addToCart,
		removeFromCart,
		updateQuantity,
	};
}; 