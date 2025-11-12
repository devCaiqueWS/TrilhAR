// Try MMKV; if not available (Expo Go), fallback to in-memory store.
let storage: { set: (k: string, v: string) => void; getString: (k: string) => string | undefined };
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { MMKV } = require('react-native-mmkv');
  storage = new MMKV();
} catch {
  const mem = new Map<string, string>();
  storage = {
    set: (k: string, v: string) => mem.set(k, v),
    getString: (k: string) => mem.get(k),
  };
}

export { storage };

export function save<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export function load<T>(key: string, fallback: T): T {
  const v = storage.getString(key);
  if (!v) return fallback;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}
