import { withRetry } from "../../lib/retry";
import type { CustomerInfo, UpdateCustomerInfoRequest } from "../../types/customer.types";

const STORAGE_KEY = "trinity_customer_info";

// Mock customer data store
const mockCustomerStore = new Map<string, CustomerInfo>();

export class MockCustomerService {
    private mockDelay = 1000; // Simulate network delay

    constructor() {
        // Load any stored customer data
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored) as Record<string, CustomerInfo>;
            Object.entries(data).forEach(([key, value]) => {
                mockCustomerStore.set(key, value);
            });
        }
    }

    private persistData() {
        const data: Record<string, CustomerInfo> = {};
        mockCustomerStore.forEach((value, key) => {
            data[key] = value;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    async getCustomerInfo(userId: string): Promise<CustomerInfo> {
        return withRetry(async () => {
            await new Promise(resolve => setTimeout(resolve, this.mockDelay));

            const customerInfo = mockCustomerStore.get(userId);
            if (!customerInfo) {
                // Create default customer info if none exists
                const defaultInfo: CustomerInfo = {
                    userId,
                    addresses: {},
                    preferences: {
                        newsletter: false,
                        marketingEmails: false,
                        orderNotifications: true,
                        language: 'en',
                        currency: 'USD'
                    },
                    lastUpdated: new Date().toISOString()
                };
                mockCustomerStore.set(userId, defaultInfo);
                this.persistData();
                return defaultInfo;
            }

            return customerInfo;
        });
    }

    async updateCustomerInfo(userId: string, data: UpdateCustomerInfoRequest): Promise<CustomerInfo> {
        return withRetry(async () => {
            await new Promise(resolve => setTimeout(resolve, this.mockDelay));

            const currentInfo = await this.getCustomerInfo(userId);
            
            // Deep merge the updates
            const updatedInfo: CustomerInfo = {
                ...currentInfo,
                ...data,
                addresses: {
                    ...currentInfo.addresses,
                    ...(data.addresses && {
                        billing: data.addresses.billing 
                            ? { ...currentInfo.addresses.billing, ...data.addresses.billing }
                            : currentInfo.addresses.billing,
                        shipping: data.addresses.shipping
                            ? { ...currentInfo.addresses.shipping, ...data.addresses.shipping }
                            : currentInfo.addresses.shipping
                    })
                },
                preferences: {
                    ...currentInfo.preferences,
                    ...data.preferences
                },
                lastUpdated: new Date().toISOString()
            };

            // Validate address data if provided
            if (data.addresses) {
                if (data.addresses.billing) {
                    this.validateAddress(data.addresses.billing);
                }
                if (data.addresses.shipping) {
                    this.validateAddress(data.addresses.shipping);
                }
            }

            mockCustomerStore.set(userId, updatedInfo);
            this.persistData();
            return updatedInfo;
        });
    }

    async deleteCustomerInfo(userId: string): Promise<void> {
        return withRetry(async () => {
            await new Promise(resolve => setTimeout(resolve, this.mockDelay));
            
            mockCustomerStore.delete(userId);
            this.persistData();
        });
    }

    private validateAddress(address: Partial<Address>) {
        if (address.zipCode && !/^\d{5}(-\d{4})?$/.test(address.zipCode)) {
            throw new Error("Invalid ZIP code format");
        }

        if (address.phone && !/^\+?[\d\s-]{10,}$/.test(address.phone)) {
            throw new Error("Invalid phone number format");
        }
    }
}

// Export a singleton instance
export const customerService = new MockCustomerService(); 