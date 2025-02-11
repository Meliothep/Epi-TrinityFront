/**
 * Utility functions for the application
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatCurrency } from './format';

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Utility for sleeping/delaying
export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Format a number with fallback
export const formatNumber = (value: number | undefined | null, decimals: number = 2): string => {
    if (value == null) return '-';
    return value.toFixed(decimals);
};

/**
 * Formats a barcode to ensure it has 13 digits by padding with leading zeros
 */
const padBarcode = (code: string): string => {
  return code.padStart(13, '0');
};

/**
 * Builds the folder path for a product's images based on its barcode
 */
const getProductFolder = (code: string): string => {
  const paddedCode = padBarcode(code);
  const [a, b, c, rest] = [
    paddedCode.slice(0, 3),
    paddedCode.slice(3, 6),
    paddedCode.slice(6, 9),
    paddedCode.slice(9)
  ];
  return `${a}/${b}/${c}/${rest}`;
};

/**
 * Gets the URL for a product image from OpenFoodFacts
 */
export const getProductImageUrl = (code: string, resolution: "full" | "400" | "200" | "100" = "400"): string => {
  if (!code) return getFallbackImageUrl();
  
  const baseUrl = "https://images.openfoodfacts.org/images/products";
  const folder = getProductFolder(code);
  const resolutionSuffix = resolution === "full" ? "" : `.${resolution}`;
  
  return `${baseUrl}/${folder}/1${resolutionSuffix}.jpg`;
};

/**
 * Gets a fallback image URL using a more reliable service
 */
export const getFallbackImageUrl = (text: string = "No Image"): string => {
  // Using a more reliable service than placeholder.com
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(text)}&size=400&background=random`;
};

// Format price with currency
export const formatPrice = (price: number): string => {
  return formatCurrency(price);
};

// Format nutrition value
export function formatNutritionValue(
    value: number | undefined,
    unit: string = "g",
    decimals: number = 1
): string {
    if (value === undefined || value === null) return "-";
    return `${value.toFixed(decimals)}${unit}`;
}