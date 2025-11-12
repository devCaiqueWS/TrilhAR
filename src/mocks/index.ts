import apiClient from '../services/apiClient';
import type { Goal } from '../store/types';

// In-memory DB for mock endpoints
const mockDb: { goals: Goal[] } = {
  goals: [
    { id: 'g1', title: 'Estudar RN 30 min', due: new Date().toISOString(), done: false },
    { id: 'g2', title: 'Ler docs React Query', due: new Date().toISOString(), done: true },
  ],
};

// In React Native, MSW worker isn't available; provide simple axios-level mocks.
export function installAxiosMocks() {
  apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
      const cfg = error?.config || {};
      const url = String((cfg.baseURL || '') + (cfg.url || ''));
      const method = String(cfg.method || 'get').toLowerCase();
      const parse = () => {
        try {
          return typeof cfg.data === 'string' ? JSON.parse(cfg.data) : cfg.data || {};
        } catch {
          return {} as any;
        }
      };
      const ok = (data: any, status = 200) => ({
        data,
        status,
        statusText: 'OK',
        headers: {},
        config: cfg,
      });

      // READ samples
      if (method === 'get' && url.endsWith('/courses')) {
        return ok({ data: [{ id: 'c1', title: 'React Native Básico', provider: 'TrilhAR', hours: 8, badge: 'gratuito' }] });
      }
      if (method === 'get' && url.endsWith('/jobs')) {
        return ok({ data: [{ id: 'j1', title: 'Dev Mobile JR', company: 'ACME' }] });
      }
      const trackMatch = url.match(/\/tracks\/([^/]+)/);
      if (method === 'get' && trackMatch) {
        return ok({ id: trackMatch[1], title: 'Trilha RN Iniciante', skillsTarget: ['js', 'rn'], level: 'Iniciante', modules: [], progress: 0.42, durationWeeks: 6 });
      }

      // Goals CRUD
      if (url.endsWith('/goals') && method === 'get') {
        return ok({ data: mockDb.goals });
      }
      if (url.endsWith('/goals') && method === 'post') {
        const body = parse() as Partial<Goal>;
        const title = (body.title || '').toString().trim();
        if (!title || title.length < 3) {
          return Promise.reject({ ...error, response: { status: 400, data: { message: 'Título muito curto' } } });
        }
        const g: Goal = {
          id: `g${Date.now()}`,
          title,
          due: body.due || new Date().toISOString(),
          done: false,
        };
        mockDb.goals = [g, ...mockDb.goals];
        return ok(g, 201);
      }
      const goalId = url.match(/\/goals\/([^/]+)/)?.[1];
      if (goalId && method === 'patch') {
        const body = parse() as Partial<Goal>;
        const idx = mockDb.goals.findIndex((x) => x.id === goalId);
        if (idx === -1) return Promise.reject({ ...error, response: { status: 404, data: { message: 'Goal não encontrada' } } });
        mockDb.goals[idx] = { ...mockDb.goals[idx], ...body } as Goal;
        return ok(mockDb.goals[idx]);
      }
      if (goalId && method === 'delete') {
        const before = mockDb.goals.length;
        mockDb.goals = mockDb.goals.filter((g) => g.id !== goalId);
        if (mockDb.goals.length === before) return Promise.reject({ ...error, response: { status: 404, data: { message: 'Goal não encontrada' } } });
        return ok({}, 204);
      }

      return Promise.reject(error);
    },
  );
}

