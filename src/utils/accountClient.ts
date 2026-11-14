import { AgeTrack } from '../data/missions';
import type { ExplorerUserProfile } from '../components/AuthModal';

export interface UserProgressData {
  ageTrack: AgeTrack;
  unlockedBadges: string[];
  exploredMissionIds: string[];
  isMysterySolved: boolean;
  dictionaryOpenCount: number;
  exploredJargonTerms: string[];
  activeDates: string[];
}

interface AuthSessionResult {
  user: ExplorerUserProfile;
  progress: UserProgressData;
}

const SESSION_TOKEN_KEY = 'space_legacy_session_token_v1';
const GUEST_PROGRESS_KEY = 'space_legacy_guest_progress_v1';
const STATIC_SESSION_KEY = 'space_legacy_static_session_v1';
const STATIC_VAULT_PREFIX = 'space_legacy_enc_vault_v1_';

const LEGACY_SHARED_KEYS = [
  'space_legacy_user_v3',
  'space_legacy_badges_v3',
  'space_legacy_explored_v3',
  'space_legacy_track_v3',
  'space_legacy_mystery_v3',
];

export function purgeLegacySharedStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    for (const key of LEGACY_SHARED_KEYS) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Ignore storage access errors
  }
}

export function getTodayIsoDate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function createEmptyProgress(ageTrack: AgeTrack = 'junior'): UserProgressData {
  return {
    ageTrack,
    unlockedBadges: [],
    exploredMissionIds: [],
    isMysterySolved: false,
    dictionaryOpenCount: 0,
    exploredJargonTerms: [],
    activeDates: [],
  };
}

function sanitizeProgress(
  raw?: Partial<UserProgressData> | null
): UserProgressData {
  const track: AgeTrack =
    raw?.ageTrack === 'cadet' || raw?.ageTrack === 'scientist'
      ? raw.ageTrack
      : 'junior';
  const uniq = (val: unknown): string[] =>
    Array.isArray(val)
      ? Array.from(new Set(val.filter((item): item is string => typeof item === 'string')))
      : [];

  return {
    ageTrack: track,
    unlockedBadges: uniq(raw?.unlockedBadges),
    exploredMissionIds: uniq(raw?.exploredMissionIds),
    isMysterySolved: Boolean(raw?.isMysterySolved),
    dictionaryOpenCount:
      typeof raw?.dictionaryOpenCount === 'number' && raw.dictionaryOpenCount >= 0
        ? Math.floor(raw.dictionaryOpenCount)
        : 0,
    exploredJargonTerms: uniq(raw?.exploredJargonTerms),
    activeDates: uniq(raw?.activeDates),
  };
}

function computeConsecutiveDays(dates: string[]): number {
  if (dates.length === 0) return 0;
  const dateSet = new Set(dates);
  const today = getTodayIsoDate();
  const cursor = new Date(`${today}T12:00:00`);
  if (!dateSet.has(today)) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  while (true) {
    const y = cursor.getFullYear();
    const m = String(cursor.getMonth() + 1).padStart(2, '0');
    const d = String(cursor.getDate()).padStart(2, '0');
    const iso = `${y}-${m}-${d}`;
    if (!dateSet.has(iso)) break;
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function computeStreakCount(progress: UserProgressData): number {
  const hasActivity =
    progress.unlockedBadges.length > 0 ||
    progress.exploredMissionIds.length > 0 ||
    progress.isMysterySolved ||
    progress.dictionaryOpenCount > 0 ||
    progress.activeDates.length > 0;
  if (!hasActivity) return 0;
  const dayStreak = computeConsecutiveDays(progress.activeDates);
  return Math.max(1, dayStreak, progress.unlockedBadges.length);
}

// ===========================================================================
// GUEST (LOGGED-OUT) SESSION STORAGE — STRICTLY ISOLATED FROM USER ACCOUNTS
// ===========================================================================
export function loadGuestProgress(): UserProgressData {
  if (typeof window === 'undefined') return createEmptyProgress();
  try {
    const raw = window.sessionStorage.getItem(GUEST_PROGRESS_KEY);
    if (!raw) return createEmptyProgress();
    return sanitizeProgress(JSON.parse(raw));
  } catch {
    return createEmptyProgress();
  }
}

export function saveGuestProgress(progress: UserProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(
      GUEST_PROGRESS_KEY,
      JSON.stringify(sanitizeProgress(progress))
    );
  } catch {
    // Ignore storage quota errors
  }
}

function clearGuestProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(GUEST_PROGRESS_KEY);
  } catch (err) {
    console.warn('Unable to clear guest session storage:', err);
  }
}

