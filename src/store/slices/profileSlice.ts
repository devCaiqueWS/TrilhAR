import { StateCreator } from 'zustand';

export type ProfileState = {
  level: 'Iniciante' | 'Intermediario' | 'Avancado';
  area: 'Dev' | 'Dados' | 'Produto' | 'UX' | 'Outros';
  goalsPerWeek: number;
  setProfile: (p: Partial<ProfileState>) => void;
};

export const createProfileSlice: StateCreator<ProfileState, [], [], ProfileState> = (set) => ({
  level: 'Iniciante',
  area: 'Dev',
  goalsPerWeek: 3,
  setProfile: (p) => set((s) => ({ ...s, ...p })),
});

