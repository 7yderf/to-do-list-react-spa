import { Outlet } from 'react-router-dom'
import '@/assets/sass/custom/layoutAuth.scss'

export const LayoutAuth = () => {
  return (
    <main className="auth">
      <article className="auth__body">
        <section className="auth__form-box">
          <div className="auth__form">
            <Outlet /> {/* Equivalente a router-view */}
          </div>
        </section>
        
        <section className="auth__image-corp container-fluid">
          {/* Si necesitas una imagen de fondo aquí */}
          {/* <BackgroundSrc from="auth-layout" imgSrc="/branding/logo.png" /> */}
        </section>
      </article>
    </main>
  )
}