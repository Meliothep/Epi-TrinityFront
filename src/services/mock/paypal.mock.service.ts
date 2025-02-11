import { withRetry } from "../../lib/retry";
import type { Address } from "../../types/customer.types";

export interface PayPalOrder {
  id: string;
  status: "CREATED" | "APPROVED" | "COMPLETED" | "FAILED";
  amount: {
    currency_code: string;
    value: string;
  };
  create_time: string;
  customer_info?: {
    email: string;
    name: string;
    phone?: string;
    shipping_address?: Address;
    billing_address?: Address;
  };
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export interface PayPalPayment {
  orderId: string;
  payerId: string;
  paymentId: string;
  status: "COMPLETED" | "FAILED";
  amount: {
    currency_code: string;
    value: string;
  };
  customer_info: {
    email: string;
    name: string;
    phone?: string;
    shipping_address?: Address;
    billing_address?: Address;
  };
  create_time: string;
  update_time: string;
}

export class MockPayPalService {
  private mockDelay = 1000; // Simulate network delay
  private currentOrder: PayPalOrder | null = null;

  // Create a PayPal order
  async createOrder(amount: number, customerInfo?: PayPalOrder["customer_info"]): Promise<PayPalOrder> {
    return withRetry(async () => {
      await new Promise(resolve => setTimeout(resolve, this.mockDelay));

      // Simulate order creation
      const order: PayPalOrder = {
        id: `ORDER-${Math.random().toString(36).substr(2, 9)}`,
        status: "CREATED",
        amount: {
          currency_code: "USD",
          value: amount.toFixed(2)
        },
        create_time: new Date().toISOString(),
        customer_info: customerInfo,
        links: [
          {
            href: `https://mock-paypal.com/checkout/${Math.random().toString(36).substr(2, 9)}`,
            rel: "approve",
            method: "GET"
          }
        ]
      };

      this.currentOrder = order;
      return order;
    });
  }

  // Simulate PayPal approval process
  async approveOrder(orderId: string): Promise<PayPalOrder> {
    return withRetry(async () => {
      await new Promise(resolve => setTimeout(resolve, this.mockDelay));

      if (!this.currentOrder || this.currentOrder.id !== orderId) {
        throw new Error("Order not found");
      }

      // Randomly simulate approval success/failure
      if (Math.random() > 0.1) { // 90% success rate
        const approvedOrder = {
          ...this.currentOrder,
          status: "APPROVED" as const
        };
        this.currentOrder = approvedOrder;
        return approvedOrder;
      }

      throw new Error("PayPal approval failed");
    });
  }

  // Capture the payment after approval
  async capturePayment(orderId: string): Promise<PayPalPayment> {
    return withRetry(async () => {
      await new Promise(resolve => setTimeout(resolve, this.mockDelay));

      if (!this.currentOrder || this.currentOrder.id !== orderId) {
        throw new Error("Order not found");
      }

      // Simulate payment capture
      if (Math.random() > 0.05) { // 95% success rate
        const payment: PayPalPayment = {
          orderId: this.currentOrder.id,
          payerId: `PAYER-${Math.random().toString(36).substr(2, 9)}`,
          paymentId: `PAY-${Math.random().toString(36).substr(2, 9)}`,
          status: "COMPLETED",
          amount: this.currentOrder.amount,
          customer_info: this.currentOrder.customer_info || {
            email: "mock-customer@example.com",
            name: "John Doe"
          },
          create_time: this.currentOrder.create_time,
          update_time: new Date().toISOString()
        };

        this.currentOrder = null; // Clear the current order
        return payment;
      }

      throw new Error("Payment capture failed");
    });
  }
} 