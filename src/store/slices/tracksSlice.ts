import { StateCreator } from 'zustand';
import type { Track } from '../types';

export type TracksState = {
  tracks: Track[];
  activeTrackId?: string;
  setTracks: (t: Track[]) => void;
  setActive: (id?: string) => void;
};

export const createTracksSlice: StateCreator<TracksState, [], [], TracksState> = (set) => ({
  tracks: [],
  activeTrackId: undefined,
  setTracks: (t) => set({ tracks: t }),
  setActive: (id) => set({ activeTrackId: id }),
});

