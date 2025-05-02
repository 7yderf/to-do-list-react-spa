import { create } from 'zustand';

export const useTasksStore = create((set) => {
  // Función auxiliar para filtros
  const getDefaultFilter = () => ({
    status: "pendiente",
    category_id: "",
    order: "asc",
  });

  // Estado inicial
  const initialState = {
    currentPage: 1,
    from: 1,
    lastPage: 1,
    perPage: 2,
    to: 1,
    total: 1,
    tasks: [],
    filters: getDefaultFilter(),
    filtesParams: '&order=asc&status=pendiente'
  };

  return {
    ...initialState,
    
    // Métodos de actualización
    setCurrentPage: (page) => set({ currentPage: page }),
    setFrom: (value) => set({ from: value }),
    setLastPage: (value) => set({ lastPage: value }),
    setPerPage: (value) => set({ perPage: value }),
    setTo: (value) => set({ to: value }),
    setTotal: (value) => set({ total: value }),
    setTasks: (data) => set({ tasks: data }),

    // Método complejo para filtros
    setFilter: (filters) => {
      set({
        filters: {...filters},
      });
      const formatFilterValue = (key, value) => `&${key}=${value}`;
      
      set((state) => {
        let newParams = '';
        Object.entries(state.filters).forEach(([key, value]) => {
          if (value) newParams += formatFilterValue(key, value);
        });
        
        return {
          currentPage: 1,
          filtesParams: newParams
        };
      });
    },

    // Opcional: Resetear a estado inicial
    reset: () => set(initialState)
  };
});