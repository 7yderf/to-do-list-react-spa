import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '@/components/form/components/TextInput';
import ColorInput from '@/components/form/components/ColorInput';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  color: Yup.string().required('Color requerido'),
});

export const FormActivity = ({ 
  initialValues, 
  onSubmit, 
  onCancel, 
  innerRef,
  bodyActivity, 
}) => {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const body = {
          ...bodyActivity,
          attributes: {
            ...values,
          },
        };
        onSubmit({ activity: { data: body }});
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="p-4">
          <div className="form__box">
            <TextInput name="name" label="Nombre" placeholder="Nombre de la actividad" />
          </div>
          <div className="form__box">
            <ColorInput name="color" label="Color" />
          </div>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button type="button" onClick={onCancel} className="formTask__cancel">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="formTask__submit">
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
