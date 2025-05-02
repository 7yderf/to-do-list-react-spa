import { useField } from 'formik';
import '@/assets/sass/custom/Input.scss';

const TextAreaInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  
  return (
    <div className="field">
      <label className="label">{label}</label>
      <textarea {...field} {...props} className="form-control" rows="4" />
      {meta.touched && meta.error && (
        <div className="text-danger small">{meta.error}</div>
      )}
    </div>
  );
};

export default TextAreaInput;