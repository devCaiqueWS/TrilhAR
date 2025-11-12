import { StateCreator } from 'zustand';
import { loginFs } from '../../services/authFs';

export type AuthState = {
  token?: string;
  user?: { id: string; name: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (set) => ({
  token: undefined,
  user: null,
  login: async (email, password) => {
    const user = await loginFs(email, password);
    // Store a simple mock token and the user; persistence layer will save it
    set({ token: 'dev-token', user });
  },
  logout: () => set({ token: undefined, user: null }),
});
