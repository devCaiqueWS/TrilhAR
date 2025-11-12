import { StateCreator } from 'zustand';

export type UIState = {
  theme: 'auto' | 'light' | 'dark';
  language: 'pt-BR' | 'en' | 'es';
  setTheme: (t: UIState['theme']) => void;
  setLanguage: (l: UIState['language']) => void;
};

export const createUISlice: StateCreator<UIState, [], [], UIState> = (set) => ({
  theme: 'auto',
  language: 'pt-BR',
  setTheme: (t) => set({ theme: t }),
  setLanguage: (l) => set({ language: l }),
});

