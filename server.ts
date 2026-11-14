import 'dotenv/config';
import crypto from 'crypto';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { lookupAnyCosmicWord } from './src/data/cosmicDictionaryData';
import {
  ACHIEVEMENT_BADGES,
  DAILY_MYSTERY,
  MISSION_HARDWARE,
} from './src/data/missions';
import { getMissionStoryChapters } from './src/data/storyChapters';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bounded LRU-like server cache for instant repeat dictionary lookups (max 500 entries)
const MAX_DICT_CACHE_SIZE = 500;
const dictionaryCache = new Map<string, Record<string, unknown>>();

function setBoundedDictionaryCache(
  key: string,
  value: Record<string, unknown>
): void {
  if (dictionaryCache.has(key)) {
    dictionaryCache.delete(key);
  } else if (dictionaryCache.size >= MAX_DICT_CACHE_SIZE) {
    const oldestKey = dictionaryCache.keys().next().value;
    if (oldestKey !== undefined) {
      dictionaryCache.delete(oldestKey);
    }
  }
  dictionaryCache.set(key, value);
}

// Sliding-window IP rate limiter to protect API & upstream proxy endpoints
function createRateLimiter(options: { windowMs: number; max: number }) {
  const hits = new Map<string, number[]>();

  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const now = Date.now();
    const clientIp =
      req.ip || req.socket.remoteAddress || 'unknown';
    const windowStart = now - options.windowMs;
    const recent = (hits.get(clientIp) || []).filter((ts) => ts > windowStart);

    if (recent.length >= options.max) {
      const retryAfterSec = Math.max(
        1,
        Math.ceil((recent[0] + options.windowMs - now) / 1000)
      );
      res.setHeader('Retry-After', String(retryAfterSec));
      res.status(429).json({
        error: 'Too many requests. Please wait a moment and try again.',
      });
      return;
    }

    recent.push(now);
    hits.set(clientIp, recent);

    // Opportunistically prune stale IPs if map grows large
    if (hits.size > 2000) {
      for (const [ip, timestamps] of hits.entries()) {
        if (timestamps.every((ts) => ts <= windowStart)) {
          hits.delete(ip);
        }
      }
    }

    next();
  };
}

// Canonical allowlists derived directly from mission & badge definitions
const VALID_MISSION_IDS = new Set(MISSION_HARDWARE.map((m) => m.id));
const MOON_MISSION_IDS = MISSION_HARDWARE.filter(
  (m) => m.destination === 'moon'
).map((m) => m.id);
const MARS_MISSION_IDS = MISSION_HARDWARE.filter(
  (m) => m.destination === 'mars'
).map((m) => m.id);
const DEEP_SPACE_MISSION_IDS = MISSION_HARDWARE.filter(
  (m) => m.destination === 'deep space'
).map((m) => m.id);
const VALID_BADGE_IDS = new Set(ACHIEVEMENT_BADGES.map((b) => b.id));
const VALID_AVATAR_EMOJIS = new Set([
  '👩‍🚀',
  '🧑‍🚀',
  '🚀',
  '🛰️',
  '🪐',
  '🤖',
  '🔭',
  '🌕',
]);
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Confidential Per-User Account Vault & Session Store (.data/)
const DATA_DIR = path.join(__dirname, '.data');
const VAULT_FILE = path.join(DATA_DIR, 'accounts-vault.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const KEY_FILE = path.join(DATA_DIR, '.vault-key');

type AgeTrack = 'junior' | 'cadet' | 'scientist';

interface StoredUserProgress {
  ageTrack: AgeTrack;
  unlockedBadges: string[];
  exploredMissionIds: string[];
  isMysterySolved: boolean;
  dictionaryOpenCount: number;
  exploredJargonTerms: string[];
  activeDates: string[];
}

interface StoredUserProfile {
  id: string;
  callsign: string;
  email: string;
  avatarEmoji: string;
  ageTrack: AgeTrack;
  joinedDate: string;
}

interface EncryptedVaultRecord {
  userId: string;
  passwordSalt: string;
  passwordHash: string;
  iv: string;
  authTag: string;
  encryptedPayload: string;
  createdAt: string;
}

interface SessionRecord {
  userId: string;
  expiresAt: number;
}

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o700 });
  }
}

