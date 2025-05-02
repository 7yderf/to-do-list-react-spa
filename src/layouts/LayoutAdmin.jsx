import { Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth';
import { Loader } from '@/components/shared/Loader';
import { Icon } from '@iconify/react';
import '@/assets/sass/custom/layoutAdmin.scss'

export const LayoutAdmin = () => {
  const { logout, isLoggingOut, sesion } = useAuth();
  return (
    <main class="admin">
      <article class="admin__body">
        <section class="admin__modules-box">
          <div class="admin__modules-header">
            <div class="admin__modules-info-user">
              <Icon icon="mdi:account-circle" width="40" height="40" />
              <h5>{sesion.user}</h5>
              <button onClick={logout} disabled={isLoggingOut}>
                {isLoggingOut ? <Loader size="small" /> : "Cerrar sesión"}
              </button>
            </div>
          </div>
          <Outlet />
        </section>
      </article>
    </main>
  );
}