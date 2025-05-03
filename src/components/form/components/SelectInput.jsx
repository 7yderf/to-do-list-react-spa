import { useField } from 'formik';
import '@/assets/sass/custom/Input.scss';

const SelectInput = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  
  return (
    <div className="field">
      <label className="label">{label}</label>
      <select 
        {...field} 
        {...props} 
        className={`input__input input__input--select ${meta.touched && meta.error ? 'is-invalid' : ''}`}
      >
        <option value="">Seleccione...</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="input__text-danger">{meta.error}</div>
      )}
    </div>
  );
};

export default SelectInput;