// ===========================================================================
// STATIC-HOSTING WEB CRYPTO FALLBACK (PBKDF2 + AES-256-GCM PER ACCOUNT)
// Used only if /api/auth/* backend is unavailable (e.g. pure static deployment)
// ===========================================================================
function toBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function fromBase64(b64: string): Uint8Array {
  const binary = atob(b64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function deriveAccountKey(
  password: string,
  salt: Uint8Array
): Promise<{ aesKey: CryptoKey; authHashB64: string }> {
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt as BufferSource,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    512
  );
  const allBytes = new Uint8Array(derivedBits);
  const encBytes = allBytes.slice(0, 32);
  const authBytes = allBytes.slice(32, 64);

  const aesKey = await window.crypto.subtle.importKey(
    'raw',
    encBytes,
    { name: 'AES-GCM' },
    true,
    ['encrypt', 'decrypt']
  );
  return { aesKey, authHashB64: toBase64(authBytes) };
}

interface StaticEncryptedVaultRecord {
  saltB64: string;
  authHashB64: string;
  ivB64: string;
  cipherB64: string;
}

async function encryptStaticVault(
  aesKey: CryptoKey,
  payload: AuthSessionResult
): Promise<{ ivB64: string; cipherB64: string }> {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(payload));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    encoded
  );
  return {
    ivB64: toBase64(iv),
    cipherB64: toBase64(new Uint8Array(encrypted)),
  };
}

async function decryptStaticVault(
  aesKey: CryptoKey,
  ivB64: string,
  cipherB64: string
): Promise<AuthSessionResult> {
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: fromBase64(ivB64) as BufferSource },
    aesKey,
    fromBase64(cipherB64) as BufferSource
  );
  return JSON.parse(new TextDecoder().decode(decrypted));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// ===========================================================================
// UNIFIED ACCOUNT CLIENT (SERVER-FIRST WITH ENCRYPTED STATIC FALLBACK)
// ===========================================================================
async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<{ ok: boolean; status: number; data: Record<string, unknown> } | null> {
  try {
    const token =
      typeof window !== 'undefined'
        ? window.sessionStorage.getItem(SESSION_TOKEN_KEY)
        : null;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> | undefined),
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      ...options,
      headers,
    });
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return null;
    }
    const data = (await res.json()) as Record<string, unknown>;
    return { ok: res.ok, status: res.status, data };
  } catch {
    return null;
  }
}

