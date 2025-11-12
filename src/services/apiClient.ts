import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Platform, NativeModules } from 'react-native';
import { flags } from '../config/flags';
import { useAppStore } from '../store';

function resolveBaseURL() {
  // On Web, prefer current page host (avoids using Android-specific 10.0.2.2)
  if (Platform.OS === 'web') {
    try {
      const host = (globalThis as any)?.location?.hostname || 'localhost';
      const proto = (globalThis as any)?.location?.protocol || 'http:';
      return `${proto}//${host}:8080`;
    } catch {
      return 'http://localhost:8080';
    }
  }
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
  // No explicit base: try to use dev host from Metro/Expo packager when it's an IP or localhost
  if (devHost) {
    const isIP = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(devHost);
    const isLocal = devHost === 'localhost' || devHost === '127.0.0.1';
    if (isIP || isLocal) {
      return `http://${devHost}:8080`;
    }
    // Ignore exp.host / u.expo.dev or other domains used in Tunnel mode
  }
  return Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';
}

const apiClient: AxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
  timeout: 10_000,
});

if (__DEV__) {
  // Helpful to diagnose Network Error due to wrong host
  // eslint-disable-next-line no-console
  console.log('[api] baseURL:', apiClient.defaults.baseURL);
}

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
