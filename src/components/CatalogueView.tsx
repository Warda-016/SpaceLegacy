import React, { useMemo } from 'react';
import {
  Award,
  BookOpen,
  Bot,
  CheckCircle2,
  Compass,
  Database,
  Mic,
  Orbit,
  Rocket,
  RotateCcw,
  Satellite,
  Search,
  Sparkles,
  Sun,
  Telescope,
  X,
} from 'lucide-react';
import {
  AgeTrack,
  DestinationFilter,
  MISSION_HARDWARE,
  MissionHardware,
  StatusFilter,
} from '../data/missions';
import { DossierTabMode } from './MissionDossierModal';
import { GlossaryText } from './CosmicGlossaryAssistant';

interface CatalogueViewProps {
  selectedDestination: DestinationFilter;
  onSelectDestination: (dest: DestinationFilter) => void;
  selectedStatus: StatusFilter;
  onSelectStatus: (status: StatusFilter) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenMissionDossier: (mission: MissionHardware, mode?: DossierTabMode) => void;
  onOpenGlossaryTerm?: (term: string) => void;
  exploredMissionIds: string[];
  ageTrack?: AgeTrack;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

const DESTINATION_PILLS: {
  id: DestinationFilter;
  label: string;
  count: number;
}[] = [
  { id: 'all', label: 'All Missions', count: 13 },
  { id: 'moon', label: 'Moon', count: 3 },
  { id: 'mars', label: 'Mars', count: 6 },
  { id: 'deep space', label: 'Deep Space', count: 4 },
];

const STATUS_PILLS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All Statuses' },
  { id: 'active', label: 'Active' },
  { id: 'complete', label: 'Mission Complete' },
  { id: 'traveling', label: 'Traveling' },
  { id: 'historic', label: 'Historic' },
];

