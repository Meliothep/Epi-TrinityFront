import { ProductService, ServiceConfig } from "../../types/services";
import { Product } from "../../stores/products.store";

export class ApiProductService implements ProductService {
    private baseUrl: string;
    private apiKey?: string;

    constructor(config: ServiceConfig) {
        this.baseUrl = config.baseUrl.replace(/\/$/, ""); // Remove trailing slash if present
        this.apiKey = config.apiKey;
    }

    private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
        const headers = new Headers(options.headers);
        if (this.apiKey) {
            headers.set("Authorization", `Bearer ${this.apiKey}`);
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    async getProducts(): Promise<Product[]> {
        return this.fetchWithAuth("/products");
    }

    async getProduct(id: string): Promise<Product | null> {
        try {
            return await this.fetchWithAuth(`/products/${id}`);
        } catch (error) {
            if ((error as any)?.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }

    async searchProducts(query: string): Promise<Product[]> {
        return this.fetchWithAuth(`/products/search?q=${encodeURIComponent(query)}`);
    }
} 