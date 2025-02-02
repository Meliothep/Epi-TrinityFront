import { Product } from "../stores/products.store";

export interface ProductService {
    getProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<Product | null>;
    searchProducts(query: string): Promise<Product[]>;
}

export interface ServiceConfig {
    baseUrl: string;
    apiKey?: string;
} 