export async function signUpAccount(input: {
  callsign: string;
  email: string;
  password: string;
  avatarEmoji: string;
  ageTrack: AgeTrack;
}): Promise<AuthSessionResult> {
  const apiRes = await apiFetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  });

  if (apiRes) {
    if (!apiRes.ok) {
      throw new Error(
        typeof apiRes.data.error === 'string'
          ? apiRes.data.error
          : 'Unable to create explorer account.'
      );
    }
    const token = apiRes.data.token as string;
    const user = apiRes.data.user as ExplorerUserProfile;
    const progress = sanitizeProgress(
      apiRes.data.progress as Partial<UserProgressData>
    );
    window.sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    clearGuestProgress();
    return { user, progress };
  }

  // Static deployment fallback
  const emailNorm = input.email.trim().toLowerCase();
  if (input.callsign.trim().length < 2) {
    throw new Error('Explorer callsign must be at least 2 characters long.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNorm)) {
    throw new Error('Please enter a valid email address.');
  }
  if (input.password.length < 6) {
    throw new Error(
      'Mission passcode must be at least 6 characters for account privacy.'
    );
  }

  const vaultKey = STATIC_VAULT_PREFIX + (await sha256Hex(emailNorm));
  if (window.localStorage.getItem(vaultKey)) {
    throw new Error(
      'An explorer account with this email already exists. Please use Log In instead.'
    );
  }

  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const { aesKey, authHashB64 } = await deriveAccountKey(input.password, salt);

  const user: ExplorerUserProfile = {
    id: `usr_${await sha256Hex(emailNorm + Date.now())}`,
    callsign: input.callsign.trim(),
    email: emailNorm,
    avatarEmoji: input.avatarEmoji,
    ageTrack: input.ageTrack,
    joinedDate: new Date().toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    }),
  };
  const progress = createEmptyProgress(input.ageTrack);
  const { ivB64, cipherB64 } = await encryptStaticVault(aesKey, {
    user,
    progress,
  });

  const record: StaticEncryptedVaultRecord = {
    saltB64: toBase64(salt),
    authHashB64,
    ivB64,
    cipherB64,
  };
  window.localStorage.setItem(vaultKey, JSON.stringify(record));

  const aesJwk = await window.crypto.subtle.exportKey('jwk', aesKey);
  window.sessionStorage.setItem(
    STATIC_SESSION_KEY,
    JSON.stringify({ vaultKey, user, progress, aesJwk })
  );
  clearGuestProgress();
  return { user, progress };
}

export async function loginAccount(input: {
  email: string;
  password: string;
}): Promise<AuthSessionResult> {
  const apiRes = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  });

  if (apiRes) {
    if (!apiRes.ok) {
      throw new Error(
        typeof apiRes.data.error === 'string'
          ? apiRes.data.error
          : 'Invalid email address or mission passcode.'
      );
    }
    const token = apiRes.data.token as string;
    const user = apiRes.data.user as ExplorerUserProfile;
    const progress = sanitizeProgress(
      apiRes.data.progress as Partial<UserProgressData>
    );
    window.sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    clearGuestProgress();
    return { user, progress };
  }

  // Static deployment fallback
  const emailNorm = input.email.trim().toLowerCase();
  const vaultKey = STATIC_VAULT_PREFIX + (await sha256Hex(emailNorm));
  const rawRecord = window.localStorage.getItem(vaultKey);
  if (!rawRecord) {
    throw new Error('Invalid email address or mission passcode.');
  }

  let parsedRecord: StaticEncryptedVaultRecord;
  try {
    parsedRecord = JSON.parse(rawRecord);
  } catch {
    throw new Error('Invalid email address or mission passcode.');
  }

  const salt = fromBase64(parsedRecord.saltB64);
  const { aesKey, authHashB64 } = await deriveAccountKey(input.password, salt);
  if (!constantTimeEqual(authHashB64, parsedRecord.authHashB64)) {
    throw new Error('Invalid email address or mission passcode.');
  }

  const unlocked = await decryptStaticVault(
    aesKey,
    parsedRecord.ivB64,
    parsedRecord.cipherB64
  );
  const progress = sanitizeProgress(unlocked.progress);

  const aesJwk = await window.crypto.subtle.exportKey('jwk', aesKey);
  window.sessionStorage.setItem(
    STATIC_SESSION_KEY,
    JSON.stringify({
      vaultKey,
      user: unlocked.user,
      progress,
      aesJwk,
    })
  );
  clearGuestProgress();
  return { user: unlocked.user, progress };
}