function getVaultMasterKey(): Buffer {
  if (process.env.ACCOUNT_VAULT_SECRET) {
    return crypto
      .createHash('sha256')
      .update(process.env.ACCOUNT_VAULT_SECRET)
      .digest();
  }
  ensureDataDir();
  if (fs.existsSync(KEY_FILE)) {
    const hex = fs.readFileSync(KEY_FILE, 'utf8').trim();
    if (/^[0-9a-f]{64}$/i.test(hex)) {
      return Buffer.from(hex, 'hex');
    }
  }
  const generated = crypto.randomBytes(32);
  fs.writeFileSync(KEY_FILE, generated.toString('hex'), { mode: 0o600 });
  return generated;
}

function hashEmailLookupKey(email: string): string {
  const normalized = email.trim().toLowerCase();
  return crypto
    .createHmac('sha256', getVaultMasterKey())
    .update(normalized)
    .digest('hex');
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function encryptUserPayload(payload: {
  profile: StoredUserProfile;
  progress: StoredUserProgress;
}): { iv: string; authTag: string; encryptedPayload: string } {
  const key = getVaultMasterKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const plaintext = Buffer.from(JSON.stringify(payload), 'utf8');
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return {
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
    encryptedPayload: encrypted.toString('hex'),
  };
}

function decryptUserPayload(record: EncryptedVaultRecord): {
  profile: StoredUserProfile;
  progress: StoredUserProgress;
} {
  const key = getVaultMasterKey();
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(record.iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(record.authTag, 'hex'));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(record.encryptedPayload, 'hex')),
    decipher.final(),
  ]);
  return JSON.parse(decrypted.toString('utf8'));
}

function readVault(): Record<string, EncryptedVaultRecord> {
  ensureDataDir();
  if (!fs.existsSync(VAULT_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(VAULT_FILE, 'utf8'));
  } catch (err) {
    console.error('Failed to parse accounts vault file:', err);
    return {};
  }
}

function writeVault(vault: Record<string, EncryptedVaultRecord>): void {
  ensureDataDir();
  fs.writeFileSync(VAULT_FILE, JSON.stringify(vault, null, 2), { mode: 0o600 });
}

function readSessions(): Record<string, SessionRecord> {
  ensureDataDir();
  if (!fs.existsSync(SESSIONS_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8'));
  } catch (err) {
    console.error('Failed to parse sessions store:', err);
    return {};
  }
}

function writeSessions(sessions: Record<string, SessionRecord>): void {
  ensureDataDir();
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), {
    mode: 0o600,
  });
}

function isValidPastOrPresentIsoDate(dateStr: string): boolean {
  if (!ISO_DATE_RE.test(dateStr)) return false;
  const parsed = Date.parse(`${dateStr}T00:00:00Z`);
  if (Number.isNaN(parsed)) return false;
  // Allow +24h timezone buffer but reject arbitrary future-dated streak manipulation
  return parsed <= Date.now() + 24 * 60 * 60 * 1000;
}

