import { ProductService, ServiceConfig } from "../../types/services";
import { ProductDTO, ProductViewModel, ProductMapper } from "../../types/product.types";

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

    async getProducts(): Promise<ProductViewModel[]> {
        const products = await this.fetchWithAuth("/products") as ProductDTO[];
        return products.map(ProductMapper.toViewModel);
    }

    async getProduct(id: string): Promise<ProductViewModel | null> {
        try {
            const product = await this.fetchWithAuth(`/products/${id}`) as ProductDTO;
            return ProductMapper.toViewModel(product);
        } catch (error) {
            if ((error as any)?.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }

    async searchProducts(query: string): Promise<ProductViewModel[]> {
        const products = await this.fetchWithAuth(`/products/search?q=${encodeURIComponent(query)}`) as ProductDTO[];
        return products.map(ProductMapper.toViewModel);
    }
} 