import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10_000,
});

// Cancel support
export const createCancelToken = () => new AbortController();

// Request interceptor (auth placeholder)
apiClient.interceptors.request.use(async (config) => {
  // attach token if present in store later
  return config;
});

// Simple exponential retry on network errors (max 3)
apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const config = error.config as AxiosRequestConfig & { __retryCount?: number };
    const shouldRetry = !error.response && (!config.method || config.method.toLowerCase() !== 'get' ? false : true);
    if (shouldRetry) {
      config.__retryCount = (config.__retryCount || 0) + 1;
      if (config.__retryCount <= 3) {
        const delay = 300 * 2 ** (config.__retryCount - 1);
        await new Promise((r) => setTimeout(r, delay));
        return apiClient(config);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;

