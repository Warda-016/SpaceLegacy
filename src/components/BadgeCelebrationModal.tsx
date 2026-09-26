import React, { useMemo } from 'react';
import { Award, Flame, Sparkles, Star, Trophy, Volume2, X } from 'lucide-react';
import { AchievementBadge } from '../data/missions';
import { playAuthenticNasaSnippet } from '../utils/soundEffects';

interface BadgeCelebrationModalProps {
  badge: AchievementBadge | null;
  totalBadgesCount: number;
  maxBadgesCount: number;
  totalXp: number;
  streakCount: number;
  onClose: () => void;
  onViewAllBadges: () => void;
}

const CONFETTI_COLORS = [
  '#38bdf8',
  '#f59e0b',
  '#a855f7',
  '#34d399',
  '#f43f5e',
  '#fde047',
];

export const BadgeCelebrationModal: React.FC<BadgeCelebrationModalProps> = ({
  badge,
  totalBadgesCount,
  maxBadgesCount,
  totalXp,
  streakCount,
  onClose,
  onViewAllBadges,
}) => {
  const confettiPieces = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      left: `${(i * 97) % 100}%`,
      delay: `${((i * 13) % 20) * 0.08}s`,
      duration: `${2.2 + ((i * 7) % 15) * 0.12}s`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 8 + (i % 8),
      rotate: (i * 45) % 360,
    }));
  }, []);

  if (!badge) return null;

  const themeClasses = {
    cyan: {
      ring: 'border-sky-400 shadow-[0_0_50px_rgba(56,189,248,0.5)] bg-gradient-to-b from-sky-400/30 to-sky-900/40',
      button: 'bg-gradient-to-r from-sky-400 to-cyan-300 text-[#060814] shadow-[0_6px_0_#0284c7]',
    },
    amber: {
      ring: 'border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.5)] bg-gradient-to-b from-amber-400/30 to-amber-900/40',
      button: 'bg-gradient-to-r from-amber-400 to-yellow-300 text-[#060814] shadow-[0_6px_0_#b45309]',
    },
    violet: {
      ring: 'border-purple-400 shadow-[0_0_50px_rgba(168,85,247,0.5)] bg-gradient-to-b from-purple-400/30 to-purple-900/40',
      button: 'bg-gradient-to-r from-purple-400 to-fuchsia-300 text-[#060814] shadow-[0_6px_0_#7e22ce]',
    },
    emerald: {
      ring: 'border-emerald-400 shadow-[0_0_50px_rgba(52,211,153,0.5)] bg-gradient-to-b from-emerald-400/30 to-emerald-900/40',
      button: 'bg-gradient-to-r from-emerald-400 to-teal-300 text-[#060814] shadow-[0_6px_0_#047857]',
    },
  }[badge.colorTheme];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#060814]/90 backdrop-blur-xl overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Achievement Badge Unlocked Celebration"
    >
      {/* Animated Confetti Layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confettiPieces.map((piece) => (
          <span
            key={piece.id}
            style={{
              left: piece.left,
              width: `${piece.size}px`,
              height: `${piece.size * 1.4}px`,
              backgroundColor: piece.color,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              transform: `rotate(${piece.rotate}deg)`,
            }}
            className="absolute -top-6 rounded-sm opacity-90 animate-bounce"
          />
        ))}
      </div>

      {/* Celebration Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0d1229] border-2 border-sky-400/40 p-6 sm:p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.85)] animate-in zoom-in-95 duration-300">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close celebration"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Streak & Authentic NASA Audio Button */}
        <div className="flex items-center justify-center gap-2.5 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-xs uppercase tracking-widest font-bold">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            {streakCount} Achievement Streak!
          </span>
          <button
            type="button"
            onClick={() => playAuthenticNasaSnippet('apollo-11-eagle')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-400/15 hover:bg-sky-400/25 border border-sky-400/30 text-sky-300 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            title="Play Authentic NASA Apollo 11 Comms"
          >
            <Volume2 className="w-3.5 h-3.5" />
            NASA Comms
          </button>
        </div>

        {/* Glowing 3D Badge Medallion */}
        <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-5">
          <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-2xl animate-pulse" />
          <div
            className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border-4 flex flex-col items-center justify-center transform hover:scale-105 transition-transform ${themeClasses.ring}`}
          >
            <span className="text-5xl sm:text-6xl select-none drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]">
              {badge.emoji}
            </span>
          </div>
          <div className="absolute -bottom-2 -right-1 w-10 h-10 rounded-2xl bg-amber-400 text-[#060814] font-headline font-bold text-xs flex items-center justify-center shadow-lg border-2 border-[#0d1229]">
            <Star className="w-5 h-5 fill-[#060814]" />
          </div>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-300 font-bold mb-1 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          NEW SPACE LEGACY BADGE UNLOCKED!
          <Sparkles className="w-4 h-4" />
        </p>

        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          {badge.name}
        </h2>

        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
          {badge.description}
        </p>

        {/* Stat Reward Boxes */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-2xl bg-[#161c38] border border-amber-400/30 p-3">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-amber-300 mb-1">
              XP Earned
            </span>
            <span className="font-headline text-xl sm:text-2xl font-bold text-amber-400">
              +{badge.xpValue} XP
            </span>
          </div>
          <div className="rounded-2xl bg-[#161c38] border border-sky-400/30 p-3">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-sky-300 mb-1">
              Total XP
            </span>
            <span className="font-headline text-xl sm:text-2xl font-bold text-sky-300">
              {totalXp}
            </span>
          </div>
          <div className="rounded-2xl bg-[#161c38] border border-emerald-400/30 p-3">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-emerald-300 mb-1">
              Badges
            </span>
            <span className="font-headline text-xl sm:text-2xl font-bold text-emerald-400">
              {totalBadgesCount}/{maxBadgesCount}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 py-3.5 px-6 rounded-2xl font-headline font-bold text-sm uppercase tracking-wider active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2 ${themeClasses.button}`}
          >
            <Trophy className="w-4 h-4" />
            Continue Exploring
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onViewAllBadges();
            }}
            className="py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-headline font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4 text-sky-300" />
            View Badge Vault
          </button>
        </div>
      </div>
    </div>
  );
};
