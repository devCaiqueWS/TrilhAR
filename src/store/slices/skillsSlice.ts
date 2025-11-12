import { StateCreator } from 'zustand';
import type { Skill } from '../types';

export type SkillsState = {
  skills: Skill[];
  setSkills: (s: Skill[]) => void;
};

export const createSkillsSlice: StateCreator<SkillsState, [], [], SkillsState> = (set) => ({
  skills: [],
  setSkills: (skills) => set({ skills }),
});

