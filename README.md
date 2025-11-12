# TrilhAR — Mobile (Expo React Native)

Aplicativo mobile para planejamento de estudos e trilhas de carreira. Usa React Navigation, Zustand, React Query e Axios. Integra com uma API Spring Boot (JWT) para autenticação, metas, trilhas e catálogo.

## 🔗 API Backend

- Repositório: https://github.com/MatheusCosta616/API-GS-MOBILE
- Como subir a API (Docker Compose):
  - `docker-compose up --build`
  - API em: `http://localhost:8080`

### Endpoints utilizados
- Auth: `POST /auth/register`, `POST /auth/login`
- Goals: `GET /goals`, `POST /goals`, `DELETE /goals/{id}`
  - Observação: a API não possui rota de update; o toggle de “done” é local (cache) para manter a UX.
- Tracks: `GET /tracks`, `GET /tracks/{id}`, `POST /tracks`
- Catálogo: `GET /courses`, `GET /jobs`

## 🚀 Executando o App

Pré‑requisitos
- Node 18+, npm ou pnpm
- Expo CLI (opcional) e um dispositivo/emulador (Android/iOS) ou Web

Passos
1. Instale dependências: `npm install`
2. Inicie: `npm start` (Expo)
3. Escolha a plataforma: `a` (Android), `i` (iOS), `w` (Web)

Base URL (src/config/flags.ts)
- `useApiMocks: false` (por padrão, app usa a API real)
- `apiBaseURL`: 
  - Emulador Android: `http://10.0.2.2:8080`
  - iOS simulador: `http://localhost:8080`
  - Dispositivo físico: `http://SEU_IP_LOCAL:8080` (use “LAN” no Expo)

Dicas de rede
- Se ocorrer “Network Error” no dispositivo:
  - Garanta que o celular e o PC estão na mesma rede.
  - Verifique o firewall liberando a porta 8080.
  - No Android via USB: `adb reverse tcp:8080 tcp:8080`.
  - Limpe cache do Expo: `expo start -c`.

## 📱 Funcionalidades

- Navegação
  - 5+ telas com abas (Home, Tracks, Quiz, Explore, Profile) e telas extras (Goals, Settings, Certifications, TrackDetail, TrackBuilder, Onboarding/Login/Signup).
- Autenticação (JWT)
  - Registro e login via API (`/auth/register` e `/auth/login`).
  - Token é enviado automaticamente no header Authorization (Axios interceptor).
  - Persistência de sessão (MMKV) e espelho em AsyncStorage.
- Metas (Goals)
  - Listagem (`GET /goals`) e criação (`POST /goals`).
  - Exclusão (`DELETE /goals/{id}`).
  - Alternar “done”: atualização local (não há rota de update).
- Trilhas (Tracks)
  - Lista (`GET /tracks`), detalhe (`GET /tracks/{id}`) e criação (`POST /tracks`).
  - Builder calcula duração estimada (com base em horas/semana) e cria a trilha.
- Catálogo (Explore)
  - Cursos (`GET /courses`) e Vagas (`GET /jobs`).
- Perfil e Configurações
  - Card com iniciais, nível, área e metas/semana; troca de tema e idioma.
  - Botões de voltar nas telas modais (Settings, Certifications).
- Identidade visual
  - Cores/espacamentos centralizados em `src/theme/tokens.ts` e logo/ícone próprios.
- Acessibilidade e feedbacks
  - Loaders, alerts, toasts e roles/labels em botões essenciais.

## 🧩 Arquitetura

- `src/services/apiClient.ts`: Axios com base dinâmica e Bearer token.
- `src/services/authApi.ts`: chamadas de auth (login/register).
- `src/services/goals.ts` e `src/services/hooks.ts`: React Query hooks (Goals/Tracks/Courses/Jobs).
- `src/store/` (Zustand): slices de auth, perfil, UI, etc. Persistência em `src/store/persist.ts`.
- `src/storage/mmkv.ts` e `src/storage/asyncAuth.ts`: persistência (MMKV) e espelho no AsyncStorage.
- `src/navigation/*`: AppNavigator, tabs e Onboarding.
- `src/screens/*`: telas organizadas por domínio.
- `src/components/*`: componentes reutilizáveis (Header, Buttons, Cards, etc.).

## 🔧 Comandos úteis

- Iniciar app: `npm start`
- Android: `npm run android`
- iOS: `npm run ios`
- Web: `npm run web`

## 🎥 Vídeo da Entrega

- Link do vídeo (a ser adicionado aqui):
  - [placeholder]

## 🧪 Troubleshooting

- Veja no console a linha `[api] baseURL:` para confirmar o endereço alvo.
- Se a tela de splash travar, o app oculta o splash no primeiro layout (fallback de tempo incluso).

---

Sinta-se à vontade para abrir issues e sugestões de melhoria.

