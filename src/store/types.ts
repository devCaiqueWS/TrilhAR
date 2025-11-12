export type Skill = { id: string; name: string; area: 'Dev' | 'Dados' | 'Produto' | 'UX' | 'Outros'; level: 0 | 1 | 2 | 3 | 4 | 5 };
export type QuizQuestion = { id: string; type: 'mcq' | 'self'; prompt: string; options?: string[]; correctIndex?: number; skillId?: string };
export type Module = { id: string; title: string; lessons?: string[] };
export type Track = { id: string; title: string; skillsTarget: string[]; level: 'Iniciante' | 'Intermediario' | 'Avancado'; modules: Module[]; progress: number; durationWeeks: number };
export type Goal = { id: string; title: string; due: string; done: boolean; trackId?: string; recurring?: 'daily' | 'weekly' };

