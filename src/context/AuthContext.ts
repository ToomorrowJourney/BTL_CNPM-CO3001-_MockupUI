import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, AuthState } from '../types/user';
import { MOCK_USERS } from '../services/mockData';

const API_DELAY_MS = 500;
const STORAGE_KEY = 'user';

/**
 * Auth Context Type Definition
 * Extends AuthState with methods for login/logout
 */
interface AuthContextType extends AuthState {
  login: (email: string) => Promise<void>;
  logout: () => void;
}

/**
 * Create Auth Context
 * Context for managing authentication state across the application
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider Component
 * Provides authentication context and manages auth state
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  /**
   * Initialize auth state from localStorage on mount
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          const user = JSON.parse(storedUser) as User;
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login user
   * @param email - User email to login with
   */
  const login = useCallback(async (email: string) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, API_DELAY_MS));

      const user = MOCK_USERS.find((u) => u.email === email);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  /**
   * Logout current user
   */
  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};

/**
 * useAuth Hook
 * Custom hook to access auth context
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};