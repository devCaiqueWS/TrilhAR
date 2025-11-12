import { StateCreator } from 'zustand';
import type { Goal } from '../types';

export type GoalsState = {
  goals: Goal[];
  addGoal: (g: Goal) => void;
  toggleGoal: (id: string) => void;
  removeGoal: (id: string) => void;
};

export const createGoalsSlice: StateCreator<GoalsState, [], [], GoalsState> = (set) => ({
  goals: [],
  addGoal: (g) => set((s) => ({ goals: [g, ...s.goals] })),
  toggleGoal: (id) => set((s) => ({ goals: s.goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)) })),
  removeGoal: (id) => set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
});

