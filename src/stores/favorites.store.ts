import { createSignal } from "solid-js";
import type { Product } from "../types/product.types";

const STORAGE_KEY = "trinity_favorites";

// Load initial favorites from localStorage
const loadFavoritesFromStorage = (userId?: string): string[] => {
  try {
    const stored = localStorage.getItem(userId ? `${STORAGE_KEY}_${userId}` : STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
};

class FavoritesStore {
  private favoritesSignal = createSignal<string[]>([]);
  private currentUserId: string | null = null;

  // Load favorites for a specific user
  async loadFavorites(userId: string) {
    try {
      this.currentUserId = userId;
      const favorites = loadFavoritesFromStorage(userId);
      this.favoritesSignal[1](favorites);
      return favorites;
    } catch (error) {
      console.error("Error loading favorites:", error);
      return [];
    }
  }

  // Get all favorite product IDs
  getFavorites = () => this.favoritesSignal[0]();

  // Check if a product is favorited
  isFavorite = (productId: string) => {
    return this.getFavorites().includes(productId);
  };

  // Toggle favorite status
  toggleFavorite = (productId: string) => {
    const currentFavorites = this.getFavorites();
    const isCurrentlyFavorite = this.isFavorite(productId);
    
    const newFavorites = isCurrentlyFavorite
      ? currentFavorites.filter(id => id !== productId)
      : [...currentFavorites, productId];
    
    // Update state and persist
    this.favoritesSignal[1](newFavorites);
    this.persistFavorites(newFavorites);
    
    return !isCurrentlyFavorite; // Return new favorite status
  };

  // Clear all favorites
  clearFavorites = () => {
    this.favoritesSignal[1]([]);
    if (this.currentUserId) {
      localStorage.removeItem(`${STORAGE_KEY}_${this.currentUserId}`);
    }
    localStorage.removeItem(STORAGE_KEY);
    this.currentUserId = null;
  };

  // Private helper to persist favorites to localStorage
  private persistFavorites = (favorites: string[]) => {
    if (this.currentUserId) {
      localStorage.setItem(`${STORAGE_KEY}_${this.currentUserId}`, JSON.stringify(favorites));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  };
}

// Export a singleton instance
export const favoritesStore = new FavoritesStore(); 