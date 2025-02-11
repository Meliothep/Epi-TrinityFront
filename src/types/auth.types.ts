export type UserRole = "user" | "admin" | "super_admin";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData extends Omit<LoginCredentials, 'remember'> {
  name: string;
}

export interface UserUpdateData {
  name?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
  avatar?: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: number;
  pendingOrders: number;
}

export interface AdminPermissions {
  users: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  products: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  orders: {
    view: boolean;
    manage: boolean;
  };
  settings: {
    view: boolean;
    edit: boolean;
  };
} 