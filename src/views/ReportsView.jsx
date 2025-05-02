import { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Card } from "react-bootstrap";
import { useTasks } from "@/hooks/useTasks";
import { useActivities } from "@/hooks/useActivities";
import { useTask } from '@/hooks/useTask'
import { FormTask } from "@/components/form/FormTask";
import { Icon } from "@iconify/react";
import { showAlert } from '@/hooks/useAlerts'

// import { TablePaginator, TablePerpage } from '@/components/common';
import "@/assets/sass/custom/reports.scss";

export const ReportsView = () => {
  const { activities } = useActivities();
  const { currentPage, from, lastPage,perPage,to,total,isLoading,isError,getPage,setPerPage,filters,setfilter,refetchTasks, tasks } = useTasks();
  const { task, idTask, bodyTask, isLoading:isLoadingTask, setTask,createTask, deleteTask,getDefaultTask,isUpdatingSuccess, isErrorUpdating } = useTask();

  useEffect(() => {
    document.title = "Mis Tareas";
  }, []);

  const handleFilter = (status) => {
  
    setfilter({
      ...filters,
      status,
    });
  };

  const deletTask = (id) => {
    deleteTask(id)
  }

  const finishTask = (task) => {
    const updatedTask = {
      ...bodyTask,
      attributes:{
        id: task.id,
        title: task.title,
        description: task.description,
        status: 'finalizada'
      }
    };
    setTask(updatedTask);
    createTask({ task: {data:updatedTask}, id: task.id });
  }

  useEffect(() => {
    if (isUpdatingSuccess) {
      showAlert('success', 'Tarea actualizada con éxito');
      refetchTasks();
    }
    
    if (isErrorUpdating) {
      showAlert('error', 'Error al actualizar la tarea');
    }
  }, [isUpdatingSuccess, isErrorUpdating, refetchTasks]);

  

  return (
    <main className="main w-100">
      <div className="main__header">
        <div className="container main__header-container d-flex  ">
          <div className="main__header-title">
            <h2>Mis tareas</h2>
          </div>
          {/* <div className="main__header-action">
            <ModalForm activities={activities} onCreate={createTask} />
          </div> */}
        </div>
        <div className="container main__body d-flex">
          <div className="main__body-aside">
            <p>Categorias</p>
            <ul className="main__nav">
              <li className="main__nav-item">
                <div className="main__nav-bullet"></div>
                <span className="main__nav-text">Tareas</span>
              </li>
            </ul>
            <pre>{JSON.stringify(activities, null, 2)}</pre>
          </div>
          <div className="main__body-table">
            <div className="main__body-tasks-type">
              <div className="main__body-tasks-actions">
                <Button
                  variant="secondary"
                  onClick={() => handleFilter("pendiente")}
                >
                  Pendientes
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleFilter("finalizada")}
                >
                  Finalizadas
                </Button>
              </div>
            </div>
            <div className="row g-3">
            {tasks.map((task) => (
              <div key={task.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Status: {task.status}
                      </small>
                    </p>
                    <div className="card-actions">
                      {/* <button
                        className="btn btn-primary"
                        onClick={() => editTask(task)}
                      >
                        Editar
                      </button>*/}
                      <button
                        className="btn btn-danger"
                        onClick={() => deletTask(task.id)}
                      >
                        Eliminar
                      </button> 
                      <button
                        className="btn btn-danger"
                        onClick={() => finishTask(task)}
                      >
                        Finalizar tarea
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>

          

          {/* <div className="d-flex justify-content-between pt-5">
            <TablePerpage
              perPage={perPage}
              total={total}
              onChange={newPerPage => setPagination({ perPage: newPerPage })}
            />
            
            <TablePaginator
              currentPage={currentPage}
              total={total}
              perPage={perPage}
              onChange={newPage => setPagination({ currentPage: newPage })}
            />
          </div> */}
        </div>
      </div>
    </main>
  );
};

const TaskCard = ({ task, onDelete }) => (
  <Card className="h-100">
    <Card.Body>
      <Card.Title>{task.title}</Card.Title>
      <Card.Text>{task.description}</Card.Text>
      <small className="text-muted">Estado: {task.status}</small>

      <div className="d-flex gap-2 mt-3">
        <Button variant="primary" size="sm">
          Editar
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>
          Eliminar
        </Button>
      </div>
    </Card.Body>
  </Card>
);

const ModalForm = ({ activities, onCreate }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        <Icon icon="tabler:upload" className="me-2" />
        Agregar tarea
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activities.length > 0 ? (
            <FormTask activities={activities} onSubmit={onCreate} />
          ) : (
            <div>Cargando categorías...</div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
