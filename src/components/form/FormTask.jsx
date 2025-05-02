import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '@/components/form/components/TextInput';
import SelectInput from '@/components/form/components/SelectInput';
import TextAreaInput from '@/components/form/components/TextAreaInput';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Requerido'),
  category_id: Yup.string().required('Seleccione una categoría'),
  description: Yup.string(),
});

export const FormTask = ({ 
  activities, 
  onSubmit, 
  initialValues,
  innerRef 
}) => {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          
          <div className="form__box form__box--mobile">
            <TextInput
              name="title" 
              label="Título de la tarea" 
              placeholder="Ingrese el título"
            />
          </div>

          <div className="form__box form__box--mobile">
            <SelectInput
              name="category_id"
              label="Categoría"
              options={activities.map(a => ({
                value: a.id,
                label: a.name
              }))}
            />
          </div>
          <div className="form__box form__box--mobile">
            <TextAreaInput
              name="description" 
              label="Descripción" 
              placeholder="Ingrese la descripción"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Tarea'}
          </button>
        </Form>
      )}
    </Formik>
  );
};
