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
		// TODO: Implement fetch products
	};

	const searchProducts = async (query: string) => {
		// TODO: Implement search products
	};

	return {
		products,
		loading,
		error,
		fetchProducts,
		searchProducts
	};
}; 