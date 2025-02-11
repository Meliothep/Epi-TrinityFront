import type { Product } from "../../types/product.types";
import { mockProducts } from "../../mocks/products.mock";
import { withRetry } from "../../lib/retry";

export class MockProductService {
    async getProducts(): Promise<Product[]> {
        return withRetry(async () => [...mockProducts]);
    }

    async getProduct(id: string): Promise<Product | null> {
        return withRetry(async () => {
            const product = mockProducts.find(p => p.id === id);
            return product ? { ...product } : null;
        });
    }

    async searchProducts(query: string): Promise<Product[]> {
        return withRetry(async () => {
            const normalizedQuery = query.toLowerCase();
            return mockProducts.filter(product =>
                product.product_name.toLowerCase().includes(normalizedQuery) ||
                product.brands.some(brand => brand.toLowerCase().includes(normalizedQuery)) ||
                product.categories.some(category => category.toLowerCase().includes(normalizedQuery))
            );
        });
    }
} 