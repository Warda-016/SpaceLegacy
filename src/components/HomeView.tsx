import React from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  Headphones,
  HelpCircle,
  Radio,
  Sparkles,
  Volume2,
} from 'lucide-react';
import {
  DAILY_MYSTERY,
  DESTINATION_SECTORS,
  DestinationFilter,
  MISSION_HARDWARE,
  MissionHardware,
} from '../data/missions';
import { DossierTabMode } from './MissionDossierModal';
import { GlossaryText } from './CosmicGlossaryAssistant';
import { NASA_AUTHENTIC_AUDIO_FEEDS, NasaAudioTrack } from '../utils/soundEffects';

interface HomeViewProps {
  isAudioPlaying: boolean;
  activeAudioTrack: NasaAudioTrack;
  onToggleAudio: () => void;
  onSelectAudioTrack: (trackId: string) => void;
  onJumpToDestination: (dest: DestinationFilter) => void;
  onOpenMissionDossier: (mission: MissionHardware, mode?: DossierTabMode) => void;
  onOpenMysteryModal: () => void;
  isMysterySolved: boolean;
  unlockedBadgesCount: number;
  totalBadgesCount: number;
  onOpenGlossaryTerm?: (term: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  isAudioPlaying,
  activeAudioTrack,
  onToggleAudio,
  onSelectAudioTrack,
  onJumpToDestination,
  onOpenMissionDossier,
  onOpenMysteryModal,
  isMysterySolved,
  unlockedBadgesCount,
  totalBadgesCount,
  onOpenGlossaryTerm,
}) => {
  // Featured 4 spotlight missions representing Moon, Deep Space, and Mars eras
  const spotlightMissions = MISSION_HARDWARE.filter((m) =>
    [
      'apollo-landing-hardware',
      'voyager-1',
      'opportunity-rover',
      'perseverance-rover',
    ].includes(m.id)
  );

  return (
    <div className="w-full max-w-full space-y-8 sm:space-y-10 pb-12">
      {/* 1. FULL-WIDTH HERO BANNER */}
      <section className="relative w-full max-w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-sky-400/25 bg-[#090d22] shadow-[0_24px_80px_rgba(0,0,0,0.75)]">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/sectors/mars.jpg"
            alt="Deep Space NASA Telemetry Horizon"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060814] via-[#060814]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060814] via-transparent to-[#060814]/50" />
        </div>

        <div className="relative z-10 p-4 sm:p-8 md:p-12 space-y-5 sm:space-y-6 w-full">
          <div className="max-w-4xl space-y-4 sm:space-y-5 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-400/15 border border-sky-400/35 text-sky-300 font-mono text-[10px] sm:text-xs uppercase tracking-wider font-bold max-w-full">
                <Radio className="w-3.5 h-3.5 animate-pulse shrink-0" />
                <span className="truncate">
                  NASA Planetary Data System • 13 Historic Missions
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/35 text-amber-300 font-mono text-[10px] sm:text-xs uppercase tracking-wider font-bold">
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {unlockedBadgesCount} / {totalBadgesCount} Badges Earned
                </span>
              </span>
            </div>

            <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] break-words">
              ABANDONED{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-300">
                BUT NOT LOST.
              </span>
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm md:text-lg max-w-3xl leading-relaxed break-words">
              {onOpenGlossaryTerm ? (
                <GlossaryText
                  text="Across the dusty plains of the Moon, the red canyons of Mars, and the freezing edge of the heliosphere, 13 heroic NASA hardware pioneers rest where their missions concluded. Explore their interactive stories, decode real telemetry, and unlock dynamic achievement badges!"
                  onSelectTerm={onOpenGlossaryTerm}
                />
              ) : (
                'Across the dusty plains of the Moon, the red canyons of Mars, and the freezing edge of the heliosphere, 13 heroic NASA hardware pioneers rest where their missions concluded.'
              )}
            </p>

            {/* Primary Action Button */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1 w-full">
              <button
                type="button"
                onClick={() => onJumpToDestination('all')}
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-300 text-[#060814] font-headline font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider shadow-[0_10px_30px_rgba(56,189,248,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Compass className="w-5 h-5 shrink-0" />
                <span>Open Catalogue</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CELESTIAL DESTINATIONS PORTALS (Moon, Mars, Deep Space) */}
      <section className="w-full max-w-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-amber-300 font-bold block">
              3 Planetary Sectors • 13 Hardware Pioneers
            </span>
            <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Select a Celestial Destination
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onJumpToDestination('all')}
            className="text-xs sm:text-sm font-mono uppercase tracking-wider text-sky-300 hover:text-white flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>Open Catalogue</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full">
          {DESTINATION_SECTORS.map((sector) => (
            <div
              key={sector.id}
              onClick={() => onJumpToDestination(sector.id)}
              className="group relative min-h-[16rem] sm:min-h-[18rem] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 hover:border-sky-400 transition-all cursor-pointer shadow-xl flex flex-col justify-between p-4 sm:p-5"
            >
              <img
                src={sector.imageUrl}
                alt={sector.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060814] via-[#060814]/70 to-[#060814]/30 pointer-events-none" />

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-1.5 w-full">
                <span className="px-2.5 py-0.5 rounded-full bg-[#060814]/85 backdrop-blur-md border border-sky-400/40 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-sky-300 font-bold">
                  {sector.badgeText}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#060814]/85 font-mono text-[9px] sm:text-[10px] text-amber-300 border border-white/10">
                  {sector.auText}
                </span>
              </div>

              <div className="relative z-10 space-y-1.5 pt-8">
                <h3 className="font-headline text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight break-words">
                  {sector.title}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-[13px] text-slate-200 leading-relaxed break-words">
                  {onOpenGlossaryTerm ? (
                    <GlossaryText
                      text={sector.description}
                      onSelectTerm={onOpenGlossaryTerm}
                    />
                  ) : (
                    sector.description
                  )}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-sky-300 font-headline font-bold text-[11px] sm:text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>{sector.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MISSION STORIES & QUIZ LAUNCHERS */}
      <section className="w-full max-w-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Explore Mission Stories &amp; Quizzes
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onJumpToDestination('all')}
            className="text-xs sm:text-sm font-mono uppercase tracking-wider text-sky-300 hover:text-white flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>Browse Full Catalogue</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
          {spotlightMissions.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl sm:rounded-3xl bg-[#0d132a] border border-white/10 hover:border-sky-400/50 p-4 flex flex-col justify-between gap-4 transition-all shadow-lg w-full max-w-full"
            >
              <div className="space-y-3">
                <div
                  onClick={() => onOpenMissionDossier(m, 'story')}
                  className="relative h-36 rounded-2xl overflow-hidden bg-[#060814] cursor-pointer"
                >
                  <img
                    src={m.imageUrl}
                    alt={m.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#060814]/85 font-mono text-[10px] text-sky-300 border border-sky-400/30">
                    #{String(m.orderNumber).padStart(2, '0')} • {m.launchYear}
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#060814]/85 font-mono text-[10px] text-amber-300 max-w-[85%] truncate">
                    {m.badge.emoji} {m.badge.name}
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 block truncate">
                    {m.sectorLabel}
                  </span>
                  <h3 className="font-headline text-base sm:text-lg font-bold text-white break-words">
                    {m.shortTitle}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onOpenMissionDossier(m, 'story')}
                  className="py-2.5 px-2.5 rounded-xl bg-sky-400 text-[#060814] font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>Story</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenMissionDossier(m, 'quiz')}
                  className="py-2.5 px-2.5 rounded-xl bg-emerald-400/15 hover:bg-emerald-400/25 border border-emerald-400/40 text-emerald-300 font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 shrink-0" />
                  <span>Quiz</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NASA AUDIO FEED SECTION */}
      <section className="w-full max-w-full rounded-2xl sm:rounded-3xl bg-[#0b1026] border border-sky-400/30 p-5 sm:p-7 md:p-8 space-y-5 shadow-xl">
        {/* Top Header & Description */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-lg bg-sky-400/15 border border-sky-400/35 text-sky-300 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse shrink-0" />
              <span>
                Official NASA PDS &amp; Archival Audio ({activeAudioTrack.nasaArchiveId})
              </span>
            </div>
            <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white">
              NASA Audio Feed
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
              {activeAudioTrack.description}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              type="button"
              onClick={onToggleAudio}
              aria-pressed={isAudioPlaying}
              className={`px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl border font-headline font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                isAudioPlaying
                  ? 'bg-sky-400 text-[#060814] border-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.45)]'
                  : 'bg-sky-400/15 border-sky-400/40 text-sky-200 hover:bg-sky-400/25'
              }`}
            >
              {isAudioPlaying ? (
                <Volume2 className="w-5 h-5 animate-pulse shrink-0" />
              ) : (
                <Headphones className="w-5 h-5 shrink-0" />
              )}
              <span>
                {isAudioPlaying ? 'Stop Audio' : 'Play Audio'}
              </span>
            </button>
          </div>
        </div>

        {/* Mission Audio Track Selector Bar */}
        <div className="rounded-2xl bg-[#070b1c] border border-white/10 p-4 sm:p-5 space-y-3.5 w-full">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 font-bold">
              Select Mission Telemetry Audio Stream:
            </span>
            <span
              className={`font-mono text-[10px] sm:text-xs font-bold ${
                isAudioPlaying ? 'text-emerald-300' : 'text-amber-300'
              }`}
            >
              {isAudioPlaying
                ? `● Now Playing: ${activeAudioTrack.mission} (100% Max Volume)`
                : 'Click Any Mission Below to Stream Audio'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 w-full">
            {NASA_AUTHENTIC_AUDIO_FEEDS.map((track) => {
              const isCurrent = track.id === activeAudioTrack.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => onSelectAudioTrack(track.id)}
                  className={`p-3.5 rounded-xl font-mono text-left border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isCurrent
                      ? 'bg-sky-400/20 border-sky-400 text-white font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      : 'bg-[#0d132a] border-white/10 text-slate-300 hover:text-white hover:border-white/25'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm block truncate">
                      {track.mission}
                    </span>
                    <span className="text-[10px] text-sky-300/80 block truncate mt-0.5">
                      {track.nasaArchiveId}
                    </span>
                  </div>
                  <Volume2
                    className={`w-4 h-4 shrink-0 ${
                      isCurrent && isAudioPlaying
                        ? 'text-sky-300 animate-bounce'
                        : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. DAILY MYSTERY SIGNAL BANNER */}
      <section className="w-full max-w-full rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#13193b] via-[#181c42] to-[#1f1638] border border-amber-400/35 p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl min-w-0">
          <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold">
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Daily Deep Space Network Mystery Signal</span>
          </div>
          <h3 className="font-headline text-lg sm:text-xl md:text-2xl font-bold text-white break-words">
            {DAILY_MYSTERY.title}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed break-words">
            {onOpenGlossaryTerm ? (
              <GlossaryText
                text={DAILY_MYSTERY.context}
                onSelectTerm={onOpenGlossaryTerm}
              />
            ) : (
              DAILY_MYSTERY.context
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenMysteryModal}
          className={`w-full md:w-auto justify-center px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-headline font-bold text-xs sm:text-sm uppercase tracking-widest shrink-0 flex items-center gap-2 transition-all cursor-pointer ${
            isMysterySolved
              ? 'bg-emerald-400/20 border border-emerald-400/50 text-emerald-300'
              : 'bg-amber-400 text-[#060814] shadow-[0_8px_25px_rgba(245,158,11,0.35)] hover:brightness-110'
          }`}
        >
          {isMysterySolved ? (
            <>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Signal Decoded (+150 XP)</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Decode Mystery Signal</span>
            </>
          )}
        </button>
      </section>
    </div>
  );
};