function sanitizeAndVerifyProgress(
  raw: Partial<StoredUserProgress> | undefined,
  existing?: StoredUserProgress
): StoredUserProgress {
  const validTrack: AgeTrack =
    raw?.ageTrack === 'cadet' || raw?.ageTrack === 'scientist'
      ? raw.ageTrack
      : 'junior';

  const uniqueFilteredStrings = (
    arr: unknown,
    maxCount: number,
    maxLen: number,
    predicate?: (s: string) => boolean
  ): string[] => {
    if (!Array.isArray(arr)) return [];
    const seen = new Set<string>();
    for (const item of arr) {
      if (typeof item !== 'string') continue;
      const trimmed = item.trim();
      if (!trimmed || trimmed.length > maxLen) continue;
      if (predicate && !predicate(trimmed)) continue;
      seen.add(trimmed);
      if (seen.size >= maxCount) break;
    }
    return Array.from(seen);
  };

  // Monotonic merge with previously persisted server state so progress isn't downgraded unintentionally
  const exploredMissionIds = Array.from(
    new Set([
      ...(existing?.exploredMissionIds || []),
      ...uniqueFilteredStrings(raw?.exploredMissionIds, 13, 60, (id) =>
        VALID_MISSION_IDS.has(id)
      ),
    ])
  );

  const rawDictCount =
    typeof raw?.dictionaryOpenCount === 'number' &&
    Number.isFinite(raw.dictionaryOpenCount) &&
    raw.dictionaryOpenCount >= 0
      ? Math.min(100000, Math.floor(raw.dictionaryOpenCount))
      : 0;
  const dictionaryOpenCount = Math.max(
    existing?.dictionaryOpenCount || 0,
    rawDictCount
  );

  const exploredJargonTerms = Array.from(
    new Set([
      ...(existing?.exploredJargonTerms || []),
      ...uniqueFilteredStrings(raw?.exploredJargonTerms, 300, 80),
    ])
  );

  const activeDates = Array.from(
    new Set([
      ...(existing?.activeDates || []),
      ...uniqueFilteredStrings(
        raw?.activeDates,
        1000,
        10,
        isValidPastOrPresentIsoDate
      ),
    ])
  );

  const isMysterySolved = Boolean(existing?.isMysterySolved);

  // Authoritatively verify earned badges against verified progress criteria
  const unlockedSet = new Set<string>(
    (existing?.unlockedBadges || []).filter((id) => VALID_BADGE_IDS.has(id))
  );
  if (dictionaryOpenCount >= 3) unlockedSet.add('curious-spark');
  if (exploredJargonTerms.length >= 3) unlockedSet.add('lexicon-master');
  if (MOON_MISSION_IDS.every((id) => exploredMissionIds.includes(id))) {
    unlockedSet.add('lunar-pioneer');
  }
  if (MARS_MISSION_IDS.every((id) => exploredMissionIds.includes(id))) {
    unlockedSet.add('red-planet-rover');
  }
  if (DEEP_SPACE_MISSION_IDS.every((id) => exploredMissionIds.includes(id))) {
    unlockedSet.add('deep-space-voyager');
  }
  if (exploredMissionIds.length >= 5) unlockedSet.add('hardware-engineer');
  if (isMysterySolved) unlockedSet.add('signal-decoder');

  return {
    ageTrack: validTrack,
    unlockedBadges: Array.from(unlockedSet),
    exploredMissionIds,
    isMysterySolved,
    dictionaryOpenCount,
    exploredJargonTerms,
    activeDates,
  };
}

