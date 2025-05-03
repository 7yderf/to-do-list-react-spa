import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '@/components/form/components/TextInput';
import SelectInput from '@/components/form/components/SelectInput';
import TextAreaInput from '@/components/form/components/TextAreaInput';
import '@/assets/sass/custom/formTask.scss';


const validationSchema = Yup.object().shape({
  title: Yup.string().required('Requerido'),
  category_id: Yup.string().required('Seleccione una categoría'),
  description: Yup.string().required('Requerido'),
});

export const FormTask = ({ 
  activities, 
  onSubmit,
  bodyTask, 
  initialValues,
  innerRef,
  onCancel 
}) => {
  return (
    <Formik
      innerRef={innerRef}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("🚀 ~ values:", values);
        const { id } = values;

        const body = {
          ...bodyTask,
          attributes: {
            ...values,
            status: "pendiente",
          },
        };
        onSubmit({ task: { data: body }, id });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="p-4">
          <div className="form__box form__box--mobile">
            <TextInput
              name="title"
              label="Nombre de tarea"
              placeholder="Ingrese el título"
            />
          </div>

          <div className="form__box form__box--mobile">
            <SelectInput
              name="category_id"
              label="Selecciona categoría"
              options={activities.map((a) => ({
                value: a.id,
                label: a.name,
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
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              type="button"
              className="formTask__cancel"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="formTask__submit"
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
