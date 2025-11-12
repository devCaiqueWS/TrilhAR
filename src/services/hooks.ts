import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from './apiClient';
import type { Track } from '../store/types';

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

export function useTracks() {
  return useQuery({
    queryKey: ['tracks'],
    queryFn: async () => (await apiClient.get('/tracks')).data.data as Track[],
  });
}

export function useCreateTrack() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<Track> & { title: string; level: Track['level']; skillsTarget: string[]; durationWeeks: number; modules?: { title: string; lessons?: string[] }[] }) => (await apiClient.post('/tracks', payload)).data as Track,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tracks'] }),
  });
}
