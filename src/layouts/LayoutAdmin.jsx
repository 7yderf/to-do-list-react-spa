import { Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth';
import { Loader } from '@/components/shared/Loader';
import { Icon } from '@iconify/react';
import '@/assets/sass/custom/layoutAdmin.scss'

export const LayoutAdmin = () => {
  const { logout, isLoggingOut, sesion } = useAuth();
  return (
    <main className="admin">
      <article className="admin__body">
        <section className="admin__modules-box">
          <div className="admin__modules-header">
            <div className="admin__modules-info-user container">
              <Icon icon="mdi:account-circle" width="36" height="36" className='admin__modules-info-user-icon' />
              <h5>{sesion.user}</h5>
              <button onClick={logout} disabled={isLoggingOut}>
                <Icon icon="mdi:logout" width="16" height="16" />
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