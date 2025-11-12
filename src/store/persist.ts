import { load, save } from '../storage/mmkv';
import { useAppStore } from './index';

type Persisted = {
  ui: { theme: 'auto' | 'light' | 'dark'; language: 'pt-BR' | 'en' | 'es' };
  profile: { level: 'Iniciante' | 'Intermediario' | 'Avancado'; area: 'Dev' | 'Dados' | 'Produto' | 'UX' | 'Outros'; goalsPerWeek: number };
  goals: { goals: Array<{ id: string; title: string; due: string; done: boolean; trackId?: string; recurring?: 'daily' | 'weekly' }> };
};

export function initPersistence() {
  const saved = load<Persisted>('app', { ui: { theme: 'auto', language: 'pt-BR' }, profile: { level: 'Iniciante', area: 'Dev', goalsPerWeek: 3 }, goals: { goals: [] } });
  useAppStore.setState({ ...saved.ui, ...saved.profile, ...saved.goals });
  useAppStore.subscribe((state) => {
    const data: Persisted = {
      ui: { theme: state.theme, language: state.language },
      profile: { level: state.level, area: state.area, goalsPerWeek: state.goalsPerWeek },
      goals: { goals: state.goals },
    };
    save('app', data);
  });
}

