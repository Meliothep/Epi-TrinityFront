// Common Types
export type Status = "idle" | "loading" | "success" | "error";

// User Types
export interface User {
	id: string;
	email: string;
	name?: string;
}

// Product Types
export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image?: string;
	category?: string;
}

// Cart Types
export interface CartItem {
	id: string;
	productId: string;
	quantity: number;
	price: number;
}

export interface Cart {
	items: CartItem[];
	total: number;
}

// Order Types
export interface Order {
	id: string;
	userId: string;
	items: CartItem[];
	total: number;
	status: "pending" | "processing" | "completed" | "cancelled";
	createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
	data?: T;
	error?: string;
	status: Status;
} 