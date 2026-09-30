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

interface PioneerScrollStoryProps {
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

const PIONEER_SCENES: StoryScene[] = [
  {
    id: 'trailblazer-launch',
    stepNumber: 1,
    shortLabel: '1. Launch (1972–73)',
    whenLabel: 'STEP 1 OF 6 • MARCH 1972 & APRIL 1973 • OUTER PLANET SCOUTS',
    headline: 'Humanity’s Very First Deep-Space Scouts Spin Off Toward Giant Planets!',
    kidStory:
      'Before Voyager or Cassini could ever fly, NASA sent two brave trailblazers—Pioneer 10 (1972) and Pioneer 11 (1973)—to see if a spacecraft could even survive the trip to the giant outer planets! Built around a 9-foot dish antenna with 4 nuclear batteries on long selfie-stick booms, each probe spun like a top 5 times every minute to stay steady!',
    spokenNarration:
      'Step 1: Trailblazers to the Outer Solar System! Launched in 1972 and 1973, spinning dish probes Pioneer 10 and Pioneer 11 were humanity’s first deep-space scouts sent to test if any spacecraft could reach the giant outer planets!',
    kidTakeaway:
      '🌀 Spinning Like a Gyroscope: Spinning at 4.8 rotations per minute kept Pioneer’s big dish pointed straight back at Earth without wasting fuel!',
  },
  {
    id: 'asteroid-belt',
    stepNumber: 2,
    shortLabel: '2. Asteroid Belt First!',
    whenLabel: 'STEP 2 OF 6 • JULY 1972 – FEB 1973 • 170-MILLION-MILE BELT',
    headline: 'First Spacecraft Ever to Cross the Dangerous Asteroid Belt!',
    kidStory:
      'Between Mars and Jupiter lies the Asteroid Belt—millions of tumbling space rocks! Before Pioneer 10, many scientists feared dusty asteroid debris would smash any spacecraft to pieces! Pioneer 10 zoomed across the 170-million-mile belt for 7 months with pressurized "bubble-wrap" dust panels on its back—and emerged unscathed, opening the outer solar system!',
    spokenNarration:
      'Step 2: First to cross the dangerous Asteroid Belt! Before Pioneer 10, scientists worried millions of tumbling rocks in the Asteroid Belt might smash any spacecraft! Pioneer 10 zoomed safely through the 170-million-mile belt using bubble-wrap dust sensors!',
    kidTakeaway:
      '🪨 Pop Goes the Bubble-Wrap: Pioneer carried 208 pressurized gas cells on the back of its dish that popped whenever a microscopic dust grain hit them!',
  },
  {
    id: 'jupiter-first',
    stepNumber: 3,
    shortLabel: '3. First at Jupiter!',
    whenLabel: 'STEP 3 OF 6 • DECEMBER 1973 • SURVIVING JUPITER’S RADIATION',
    headline: 'Surviving 10,000× Radiation & Painting Jupiter’s First Close-Up Photos!',
    kidStory:
      'In December 1973, Pioneer 10 became the first spacecraft ever to reach giant Jupiter! Diving through killer radiation belts 10,000 times stronger than Earth’s, Pioneer used a clever "Spin-Scan" telescope that painted pictures one narrow line at a time as the spacecraft spun—sending home the first close-up images of Jupiter’s Great Red Spot!',
    spokenNarration:
      'Step 3: First close-up photos of Giant Jupiter! In December 1973, Pioneer 10 braved radiation belts 10,000 times stronger than Earth’s and spun like a top at five rotations per minute to paint the first close-up color pictures of Jupiter’s Great Red Spot!',
    kidTakeaway:
      '🎨 Painting Pictures While Spinning: Because the whole probe spun 5 times a minute, its camera scanned one thin strip on each spin to build full photos!',
  },
  {
    id: 'saturn-first',
    stepNumber: 4,
    shortLabel: '4. First at Saturn (1979)',
    whenLabel: 'STEP 4 OF 6 • SEPTEMBER 1, 1979 • PIONEER 11 AT SATURN',
    headline: 'Pioneer 11 Uses Jupiter as a Slingshot & Visits Ringed Saturn First!',
    kidStory:
      'One year after Pioneer 10, sister probe Pioneer 11 zoomed even closer to Jupiter (just 26,000 miles above the clouds!) and used Jupiter’s massive gravity to fling itself clear across the solar system to Saturn! In September 1979, Pioneer 11 became the first spacecraft ever to visit Saturn—skimming right under the rings and discovering Saturn’s narrow F-Ring!',
    spokenNarration:
      'Step 4: Pioneer 11 discovers a new ring at Saturn! Using Jupiter’s gravity like a slingshot, sister probe Pioneer 11 flew across the solar system and became the first spacecraft ever to visit ringed Saturn in 1979—discovering Saturn’s narrow F-ring!',
    kidTakeaway:
      '🪐 Scouting the Path for Voyager: NASA sent Pioneer 11 right through the plane of Saturn’s rings first to prove the path was safe for Voyager!',
  },
  {
    id: 'golden-plaque',
    stepNumber: 5,
    shortLabel: '5. Golden Alien Plaque',
    whenLabel: 'STEP 5 OF 6 • DESIGNED BY CARL SAGAN • COSMIC POSTCARD',
    headline: 'A 6×9 Inch Gold Postcard Showing Humans Waving & A Map Back to Earth!',
    kidStory:
      'Because Pioneer 10 and 11 were the first spacecraft fast enough to escape our solar system forever, astronomer Carl Sagan and artist Linda Salzman Sagan bolted a 6×9-inch gold-anodized aluminum plaque to each probe! It shows a friendly man and woman waving next to the Pioneer silhouette, our Solar System planets, and a pulsar star map pointing back to our Sun!',
    spokenNarration:
      'Step 5: The Golden Plaque greeting card for aliens! Bolted to both Pioneer probes is a six-by-nine-inch gold-anodized plaque designed by Carl Sagan, showing a friendly man and woman waving and a cosmic star map pointing back to Earth!',
    kidTakeaway:
      '👋 First Message to the Stars: Five years before Voyager’s Golden Record, the Pioneer Golden Plaque was humanity’s very first postcard to the galaxy!',
  },
  {
    id: 'final-beep-2003',
    stepNumber: 6,
    shortLabel: '6. Final Beep (136+ AU)',
    whenLabel: 'STEP 6 OF 6 • JANUARY 23, 2003 – TODAY • GLIDING TO ALDEBARAN',
    headline: 'Final Whisper From 7.6 Billion Miles & Gliding Toward the Eye of Taurus!',
    kidStory:
      'Built to last just 21 months, Pioneer 10 kept beeping back to Earth for over 30 years! Its final faint radio whisper was caught by NASA’s giant dishes on January 23, 2003 from 7.6 billion miles (80 AU) away! Today, over 136 AU from the Sun, Pioneer 10 glides silently toward the bright orange star Aldebaran in the constellation Taurus!',
    spokenNarration:
      'Step 6: Final whisper from 7.6 billion miles away! Pioneer 10 sent its final faint radio beep in January 2003 from 80 Astronomical Units away! Today both Pioneers glide silently toward the stars at over 136 Astronomical Units from the Sun!',
    kidTakeaway:
      '⭐ 2-Million-Year Voyage: Travelling at 27,000 mph, Pioneer 10 will pass near the bright star Aldebaran in about 2 million years!',
  },
];

export const PioneerScrollStory: React.FC<PioneerScrollStoryProps> = ({
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
    const scene = PIONEER_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `pioneer-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < PIONEER_SCENES.length) {
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
              🛸 Meet &ldquo;Pioneer 10 &amp; 11&rdquo; — First Across the Asteroid Belt!
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How Pioneer 10 &amp; 11 Blazed the Trail to Jupiter &amp; Saturn (1972 – 2003)
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
          {PIONEER_SCENES.map((sc, idx) => {
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
        {PIONEER_SCENES.map((scene, idx) => {
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
              {/* SCENE 1: SPINNING DISH PROBE + 4 NUCLEAR SELFIE-STICKS        */}
              {/* ============================================================= */}
              {idx === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-black">
                    <img
                      src="/images/missions/pioneer-10-11.jpg"
                      alt="NASA Pioneer 10 and 11 deep space probe with 9-foot dish antenna"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Meet Pioneer 10 &amp; 11 (1972–1973)!
                      </span>
                      <span className="text-xs text-slate-200">
                        9-foot dish antenna, 4 nuclear batteries on long booms, and the Golden Plaque!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      <rect x="10" y="10" width="540" height="210" rx="16" fill="#0d1536" stroke="#38bdf8" strokeWidth="2" />
                      <text x="280" y="34" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">
                        🌀 SPINNING LIKE A GYROSCOPE TOP AT 5 ROTATIONS PER MINUTE!
                      </text>

                      {/* Spinning Pioneer Probe Diagram */}
                      <g transform="translate(280, 118)">
                        <g>
                          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
                          {/* 2 Long RTG Booms + 1 Magnetometer Boom */}
                          <line x1="0" y1="0" x2="-92" y2="-45" stroke="#fde047" strokeWidth="4" />
                          <rect x="-108" y="-56" width="22" height="16" rx="3" fill="#f97316" />
                          <line x1="0" y1="0" x2="92" y2="-45" stroke="#fde047" strokeWidth="4" />
                          <rect x="86" y="-56" width="22" height="16" rx="3" fill="#f97316" />
                          <line x1="0" y1="0" x2="0" y2="82" stroke="#38bdf8" strokeWidth="3" />
                          <circle cx="0" cy="82" r="8" fill="#38bdf8" />
                        </g>
                        {/* 9-Foot Parabolic Dish */}
                        <circle cx="0" cy="0" r="42" fill="#e2e8f0" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="0" cy="0" r="14" fill="#fbbf24" />
                      </g>

                      <text x="110" y="198" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="bold">
                        🔋 4 Nuclear Batteries on Selfie-Sticks
                      </text>
                      <text x="435" y="198" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        📡 9-Foot Dish Aims at Earth!
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 2: FIRST TO CROSS THE ASTEROID BELT                     */}
              {/* ============================================================= */}
              {idx === 1 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    <rect x="10" y="10" width="580" height="210" rx="16" fill="#0b122c" stroke="#38bdf8" strokeWidth="2" />
                    <text x="300" y="34" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">
                      🪨 FIRST SPACECRAFT TO CROSS THE 170-MILLION-MILE ASTEROID BELT!
                    </text>

                    {/* Mars on Left */}
                    <circle cx="65" cy="120" r="16" fill="#ea580c" />
                    <text x="65" y="152" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="bold">Mars</text>

                    {/* Asteroid Belt Rocks in Middle */}
                    {[
                      [185, 75, 10],
                      [235, 155, 12],
                      [295, 68, 11],
                      [345, 162, 13],
                      [405, 82, 9],
                      [260, 105, 7],
                      [365, 115, 8],
                    ].map(([ax, ay, ar], i) => (
                      <circle key={i} cx={ax} cy={ay} r={ar} fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
                    ))}

                    {/* Animated Pioneer Zooming Safely Through */}
                    <path d="M 90 120 L 495 120" stroke="#34d399" strokeWidth="3.5" strokeDasharray="8 5" />
                    <g>
                      <animateTransform attributeName="transform" type="translate" values="115,120; 465,120; 115,120" dur="3.4s" repeatCount="indefinite" />
                      <circle r="16" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                      <text y="4" textAnchor="middle" fill="#060814" fontSize="9" fontWeight="bold">P10</text>
                    </g>

                    {/* Giant Jupiter on Right */}
                    <circle cx="535" cy="120" r="26" fill="#f97316" stroke="#fde047" strokeWidth="2" />
                    <text x="535" y="164" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">Jupiter!</text>

                    <text x="300" y="202" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                      ✅ Proved the Asteroid Belt Is Mostly Empty Space—Safe for All Future Missions!
                    </text>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 3: FIRST AT JUPITER & SPIN-SCAN CAMERA                  */}
              {/* ============================================================= */}
              {idx === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-black">
                    <img
                      src="/images/missions/pioneer-jupiter-flyby.jpg"
                      alt="Real NASA Pioneer close-up photograph of giant Jupiter and its Great Red Spot"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Real Pioneer Photo of Giant Jupiter!
                      </span>
                      <span className="text-xs text-slate-200">
                        Painted strip-by-strip as Pioneer spun past Jupiter’s Great Red Spot!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-amber-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      {/* Panel 1: 10,000x Radiation Belt */}
                      <g transform="translate(145, 115)">
                        <rect x="-125" y="-95" width="250" height="190" rx="14" fill="#231212" stroke="#f97316" strokeWidth="2" />
                        <text x="0" y="-70" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                          ⚡ 1. 10,000× RADIATION BELTS!
                        </text>
                        <ellipse cx="0" cy="4" rx="85" ry="38" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="5 4" />
                        <circle cx="0" cy="4" r="30" fill="#ea580c" stroke="#fdba74" strokeWidth="2" />
                        <ellipse cx="10" cy="12" rx="10" ry="6" fill="#dc2626" />
                        <text x="0" y="68" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="bold">
                          Braved Killer Radiation Around
                        </text>
                        <text x="0" y="84" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Giant Planet Jupiter (Dec 1973)!
                        </text>
                      </g>

                      {/* Panel 2: Spin-Scan Line-by-Line Camera */}
                      <g transform="translate(415, 115)">
                        <rect x="-125" y="-95" width="250" height="190" rx="14" fill="#0c1938" stroke="#38bdf8" strokeWidth="2" />
                        <text x="0" y="-70" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                          🎨 2. SPIN-SCAN LINE CAMERA!
                        </text>
                        <circle cx="0" cy="0" r="38" fill="#ea580c" />
                        <rect x="-38" y="-22" width="76" height="8" fill="#fde047" opacity="0.7" />
                        <rect x="-38" y="-6" width="76" height="8" fill="#fb923c" opacity="0.85" />
                        <rect x="-38" y="10" width="76" height="8" fill="#fde047" opacity="0.7" />
                        <line x1="-55" y1="0" x2="55" y2="0" stroke="#38bdf8" strokeWidth="3">
                          <animate attributeName="y1" values="-35;35;-35" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="y2" values="-35;35;-35" dur="2s" repeatCount="indefinite" />
                        </line>
                        <text x="0" y="68" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                          Each Spin Painted 1 Line to
                        </text>
                        <text x="0" y="84" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Build the First Close-Up Photos!
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 4: PIONEER 11 FIRST TO VISIT SATURN (1979)              */}
              {/* ============================================================= */}
              {idx === 3 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    <rect x="10" y="10" width="580" height="210" rx="16" fill="#0d1536" stroke="#38bdf8" strokeWidth="2" />
                    <text x="300" y="36" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">
                      🪐 PIONEER 11: JUPITER SLINGSHOT ➔ FIRST SPACECRAFT AT SATURN (1979)!
                    </text>

                    {/* Jupiter Slingshot on Left */}
                    <g transform="translate(135, 125)">
                      <circle r="30" fill="#ea580c" stroke="#fdba74" strokeWidth="2" />
                      <text y="48" textAnchor="middle" fill="#fdba74" fontSize="12" fontWeight="bold">
                        1. Jupiter Gravity Boost
                      </text>
                    </g>

                    {/* Arc to Saturn */}
                    <path d="M 165 105 Q 300 40 425 105" fill="none" stroke="#fde047" strokeWidth="4" strokeDasharray="8 5" />

                    {/* Ringed Saturn on Right */}
                    <g transform="translate(460, 125)">
                      <ellipse rx="62" ry="18" fill="none" stroke="#fde047" strokeWidth="4" transform="rotate(-14)" />
                      <ellipse rx="74" ry="22" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" transform="rotate(-14)" />
                      <circle r="24" fill="#fbbf24" />
                      <text y="50" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        2. Discovered Saturn’s Narrow F-Ring!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 5: THE GOLDEN PLAQUE GREETING CARD FOR ALIENS           */}
              {/* ============================================================= */}
              {idx === 4 && (
                <div className="rounded-2xl bg-[#070b1e] border border-amber-400/45 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    {/* Golden Plaque Replica */}
                    <g transform="translate(300, 115)">
                      <rect
                        x="-230"
                        y="-92"
                        width="460"
                        height="184"
                        rx="14"
                        fill="#f59e0b"
                        stroke="#fef08a"
                        strokeWidth="4"
                      />
                      <text x="0" y="-64" textAnchor="middle" fill="#060814" fontSize="15" fontWeight="bold">
                        👋 THE 6×9 INCH PIONEER GOLDEN PLAQUE (DESIGNED BY CARL SAGAN)
                      </text>

                      {/* Left: Pulsar Star Map to Our Sun */}
                      <g transform="translate(-125, -5)">
                        <circle cx="0" cy="0" r="5" fill="#060814" />
                        {[0, 35, 72, 115, 150, 195, 240, 290, 325].map((deg, i) => {
                          const rad = (deg * Math.PI) / 180;
                          return (
                            <line
                              key={i}
                              x1="0"
                              y1="0"
                              x2={Math.cos(rad) * 48}
                              y2={Math.sin(rad) * 48}
                              stroke="#060814"
                              strokeWidth="2"
                            />
                          );
                        })}
                        <text x="0" y="64" textAnchor="middle" fill="#060814" fontSize="11" fontWeight="bold">
                          1. Pulsar Star Map to Sun
                        </text>
                      </g>

                      {/* Right: Two Friendly Humans Waving */}
                      <g transform="translate(105, -10)">
                        {/* Pioneer Silhouette */}
                        <circle cx="0" cy="-6" r="36" fill="none" stroke="#060814" strokeWidth="2" strokeDasharray="4 3" />
                        {/* Waving Figure */}
                        <circle cx="-22" cy="-24" r="7" fill="none" stroke="#060814" strokeWidth="2.5" />
                        <line x1="-22" y1="-17" x2="-22" y2="14" stroke="#060814" strokeWidth="2.5" />
                        <line x1="-22" y1="-8" x2="-38" y2="-24" stroke="#060814" strokeWidth="2.5" />
                        <line x1="-22" y1="14" x2="-30" y2="36" stroke="#060814" strokeWidth="2.5" />
                        <line x1="-22" y1="14" x2="-14" y2="36" stroke="#060814" strokeWidth="2.5" />

                        <circle cx="22" cy="-22" r="7" fill="none" stroke="#060814" strokeWidth="2.5" />
                        <line x1="22" y1="-15" x2="22" y2="14" stroke="#060814" strokeWidth="2.5" />
                        <line x1="22" y1="14" x2="14" y2="36" stroke="#060814" strokeWidth="2.5" />
                        <line x1="22" y1="14" x2="30" y2="36" stroke="#060814" strokeWidth="2.5" />

                        <text x="0" y="69" textAnchor="middle" fill="#060814" fontSize="11" fontWeight="bold">
                          2. Friendly Humans Waving Hello!
                        </text>
                      </g>

                      {/* Bottom Solar System Strip */}
                      <g transform="translate(0, 42)">
                        {[-90, -68, -44, -22, 8, 42, 72, 98].map((px, i) => (
                          <circle key={i} cx={px} cy="0" r={i === 4 ? 7 : i === 5 ? 6 : 3.5} fill="#060814" />
                        ))}
                        <path d="M -44 0 Q -15 20 25 8" fill="none" stroke="#060814" strokeWidth="2" />
                      </g>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 6: FINAL WHISPER AT 80 AU & GLIDING TO ALDEBARAN        */}
              {/* ============================================================= */}
              {idx === 5 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    {/* Panel 1: 30+ Years of Radio Signals */}
                    <g transform="translate(100, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#10193a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                        1. 30+ YEARS ACTIVE!
                      </text>
                      <text x="0" y="-42" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                        Planned: 21 Months
                      </text>
                      <rect x="-62" y="-32" width="18" height="14" rx="3" fill="#94a3b8" />
                      <text x="0" y="6" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        Actual: 30+ Years (1972–2003)!
                      </text>
                      <rect x="-62" y="16" width="124" height="18" rx="4" fill="#10b981" />
                      <text x="0" y="68" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        17× Longer Than Planned!
                      </text>
                    </g>

                    <text x="198" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 2: Final Beep From 7.6 Billion Miles */}
                    <g transform="translate(300, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#10193a" stroke="#fbbf24" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                        2. FINAL BEEP (2003)
                      </text>
                      <text x="0" y="-12" textAnchor="middle" fill="#fde047" fontSize="26">📡</text>
                      <text x="0" y="28" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                        Jan 23, 2003 (80 AU)
                      </text>
                      <text x="0" y="52" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                        7.6 Billion Miles From Earth
                      </text>
                      <text x="0" y="70" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        Before Battery Grew Cold!
                      </text>
                    </g>

                    <text x="400" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 3: Gliding to Star Aldebaran at 136+ AU */}
                    <g transform="translate(500, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#082420" stroke="#34d399" strokeWidth="2.5" />
                      <text x="0" y="-74" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        3. 136+ AU TODAY!
                      </text>
                      <circle cx="38" cy="-14" r="18" fill="#f97316" stroke="#fde047" strokeWidth="2.5" />
                      <line x1="-48" y1="12" x2="12" y2="-6" stroke="#fde047" strokeWidth="3" strokeDasharray="5 4" />
                      <text x="0" y="42" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        Gliding Toward Star
                      </text>
                      <text x="0" y="60" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                        ⭐ Aldebaran (Taurus)!
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
              <span>Finished Pioneer 10 &amp; 11’s Story!</span>
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
