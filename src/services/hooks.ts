import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => (await apiClient.get('/courses')).data.data as any[],
  });
}

export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => (await apiClient.get('/jobs')).data.data as any[],
  });
}

export function useTrack(id: string) {
  return useQuery({
    queryKey: ['track', id],
    queryFn: async () => (await apiClient.get(`/tracks/${id}`)).data,
    enabled: !!id,
  });
}

