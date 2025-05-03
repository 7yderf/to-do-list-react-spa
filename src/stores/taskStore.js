import { create } from 'zustand';

export const useTaskStore = create((set) => {
  
  const getDefaultTask = () => ({
    title: '',
    description: '',
    category_id: '',
    status: '',
  });

  
  const initialState = {
    task: getDefaultTask(),
    idTask: null,
    bodyTask: {
      type: "tasks",
      attributes: getDefaultTask()
    },
    getDefaultTask 
  };

  return {
    ...initialState,
    
    
    setTask: (data) => set((state) => ({
      task: data,
      bodyTask: {
        ...state.bodyTask,
        attributes: data
      }
    })),

    setIdTask: (id) => set({ idTask: id }),

    clearTask: () => set((state) => ({
      task: getDefaultTask(),
      bodyTask: {
        ...state.bodyTask,
        attributes: getDefaultTask()
      }
    }))
  };
});