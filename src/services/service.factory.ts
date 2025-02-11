import { ProductService, ServiceConfig } from "../types/services";
import { MockProductService } from "./mock/products.mock.service";
import { ApiProductService } from "./api/products.service";

// Environment configuration
const config: Record<string, ServiceConfig> = {
    development: {
        baseUrl: "http://localhost:3000/api",
    },
    staging: {
        baseUrl: "https://staging-api.example.com",
    },
    production: {
        baseUrl: "https://api.example.com",
    },
};

// Get current environment
const getEnvironment = () => {
    return (import.meta.env.MODE as string) || "development";
};

// Check if we should use mock service
const shouldUseMock = () => {
    return import.meta.env.VITE_USE_MOCK === "true" || getEnvironment() === "development";
};

// Service factory
export const createProductService = () => {
    // In the future, we can switch between mock and real implementations
    // based on environment variables or other configuration
    return new MockProductService();
}; 