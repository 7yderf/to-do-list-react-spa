import React, { useRef,  } from 'react';
import { Button, Modal, Row, Col, Card } from "react-bootstrap";
import { FormTask } from "@/components/form/FormTask";
import { Icon } from "@iconify/react";

export const ModalForm = ({ 
  onShow, 
  onHide,
  idTask,
  activities, 
  onCreate,
  bodyTask,
  defaultValues
}) => {
  // const [show, setShow] = useState(false);
  const formRef = useRef();

  // Cierra el modal después de éxito/error
  
  // Resetear formulario cuando el modal se cierra completamente
  const handleExited = () => {
    formRef.current?.resetForm();
  };

  return (
    <>
      

      <Modal 
        show={onShow } 
        onHide={onHide }
        onExited={handleExited}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className='w-100 py-3'>
            <h2 className="text-center">
            {idTask ? 'Editar Tarea' : 'Agregar Tarea'}
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTask
            innerRef={formRef}
            activities={activities}
            onSubmit={onCreate}
            initialValues={defaultValues}
            bodyTask={bodyTask}
            onCancel={onHide} 
          />
        </Modal.Body>
      </Modal>
    </>
  );
};