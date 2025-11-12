import apiClient from '../services/apiClient';

// In React Native, MSW worker isn't available; provide simple axios-level mocks.
export function installAxiosMocks() {
  apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
      const cfg = error.config || {};
      const url = ((cfg.baseURL || '') + (cfg.url || '')) as string;
      const ok = (data: any) => ({
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: cfg,
      });
      if (url.endsWith('/courses')) {
        return ok({ data: [{ id: 'c1', title: 'React Native Básico', provider: 'TrilhAR', hours: 8, badge: 'gratuito' }] });
      }
      if (url.endsWith('/jobs')) {
        return ok({ data: [{ id: 'j1', title: 'Dev Mobile JR', company: 'ACME' }] });
      }
      const m = url.match(/\/tracks\/(\w+)/);
      if (m) {
        return ok({ id: m[1], title: 'Trilha RN Iniciante', skillsTarget: ['js', 'rn'], level: 'Iniciante', modules: [], progress: 0.42, durationWeeks: 6 });
      }
      return Promise.reject(error);
    },
  );
}
