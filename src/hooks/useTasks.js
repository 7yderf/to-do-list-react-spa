import { useEffect } from 'react';
import {ApiService} from "@/core/services/ApiService";
import { showAlert } from '@/hooks/useAlerts'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useTasksStore } from '@/stores/tasksStore';

const getTasks = async (pageSize, pageNumber, filters) => {
  const { data } = await ApiService.get(
    `/tasks/list?per_page=${pageSize}&page=${pageNumber}${filters}`
  );
  return data;
};

export const useTasks = () => {
  const queryClient = useQueryClient();
  const {
    tasks,
    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
    filters,
    filtesParams,
    setCurrentPage,
    setFrom,
    setLastPage,
    setPerPage,
    setTo,
    setTotal,
    setTasks,
    setFilter
  } = useTasksStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tasks', currentPage, perPage, filtesParams],
    queryFn: () => getTasks(perPage, currentPage, filtesParams),
  });

  useEffect(() => {
    if (error) {
      showAlert('error', error.response.data.errors[0].detail);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      const { data: tasksData } = data;
      const { pagination } = tasksData.attributes;
      const { current_page, from, last_page, per_page, to, total } = pagination;

      setCurrentPage(current_page);
      setFrom(from);
      setLastPage(last_page);
      setPerPage(per_page);
      setTo(to);
      setTotal(total);
      setTasks(tasksData.attributes.data);
    }
  }, [data, setCurrentPage, setFrom, setLastPage, setPerPage, setTo, setTotal, setTasks]);

  const refetchTasks = () => {
    queryClient.invalidateQueries(['tasks']);
  };

  return {
    tasks,
    isLoading,
    isError,
    error,
    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
    filters,
    
    setfilter: setFilter,
    getPage: setCurrentPage,
    setPerPage: setPerPage,
    
    refetchTasks,
  };
};