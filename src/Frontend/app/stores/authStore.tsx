import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';
import { useNavigate } from "react-router";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
  error: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      error: null,
      loading: false,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/api/v1/login', { email, password });

          const token = response.data.token;

          set({
            isAuthenticated: true,
            user: {
              email: email
            },
            token: token,
            loading: false
          });
          localStorage.setItem('authToken', token);
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'E-mail ou senhas inválidos',
            loading: false
          });
          throw error;
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await api.post('/logout', {});
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            loading: false
          });
          localStorage.removeItem('authToken');
        } catch (error) {
          set({ loading: false });
          console.error('Logout failed:', error);
        }
      },

      register: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/register', { email, password });
          set({ loading: false });

          return response.data; 
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Registration failed',
            loading: false
          });
          throw error;
        }
      },

      fetchUser: async () => {
        set({ loading: true });
        try {
          const token = localStorage.getItem('authToken');
          if (token) {
            const response = await api.get('/manage/info');
            set({
              isAuthenticated: true,
              user: response.data,
              token,
              loading: false
            });
          }
        } catch (error) {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            loading: false
          });
          localStorage.removeItem('authToken');
        }
      }
    }),
    {
      name: 'auth-storage', // Nome para o localStorage
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);