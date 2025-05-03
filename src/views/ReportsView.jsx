import { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Card } from "react-bootstrap";
import { CardTask } from "@/components/card/cardTask";
import { useTasks } from "@/hooks/useTasks";
import { useActivities } from "@/hooks/useActivities";
import { useTask } from '@/hooks/useTask'
import { ModalForm} from "@/components/shared/ModalForm";
import {  Paginator } from "@/components/shared/Paginador";
import {  PerPageSelector } from "@/components/shared/PerPageSelector";
import { Loader } from '@/components/shared/Loader';

import { Icon } from "@iconify/react";

// import { TablePaginator, TablePerpage } from '@/components/common';
import "@/assets/sass/custom/reports.scss";

export const ReportsView = () => {
  const { activities } = useActivities();
  const { currentPage, from, lastPage,perPage,to,total,isLoading,isError,getPage,setPerPage,filters,setfilter, tasks } = useTasks();
  const { task, bodyTask, isLoading:isLoadingTask, setTask, setIdTask, createTask, deleteTask,getDefaultTask,isUpdatingSuccess, isErrorUpdating } = useTask();

  useEffect(() => {
    document.title = "Mis Tareas";
  }, []);

  const [taskActive, setTaskActive] = useState('pendiente');

  const handleFilter = (status) => {
  
    setTaskActive(status);
    setfilter({
      ...filters,
      status,
    });
  };

  const [showModal, setShowModal] = useState(false);

  const editTask = (task) => {
    setIdTask(task.id);
    //  activar modal
    setShowModal(true)
  }


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

  const [modalDefaultValues] = useState({
    title: '',
    description: '',
    category_id: '',
    status: 'pendiente'
  });

  const handleCloseModal = () => {
    setTask(modalDefaultValues); // Resetear estado de la tarea
  };

  useEffect(() => {
    if (isUpdatingSuccess || isErrorUpdating) {
      
      setShowModal(false); 
      setIdTask(null);
      handleCloseModal()
    }
  }, [isUpdatingSuccess, isErrorUpdating]);

  

  return (
    <main className="main w-100">
      <div className="main__header container">
        <div className="main__header-container d-flex  ">
          <div className="main__header-title">
            <h2>Mis tareas</h2>
          </div>
          <div className="main__header-action">
            <button onClick={() => setShowModal(true)}>
              <Icon icon="tabler:upload" className="me-2" />
              Agregar tarea
            </button>

            <ModalForm
              onShow={showModal}
              onHide={() => {
                setShowModal(false);
                setIdTask(null); // Limpiar al cerrar
                handleCloseModal(); // Si es necesario más limpieza
              }}
              idTask={task?.id}
              activities={activities}
              onCreate={createTask}
              bodyTask={bodyTask}
              defaultValues={task?.id ? task : modalDefaultValues}
            />
          </div>
        </div>
        <div className="main__body d-flex">
          <div className="main__body-aside">
            <p>Categorias</p>
            <ul className="main__nav">
              {!activities.length ? (
                <Loader size="small" />
              ) : (
                activities.map((activitie) => (
                  <li key={activitie.id} className="main__nav-item">
                    <div
                      className="main__nav-bullet"
                      style={{ backgroundColor: activitie.color }}
                    ></div>
                    <span className="main__nav-text">{activitie.name}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="main__body-table">
            <div className="main__body-tasks-type">
              <div className="main__body-tasks-actions">
                <button
                  className="main__body-tasks-actions--left"
                  data-active={taskActive === "pendiente"}
                  onClick={() => handleFilter("pendiente")}
                >
                  Tareas Pendientes
                </button>
                <button
                  className="main__body-tasks-actions--right"
                  data-active={taskActive === "finalizada"}
                  onClick={() => handleFilter("finalizada")}
                >
                  Tareas Finalizadas
                </button>
              </div>
            </div>

            {!tasks.length ? (
              <Loader size="small" />
            ) : (
              <CardTask
                tasks={tasks}
                editTask={editTask}
                deletTask={deletTask}
                finishTask={finishTask}
              />
            )}

            {tasks.length && (
              <div className="d-flex justify-content-between pt-5">
                <PerPageSelector
                  perPage={perPage}
                  getPage={getPage}
                  setPerPage={setPerPage}
                  total={total}
                />

                <Paginator
                  currentPage={currentPage}
                  from={from}
                  lastPage={lastPage}
                  perPage={perPage}
                  to={to}
                  total={total}
                  getPage={getPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};




