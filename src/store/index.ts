import { create } from 'zustand';
import { createAuthSlice, type AuthState } from './slices/authSlice';
import { createProfileSlice, type ProfileState } from './slices/profileSlice';
import { createQuizSlice, type QuizState } from './slices/quizSlice';
import { createSkillsSlice, type SkillsState } from './slices/skillsSlice';
import { createTracksSlice, type TracksState } from './slices/tracksSlice';
import { createGoalsSlice, type GoalsState } from './slices/goalsSlice';
import { createUISlice, type UIState } from './slices/uiSlice';

export type AppState = AuthState & ProfileState & QuizState & SkillsState & TracksState & GoalsState & UIState;

export const useAppStore = create<AppState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createProfileSlice(...a),
  ...createQuizSlice(...a),
  ...createSkillsSlice(...a),
  ...createTracksSlice(...a),
  ...createGoalsSlice(...a),
  ...createUISlice(...a),
}));

