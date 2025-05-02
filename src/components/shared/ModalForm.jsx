import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Row, Col, Card } from "react-bootstrap";
import { FormTask } from "@/components/form/FormTask";
import { Icon } from "@iconify/react";

export const ModalForm = ({ 
  activities, 
  onCreate,
  isUpdatingSuccess,
  isErrorUpdating,
  onClose,
  defaultValues
}) => {
  const [show, setShow] = useState(false);
  const formRef = useRef();

  // Cierra el modal después de éxito/error
  useEffect(() => {
    if (isUpdatingSuccess || isErrorUpdating) {
      setShow(false);
      onClose?.();
    }
  }, [isUpdatingSuccess, isErrorUpdating]); 


  // Resetear formulario cuando el modal se cierra completamente
  const handleExited = () => {
    console.log('handleExited')
    formRef.current?.resetForm();
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        <Icon icon="tabler:upload" className="me-2" />
        Agregar tarea
      </Button>

      <Modal 
        show={show} 
        onHide={() => setShow(false)}
        onExited={handleExited}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Nueva Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTask
            innerRef={formRef}
            activities={activities}
            onSubmit={onCreate}
            initialValues={defaultValues}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};