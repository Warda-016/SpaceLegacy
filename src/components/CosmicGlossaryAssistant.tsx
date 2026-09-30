import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  Loader2,
  Search,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import {
  COSMIC_GLOSSARY_TERMS,
  GlossaryEntry,
  HIGHLIGHT_PHRASES,
  isKnownCosmicTerm,
  lookupAnyCosmicWord,
} from '../data/cosmicDictionaryData';
import { speakTextLoudly, stopLoudNarration } from '../utils/loudStoryAudio';

export { COSMIC_GLOSSARY_TERMS, lookupAnyCosmicWord };
export type { GlossaryEntry };

interface CosmicGlossaryAssistantProps {
  userName?: string;
  externalSelectedWord?: string | null;
  onClearExternalWord?: () => void;
  onWordLookedUp?: (term: string, isTechnicalJargon: boolean) => void;
}

const AI_CACHE_STORAGE_KEY = 'space_legacy_ai_dictionary_cache_v1';

export const CosmicGlossaryAssistant: React.FC<CosmicGlossaryAssistantProps> = ({
  userName,
  externalSelectedWord,
  onClearExternalWord,
  onWordLookedUp,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEntry, setActiveEntry] = useState<GlossaryEntry | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiGeneratedTerms, setAiGeneratedTerms] = useState<
    Record<string, GlossaryEntry>
  >(() => {
    try {
      const saved = localStorage.getItem(AI_CACHE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  // Persist dictionary cache to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        AI_CACHE_STORAGE_KEY,
        JSON.stringify(aiGeneratedTerms)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [aiGeneratedTerms]);

  const stopSpeech = () => {
    stopLoudNarration();
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      stopLoudNarration();
    };
  }, []);

  // Query dictionary for any word or phrase
  const fetchAiDefinition = async (rawWord: string, forceAi = false) => {
    const cleaned = rawWord.trim();
    if (!cleaned || cleaned.length < 2) return;
    stopSpeech();

    const cacheKey = cleaned.toLowerCase();

    // Check cache first
    if (aiGeneratedTerms[cacheKey]) {
      const cached = aiGeneratedTerms[cacheKey];
      setActiveEntry(cached);
      if (onWordLookedUp) {
        onWordLookedUp(cached.term, Boolean(cached.isTechnicalJargon));
      }
      return;
    }

    // Show immediate local lookup first so UI is zero-latency
    const instantEntry = lookupAnyCosmicWord(cleaned);
    setActiveEntry(instantEntry);

    if (!forceAi && isKnownCosmicTerm(cleaned)) {
      if (onWordLookedUp) {
        onWordLookedUp(
          instantEntry.term,
          Boolean(instantEntry.isTechnicalJargon)
        );
      }
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsAiLoading(true);
    try {
      const response = await fetch('/api/cosmic-dictionary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term: cleaned }),
        signal: controller.signal,
      });

      if (response.ok) {
        const aiEntry: GlossaryEntry = await response.json();
        setAiGeneratedTerms((prev) => ({
          ...prev,
          [cacheKey]: aiEntry,
        }));
        setActiveEntry(aiEntry);
        if (onWordLookedUp) {
          onWordLookedUp(aiEntry.term, Boolean(aiEntry.isTechnicalJargon));
        }
      } else {
        if (onWordLookedUp) {
          onWordLookedUp(
            instantEntry.term,
            Boolean(instantEntry.isTechnicalJargon)
          );
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      if (onWordLookedUp) {
        onWordLookedUp(
          instantEntry.term,
          Boolean(instantEntry.isTechnicalJargon)
        );
      }
    } finally {
      if (abortControllerRef.current === controller) {
        setIsAiLoading(false);
      }
    }
  };

  const triggerWordLookup = (rawWord: string, forceAi = false) => {
    const cleaned = rawWord.trim();
    if (!cleaned) return;
    setIsOpen(true);
    setSearchQuery(cleaned);
    void fetchAiDefinition(cleaned, forceAi);
  };

  // Sync when user clicks a word via externalSelectedWord
  useEffect(() => {
    if (!externalSelectedWord) return;
    triggerWordLookup(externalSelectedWord);
  }, [externalSelectedWord]);

  // Listen for text selection or double-click on any word across the site
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[data-glossary-widget="true"]')) return;
      const selection = window.getSelection()?.toString().trim();
      if (!selection || selection.length < 2 || selection.length > 40) return;
      if (isKnownCosmicTerm(selection) || /\d/.test(selection)) {
        triggerWordLookup(selection);
      }
    };

    const handleDoubleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[data-glossary-widget="true"]')) return;
      const selection = window.getSelection()?.toString().trim();
      if (selection && selection.length >= 2 && selection.length <= 40) {
        triggerWordLookup(selection);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('dblclick', handleDoubleClick);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('dblclick', handleDoubleClick);
    };
  }, []);

  const toggleSpeakDefinition = (entry: GlossaryEntry) => {
    // Second click turns audio off immediately
    if (isSpeaking) {
      stopLoudNarration();
      setIsSpeaking(false);
      return;
    }

    speakTextLoudly({
      text: `${entry.term}. ${entry.kidDefinition} ${entry.playfulAnalogy}`,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const displayUserName = userName?.trim() || 'Explorer';

  return (
    <div
      data-glossary-widget="true"
      className="fixed bottom-20 right-3 sm:right-6 z-[85] flex flex-col items-end max-w-[calc(100vw-1.5rem)]"
    >
      {/* Expanded Floating Cosmic Dictionary Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Cosmic Dictionary"
          className="mb-3 w-[calc(100vw-1.5rem)] sm:w-[26rem] max-w-full rounded-3xl bg-[#0d132b]/95 backdrop-blur-2xl border-2 border-sky-400/50 shadow-[0_24px_70px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="px-4 sm:px-5 py-3.5 bg-gradient-to-r from-sky-500/25 via-indigo-500/20 to-amber-500/20 border-b border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-sky-400/20 border border-sky-400/40 flex items-center justify-center text-sky-300 shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-headline text-sm sm:text-base font-bold text-white truncate">
                Cosmic Dictionary
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                stopSpeech();
                setIsOpen(false);
                if (onClearExternalWord) onClearExternalWord();
              }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close Cosmic Dictionary"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-3.5 sm:p-4 border-b border-white/10 bg-[#080c20]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  void fetchAiDefinition(searchQuery.trim(), false);
                }
              }}
              className="flex items-center gap-2 w-full"
            >
              <div className="relative flex-1 min-w-0">
                <Search className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchQuery(val);
                    if (!val.trim()) {
                      stopSpeech();
                      setActiveEntry(null);
                    }
                  }}
                  placeholder="Type a word and press Search..."
                  className="w-full bg-[#111736] border border-white/15 rounded-xl py-2.5 pl-9 pr-8 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      stopSpeech();
                      setSearchQuery('');
                      setActiveEntry(null);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                    aria-label="Clear dictionary search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={!searchQuery.trim() || isAiLoading}
                className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 text-[#060814] font-headline font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.3)]"
              >
                {isAiLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* Body: Initial Prompt or Searched Word Pronunciation + 2-3 Line Easy Explanation */}
          <div className="p-4 sm:p-5 space-y-3.5">
            {!activeEntry && !isAiLoading ? (
              <p className="text-sm sm:text-base text-slate-200 font-medium text-center py-3">
                Which word do you want to understand,{' '}
                <span className="text-sky-300 font-bold">{displayUserName}</span>?
              </p>
            ) : (
              <>
                {isAiLoading && (
                  <div className="rounded-2xl bg-sky-400/10 border border-sky-400/30 px-3.5 py-2.5 flex items-center gap-2.5 text-xs text-sky-200 font-mono">
                    <Loader2 className="w-4 h-4 text-sky-400 animate-spin shrink-0" />
                    <span>
                      Finding an easy explanation for &ldquo;{searchQuery.trim()}&rdquo;...
                    </span>
                  </div>
                )}

                {activeEntry && (
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-headline text-base sm:text-lg font-bold text-white break-words">
                          {activeEntry.term}
                        </h4>
                        <p className="font-mono text-xs text-amber-300 mt-0.5 break-words">
                          Say it: &ldquo;{activeEntry.pronunciation}&rdquo;
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSpeakDefinition(activeEntry)}
                        aria-pressed={isSpeaking}
                        className={`p-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                          isSpeaking
                            ? 'bg-sky-400 text-[#060814] border-sky-300 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                            : 'bg-sky-400/15 hover:bg-sky-400/25 border-sky-400/30 text-sky-300'
                        }`}
                        title={
                          isSpeaking
                            ? 'Click to stop audio'
                            : 'Listen to pronunciation and explanation'
                        }
                        aria-label={
                          isSpeaking
                            ? 'Stop audio pronunciation'
                            : 'Listen to pronunciation and explanation'
                        }
                      >
                        {isSpeaking ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* 2 to 3 Lines Easy Explanation */}
                    <div className="rounded-2xl bg-[#141c3f] border border-white/10 p-3.5">
                      <p className="text-xs sm:text-sm text-slate-100 leading-relaxed line-clamp-3 break-words">
                        {activeEntry.kidDefinition}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Persistent Floating Launcher Pill */}
      <button
        type="button"
        onClick={() => {
          const nextOpen = !isOpen;
          if (!nextOpen) {
            stopSpeech();
          } else {
            setSearchQuery('');
            setActiveEntry(null);
          }
          setIsOpen(nextOpen);
        }}
        className="group flex items-center gap-2 sm:gap-2.5 px-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#0e1738] via-[#13204d] to-[#19285c] hover:from-sky-400 hover:to-cyan-300 text-white hover:text-[#060814] border-2 border-sky-400/60 shadow-[0_10px_35px_rgba(56,189,248,0.4)] transition-all duration-300 cursor-pointer max-w-full"
        aria-expanded={isOpen}
        aria-label="Toggle Cosmic Dictionary"
      >
        <span className="w-7 h-7 rounded-full bg-sky-400/20 group-hover:bg-[#060814]/20 flex items-center justify-center text-base shrink-0">
          📖
        </span>
        <span className="font-headline text-xs sm:text-sm font-bold leading-tight flex items-center gap-1 pr-1 truncate">
          <span>Cosmic Dictionary</span>
          <HelpCircle className="w-3.5 h-3.5 opacity-80 shrink-0" />
        </span>
      </button>
    </div>
  );
};

/**
 * Renders text with interactive clickable technical terms and space vocabulary.
 */
const PHRASE_SET = new Set(HIGHLIGHT_PHRASES.map((p) => p.toLowerCase()));
const ESCAPED_PHRASES = HIGHLIGHT_PHRASES.map((p) =>
  p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
).join('|');
const TOKEN_REGEX = new RegExp(`(${ESCAPED_PHRASES}|\\S+|\\s+)`, 'gi');

export const GlossaryText: React.FC<{
  text: string;
  onSelectTerm: (term: string) => void;
}> = ({ text = '', onSelectTerm }) => {
  const safeText = typeof text === 'string' ? text : '';
  const tokens = useMemo(
    () => safeText.match(TOKEN_REGEX) || [safeText],
    [safeText]
  );

  return (
    <>
      {tokens.map((token, idx) => {
        if (/^\s+$/.test(token)) {
          return <React.Fragment key={idx}>{token}</React.Fragment>;
        }

        const stripped = token.replace(
          /^[^a-zA-Z0-9°+-]+|[^a-zA-Z0-9°+₂-]+$/g,
          ''
        );

        if (!stripped) {
          return <React.Fragment key={idx}>{token}</React.Fragment>;
        }

        const lowerStripped = stripped.toLowerCase();
        const isHighlightedJargon =
          PHRASE_SET.has(lowerStripped) ||
          PHRASE_SET.has(token.trim().toLowerCase());

        if (isHighlightedJargon) {
          return (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectTerm(stripped);
              }}
              className="inline font-semibold text-sky-300 underline decoration-sky-400 decoration-dotted underline-offset-4 hover:text-amber-300 hover:bg-sky-400/15 px-0.5 rounded transition-colors cursor-pointer break-words text-left"
              title={`Click to explain "${stripped}" in the Cosmic Dictionary`}
            >
              {token}
            </button>
          );
        }

        const isKnownWord = isKnownCosmicTerm(stripped);
        if (isKnownWord) {
          return (
            <span
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                onSelectTerm(stripped);
              }}
              className="cursor-pointer rounded px-[1px] underline decoration-white/25 decoration-dotted underline-offset-4 hover:bg-sky-400/15 hover:text-sky-200 hover:decoration-sky-400 transition-colors break-words"
              title={`Click to define "${stripped}" in the Cosmic Dictionary`}
            >
              {token}
            </span>
          );
        }

        if (stripped.length >= 3) {
          return (
            <span
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                onSelectTerm(stripped);
              }}
              className="cursor-pointer rounded px-[1px] hover:bg-sky-400/15 hover:text-sky-200 hover:underline hover:decoration-sky-400 hover:decoration-dotted underline-offset-4 transition-colors break-words"
              title={`Click to look up "${stripped}" in the Cosmic Dictionary`}
            >
              {token}
            </span>
          );
        }

        return <React.Fragment key={idx}>{token}</React.Fragment>;
      })}
    </>
  );
};
