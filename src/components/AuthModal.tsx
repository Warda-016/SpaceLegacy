import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Flame,
  LogIn,
  LogOut,
  Rocket,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserPlus,
  X,
} from 'lucide-react';
import { ACHIEVEMENT_BADGES, AgeTrack } from '../data/missions';

export interface ExplorerUserProfile {
  id: string;
  callsign: string;
  email: string;
  avatarEmoji: string;
  ageTrack: AgeTrack;
  joinedDate: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: ExplorerUserProfile | null;
  onLoginSuccess: (user: ExplorerUserProfile) => void;
  onLogout: () => void;
  unlockedBadgesCount: number;
  totalXp: number;
  streakCount: number;
  ageTrack: AgeTrack;
  onSelectAgeTrack: (track: AgeTrack) => void;
}

const AVATAR_OPTIONS = ['👩‍🚀', '🧑‍🚀', '🚀', '🛰️', '🪐', '🤖', '🔭', '🌕'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
  unlockedBadgesCount,
  totalXp,
  streakCount,
  ageTrack,
  onSelectAgeTrack,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(currentUser ? 'login' : 'signup');
  const [callsign, setCallsign] = useState(currentUser?.callsign || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatarEmoji || '👩‍🚀');
  const [selectedTrack, setSelectedTrack] = useState<AgeTrack>(ageTrack);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCallsign =
      callsign.trim() || (email.includes('@') ? email.split('@')[0] : 'AstroCadet');
    const cleanEmail = email.trim() || `${cleanCallsign.toLowerCase()}@nasa-kids.org`;

    const newUser: ExplorerUserProfile = {
      id: `usr_${Date.now()}`,
      callsign: cleanCallsign,
      email: cleanEmail,
      avatarEmoji: selectedAvatar,
      ageTrack: selectedTrack,
      joinedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
    };

    onSelectAgeTrack(selectedTrack);
    onLoginSuccess(newUser);
    setFeedbackMsg(
      mode === 'signup'
        ? `Welcome aboard, Commander ${newUser.callsign}! Your Space Legacy passport is active.`
        : `Welcome back, Commander ${newUser.callsign}! Telemetry & badges synced.`
    );
    setTimeout(() => {
      setFeedbackMsg(null);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-2.5 sm:p-4 bg-[#060814]/85 backdrop-blur-xl overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Space Legacy Explorer Account"
    >
      <div className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-[#0d1229] border border-sky-400/30 p-4 sm:p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.85)] my-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close account modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pr-10">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sky-400/15 border border-sky-400/35 flex items-center justify-center text-2xl shrink-0">
            {currentUser ? currentUser.avatarEmoji : selectedAvatar}
          </div>
          <div className="min-w-0">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-sky-300 block truncate">
              NASA Space Legacy • Cadet Passport
            </span>
            <h2 className="font-headline text-lg sm:text-xl md:text-2xl font-bold text-white break-words">
              {currentUser ? `Commander ${currentUser.callsign}` : 'Explorer Account & Age Track'}
            </h2>
          </div>
        </div>

        {/* If Logged In: Show Active Profile Card + Designated Age Category Selector + Log Out */}
        {currentUser ? (
          <div className="space-y-5">
            <div className="rounded-2xl bg-[#141a38] border border-sky-400/25 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-sky-400/20 border border-sky-400/40 flex items-center justify-center text-3xl">
                  {currentUser.avatarEmoji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline font-bold text-lg text-white">
                      {currentUser.callsign}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 font-mono text-[10px] uppercase">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono">{currentUser.email}</p>
                  <p className="text-[11px] text-sky-300 mt-0.5">
                    Joined {currentUser.joinedDate} • Track:{' '}
                    <span className="uppercase font-semibold">{ageTrack}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[#141a38] border border-white/10 p-3.5 text-center">
                <Award className="w-5 h-5 text-sky-300 mx-auto mb-1" />
                <span className="block font-headline text-xl font-bold text-white">
                  {unlockedBadgesCount} / {ACHIEVEMENT_BADGES.length}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
                  Badges Earned
                </span>
              </div>
              <div className="rounded-2xl bg-[#141a38] border border-white/10 p-3.5 text-center">
                <Sparkles className="w-5 h-5 text-amber-300 mx-auto mb-1" />
                <span className="block font-headline text-xl font-bold text-amber-300">
                  {totalXp} XP
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
                  Mission Score
                </span>
              </div>
              <div className="rounded-2xl bg-[#141a38] border border-white/10 p-3.5 text-center">
                <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                <span className="block font-headline text-xl font-bold text-orange-300">
                  {streakCount} Days
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
                  Active Streak
                </span>
              </div>
            </div>

            {/* Designated Explorer Age Category Selection (Requirement 5) */}
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-300 mb-2">
                Explorer Age Category &amp; Story Reading Track
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'junior', label: 'Junior (10-12)' },
                    { id: 'cadet', label: 'Cadet (13-15)' },
                    { id: 'scientist', label: 'Scientist (16-18)' },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onSelectAgeTrack(t.id)}
                    className={`py-2 px-2.5 rounded-xl font-mono text-xs border transition-all cursor-pointer ${
                      ageTrack === t.id
                        ? 'bg-sky-400 text-[#060814] border-sky-300 font-bold'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-5 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#060814] font-headline font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                Save &amp; Return to Mission
              </button>
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  setCallsign('');
                  setEmail('');
                  setPassword('');
                }}
                className="py-3 px-5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/35 text-rose-200 font-headline font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>
        ) : (
          /* Sign Up / Log In Form with Designated Age Category Selection */
          <div>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#080c21] border border-white/10 mb-5">
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-sky-400 text-[#060814] shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                Sign Up / Create Account
              </button>
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-sky-400 text-[#060814] shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                Log In
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar Picker */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-300 mb-2">
                  Choose Your Explorer Patch Avatar
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {AVATAR_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedAvatar(emoji)}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                        selectedAvatar === emoji
                          ? 'bg-sky-400/25 border-sky-400 scale-110 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-300 mb-1.5">
                  Explorer Callsign / Username
                </label>
                <input
                  type="text"
                  required
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  placeholder="e.g. StarVoyagerMaya or CaptainLeo"
                  className="w-full px-4 py-3 rounded-xl bg-[#080c21] border border-white/15 text-white text-sm focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-300 mb-1.5">
                  Cadet Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="explorer@spacelegacy.org"
                  className="w-full px-4 py-3 rounded-xl bg-[#080c21] border border-white/15 text-white text-sm focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-300 mb-1.5">
                  Mission Passcode
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[#080c21] border border-white/15 text-white text-sm focus:outline-none focus:border-sky-400"
                />
              </div>

              {/* Designated Explorer Age Category Selection */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-300 mb-1.5">
                  Select Your Explorer Age Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'junior', label: 'Ages 10–12' },
                      { id: 'cadet', label: 'Ages 13–15' },
                      { id: 'scientist', label: 'Ages 16–18' },
                    ] as const
                  ).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setSelectedTrack(t.id);
                        onSelectAgeTrack(t.id);
                      }}
                      className={`py-2 px-2 rounded-xl font-mono text-xs border transition-all cursor-pointer ${
                        selectedTrack === t.id
                          ? 'bg-sky-400/20 text-sky-300 border-sky-400 font-bold'
                          : 'bg-white/5 text-slate-300 border-white/10'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {feedbackMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{feedbackMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 text-[#060814] font-headline font-bold text-xs uppercase tracking-widest shadow-[0_10px_25px_rgba(56,189,248,0.35)] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4" />
                {mode === 'signup'
                  ? 'Create Space Legacy Account'
                  : 'Log In & Sync Mission Badges'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
