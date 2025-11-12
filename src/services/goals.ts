import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from './apiClient';
import type { Goal } from '../store/types';

const GOALS_KEY = ['goals'];

export function useGoals() {
  return useQuery({
    queryKey: GOALS_KEY,
    queryFn: async () => (await apiClient.get('/goals')).data.data as Goal[],
  });
}

export function useCreateGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Pick<Goal, 'title' | 'due'>) => (await apiClient.post('/goals', payload)).data as Goal,
    onSuccess: () => qc.invalidateQueries({ queryKey: GOALS_KEY }),
  });
}

export function useToggleGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, done }: { id: string; done: boolean }) => {
      try {
        return (await apiClient.patch(`/goals/${id}`, { done })).data as Goal;
      } catch (e: any) {
        // fallback to PUT if PATCH not supported
        return (await apiClient.put(`/goals/${id}`, { done })).data as Goal;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: GOALS_KEY }),
  });
}

export function useDeleteGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/goals/${id}`);
      return id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: GOALS_KEY }),
  });
}
