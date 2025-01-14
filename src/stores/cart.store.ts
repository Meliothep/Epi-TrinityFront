import { createSignal } from "solid-js";

export interface CartItem {
	id: string;
	quantity: number;
}

const [cartItems, setCartItems] = createSignal<CartItem[]>([]);

export const useCart = () => {
	const addToCart = (itemId: string) => {
		// TODO: Implement add to cart
	};

	const removeFromCart = (itemId: string) => {
		// TODO: Implement remove from cart
	};

	const updateQuantity = (itemId: string, quantity: number) => {
		// TODO: Implement update quantity
	};

	return {
		cartItems,
		addToCart,
		removeFromCart,
		updateQuantity
	};
}; 