import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/auth';
import Cookies from 'js-cookie';

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
        // Mirror to cookies for Middleware access
        Cookies.set('careerflyghtToken', token, { expires: 7 });
        Cookies.set('careerflyghtUser', JSON.stringify(user), { expires: 7 });
      },
      clearAuth: () => {
        set({ user: null, token: null });
        Cookies.remove('careerflyghtToken');
        Cookies.remove('careerflyghtUser');
      },
      updateUser: (updatedFields) =>
        set((state) => {
          const newUser = state.user ? { ...state.user, ...updatedFields } : null;
          if (newUser) {
             Cookies.set('careerflyghtUser', JSON.stringify(newUser), { expires: 7 });
          }
          return { user: newUser };
        }),
    }),
    {
      name: 'careerflyght-auth',
    }
  )
);
