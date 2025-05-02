import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export const LayoutAdmin = () => {
  const navigate = useNavigate();
  const { sesion, logout } = useAuthStore();

  return (
    <main className="admin">
      <header>
        <h2>Bienvenido {sesion.user}</h2>
        <button onClick={logout}>Cerrar sesión</button>
      </header>
      <Outlet />
    </main>
  );
};