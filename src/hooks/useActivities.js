import { useQuery } from '@tanstack/react-query';
import {useEffect} from 'react'
import { ApiService } from '@/core/services/ApiService';
import { useActivitiesStore } from '@/stores/activitiesStore';

export const useActivities = () => {
  const { setActivities, activities } = useActivitiesStore();
  
  const fetchActivities = async () => {
    const {data} = await ApiService.get('/activities/list');
    return data;
  };

  const { isLoading, isError, error, data  } = useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities,
    // refetchOnMount: false, // No recargar al montar el componente
  });

  useEffect(() => {
    if (data) {
      setActivities(data.data.attributes);
    }
  }, [data, setActivities]);
  

  return {
    activities,
    isLoading,
    isError,
    error
  };
};