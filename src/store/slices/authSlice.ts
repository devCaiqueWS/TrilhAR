import { StateCreator } from 'zustand';

export type AuthState = {
  token?: string;
  user?: { id: string; name: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (set) => ({
  token: undefined,
  user: null,
  login: async (email, _password) => {
    // mock login
    set({ token: 'dev-token', user: { id: 'u1', name: email.split('@')[0], email } });
  },
  logout: () => set({ token: undefined, user: null }),
});

