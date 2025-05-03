import { Modal } from 'react-bootstrap';
import { useRef } from 'react';
import { FormActivity } from '@/components/form/FormActivity';

export const ModalFormActivity = ({
  onShow,
  onHide,
  idActivity,
  onCreate,
  defaultValues,
  bodyActivity
}) => {
  const formRef = useRef();

  const handleExited = () => {
    formRef.current?.resetForm();
  };

  return (
    <Modal show={onShow} onHide={onHide} onExited={handleExited} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 py-3">
          <h2 className="text-center">{idActivity ? 'Editar Actividad' : 'Agregar Actividad'}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormActivity
          innerRef={formRef}
          initialValues={defaultValues}
          onSubmit={onCreate}
          onCancel={onHide}
          bodyActivity={bodyActivity}
        />
      </Modal.Body>
    </Modal>
  );
};
