import { createSignal } from "solid-js";

export interface Product {
	id: string;
	name: string;
	price: number;
	description: string;
}

const [products, setProducts] = createSignal<Product[]>([]);
const [loading, setLoading] = createSignal(false);
const [error, setError] = createSignal<string | null>(null);

export const useProducts = () => {
	const fetchProducts = async () => {
		try {
			setLoading(true);
			setError(null);
			// In a real app, this would be an API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// Products would be set from API response
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch products");
		} finally {
			setLoading(false);
		}
	};

	const searchProducts = async (query: string) => {
		try {
			setLoading(true);
			setError(null);
			// In a real app, this would be an API call
			await new Promise((resolve) => setTimeout(resolve, 500));
			// Filter products locally for demo
			return products().filter(
				(p) =>
					p.name.toLowerCase().includes(query.toLowerCase()) ||
					p.description.toLowerCase().includes(query.toLowerCase())
			);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to search products");
			return [];
		} finally {
			setLoading(false);
		}
	};

	return {
		products,
		setProducts, // Expose setter for demo purposes
		loading,
		error,
		fetchProducts,
		searchProducts,
	};
}; 