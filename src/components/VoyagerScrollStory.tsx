import React, { useEffect, useRef, useState } from 'react';
import {
  Award,
  CheckCircle2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { playLoudNarration, stopLoudNarration } from '../utils/loudStoryAudio';

interface VoyagerScrollStoryProps {
  onStartQuiz?: () => void;
}

interface StoryScene {
  id: string;
  stepNumber: number;
  shortLabel: string;
  whenLabel: string;
  headline: string;
  kidStory: string;
  spokenNarration: string;
  kidTakeaway: string;
}

const VOYAGER_SCENES: StoryScene[] = [
  {
    id: 'grand-tour-alignment',
    stepNumber: 1,
    shortLabel: '1. 176-Year Lineup (1977)',
    whenLabel: 'STEP 1 OF 6 • SUMMER 1977 • ONCE-IN-176-YEARS PLANET LINEUP',
    headline: 'A Cosmic Gift That Happens Once Every 176 Years: The 4-Planet Slingshot!',
    kidStory:
      'In 1977, NASA noticed a super-rare cosmic gift: the four giant outer planets—Jupiter, Saturn, Uranus, and Neptune—were lining up in a curve that only happens once every 176 years! NASA launched twin probes Voyager 1 and Voyager 2 to use each giant planet’s gravity like a slingshot, cutting the trip to Neptune from 30 years down to just 12 years!',
    spokenNarration:
      'Step 1: The Once-in-176-Years Planet Lineup! In 1977, twin probes Voyager 1 and Voyager 2 launched to ride a rare 176-year lineup of the four giant outer planets—using each planet’s gravity like a slingshot to zoom faster and faster!',
    kidTakeaway:
      '🪐 Next Lineup = Year 2153: Because the outer planets orbit so slowly, this 4-planet slingshot path won’t happen again until the 22nd century!',
  },
  {
    id: 'jupiter-saturn-volcanoes',
    stepNumber: 2,
    shortLabel: '2. Space Volcanoes!',
    whenLabel: 'STEP 2 OF 6 • 1979–1981 • JUPITER & SATURN ENCOUNTERS',
    headline: 'Erupting Volcanoes on Jupiter’s Moon Io & Braided Rings at Saturn!',
    kidStory:
      'Zooming past Jupiter in 1979, the Voyagers shocked the world by spotting 9 active volcanoes shooting plumes 180 miles into space on Jupiter’s colorful pizza-looking moon Io—the first active volcanoes ever seen beyond Earth! Then at Saturn, they discovered braided rings and confirmed giant orange moon Titan had a thick sky!',
    spokenNarration:
      'Step 2: Active Volcanoes at Jupiter and Braided Rings at Saturn! Racing past Jupiter and Saturn, the Voyagers discovered erupting volcanoes on Jupiter’s moon Io, an icy ocean crust on Europa, and thousands of ringlets around Saturn!',
    kidTakeaway:
      '🌋 Why Does Io Erupt? Giant Jupiter’s gravity squeezes and stretches moon Io like a rubber ball, melting its insides into fiery lava!',
  },
  {
    id: 'uranus-neptune-tour',
    stepNumber: 3,
    shortLabel: '3. Uranus & Neptune!',
    whenLabel: 'STEP 3 OF 6 • 1986 & 1989 • VOYAGER 2’S ICE GIANT RECORD',
    headline: 'Voyager 2 Visits Sideways Uranus & 1,200-MPH Winds at Neptune!',
    kidStory:
      'After Saturn, Voyager 1 headed upward toward the stars while twin sister Voyager 2 kept going—becoming the ONLY spacecraft in history to visit icy blue Uranus (1986), which rolls on its side like a barrel, and deep-blue Neptune (1989), where it clocked 1,200-mph supersonic winds and nitrogen ice geysers on Neptune’s moon Triton!',
    spokenNarration:
      'Step 3: Voyager 2 visits sideways Uranus and windy Neptune! While Voyager 1 headed upward toward the stars, twin Voyager 2 became the only spacecraft in history to visit icy blue Uranus and stormy Neptune with its 1,200 mile per hour winds!',
    kidTakeaway:
      '💨 Fastest Winds in the Solar System: Neptune’s winds blow at 1,200 miles per hour—faster than the speed of sound on Earth!',
  },
  {
    id: 'pale-blue-dot',
    stepNumber: 4,
    shortLabel: '4. Pale Blue Dot (1990)',
    whenLabel: 'STEP 4 OF 6 • FEBRUARY 14, 1990 • 3.7 BILLION MILES FROM HOME',
    headline: 'One Last Look Back at Home: Earth as a Tiny "Pale Blue Dot"!',
    kidStory:
      'On Valentine’s Day 1990, from 3.7 billion miles away, astronomer Carl Sagan asked NASA to turn Voyager 1’s camera around one last time before shutting the cameras off forever to save electricity. In that famous photo, our entire planet Earth—with every person who ever lived—appeared as a tiny speck smaller than a single pixel floating in a sunbeam!',
    spokenNarration:
      'Step 4: The Pale Blue Dot! On Valentine’s Day 1990, from four billion miles away, Voyager 1 turned its camera around one last time and snapped a photo of Earth as a tiny Pale Blue Dot floating in a sunbeam!',
    kidTakeaway:
      '🌎 0.12 Pixels Wide: From 3.7 billion miles away, all of Earth fit inside one-eighth of a single camera pixel!',
  },
  {
    id: 'golden-record-interstellar',
    stepNumber: 5,
    shortLabel: '5. Golden Record & Stars',
    whenLabel: 'STEP 5 OF 6 • 2012 & 2018 • CROSSING INTO INTERSTELLAR SPACE',
    headline: 'Popping Out of the Sun’s Bubble Carrying a Golden Record for Aliens!',
    kidStory:
      'In August 2012 (Voyager 1) and November 2018 (Voyager 2), both twins popped right through the "Heliopause"—the outer edge of our Sun’s magnetic bubble—into interstellar space between the stars! Bolted to each probe’s side is a 12-inch Golden Phonograph Record (with a needle included!) holding 115 pictures, whale songs, music, and "Hello!" in 55 languages!',
    spokenNarration:
      'Step 5: Carrying the Golden Record into Interstellar Space! In 2012 and 2018, Voyager 1 and Voyager 2 popped right out of the Sun’s magnetic bubble into interstellar space between the stars—carrying golden records of Earth music and greetings in 55 languages!',
    kidTakeaway:
      '💿 Built to Last 1 Billion Years: Long after humans explore the galaxy, Voyager’s gold-plated copper record will still be playable in deep space!',
  },
  {
    id: 'whisper-today',
    stepNumber: 6,
    shortLabel: '6. Today: 15+ Billion Mi!',
    whenLabel: 'STEP 6 OF 6 • 162+ AU FROM EARTH • STILL TALKING TODAY!',
    headline: 'Still Alive Today at 15+ Billion Miles: A 23-Watt Refrigerator-Bulb Whisper!',
    kidStory:
      'Nearly 50 years after launch, Voyager 1 (over 15 billion miles away!) and Voyager 2 (over 12.8 billion miles away!) are STILL ALIVE and talking to Earth! Powered by 3 warm nuclear batteries, Voyager’s radio transmitter uses only 23 watts—about the same as a refrigerator lightbulb! Moving at the speed of light, a single "Hello" takes over 22.5 hours to reach NASA’s giant dish antennas!',
    spokenNarration:
      'Step 6: Still talking from 15 billion miles away! Nearly 50 years after launch, Voyager 1 and 2 are still alive over 15 billion miles from Earth! Their 23-watt radio whisper takes over 22 hours moving at the speed of light to reach NASA’s giant dish antennas!',
    kidTakeaway:
      '🛠️ 15-Billion-Mile Computer Repair: When a memory chip broke on Voyager 1 in 2024, NASA beamed new software across 15 billion miles (a 45-hour round trip!) and fixed it!',
  },
];

export const VoyagerScrollStory: React.FC<VoyagerScrollStoryProps> = ({
  onStartQuiz,
}) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [speakingStep, setSpeakingStep] = useState<number | null>(null);
  const autoPlayRef = useRef(false);

  useEffect(() => {
    autoPlayRef.current = isAutoPlaying;
  }, [isAutoPlaying]);

  useEffect(() => {
    return () => {
      stopLoudNarration();
    };
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !autoPlayRef.current) {
              setActiveStep(idx);
            }
          });
        },
        { threshold: 0.45 }
      );
      obs.observe(card);
      observers.push(obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const speakStep = (stepIdx: number, continueAutoTour: boolean) => {
    const scene = VOYAGER_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `voyager-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < VOYAGER_SCENES.length) {
            speakStep(stepIdx + 1, true);
          } else {
            setIsAutoPlaying(false);
          }
        }
      },
      onError: () => {
        setSpeakingStep(null);
        setIsAutoPlaying(false);
      },
    });
  };

  const toggleAutoPlayStory = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      autoPlayRef.current = false;
      setSpeakingStep(null);
      stopLoudNarration();
    } else {
      setIsAutoPlaying(true);
      autoPlayRef.current = true;
      speakStep(activeStep, true);
    }
  };

  const toggleSingleCardVoice = (idx: number) => {
    setIsAutoPlaying(false);
    autoPlayRef.current = false;
    if (speakingStep === idx) {
      setSpeakingStep(null);
      stopLoudNarration();
    } else {
      speakStep(idx, false);
    }
  };

  const jumpToStep = (idx: number) => {
    setIsAutoPlaying(false);
    autoPlayRef.current = false;
    setSpeakingStep(null);
    stopLoudNarration();
    setActiveStep(idx);
    cardRefs.current[idx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <div className="w-full space-y-6 antialiased">
      {/* =================================================================== */}
      {/* TOP BAR: TITLE, AUTO-PLAY WITH VOICE SPEAKER & STEP BUTTONS         */}
      {/* =================================================================== */}
      <div className="rounded-2xl bg-[#101738] border-2 border-sky-400/40 p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-amber-300 font-bold block">
              🌌 Meet &ldquo;Voyager 1 &amp; 2&rdquo; — Humanity’s Farthest Interstellar Twins!
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How Voyager 1 &amp; 2 Explored 4 Giant Planets &amp; Entered Interstellar Space (1977 – Today!)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAutoPlayStory}
              className={`px-4 py-2.5 rounded-xl font-headline font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-md ${
                isAutoPlaying
                  ? 'bg-amber-400 text-[#060814]'
                  : 'bg-sky-400 text-[#060814] hover:bg-sky-300'
              }`}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4 shrink-0" />
                  <Volume2 className="w-4 h-4 shrink-0 animate-bounce" />
                  <span>Stop Reading &amp; Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 shrink-0" />
                  <Volume2 className="w-4 h-4 shrink-0" />
                  <span>Auto-Play Story (Read Aloud)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => jumpToStep(0)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Back to Step 1"
              aria-label="Back to Step 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Jump Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {VOYAGER_SCENES.map((sc, idx) => {
            const isCurrent = idx === activeStep;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => jumpToStep(idx)}
                className={`px-3.5 py-2 rounded-xl font-headline text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  isCurrent
                    ? 'bg-sky-400 text-[#060814] shadow-[0_0_16px_rgba(56,189,248,0.4)]'
                    : 'bg-white/5 text-slate-200 hover:bg-white/15 border border-white/10'
                }`}
              >
                {sc.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* STEP-BY-STEP SCROLL STORY CARDS (LARGE CRISP TEXT + LIVE ANIMATION) */}
      {/* =================================================================== */}
      <div className="space-y-7">
        {VOYAGER_SCENES.map((scene, idx) => {
          const isCurrent = idx === activeStep;
          const isSpeakingThis = speakingStep === idx;
          return (
            <div
              key={scene.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className={`rounded-3xl bg-[#0e1533] border-2 transition-colors p-5 sm:p-7 space-y-5 ${
                isCurrent
                  ? 'border-sky-400 shadow-[0_0_35px_rgba(56,189,248,0.2)]'
                  : 'border-white/15'
              }`}
            >
              {/* Top Step Header + Individual Read Aloud Speaker Button */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3.5 py-1 rounded-full bg-sky-400/20 border border-sky-400/50 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-200">
                  {scene.whenLabel}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSingleCardVoice(idx)}
                    className={`px-3 py-1.5 rounded-xl font-headline font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isSpeakingThis
                        ? 'bg-amber-400 text-[#060814]'
                        : 'bg-white/10 hover:bg-white/20 text-sky-200 border border-sky-400/30'
                    }`}
                  >
                    {isSpeakingThis ? (
                      <>
                        <VolumeX className="w-4 h-4 shrink-0" />
                        <span>Stop Voice</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 shrink-0" />
                        <span>Read This Part Aloud</span>
                      </>
                    )}
                  </button>

                  <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-emerald-300 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Scene {scene.stepNumber} of 6</span>
                  </span>
                </div>
              </div>

              {/* Headline & Kid Story Paragraph */}
              <div className="space-y-2.5">
                <h4 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
                  {scene.headline}
                </h4>
                <p className="text-base sm:text-lg text-slate-100 leading-relaxed">
                  {scene.kidStory}
                </p>
              </div>

              {/* ============================================================= */}
              {/* SCENE 1: ONCE-IN-176-YEARS 4-PLANET SLINGSHOT LINEUP          */}
              {/* ============================================================= */}
              {idx === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-black">
                    <img
                      src="/images/missions/voyager-1.jpg"
                      alt="NASA Voyager deep space probe with 12-foot dish antenna and magnetometer boom"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Twin Probes Voyager 1 &amp; 2 (1977)!
                      </span>
                      <span className="text-xs text-slate-200">
                        12-foot white dish antenna, 3 nuclear batteries, and a Golden Record!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      <rect x="10" y="10" width="540" height="210" rx="16" fill="#0d1536" stroke="#38bdf8" strokeWidth="2" />
                      <text x="280" y="34" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">
                        🪐 THE 176-YEAR &ldquo;GRAND TOUR&rdquo; GRAVITY SLINGSHOT PATH!
                      </text>

                      {/* Curved Slingshot Arc */}
                      <path d="M 55 170 Q 155 155 245 125 Q 355 92 495 58" fill="none" stroke="#fde047" strokeWidth="4" strokeDasharray="8 5" />

                      {/* Earth */}
                      <g transform="translate(55, 170)">
                        <circle r="13" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                        <text y="26" textAnchor="middle" fill="#bae6fd" fontSize="10" fontWeight="bold">Earth (1977)</text>
                      </g>

                      {/* Jupiter */}
                      <g transform="translate(160, 145)">
                        <circle r="20" fill="#ea580c" stroke="#fdba74" strokeWidth="2" />
                        <text y="34" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="bold">1. Jupiter (+Speed!)</text>
                      </g>

                      {/* Saturn */}
                      <g transform="translate(275, 115)">
                        <ellipse rx="28" ry="8" fill="none" stroke="#fde047" strokeWidth="3" transform="rotate(-15)" />
                        <circle r="15" fill="#fbbf24" />
                        <text y="30" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">2. Saturn (+Speed!)</text>
                      </g>

                      {/* Uranus */}
                      <g transform="translate(390, 86)">
                        <circle r="14" fill="#38bdf8" stroke="#bae6fd" strokeWidth="2" />
                        <text y="28" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">3. Uranus (1986)</text>
                      </g>

                      {/* Neptune */}
                      <g transform="translate(495, 58)">
                        <circle r="14" fill="#2563eb" stroke="#93c5fd" strokeWidth="2" />
                        <text y="28" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">4. Neptune (1989)!</text>
                      </g>

                      <text x="280" y="204" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        ⚡ Gravity Boosts Cut the Trip from 30 Years Down to Just 12 Years!
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 2: ERUPTING VOLCANOES ON IO & SATURN'S RINGS            */}
              {/* ============================================================= */}
              {idx === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-black">
                    <img
                      src="/images/missions/voyager-io-volcano.jpg"
                      alt="Real NASA Voyager 1 photo of a volcano erupting on Jupiter's moon Io"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Real Photo: Space Volcano on Moon Io!
                      </span>
                      <span className="text-xs text-slate-200">
                        Look at the blue umbrella plume erupting 180 miles into space on edge of Io!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-amber-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      {/* Panel 1: Io Erupting Volcanoes */}
                      <g transform="translate(145, 115)">
                        <rect x="-125" y="-95" width="250" height="190" rx="14" fill="#231212" stroke="#f97316" strokeWidth="2" />
                        <text x="0" y="-70" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                          🌋 1. MOON IO’S 9 VOLCANOES!
                        </text>
                        <circle cx="0" cy="22" r="42" fill="#f59e0b" stroke="#ea580c" strokeWidth="3" />
                        <path d="M 0 -20 Q -34 -62 -52 -25" fill="none" stroke="#38bdf8" strokeWidth="4" />
                        <path d="M 0 -20 Q 34 -62 52 -25" fill="none" stroke="#38bdf8" strokeWidth="4" />
                        <text x="0" y="80" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="bold">
                          First Active Volcanoes Beyond Earth!
                        </text>
                      </g>

                      {/* Panel 2: Europa's Cracked Ice & Saturn's Braided Rings */}
                      <g transform="translate(415, 115)">
                        <rect x="-125" y="-95" width="250" height="190" rx="14" fill="#0c1938" stroke="#38bdf8" strokeWidth="2" />
                        <text x="0" y="-70" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                          🪐 2. EUROPA ICE &amp; SATURN RINGS!
                        </text>
                        <circle cx="-48" cy="4" r="28" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="-68" y1="-4" x2="-28" y2="14" stroke="#ef4444" strokeWidth="2" />
                        <line x1="-62" y1="18" x2="-32" y2="-12" stroke="#ef4444" strokeWidth="2" />
                        <ellipse cx="48" cy="4" rx="44" ry="14" fill="none" stroke="#fde047" strokeWidth="3.5" transform="rotate(-18 48 4)" />
                        <circle cx="48" cy="4" r="18" fill="#fbbf24" />
                        <text x="0" y="62" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Cracked Ocean Moon Europa +
                        </text>
                        <text x="0" y="80" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                          1,000+ Braided Saturn Ringlets!
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 3: VOYAGER 2 VISITS SIDEWAYS URANUS & WINDY NEPTUNE     */}
              {/* ============================================================= */}
              {idx === 2 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    {/* Left: Sideways Uranus (1986) */}
                    <g transform="translate(155, 115)">
                      <rect x="-135" y="-96" width="270" height="192" rx="16" fill="#0b1d36" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="-70" textAnchor="middle" fill="#7dd3fc" fontSize="14" fontWeight="bold">
                        1. URANUS (1986): ROLLS ON SIDE!
                      </text>
                      {/* Vertical Rings because Uranus is tilted 98 degrees */}
                      <ellipse cx="0" cy="-4" rx="14" ry="48" fill="none" stroke="#bae6fd" strokeWidth="3" />
                      <circle cx="0" cy="-4" r="26" fill="#38bdf8" />
                      <text x="0" y="62" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                        Tilted 98° Sideways Like a Barrel
                      </text>
                      <text x="0" y="80" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                        + Discovered 11 New Moons!
                      </text>
                    </g>

                    <text x="300" y="120" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="bold">➔</text>

                    {/* Right: Supersonic Neptune (1989) */}
                    <g transform="translate(445, 115)">
                      <rect x="-135" y="-96" width="270" height="192" rx="16" fill="#0a1638" stroke="#60a5fa" strokeWidth="2" />
                      <text x="0" y="-70" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">
                        2. NEPTUNE (1989): 1,200 MPH WIND!
                      </text>
                      <circle cx="-24" cy="-4" r="28" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
                      <ellipse cx="-24" cy="-4" rx="12" ry="7" fill="#0f172a" stroke="#93c5fd" strokeWidth="1.5" />
                      <circle cx="42" cy="8" r="14" fill="#cbd5e1" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="42" y1="-6" x2="42" y2="-32" stroke="#fde047" strokeWidth="3" strokeDasharray="3 3" />
                      <text x="0" y="62" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        Great Dark Spot Hurricane +
                      </text>
                      <text x="0" y="80" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        Ice Geysers on Moon Triton!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 4: EARTH AS A TINY "PALE BLUE DOT" (1990)               */}
              {/* ============================================================= */}
              {idx === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-black">
                    <img
                      src="/images/missions/voyager-pale-blue-dot.jpg"
                      alt="Real NASA Voyager 1 Pale Blue Dot photograph showing Earth in a sunbeam from 3.7 billion miles away"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                        📸 Real Photo: The &ldquo;Pale Blue Dot&rdquo; (1990)!
                      </span>
                      <span className="text-xs text-slate-200">
                        See that tiny speck in the sunbeam? That’s our entire planet Earth from 3.7 billion miles!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      <rect x="10" y="10" width="540" height="210" rx="16" fill="#060a1c" stroke="#38bdf8" strokeWidth="2" />
                      {/* Sunbeam stripe */}
                      <polygon points="340,12 410,12 485,218 415,218" fill="#fbbf24" opacity="0.18" />

                      {/* Tiny glowing Earth dot */}
                      <circle cx="412" cy="115" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2">
                        <animate attributeName="r" values="4;7;4" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="412" cy="115" r="22" fill="none" stroke="#fde047" strokeWidth="2" strokeDasharray="4 4" />
                      <text x="412" y="82" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                        👈 YOU ARE HERE! (EARTH)
                      </text>

                      {/* Voyager Looking Back */}
                      <g transform="translate(115, 115)">
                        <ellipse rx="14" ry="34" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="14" y1="0" x2="265" y2="0" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6 5" />
                        <text x="0" y="56" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="bold">
                          Voyager 1 Camera Turns Back
                        </text>
                        <text x="0" y="74" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          3,700,000,000 Miles Away!
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 5: GOLDEN RECORD & POPPING OUT OF THE SUN'S BUBBLE      */}
              {/* ============================================================= */}
              {idx === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-black">
                    <img
                      src="/images/missions/voyager-golden-record.jpg"
                      alt="Real NASA photo of the gold-plated Voyager Golden Record cover"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Real Photo: Voyager’s Golden Record!
                      </span>
                      <span className="text-xs text-slate-200">
                        12-inch gold record with 115 pictures, whale songs, music &amp; 55 languages!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-amber-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      <rect x="10" y="10" width="540" height="210" rx="16" fill="#0a0f29" stroke="#fbbf24" strokeWidth="2" />
                      <text x="280" y="34" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">
                        🌌 POPPING OUT OF THE SUN’S BUBBLE INTO INTERSTELLAR SPACE!
                      </text>

                      {/* Sun's Magnetic Bubble (Heliosphere) */}
                      <path d="M 30 45 Q 320 45 320 125 Q 320 205 30 205 Z" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 4" />
                      <circle cx="95" cy="125" r="22" fill="#fde047" />
                      <text x="95" y="162" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">Our Sun’s Bubble</text>
                      <text x="245" y="128" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="bold">Heliopause Edge (121 AU)</text>

                      {/* Voyager 1 & 2 Outside in Interstellar Space */}
                      <g>
                        <animateTransform attributeName="transform" type="translate" values="0,0; 14,0; 0,0" dur="2.6s" repeatCount="indefinite" />
                        <circle cx="425" cy="92" r="18" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                        <text x="425" y="96" textAnchor="middle" fill="#060814" fontSize="10" fontWeight="bold">V1</text>
                        <circle cx="425" cy="162" r="18" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                        <text x="425" y="166" textAnchor="middle" fill="#060814" fontSize="10" fontWeight="bold">V2</text>
                      </g>

                      <text x="445" y="64" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        ✨ INTERSTELLAR SPACE!
                      </text>
                      <text x="445" y="200" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        Carrying Golden Records to the Stars!
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 6: 15+ BILLION MILES & 23-WATT WHISPER                  */}
              {/* ============================================================= */}
              {idx === 5 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    {/* Panel 1: 23-Watt Refrigerator Bulb Transmitter */}
                    <g transform="translate(100, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#10193a" stroke="#fde047" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                        1. 23-WATT RADIO!
                      </text>
                      <circle cx="0" cy="-12" r="26" fill="#fde047" />
                      <text x="0" y="-4" textAnchor="middle" fill="#060814" fontSize="22">💡</text>
                      <text x="0" y="42" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                        Only 23 Watts Power
                      </text>
                      <text x="0" y="62" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                        = 1 Fridge Lightbulb!
                      </text>
                    </g>

                    <text x="198" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 2: 22.5-Hour Speed-of-Light Radio Travel */}
                    <g transform="translate(300, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#10193a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                        2. 15+ BILLION MILES!
                      </text>
                      <line x1="-65" y1="-8" x2="65" y2="-8" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 4" />
                      <circle cx="0" cy="-8" r="8" fill="#fde047">
                        <animate attributeName="cx" values="-55;55;-55" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                      <text x="0" y="42" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                        ⏱️ 22.5 Hours One-Way
                      </text>
                      <text x="0" y="62" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                        45-Hour Round Trip!
                      </text>
                    </g>

                    <text x="400" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 3: Caught by 230-Foot NASA Dish on Earth */}
                    <g transform="translate(500, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#082420" stroke="#34d399" strokeWidth="2.5" />
                      <text x="0" y="-74" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        3. STILL ALIVE TODAY!
                      </text>
                      <path d="M -38 12 Q 0 38 38 12" fill="none" stroke="#f8fafc" strokeWidth="4" />
                      <line x1="0" y1="25" x2="0" y2="48" stroke="#94a3b8" strokeWidth="4" />
                      <text x="0" y="-12" textAnchor="middle" fill="#34d399" fontSize="20">📡</text>
                      <text x="0" y="68" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        230-Ft NASA Dishes Hear
                      </text>
                      <text x="0" y="84" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        Voyager Every Day!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* Kid Takeaway Callout */}
              <div className="rounded-2xl bg-[#080c21] border border-amber-400/40 p-4 text-sm sm:text-base font-semibold text-amber-200 leading-relaxed">
                {scene.kidTakeaway}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to Take the 5-Question Cosmic Quiz */}
      {onStartQuiz && (
        <div className="rounded-2xl bg-gradient-to-r from-emerald-500/20 via-sky-500/15 to-emerald-500/20 border-2 border-emerald-400/50 p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-emerald-300 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Finished Voyager 1 &amp; 2’s Story!</span>
            </span>
            <h4 className="font-headline text-lg sm:text-xl font-bold text-white">
              Ready to Unlock the &ldquo;Cosmic Genius&rdquo; Badge?
            </h4>
          </div>

          <button
            type="button"
            onClick={onStartQuiz}
            className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-[#060814] font-headline font-bold text-sm sm:text-base uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg transition-colors"
          >
            <span>Take Cosmic Quiz</span>
            <Award className="w-5 h-5 shrink-0" />
          </button>
        </div>
      )}
    </div>
  );
};
