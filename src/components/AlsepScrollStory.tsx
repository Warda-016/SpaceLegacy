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

interface AlsepScrollStoryProps {
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

const ALSEP_SCENES: StoryScene[] = [
  {
    id: 'unpack-suitcases',
    stepNumber: 1,
    shortLabel: '1. Science Suitcases',
    whenLabel: 'STEP 1 OF 6 • 1969–1972 • APOLLO 12, 14, 15, 16 & 17',
    headline: 'Astronauts Unpack Silver Suitcases to Build Robot Villages on the Moon!',
    kidStory:
      'Apollo astronauts didn’t just pick up Moon rocks! On five Apollo landings, astronauts pulled two shiny silver suitcases out of the bottom of their Lunar Module, carried them across the gray dust on a barbell pole, and wired up a whole robotic science village called ALSEP (Apollo Lunar Surface Experiments Package) around a central radio tower!',
    spokenNarration:
      'Step 1: Unpacking Silver Science Suitcases on the Moon! On Apollo 12, 14, 15, 16, and 17, astronauts unpacked silver science suitcases called ALSEP and wired up robotic science villages right on the gray lunar dust!',
    kidTakeaway:
      '🧳 5 Lunar Science Villages: Each ALSEP station had flat ribbon cables connecting moonquake sensors, solar-wind catchers, and heat probes to a Central Wi-Fi Radio Station!',
  },
  {
    id: 'snap27-nuclear-campfire',
    stepNumber: 2,
    shortLabel: '2. Nuclear Campfire!',
    whenLabel: 'STEP 2 OF 6 • SNAP-27 RTG • SURVIVING 14-DAY LUNAR NIGHTS',
    headline: 'Surviving -280°F Two-Week Nights With a Glowing Nuclear Campfire!',
    kidStory:
      'A single night on the Moon lasts 14 Earth days in pitch darkness, and temperatures plunge to a freezing -280°F (-173°C)! Solar panels would die in the dark—so astronauts used tongs to slide a glowing-hot plutonium capsule into a finned nuclear battery called a SNAP-27 RTG! It generated 70 watts of non-stop electricity day and night for 8 straight years!',
    spokenNarration:
      'Step 2: Powered through freezing 14-day lunar nights by a nuclear campfire! Because a single night on the Moon lasts 14 Earth days at minus 280 degrees Fahrenheit, astronauts slid a glowing plutonium rod into a finned SNAP-27 nuclear battery that made 70 watts for eight years!',
    kidTakeaway:
      '🔥 Apollo 14’s 8-Year Record: Designed to last just 1 year, the SNAP-27 nuclear batteries kept the Moon stations running up to 8 times longer than planned!',
  },
  {
    id: 'moon-rings-like-bell',
    stepNumber: 3,
    shortLabel: '3. 12,000 Moonquakes!',
    whenLabel: 'STEP 3 OF 6 • PASSIVE SEISMOMETER • "RINGS LIKE A BELL"',
    headline: '12,500+ Moonquakes & Why the Moon Vibrated Like a Giant Bell for an Hour!',
    kidStory:
      'Wrapped in shiny gold blankets to stay warm, ALSEP’s super-sensitive seismometers could feel an astronaut’s footsteps from hundreds of feet away! Over 8 years, they recorded more than 12,500 moonquakes and meteorite hits! When NASA crashed an empty rocket stage into the Moon to test the sensors, the bone-dry Moon vibrated ("rang like a bell!") for over an hour!',
    spokenNarration:
      'Step 3: Twelve thousand Moonquakes and the Moon rings like a bell! ALSEP’s gold-wrapped seismometers felt over 12,000 moonquakes and meteor hits! Because Moon rocks are bone-dry without water, impacts made the whole Moon vibrate like a giant bell for over an hour!',
    kidTakeaway:
      '🔔 Why Does the Moon Ring? Earth has water in its rocks that absorbs vibrations like a wet sponge—while the Moon’s bone-dry rocks let echoes bounce around for an hour!',
  },
  {
    id: 'laser-mirror-tray',
    stepNumber: 4,
    shortLabel: '4. 100 Quartz Mirrors!',
    whenLabel: 'STEP 4 OF 6 • LUNAR LASER RANGING RETROREFLECTOR (LRRR)',
    headline: 'Zero Batteries Needed: A Suitcase of 100 Magic Corner-Cube Mirrors!',
    kidStory:
      'One famous experiment left by Apollo 11, 14, and 15 astronauts needed ZERO electricity: a suitcase-sized tray holding 100 special 3-sided quartz corner-cube prisms (called a Retroreflector)! Just like a bicycle reflector, any laser beam shot from giant telescopes on Earth hits the corner mirror and bounces straight back to the exact telescope that fired it!',
    spokenNarration:
      'Step 4: Bouncing Earth lasers off 100 quartz corner mirrors! Astronauts left suitcase-sized trays holding 100 quartz corner-cube mirrors that need zero electricity! Any laser beam shot from telescopes on Earth hits the mirror and bounces straight back!',
    kidTakeaway:
      '🪞 2.5-Second Speed-of-Light Bounce: Moving at 186,000 miles per second, a green laser beam takes 1.25 seconds to reach the Moon and 1.25 seconds to bounce back!',
  },
  {
    id: 'moon-drifting-away',
    stepNumber: 5,
    shortLabel: '5. Moon Drifting Away!',
    whenLabel: 'STEP 5 OF 6 • +3.8 CM PER YEAR • LIQUID IRON CORE DISCOVERY',
    headline: 'Surprise! The Moon Is Spiraling 1.5 Inches Away From Earth Every Year!',
    kidStory:
      'By timing laser bounces off the Apollo mirrors down to a fraction of a hair’s width, scientists made a jaw-dropping discovery: Earth’s ocean tides are slowly pushing the Moon 1.5 inches (3.8 cm) farther away from Earth every single year—about as fast as your fingernails grow! And by re-studying ALSEP’s moonquake tapes with modern supercomputers, scientists proved the Moon has a hot liquid iron core!',
    spokenNarration:
      'Step 5: Proving the Moon is drifting 1.5 inches away every year! By timing the 2.5-second round trip of laser pulses bouncing off the Apollo mirrors, scientists proved the Moon is slowly spiraling 1.5 inches farther from Earth every year—and has a hot liquid iron core!',
    kidTakeaway:
      '💅 Fingernail Speed: 1.5 inches (3.8 cm) per year means the Moon was much closer to Earth when dinosaurs roamed our planet!',
  },
  {
    id: 'still-active-today',
    stepNumber: 6,
    shortLabel: '6. Active Today!',
    whenLabel: 'STEP 6 OF 6 • 1977 RADIO STANDBY – STILL BOUNCING LASERS TODAY!',
    headline: 'Radios Switched Off in 1977—But the Laser Mirrors Still Work Today!',
    kidStory:
      'On September 30, 1977, after the ALSEP stations had worked 8 times longer than planned, NASA switched off the ground radio receivers to save budget for new missions. All five golden stations still stand untouched in the airless lunar dust—and because the quartz Laser Mirrors need zero battery power, astronomers on Earth STILL bounce lasers off them every clear night today!',
    spokenNarration:
      'Step 6: Still flashing lasers back to Earth today! Even though NASA switched off the ALSEP radio transmitters in September 1977 after eight heroic years, the passive quartz laser mirrors on the Moon are still working and bouncing Earth lasers back every single week!',
    kidTakeaway:
      '✨ 55+ Years & Counting: The Apollo Laser Mirror arrays are the longest-running science experiment on the Moon—still working right now!',
  },
];

export const AlsepScrollStory: React.FC<AlsepScrollStoryProps> = ({
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
    const scene = ALSEP_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `alsep-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < ALSEP_SCENES.length) {
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
              🪞 Meet &ldquo;ALSEP&rdquo; — Moonquake Detectors &amp; Magic Laser Mirrors!
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How ALSEP Stations Felt 12,000 Moonquakes &amp; Still Bounce Lasers Today!
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
          {ALSEP_SCENES.map((sc, idx) => {
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
        {ALSEP_SCENES.map((scene, idx) => {
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
              {/* SCENE 1: UNPACKING SILVER SCIENCE SUITCASES ON THE MOON       */}
              {/* ============================================================= */}
              {idx === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-black">
                    <img
                      src="/images/missions/alsep-stations.jpg"
                      alt="NASA Apollo ALSEP central station and nuclear generator deployed on the Moon"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Real NASA Photo: ALSEP Science Village!
                      </span>
                      <span className="text-xs text-slate-200">
                        Central radio station, ribbon cables, and SNAP-27 nuclear generator on the Moon!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      <rect x="10" y="10" width="540" height="210" rx="16" fill="#0d1536" stroke="#38bdf8" strokeWidth="2" />
                      <text x="280" y="34" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">
                        🧳 HOW ASTRONAUTS WIRED UP A ROBOT SCIENCE VILLAGE ON THE MOON!
                      </text>

                      {/* Lunar Ground */}
                      <rect x="25" y="172" width="510" height="36" rx="6" fill="#475569" />

                      {/* Central Station */}
                      <g transform="translate(280, 145)">
                        <rect x="-34" y="-22" width="68" height="48" rx="4" fill="#e2e8f0" stroke="#38bdf8" strokeWidth="2.5" />
                        <line x1="0" y1="-22" x2="0" y2="-65" stroke="#fde047" strokeWidth="3" />
                        <circle cx="0" cy="-68" r="6" fill="#38bdf8" />
                        <text x="0" y="6" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">CENTRAL</text>
                        <text x="0" y="18" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">WI-FI HUB</text>
                      </g>

                      {/* Ribbon Cables to Left (Seismometer) & Right (RTG Battery) */}
                      <line x1="135" y1="168" x2="246" y2="168" stroke="#fde047" strokeWidth="3.5" strokeDasharray="6 4" />
                      <line x1="314" y1="168" x2="430" y2="168" stroke="#f97316" strokeWidth="3.5" strokeDasharray="6 4" />

                      <g transform="translate(105, 152)">
                        <circle r="22" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                        <text y="4" textAnchor="middle" fill="#060814" fontSize="9" fontWeight="bold">QUAKE SENSOR</text>
                      </g>

                      <g transform="translate(455, 148)">
                        <rect x="-20" y="-24" width="40" height="48" rx="4" fill="#ea580c" stroke="#fde047" strokeWidth="2" />
                        <text y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">RTG 70W</text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 2: SNAP-27 RTG NUCLEAR CAMPFIRE FOR 14-DAY NIGHTS       */}
              {/* ============================================================= */}
              {idx === 1 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    {/* Panel 1: 14-Day Freezing Lunar Night */}
                    <g transform="translate(100, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#0c1938" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                        1. 14-DAY DARK NIGHT
                      </text>
                      <text x="0" y="-18" textAnchor="middle" fill="#bae6fd" fontSize="28">🌑❄️</text>
                      <text x="0" y="28" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">
                        -280°F (-173°C)!
                      </text>
                      <text x="0" y="54" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                        354 Hours With Zero Sun
                      </text>
                      <text x="0" y="72" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">
                        Solar Panels Would Freeze!
                      </text>
                    </g>

                    <text x="198" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 2: Glowing SNAP-27 RTG Nuclear Campfire */}
                    <g transform="translate(300, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#231212" stroke="#f97316" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#fdba74" fontSize="13" fontWeight="bold">
                        2. SNAP-27 RTG CORE!
                      </text>
                      <rect x="-22" y="-36" width="44" height="58" rx="5" fill="#ea580c" stroke="#fde047" strokeWidth="2.5">
                        <animate attributeName="opacity" values="1;0.75;1" dur="1.5s" repeatCount="indefinite" />
                      </rect>
                      <text x="0" y="-4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">70 WATTS</text>
                      <text x="0" y="50" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                        🔥 Nuclear Heat Battery
                      </text>
                      <text x="0" y="68" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                        Works Day &amp; Night!
                      </text>
                    </g>

                    <text x="400" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 3: Worked for 8 Straight Years! */}
                    <g transform="translate(500, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#082420" stroke="#34d399" strokeWidth="2.5" />
                      <text x="0" y="-74" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        3. 8 YEARS NON-STOP!
                      </text>
                      <text x="0" y="-12" textAnchor="middle" fill="#34d399" fontSize="28">📡🔋</text>
                      <text x="0" y="34" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                        1969 – 1977
                      </text>
                      <text x="0" y="56" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        8× Longer Than Its
                      </text>
                      <text x="0" y="74" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        1-Year Warranty!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 3: 12,500+ MOONQUAKES & RINGS LIKE A BELL               */}
              {/* ============================================================= */}
              {idx === 2 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    {/* Left: Earth Quake Stops Fast (Wet Rocks) */}
                    <g transform="translate(155, 115)">
                      <rect x="-135" y="-96" width="270" height="192" rx="16" fill="#0b1d36" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="-70" textAnchor="middle" fill="#7dd3fc" fontSize="14" fontWeight="bold">
                        🌍 EARTHQUAKE: STOPS IN 1 MINUTE
                      </text>
                      <path d="M -95 0 L -50 0 L -35 -25 L -20 25 L -5 -10 L 10 0 L 95 0" fill="none" stroke="#38bdf8" strokeWidth="3.5" />
                      <text x="0" y="54" textAnchor="middle" fill="#bae6fd" fontSize="12" fontWeight="bold">
                        💧 Water in Earth’s Rocks Soaks Up
                      </text>
                      <text x="0" y="74" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        Vibrations Like a Wet Sponge!
                      </text>
                    </g>

                    {/* Right: Moonquake Rings for Over 1 Hour! */}
                    <g transform="translate(445, 115)">
                      <rect x="-135" y="-96" width="270" height="192" rx="16" fill="#1e1510" stroke="#fbbf24" strokeWidth="2.5" />
                      <text x="0" y="-70" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">
                        🌕 MOONQUAKE: RINGS FOR 1+ HOUR!
                      </text>
                      <path
                        d="M -105 0 L -90 -30 L -75 30 L -60 -32 L -45 32 L -30 -28 L -15 28 L 0 -26 L 15 26 L 30 -24 L 45 24 L 60 -20 L 75 20 L 90 -16 L 105 0"
                        fill="none"
                        stroke="#fde047"
                        strokeWidth="3"
                      />
                      <text x="0" y="54" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        🔔 Bone-Dry Lunar Rocks Echo
                      </text>
                      <text x="0" y="74" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        12,500+ Quakes Like a Giant Bell!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 4: 100 QUARTZ CORNER-CUBE LASER MIRRORS                 */}
              {/* ============================================================= */}
              {idx === 3 && (
                <div className="rounded-2xl bg-[#070b1e] border border-emerald-400/40 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    <rect x="10" y="10" width="580" height="210" rx="16" fill="#081b26" stroke="#34d399" strokeWidth="2.5" />
                    <text x="300" y="34" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">
                      🪞 ZERO BATTERIES NEEDED: EARTH TELESCOPE SHOOTS LASER AT MOON MIRROR!
                    </text>

                    {/* Earth Observatory on Left */}
                    <g transform="translate(85, 130)">
                      <circle r="34" fill="#0284c7" stroke="#34d399" strokeWidth="2.5" />
                      <text y="5" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">EARTH</text>
                      <text y="52" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">1. Telescope Fires</text>
                      <text y="68" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Green Laser Pulse</text>
                    </g>

                    {/* Animated Green Laser Beam Going There & Bouncing Straight Back */}
                    <line x1="122" y1="122" x2="455" y2="122" stroke="#10b981" strokeWidth="4" strokeDasharray="10 6" />
                    <circle cx="290" cy="122" r="7" fill="#34d399">
                      <animate attributeName="cx" values="125;455;125" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="290" y="102" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                      ⚡ 2.5-Second Round Trip at Speed of Light!
                    </text>

                    {/* 100 Quartz Corner Mirrors on the Moon on Right */}
                    <g transform="translate(495, 125)">
                      <rect x="-36" y="-32" width="72" height="64" rx="8" fill="#1e293b" stroke="#fde047" strokeWidth="3" />
                      {[-18, 0, 18].map((mx, i) =>
                        [-14, 14].map((my, j) => (
                          <circle key={`${i}-${j}`} cx={mx} cy={my} r="7" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                        ))
                      )}
                      <text y="52" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">2. 100 Quartz Prisms</text>
                      <text y="68" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Bounce It Right Back!</text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 5: MOON DRIFTING 1.5 INCHES AWAY EVERY YEAR             */}
              {/* ============================================================= */}
              {idx === 4 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    {/* Left: Moon Spiraling Outward +1.5 Inches/Year */}
                    <g transform="translate(155, 115)">
                      <rect x="-135" y="-96" width="270" height="192" rx="16" fill="#0d1536" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="-70" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                        📏 1. MOON DRIFTS +1.5 IN/YR!
                      </text>
                      <circle cx="-55" cy="0" r="24" fill="#0284c7" stroke="#34d399" strokeWidth="2" />
                      <text x="-55" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">EARTH</text>
                      <line x1="-25" y1="0" x2="35" y2="0" stroke="#fde047" strokeWidth="3" strokeDasharray="5 4" />
                      <g>
                        <animateTransform attributeName="transform" type="translate" values="45,0; 68,0; 45,0" dur="2.8s" repeatCount="indefinite" />
                        <circle cx="0" cy="0" r="16" fill="#cbd5e1" stroke="#ffffff" strokeWidth="2" />
                        <text x="0" y="4" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">MOON</text>
                      </g>
                      <text x="0" y="58" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        +3.8 cm (1.5 Inches) Farther Every Year
                      </text>
                      <text x="0" y="76" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                        As Fast As Your Fingernails Grow!
                      </text>
                    </g>

                    {/* Right: Hot Liquid Iron Core Inside the Moon */}
                    <g transform="translate(445, 115)">
                      <rect x="-135" y="-96" width="270" height="192" rx="16" fill="#1e1510" stroke="#f97316" strokeWidth="2" />
                      <text x="0" y="-70" textAnchor="middle" fill="#fdba74" fontSize="13" fontWeight="bold">
                        🔥 2. HOT LIQUID IRON CORE!
                      </text>
                      <circle cx="0" cy="-4" r="44" fill="#64748b" stroke="#cbd5e1" strokeWidth="2.5" />
                      <circle cx="0" cy="-4" r="26" fill="#ea580c" />
                      <circle cx="0" cy="-4" r="13" fill="#fde047" />
                      <text x="0" y="58" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                        Moonquake Echoes Proved the
                      </text>
                      <text x="0" y="76" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        Moon Has a Melted Iron Heart!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 6: STILL WORKING ON THE MOON TODAY!                     */}
              {/* ============================================================= */}
              {idx === 5 && (
                <div className="rounded-2xl bg-[#070b1e] border border-emerald-400/40 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    {/* Panel 1: 1969–1977 Radio Network */}
                    <g transform="translate(100, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#10193a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                        1. 8 YEARS OF DATA
                      </text>
                      <text x="0" y="-14" textAnchor="middle" fill="#fde047" fontSize="26">📻</text>
                      <text x="0" y="28" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                        Sept 30, 1977
                      </text>
                      <text x="0" y="50" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                        Radios Turned Off After
                      </text>
                      <text x="0" y="68" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        11,000 Data Tapes!
                      </text>
                    </g>

                    <text x="198" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 2: 5 Intact Stations in Airless Vacuum */}
                    <g transform="translate(300, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#10193a" stroke="#fbbf24" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                        2. 5 INTACT VILLAGES
                      </text>
                      <text x="0" y="-14" textAnchor="middle" fill="#fde047" fontSize="26">🌕</text>
                      <text x="0" y="28" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                        No Wind or Rain
                      </text>
                      <text x="0" y="50" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                        All 5 Stations Still Stand
                      </text>
                      <text x="0" y="68" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        On the Moon Today!
                      </text>
                    </g>

                    <text x="400" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 3: Laser Mirrors Still Active Today! */}
                    <g transform="translate(500, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#082420" stroke="#34d399" strokeWidth="2.5" />
                      <text x="0" y="-74" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        3. ACTIVE RIGHT NOW!
                      </text>
                      <text x="0" y="-14" textAnchor="middle" fill="#34d399" fontSize="26">🪞✨</text>
                      <text x="0" y="28" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        55+ Years &amp; Counting!
                      </text>
                      <text x="0" y="50" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                        Laser Mirrors Still Flash
                      </text>
                      <text x="0" y="68" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        Back to Earth Every Week!
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
              <span>Finished ALSEP Science Stations’ Story!</span>
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
