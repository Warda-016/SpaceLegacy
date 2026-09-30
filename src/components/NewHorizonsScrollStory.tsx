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

interface NewHorizonsScrollStoryProps {
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

const NEW_HORIZONS_SCENES: StoryScene[] = [
  {
    id: 'fastest-launch',
    stepNumber: 1,
    shortLabel: '1. Fastest Launch (2006)',
    whenLabel: 'STEP 1 OF 6 • JANUARY 19, 2006 • FLORIDA',
    headline: 'Faster Than a Speeding Bullet: Past the Moon in Just 9 Hours!',
    kidStory:
      'Shaped like a shiny gold grand piano, New Horizons blasted off from Florida at a record-breaking 36,373 miles per hour—the fastest spacecraft ever launched from Earth! Apollo astronauts took 3 whole days to reach the Moon, but New Horizons zoomed past the Moon in just 9 HOURS on its 3-billion-mile race to mysterious Pluto!',
    spokenNarration:
      'Step 1: The fastest launch in history! Shaped like a gold grand piano, New Horizons blasted off from Florida at over 36,000 miles per hour! While Apollo astronauts took three days to reach the Moon, New Horizons zoomed past the Moon in just nine hours!',
    kidTakeaway:
      '🎹 Speed Record: 36,373 mph is 10 miles every single second—fast enough to fly from New York to Tokyo in under 11 minutes!',
  },
  {
    id: 'jupiter-slingshot-hibernation',
    stepNumber: 2,
    shortLabel: '2. Jupiter Slingshot & Nap',
    whenLabel: 'STEP 2 OF 6 • 2007–2014 • GRAVITY BOOST & SPACE HIBERNATION',
    headline: 'A Gravity Slingshot Past Giant Jupiter & a 7-Year Space Nap!',
    kidStory:
      'Just 13 months after launch, New Horizons played cosmic pinball with giant Jupiter—using Jupiter’s huge gravity like a slingshot to add 9,000 mph to its speed and snap photos of a 200-mile volcano erupting on Jupiter’s moon Io! Then, to save its instruments for the long dark trip across the solar system, NASA put New Horizons into "hibernation mode" like a sleeping bear—waking it up in 2014!',
    spokenNarration:
      'Step 2: Jupiter slingshot and a seven-year space nap! New Horizons used giant Jupiter’s gravity like a slingshot to go even faster, snapping photos of a volcano on Io! Then it went to sleep in hibernation mode for most of the trip across the solar system to save power!',
    kidTakeaway:
      '🐻 Why Take a Space Nap? Sleeping for 1,873 days kept its cameras and computers fresh so they wouldn’t wear out before reaching Pluto!',
  },
  {
    id: 'pluto-giant-heart',
    stepNumber: 3,
    shortLabel: '3. Pluto’s Giant Heart!',
    whenLabel: 'STEP 3 OF 6 • JULY 14, 2015 • 3 BILLION MILES FROM EARTH',
    headline: 'Surprise! Pluto Isn’t a Boring Gray Rock—It Has a Giant Frozen Heart!',
    kidStory:
      'For 85 years, even the best telescopes only saw Pluto as a blurry dot. When New Horizons zoomed just 7,800 miles above Pluto on July 14, 2015, kids and scientists gasped: gleaming right on Pluto’s chest was a 1,000-mile-wide bright white HEART (called Tombaugh Regio) filled with slowly churning nitrogen glacier ice—bordered by water-ice mountains as tall as the Rocky Mountains!',
    spokenNarration:
      'Step 3: Pluto’s giant frozen heart! When New Horizons zoomed past Pluto in July 2015, it revealed a huge surprise! Instead of a boring gray rock, Pluto has a one-thousand-mile-wide heart made of nitrogen glacier ice, surrounded by giant ice mountains!',
    kidTakeaway:
      '🩵 Rock-Hard Water Mountains: At -390°F (-235°C) on Pluto, ordinary water ice is frozen harder than granite steel—strong enough to form 11,000-foot mountains!',
  },
  {
    id: 'student-dust-counter-charon',
    stepNumber: 4,
    shortLabel: '4. Built by Students!',
    whenLabel: 'STEP 4 OF 6 • STUDENT DUST COUNTER & BIG MOON CHARON',
    headline: 'A Cosmic Dust-Catcher Built by Students & Pluto’s Big Moon Charon!',
    kidStory:
      'Did you know college students built one of the science instruments riding past Pluto? Strapped to the front of New Horizons is the Student Dust Counter—a cake-pan-sized detector that feels and counts every microscopic speck of space dust hitting the spacecraft across 5 billion miles! Right beside Pluto, New Horizons also photographed its giant moon Charon, which wears a dark red cap at its North Pole!',
    spokenNarration:
      'Step 4: A dust catcher built by students! On the front of New Horizons rides the Student Dust Counter, the first planetary instrument ever built and run by students! New Horizons also photographed Pluto’s giant moon Charon, which wears a dark red polar cap!',
    kidTakeaway:
      '🎓 Student Space Record: No student-built science instrument had ever flown past Jupiter or Pluto before—and it is STILL counting dust today!',
  },
  {
    id: 'arrokoth-space-snowman',
    stepNumber: 5,
    shortLabel: '5. Space Snowman (2019)',
    whenLabel: 'STEP 5 OF 6 • JANUARY 1, 2019 • 4 BILLION MILES AWAY',
    headline: '1 Billion Miles Past Pluto: Meeting "Arrokoth" the Space Snowman!',
    kidStory:
      'New Horizons didn’t stop at Pluto! Four billion miles from Earth inside the icy Kuiper Belt, New Horizons zoomed past a mysterious ancient object named Arrokoth on New Year’s Day 2019—the farthest world ever visited by a spacecraft! When the photos arrived, Arrokoth looked just like a giant red SPACE SNOWMAN: two icy spheres that gently bumped together at walking speed 4.5 billion years ago!',
    spokenNarration:
      'Step 5: Meeting a Space Snowman! One billion miles past Pluto in the icy Kuiper Belt, New Horizons visited the farthest object ever explored, named Arrokoth. It looks just like a giant red snowman formed when two icy worlds gently bumped together!',
    kidTakeaway:
      '⛄ How Planets Were Born: Arrokoth’s gentle "snowman" shape proved that early planets formed when icy pebbles softly clumped together instead of smashing violently!',
  },
  {
    id: 'kuiper-belt-today',
    stepNumber: 6,
    shortLabel: '6. Today: 60+ AU Away!',
    whenLabel: 'STEP 6 OF 6 • STILL ACTIVE IN THE KUIPER BELT • 2024–TODAY',
    headline: 'Still Alive Today: 5.5 Billion Miles Away Where Sunlight Is 3,600x Dimmer!',
    kidStory:
      'More than 20 years after launch, New Horizons is STILL ALIVE and racing through the outer edge of the Kuiper Belt over 60 Astronomical Units (5.5 billion miles!) from the Sun! Out here, the Sun looks like a bright star and sunlight is 3,600 times dimmer than on Earth—so New Horizons stays warm using its black finned nuclear thermos battery (RTG)! Even radio signals moving at the speed of light take over 8 hours to reach Earth!',
    spokenNarration:
      'Step 6: Where New Horizons is today! Powered by its nuclear thermos battery, New Horizons is still alive and exploring the Kuiper Belt over five and a half billion miles from Earth! Out there, radio messages traveling at the speed of light take over eight hours to reach home!',
    kidTakeaway:
      '📡 8-Hour Speed-of-Light Delay: When Mission Control says "Hello!" to New Horizons today, it takes over 16 hours to get a reply back!',
  },
];

export const NewHorizonsScrollStory: React.FC<NewHorizonsScrollStoryProps> = ({
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
    const scene = NEW_HORIZONS_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `newhorizons-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < NEW_HORIZONS_SCENES.length) {
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
              🩵 Meet Pluto’s Fastest Piano-Sized Explorer
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How New Horizons Revealed Pluto’s Giant Heart &amp; the Kuiper Belt (2006 – Today!)
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
          {NEW_HORIZONS_SCENES.map((sc, idx) => {
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
        {NEW_HORIZONS_SCENES.map((scene, idx) => {
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

              {/* Large, Razor-Sharp Headline & Kid-Friendly Story */}
              <div className="space-y-3">
                <h4 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
                  {scene.headline}
                </h4>
                <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-normal">
                  {scene.kidStory}
                </p>
              </div>

              {/* =========================================================== */}
              {/* VISUAL STAGE FOR EACH STEP (REAL PHOTOS + LIVE ANIMATION)   */}
              {/* =========================================================== */}

              {/* SCENE 1: FASTEST LAUNCH EVER — PAST THE MOON IN 9 HOURS! */}
              {idx === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/newhorizons-launch.jpg"
                        alt="Real NASA photo of Atlas V rocket launching New Horizons from Florida in January 2006"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                          📸 Real Photo: 36,373 mph Blastoff!
                        </span>
                        <span className="text-xs text-slate-200">
                          Atlas V with 5 solid rocket boosters (Jan 19, 2006)
                        </span>
                      </div>
                    </div>

                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/new-horizons.jpg"
                        alt="Real NASA photo of piano-sized New Horizons spacecraft wrapped in gold thermal foil in cleanroom"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                          📸 Real Photo: Gold Grand Piano!
                        </span>
                        <span className="text-xs text-slate-200">
                          Wrapped in golden thermal blankets to keep warm to Pluto!
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Kid-Friendly Animation: Apollo (3 Days) vs New Horizons (9 Hours!) Race to Moon */}
                  <div className="lg:col-span-5 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex flex-col justify-between min-h-[16rem]">
                    <span className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wider block text-center">
                      🎬 Speed Race to the Moon: 3 Days vs. 9 Hours!
                    </span>
                    <svg
                      viewBox="0 0 360 195"
                      className="w-full h-44 overflow-visible my-auto"
                    >
                      {/* Earth on Left, Moon in Middle, Pluto on Right */}
                      <circle cx="38" cy="110" r="22" fill="#0284c7" />
                      <circle cx="34" cy="104" r="9" fill="#34d399" />
                      <text x="38" y="146" textAnchor="middle" fill="#bae6fd" fontSize="12" fontWeight="bold">
                        Earth
                      </text>

                      <circle cx="170" cy="110" r="14" fill="#94a3b8" stroke="#e2e8f0" strokeWidth="1.5" />
                      <text x="170" y="140" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">
                        Moon (9 Hrs!)
                      </text>

                      <circle cx="322" cy="110" r="18" fill="#f59e0b" stroke="#fde047" strokeWidth="2" />
                      <text x="322" y="144" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                        Pluto
                      </text>

                      {/* Slow Track: Apollo 3 Days */}
                      <line x1="65" y1="158" x2="170" y2="158" stroke="#64748b" strokeWidth="2.5" strokeDasharray="4 4" />
                      <text x="118" y="176" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                        🐢 Apollo: Took 3 Whole Days
                      </text>

                      {/* Fast Track: New Horizons 36,373 mph */}
                      <line x1="65" y1="68" x2="300" y2="68" stroke="#38bdf8" strokeWidth="3" strokeDasharray="8 5" />

                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="68,68; 292,68; 68,68"
                          dur="2.2s"
                          repeatCount="indefinite"
                        />
                        <polygon points="-18,-10 16,0 -18,10" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                        <text x="0" y="-16" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                          ⚡ 36,373 mph!
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 2: JUPITER GRAVITY SLINGSHOT & 7-YEAR HIBERNATION NAP */}
              {idx === 1 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 245"
                    className="w-full h-60 overflow-visible"
                  >
                    {/* Left Panel: Jupiter Gravity Slingshot + Io Volcano */}
                    <g transform="translate(175, 122)">
                      <rect
                        x="-150"
                        y="-96"
                        width="300"
                        height="192"
                        rx="16"
                        fill="#0b132e"
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                      />
                      <text x="0" y="-66" textAnchor="middle" fill="#fde047" fontSize="15" fontWeight="bold">
                        🪐 1. Jupiter Gravity Slingshot (+9,000 mph!)
                      </text>

                      {/* Giant Striped Jupiter */}
                      <circle cx="-35" cy="14" r="44" fill="#d97706" stroke="#fde047" strokeWidth="2.5" />
                      <line x1="-76" y1="0" x2="6" y2="0" stroke="#fef08a" strokeWidth="5" />
                      <line x1="-76" y1="22" x2="6" y2="22" stroke="#9a3412" strokeWidth="5" />
                      <circle cx="-18" cy="12" r="8" fill="#dc2626" />

                      {/* Io Moon Erupting Volcano */}
                      <circle cx="68" cy="-14" r="14" fill="#fde047" stroke="#fb923c" strokeWidth="2" />
                      <path d="M 68 -28 Q 52 -52 40 -42 M 68 -28 Q 84 -52 96 -42" fill="none" stroke="#38bdf8" strokeWidth="3" />
                      <text x="68" y="16" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                        🌋 Io Volcano!
                      </text>

                      {/* Slingshot Curve */}
                      <path d="M -125 65 Q -35 -55 120 -10" fill="none" stroke="#34d399" strokeWidth="3.5" strokeDasharray="7 5" />
                      <text x="0" y="76" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        Whipped Around Jupiter to Go Faster!
                      </text>
                    </g>

                    {/* Right Panel: 7-Year Hibernation Space Nap */}
                    <g transform="translate(505, 122)">
                      <rect
                        x="-150"
                        y="-96"
                        width="300"
                        height="192"
                        rx="16"
                        fill="#0b132e"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <text x="0" y="-66" textAnchor="middle" fill="#7dd3fc" fontSize="15" fontWeight="bold">
                        🐻 2. 1,873 Days in Space Hibernation!
                      </text>

                      {/* Sleeping Grand Piano Probe */}
                      <g transform="translate(0, 8)">
                        <polygon
                          points="-48,-18 44,-28 44,28 -48,18"
                          fill="#f59e0b"
                          stroke="#fef08a"
                          strokeWidth="2.5"
                        />
                        <circle cx="-8" cy="0" r="22" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2.5" />
                        <rect x="-68" y="-8" width="20" height="16" rx="3" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />

                        {/* Floating Zzz Animation */}
                        <g>
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0; 14,-20; 0,0"
                            dur="2.4s"
                            repeatCount="indefinite"
                          />
                          <text x="56" y="-18" fill="#fde047" fontSize="20" fontWeight="bold">
                            Zzz... 😴
                          </text>
                        </g>
                      </g>

                      <text x="0" y="76" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                        ⏰ Woke Up Fresh for Pluto in Dec 2014!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* SCENE 3: PLUTO'S GIANT NITROGEN-ICE HEART & ROCKY MOUNTAINS */}
              {idx === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/newhorizons-pluto-heart.jpg"
                        alt="Real NASA New Horizons close-up photo of mountains and nitrogen ice plains inside Pluto's Heart"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                          📸 Real Photo: Inside Pluto’s Heart!
                        </span>
                        <span className="text-xs text-slate-200">
                          Smooth nitrogen-ice glaciers next to 11,000-foot water-ice mountains!
                        </span>
                      </div>
                    </div>

                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/newhorizons-pluto-mountains.jpg"
                        alt="Real NASA New Horizons photo of Pluto's mountains and blue atmospheric haze layers"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                          📸 Real Photo: Ice Mountains &amp; Sky!
                        </span>
                        <span className="text-xs text-slate-200">
                          Tall water-ice peaks and glowing blue sky haze on Pluto!
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Kid-Friendly Animation: Pluto's Glowing 1,000-Mile Nitrogen-Ice Heart */}
                  <div className="lg:col-span-5 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex flex-col justify-between min-h-[16rem]">
                    <span className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wider block text-center">
                      🎬 Live Animation: Pluto’s 1,000-Mile Frozen Heart!
                    </span>
                    <svg
                      viewBox="0 0 360 195"
                      className="w-full h-44 overflow-visible my-auto"
                    >
                      <g transform="translate(180, 96)">
                        {/* Pluto Globe */}
                        <circle
                          cx="0"
                          cy="0"
                          r="68"
                          fill="#b45309"
                          stroke="#fdba74"
                          strokeWidth="3"
                        />
                        {/* Glowing Bright White Heart (Tombaugh Regio) */}
                        <path
                          d="M 8 42 C 8 42 -36 12 -36 -14 C -36 -30 -20 -38 -6 -24 C 2 -16 8 -8 8 -8 C 8 -8 14 -16 22 -24 C 36 -38 52 -30 52 -14 C 52 12 8 42 8 42 Z"
                          fill="#fffbeb"
                          stroke="#38bdf8"
                          strokeWidth="3"
                        >
                          <animate
                            attributeName="transform"
                            type="scale"
                            values="1;1.08;1"
                            dur="1.8s"
                            repeatCount="indefinite"
                          />
                        </path>
                        <text x="8" y="2" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
                          NITROGEN
                        </text>
                        <text x="8" y="16" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
                          GLACIER ICE!
                        </text>
                      </g>

                      <text x="180" y="184" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                        🩵 Tombaugh Regio: 1,000 Miles Wide!
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 4: STUDENT DUST COUNTER & PLUTO'S BIG MOON CHARON */}
              {idx === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/newhorizons-pluto-charon.jpg"
                      alt="Real NASA New Horizons color portrait of Pluto and its large moon Charon"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                        📸 Real NASA Photo: Pluto &amp; Moon Charon!
                      </span>
                      <span className="text-xs text-slate-200">
                        Look at the top of Charon (right)—it has a giant dark red polar cap!
                      </span>
                    </div>
                  </div>

                  {/* Kid-Friendly Animation: Student Dust Counter Catching Space Dust */}
                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex items-center justify-center">
                    <svg
                      viewBox="0 0 460 225"
                      className="w-full h-56 overflow-visible"
                    >
                      <rect
                        x="14"
                        y="16"
                        width="432"
                        height="194"
                        rx="16"
                        fill="#0b132e"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <text x="230" y="44" textAnchor="middle" fill="#fde047" fontSize="15" fontWeight="bold">
                        🎓 Student Dust Counter (Built by College Students!)
                      </text>

                      {/* Incoming Space Dust Grains */}
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="-45,0; 35,0; -45,0"
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                        <circle cx="95" cy="95" r="5" fill="#fde047" />
                        <circle cx="125" cy="122" r="4" fill="#38bdf8" />
                        <circle cx="88" cy="145" r="5" fill="#fb923c" />
                        <text x="105" y="76" textAnchor="middle" fill="#bae6fd" fontSize="12" fontWeight="bold">
                          ✨ Space Dust Grains
                        </text>
                      </g>

                      {/* Detector Pad on Front of New Horizons */}
                      <g transform="translate(275, 118)">
                        <rect
                          x="-24"
                          y="-46"
                          width="22"
                          height="92"
                          rx="5"
                          fill="#10b981"
                          stroke="#ffffff"
                          strokeWidth="2.5"
                        />
                        <rect
                          x="-2"
                          y="-34"
                          width="110"
                          height="68"
                          rx="8"
                          fill="#f59e0b"
                          stroke="#fef08a"
                          strokeWidth="2"
                        />
                        <text x="53" y="-4" textAnchor="middle" fill="#060814" fontSize="12" fontWeight="bold">
                          NEW HORIZONS
                        </text>
                        <text x="53" y="14" textAnchor="middle" fill="#060814" fontSize="11" fontWeight="bold">
                          DUST COUNTER
                        </text>
                      </g>

                      <text x="230" y="190" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        POP! Counts Every Microscopic Dust Hit Across 5.5 Billion Miles!
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 5: ARROKOTH — THE KUIPER BELT SPACE SNOWMAN (4 BILLION MILES AWAY!) */}
              {idx === 4 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 235"
                    className="w-full h-56 overflow-visible"
                  >
                    {/* Left Panel: How Two Icy Worlds Gently Bumped Together */}
                    <g transform="translate(175, 118)">
                      <rect
                        x="-150"
                        y="-94"
                        width="300"
                        height="188"
                        rx="16"
                        fill="#0b132e"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <text x="0" y="-62" textAnchor="middle" fill="#7dd3fc" fontSize="15" fontWeight="bold">
                        1. 4.5 Billion Years Ago: Gentle Bump!
                      </text>

                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="-18,0; 6,0; -18,0"
                          dur="2.4s"
                          repeatCount="indefinite"
                        />
                        <circle cx="-36" cy="8" r="34" fill="#b45309" stroke="#fdba74" strokeWidth="2.5" />
                      </g>
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="18,0; -6,0; 18,0"
                          dur="2.4s"
                          repeatCount="indefinite"
                        />
                        <circle cx="38" cy="8" r="24" fill="#c2410c" stroke="#fdba74" strokeWidth="2.5" />
                      </g>

                      <text x="0" y="70" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        Bumped at Walking Speed (3 mph) &amp; Stuck!
                      </text>
                    </g>

                    {/* Right Panel: Arrokoth Space Snowman Discovered Jan 1, 2019 */}
                    <g transform="translate(505, 118)">
                      <rect
                        x="-150"
                        y="-94"
                        width="300"
                        height="188"
                        rx="16"
                        fill="#1e1b4b"
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                      />
                      <text x="0" y="-62" textAnchor="middle" fill="#fde047" fontSize="15" fontWeight="bold">
                        ⛄ 2. &ldquo;Arrokoth&rdquo; Space Snowman!
                      </text>

                      {/* Connected Snowman Shape with Bright White Neck */}
                      <circle cx="-26" cy="12" r="36" fill="#9a3412" stroke="#fdba74" strokeWidth="2.5" />
                      <circle cx="32" cy="4" r="25" fill="#9a3412" stroke="#fdba74" strokeWidth="2.5" />
                      <ellipse cx="7" cy="8" rx="6" ry="18" fill="#fef08a" />

                      <text x="-26" y="16" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                        12 Miles
                      </text>
                      <text x="32" y="8" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                        9 Mi
                      </text>

                      <text x="0" y="70" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                        Farthest World Ever Visited (4 Billion Miles)!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* SCENE 6: TODAY IN THE KUIPER BELT (60+ AU AWAY) & PLUTO CRESCENT */}
              {idx === 5 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/newhorizons-pluto-crescent.jpg"
                      alt="Real NASA New Horizons farewell photograph looking back at Pluto's glowing atmospheric crescent"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                        📸 Real Photo: Looking Back at Pluto!
                      </span>
                      <span className="text-xs text-slate-200">
                        Pluto’s sky glowing like a ring as New Horizons raced deeper into the Kuiper Belt!
                      </span>
                    </div>
                  </div>

                  {/* Kid-Friendly Animation: 60+ AU Away & 8-Hour Radio Signal Delay */}
                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex items-center justify-center">
                    <svg
                      viewBox="0 0 460 225"
                      className="w-full h-56 overflow-visible"
                    >
                      <rect
                        x="12"
                        y="14"
                        width="436"
                        height="196"
                        rx="16"
                        fill="#080d24"
                        stroke="#34d399"
                        strokeWidth="2.5"
                      />
                      <text x="230" y="42" textAnchor="middle" fill="#34d399" fontSize="15" fontWeight="bold">
                        📡 STILL ALIVE TODAY: 60.4 AU (5.5 Billion Miles) Away!
                      </text>

                      {/* Earth Dish on Left */}
                      <g transform="translate(68, 122)">
                        <circle cx="0" cy="0" r="24" fill="#0284c7" />
                        <circle cx="-6" cy="-6" r="9" fill="#34d399" />
                        <text x="0" y="42" textAnchor="middle" fill="#bae6fd" fontSize="12" fontWeight="bold">
                          Earth Dish
                        </text>
                      </g>

                      {/* New Horizons on Right in Deep Kuiper Belt */}
                      <g transform="translate(382, 122)">
                        <rect x="-38" y="-12" width="22" height="24" rx="4" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                        <polygon points="-16,-18 28,-26 28,26 -16,18" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
                        <circle cx="8" cy="0" r="15" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" />
                        <text x="0" y="42" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                          🔋 Nuclear RTG Active!
                        </text>
                      </g>

                      {/* Animated Radio Wave Traveling 8+ Hours */}
                      <line x1="102" y1="122" x2="335" y2="122" stroke="#38bdf8" strokeWidth="3" strokeDasharray="8 6" />
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="330,122; 105,122; 330,122"
                          dur="3.2s"
                          repeatCount="indefinite"
                        />
                        <circle cx="0" cy="0" r="9" fill="#fde047" />
                        <text x="0" y="-16" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                          📻 8-Hour Light Travel Time!
                        </text>
                      </g>

                      <text x="230" y="192" textAnchor="middle" fill="#bae6fd" fontSize="13" fontWeight="bold">
                        Sunlight Here Is 3,600x Dimmer Than on Earth!
                      </text>
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
              <span>Finished New Horizons’ Story!</span>
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
