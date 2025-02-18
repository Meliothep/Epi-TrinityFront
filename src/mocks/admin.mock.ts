import { User } from '../types/user';
import { Product } from '../types/product';
import { Order } from '../types/order';

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2024-01-01',
    lastLogin: '2024-02-10',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    createdAt: '2024-01-02',
    lastLogin: '2024-02-11',
    status: 'active',
  },
  // Add more mock users...
];

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Widget',
    price: 99.99,
    stock: 50,
    category: 'Electronics',
    createdAt: '2024-01-01',
    status: 'in_stock',
  },
  {
    id: '2',
    name: 'Super Gadget',
    price: 149.99,
    stock: 30,
    category: 'Electronics',
    createdAt: '2024-01-02',
    status: 'in_stock',
  },
  // Add more mock products...
];

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    products: [{ productId: '1', quantity: 2 }],
    total: 199.98,
    status: 'completed',
    createdAt: '2024-02-01',
    paymentStatus: 'paid',
  },
  {
    id: '2',
    userId: '2',
    products: [{ productId: '2', quantity: 1 }],
    total: 149.99,
    status: 'pending',
    createdAt: '2024-02-02',
    paymentStatus: 'pending',
  },
  // Add more mock orders...
];

// Mock Stats Data
export const mockStats = {
  totalUsers: 1234,
  activeUsers: 789,
  totalProducts: 456,
  totalOrders: 789,
  totalRevenue: 123456.78,
  pendingOrders: 23,
  recentActivity: [
    {
      id: '1',
      type: 'order',
      description: 'New order #1234 received',
      timestamp: '2024-02-11T10:00:00Z',
    },
    {
      id: '2',
      type: 'user',
      description: 'New user registration: john@example.com',
      timestamp: '2024-02-11T09:45:00Z',
    },
    // Add more activities...
  ],
  salesTrend: [
    { date: '2024-02-01', sales: 1200 },
    { date: '2024-02-02', sales: 1500 },
    { date: '2024-02-03', sales: 1100 },
    { date: '2024-02-04', sales: 1800 },
    { date: '2024-02-05', sales: 2000 },
    { date: '2024-02-06', sales: 1700 },
    { date: '2024-02-07', sales: 1900 },
  ],
};

// Mock Admin Service
export const adminService = {
  // Stats
  async fetchStats() {
    return mockStats;
  },

  // Users
  async fetchUsers({ page = 1, limit = 10 }) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      users: mockUsers.slice(start, end),
      total: mockUsers.length,
    };
  },

  async updateUser(id: string, data: Partial<User>) {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');
    mockUsers[index] = { ...mockUsers[index], ...data };
    return mockUsers[index];
  },

  // Products
  async fetchProducts({ page = 1, limit = 10 }) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      products: mockProducts.slice(start, end),
      total: mockProducts.length,
    };
  },

  async updateProduct(id: string, data: Partial<Product>) {
    const index = mockProducts.findIndex(product => product.id === id);
    if (index === -1) throw new Error('Product not found');
    mockProducts[index] = { ...mockProducts[index], ...data };
    return mockProducts[index];
  },

  // Orders
  async fetchOrders({ page = 1, limit = 10 }) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      orders: mockOrders.slice(start, end),
      total: mockOrders.length,
    };
  },

  async updateOrder(id: string, data: Partial<Order>) {
    const index = mockOrders.findIndex(order => order.id === id);
    if (index === -1) throw new Error('Order not found');
    mockOrders[index] = { ...mockOrders[index], ...data };
    return mockOrders[index];
  },

  // Activity
  async fetchRecentActivity({ limit = 10 }) {
    return mockStats.recentActivity.slice(0, limit);
  },

  // Analytics
  async fetchSalesTrend({ days = 7 }) {
    return mockStats.salesTrend.slice(-days);
  },
};

export default adminService; 