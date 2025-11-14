// Use standard API; deprecation warnings are acceptable for mocks.
import * as FileSystem from 'expo-file-system';
// Use require to avoid TS resolveJsonModule requirement
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultUsers = require('../mocks/users.json') as RawUser[];

export type RawUser = { id: string; name: string; email: string; password: string };

// Newer expo-file-system types may not expose documentDirectory on the module type in TS.
// Use a loose accessor to avoid type errors while keeping runtime behavior.
const FS: any = FileSystem as any;
const USERS_FILE = `${(FS.documentDirectory || FS.cacheDirectory || '') as string}users.json`;

// In-memory fallback when FS writes are unavailable (e.g., Web)
let volatileUsers: RawUser[] = [];

function mergeUsers(persisted: RawUser[]): RawUser[] {
  const map = new Map<string, RawUser>();
  // order gives precedence to volatile users to reflect latest signup
  for (const u of [...persisted, ...volatileUsers]) {
    map.set(u.email.toLowerCase(), u);
  }
  return Array.from(map.values());
}

async function ensureUsersFile() {
  try {
    const info = await FileSystem.getInfoAsync(USERS_FILE);
    if (!info.exists) {
      await FileSystem.writeAsStringAsync(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
    }
  } catch (e) {
    // If FS isn't ready or on web, we just fall back to bundled defaults on reads
  }
}

export async function readUsers(): Promise<RawUser[]> {
  await ensureUsersFile();
  try {
    const info = await FileSystem.getInfoAsync(USERS_FILE);
    if (!info.exists) return mergeUsers(defaultUsers as RawUser[]);
    const content = await FileSystem.readAsStringAsync(USERS_FILE);
    const data = JSON.parse(content) as RawUser[];
    const safe = Array.isArray(data) ? data : (defaultUsers as RawUser[]);
    return mergeUsers(safe);
  } catch {
    return mergeUsers(defaultUsers as RawUser[]);
  }
}

async function writeUsers(users: RawUser[]) {
  await ensureUsersFile();
  try {
    await FileSystem.writeAsStringAsync(USERS_FILE, JSON.stringify(users, null, 2));
    // If we successfully wrote to disk, clear volatile cache
    volatileUsers = [];
  } catch {
    // Fallback to in-memory cache in unsupported envs (e.g., Web)
    volatileUsers = users;
  }
}

export async function signupFs(payload: { name: string; email: string; password: string }) {
  const users = await readUsers();
  const exists = users.some((u) => u.email.toLowerCase() === payload.email.trim().toLowerCase());
  if (exists) throw new Error('E-mail já cadastrado');
  const user: RawUser = {
    id: `u${Date.now()}`,
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
  };
  await writeUsers([user, ...users]);
  return { id: user.id, name: user.name, email: user.email };
}

export async function loginFs(email: string, password: string) {
  const users = await readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
  if (!user) throw new Error('Credenciais inválidas');
  return { id: user.id, name: user.name, email: user.email };
}
