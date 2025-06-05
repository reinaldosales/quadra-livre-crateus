import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router';

export function useAuth(redirectIfAuthenticated = false) {
  const { isAuthenticated, loading, fetchUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      fetchUser();
    }
  }, [isAuthenticated, loading, fetchUser]);

  useEffect(() => {
    if (!loading && isAuthenticated && redirectIfAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate, redirectIfAuthenticated]);

  return {
    isAuthenticated,
    loading,
    user: useAuthStore((state) => state.user),
    error: useAuthStore((state) => state.error),
    login: useAuthStore((state) => state.login),
    logout: useAuthStore((state) => state.logout),
    register: useAuthStore((state) => state.register)
  };
}