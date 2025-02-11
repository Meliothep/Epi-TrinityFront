import { createSignal } from "solid-js";

export interface CartItem {
	id: string;
	quantity: number;
}

const STORAGE_KEY = "trinity_cart";

// Load initial cart from localStorage
const loadCart = (): CartItem[] => {
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored ? JSON.parse(stored) : [];
};

class CartStore {
	private cartSignal = createSignal<CartItem[]>(loadCart());

	// Get cart items
	items = () => this.cartSignal[0]();

	// Get item count
	getItemCount = () => {
		return this.items().reduce((total, item) => total + item.quantity, 0);
	};

	// Add item to cart
	addToCart = (productId: string) => {
		const currentItems = this.items();
		const existingItem = currentItems.find((item) => item.id === productId);

		let newItems: CartItem[];
		if (existingItem) {
			newItems = currentItems.map((item) =>
				item.id === productId
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
		} else {
			newItems = [...currentItems, { id: productId, quantity: 1 }];
		}

		this.cartSignal[1](newItems);
		this.persistCart(newItems);
	};

	// Remove item from cart
	removeFromCart = (productId: string) => {
		const newItems = this.items().filter((item) => item.id !== productId);
		this.cartSignal[1](newItems);
		this.persistCart(newItems);
	};

	// Update item quantity
	updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			this.removeFromCart(productId);
			return;
		}

		const newItems = this.items().map((item) =>
			item.id === productId ? { ...item, quantity } : item
		);
		this.cartSignal[1](newItems);
		this.persistCart(newItems);
	};

	// Clear cart
	clearCart = () => {
		this.cartSignal[1]([]);
		this.persistCart([]);
	};

	// Private helper to persist cart to localStorage
	private persistCart = (items: CartItem[]) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	};
}

// Export a singleton instance
export const cartStore = new CartStore(); 