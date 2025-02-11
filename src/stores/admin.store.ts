import { createSignal } from "solid-js";
import type { User, AdminStats, AdminPermissions, UserRole } from "../types/auth.types";
import { authStore } from "./auth.store";

class AdminStore {
  private statsSignal = createSignal<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: 0,
    pendingOrders: 0
  });

  private permissionsSignal = createSignal<AdminPermissions>({
    users: {
      view: false,
      create: false,
      edit: false,
      delete: false
    },
    products: {
      view: false,
      create: false,
      edit: false,
      delete: false
    },
    orders: {
      view: false,
      manage: false
    },
    settings: {
      view: false,
      edit: false
    }
  });

  // Get admin stats
  private getStats = () => this.statsSignal[0]();
  private setStats = (stats: AdminStats) => this.statsSignal[1](stats);

  // Get admin permissions
  private getPermissions = () => this.permissionsSignal[0]();
  private setPermissions = (permissions: AdminPermissions) => this.permissionsSignal[1](permissions);

  // Check if user is admin
  isAdmin = () => {
    return authStore.currentUser?.role === "admin" || authStore.currentUser?.role === "super_admin";
  };

  // Check if user is super admin
  isSuperAdmin = () => {
    return authStore.currentUser?.role === "super_admin";
  };

  // Load admin stats
  async loadStats() {
    if (!this.isAdmin()) return;

    try {
      // In a real app, this would be an API call
      const mockStats: AdminStats = {
        totalUsers: 150,
        activeUsers: 120,
        totalProducts: 500,
        totalOrders: 1200,
        totalRevenue: 45000,
        recentOrders: 25,
        pendingOrders: 10
      };

      this.setStats(mockStats);
      return mockStats;
    } catch (error) {
      console.error("Error loading admin stats:", error);
      throw error;
    }
  }

  // Load admin permissions
  async loadPermissions() {
    if (!this.isAdmin()) return;

    try {
      // In a real app, this would be an API call
      // Here we're setting permissions based on role
      const permissions: AdminPermissions = {
        users: {
          view: true,
          create: this.isSuperAdmin(),
          edit: this.isSuperAdmin(),
          delete: this.isSuperAdmin()
        },
        products: {
          view: true,
          create: true,
          edit: true,
          delete: this.isSuperAdmin()
        },
        orders: {
          view: true,
          manage: true
        },
        settings: {
          view: true,
          edit: this.isSuperAdmin()
        }
      };

      this.setPermissions(permissions);
      return permissions;
    } catch (error) {
      console.error("Error loading admin permissions:", error);
      throw error;
    }
  }

  // Check specific permission
  hasPermission(module: keyof AdminPermissions, action: string): boolean {
    const permissions = this.getPermissions();
    return this.isAdmin() && permissions[module]?.[action as keyof typeof permissions[typeof module]] || false;
  }

  // Get current stats
  get stats() {
    return this.getStats();
  }

  // Get current permissions
  get permissions() {
    return this.getPermissions();
  }

  // Clear admin state
  clearAdminState() {
    this.setStats({
      totalUsers: 0,
      activeUsers: 0,
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      recentOrders: 0,
      pendingOrders: 0
    });
    
    this.setPermissions({
      users: { view: false, create: false, edit: false, delete: false },
      products: { view: false, create: false, edit: false, delete: false },
      orders: { view: false, manage: false },
      settings: { view: false, edit: false }
    });
  }
}

export const adminStore = new AdminStore(); 