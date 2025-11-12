import { StateCreator } from 'zustand';
import type { QuizQuestion } from '../types';

export type QuizState = {
  questions: QuizQuestion[];
  answers: Record<string, number>;
  setQuestions: (q: QuizQuestion[]) => void;
  setAnswer: (id: string, value: number) => void;
  reset: () => void;
};

export const createQuizSlice: StateCreator<QuizState, [], [], QuizState> = (set) => ({
  questions: [],
  answers: {},
  setQuestions: (q) => set({ questions: q }),
  setAnswer: (id, value) => set((s) => ({ answers: { ...s.answers, [id]: value } })),
  reset: () => set({ answers: {}, questions: [] }),
});

