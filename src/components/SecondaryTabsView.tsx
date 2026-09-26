import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Box,
  CheckCircle2,
  Flame,
  Lock,
  Radio,
  Sparkles,
  Trophy,
} from 'lucide-react';
import {
  ACHIEVEMENT_BADGES,
  AchievementBadge,
  DestinationFilter,
  MISSION_HARDWARE,
  MissionHardware,
} from '../data/missions';
import { DossierTabMode } from './MissionDossierModal';

/**
 * Minimal Playground tab view
 */
export const PlaygroundView: React.FC = () => {
  return (
    <div className="w-full max-w-full min-h-[65vh] flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl bg-[#0b1026]/70 border border-dashed border-sky-400/25 p-6 sm:p-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-300 mb-4">
        <Box className="w-7 h-7" />
      </div>
      <h1 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
        Playground
      </h1>
      <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-sky-300/80 mt-2">
        Interactive Exploration Sandbox
      </p>
    </div>
  );
};

interface StatusMapViewProps {
  onOpenMissionDossier: (mission: MissionHardware, mode?: DossierTabMode) => void;
  onJumpToCatalogueSector: (dest: DestinationFilter) => void;
}

export const StatusMapView: React.FC<StatusMapViewProps> = ({
  onOpenMissionDossier,
  onJumpToCatalogueSector,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('voyager-1');
  const selectedMission =
    MISSION_HARDWARE.find((m) => m.id === selectedNodeId) || MISSION_HARDWARE[0];

  return (
    <div className="w-full max-w-full space-y-6 pb-16">
      <div className="rounded-2xl sm:rounded-3xl bg-[#0d132a] border border-white/10 p-5 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 w-full">
        <div className="min-w-0">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-sky-300 font-bold block mb-1">
            Deep Space Network • Real-Time Heliocentric Radar
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight break-words">
            13-Mission Telemetry &amp; Distance Map
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base mt-1 leading-relaxed break-words">
            Click any hardware transponder below to inspect its coordinates, distance in Astronomical Units (AU), and last transmission!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full">
        {/* Left 7 Cols: Interactive 13-Mission Radar Grid */}
        <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl bg-[#090d22] border border-sky-400/30 p-4 sm:p-5 space-y-4 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-sky-300 font-bold flex items-center gap-2">
              <Radio className="w-4 h-4 animate-pulse shrink-0" />
              <span>Active &amp; Legacy Transponder Nodes (13)</span>
            </span>
            <span className="font-mono text-xs text-amber-300">
              1 AU = 149.6 Million km
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {MISSION_HARDWARE.map((m) => {
              const isSelected = m.id === selectedMission.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedNodeId(m.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 min-w-0 ${
                    isSelected
                      ? 'bg-sky-400/20 border-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                      : 'bg-[#0f1633] border-white/10 text-slate-300 hover:border-white/25'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[10px] sm:text-xs text-sky-300 block">
                      #{String(m.orderNumber).padStart(2, '0')} • {m.distanceAU} AU
                    </span>
                    <span className="font-headline font-bold text-xs sm:text-sm md:text-base text-white truncate block">
                      {m.shortTitle}
                    </span>
                  </div>
                  <span className="text-lg shrink-0">{m.badge.emoji}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: Selected Hardware Live Telemetry Readout */}
        <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-[#0d132a] border border-amber-400/35 p-5 sm:p-6 flex flex-col justify-between space-y-5 min-w-0">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-sky-400/20 border border-sky-400/40 font-mono text-xs text-sky-300 font-bold">
                {selectedMission.distanceAU} AU from Earth
              </span>
              <span className="font-mono text-xs text-amber-300 break-all">
                {selectedMission.nasaArchiveId}
              </span>
            </div>

            <h2 className="font-headline text-xl sm:text-2xl font-bold text-white break-words">
              {selectedMission.title}
            </h2>

            <div className="rounded-2xl bg-[#070b1c] border border-white/10 p-4 space-y-1">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 block">
                Planetary Coordinates
              </span>
              <p className="font-mono text-xs sm:text-sm md:text-base text-sky-300 font-bold break-words">
                {selectedMission.coordinates}
              </p>
            </div>

            <div className="rounded-2xl bg-[#070b1c] border border-amber-400/30 p-4 space-y-1">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-amber-300 block font-bold">
                Last Recorded Telemetry Transmission
              </span>
              <p className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed break-words">
                &ldquo;{selectedMission.lastTransmissionQuote}&rdquo;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onOpenMissionDossier(selectedMission, 'story')}
              className="py-3 px-4 rounded-xl bg-sky-400 text-[#060814] font-headline font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Open Story</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenMissionDossier(selectedMission, 'quiz')}
              className="py-3 px-4 rounded-xl bg-emerald-400 text-[#060814] font-headline font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>Take Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BadgesViewProps {
  unlockedBadges: string[];
  badgeProgressMap: Record<string, number>;
  onCelebrateBadge: (badge: AchievementBadge) => void;
  onJumpToCatalogueSector: (dest: DestinationFilter) => void;
}

export const BadgesView: React.FC<BadgesViewProps> = ({
  unlockedBadges,
  badgeProgressMap,
  onCelebrateBadge,
  onJumpToCatalogueSector,
}) => {
  const totalXp = ACHIEVEMENT_BADGES.reduce(
    (acc, b) => (unlockedBadges.includes(b.id) ? acc + b.xpValue : acc),
    0
  );

  return (
    <div className="w-full max-w-full space-y-6 pb-16">
      {/* Top Gamified Achievement Header */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0d132a] via-[#131b3d] to-[#1a153b] border border-sky-400/30 p-5 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl w-full">
        <div className="space-y-2 min-w-0">
          <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-xs uppercase tracking-widest font-bold">
            <Trophy className="w-3.5 h-3.5 shrink-0" />
            <span>Dynamic Interaction &amp; Discovery Badges</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">
            Space Legacy Achievement Vault
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed break-words">
            Badges are earned through real exploration and curiosity—look up words in the AI Cosmic Dictionary, explore all Moon, Mars, or Deep Space hardware, or score 100% on mission quizzes!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 shrink-0 w-full lg:w-auto">
          <div className="rounded-2xl bg-[#080c21] border border-sky-400/30 p-3 sm:p-4 text-center">
            <Award className="w-5 h-5 text-sky-300 mx-auto mb-1" />
            <span className="block font-headline text-lg sm:text-2xl font-bold text-white">
              {unlockedBadges.length}/{ACHIEVEMENT_BADGES.length}
            </span>
            <span className="font-mono text-[10px] uppercase text-slate-400">
              Unlocked
            </span>
          </div>
          <div className="rounded-2xl bg-[#080c21] border border-amber-400/30 p-3 sm:p-4 text-center">
            <Sparkles className="w-5 h-5 text-amber-300 mx-auto mb-1" />
            <span className="block font-headline text-lg sm:text-2xl font-bold text-amber-300">
              {totalXp}
            </span>
            <span className="font-mono text-[10px] uppercase text-slate-400">
              Total XP
            </span>
          </div>
          <div className="rounded-2xl bg-[#080c21] border border-orange-400/30 p-3 sm:p-4 text-center">
            <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <span className="block font-headline text-lg sm:text-2xl font-bold text-orange-300">
              {Math.max(1, unlockedBadges.length)}
            </span>
            <span className="font-mono text-[10px] uppercase text-slate-400">
              Day Streak
            </span>
          </div>
        </div>
      </div>

      {/* Creative Interaction Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 w-full">
        {ACHIEVEMENT_BADGES.map((badge) => {
          const isUnlocked = unlockedBadges.includes(badge.id);
          const currentProg = Math.min(
            badge.targetProgress,
            badgeProgressMap[badge.id] || (isUnlocked ? badge.targetProgress : 0)
          );
          const percent = Math.round((currentProg / badge.targetProgress) * 100);

          return (
            <div
              key={badge.id}
              className={`rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-2 transition-all flex flex-col justify-between gap-4 w-full max-w-full ${
                isUnlocked
                  ? 'bg-[#111938] border-amber-400/60 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
                  : 'bg-[#0b1024] border-white/10 opacity-95 hover:border-sky-400/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shrink-0 border-2 ${
                      isUnlocked
                        ? 'bg-amber-400/20 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                        : 'bg-white/5 border-white/15 grayscale'
                    }`}
                  >
                    {badge.emoji}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] sm:text-xs uppercase text-amber-300 font-bold shrink-0">
                    +{badge.xpValue} XP
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline text-base sm:text-lg font-bold text-white break-words">
                      {badge.name}
                    </h2>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed break-words">
                    {badge.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs font-mono">
                    <span className="text-sky-300 break-words">
                      {badge.unlockCriteria}
                    </span>
                    <span className="text-white font-bold shrink-0">
                      {currentProg}/{badge.targetProgress}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#060814] overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-amber-400 transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                {isUnlocked ? (
                  <button
                    type="button"
                    onClick={() => onCelebrateBadge(badge)}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-400 text-[#060814] font-headline font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Celebrate Badge!</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (badge.id === 'lunar-pioneer')
                        onJumpToCatalogueSector('moon');
                      else if (badge.id === 'red-planet-rover')
                        onJumpToCatalogueSector('mars');
                      else if (badge.id === 'deep-space-voyager')
                        onJumpToCatalogueSector('deep space');
                      else onJumpToCatalogueSector('all');
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-sky-400/15 hover:bg-sky-400/25 border border-sky-400/40 text-sky-300 font-headline font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                  >
                    Explore Catalogue to Unlock →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
