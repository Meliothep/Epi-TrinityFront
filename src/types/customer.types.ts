export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface CustomerPreferences {
    newsletter: boolean;
    marketingEmails: boolean;
    orderNotifications: boolean;
    language: string;
    currency: string;
}

export interface CustomerInfo {
    userId: string;
    phone?: string;
    addresses: {
        billing?: Address;
        shipping?: Address;
    };
    preferences: CustomerPreferences;
    lastUpdated: string;
}

export interface UpdateCustomerInfoRequest {
    phone?: string;
    addresses?: {
        billing?: Partial<Address>;
        shipping?: Partial<Address>;
    };
    preferences?: Partial<CustomerPreferences>;
} 