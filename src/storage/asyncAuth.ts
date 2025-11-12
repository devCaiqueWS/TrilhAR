// Optional AsyncStorage helper: saves auth to AsyncStorage when available
// without adding a hard dependency for environments where the package
// isn't installed. Falls back to no-ops when unavailable.

type AuthUser = { id: string; name: string; email: string } | null | undefined;

function getAsyncStorage(): any | null {
  try {
    // Use eval to avoid Metro static resolution when the package is missing
    // eslint-disable-next-line no-eval
    const mod = eval('require')('@react-native-async-storage/async-storage');
    return mod?.default || mod;
  } catch {
    return null;
  }
}

export async function saveAuthToAsyncStorage(token?: string, user?: AuthUser) {
  const AsyncStorage = getAsyncStorage();
  if (!AsyncStorage) return;
  try {
    if (token) await AsyncStorage.setItem('auth_token', token);
    if (user !== undefined) await AsyncStorage.setItem('auth_user', JSON.stringify(user));
  } catch {}
}

export async function loadAuthFromAsyncStorage(): Promise<{ token?: string; user?: AuthUser } | null> {
  const AsyncStorage = getAsyncStorage();
  if (!AsyncStorage) return null;
  try {
    const [token, userStr] = await Promise.all([
      AsyncStorage.getItem('auth_token'),
      AsyncStorage.getItem('auth_user'),
    ]);
    return { token: token || undefined, user: userStr ? (JSON.parse(userStr) as AuthUser) : undefined };
  } catch {
    return null;
  }
}

export async function clearAuthFromAsyncStorage() {
  const AsyncStorage = getAsyncStorage();
  if (!AsyncStorage) return;
  try {
    await Promise.all([
      AsyncStorage.removeItem('auth_token'),
      AsyncStorage.removeItem('auth_user'),
    ]);
  } catch {}
}

