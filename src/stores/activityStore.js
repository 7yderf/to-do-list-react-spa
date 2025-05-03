import { create } from 'zustand';

export const useActivityStore = create((set) => {

  const getDefaultActivity = () => ({
    name: "",
    color: ""
  });

  const initialState = {
    activity: getDefaultActivity(),
    idActivity: null,
    bodyActivity: {
      type: "activities",
      attributes: getDefaultActivity()
    },
    getDefaultActivity
  };

  return {
    ...initialState,
    
    setActivity: (data) => set((state) => ({
      activity: data,
      bodyActivity: {
        ...state.bodyActivity,
        attributes: data
      }
    })),

    setIdActivity: (id) => set({ idActivity: id }),

    clearActivity: () => set((state) => ({
      activity: getDefaultActivity(),
      bodyActivity: {
        ...state.bodyActivity,
        attributes: getDefaultActivity()
      }
    }))
  };

});