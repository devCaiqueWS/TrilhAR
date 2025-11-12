import { load, save } from '../storage/mmkv';
import { loadAuthFromAsyncStorage, saveAuthToAsyncStorage } from '../storage/asyncAuth';
import { useAppStore } from './index';

type Persisted = {
  ui: { theme: 'auto' | 'light' | 'dark'; language: 'pt-BR' | 'en' | 'es' };
  profile: { level: 'Iniciante' | 'Intermediario' | 'Avancado'; area: 'Dev' | 'Dados' | 'Produto' | 'UX' | 'Outros'; goalsPerWeek: number };
  goals: { goals: Array<{ id: string; title: string; due: string; done: boolean; trackId?: string; recurring?: 'daily' | 'weekly' }> };
  auth: { token?: string; user?: { id: string; name: string; email: string } | null };
};

export async function initPersistence() {
  const saved = load<Persisted>('app', {
    ui: { theme: 'auto', language: 'pt-BR' },
    profile: { level: 'Iniciante', area: 'Dev', goalsPerWeek: 3 },
    goals: { goals: [] },
    auth: { token: undefined, user: null },
  });
  useAppStore.setState({ ...saved.ui, ...saved.profile, ...saved.goals, ...saved.auth });
  // Optionally hydrate auth from AsyncStorage if MMKV had nothing
  try {
    const fromAS = await loadAuthFromAsyncStorage();
    if (fromAS?.token && !useAppStore.getState().token) {
      useAppStore.setState({ token: fromAS.token, user: fromAS.user || null });
    }
  } catch {}
  useAppStore.subscribe((state) => {
    const data: Persisted = {
      ui: { theme: state.theme, language: state.language },
      profile: { level: state.level, area: state.area, goalsPerWeek: state.goalsPerWeek },
      goals: { goals: state.goals },
      auth: { token: state.token, user: state.user },
    };
    save('app', data);
    // Mirror auth into AsyncStorage for compatibility
    void saveAuthToAsyncStorage(state.token, state.user);
  });
}
