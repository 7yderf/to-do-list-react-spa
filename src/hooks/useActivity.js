import { useState } from 'react';
import {ApiService} from "@/core/services/ApiService";
import { showAlert } from '@/hooks/useAlerts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useActivityStore } from '@/stores/activityStore';

const createActivity = async ({activity}) => {
  const { data } = await ApiService.post("/activities/create", activity);
  return data;
}

export const useActivity = () => {
  const [errors, setErrors] = useState([]);
  const queryClient = useQueryClient();
  const {
    activity,
    idActivity,
    setIdActivity,
    bodyActivity,
    setActivity,
    clearActivity,
    getDefaultActivity
  } = useActivityStore();

  // Mutaciones
  const activityMutation = useMutation({
    mutationFn: createActivity,
    onSuccess: (data) => {
      clearActivity();
      showAlert('success', data.meta.message);
      queryClient.invalidateQueries(['activities']); // Invalida y refetch
    },
    onError: (error) => {
      showAlert('error', error.response.data.errors[0].detail);
    }
  });

  return {
    activity,
    setActivity,
    idActivity,
    setIdActivity,
    bodyActivity,
    createActivity: activityMutation.mutate,
    isUpdating: activityMutation.isPending,
    isUpdatingSuccess: activityMutation.isSuccess,
    isErrorUpdating: activityMutation.isError,
    errors,
    setErrors,
    clearActivity,
    getDefaultActivity
  }
  

}