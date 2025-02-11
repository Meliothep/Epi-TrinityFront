import { createStore } from "solid-js/store";
import { createProductService } from "../services/service.factory";
import { MockError } from "../mocks/products.mock";
import type { Product } from "../types/product.types";

interface ProductStore {
	products: Product[];
	loading: boolean;
	error: string | null;
	retrying: boolean;
}

// Initialize the product service
const productService = createProductService();

const [store, setStore] = createStore<ProductStore>({
	products: [],
	loading: false,
	error: null,
	retrying: false,
});

const handleError = (error: unknown): string => {
	if (error instanceof MockError) {
		return "Temporary service interruption. Retrying...";
	}
	if (error instanceof Error) {
		return `Error: ${error.message}`;
	}
	return "An unexpected error occurred";
};

export const useProducts = () => {
	const setProducts = (products: Product[]) => {
		setStore("products", products);
	};

	const fetchProducts = async () => {
		setStore("loading", true);
		setStore("error", null);
		try {
			const products = await productService.getProducts();
			setStore("products", products);
		} catch (error) {
			setStore("error", handleError(error));
			console.error("Error fetching products:", error);
		} finally {
			setStore("loading", false);
		}
	};

	const searchProducts = async (query: string) => {
		setStore("loading", true);
		setStore("error", null);
		try {
			const products = await productService.searchProducts(query);
			setStore("products", products);
		} catch (error) {
			setStore("error", handleError(error));
			console.error("Error searching products:", error);
		} finally {
			setStore("loading", false);
		}
	};

	const getProduct = async (id: string) => {
		setStore("retrying", false);
		try {
			const product = await productService.getProduct(id);
			if (!product) {
				throw new Error("Product not found");
			}
			return product;
		} catch (error) {
			if (error instanceof MockError) {
				setStore("retrying", true);
			}
			console.error("Error fetching product:", error);
			throw error;
		} finally {
			setStore("retrying", false);
		}
	};

	return {
		products: () => store.products,
		loading: () => store.loading,
		error: () => store.error,
		retrying: () => store.retrying,
		setProducts,
		fetchProducts,
		searchProducts,
		getProduct,
	};
}; 