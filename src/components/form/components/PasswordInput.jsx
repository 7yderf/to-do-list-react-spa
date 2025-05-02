import { useState } from 'react';
import { useField } from 'formik';
import { Icon } from '@iconify/react';
import '@/assets/sass/custom/Input.scss';

const PasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="input__box">
        <input
          {...field}
          {...props}
          type={showPassword ? 'text' : 'password'}
          className={`input__input ${meta.touched && meta.error ? 'is-danger' : ''}`}
        />
        <span 
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          <Icon
            icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
            width="20"
          />
        </span>
        {meta.touched && meta.error && (
          <div className="input__text-danger">{meta.error}</div>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;