import { MockPayPalService, PayPalOrder, PayPalPayment } from "./mock/paypal.mock.service";
import { cartStore } from "../stores/cart.store";
import { ordersStore } from "../stores/orders.store";
import { authStore } from "../stores/auth.store";
import { useProducts } from "../stores/products.store";
import type { Address } from "../types/customer.types";

export interface CheckoutItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CheckoutSummary {
  items: CheckoutItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface OrderDetails {
  orderId: string;
  userId?: string;
  paymentId: string;
  items: CheckoutItem[];
  total: number;
  status: "pending" | "completed" | "failed";
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  createdAt: string;
  updatedAt?: string;
  errorDetails?: {
    code: string;
    message: string;
    timestamp: string;
  };
  retryCount?: number;
}

// Custom error class for checkout errors
export class CheckoutError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = "CheckoutError";
  }
}

class CheckoutService {
  private paypalService = new MockPayPalService();
  private readonly MAX_RETRY_ATTEMPTS = 3;
  private currentCustomerInfo: {
    email?: string;
    name?: string;
    phone?: string;
    shippingAddress?: Address;
    billingAddress?: Address;
  } = {};
  
  // Calculate checkout summary with error handling
  async getCheckoutSummary(): Promise<CheckoutSummary> {
    try {
      const { products } = useProducts();
      const cartItems = cartStore.items();
      
      if (cartItems.length === 0) {
        throw new CheckoutError(
          "Cart is empty",
          "EMPTY_CART"
        );
      }
      
      const items: CheckoutItem[] = cartItems.map(item => {
        const product = products().find(p => p.id === item.id);
        if (!product) {
          throw new CheckoutError(
            `Product not found: ${item.id}`,
            "PRODUCT_NOT_FOUND",
            { productId: item.id }
          );
        }
        
        if (item.quantity <= 0) {
          throw new CheckoutError(
            `Invalid quantity for product: ${item.id}`,
            "INVALID_QUANTITY",
            { productId: item.id, quantity: item.quantity }
          );
        }
        
        return {
          id: item.id,
          name: product.product_name,
          quantity: item.quantity,
          price: product.price || 0
        };
      });

      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      if (subtotal <= 0) {
        throw new CheckoutError(
          "Invalid order total",
          "INVALID_TOTAL",
          { subtotal }
        );
      }
      
      const tax = subtotal * 0.1; // 10% tax rate
      const total = subtotal + tax;

      return {
        items,
        subtotal,
        tax,
        total
      };
    } catch (error) {
      if (error instanceof CheckoutError) {
        throw error;
      }
      throw new CheckoutError(
        "Failed to calculate checkout summary",
        "SUMMARY_CALCULATION_ERROR",
        { originalError: error }
      );
    }
  }

  // Set customer information for the order
  setCustomerInfo(info: {
    email?: string;
    name?: string;
    phone?: string;
    shippingAddress?: Address;
    billingAddress?: Address;
  }) {
    this.currentCustomerInfo = {
      ...this.currentCustomerInfo,
      ...info
    };
  }

  // Initialize checkout process with retry logic
  async initializeCheckout(retryCount = 0): Promise<PayPalOrder> {
    try {
      const summary = await this.getCheckoutSummary();

      // Use authenticated user info if available
      const customerInfo = {
        email: this.currentCustomerInfo.email || authStore.currentUser?.email || "",
        name: this.currentCustomerInfo.name || authStore.currentUser?.name || "",
        phone: this.currentCustomerInfo.phone,
        shipping_address: this.currentCustomerInfo.shippingAddress,
        billing_address: this.currentCustomerInfo.billingAddress
      };

      return await this.paypalService.createOrder(summary.total, customerInfo);
    } catch (error) {
      if (retryCount < this.MAX_RETRY_ATTEMPTS && this.shouldRetry(error)) {
        console.log(`Retrying initialization (attempt ${retryCount + 1})...`);
        return this.initializeCheckout(retryCount + 1);
      }
      
      throw new CheckoutError(
        "Failed to initialize checkout",
        "INITIALIZATION_ERROR",
        { retryCount, originalError: error }
      );
    }
  }

  // Process PayPal approval with enhanced error handling
  async processApproval(orderId: string, retryCount = 0): Promise<PayPalOrder> {
    try {
      if (!orderId) {
        throw new CheckoutError(
          "Invalid order ID",
          "INVALID_ORDER_ID"
        );
      }

      return await this.paypalService.approveOrder(orderId);
    } catch (error) {
      if (retryCount < this.MAX_RETRY_ATTEMPTS && this.shouldRetry(error)) {
        console.log(`Retrying approval (attempt ${retryCount + 1})...`);
        return this.processApproval(orderId, retryCount + 1);
      }

      throw new CheckoutError(
        "Payment approval failed",
        "APPROVAL_ERROR",
        { orderId, retryCount, originalError: error }
      );
    }
  }

  // Complete the checkout process with comprehensive error handling
  async completeCheckout(orderId: string): Promise<OrderDetails> {
    let orderDetails: OrderDetails | null = null;

    try {
      // Check if order already exists
      const existingOrder = ordersStore.getOrderById(orderId);
      if (existingOrder) {
        return existingOrder;
      }

      // Capture the payment
      const payment = await this.paypalService.capturePayment(orderId);
      
      // Get checkout summary
      const summary = await this.getCheckoutSummary();

      // Create order details
      orderDetails = {
        orderId: payment.orderId,
        userId: authStore.currentUser?.id,
        paymentId: payment.paymentId,
        items: summary.items,
        total: summary.total,
        status: payment.status === "COMPLETED" ? "completed" : "failed",
        customerEmail: payment.customer_info.email,
        customerName: payment.customer_info.name,
        customerPhone: payment.customer_info.phone,
        shippingAddress: payment.customer_info.shipping_address,
        billingAddress: payment.customer_info.billing_address,
        createdAt: payment.create_time,
        updatedAt: payment.update_time
      };

      // Save order to history
      ordersStore.addOrder(orderDetails);

      // Clear cart and customer info after successful checkout
      if (orderDetails.status === "completed") {
        cartStore.clearCart();
        this.currentCustomerInfo = {};
      }

      return orderDetails;
    } catch (error) {
      // Create failed order record if we have order details
      if (orderDetails) {
        const failedOrder: OrderDetails = {
          ...orderDetails,
          status: "failed",
          errorDetails: {
            code: error instanceof CheckoutError ? error.code : "UNKNOWN_ERROR",
            message: error instanceof Error ? error.message : "Unknown error occurred",
            timestamp: new Date().toISOString()
          }
        };
        ordersStore.addOrder(failedOrder);
      }

      throw new CheckoutError(
        "Checkout completion failed",
        "COMPLETION_ERROR",
        { orderId, originalError: error }
      );
    }
  }

  // Helper method to determine if an error is retryable
  private shouldRetry(error: any): boolean {
    // Retry on network errors or specific PayPal errors
    if (error instanceof CheckoutError) {
      const retryableCodes = [
        "NETWORK_ERROR",
        "TIMEOUT_ERROR",
        "PAYPAL_TEMPORARY_ERROR"
      ];
      return retryableCodes.includes(error.code);
    }
    
    // Retry on generic network errors
    return error.message?.includes("network") || 
           error.message?.includes("timeout") ||
           error.message?.includes("temporary");
  }
}

// Export a singleton instance
export const checkoutService = new CheckoutService(); 