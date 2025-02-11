import { ProductViewModel } from "./product.types";

export interface ProductService {
    getProducts(): Promise<ProductViewModel[]>;
    getProduct(id: string): Promise<ProductViewModel | null>;
    searchProducts(query: string): Promise<ProductViewModel[]>;
}

export interface ServiceConfig {
    baseUrl: string;
    apiKey?: string;
} 