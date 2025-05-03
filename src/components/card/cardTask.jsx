import { Icon } from '@iconify/react';
import '@/assets/sass/custom/cardTask.scss'

export const CardTask = ({tasks = [], editTask, deletTask, finishTask}) => {
  return (
    <div className="cardTask__box">
      {tasks.map((task) => (
        
          <div className="cardTask" 
          key={task.id}
          style={{
            borderColor: task.category_color }} >
            <div className="cardTask__body">
              <h5 className="cardTask__title">{task.title}</h5>
              <p className="cardTask__text">{task.description}</p>
              <div className="cardTask__actions">
                <span className="cardTask__category-bullet" style={{ backgroundColor: task.category_color }}></span>
                {task.status !== 'finalizada' && (
                <div className="cardTask__actions-btn">
                  <button
                    className="cardTask__btn"
                    onClick={() => editTask(task)}
                  >
                    <Icon icon="mdi:pencil" width="14" height="14" />
                  </button>
                  <button
                    className="cardTask__btn"
                    onClick={() => deletTask(task.id)}
                  >
                    <Icon icon="mdi:trash-can" width="14" height="14" />
                  </button>
                  <button
                    className="cardTask__btn--danger"
                    onClick={() => finishTask(task)}
                  >
                    Finalizar tarea
                  </button>
                </div>
              )}
              </div>
            </div>
          </div>
        
      ))}
    </div>
  );
}