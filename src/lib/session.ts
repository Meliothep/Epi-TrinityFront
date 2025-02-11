import type { User } from "../types/auth.types";

const SESSION_KEY = "trinity_session";
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

interface Session {
  user: User;
  expiresAt: number;
}

export const SessionManager = {
  // Store session in sessionStorage for security (cleared when browser closes)
  // and a flag in localStorage for "remember me" functionality
  saveSession(user: User, remember: boolean = false) {
    const session: Session = {
      user,
      expiresAt: Date.now() + SESSION_EXPIRY,
    };
    
    // Always save to sessionStorage
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    
    // If remember me is enabled, save a flag to localStorage
    if (remember) {
      localStorage.setItem(`${SESSION_KEY}_remember`, "true");
    }
  },

  // Get current session
  getSession(): Session | null {
    const sessionData = sessionStorage.getItem(SESSION_KEY);
    if (!sessionData) return null;

    try {
      const session: Session = JSON.parse(sessionData);
      
      // Check if session has expired
      if (session.expiresAt < Date.now()) {
        this.clearSession();
        return null;
      }
      
      return session;
    } catch {
      this.clearSession();
      return null;
    }
  },

  // Get current user
  getUser(): User | null {
    const session = this.getSession();
    return session?.user || null;
  },

  // Clear session data
  clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(`${SESSION_KEY}_remember`);
  },

  // Check if user was remembered
  wasRemembered(): boolean {
    return localStorage.getItem(`${SESSION_KEY}_remember`) === "true";
  },

  // Check if session is valid
  isValidSession(): boolean {
    const session = this.getSession();
    return session !== null && session.expiresAt > Date.now();
  },

  // Refresh session expiry
  refreshSession() {
    const session = this.getSession();
    if (session) {
      session.expiresAt = Date.now() + SESSION_EXPIRY;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  }
}; 