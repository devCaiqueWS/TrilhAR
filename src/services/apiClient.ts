import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Platform, NativeModules } from 'react-native';
import { flags } from '../config/flags';
import { useAppStore } from '../store';

function resolveBaseURL() {
  const scriptURL: string | undefined = (NativeModules as any)?.SourceCode?.scriptURL;
  const devHost = (() => {
    if (!scriptURL) return null;
    try {
      const m = scriptURL.match(/^https?:\/\/([^/:]+)(?::\d+)?\//);
      return m?.[1] || null;
    } catch {
      return null;
    }
  })();

  if (flags.apiBaseURL) {
    if (Platform.OS === 'android') {
      // Android emulator can't reach localhost directly
      if (flags.apiBaseURL.includes('localhost')) return flags.apiBaseURL.replace('localhost', '10.0.2.2');
    }
    return flags.apiBaseURL;
  }
  // No explicit base: try to use dev host from Metro/Expo packager
  if (devHost) {
    return `http://${devHost}:8080`;
  }
  return Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';
}

const apiClient: AxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
  timeout: 10_000,
});

// Cancel support
export const createCancelToken = () => new AbortController();

// Request interceptor (attach Authorization header when available)
apiClient.interceptors.request.use(async (config) => {
  const token = useAppStore.getState().token;
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
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
    // Optional: auto-logout on 401
    if (error.response?.status === 401) {
      try {
        useAppStore.getState().logout?.();
      } catch {}
    }
    return Promise.reject(error);
  },
);

export default apiClient;
