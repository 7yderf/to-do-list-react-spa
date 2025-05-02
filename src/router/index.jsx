import { createBrowserRouter, redirect } from 'react-router-dom';
import { LayoutAuth } from '@/layouts/LayoutAuth';
import { LayoutAdmin } from '@/layouts/LayoutAdmin';
import  LoginView  from '@/views/LoginView';
import { ReportsView } from '@/views/ReportsView';
import { NotFound } from '@/views/NotFound';
import { JwtService } from '@/core/services/JwtService';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutAuth />,
    errorElement: <NotFound />,
    children: [
      { 
        path: '/login', 
        element: <LoginView />,
        loader: guestLoader
      },
      { 
        path: '/', 
        element: <LoginView />,
        loader: guestLoader
      }
    ]
  },
  {
    path: '/admin',
    element: <LayoutAdmin />,
    loader: authLoader,
    children: [
      { 
        path: 'reports', 
        element: <ReportsView /> 
      }
    ]
  },
  { 
    path: '*', 
    element: <NotFound /> 
  }
]);

// Loader para rutas protegidas
async function authLoader() {
  const token = JwtService.getToken();
  if (!token) {
    return redirect('/login?redirect=' + encodeURIComponent(window.location.pathname));
  }
  return null;
}

// Loader para rutas de invitados (evitar acceso a autenticados)
async function guestLoader() {
  const token = JwtService.getToken();
  if (token) return redirect('/admin/reports');
  return null;
}