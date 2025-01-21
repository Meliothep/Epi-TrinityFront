import { createStore } from "solid-js/store";

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image?: string;
}

interface ProductStore {
	products: Product[];
	loading: boolean;
	error: string | null;
}

// Mock products data
const mockProducts: Product[] = [
	{
		id: "1",
		name: "Wireless Headphones",
		description: "High-quality wireless headphones with noise cancellation",
		price: 199.99,
		image: "https://placehold.co/400x400/3B82F6/FFFFFF?text=Headphones",
	},
	{
		id: "2",
		name: "Smartwatch",
		description: "Feature-rich smartwatch with health tracking",
		price: 299.99,
		image: "https://placehold.co/400x400/10B981/FFFFFF?text=Smartwatch",
	},
	{
		id: "3",
		name: "Laptop",
		description: "Powerful laptop for work and gaming",
		price: 1299.99,
		image: "https://placehold.co/400x400/6366F1/FFFFFF?text=Laptop",
	},
	{
		id: "4",
		name: "Wireless Mouse",
		description: "Ergonomic wireless mouse with long battery life",
		price: 49.99,
		image: "https://placehold.co/400x400/EC4899/FFFFFF?text=Mouse",
	},
	{
		id: "5",
		name: "4K Monitor",
		description: "Ultra-sharp 4K monitor for professionals",
		price: 499.99,
		image: "https://placehold.co/400x400/8B5CF6/FFFFFF?text=Monitor",
	},
];

const [store, setStore] = createStore<ProductStore>({
	products: [],
	loading: false,
	error: null,
});

export const useProducts = () => {
	const setProducts = (products: Product[]) => {
		setStore("products", products);
	};

	// Simulated API call with delay
	const fetchProducts = async () => {
		setStore("loading", true);
		setStore("error", null);
		try {
			// Simulate network delay
			await new Promise(resolve => setTimeout(resolve, 1000));
			setStore("products", mockProducts);
		} catch (error) {
			setStore("error", error instanceof Error ? error.message : "Failed to fetch products");
		} finally {
			setStore("loading", false);
		}
	};

	// Simulated search with delay
	const searchProducts = async (query: string) => {
		setStore("loading", true);
		setStore("error", null);
		try {
			// Simulate network delay
			await new Promise(resolve => setTimeout(resolve, 500));
			const filtered = mockProducts.filter(
				product =>
					product.name.toLowerCase().includes(query.toLowerCase()) ||
					product.description.toLowerCase().includes(query.toLowerCase())
			);
			setStore("products", filtered);
		} catch (error) {
			setStore("error", error instanceof Error ? error.message : "Failed to search products");
		} finally {
			setStore("loading", false);
		}
	};

	// Get a single product by ID
	const getProduct = (id: string) => {
		return mockProducts.find(p => p.id === id);
	};

	return {
		products: () => store.products,
		loading: () => store.loading,
		error: () => store.error,
		setProducts,
		fetchProducts,
		searchProducts,
		getProduct,
	};
}; 