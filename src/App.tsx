import React, { useEffect, useRef, useState } from 'react';
import {
  Award,
  Box,
  Compass,
  Flame,
  LayoutGrid,
  LogIn,
  LogOut,
  Rocket,
  Search,
  Sparkles,
  UserPlus,
} from 'lucide-react';
import { AuthModal, ExplorerUserProfile } from './components/AuthModal';
import { BadgeCelebrationModal } from './components/BadgeCelebrationModal';
import { CatalogueView } from './components/CatalogueView';
import { CosmicGlossaryAssistant } from './components/CosmicGlossaryAssistant';
import { DailyMysteryModal } from './components/DailyMysteryModal';
import { HomeView } from './components/HomeView';
import {
  DossierTabMode,
  MissionDossierModal,
} from './components/MissionDossierModal';
import {
  BadgesView,
  PlaygroundView,
  StatusMapView,
} from './components/SecondaryTabsView';
import {
  ACHIEVEMENT_BADGES,
  AchievementBadge,
  AgeTrack,
  DestinationFilter,
  LOGO_URL,
  MISSION_HARDWARE,
  MissionHardware,
  StatusFilter,
} from './data/missions';
import {
  NASA_AUTHENTIC_AUDIO_FEEDS,
  playAuthenticNasaSnippet,
  stopAuthenticNasaSnippet,
} from './utils/soundEffects';

type MainTab = 'home' | 'catalogue' | 'playground' | 'status' | 'badges';

