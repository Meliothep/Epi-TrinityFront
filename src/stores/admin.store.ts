import { createStore } from 'solid-js/store';
import { createSignal, createEffect } from 'solid-js';
import adminService from '../mocks/admin.mock';
import { authStore } from './auth.store';
import type {
  DashboardStats,
  PaginationParams,
  FilterParams,
  SortParams,
  AdminSettings,
  Activity,
  SalesTrendData,
} from '../types/admin';
import type { User } from '../types/user';
import type { Product } from '../types/product.types';
import type { Order } from '../types/order';

interface AdminState {
  stats: DashboardStats;
  users: {
    items: User[];
    total: number;
    loading: boolean;
    error: string | null;
  };
  products: {
    items: Product[];
    total: number;
    loading: boolean;
    error: string | null;
  };
  orders: {
    items: Order[];
    total: number;
    loading: boolean;
    error: string | null;
  };
  settings: AdminSettings | null;
  recentActivity: Activity[];
  salesTrend: SalesTrendData[];
}

const initialState: AdminState = {
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    recentActivity: [],
    salesTrend: [],
  },
  users: {
    items: [],
    total: 0,
    loading: false,
    error: null,
  },
  products: {
    items: [],
    total: 0,
    loading: false,
    error: null,
  },
  orders: {
    items: [],
    total: 0,
    loading: false,
    error: null,
  },
  settings: null,
  recentActivity: [],
  salesTrend: [],
};

const [state, setState] = createStore<AdminState>(initialState);

// Pagination signals
const [usersPagination, setUsersPagination] = createSignal<PaginationParams>({ page: 1, limit: 10 });
const [productsPagination, setProductsPagination] = createSignal<PaginationParams>({ page: 1, limit: 10 });
const [ordersPagination, setOrdersPagination] = createSignal<PaginationParams>({ page: 1, limit: 10 });

// Filter signals
const [usersFilter, setUsersFilter] = createSignal<FilterParams>({});
const [productsFilter, setProductsFilter] = createSignal<FilterParams>({});
const [ordersFilter, setOrdersFilter] = createSignal<FilterParams>({});

// Sort signals
const [usersSort, setUsersSort] = createSignal<SortParams>({ field: 'createdAt', direction: 'desc' });
const [productsSort, setProductsSort] = createSignal<SortParams>({ field: 'createdAt', direction: 'desc' });
const [ordersSort, setOrdersSort] = createSignal<SortParams>({ field: 'createdAt', direction: 'desc' });

export const adminStore = {
  // State
  get stats() { return state.stats; },
  get users() { return state.users; },
  get products() { return state.products; },
  get orders() { return state.orders; },
  get settings() { return state.settings; },
  get recentActivity() { return state.recentActivity; },
  get salesTrend() { return state.salesTrend; },

  // Pagination getters
  get usersPagination() { return usersPagination(); },
  get productsPagination() { return productsPagination(); },
  get ordersPagination() { return ordersPagination(); },

  // Filter getters
  get usersFilter() { return usersFilter(); },
  get productsFilter() { return productsFilter(); },
  get ordersFilter() { return ordersFilter(); },

  // Sort getters
  get usersSort() { return usersSort(); },
  get productsSort() { return productsSort(); },
  get ordersSort() { return ordersSort(); },

  // Auth checks
  isAdmin() {
    return authStore.currentUser?.role === 'admin' || authStore.currentUser?.role === 'super_admin';
  },

  isSuperAdmin() {
    return authStore.currentUser?.role === 'super_admin';
  },

  // Actions
  async loadStats() {
    try {
      const stats = await adminService.fetchStats();
      setState('stats', stats);
    } catch (error) {
      console.error('Failed to load stats:', error);
      throw error;
    }
  },

  async loadUsers() {
    try {
      setState('users', 'loading', true);
      setState('users', 'error', null);
      const { users, total } = await adminService.fetchUsers(usersPagination());
      setState('users', {
        items: users,
        total,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState('users', 'loading', false);
      setState('users', 'error', 'Failed to load users');
      console.error('Failed to load users:', error);
    }
  },

  async loadProducts() {
    try {
      setState('products', 'loading', true);
      setState('products', 'error', null);
      const { products, total } = await adminService.fetchProducts(productsPagination());
      setState('products', {
        items: products,
        total,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState('products', 'loading', false);
      setState('products', 'error', 'Failed to load products');
      console.error('Failed to load products:', error);
    }
  },

  async loadOrders() {
    try {
      setState('orders', 'loading', true);
      setState('orders', 'error', null);
      const { orders, total } = await adminService.fetchOrders(ordersPagination());
      setState('orders', {
        items: orders,
        total,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState('orders', 'loading', false);
      setState('orders', 'error', 'Failed to load orders');
      console.error('Failed to load orders:', error);
    }
  },

  async loadRecentActivity() {
    try {
      const activity = await adminService.fetchRecentActivity({ limit: 10 });
      setState('recentActivity', activity);
    } catch (error) {
      console.error('Failed to load recent activity:', error);
      throw error;
    }
  },

  async loadSalesTrend() {
    try {
      const trend = await adminService.fetchSalesTrend({ days: 7 });
      setState('salesTrend', trend);
    } catch (error) {
      console.error('Failed to load sales trend:', error);
      throw error;
    }
  },

  // Pagination setters
  setUsersPagination(params: Partial<PaginationParams>) {
    setUsersPagination(prev => ({ ...prev, ...params }));
  },
  setProductsPagination(params: Partial<PaginationParams>) {
    setProductsPagination(prev => ({ ...prev, ...params }));
  },
  setOrdersPagination(params: Partial<PaginationParams>) {
    setOrdersPagination(prev => ({ ...prev, ...params }));
  },

  // Filter setters
  setUsersFilter(params: FilterParams) {
    setUsersFilter(params);
  },
  setProductsFilter(params: FilterParams) {
    setProductsFilter(params);
  },
  setOrdersFilter(params: FilterParams) {
    setOrdersFilter(params);
  },

  // Sort setters
  setUsersSort(params: SortParams) {
    setUsersSort(params);
  },
  setProductsSort(params: SortParams) {
    setProductsSort(params);
  },
  setOrdersSort(params: SortParams) {
    setOrdersSort(params);
  },
};

// Auto-refresh effects
createEffect(() => {
  const pagination = usersPagination();
  const filter = usersFilter();
  const sort = usersSort();
  adminStore.loadUsers();
});

createEffect(() => {
  const pagination = productsPagination();
  const filter = productsFilter();
  const sort = productsSort();
  adminStore.loadProducts();
});

createEffect(() => {
  const pagination = ordersPagination();
  const filter = ordersFilter();
  const sort = ordersSort();
  adminStore.loadOrders();
});

export default adminStore; 