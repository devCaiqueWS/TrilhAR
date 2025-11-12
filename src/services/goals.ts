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
    mutationFn: async (payload: Pick<Goal, 'title' | 'due'>) => {
      try {
        return (await apiClient.post('/goals', payload)).data as Goal;
      } catch (e: any) {
        const local: Goal = {
          id: `local-${Date.now()}`,
          title: payload.title,
          due: payload.due,
          done: false,
        } as Goal;
        const prev = (qc.getQueryData(GOALS_KEY) as Goal[] | undefined) || [];
        qc.setQueryData(GOALS_KEY, [local, ...prev]);
        return local;
      }
    },
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
        try {
          return (await apiClient.put(`/goals/${id}`, { done })).data as Goal;
        } catch {
          const current = ((qc.getQueryData(GOALS_KEY) as Goal[] | undefined) || []).map((g) =>
            g.id === id ? { ...g, done } : g,
          );
          qc.setQueryData(GOALS_KEY, current);
          const updated = current.find((g) => g.id === id);
          return updated as Goal;
        }
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: GOALS_KEY }),
  });
}

export function useDeleteGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await apiClient.delete(`/goals/${id}`);
        return id;
      } catch {
        const prev = (qc.getQueryData(GOALS_KEY) as Goal[] | undefined) || [];
        qc.setQueryData(GOALS_KEY, prev.filter((g) => g.id !== id));
        return id;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: GOALS_KEY }),
  });
}
