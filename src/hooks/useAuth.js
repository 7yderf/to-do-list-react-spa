// src/modules/login/hooks/useAuth.js
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { ApiService } from '@/core/services/ApiService';
import { showAlert } from '@/hooks/useAlerts';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, logout: storeLogout, sesion } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await ApiService.post('/auth/login', {
        data: {
          type: "auth",
          attributes: credentials
        }
      });
      return response.data;
    },
    onSuccess: (data) => {
      setUser({
        email: data.data.attributes.email,
        id: data.data.attributes.id,
        token: data.data.attributes.token,
        permissions: data.data.attributes.permissions
      });
      showAlert('success', data.meta.message);
      navigate('/admin/reports');
    },
    onError: (error) => {
      showAlert('error', error.response?.data?.errors?.[0]?.detail || 'Error de autenticación');
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return ApiService.post('/auth/logout');
    },
    onSuccess: () => {
      storeLogout();
      navigate('/login');
    },
    onError: (error) => {
      showAlert('error', error.response?.data?.message || 'Error al cerrar sesión');
      storeLogout();
      navigate('/login');
    }
  });

  return {
    sesion,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    error: loginMutation.error || logoutMutation.error
  };
};