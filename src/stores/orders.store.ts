import { createSignal } from "solid-js";
import type { OrderDetails } from "../services/checkout.service";

const STORAGE_KEY = "trinity_orders";

// Load initial orders from localStorage with user-specific key
const loadOrdersFromStorage = (userId?: string): OrderDetails[] => {
  try {
    const key = userId ? `${STORAGE_KEY}_${userId}` : STORAGE_KEY;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading orders:", error);
    return [];
  }
};

class OrdersStore {
  private ordersSignal = createSignal<OrderDetails[]>([]);
  private currentUserId: string | null = null;

  // Get all orders
  getOrders = () => this.ordersSignal[0]();

  // Get order by ID
  getOrderById = (orderId: string) => {
    return this.getOrders().find(order => order.orderId === orderId);
  };

  // Load orders for a specific user
  async loadOrders(userId: string) {
    try {
      this.currentUserId = userId;
      const orders = loadOrdersFromStorage(userId).filter(order => 
        order.customerEmail === userId || // Match by email
        order.orderId.includes(userId) || // Match by ID
        order.userId === userId // Match by user ID
      );
      this.ordersSignal[1](orders);
      return orders;
    } catch (error) {
      console.error("Error loading orders:", error);
      throw error;
    }
  }

  // Add new order
  addOrder = (order: OrderDetails) => {
    const orders = [order, ...this.getOrders()];
    this.ordersSignal[1](orders);
    this.persistOrders(orders);
    return order;
  };

  // Update order status
  updateOrderStatus = (orderId: string, status: OrderDetails["status"]) => {
    const orders = this.getOrders().map(order =>
      order.orderId === orderId ? { ...order, status } : order
    );
    this.ordersSignal[1](orders);
    this.persistOrders(orders);
  };

  // Get orders by status
  getOrdersByStatus = (status: OrderDetails["status"]) => {
    return this.getOrders().filter(order => order.status === status);
  };

  // Get orders by date range
  getOrdersByDateRange = (startDate: Date, endDate: Date) => {
    return this.getOrders().filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
  };

  // Get recent orders
  getRecentOrders = (limit: number = 5) => {
    return this.getOrders()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  };

  // Clear all orders (useful for testing or user logout)
  clearOrders = () => {
    this.ordersSignal[1]([]);
    if (this.currentUserId) {
      localStorage.removeItem(`${STORAGE_KEY}_${this.currentUserId}`);
    }
    localStorage.removeItem(STORAGE_KEY);
    this.currentUserId = null;
  };

  // Private helper to persist orders to localStorage
  private persistOrders = (orders: OrderDetails[]) => {
    const key = this.currentUserId ? `${STORAGE_KEY}_${this.currentUserId}` : STORAGE_KEY;
    localStorage.setItem(key, JSON.stringify(orders));
  };
}

// Export a singleton instance
export const ordersStore = new OrdersStore(); 