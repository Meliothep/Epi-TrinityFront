import { withRetry } from "../../lib/retry";
import { SessionManager } from "../../lib/session";
import type { User, UserRole } from "../../types/auth.types";

interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

interface RegisterData extends Omit<LoginCredentials, 'remember'> {
  name: string;
}

// Mock user data with different roles
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@trinity.com",
    name: "Super Admin",
    role: "super_admin",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin",
  },
  {
    id: "2",
    email: "manager@trinity.com",
    name: "Store Admin",
    role: "admin",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
  },
  {
    id: "3",
    email: "user@trinity.com",
    name: "Regular User",
    role: "user",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
  },
  {
    id: "4",
    email: "inactive@trinity.com",
    name: "Inactive User",
    role: "user",
    isActive: false,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Inactive",
  }
];

// Mock credentials for testing
const mockCredentials: Record<string, { password: string; userId: string }> = {
  "admin@trinity.com": { password: "admin123", userId: "1" },
  "manager@trinity.com": { password: "manager123", userId: "2" },
  "user@trinity.com": { password: "user123", userId: "3" },
  "inactive@trinity.com": { password: "inactive123", userId: "4" },
};

export class MockAuthService {
  private mockDelay = 150; // Simulate network delay

  // Initialize with session if exists
  constructor() {
    const sessionUser = SessionManager.getUser();
    if (sessionUser) {
      const user = mockUsers.find(u => u.id === sessionUser.id);
      if (user) {
        mockUsers.push({ ...user }); // Ensure we have a copy
      }
    }
  }

  async login({ email, password, remember }: LoginCredentials): Promise<User> {
    return withRetry(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, this.mockDelay));

      // Check credentials
      const credentials = mockCredentials[email];
      if (!credentials || credentials.password !== password) {
        throw new Error("Invalid email or password");
      }

      // Get user
      const user = mockUsers.find(u => u.id === credentials.userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error("Account is inactive. Please contact support.");
      }

      // Update last login
      user.lastLoginAt = new Date().toISOString();

      // Save session with remember preference
      SessionManager.saveSession(user, remember);
      return user;
    });
  }

  async register({ email, password, name }: RegisterData): Promise<User> {
    return withRetry(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, this.mockDelay));

      // Check if user already exists
      if (mockCredentials[email]) {
        throw new Error("Email already registered");
      }

      // Validate password
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Create new user
      const newUser: User = {
        id: String(mockUsers.length + 1),
        email,
        name,
        role: "user", // New registrations are always regular users
        isActive: true,
        createdAt: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      };

      // Add to mock data
      mockUsers.push(newUser);
      mockCredentials[email] = {
        password,
        userId: newUser.id,
      };
      
      // Save session but don't remember by default for new registrations
      SessionManager.saveSession(newUser, false);
      return newUser;
    });
  }

  async logout(): Promise<void> {
    return withRetry(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, this.mockDelay));
      SessionManager.clearSession();
    });
  }

  async getCurrentUser(): Promise<User | null> {
    return withRetry(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, this.mockDelay));
      
      const sessionUser = SessionManager.getUser();
      if (!sessionUser) return null;
      
      // Find user in mock database
      const user = mockUsers.find(u => u.id === sessionUser.id);
      return user || null;
    });
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return withRetry(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, this.mockDelay));

      const currentUser = SessionManager.getUser();
      if (!currentUser) {
        throw new Error("Not authenticated");
      }

      // Find and update user in mock database
      const index = mockUsers.findIndex(u => u.id === currentUser.id);
      if (index === -1) {
        throw new Error("User not found");
      }

      // Don't allow role changes through profile update
      const { role, ...updateData } = data;
      
      const updatedUser = {
        ...mockUsers[index],
        ...updateData,
      };

      // Update mock users array
      mockUsers[index] = updatedUser;
      
      // Update session with new user data
      SessionManager.saveSession(updatedUser, SessionManager.wasRemembered());
      return updatedUser;
    });
  }
} 