export async function restoreActiveSession(): Promise<AuthSessionResult | null> {
  if (typeof window === 'undefined') return null;
  purgeLegacySharedStorage();

  const token = window.sessionStorage.getItem(SESSION_TOKEN_KEY);
  if (token) {
    const apiRes = await apiFetch('/api/auth/session', { method: 'GET' });
    if (apiRes) {
      if (apiRes.ok) {
        return {
          user: apiRes.data.user as ExplorerUserProfile,
          progress: sanitizeProgress(
            apiRes.data.progress as Partial<UserProgressData>
          ),
        };
      }
      window.sessionStorage.removeItem(SESSION_TOKEN_KEY);
      return null;
    }
  }

  const staticRaw = window.sessionStorage.getItem(STATIC_SESSION_KEY);
  if (staticRaw) {
    try {
      const parsed = JSON.parse(staticRaw);
      if (parsed?.user && parsed?.progress) {
        return {
          user: parsed.user as ExplorerUserProfile,
          progress: sanitizeProgress(parsed.progress),
        };
      }
    } catch {
      window.sessionStorage.removeItem(STATIC_SESSION_KEY);
    }
  }

  return null;
}

export async function saveAuthenticatedProgress(
  progress: UserProgressData
): Promise<void> {
  if (typeof window === 'undefined') return;
  const sanitized = sanitizeProgress(progress);

  const token = window.sessionStorage.getItem(SESSION_TOKEN_KEY);
  if (token) {
    await apiFetch('/api/auth/progress', {
      method: 'PUT',
      body: JSON.stringify({ progress: sanitized }),
    });
    return;
  }

  const staticRaw = window.sessionStorage.getItem(STATIC_SESSION_KEY);
  if (staticRaw) {
    try {
      const sessionObj = JSON.parse(staticRaw);
      const vaultKey = sessionObj.vaultKey as string;
      const existingRaw = window.localStorage.getItem(vaultKey);
      if (!existingRaw) return;
      const existing: StaticEncryptedVaultRecord = JSON.parse(existingRaw);
      const aesKey = await window.crypto.subtle.importKey(
        'jwk',
        sessionObj.aesJwk,
        { name: 'AES-GCM' },
        false,
        ['encrypt', 'decrypt']
      );
      const nextUser: ExplorerUserProfile = {
        ...sessionObj.user,
        ageTrack: sanitized.ageTrack,
      };
      const encrypted = await encryptStaticVault(aesKey, {
        user: nextUser,
        progress: sanitized,
      });
      window.localStorage.setItem(
        vaultKey,
        JSON.stringify({
          ...existing,
          ...encrypted,
        })
      );
      window.sessionStorage.setItem(
        STATIC_SESSION_KEY,
        JSON.stringify({
          ...sessionObj,
          user: nextUser,
          progress: sanitized,
        })
      );
    } catch (err) {
      console.warn('Static fallback vault encryption error:', err);
    }
  }
}

export async function verifyQuizPassOnServer(payload: {
  missionId: string;
  chapterAnswers: Record<number, number>;
  masterAnswer: number | null;
}): Promise<{ isPerfect: boolean; progress?: UserProgressData } | null> {
  const apiRes = await apiFetch('/api/verify/quiz', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!apiRes || !apiRes.ok) return null;
  return {
    isPerfect: Boolean(apiRes.data.isPerfect),
    progress: apiRes.data.progress
      ? sanitizeProgress(apiRes.data.progress as Partial<UserProgressData>)
      : undefined,
  };
}

export async function verifyMysteryOnServer(
  optionId: string
): Promise<{ isCorrect: boolean; progress?: UserProgressData } | null> {
  const apiRes = await apiFetch('/api/verify/mystery', {
    method: 'POST',
    body: JSON.stringify({ optionId }),
  });
  if (!apiRes || !apiRes.ok) return null;
  return {
    isCorrect: Boolean(apiRes.data.isCorrect),
    progress: apiRes.data.progress
      ? sanitizeProgress(apiRes.data.progress as Partial<UserProgressData>)
      : undefined,
  };
}

export async function logoutSession(): Promise<void> {
  if (typeof window === 'undefined') return;
  const token = window.sessionStorage.getItem(SESSION_TOKEN_KEY);
  if (token) {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    window.sessionStorage.removeItem(SESSION_TOKEN_KEY);
  }
  window.sessionStorage.removeItem(STATIC_SESSION_KEY);
  clearGuestProgress();
}
