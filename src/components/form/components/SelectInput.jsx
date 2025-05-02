import { useField } from 'formik';
import '@/assets/sass/custom/Input.scss';

const SelectInput = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <select 
        {...field} 
        {...props} 
        className={`form-select ${meta.touched && meta.error ? 'is-invalid' : ''}`}
      >
        <option value="">Seleccione...</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="invalid-feedback">{meta.error}</div>
      )}
    </div>
  );
};

export default SelectInput;
