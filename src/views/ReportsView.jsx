// 📁 Imports
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

import { CardTask } from "@/components/card/cardTask";
import { ModalForm } from "@/components/shared/ModalForm";
import { ModalFormActivity } from "@/components/shared/ModalFormActivity";
import { Paginator } from "@/components/shared/Paginador";
import { PerPageSelector } from "@/components/shared/PerPageSelector";
import { Loader } from "@/components/shared/Loader";

import { useTasks } from "@/hooks/useTasks";
import { useActivities } from "@/hooks/useActivities";
import { useActivity } from "@/hooks/useActivity";
import { useTask } from "@/hooks/useTask";

import "@/assets/sass/custom/reports.scss";

// 📄 Componente principal
export const ReportsView = () => {
  // 🔁 Estados y hooks
  const { activities } = useActivities();
  const {
    bodyActivity,
    setActivity,
    createActivity,
    isUpdatingSuccess: isUpdatingSuccessActivity,
    isErrorUpdating: isErrorUpdatingActivity
  } = useActivity();

  const {
    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
    getPage,
    setPerPage,
    filters,
    setfilter,
    tasks
  } = useTasks();

  const {
    task,
    bodyTask,
    setTask,
    setIdTask,
    createTask,
    deleteTask,
    isUpdatingSuccess,
    isErrorUpdating
  } = useTask();

  const [taskActive, setTaskActive] = useState("pendiente");
  const [activityActive, setActivityActive] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalActivity, setShowModalActivity] = useState(false);

  const [modalDefaultValues] = useState({
    title: "",
    description: "",
    category_id: "",
    status: "pendiente"
  });

  const [activityDefaultValues] = useState({
    name: "",
    color: "#000000"
  });

  // 🧠 Efectos
  useEffect(() => {
    document.title = "Mis Tareas";
  }, []);

  useEffect(() => {
    if (isUpdatingSuccess || isErrorUpdating) {
      setShowModal(false);
      setIdTask(null);
      handleCloseModal();
    }
  }, [isUpdatingSuccess, isErrorUpdating]);

  useEffect(() => {
    if (isUpdatingSuccessActivity || isErrorUpdatingActivity) {
      setShowModalActivity(false);
      setActivity(null);
    }
  }, [isUpdatingSuccessActivity, isErrorUpdatingActivity]);

  // 🧩 Handlers
  const handleFilter = (status) => {
    setTaskActive(status);
    setfilter({ ...filters, status });
  };

  const handleCategory = (id) => {
    setActivityActive(id);
    setfilter({ ...filters, category_id: id });
  };

  const handleCloseModal = () => {
    setTask(modalDefaultValues);
  };

  const editTask = (task) => {
    setIdTask(task.id);
    setShowModal(true);
  };

  const deletTask = (id) => {
    deleteTask(id);
  };

  const finishTask = (task) => {
    const updatedTask = {
      ...bodyTask,
      attributes: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: "finalizada"
      }
    };
    setTask(updatedTask);
    createTask({ task: { data: updatedTask }, id: task.id });
  };

  // 🖼️ Render
  return (
    <main className="main w-100">
      <div className="main__header container">
        {/* Header */}
        <div className="main__header-container d-flex">
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
                setIdTask(null);
                handleCloseModal();
              }}
              idTask={task?.id}
              activities={activities}
              onCreate={createTask}
              bodyTask={bodyTask}
              defaultValues={task?.id ? task : modalDefaultValues}
            />
          </div>
        </div>

        {/* Cuerpo principal */}
        <div className="main__body d-flex">
          {/* Aside (categorías) */}
          <div className="main__body-aside">
            <div className="main__body-aside-header">
              <p>Categorías</p>
              <Icon
                icon="tabler:refresh"
                width="20"
                className="main__body-reload"
                onClick={() => handleCategory("")}
              />
            </div>
            <ul className="main__nav">
              {!activities.length ? (
                <Loader size="small" />
              ) : (
                activities.map((activitie) => (
                  <li
                    key={activitie.id}
                    className="main__nav-item"
                    data-active={activitie.id === activityActive}
                    onClick={() => handleCategory(activitie.id)}
                  >
                    <div
                      className="main__nav-bullet"
                      style={{ backgroundColor: activitie.color }}
                    ></div>
                    <span className="main__nav-text">{activitie.name}</span>
                  </li>
                ))
              )}
            </ul>
            <Button onClick={() => setShowModalActivity(true)}>
              <Icon icon="tabler:plus" /> Nueva categoría
            </Button>
            <ModalFormActivity
              onShow={showModalActivity}
              onHide={() => setShowModalActivity(false)}
              onCreate={createActivity}
              defaultValues={activityDefaultValues}
              bodyActivity={bodyActivity}
            />
          </div>

          {/* Tabla de tareas */}
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

            {tasks.length > 0 && (
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
