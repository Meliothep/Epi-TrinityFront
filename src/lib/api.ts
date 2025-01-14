/**
 * API configuration and base setup
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
    baseUrl: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};

export const createApiUrl = (path: string): string => {
    return `${API_URL}${path}`;
}; 