function renderHardwareIcon(iconCode: string) {
  switch (iconCode) {
    case 'satellite_alt':
      return <Satellite className="w-4 h-4 text-sky-300" />;
    case 'smart_toy':
      return <Bot className="w-4 h-4 text-amber-300" />;
    case 'solar_power':
      return <Sun className="w-4 h-4 text-amber-300" />;
    case 'flare':
      return <Sparkles className="w-4 h-4 text-purple-300" />;
    case 'public':
      return <Orbit className="w-4 h-4 text-sky-300" />;
    case 'rocket':
      return <Rocket className="w-4 h-4 text-slate-200" />;
    case 'visibility':
      return <Telescope className="w-4 h-4 text-purple-300" />;
    default:
      return <Compass className="w-4 h-4 text-sky-300" />;
  }
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  selectedDestination,
  onSelectDestination,
  selectedStatus,
  onSelectStatus,
  searchQuery,
  onSearchChange,
  onOpenMissionDossier,
  onOpenGlossaryTerm,
  exploredMissionIds,
  ageTrack = 'junior',
  searchInputRef,
}) => {
  const filteredMissions = useMemo(() => {
    return MISSION_HARDWARE.filter((item) => {
      const matchesDestination =
        selectedDestination === 'all' ||
        item.destination === selectedDestination;
      const matchesStatus =
        selectedStatus === 'all' || item.status === selectedStatus;

      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        normalizedQuery === '' ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.shortTitle.toLowerCase().includes(normalizedQuery) ||
        item.sectorLabel.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.launchText.toLowerCase().includes(normalizedQuery) ||
        item.badge.name.toLowerCase().includes(normalizedQuery) ||
        item.nasaArchiveId.toLowerCase().includes(normalizedQuery);

      return matchesDestination && matchesStatus && matchesSearch;
    });
  }, [selectedDestination, selectedStatus, searchQuery]);

  const handleVoicePreset = () => {
    const presets = [
      'Mars',
      'Voyager',
      'Apollo',
      'Phoenix',
      'Perseverance',
      'Moon',
    ];
    const currentIdx = presets.findIndex(
      (p) => p.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    const nextPreset = presets[(currentIdx + 1) % presets.length];
    onSearchChange(nextPreset);
  };

  const resetAllFilters = () => {
    onSelectDestination('all');
    onSelectStatus('all');
    onSearchChange('');
  };

  return (
    <div className="w-full max-w-full space-y-6 pb-16">
      {/* Top Section Header & Filter Controls */}
      <section className="w-full max-w-full rounded-2xl sm:rounded-3xl bg-[#0d132a]/90 border border-white/10 p-4 sm:p-6 md:p-7 shadow-xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 w-full">
          <div className="min-w-0 flex-1">
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-sky-400/15 border border-sky-400/30 text-sky-300 font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-2 max-w-full">
              <Database className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                Official NASA Hardware Archive (1969–Present)
              </span>
            </div>
            <h1 className="font-headline text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white break-words">
              Catalogue
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base mt-1.5 max-w-3xl leading-relaxed break-words">
              {onOpenGlossaryTerm ? (
                <GlossaryText
                  text="Explore all 13 iconic lunar landers, moon buggies, laser mirrors, Martian rovers, and interstellar pioneers in chronological order."
                  onSelectTerm={onOpenGlossaryTerm}
                />
              ) : (
                'Explore all 13 iconic lunar landers, moon buggies, laser mirrors, Martian rovers, and interstellar pioneers in chronological order.'
              )}
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full lg:w-96 relative shrink-0">
            <Search className="w-4 h-4 text-sky-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search missions, hardware, or NASA IDs..."
              aria-label="Search missions or hardware"
              className="w-full bg-[#070b1c] border border-white/15 rounded-2xl py-3 sm:py-3.5 pl-11 pr-20 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleVoicePreset}
                title="Cycle quick search preset"
                className="p-1.5 rounded-full hover:bg-sky-400/20 text-sky-300 transition-colors cursor-pointer"
                aria-label="Quick search preset"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-3 border-t border-white/10 w-full">
          {/* Destination Filter Pills */}
          <div className="lg:col-span-6 space-y-2 min-w-0">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-sky-300 block font-bold">
              Filter by Celestial Destination
            </span>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter hardware by destination"
            >
              {DESTINATION_PILLS.map((pill) => {
                const isActive = selectedDestination === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => onSelectDestination(pill.id)}
                    aria-pressed={isActive}
                    className={`px-3 sm:px-4 py-2 rounded-xl font-headline text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-sky-400 text-[#060814] shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                        : 'bg-[#080c21] text-slate-300 border border-white/10 hover:border-sky-400/40 hover:text-white'
                    }`}
                  >
                    <span>{pill.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-md font-mono text-[10px] ${
                        isActive
                          ? 'bg-[#060814]/20 text-[#060814]'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {pill.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Filter Pills */}
          <div className="lg:col-span-6 space-y-2 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-slate-300 block font-bold">
                Filter by Operational Status
              </span>
              <span className="font-mono text-xs text-sky-300 font-bold">
                Showing {filteredMissions.length} of {MISSION_HARDWARE.length} Items
              </span>
            </div>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter hardware by mission status"
            >
              {STATUS_PILLS.map((pill) => {
                const isActive = selectedStatus === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => onSelectStatus(pill.id)}
                    aria-pressed={isActive}
                    className={`px-3 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 font-bold'
                        : 'bg-[#080c21] text-slate-300 border border-white/10 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Hardware Cards Grid */}
      {filteredMissions.length === 0 ? (
        <div className="rounded-2xl sm:rounded-3xl bg-[#0d132a] p-8 sm:p-12 border border-white/10 text-center space-y-4 w-full">
          <div className="w-14 h-14 rounded-2xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center mx-auto text-sky-300">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="font-headline text-lg sm:text-xl font-bold text-white">
            No Missions Match Your Current Filter
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-md mx-auto">
            No hardware found in{' '}
            <span className="text-sky-300 uppercase font-mono">
              {selectedDestination}
            </span>{' '}
            with status{' '}
            <span className="text-amber-300 uppercase font-mono">
              {selectedStatus}
            </span>
            .
          </p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-400 text-[#060814] font-headline font-bold text-xs sm:text-sm uppercase tracking-widest cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Show All Catalogue Items</span>
          </button>
        </div>
      ) : (
        <section
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 w-full"
          aria-label="Mission hardware cards"
        >
          {filteredMissions.map((mission) => {
            const isExplored = exploredMissionIds.includes(mission.id);

            return (
              <article
                key={mission.id}
                className="group relative w-full max-w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0d132a] border border-white/10 hover:border-sky-400/50 transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div className="w-full">
                  {/* Image Header with Chronological Number & NASA PDS ID */}
                  <div
                    onClick={() => onOpenMissionDossier(mission, 'story')}
                    className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#060814] cursor-pointer"
                  >
                    <img
                      src={mission.imageUrl}
                      alt={mission.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d132a] via-[#0d132a]/30 to-transparent" />

                    {/* Top Left Chronological Index + Status */}
                    <div className="absolute top-3 left-3 right-14 flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg bg-[#060814]/90 backdrop-blur-md border border-sky-400/40 font-mono text-[10px] sm:text-xs font-bold text-sky-300">
                        #{String(mission.orderNumber).padStart(2, '0')}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#060814]/85 backdrop-blur-md border border-white/15 font-mono text-[10px] uppercase tracking-wider text-amber-300 font-semibold truncate max-w-full">
                        {mission.statusBadgeText}
                      </span>
                    </div>

                    {/* Top Right Hardware Icon */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {isExplored && (
                        <span
                          className="px-2 py-1 rounded-lg bg-emerald-500/90 text-[#060814] font-mono text-[10px] font-bold uppercase flex items-center gap-1 shadow"
                          title={`Explored Hardware: ${mission.title}`}
                        >
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                          <span className="hidden sm:inline">Explored</span>
                        </span>
                      )}
                      <div className="w-8 h-8 rounded-full bg-[#060814]/80 backdrop-blur-md flex items-center justify-center border border-white/15 shrink-0">
                        {renderHardwareIcon(mission.topRightIcon)}
                      </div>
                    </div>

                    {/* Bottom Image Caption: NASA Archive ID */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 text-[10px] font-mono text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-[#060814]/85 border border-white/10 text-sky-300 truncate max-w-[55%]">
                        {mission.sectorLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#060814]/85 border border-white/10 text-slate-300 truncate max-w-[42%]">
                        {mission.nasaArchiveId}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 space-y-3.5 sm:space-y-4">
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-amber-300 font-semibold block break-words">
                        {mission.launchText}
                      </span>
                      <h2 className="font-headline text-lg sm:text-xl font-bold text-white leading-snug mt-0.5 break-words">
                        {mission.title}
                      </h2>
                    </div>

                    {/* Age-Adapted Description with Universal Clickable Words */}
                    <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed break-words">
                      {onOpenGlossaryTerm ? (
                        <GlossaryText
                          text={mission.narrativesByTrack[ageTrack]}
                          onSelectTerm={onOpenGlossaryTerm}
                        />
                      ) : (
                        mission.narrativesByTrack[ageTrack]
                      )}
                    </p>

                    {/* Responsive 3-Column Telemetry Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-white/10">
                      {mission.telemetry.map((metric) => (
                        <div
                          key={metric.label}
                          onClick={() =>
                            onOpenGlossaryTerm && onOpenGlossaryTerm(metric.value)
                          }
                          className="rounded-xl bg-[#080c21] border border-white/5 p-2.5 cursor-pointer hover:border-sky-400/40 transition-colors min-w-0"
                          title="Click to define in Cosmic Dictionary"
                        >
                          <span className="block font-mono text-[10px] uppercase text-slate-400 tracking-wider truncate">
                            {metric.label}
                          </span>
                          <span className="font-mono text-xs sm:text-sm font-bold text-sky-300 truncate block mt-0.5">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Sector Badge Contribution Bar */}
                    <div className="rounded-xl bg-white/[0.03] border border-white/10 px-3 py-2.5 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-lg shrink-0">
                          {mission.badge.emoji}
                        </span>
                        <div className="min-w-0">
                          <span className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400">
                            Sector Achievement Track
                          </span>
                          <span className="font-headline font-bold text-xs sm:text-sm text-amber-300 truncate block">
                            {mission.badge.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Streamlined Action Buttons: Story + Quiz */}
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 grid grid-cols-12 gap-2.5 w-full">
                  <button
                    type="button"
                    onClick={() => onOpenMissionDossier(mission, 'story')}
                    className="col-span-8 py-3 px-3 bg-gradient-to-r from-sky-400 to-cyan-300 text-[#060814] font-headline font-bold text-xs sm:text-sm rounded-xl uppercase tracking-wider shadow-[0_6px_20px_rgba(56,189,248,0.25)] hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>Story</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenMissionDossier(mission, 'quiz')}
                    className="col-span-4 py-3 px-2.5 bg-emerald-400/15 hover:bg-emerald-400/25 border border-emerald-400/40 text-emerald-300 font-headline font-bold text-xs sm:text-sm rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Take Mission Quiz Challenge"
                  >
                    <Award className="w-4 h-4 shrink-0" />
                    <span>Quiz</span>
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
};
