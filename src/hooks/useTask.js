import { useEffect, useState } from 'react';
import {ApiService} from "@/core/services/ApiService";
import { showAlert } from '@/hooks/useAlerts'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useTaskStore } from '@/stores/taskStore';

const getTask = async (id) => {
  const { data } = await ApiService.get(`/tasks/index/${id}`);
  return data;
};

const createTask = async ({ task, id }) => {
  const url = id ? `/tasks/update` : "/tasks/create";
  const { data } = await ApiService.post(url, task);
  return data;
};

const deleteTask = async (id) => {
  const { data } = await ApiService.delete(`/tasks/delete/${id}`);
  return data;
};

export const useTask = () => {
  const [errors, setErrors] = useState([]);
  const {
    task,
    idTask,
    bodyTask,
    setTask,
    clearTask,
    getDefaultTask
  } = useTaskStore();

  // Query para obtener tarea
  const { isLoading, isError, error, data: tsk } = useQuery({
    queryKey: ['task', idTask],
    queryFn: () => getTask(idTask),
    staleTime: 0,
    gcTime: 0,
    enabled: !!idTask
  });

  // Mutaciones
  const taskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      clearTask();
      showAlert('success', data.meta.message);
    },
    onError: (error) => {
      showAlert('error', error.response.data.errors[0].detail);
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      clearTask();
      showAlert('success', data.meta.message);
    },
    onError: (error) => {
      showAlert('error', error.response.data.errors[0].detail);
    }
  });

  useEffect(() => {
    if (tsk) {
      setTask(tsk.data.attributes);
      useTaskStore.setState({ idTask: null });
    }
  }, [tsk, setTask]);

  useEffect(() => {
    if (error) {
      setErrors(prev => [...prev, error.response.data.errors[0].detail]);
    }
  }, [error]);

  return {
    task,
    idTask,
    bodyTask,
    isLoading,
    isError,
    error,
    errors,
    getDefaultTask,
    setTask,
    
    createTask: taskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,

    isUpdating: taskMutation.isPending || deleteTaskMutation.isPending,
    isUpdatingSuccess: taskMutation.isSuccess || deleteTaskMutation.isSuccess,
    isErrorUpdating: taskMutation.isError || deleteTaskMutation.isError,
  };
};