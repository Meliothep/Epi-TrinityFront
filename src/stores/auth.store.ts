import { createSignal, createEffect, onMount } from "solid-js";
import { MockAuthService } from "../services/mock/auth.mock.service";
import { SessionManager } from "../lib/session";
import { useNavigate } from "@solidjs/router";
import { customerStore } from "./customer.store";
import { cartStore } from "./cart.store";
import { ordersStore } from "./orders.store";
import { favoritesStore } from "./favorites.store";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

interface RegisterData extends Omit<LoginCredentials, 'remember'> {
  name: string;
}

class AuthStore {
  private authService = new MockAuthService();
  private userSignal = createSignal<User | null>(SessionManager.getUser());
  private loadingSignal = createSignal(false);
  private errorSignal = createSignal<string | null>(null);
  private initialized = false;

  constructor() {
    // Check for existing session on initialization
    this.checkAuth();

    // Set up session refresh interval
    setInterval(() => {
      if (this.isAuthenticated) {
        SessionManager.refreshSession();
      }
    }, 5 * 60 * 1000); // Refresh every 5 minutes
  }

  private async checkAuth() {
    if (this.initialized) return;
    
    try {
      this.setLoading(true);
      
      // Check for valid session
      if (SessionManager.isValidSession()) {
        const user = SessionManager.getUser();
        this.setUser(user);
        
        // Verify with server if needed
        await this.authService.getCurrentUser();
        
        // Initialize user data
        if (user) {
          await this.initializeUserData(user.id);
        }
      } else if (SessionManager.wasRemembered()) {
        // Try to refresh session if user was remembered
        const user = await this.authService.getCurrentUser();
        if (user) {
          SessionManager.saveSession(user, true);
          this.setUser(user);
          await this.initializeUserData(user.id);
        }
      }
    } catch (err) {
      console.error("Failed to check auth status:", err);
      this.handleAuthError();
    } finally {
      this.setLoading(false);
      this.initialized = true;
    }
  }

  private handleAuthError() {
    this.clearAllStores();
    const navigate = useNavigate();
    navigate("/login");
  }

  // Signal getters and setters
  private getUser = () => this.userSignal[0]();
  private setUser = (user: User | null) => this.userSignal[1](user);
  
  private getLoading = () => this.loadingSignal[0]();
  private setLoading = (loading: boolean) => this.loadingSignal[1](loading);
  
  private getError = () => this.errorSignal[0]();
  private setError = (error: string | null) => this.errorSignal[1](error);

  // Clear all application stores
  private clearAllStores() {
    // Clear auth state
    this.setUser(null);
    SessionManager.clearSession();

    // Clear other stores
    customerStore.clearCustomerInfo();
    cartStore.clearCart();
    ordersStore.clearOrders();
    favoritesStore.clearFavorites();
  }

  // Initialize all user data
  private async initializeUserData(userId: string) {
    try {
      // Load customer information
      await customerStore.loadCustomerInfo(userId);
      
      // Load orders history
      await ordersStore.loadOrders(userId);
      
      // Load favorites
      await favoritesStore.loadFavorites(userId);
      
      // Note: Cart is already persistent via localStorage, no need to reload
    } catch (error) {
      console.error("Error initializing user data:", error);
      // Don't throw here - we want to continue even if some data fails to load
    }
  }

  async login(credentials: LoginCredentials) {
    try {
      this.setLoading(true);
      this.setError(null);
      
      // Perform login
      const user = await this.authService.login(credentials);
      
      // Save session with remember me preference
      SessionManager.saveSession(user, credentials.remember);
      this.setUser(user);
      
      // Initialize user data
      await this.initializeUserData(user.id);
      
      // Force page refresh with redirect
      const returnUrl = sessionStorage.getItem("returnUrl") || "/dashboard";
      sessionStorage.removeItem("returnUrl"); // Clear stored URL
      window.location.href = returnUrl;
      
      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to login";
      this.setError(message);
      throw err;
    } finally {
      this.setLoading(false);
    }
  }

  async register(data: RegisterData) {
    try {
      this.setLoading(true);
      this.setError(null);
      
      // Register user
      const user = await this.authService.register(data);
      
      // Save session but don't remember by default for new registrations
      SessionManager.saveSession(user, false);
      this.setUser(user);
      
      // Initialize user data for new registration
      await this.initializeUserData(user.id);
      
      // Force page refresh and redirect to dashboard
      window.location.href = "/dashboard";
      
      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to register";
      this.setError(message);
      throw err;
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      this.setLoading(true);
      this.setError(null);
      
      // Call logout API
      await this.authService.logout();
      
      // Clear all stores
      this.clearAllStores();
      
      // Force page refresh to clear any remaining state
      window.location.href = "/";
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to logout";
      this.setError(message);
      throw err;
    } finally {
      this.setLoading(false);
    }
  }

  async updateProfile(data: Partial<User>) {
    try {
      this.setLoading(true);
      this.setError(null);
      const updatedUser = await this.authService.updateProfile(data);
      
      // Update session with new user data
      if (SessionManager.isValidSession()) {
        SessionManager.saveSession(
          updatedUser,
          SessionManager.wasRemembered()
        );
      }
      this.setUser(updatedUser);
      
      return updatedUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update profile";
      this.setError(message);
      throw err;
    } finally {
      this.setLoading(false);
    }
  }

  // Public getters
  get isAuthenticated() {
    return SessionManager.isValidSession() && !!this.getUser();
  }

  get currentUser() {
    return this.getUser();
  }

  get isLoading() {
    return this.getLoading();
  }

  get currentError() {
    return this.getError();
  }

  get isInitialized() {
    return this.initialized;
  }
}

// Create and export a singleton instance
export const authStore = new AuthStore(); 