const STORAGE_KEYS = {
  USER: 'space_legacy_user_v3',
  BADGES: 'space_legacy_badges_v3',
  EXPLORED: 'space_legacy_explored_v3',
  TRACK: 'space_legacy_track_v3',
  MYSTERY: 'space_legacy_mystery_v3',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('home');

  // Catalogue Filters
  const [selectedDestination, setSelectedDestination] =
    useState<DestinationFilter>('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persisted Explorer State
  const [ageTrack, setAgeTrack] = useState<AgeTrack>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRACK);
    return (saved as AgeTrack) || 'junior';
  });

  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BADGES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [exploredMissionIds, setExploredMissionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPLORED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dynamic interaction counters for Curious Spark & Lexicon Master
  const [dictionaryOpenCount, setDictionaryOpenCount] = useState<number>(0);
  const [exploredJargonTerms, setExploredJargonTerms] = useState<string[]>([]);

  const [currentUser, setCurrentUser] = useState<ExplorerUserProfile | null>(
    () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.USER);
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    }
  );

  const [isMysterySolved, setIsMysterySolved] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.MYSTERY) === 'true';
  });

  // Modals & Interactive States
  const [activeMissionDossier, setActiveMissionDossier] =
    useState<MissionHardware | null>(null);
  const [dossierInitialMode, setDossierInitialMode] =
    useState<DossierTabMode>('story');
  const [celebratingBadge, setCelebratingBadge] =
    useState<AchievementBadge | null>(null);
  const [isMysteryModalOpen, setIsMysteryModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [glossarySelectedTerm, setGlossarySelectedTerm] = useState<
    string | null
  >(null);

  // Authentic NASA Audio Stream State
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [selectedAudioTrackId, setSelectedAudioTrackId] = useState<string>(
    NASA_AUTHENTIC_AUDIO_FEEDS[0].id
  );
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const activeAudioTrack =
    NASA_AUTHENTIC_AUDIO_FEEDS.find((t) => t.id === selectedAudioTrackId) ||
    NASA_AUTHENTIC_AUDIO_FEEDS[0];

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRACK, ageTrack);
  }, [ageTrack]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.EXPLORED,
      JSON.stringify(exploredMissionIds)
    );
  }, [exploredMissionIds]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MYSTERY, String(isMysterySolved));
  }, [isMysterySolved]);

  useEffect(() => {
    return () => {
      stopAuthenticNasaSnippet();
    };
  }, []);

  const unlockAchievementBadge = (badgeId: string) => {
    setUnlockedBadges((prev) => {
      if (prev.includes(badgeId)) return prev;
      const found = ACHIEVEMENT_BADGES.find((b) => b.id === badgeId) || null;
      if (found) {
        setCelebratingBadge(found);
      }
      return [...prev, badgeId];
    });
  };

  // Handle dictionary word lookup & check "Curious Spark" and "Lexicon Master" badges
  const handleDictionaryWordLookup = (
    term: string,
    isTechnicalJargon: boolean
  ) => {
    setDictionaryOpenCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= 3) {
        unlockAchievementBadge('curious-spark');
      }
      return nextCount;
    });

    if (isTechnicalJargon) {
      setExploredJargonTerms((prev) => {
        const lower = term.toLowerCase();
        if (prev.includes(lower)) return prev;
        const updated = [...prev, lower];
        if (updated.length >= 3) {
          unlockAchievementBadge('lexicon-master');
        }
        return updated;
      });
    }
  };

  // Track explored missions & check sector and hardware-engineer badges
  const handleOpenMissionDossier = (
    mission: MissionHardware,
    mode: DossierTabMode = 'story'
  ) => {
    setDossierInitialMode(mode);
    setActiveMissionDossier(mission);

    setExploredMissionIds((prev) => {
      const updated = prev.includes(mission.id) ? prev : [...prev, mission.id];

      const moonIds = MISSION_HARDWARE.filter(
        (m) => m.destination === 'moon'
      ).map((m) => m.id);
      const marsIds = MISSION_HARDWARE.filter(
        (m) => m.destination === 'mars'
      ).map((m) => m.id);
      const deepIds = MISSION_HARDWARE.filter(
        (m) => m.destination === 'deep space'
      ).map((m) => m.id);

      if (moonIds.every((id) => updated.includes(id))) {
        unlockAchievementBadge('lunar-pioneer');
      }
      if (marsIds.every((id) => updated.includes(id))) {
        unlockAchievementBadge('red-planet-rover');
      }
      if (deepIds.every((id) => updated.includes(id))) {
        unlockAchievementBadge('deep-space-voyager');
      }
      if (updated.length >= 5) {
        unlockAchievementBadge('hardware-engineer');
      }

      return updated;
    });
  };

  // Calculate Total XP & Streak
  const totalXp =
    ACHIEVEMENT_BADGES.reduce(
      (sum, b) => (unlockedBadges.includes(b.id) ? sum + b.xpValue : sum),
      0
    ) + (isMysterySolved ? 150 : 0);

  const streakCount = Math.max(1, unlockedBadges.length);

  // Progress map for BadgesView
  const moonExploredCount = MISSION_HARDWARE.filter(
    (m) => m.destination === 'moon' && exploredMissionIds.includes(m.id)
  ).length;
  const marsExploredCount = MISSION_HARDWARE.filter(
    (m) => m.destination === 'mars' && exploredMissionIds.includes(m.id)
  ).length;
  const deepExploredCount = MISSION_HARDWARE.filter(
    (m) => m.destination === 'deep space' && exploredMissionIds.includes(m.id)
  ).length;

  const badgeProgressMap: Record<string, number> = {
    'curious-spark': dictionaryOpenCount,
    'lexicon-master': exploredJargonTerms.length,
    'lunar-pioneer': moonExploredCount,
    'red-planet-rover': marsExploredCount,
    'deep-space-voyager': deepExploredCount,
    'cosmic-genius': unlockedBadges.includes('cosmic-genius') ? 1 : 0,
    'hardware-engineer': exploredMissionIds.length,
    'signal-decoder': isMysterySolved ? 1 : 0,
  };

  const toggleAuthenticNasaAudio = () => {
    if (isAudioPlaying) {
      stopAuthenticNasaSnippet();
      setIsAudioPlaying(false);
    } else {
      playAuthenticNasaSnippet(selectedAudioTrackId);
      setIsAudioPlaying(true);
    }
  };

  const handleSelectNasaAudioTrack = (trackId: string) => {
    setSelectedAudioTrackId(trackId);
    playAuthenticNasaSnippet(trackId);
    setIsAudioPlaying(true);
  };

  const handleJumpToCatalogueSector = (dest: DestinationFilter) => {
    setSelectedDestination(dest);
    setSelectedStatus('all');
    setActiveTab('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFocusCatalogueSearch = () => {
    setActiveTab('catalogue');
    setTimeout(() => {
      searchInputRef.current?.focus();
      searchInputRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  };

  return (
    <div className="w-full max-w-full min-h-screen bg-[#060814] text-white flex flex-col selection:bg-sky-400/30 selection:text-sky-200">
      {/* Ambient Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[34rem] h-[34rem] rounded-full bg-sky-500/10 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-purple-500/10 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/4 w-[32rem] h-[32rem] rounded-full bg-amber-500/5 blur-[140px]" />
      </div>

      {/* TOP FULL-WIDTH NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full max-w-full bg-[#060814]/95 backdrop-blur-xl border-b border-white/10">
        <div className="w-full max-w-full px-3 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-3">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer min-w-0 shrink"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
              <img
                alt="Space Legacy Emblem"
                className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(140,179,188,0.35)] group-hover:scale-105 transition-transform"
                src={LOGO_URL}
              />
            </div>
            <div className="min-w-0">
              <span className="font-headline font-bold tracking-tight text-base sm:text-xl text-white group-hover:text-sky-300 transition-colors block leading-none truncate">
                Space Legacy
              </span>
            </div>
          </button>

          {/* Right Action Controls: Streak/XP, Search, and User Account Auth */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Streak & XP Pill */}
            <button
              type="button"
              onClick={() => setActiveTab('badges')}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#101633] hover:bg-[#161e42] border border-amber-400/30 text-xs font-mono cursor-pointer transition-colors"
              title="Your Mission Streak & XP"
            >
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400 shrink-0" />
              <span className="text-orange-300 font-bold">{streakCount}</span>
              <span className="text-white/20">|</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="text-amber-300 font-bold">{totalXp} XP</span>
            </button>

            {/* Quick Search Button */}
            <button
              type="button"
              onClick={handleFocusCatalogueSearch}
              className="p-2 sm:p-2.5 rounded-xl bg-[#101633] hover:bg-[#161e42] border border-white/15 text-slate-200 hover:text-sky-300 transition-colors cursor-pointer"
              aria-label="Search Catalogue"
              title="Search Catalogue"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* User Authentication Controls */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-2.5 sm:px-3 py-2 rounded-xl bg-sky-400/15 hover:bg-sky-400/25 border border-sky-400/40 text-white font-headline font-bold text-xs flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer"
                  title="Open Explorer Profile & Reading Track"
                >
                  <span className="text-base">{currentUser.avatarEmoji}</span>
                  <span className="hidden sm:inline max-w-[110px] truncate">
                    {currentUser.callsign}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentUser(null)}
                  className="p-2 sm:p-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/35 text-rose-200 transition-colors cursor-pointer"
                  title="Log Out"
                  aria-label="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 text-[#060814] font-headline font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_4px_15px_rgba(56,189,248,0.3)] hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
                >
                  <UserPlus className="w-3.5 h-3.5 shrink-0" />
                  <span>Sign Up</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="hidden sm:flex px-3 py-2 rounded-xl bg-[#101633] hover:bg-white/10 border border-white/15 text-slate-200 font-headline font-bold text-xs uppercase tracking-wider items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                >
                  <LogIn className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                  <span>Log In</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* FULL-SCREEN FLUID MAIN CONTENT CONTAINER */}
      <main className="relative z-10 w-full max-w-full flex-1 p-3.5 sm:p-6 md:p-8 pb-28">
        {activeTab === 'home' && (
          <HomeView
            isAudioPlaying={isAudioPlaying}
            activeAudioTrack={activeAudioTrack}
            onToggleAudio={toggleAuthenticNasaAudio}
            onSelectAudioTrack={handleSelectNasaAudioTrack}
            onJumpToDestination={handleJumpToCatalogueSector}
            onOpenMissionDossier={handleOpenMissionDossier}
            onOpenMysteryModal={() => setIsMysteryModalOpen(true)}
            isMysterySolved={isMysterySolved}
            unlockedBadgesCount={unlockedBadges.length}
            totalBadgesCount={ACHIEVEMENT_BADGES.length}
            onOpenGlossaryTerm={(term) => setGlossarySelectedTerm(term)}
          />
        )}

        {activeTab === 'catalogue' && (
          <CatalogueView
            selectedDestination={selectedDestination}
            onSelectDestination={setSelectedDestination}
            selectedStatus={selectedStatus}
            onSelectStatus={setSelectedStatus}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenMissionDossier={handleOpenMissionDossier}
            onOpenGlossaryTerm={(term) => setGlossarySelectedTerm(term)}
            exploredMissionIds={exploredMissionIds}
            ageTrack={ageTrack}
            searchInputRef={searchInputRef}
          />
        )}

        {activeTab === 'playground' && <PlaygroundView />}

        {activeTab === 'status' && (
          <StatusMapView
            onOpenMissionDossier={handleOpenMissionDossier}
            onJumpToCatalogueSector={handleJumpToCatalogueSector}
          />
        )}

        {activeTab === 'badges' && (
          <BadgesView
            unlockedBadges={unlockedBadges}
            badgeProgressMap={badgeProgressMap}
            onCelebrateBadge={(badge) => setCelebratingBadge(badge)}
            onJumpToCatalogueSector={handleJumpToCatalogueSector}
          />
        )}
      </main>

      {/* FLOATING UNIVERSAL COSMIC GLOSSARY MINI-DICTIONARY */}
      <CosmicGlossaryAssistant
        userName={currentUser?.callsign}
        externalSelectedWord={glossarySelectedTerm}
        onClearExternalWord={() => setGlossarySelectedTerm(null)}
        onWordLookedUp={handleDictionaryWordLookup}
      />

      {/* PERSISTENT BOTTOM NAVIGATION BAR ACROSS ALL SCREEN SIZES */}
      <nav
        aria-label="Primary navigation"
        className="fixed bottom-0 left-0 right-0 w-full max-w-full z-40 grid grid-cols-5 items-center px-1.5 py-2 bg-[#060814]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
      >
        {[
          { id: 'home' as MainTab, label: 'Home', icon: Rocket },
          { id: 'catalogue' as MainTab, label: 'Catalogue', icon: LayoutGrid },
          { id: 'playground' as MainTab, label: 'Playground', icon: Box },
          { id: 'status' as MainTab, label: 'Radar', icon: Compass },
          {
            id: 'badges' as MainTab,
            label: `Badges (${unlockedBadges.length})`,
            icon: Award,
          },
        ].map((item) => {
          const IconComp = item.icon;
          const isCurrent = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer min-w-0 ${
                isCurrent
                  ? 'text-sky-400 bg-sky-400/10 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <IconComp className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 shrink-0" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* INTERACTIVE MISSION HARDWARE DOSSIER (Story + Quiz) */}
      <MissionDossierModal
        mission={activeMissionDossier}
        initialMode={dossierInitialMode}
        ageTrack={ageTrack}
        onPerfectQuizScore={() => unlockAchievementBadge('cosmic-genius')}
        onOpenGlossaryTerm={(term) => setGlossarySelectedTerm(term)}
        onClose={() => setActiveMissionDossier(null)}
      />

      {/* FULL-SCREEN BADGE CELEBRATION MODAL */}
      <BadgeCelebrationModal
        badge={celebratingBadge}
        totalBadgesCount={unlockedBadges.length}
        maxBadgesCount={ACHIEVEMENT_BADGES.length}
        totalXp={totalXp}
        streakCount={streakCount}
        onClose={() => setCelebratingBadge(null)}
        onViewAllBadges={() => setActiveTab('badges')}
      />

      {/* DAILY MYSTERY SIGNAL DECODER MODAL */}
      <DailyMysteryModal
        isOpen={isMysteryModalOpen}
        onClose={() => setIsMysteryModalOpen(false)}
        onSolved={() => {
          setIsMysterySolved(true);
          unlockAchievementBadge('signal-decoder');
        }}
        isAlreadySolved={isMysterySolved}
        onOpenGlossaryTerm={(term) => setGlossarySelectedTerm(term)}
      />

      {/* USER AUTHENTICATION & CADET PASSPORT MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
        unlockedBadgesCount={unlockedBadges.length}
        totalXp={totalXp}
        streakCount={streakCount}
        ageTrack={ageTrack}
        onSelectAgeTrack={setAgeTrack}
      />
    </div>
  );
}
