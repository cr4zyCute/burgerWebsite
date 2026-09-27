import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types';
import { SEED_USERS } from '../db/seed-data';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: Role) => boolean;
  logout: () => void;
  switchUser: (userId: string) => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Default to Super Admin so the user can immediately access and test both admin & customer features
      currentUser: SEED_USERS[0],
      isAuthenticated: true,

      login: (email: string, role?: Role) => {
        const found = SEED_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (found) {
          set({ currentUser: found, isAuthenticated: true });
          return true;
        }
        // Create customer on the fly if not found
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: role || 'customer',
          createdAt: new Date().toISOString(),
        };
        set({ currentUser: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },

      switchUser: (userId: string) => {
        const found = SEED_USERS.find((u) => u.id === userId);
        if (found) {
          set({ currentUser: found, isAuthenticated: true });
        }
      },

      updateProfile: (updates: Partial<User>) => {
        const current = get().currentUser;
        if (!current) return;
        set({ currentUser: { ...current, ...updates } });
      },
    }),
    {
      name: 'burger-craft-auth',
    }
  )
);
