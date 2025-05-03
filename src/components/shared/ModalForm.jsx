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
          <Modal.Title>
            {idTask ? 'Editar Tarea' : 'Nueva Tarea'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTask
            innerRef={formRef}
            activities={activities}
            onSubmit={onCreate}
            initialValues={defaultValues}
            bodyTask={bodyTask}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};