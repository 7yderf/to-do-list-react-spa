// src/components/form/components/ColorInput.jsx
import { useField } from 'formik';
import '@/assets/sass/custom/Input.scss';

const ColorInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="input__box">
        <input 
          {...field}
          {...props}
          type="color"
          className={`input__input input__input--color ${meta.touched && meta.error ? 'is-danger' : ''}`}
        />
        {meta.touched && meta.error && (
          <div className="input__text-danger">{meta.error}</div>
        )}
      </div>
    </div>
  );
};

export default ColorInput;
