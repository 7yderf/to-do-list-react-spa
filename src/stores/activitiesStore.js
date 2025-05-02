import { create } from 'zustand';

export const useActivitiesStore = create((set) => ({
  activities: [],
  setActivities: (activities) => {
  console.log('🚀 ~ useActivitiesStore ~ activities:', activities)

    set({ activities })
  },

}));