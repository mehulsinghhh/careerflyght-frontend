import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/auth';

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        set({ user, token });
        // Manually set localStorage for backward compatibility if needed,
        // though persist already handles it.
        if (typeof window !== 'undefined') {
           localStorage.setItem('careerflyghtToken', token);
           localStorage.setItem('careerflyghtUser', JSON.stringify(user));
        }
      },
      clearAuth: () => {
        set({ user: null, token: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('careerflyghtToken');
          localStorage.removeItem('careerflyghtUser');
        }
      },
      updateUser: (updatedFields) =>
        set((state) => {
          const newUser = state.user ? { ...state.user, ...updatedFields } : null;
          if (newUser && typeof window !== 'undefined') {
            localStorage.setItem('careerflyghtUser', JSON.stringify(newUser));
          }
          return { user: newUser };
        }),
    }),
    {
      name: 'careerflyght-auth-v2', // Changed key to avoid conflict
      storage: createJSONStorage(() => localStorage),
    }
  )
);
