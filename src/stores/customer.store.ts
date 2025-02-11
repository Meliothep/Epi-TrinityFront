import { createSignal } from "solid-js";
import { customerService } from "../services/mock/customer.mock.service";
import type { CustomerInfo, UpdateCustomerInfoRequest } from "../types/customer.types";

class CustomerStore {
    private customerInfoSignal = createSignal<CustomerInfo | null>(null);
    private loadingSignal = createSignal(false);
    private errorSignal = createSignal<string | null>(null);

    // Signal getters and setters
    private getCustomerInfo = () => this.customerInfoSignal[0]();
    private setCustomerInfo = (info: CustomerInfo | null) => this.customerInfoSignal[1](info);
    
    private getLoading = () => this.loadingSignal[0]();
    private setLoading = (loading: boolean) => this.loadingSignal[1](loading);
    
    private getError = () => this.errorSignal[0]();
    private setError = (error: string | null) => this.errorSignal[1](error);

    async loadCustomerInfo(userId: string) {
        try {
            this.setLoading(true);
            this.setError(null);
            const info = await customerService.getCustomerInfo(userId);
            this.setCustomerInfo(info);
            return info;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to load customer info";
            this.setError(message);
            throw err;
        } finally {
            this.setLoading(false);
        }
    }

    async updateCustomerInfo(userId: string, data: UpdateCustomerInfoRequest) {
        try {
            this.setLoading(true);
            this.setError(null);
            const updatedInfo = await customerService.updateCustomerInfo(userId, data);
            this.setCustomerInfo(updatedInfo);
            return updatedInfo;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to update customer info";
            this.setError(message);
            throw err;
        } finally {
            this.setLoading(false);
        }
    }

    async clearCustomerInfo() {
        try {
            this.setLoading(true);
            this.setError(null);
            
            // Clear from local storage
            if (this.currentInfo?.userId) {
                await customerService.deleteCustomerInfo(this.currentInfo.userId);
            }
            
            // Clear from memory
            this.setCustomerInfo(null);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to clear customer info";
            this.setError(message);
            console.error("Error clearing customer info:", err);
        } finally {
            this.setLoading(false);
        }
    }

    // Public getters
    get currentInfo() {
        return this.getCustomerInfo();
    }

    get isLoading() {
        return this.getLoading();
    }

    get currentError() {
        return this.getError();
    }

    // Helper methods for common operations
    get hasShippingAddress() {
        return !!this.currentInfo?.addresses.shipping;
    }

    get hasBillingAddress() {
        return !!this.currentInfo?.addresses.billing;
    }

    get preferredLanguage() {
        return this.currentInfo?.preferences.language || 'en';
    }

    get preferredCurrency() {
        return this.currentInfo?.preferences.currency || 'USD';
    }
}

// Export a singleton instance
export const customerStore = new CustomerStore(); 