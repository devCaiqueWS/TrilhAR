export const flags = {
  enableAR: false,
  enableCertsInternal: false,
  // Toggle API mocks. When false, app uses real backend via axios.
  useApiMocks: false,
  // Default API base; Platform-specific override computed in apiClient
  apiBaseURL: 'http://localhost:8080',
};
