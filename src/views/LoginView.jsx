// src/views/LoginView.jsx
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import TextInput from '@/components/form/components/TextInput';
import PasswordInput from '@/components/form/components/PasswordInput';
// import Loader from '@/components/globals/Loader';
import '@/assets/sass/custom/login.scss';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string().required('Requerido')
});

const LoginView = () => {
  const { login, isLoggingIn } = useAuth();

  return (
    <main className="form__auth">
      <h3 className="mb-5">Bienvenido</h3>
      {/* {isLoggingIn && <Loader />} */}
      
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={login}
      >
        <Form className="form__container">
          <div className="form__box form__box--mobile">
            <TextInput
              name="email"
              label="Correo Electrónico"
              placeholder="Email"
            />
          </div>

          <div className="form__box form__box--mobile">
            <PasswordInput
              name="password"
              label="Contraseña"
              placeholder="*********"
            />
          </div>

          <div className="form__submit">
            <button 
              type="submit" 
              className="form__submit-btn"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </div>

          
        </Form>
      </Formik>
    </main>
  );
};

export default LoginView;