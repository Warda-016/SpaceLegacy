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

interface CassiniScrollStoryProps {
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

const CASSINI_SCENES: StoryScene[] = [
  {
    id: 'launch-pinball',
    stepNumber: 1,
    shortLabel: '1. Launch & Pinball (1997)',
    whenLabel: 'STEP 1 OF 6 • OCTOBER 15, 1997 • BUS-SIZED SATURN EXPLORER',
    headline: 'Taller Than a School Bus: Playing Cosmic Pinball Past 3 Planets!',
    kidStory:
      'Standing 22 feet tall—bigger than a school bus!—Cassini launched in October 1997 with a golden saucer lander named Huygens strapped to its belly! Because Saturn is almost 1 billion miles away, Cassini played cosmic pinball—looping past Venus twice, Earth once, and giant Jupiter to slingshot all the way to ringed Saturn!',
    spokenNarration:
      'Step 1: Cosmic Pinball to Saturn! Taller than a school bus and powered by three nuclear batteries, Cassini launched in 1997 with the golden Huygens lander strapped to its side, looping past Venus, Earth, and Jupiter to reach ringed Saturn!',
    kidTakeaway:
      '🔋 Why 3 Nuclear Batteries? At Saturn, sunlight is 100 times dimmer than on Earth—so 3 warm plutonium RTG batteries powered Cassini for 20 years!',
  },
  {
    id: 'saturn-orbit',
    stepNumber: 2,
    shortLabel: '2. Arriving at Saturn',
    whenLabel: 'STEP 2 OF 6 • JULY 1, 2004 • ENTERING SATURN ORBIT',
    headline: 'Firing Brakes Through Saturn’s Rings to Live There for 13 Years!',
    kidStory:
      'After a 7-year journey across 2.2 billion miles, Cassini arrived at Saturn on July 1, 2004! Diving through a gap in Saturn’s icy rings with its dish antenna pointed forward like a shield against space dust, Cassini fired its main rocket engine for 96 minutes to lock into orbit—becoming the first spacecraft ever to live at Saturn!',
    spokenNarration:
      'Step 2: Firing rockets through Saturn’s rings! After a seven-year trip across two billion miles, Cassini fired its main rocket engine in 2004 to lock into orbit around Saturn—becoming the first spacecraft ever to live at the ringed planet!',
    kidTakeaway:
      '🛡️ Dish Shield Trick: Cassini turned backward so its tough 13-foot white radio dish blocked tiny ring ice grains like a knight’s shield!',
  },
  {
    id: 'huygens-titan',
    stepNumber: 3,
    shortLabel: '3. Landing on Titan!',
    whenLabel: 'STEP 3 OF 6 • JANUARY 14, 2005 • FARTHEST LANDING IN HISTORY',
    headline: 'Golden Saucer "Huygens" Parachutes Onto Orange Moon Titan!',
    kidStory:
      'Cassini detached the golden European saucer probe Huygens, which parachuted for 2.5 hours through thick orange clouds onto Saturn’s giant moon Titan—the farthest landing from Earth in human history! Below the haze, Huygens photographed winding river channels, coastlines, and rounded ice pebbles soaked in liquid methane rain!',
    spokenNarration:
      'Step 3: Landing Huygens on orange Moon Titan! Cassini released the golden Huygens saucer probe, which parachuted through thick orange clouds onto Saturn’s giant moon Titan—revealing winding rivers, rain, and seas made of liquid methane!',
    kidTakeaway:
      '🌧️ Weirdest Weather in Space: At -290°F (-179°C) on Titan, water is frozen as hard as rock, while methane gas turns into liquid rain, rivers, and giant seas!',
  },
  {
    id: 'enceladus-geysers',
    stepNumber: 4,
    shortLabel: '4. Ocean Geysers!',
    whenLabel: 'STEP 4 OF 6 • 2005–2015 • ICY MOON ENCELADUS',
    headline: 'Flying Right Through Giant Water Fountains Erupting Into Space!',
    kidStory:
      'Nobody expected tiny white moon Enceladus to be active—until Cassini spotted giant water geysers shooting hundreds of miles into space from warm cracks at its South Pole! Even cooler: Cassini steered right through those spraying water plumes and "tasted" them—discovering a warm, salty underground ocean with hydrothermal vents!',
    spokenNarration:
      'Step 4: Flying through alien water fountains on Enceladus! Cassini spotted giant water geysers spraying into space from tiny icy moon Enceladus! Diving right through the plumes, Cassini tasted a warm, salty underground ocean that could support life!',
    kidTakeaway:
      '🌊 Free Ocean Samples in Space: Because Enceladus sprays its underground ocean into space, Cassini tasted an alien ocean without even needing to land!',
  },
  {
    id: 'hexagon-rings',
    stepNumber: 5,
    shortLabel: '5. Hexagon Hurricane',
    whenLabel: 'STEP 5 OF 6 • 294 ORBITS • RINGS, MOONS & HEXAGON STORM',
    headline: '294 Orbits Around Saturn: A 6-Sided Hurricane Wider Than Two Earths!',
    kidStory:
      'Over 13 years and 294 orbits, Cassini discovered 7 new moons, watched 3D ice towers cast shadows across Saturn’s rings, and photographed a mind-blowing 6-sided "Hexagon" jet-stream hurricane at Saturn’s North Pole—20,000 miles wide, big enough to fit two whole Earths inside!',
    spokenNarration:
      'Step 5: Saturn’s giant hexagon storm and sixty moons! Over 13 years and 294 orbits, Cassini discovered a six-sided hurricane wider than two Earths at Saturn’s North Pole and explored dozens of weird moons!',
    kidTakeaway:
      '⬡ Cosmic Geometry: Saturn’s North Pole Hexagon is a 200-mph jet stream shaped like a giant 6-sided honeycomb with a spinning eye in the center!',
  },
  {
    id: 'grand-finale',
    stepNumber: 6,
    shortLabel: '6. Grand Finale Plunge',
    whenLabel: 'STEP 6 OF 6 • SEPTEMBER 15, 2017 • PROTECTING THE OCEAN MOONS',
    headline: '22 Dives Inside the Rings & A Heroic Shooting-Star Plunge Into Saturn!',
    kidStory:
      'By 2017, Cassini’s rocket fuel tank was almost empty. Because Enceladus and Titan have oceans that could hold alien life, NASA couldn’t risk an out-of-fuel Cassini crashing into them! So Cassini flew 22 daring "Grand Finale" dives between Saturn and its rings, then plunged into Saturn’s golden clouds like a shooting star to protect those moons forever!',
    spokenNarration:
      'Step 6: The Heroic Grand Finale Plunge! With its fuel tank nearly empty in 2017, Cassini dove 22 times between Saturn and its rings before plunging into Saturn’s golden clouds like a shooting star—protecting the oceans of Enceladus and Titan forever!',
    kidTakeaway:
      '🌠 Ultimate Space Hero: Cassini beamed back science from inside Saturn’s sky until the very last second while keeping Enceladus’s ocean 100% pure and safe!',
  },
];

export const CassiniScrollStory: React.FC<CassiniScrollStoryProps> = ({
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
    const scene = CASSINI_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `cassini-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < CASSINI_SCENES.length) {
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
              🪐 Meet &ldquo;Cassini-Huygens&rdquo; — Saturn’s 13-Year Ring &amp; Ocean Explorer!
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How Cassini Explored Saturn, Titan &amp; Enceladus (1997 – 2017)
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
          {CASSINI_SCENES.map((sc, idx) => {
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
        {CASSINI_SCENES.map((scene, idx) => {
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
              {/* SCENE 1: BUS-SIZED CASSINI + COSMIC PINBALL SLINGSHOTS        */}
              {/* ============================================================= */}
              {idx === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-black">
                    <img
                      src="/images/missions/cassini-orbiter.jpg"
                      alt="NASA Cassini spacecraft at Saturn with the golden Huygens probe"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Bus-Sized Cassini + Golden Huygens!
                      </span>
                      <span className="text-xs text-slate-200">
                        22 feet tall with 3 nuclear batteries and the golden Huygens saucer on its side!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      <rect x="10" y="10" width="540" height="210" rx="16" fill="#0d1536" stroke="#38bdf8" strokeWidth="2" />
                      <text x="280" y="36" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">
                        ☄️ 7-YEAR COSMIC PINBALL BOOST TO REACH SATURN (1997 – 2004)!
                      </text>

                      {/* Slingshot Track */}
                      <path d="M 65 135 Q 145 70 220 135 Q 300 190 375 130 Q 445 75 500 130" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeDasharray="7 5" />

                      {/* Earth */}
                      <g transform="translate(65, 135)">
                        <circle r="16" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
                        <text y="32" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">1. Earth (1997)</text>
                      </g>

                      {/* Venus x2 */}
                      <g transform="translate(185, 115)">
                        <circle r="15" fill="#f59e0b" stroke="#fde047" strokeWidth="2" />
                        <text y="-24" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">2. Venus ×2 Boost!</text>
                      </g>

                      {/* Jupiter */}
                      <g transform="translate(335, 145)">
                        <circle r="22" fill="#ea580c" stroke="#fdba74" strokeWidth="2" />
                        <text y="38" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="bold">3. Giant Jupiter Boost!</text>
                      </g>

                      {/* Ringed Saturn */}
                      <g transform="translate(485, 125)">
                        <ellipse rx="36" ry="11" fill="none" stroke="#fde047" strokeWidth="4" transform="rotate(-15)" />
                        <circle r="18" fill="#fbbf24" />
                        <text y="-28" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">4. SATURN (2004)!</text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 2: FIRING BRAKES THROUGH SATURN'S RINGS                 */}
              {/* ============================================================= */}
              {idx === 1 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    {/* Panel 1: Dish Shield Forward */}
                    <g transform="translate(100, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#10193a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                        1. DISH AS A SHIELD!
                      </text>
                      <path d="M -30 -24 Q 0 -46 30 -24 Z" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" />
                      <rect x="-16" y="-24" width="32" height="36" rx="4" fill="#fbbf24" />
                      <circle cx="-36" cy="-38" r="3" fill="#bae6fd" />
                      <circle cx="0" cy="-46" r="3.5" fill="#bae6fd" />
                      <circle cx="34" cy="-36" r="3" fill="#bae6fd" />
                      <text x="0" y="52" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        White Dish Blocks
                      </text>
                      <text x="0" y="70" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                        Tiny Ring Ice Grains!
                      </text>
                    </g>

                    <text x="198" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 2: 96-Minute Braking Rocket Burn */}
                    <g transform="translate(300, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#231212" stroke="#f97316" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#fdba74" fontSize="13" fontWeight="bold">
                        2. 96-MIN BRAKE BURN!
                      </text>
                      <rect x="-18" y="-28" width="36" height="34" rx="4" fill="#fbbf24" />
                      <polygon points="-14,6 14,6 0,46" fill="#f97316">
                        <animate attributeName="opacity" values="1;0.4;1" dur="0.5s" repeatCount="indefinite" />
                      </polygon>
                      <text x="0" y="64" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        🔥 Slows Down Over
                      </text>
                      <text x="0" y="80" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                        Saturn’s Golden Rings!
                      </text>
                    </g>

                    <text x="400" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 3: Locked Into Orbit for 13 Years */}
                    <g transform="translate(500, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#082420" stroke="#34d399" strokeWidth="2.5" />
                      <text x="0" y="-74" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        3. 294 SATURN ORBITS!
                      </text>
                      <ellipse cx="0" cy="0" rx="58" ry="22" fill="none" stroke="#34d399" strokeWidth="2.5" strokeDasharray="5 4" />
                      <ellipse cx="0" cy="0" rx="34" ry="10" fill="none" stroke="#fde047" strokeWidth="3.5" />
                      <circle cx="0" cy="0" r="16" fill="#fbbf24" />
                      <text x="0" y="54" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        First Probe to Live
                      </text>
                      <text x="0" y="72" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        At Ringed Saturn!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 3: HUYGENS LANDS ON ORANGE MOON TITAN                   */}
              {/* ============================================================= */}
              {idx === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-black">
                    <img
                      src="/images/missions/cassini-huygens-titan.jpg"
                      alt="Real surface photo of Saturn's moon Titan taken by the Huygens lander"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Real Photo From Titan’s Surface (2005)!
                      </span>
                      <span className="text-xs text-slate-200">
                        Rounded ice pebbles on orange Titan—the farthest landing from Earth ever!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-amber-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      {/* Panel 1: Golden Saucer Detaches */}
                      <g transform="translate(95, 115)">
                        <rect x="-80" y="-98" width="160" height="196" rx="14" fill="#1e1510" stroke="#fbbf24" strokeWidth="2" />
                        <text x="0" y="-74" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                          1. SAUCER DETACHES
                        </text>
                        <ellipse cx="0" cy="-6" rx="34" ry="14" fill="#fbbf24" stroke="#fef08a" strokeWidth="2.5" />
                        <text x="0" y="-2" textAnchor="middle" fill="#060814" fontSize="10" fontWeight="bold">
                          HUYGENS
                        </text>
                        <text x="0" y="52" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Golden Flying Saucer
                        </text>
                        <text x="0" y="70" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                          Dives Into Orange Titan!
                        </text>
                      </g>

                      <text x="186" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                      {/* Panel 2: Parachuting 2.5 Hours Through Orange Haze */}
                      <g transform="translate(280, 115)">
                        <rect x="-80" y="-98" width="160" height="196" rx="14" fill="#2b1608" stroke="#fb923c" strokeWidth="2" />
                        <text x="0" y="-74" textAnchor="middle" fill="#fdba74" fontSize="13" fontWeight="bold">
                          2. 2.5-HR PARACHUTE
                        </text>
                        <g>
                          <animateTransform attributeName="transform" type="translate" values="0,-10; 0,10; 0,-10" dur="2.5s" repeatCount="indefinite" />
                          <path d="M -28 -36 Q 0 -62 28 -36 Z" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                          <line x1="-20" y1="-36" x2="-8" y2="-8" stroke="#fde047" strokeWidth="1.5" />
                          <line x1="20" y1="-36" x2="8" y2="-8" stroke="#fde047" strokeWidth="1.5" />
                          <ellipse cx="0" cy="-4" rx="22" ry="9" fill="#fbbf24" />
                        </g>
                        <text x="0" y="54" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="bold">
                          Through Thick Orange
                        </text>
                        <text x="0" y="72" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Clouds at -290°F!
                        </text>
                      </g>

                      <text x="372" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                      {/* Panel 3: Liquid Methane Rivers & Lakes */}
                      <g transform="translate(465, 115)">
                        <rect x="-80" y="-98" width="160" height="196" rx="14" fill="#082420" stroke="#34d399" strokeWidth="2.5" />
                        <text x="0" y="-74" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                          3. METHANE RIVERS!
                        </text>
                        <path d="M -65 20 L 65 20 L 65 44 L -65 44 Z" fill="#9a3412" />
                        <ellipse cx="18" cy="28" rx="34" ry="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                        <ellipse cx="-26" cy="14" rx="18" ry="8" fill="#fbbf24" />
                        <text x="0" y="62" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                          Found Rain, Rivers &amp;
                        </text>
                        <text x="0" y="78" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Seas of Liquid Methane!
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 4: FLYING THROUGH ENCELADUS'S OCEAN GEYSERS             */}
              {/* ============================================================= */}
              {idx === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-black">
                    <img
                      src="/images/missions/cassini-enceladus-plumes.jpg"
                      alt="Real NASA Cassini photo of water geysers erupting from Saturn's moon Enceladus"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                        📸 Real Photo: Enceladus’s Water Geysers!
                      </span>
                      <span className="text-xs text-slate-200">
                        Giant plumes of salty ocean water spraying out of Enceladus’s South Pole!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      <rect x="10" y="10" width="540" height="210" rx="16" fill="#08152e" stroke="#38bdf8" strokeWidth="2" />
                      <text x="280" y="34" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">
                        🌊 CASSINI FLIES THROUGH ENCELADUS’S ALIEN WATER FOUNTAINS!
                      </text>

                      {/* Cross-section of Enceladus at Bottom */}
                      <path d="M 140 215 Q 280 140 420 215 Z" fill="#0284c7" stroke="#e0f2fe" strokeWidth="5" />
                      <text x="280" y="204" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                        Warm Salty Underground Ocean Inside Enceladus!
                      </text>

                      {/* Spraying Geyser Plumes */}
                      <path d="M 245 175 L 210 65" stroke="#7dd3fc" strokeWidth="4" strokeDasharray="6 4" />
                      <path d="M 280 172 L 280 55" stroke="#bae6fd" strokeWidth="5" strokeDasharray="6 4" />
                      <path d="M 315 175 L 350 65" stroke="#7dd3fc" strokeWidth="4" strokeDasharray="6 4" />

                      {/* Animated Cassini Flying Right Through the Spray */}
                      <g>
                        <animateTransform attributeName="transform" type="translate" values="130,95; 430,95; 130,95" dur="3.8s" repeatCount="indefinite" />
                        <rect x="-24" y="-12" width="48" height="24" rx="5" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                        <text x="0" y="4" textAnchor="middle" fill="#060814" fontSize="10" fontWeight="bold">
                          CASSINI
                        </text>
                      </g>

                      <text x="280" y="145" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        ✨ Tasted Salt + Organics + Hydrothermal Vents (Could Host Life!)
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 5: 6-SIDED HEXAGON STORM WIDER THAN TWO EARTHS          */}
              {/* ============================================================= */}
              {idx === 4 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    {/* Left: Giant Spinning Hexagon Storm */}
                    <g transform="translate(175, 118)">
                      <polygon
                        points="0,-82 71,-41 71,41 0,82 -71,41 -71,-41"
                        fill="#1e1b4b"
                        stroke="#fde047"
                        strokeWidth="4"
                      >
                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite" />
                      </polygon>
                      <circle r="18" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                      <text y="5" textAnchor="middle" fill="#060814" fontSize="10" fontWeight="bold">EYE</text>
                      <text y="102" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                        ⬡ Saturn’s 6-Sided Hexagon Storm
                      </text>
                    </g>

                    {/* Right: Size Comparison with Two Earths */}
                    <g transform="translate(430, 115)">
                      <rect x="-135" y="-88" width="270" height="176" rx="16" fill="#10183a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="-58" textAnchor="middle" fill="#7dd3fc" fontSize="14" fontWeight="bold">
                        🌍 HOW BIG IS SATURN’S HEXAGON?
                      </text>
                      <circle cx="-42" cy="-6" r="26" fill="#0284c7" stroke="#34d399" strokeWidth="2.5" />
                      <text x="-42" y="-2" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">EARTH 1</text>
                      <circle cx="42" cy="-6" r="26" fill="#0284c7" stroke="#34d399" strokeWidth="2.5" />
                      <text x="42" y="-2" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">EARTH 2</text>
                      <text x="0" y="48" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                        20,000 Miles Wide!
                      </text>
                      <text x="0" y="68" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        Two Whole Earths Fit Inside!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 6: 22 GRAND FINALE DIVES & HEROIC PLUNGE INTO SATURN    */}
              {/* ============================================================= */}
              {idx === 5 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-emerald-400/50 bg-black">
                    <img
                      src="/images/missions/cassini-grand-finale.jpg"
                      alt="NASA illustration of Cassini diving between Saturn and its rings during the Grand Finale"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-emerald-300 block">
                        📸 Cassini’s Heroic Grand Finale (2017)!
                      </span>
                      <span className="text-xs text-slate-200">
                        Diving 22 times inside the rings before plunging into Saturn to protect its ocean moons!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-emerald-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      {/* Panel 1: Almost Out of Fuel */}
                      <g transform="translate(95, 115)">
                        <rect x="-80" y="-98" width="160" height="196" rx="14" fill="#231212" stroke="#f87171" strokeWidth="2" />
                        <text x="0" y="-74" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="bold">
                          1. FUEL TANK EMPTY!
                        </text>
                        <rect x="-42" y="-20" width="84" height="26" rx="5" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                        <rect x="-38" y="-16" width="14" height="18" rx="2" fill="#ef4444" />
                        <text x="10" y="-3" textAnchor="middle" fill="#fecaca" fontSize="11" fontWeight="bold">⛽ 1% LEFT</text>
                        <text x="0" y="42" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Must Not Crash Into
                        </text>
                        <text x="0" y="60" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                          Enceladus’s Ocean!
                        </text>
                      </g>

                      <text x="186" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                      {/* Panel 2: 22 Dives Between Planet & Rings */}
                      <g transform="translate(280, 115)">
                        <rect x="-80" y="-98" width="160" height="196" rx="14" fill="#10193a" stroke="#38bdf8" strokeWidth="2" />
                        <text x="0" y="-74" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                          2. 22 RING DIVES!
                        </text>
                        <circle cx="-28" cy="0" r="24" fill="#fbbf24" />
                        <ellipse cx="28" cy="0" rx="14" ry="38" fill="none" stroke="#fde047" strokeWidth="5" />
                        <path d="M 0 -52 L 0 52" stroke="#38bdf8" strokeWidth="3.5" strokeDasharray="5 4" />
                        <text x="0" y="68" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Flew Right Through
                        </text>
                        <text x="0" y="82" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                          The Narrow Gap!
                        </text>
                      </g>

                      <text x="372" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                      {/* Panel 3: Shooting Star Into Saturn */}
                      <g transform="translate(465, 115)">
                        <rect x="-80" y="-98" width="160" height="196" rx="14" fill="#082420" stroke="#34d399" strokeWidth="2.5" />
                        <text x="0" y="-74" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                          3. HEROIC PLUNGE!
                        </text>
                        <path d="M -65 25 Q 0 5 65 25 L 65 55 L -65 55 Z" fill="#f59e0b" />
                        <line x1="-28" y1="-38" x2="12" y2="12" stroke="#fde047" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="7" fill="#ffffff" />
                        <text x="0" y="68" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                          Sept 15, 2017: Kept
                        </text>
                        <text x="0" y="82" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Ocean Moons Safe!
                        </text>
                      </g>
                    </svg>
                  </div>
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
              <span>Finished Cassini’s Story!</span>
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