function getTodayIsoDateServer(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

function issueSessionForUser(userId: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(token);
  const sessions = readSessions();
  const now = Date.now();
  for (const [k, s] of Object.entries(sessions)) {
    if (!s || s.expiresAt < now) {
      delete sessions[k];
    }
  }
  sessions[tokenHash] = {
    userId,
    expiresAt: now + 7 * 24 * 60 * 60 * 1000,
  };
  writeSessions(sessions);
  return token;
}

function extractBearerToken(req: express.Request): string | null {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return null;
  const token = header.slice('Bearer '.length).trim();
  return token || null;
}

function findUserRecordBySession(
  req: express.Request,
  vault: Record<string, EncryptedVaultRecord>
): { emailKey: string; record: EncryptedVaultRecord; tokenHash: string } | null {
  const token = extractBearerToken(req);
  if (!token) return null;
  const tokenHash = hashToken(token);
  const sessions = readSessions();
  const session = sessions[tokenHash];
  if (!session || session.expiresAt < Date.now()) {
    if (session) {
      delete sessions[tokenHash];
      writeSessions(sessions);
    }
    return null;
  }
  for (const [emailKey, record] of Object.entries(vault)) {
    if (record.userId === session.userId) {
      return { emailKey, record, tokenHash };
    }
  }
  return null;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use(express.json({ limit: '32kb' }));

  const authRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 40,
  });
  const ttsRateLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    max: 45,
  });
  const dictionaryRateLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    max: 45,
  });
  const verifyRateLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    max: 60,
  });

  // =========================================================================
  // CONFIDENTIAL ACCOUNT & PER-USER ENCRYPTED PROGRESS API
  // =========================================================================
  app.use('/api/auth', authRateLimiter, (_req, res, next) => {
    res.setHeader(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, private'
    );
    res.setHeader('Pragma', 'no-cache');
    next();
  });

  app.post('/api/auth/signup', (req, res) => {
    const callsign =
      typeof req.body?.callsign === 'string'
        ? req.body.callsign.trim().slice(0, 32)
        : '';
    const email =
      typeof req.body?.email === 'string'
        ? req.body.email.trim().slice(0, 120)
        : '';
    const password =
      typeof req.body?.password === 'string' ? req.body.password : '';
    const rawAvatar =
      typeof req.body?.avatarEmoji === 'string'
        ? req.body.avatarEmoji.trim()
        : '';
    const avatarEmoji = VALID_AVATAR_EMOJIS.has(rawAvatar) ? rawAvatar : '👩‍🚀';
    const ageTrack: AgeTrack =
      req.body?.ageTrack === 'cadet' || req.body?.ageTrack === 'scientist'
        ? req.body.ageTrack
        : 'junior';

    if (callsign.length < 2) {
      res.status(400).json({
        error: 'Explorer callsign must be between 2 and 32 characters.',
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    if (password.length < 6 || password.length > 128) {
      res.status(400).json({
        error:
          'Mission passcode must be between 6 and 128 characters for account privacy.',
      });
      return;
    }

    const emailKey = hashEmailLookupKey(email);
    const vault = readVault();
    if (vault[emailKey]) {
      res.status(409).json({
        error:
          'An explorer account with this email already exists. Please use Log In instead.',
      });
      return;
    }

    const userId = `usr_${crypto.randomUUID()}`;
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.scryptSync(password, salt, 64).toString('hex');

    const profile: StoredUserProfile = {
      id: userId,
      callsign,
      email: email.toLowerCase(),
      avatarEmoji,
      ageTrack,
      joinedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
    };

    const progress = sanitizeAndVerifyProgress({ ageTrack });
    const encrypted = encryptUserPayload({ profile, progress });

    vault[emailKey] = {
      userId,
      passwordSalt: salt,
      passwordHash,
      ...encrypted,
      createdAt: new Date().toISOString(),
    };
    writeVault(vault);

    const token = issueSessionForUser(userId);
    res.status(201).json({ token, user: profile, progress });
  });

  app.post('/api/auth/login', (req, res) => {
    const email =
      typeof req.body?.email === 'string'
        ? req.body.email.trim().slice(0, 120)
        : '';
    const password =
      typeof req.body?.password === 'string' ? req.body.password : '';

    if (!email || !password || password.length > 128) {
      res
        .status(400)
        .json({ error: 'Please enter both your email and mission passcode.' });
      return;
    }

    const emailKey = hashEmailLookupKey(email);
    const vault = readVault();
    const record = vault[emailKey];
    if (!record) {
      res
        .status(401)
        .json({ error: 'Invalid email address or mission passcode.' });
      return;
    }

    const candidateHash = crypto.scryptSync(
      password,
      record.passwordSalt,
      64
    );
    const storedHash = Buffer.from(record.passwordHash, 'hex');
    if (
      candidateHash.length !== storedHash.length ||
      !crypto.timingSafeEqual(candidateHash, storedHash)
    ) {
      res
        .status(401)
        .json({ error: 'Invalid email address or mission passcode.' });
      return;
    }

    try {
      const decrypted = decryptUserPayload(record);
      const token = issueSessionForUser(record.userId);
      res.json({
        token,
        user: decrypted.profile,
        progress: sanitizeAndVerifyProgress(
          decrypted.progress,
          decrypted.progress
        ),
      });
    } catch (err) {
      console.error('Vault decryption failure on login:', err);
      res.status(500).json({ error: 'Unable to unlock encrypted account vault.' });
    }
  });

  app.get('/api/auth/session', (req, res) => {
    const vault = readVault();
    const matched = findUserRecordBySession(req, vault);
    if (!matched) {
      res.status(401).json({ error: 'No active explorer session.' });
      return;
    }
    try {
      const decrypted = decryptUserPayload(matched.record);
      res.json({
        user: decrypted.profile,
        progress: sanitizeAndVerifyProgress(
          decrypted.progress,
          decrypted.progress
        ),
      });
    } catch (err) {
      console.error('Vault decryption failure on session read:', err);
      res.status(500).json({ error: 'Unable to read session profile.' });
    }
  });

  app.put('/api/auth/progress', (req, res) => {
    const vault = readVault();
    const matched = findUserRecordBySession(req, vault);
    if (!matched) {
      res.status(401).json({ error: 'Authentication required to save progress.' });
      return;
    }
    try {
      const decrypted = decryptUserPayload(matched.record);
      const nextProgress = sanitizeAndVerifyProgress(
        req.body?.progress,
        decrypted.progress
      );
      const nextProfile: StoredUserProfile = {
        ...decrypted.profile,
        ageTrack: nextProgress.ageTrack,
      };
      const encrypted = encryptUserPayload({
        profile: nextProfile,
        progress: nextProgress,
      });
      vault[matched.emailKey] = {
        ...matched.record,
        ...encrypted,
      };
      writeVault(vault);
      res.json({ user: nextProfile, progress: nextProgress });
    } catch (err) {
      console.error('Failed to save encrypted progress:', err);
      res.status(500).json({ error: 'Unable to save encrypted progress.' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    const token = extractBearerToken(req);
    if (token) {
      const tokenHash = hashToken(token);
      const sessions = readSessions();
      if (sessions[tokenHash]) {
        delete sessions[tokenHash];
        writeSessions(sessions);
      }
    }
    res.json({ ok: true });
  });

  // =========================================================================
  // SERVER-SIDE ANSWER VERIFICATION FOR QUIZ & MYSTERY BADGES
  // =========================================================================
  app.post('/api/verify/quiz', verifyRateLimiter, (req, res) => {
    const missionId =
      typeof req.body?.missionId === 'string' ? req.body.missionId.trim() : '';
    const chapterAnswers = req.body?.chapterAnswers as
      | Record<string, unknown>
      | undefined;
    const masterAnswer = req.body?.masterAnswer;

    const mission = MISSION_HARDWARE.find((m) => m.id === missionId);
    if (!mission) {
      res.status(400).json({ error: 'Unknown mission ID.' });
      return;
    }

    const chapters = getMissionStoryChapters(mission.id, mission);
    const allChaptersRight = chapters.every(
      (chap, idx) => chapterAnswers?.[String(idx)] === chap.quiz.correctIndex
    );
    const finalRight = masterAnswer === mission.quizQuestion.correctIndex;
    const isPerfect = allChaptersRight && finalRight;

    if (!isPerfect) {
      res.json({ isPerfect: false });
      return;
    }

    const vault = readVault();
    const matched = findUserRecordBySession(req, vault);
    if (matched) {
      try {
        const decrypted = decryptUserPayload(matched.record);
        const today = getTodayIsoDateServer();
        const unlockedSet = new Set(decrypted.progress.unlockedBadges);
        unlockedSet.add('cosmic-genius');
        const activeDates = Array.from(
          new Set([...decrypted.progress.activeDates, today])
        );
        const nextProgress: StoredUserProgress = {
          ...sanitizeAndVerifyProgress(
            { ...decrypted.progress, activeDates },
            decrypted.progress
          ),
          unlockedBadges: Array.from(unlockedSet),
        };
        const encrypted = encryptUserPayload({
          profile: decrypted.profile,
          progress: nextProgress,
        });
        vault[matched.emailKey] = { ...matched.record, ...encrypted };
        writeVault(vault);
        res.json({ isPerfect: true, progress: nextProgress });
        return;
      } catch (err) {
        console.error('Error awarding verified quiz badge:', err);
      }
    }

    res.json({ isPerfect: true });
  });

  app.post('/api/verify/mystery', verifyRateLimiter, (req, res) => {
    const optionId =
      typeof req.body?.optionId === 'string' ? req.body.optionId.trim() : '';
    const chosen = DAILY_MYSTERY.options.find((o) => o.id === optionId);
    if (!chosen) {
      res.status(400).json({ error: 'Invalid mystery option.' });
      return;
    }
    if (!chosen.isCorrect) {
      res.json({ isCorrect: false });
      return;
    }

    const vault = readVault();
    const matched = findUserRecordBySession(req, vault);
    if (matched) {
      try {
        const decrypted = decryptUserPayload(matched.record);
        const today = getTodayIsoDateServer();
        const unlockedSet = new Set(decrypted.progress.unlockedBadges);
        unlockedSet.add('signal-decoder');
        const activeDates = Array.from(
          new Set([...decrypted.progress.activeDates, today])
        );
        const nextProgress: StoredUserProgress = {
          ...sanitizeAndVerifyProgress(
            { ...decrypted.progress, activeDates },
            decrypted.progress
          ),
          isMysterySolved: true,
          unlockedBadges: Array.from(unlockedSet),
        };
        const encrypted = encryptUserPayload({
          profile: decrypted.profile,
          progress: nextProgress,
        });
        vault[matched.emailKey] = { ...matched.record, ...encrypted };
        writeVault(vault);
        res.json({ isCorrect: true, progress: nextProgress });
        return;
      } catch (err) {
        console.error('Error awarding verified mystery badge:', err);
      }
    }

    res.json({ isCorrect: true });
  });

  // Serve static assets (including /audio/*.mp3 with full byte-range support) directly
  app.use(
    express.static(path.join(__dirname, 'public'), {
      acceptRanges: true,
    })
  );

  // Universal server-side MP3 TTS proxy with strict input validation, rate limiting, and upstream timeout
  app.get('/api/tts', ttsRateLimiter, async (req, res) => {
    const rawParam = typeof req.query.text === 'string' ? req.query.text : '';
    const cleanedText = rawParam
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanedText) {
      res.status(400).json({ error: 'Missing text parameter.' });
      return;
    }
    if (cleanedText.length > 600) {
      res
        .status(400)
        .json({ error: 'Text parameter exceeds 600-character limit.' });
      return;
    }

    try {
      const words = cleanedText.split(' ');
      const chunks: string[] = [];
      let current = '';
      for (const word of words) {
        if ((current + ' ' + word).trim().length > 175) {
          if (current.trim()) chunks.push(current.trim());
          current = word.slice(0, 175);
        } else {
          current = (current + ' ' + word).trim();
        }
      }
      if (current.trim()) chunks.push(current.trim());

      const buffers: Buffer[] = [];
      for (const chunk of chunks.slice(0, 4)) {
        const ttsUrl =
          'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=' +
          encodeURIComponent(chunk);
        const ttsRes = await fetch(ttsUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
          signal: AbortSignal.timeout(6000),
        });
        if (ttsRes.ok) {
          buffers.push(Buffer.from(await ttsRes.arrayBuffer()));
        }
      }

      if (buffers.length === 0) {
        res.status(502).send('TTS upstream unavailable');
        return;
      }

      const combined = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', String(combined.length));
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(combined);
    } catch (err) {
      console.error('TTS proxy error:', err);
      res.status(500).send('TTS synthesis error');
    }
  });

  app.post('/api/cosmic-dictionary', dictionaryRateLimiter, async (req, res) => {
    const rawInput = typeof req.body?.term === 'string' ? req.body.term : '';
    const rawTerm = rawInput
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!rawTerm) {
      res
        .status(400)
        .json({ error: 'Please provide a word or space term to look up.' });
      return;
    }
    if (rawTerm.length > 80) {
      res
        .status(400)
        .json({ error: 'Lookup term must be 80 characters or fewer.' });
      return;
    }

    const cacheKey = rawTerm.toLowerCase();
    if (dictionaryCache.has(cacheKey)) {
      res.json(dictionaryCache.get(cacheKey));
      return;
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        const fallbackEntry = lookupAnyCosmicWord(rawTerm);
        setBoundedDictionaryCache(cacheKey, fallbackEntry as unknown as Record<string, unknown>);
        res.json(fallbackEntry);
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Define and explain the word, acronym, phrase, or concept "${rawTerm}" for a curious young explorer (ages 10-15) visiting the NASA "Space Legacy: Abandoned But Not Lost" interactive museum. Even if "${rawTerm}" is an everyday word, custom term, or general science/engineering word, connect it clearly to how it works in everyday life and in space exploration!`,
        config: {
          systemInstruction:
            'You are the Universal Cosmic Dictionary AI for Space Legacy, an educational NASA space hardware museum for kids and teens. For ANY word, acronym, number, or phrase the user types, generate an accurate, super engaging, kid-friendly definition, a phonetic pronunciation guide, a vivid everyday analogy (starting with "Like..." or "Imagine..."), and a real space or science fun fact. Never say a word is not found—always explain the exact word they asked about!',
          temperature: 0.7,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              term: {
                type: Type.STRING,
                description: 'The formatted title of the term or word being defined.',
              },
              pronunciation: {
                type: Type.STRING,
                description: 'Simple phonetic pronunciation guide (e.g., "AY-YOO" or "GRAV-ih-tee").',
              },
              emoji: {
                type: Type.STRING,
                description: 'A single expressive emoji matching the concept.',
              },
              category: {
                type: Type.STRING,
                description:
                  'One of: "Hardware Tech", "Deep Space", "Planet Science", "Mission Comms", "Measurement", or "Space Vocabulary".',
              },
              kidDefinition: {
                type: Type.STRING,
                description:
                  'A clear, exciting, kid-friendly 1-2 sentence definition explaining what the word means.',
              },
              playfulAnalogy: {
                type: Type.STRING,
                description:
                  'A relatable everyday analogy for kids (starting with "Like..." or "Imagine...") that makes the concept click immediately.',
              },
              funFact: {
                type: Type.STRING,
                description:
                  'A fascinating, true NASA, astronomy, or science fun fact connected to this word.',
              },
              isTechnicalJargon: {
                type: Type.BOOLEAN,
                description:
                  'True if this is a scientific, engineering, space, or technical term/acronym.',
              },
            },
            required: [
              'term',
              'pronunciation',
              'emoji',
              'category',
              'kidDefinition',
              'playfulAnalogy',
              'funFact',
              'isTechnicalJargon',
            ],
          },
        },
      });

      const text = response.text?.trim();
      if (!text) {
        throw new Error('Empty response from Gemini model');
      }

      const parsed = JSON.parse(text);
      const entry = {
        term: parsed.term || rawTerm,
        aliases: [rawTerm.toLowerCase()],
        pronunciation: parsed.pronunciation || rawTerm.toUpperCase(),
        emoji: parsed.emoji || '🚀',
        category: parsed.category || 'Space Vocabulary',
        kidDefinition: parsed.kidDefinition,
        playfulAnalogy: parsed.playfulAnalogy,
        funFact: parsed.funFact,
        isTechnicalJargon: Boolean(parsed.isTechnicalJargon),
      };

      setBoundedDictionaryCache(cacheKey, entry);
      res.json(entry);
    } catch (err) {
      console.warn('Gemini dictionary lookup failed, serving local fallback:', err);
      const fallbackEntry = lookupAnyCosmicWord(rawTerm);
      res.json(fallbackEntry);
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Space Legacy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
