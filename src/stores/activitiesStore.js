import { create } from 'zustand';

export const useActivitiesStore = create((set) => ({
  activities: [],
  setActivities: (activities) => {

    set({ activities })
  },

}));