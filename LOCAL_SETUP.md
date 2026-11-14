# Space Legacy — Local Setup & Project Dependencies Guide

Complete instructions and dependency reference for running **Space Legacy: Abandoned but Not Lost** locally on your machine.

---

## 1. System Prerequisites

| Requirement | Minimum Version | Notes |
| :--- | :--- | :--- |
| **Node.js** | `v20.x` LTS or newer (`>= 20.0.0`) | Required for built-in Web Fetch, `crypto`, and TypeScript/ESM execution (`tsx`). |
| **npm** | `v10.x` or newer | Included with Node.js LTS. |
| **Operating System** | macOS, Linux, or Windows 10/11 | Works cross-platform via standard Node/Express/Vite tooling. |
| **Browser** | Modern Chromium, Firefox, or Safari | Requires Web Audio API, Web Crypto API (`crypto.subtle`), SVG, and ES2022 support. |

---

## 2. Project Dependencies (`package.json`)

Every package below is installed via `npm install`.

### Runtime Dependencies (`dependencies`)

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `react` | `^19.0.1` | Core UI component library and hooks runtime. |
| `react-dom` | `^19.0.1` | DOM renderer for React 19. |
| `express` | `^4.21.2` | Backend Node.js HTTP server powering `/api/auth/*` encrypted account vaults, `/api/cosmic-dictionary`, `/api/tts`, and static `/public` + Vite middleware serving. |
| `dotenv` | `^17.2.3` | Loads environment variables from `.env` on server startup. |
| `@google/genai` | `^2.4.0` | Official Google GenAI SDK (`gemini-3-flash-preview`) used optionally by `POST /api/cosmic-dictionary` for dynamic kid-friendly space term definitions (falls back to the built-in local dictionary if no API key is supplied). |
| `lucide-react` | `^0.546.0` | Icon library used across navigation, hardware telemetry cards, audio controls, and achievement badges. |
| `vite` | `^8.3.0` | Frontend module bundler & development middleware mounted inside `server.ts`. |
| `@vitejs/plugin-react` | `^6.1.1` | Official React JSX/Fast-Refresh plugin for Vite. |
| `@tailwindcss/vite` | `^4.3.3` | Official Tailwind CSS v4 Vite integration. |

### Development Dependencies (`devDependencies`)

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `typescript` | `^7.0.2` | Type checking (`npm run lint` / `tsc --noEmit`). |
| `tsx` | `^4.21.0` | Direct TypeScript runtime used to execute `server.ts` in both development and production (`npm run dev` and `npm start`). |
| `tailwindcss` | `^4.3.3` | Utility-first styling framework (`@import "tailwindcss";` in `src/index.css`). |
| `autoprefixer` | `^10.4.21` | CSS vendor-prefix post-processor. |
| `esbuild` | `^0.25.0` | Fast bundler engine used under the hood by Vite and `tsx`. |
| `@types/node` | `^22.14.0` | TypeScript declarations for Node.js built-in modules (`crypto`, `fs`, `path`, `url`). |
| `@types/react` | `^19.3.0` | TypeScript declarations for React. |
| `@types/react-dom` | `^19.3.0` | TypeScript declarations for React DOM. |
| `@types/express` | `^4.17.21` | TypeScript declarations for Express. |

---

## 3. Environment Variables (`.env`)

Copy `.env.example` to `.env` in the project root:

```bash
cp .env.example .env
```

Available variables:

```env
# Optional: Enables Gemini AI responses in the Universal Cosmic Dictionary.
# If omitted or left empty, the app automatically falls back to its built-in local dictionary.
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Optional: Server port (defaults to 3000)
PORT=3000

# Optional: Custom secret used to derive the AES-256-GCM encryption key for .data/accounts-vault.json.
# If omitted, server.ts automatically generates and stores a 32-byte random key in .data/.vault-key (0600).
ACCOUNT_VAULT_SECRET="your-long-random-passphrase-for-account-vaults"

# Optional: Public deployment URL
APP_URL="http://localhost:3000"
```

> **Note:** Never commit `.env` or `.data/` to version control. Both are listed in `.gitignore`.

---

## 4. Step-by-Step Local Installation & Running

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run in Development Mode
Starts `server.ts` on `http://localhost:3000` with Express API routes (`/api/auth/*`, `/api/cosmic-dictionary`, `/api/tts`), static media (`/public/images/*`, `/public/audio/*`), and Vite middleware:

```bash
npm run dev
```

Open your browser at:
**`http://localhost:3000`**

### Step 3: Run TypeScript Verification
Verify zero TypeScript errors across frontend and server:

```bash
npm run lint
```

### Step 4: Build & Run in Production Mode
```bash
npm run build
NODE_ENV=production npm start
```
*(On Windows PowerShell: `$env:NODE_ENV="production"; npm start`)*

### Optional: Clean Build Artifacts
```bash
npm run clean
```

---

## 5. Folder Structure & Local Static Assets

The app ships all visual and audio assets locally inside `/public` (no third-party image hotlinking required):

- `server.ts` — Express server entry point (confidential account vault API, Cosmic Dictionary AI/local endpoint, MP3 TTS proxy, static asset serving, and Vite SPA serving).
- `src/utils/accountClient.ts` — Client-side authentication & strict per-account / guest isolation layer (with Web Crypto PBKDF2 + AES-GCM fallback if deployed statically without Node).
- `src/data/missions.ts` — Complete 13-mission dataset, hardware coordinates, telemetry quotes, quizzes, and achievement badges.
- `src/data/cosmicDictionaryData.ts` — Curated space glossary and intelligent local word synthesizer.
- `public/images/missions/` — 53 mission photographs and thumbnails.
- `public/images/sectors/` — Sector header imagery (`moon.jpg`, `mars.jpg`, `deep-space.jpg`).
- `public/images/space-legacy-logo.svg` — Space Legacy emblem vector logo.
- `public/audio/` — Pre-recorded NASA archival audio clips (`apollo-11-eagle.mp3`, `voyager-golden-record.mp3`, `mars-perseverance-wind.mp3`) and pre-mastered mission story narration MP3 clips.
- `.data/` *(auto-created at runtime)* — Stores per-user AES-256-GCM encrypted account records (`accounts-vault.json`), SHA-256 hashed active session tokens (`sessions.json`), and local vault key (`.vault-key`).

---

## 6. User Account Privacy & Isolation Architecture

- **Password Hashing:** `crypto.scryptSync` with a unique 16-byte random salt per user and timing-safe comparison (`crypto.timingSafeEqual`).
- **Confidential Storage:** User profiles and progress (streaks, XP, badges, explored missions, daily mystery solved status, dictionary lookups, active dates, and age track) are encrypted per account using **AES-256-GCM** inside `.data/accounts-vault.json`.
- **Session Isolation:** Each login issues a random 256-bit Bearer token stored strictly in the active browser tab's `sessionStorage` (`space_legacy_session_token_v1`), hashed with SHA-256 on the server (`sessions.json`), and revoked on logout.
- **Guest Isolation:** Logged-out visitors use tab-scoped `sessionStorage` (`space_legacy_guest_progress_v1`) that resets cleanly on logout and never leaks into signed-in explorer accounts.
