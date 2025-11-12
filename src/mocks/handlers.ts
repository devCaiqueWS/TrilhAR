// Mock handlers describing endpoints and payloads
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.example.com/courses', () => HttpResponse.json({
    data: [
      { id: 'c1', title: 'React Native Básico', provider: 'TrilhAR', hours: 8, badge: 'gratuito' },
    ],
  })),
  http.get('https://api.example.com/jobs', () => HttpResponse.json({
    data: [
      { id: 'j1', title: 'Dev Mobile JR', company: 'ACME' },
    ],
  })),
  http.get('https://api.example.com/tracks/:id', ({ params }) => HttpResponse.json({
    id: params.id,
    title: 'Trilha RN Iniciante',
    skillsTarget: ['js', 'rn'],
    level: 'Iniciante',
    modules: [],
    progress: 0.42,
    durationWeeks: 6,
  })),
];

export type Course = { id: string; title: string; provider?: string; hours?: number; badge?: string };

