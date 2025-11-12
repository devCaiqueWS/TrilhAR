import { StateCreator } from 'zustand';
import { loginFs } from '../../services/authFs';
import { apiLogin, apiRegister } from '../../services/authApi';
import { flags } from '../../config/flags';
import { clearAuthFromAsyncStorage, saveAuthToAsyncStorage } from '../../storage/asyncAuth';

export type AuthState = {
  token?: string;
  user?: { id: string; name: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register?: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (set) => ({
  token: undefined,
  user: null,
  login: async (email, password) => {
    if (flags.useApiMocks) {
      const user = await loginFs(email, password);
      set({ token: 'dev-token', user });
      await saveAuthToAsyncStorage('dev-token', user);
      return;
    }
    const res = await apiLogin(email, password);
    set({ token: res.token, user: res.user });
    await saveAuthToAsyncStorage(res.token, res.user);
  },
  register: async (name: string, email: string, password: string) => {
    if (flags.useApiMocks) {
      // In mock mode, simply reuse file-based signup then login
      const { signupFs } = await import('../../services/authFs');
      await signupFs({ name, email, password });
      const user = await loginFs(email, password);
      set({ token: 'dev-token', user });
      await saveAuthToAsyncStorage('dev-token', user);
      return;
    }
    const res = await apiRegister(name, email, password);
    set({ token: res.token, user: res.user });
    await saveAuthToAsyncStorage(res.token, res.user);
  },
  logout: () => {
    void clearAuthFromAsyncStorage();
    set({ token: undefined, user: null });
  },
});
