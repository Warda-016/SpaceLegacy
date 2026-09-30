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

interface LroScrollStoryProps {
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

const LRO_SCENES: StoryScene[] = [
  {
    id: 'launch',
    stepNumber: 1,
    shortLabel: '1. Launch (2009)',
    whenLabel: 'STEP 1 OF 6 • JUNE 18, 2009 • FLORIDA',
    headline: 'Blastoff of the Moon’s Ultimate 3D Robot Mapmaker!',
    kidStory:
      'On June 18, 2009, the Lunar Reconnaissance Orbiter (LRO) roared into the Florida sky atop an Atlas V rocket! Right underneath LRO rode a daredevil partner spacecraft called LCROSS. After a 4-day trip across 240,000 miles, LRO locked into a low polar orbit skimming just 31 miles (50 km) above the Moon’s jagged mountain peaks!',
    spokenNarration:
      'Step 1: Blastoff to the Moon! On June 18, 2009, the Lunar Reconnaissance Orbiter launched from Florida atop an Atlas 5 rocket. Just four days later, it entered a low polar orbit skimming only 31 miles above the Moon’s mountains!',
    kidTakeaway:
      '🛰️ Why a Polar Orbit? By looping North-to-South over the poles while the Moon slowly spins underneath, LRO maps 100% of the entire lunar globe!',
  },
  {
    id: 'apollo-footprints',
    stepNumber: 2,
    shortLabel: '2. Apollo Footprints',
    whenLabel: 'STEP 2 OF 6 • 50 CM PER PIXEL • EAGLE-EYE CAMERA (LROC)',
    headline: 'Zooming In From Space to Spot Real Apollo Footprints & Moon Buggies!',
    kidStory:
      'Could the Apollo Moon landings really be seen from orbit? YES! LRO’s super-sharp telephoto camera (LROC) zoomed in on all six Apollo landing sites from 31 miles overhead. The photos clearly captured the golden Apollo descent stages, parked electric moon buggies, and even the wiggly dark footpaths where astronauts walked in the gray dust!',
    spokenNarration:
      'Step 2: Spotting Apollo Footprints from Space! LRO pointed its super-sharp telephoto camera at all six Apollo landing sites. From 31 miles up, it photographed the golden landers, parked moon buggies, and the actual footpaths where astronauts walked!',
    kidTakeaway:
      '👣 Preserved for Millions of Years: Because the Moon has no wind or rain, LRO proved the astronauts’ boot trails and buggy tracks are still crisp today!',
  },
  {
    id: 'polar-ice-craters',
    stepNumber: 3,
    shortLabel: '3. Colder Than Pluto!',
    whenLabel: 'STEP 3 OF 6 • DIVINER & LAMP NIGHT-VISION • -248°C',
    headline: 'Pitch-Black South Pole Craters Colder Than Pluto Full of Water Ice!',
    kidStory:
      'At the Moon’s South Pole, deep craters like Shackleton have walls so tall that sunlight has NEVER touched their floors in 2 billion years! LRO’s Diviner infrared thermometer measured these dark crater floors at -415°F (-248°C)—colder than distant Pluto! Then LRO’s LAMP night-vision sensor used faint ultraviolet starlight to peer into the darkness and spot billions of tons of frozen water ice!',
    spokenNarration:
      'Step 3: Colder than Pluto and full of water ice! At the Moon’s South Pole, LRO’s thermometer measured pitch-black craters at minus 415 degrees Fahrenheit! Using faint starlight like night-vision goggles, LRO discovered billions of tons of frozen water ice hiding in the dark!',
    kidTakeaway:
      '❄️ Starlight Night-Vision: How do you see inside a pitch-black crater with zero sunlight? LRO’s LAMP sensor uses the gentle ultraviolet glow of distant stars!',
  },
  {
    id: 'lola-5beam-laser',
    stepNumber: 4,
    shortLabel: '4. 7 Billion Laser Zaps',
    whenLabel: 'STEP 4 OF 6 • LOLA 5-BEAM LASER ALTIMETER',
    headline: 'Firing 7 Billion Laser Pulses to Build a 3D Map of Every Crater!',
    kidStory:
      'To build the most accurate 3D map of the Moon ever created, LRO carries a 5-beam laser ruler called LOLA! Twenty-eight times every single second, LOLA splits a laser beam into 5 glowing green spots and bounces them off the lunar ground—timing the echo to measure the height of every mountain, valley, and boulder down to 4 inches (10 centimeters)!',
    spokenNarration:
      'Step 4: Seven Billion Laser Pulses! LRO carries a five-beam laser ruler called LOLA. Firing 28 times every second, it has bounced nearly seven billion laser pulses off the Moon to build a 3D height map of every mountain and crater!',
    kidTakeaway:
      '📏 6.9+ Billion Laser Measurements: LRO’s 5-dot laser pattern measures the exact slope of the ground so future landers don’t tip over on steep rocks!',
  },
  {
    id: 'petabyte-record',
    stepNumber: 5,
    shortLabel: '5. 1.4+ Petabytes Data',
    whenLabel: 'STEP 5 OF 6 • KA-BAND SUPER-RADIO • 220+ NEW CRATERS',
    headline: 'More Space Data Than All Other Planetary Missions Combined!',
    kidStory:
      'Because LRO flies so close to Earth with a super-fast Ka-band dish antenna (100 megabits per second!), it has beamed back over 1.4 PETABYTES of Moon photos and maps—that’s equal to 300,000 DVDs and more data than every other planetary mission in history combined! By comparing "before and after" photos, LRO even caught over 220 brand-new craters punched into the Moon by space rocks since 2009!',
    spokenNarration:
      'Step 5: A Cosmic Data Record! Using its high-speed antenna, LRO has beamed back over 1.4 petabytes of Moon photos—more data than all other planetary missions combined! By comparing before and after pictures, it even spotted over 220 brand-new meteor craters!',
    kidTakeaway:
      '💥 The Moon Is Still Getting Hit: By comparing millions of "before and after" photos, LRO proved space rocks are still splashing new craters onto the Moon today!',
  },
  {
    id: 'artemis-scout-today',
    stepNumber: 6,
    shortLabel: '6. Today: Artemis Scout',
    whenLabel: 'STEP 6 OF 6 • STILL ACTIVE IN LUNAR ORBIT • 2009–TODAY',
    headline: 'Still Orbiting Today: Scouting the South Pole for Artemis Astronauts!',
    kidStory:
      'More than 16 years after launch, LRO is STILL ALIVE and orbiting the Moon every two hours right now! It has mapped the 13 candidate South Pole landing zones for NASA’s Artemis III astronauts—finding the sweet spots where sunlit mountain ridges (for solar power) sit right next door to dark craters full of water ice for drinking water, oxygen, and rocket fuel!',
    spokenNarration:
      'Step 6: Still Orbiting Today as NASA’s Artemis Scout! More than 16 years after launch, LRO is still circling the Moon every two hours! It has mapped the exact South Pole landing zones where Artemis astronauts will touch down next to ancient water ice!',
    kidTakeaway:
      '🌕 Guiding Humans Back to the Moon: Every future Artemis astronaut landing at the Lunar South Pole will steer down using LRO’s 3D laser and camera maps!',
  },
];

export const LroScrollStory: React.FC<LroScrollStoryProps> = ({
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
    const scene = LRO_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `lro-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < LRO_SCENES.length) {
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
              🛰️ Meet the Moon’s Eagle-Eye Robot Scout
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How LRO Maps Apollo Footprints &amp; Polar Ice (2009 – Today!)
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
          {LRO_SCENES.map((sc, idx) => {
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
        {LRO_SCENES.map((scene, idx) => {
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

              {/* SCENE 1: LAUNCH + REAL NASA PHOTOS + POLAR ORBIT ANIMATION */}
              {idx === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/lro-launch.jpg"
                        alt="Real NASA photo of Lunar Reconnaissance Orbiter launching atop an Atlas V rocket in Florida"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                          📸 Real Photo: Atlas V Launch
                        </span>
                        <span className="text-xs text-slate-200">
                          LRO &amp; LCROSS blasting off from Florida (June 18, 2009)
                        </span>
                      </div>
                    </div>

                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/lro-cleanroom.jpg"
                        alt="Real NASA photo of Lunar Reconnaissance Orbiter and Diviner instrument inside the NASA cleanroom"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                          📸 Real Photo: Cleanroom Prep!
                        </span>
                        <span className="text-xs text-slate-200">
                          Engineers installing LRO’s 7 science instruments before launch!
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Animated Diagram: 4-Day Trip to Lunar Polar Orbit */}
                  <div className="lg:col-span-5 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex flex-col justify-between min-h-[16rem]">
                    <span className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wider block text-center">
                      🎬 Live Animation: North-to-South Polar Orbit!
                    </span>
                    <svg
                      viewBox="0 0 360 195"
                      className="w-full h-44 overflow-visible my-auto"
                    >
                      {/* Earth */}
                      <circle cx="52" cy="120" r="24" fill="#0284c7" />
                      <circle cx="46" cy="112" r="10" fill="#34d399" />
                      <text
                        x="52"
                        y="160"
                        textAnchor="middle"
                        fill="#bae6fd"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        Earth (2009)
                      </text>

                      {/* Transfer path */}
                      <path
                        d="M 80 112 Q 165 65 236 82"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                      />
                      <text
                        x="155"
                        y="64"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        🚀 4-Day Lunar Express!
                      </text>

                      {/* Moon + Polar Orbit Loop */}
                      <g transform="translate(278, 98)">
                        <circle
                          cx="0"
                          cy="0"
                          r="34"
                          fill="#94a3b8"
                          stroke="#e2e8f0"
                          strokeWidth="2"
                        />
                        <circle cx="-10" cy="-8" r="6" fill="#64748b" />
                        <circle cx="12" cy="10" r="8" fill="#64748b" />
                        <circle cx="-8" cy="14" r="5" fill="#64748b" />

                        {/* Vertical Polar Orbit Ring */}
                        <ellipse
                          cx="0"
                          cy="0"
                          rx="18"
                          ry="54"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                          strokeDasharray="5 4"
                        />

                        {/* Animated LRO Orbiter looping pole-to-pole */}
                        <g>
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,-54; 18,0; 0,54; -18,0; 0,-54"
                            dur="3.4s"
                            repeatCount="indefinite"
                          />
                          <rect
                            x="-14"
                            y="-5"
                            width="10"
                            height="10"
                            fill="#38bdf8"
                          />
                          <rect
                            x="-4"
                            y="-6"
                            width="12"
                            height="12"
                            rx="2"
                            fill="#fbbf24"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />
                        </g>

                        <text
                          x="0"
                          y="-64"
                          textAnchor="middle"
                          fill="#7dd3fc"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          North Pole
                        </text>
                        <text
                          x="0"
                          y="72"
                          textAnchor="middle"
                          fill="#fde047"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          South Pole (50 km Orbit)
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 2: SPOTTING APOLLO FOOTPRINTS & MOON BUGGIES FROM ORBIT */}
              {idx === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-6 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/lro-apollo-sites.jpg"
                      alt="Real NASA LROC orbital photograph of Apollo 11 Tranquility Base showing Eagle descent stage and astronaut footpaths"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Real LRO Camera Photo: Tranquility Base From Space!
                      </span>
                      <span className="text-xs text-slate-200">
                        Captured 31 miles up—showing Apollo’s lander and dark astronaut footpaths!
                      </span>
                    </div>
                  </div>

                  {/* Animated LROC Telephoto Scan of Apollo Site */}
                  <div className="lg:col-span-6 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex items-center justify-center">
                    <svg
                      viewBox="0 0 440 230"
                      className="w-full h-60 overflow-visible"
                    >
                      {/* Lunar Gray Regolith Ground */}
                      <rect
                        x="12"
                        y="142"
                        width="416"
                        height="76"
                        rx="12"
                        fill="#475569"
                        stroke="#94a3b8"
                        strokeWidth="2"
                      />

                      {/* Wiggly Astronaut Footpath Trail */}
                      <path
                        d="M 115 182 Q 175 162 235 184 T 355 176"
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="4"
                        strokeDasharray="4 6"
                      />
                      <text
                        x="235"
                        y="208"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        👣 Astronaut Boot Trails &amp; Buggy Tracks Still Crisp!
                      </text>

                      {/* Golden Apollo Descent Stage on Left */}
                      <g transform="translate(105, 162)">
                        <polygon
                          points="-18,12 36,20 36,4 -18,4"
                          fill="#0f172a"
                          opacity="0.65"
                        />
                        <rect
                          x="-20"
                          y="-14"
                          width="40"
                          height="22"
                          rx="4"
                          fill="#f59e0b"
                          stroke="#fef08a"
                          strokeWidth="2"
                        />
                        <line
                          x1="-16"
                          y1="8"
                          x2="-26"
                          y2="20"
                          stroke="#e2e8f0"
                          strokeWidth="3"
                        />
                        <line
                          x1="16"
                          y1="8"
                          x2="26"
                          y2="20"
                          stroke="#e2e8f0"
                          strokeWidth="3"
                        />
                        <text
                          x="0"
                          y="-22"
                          textAnchor="middle"
                          fill="#fef08a"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          Apollo Lander
                        </text>
                      </g>

                      {/* Parked Electric Moon Buggy on Right */}
                      <g transform="translate(345, 166)">
                        <rect
                          x="-18"
                          y="-8"
                          width="36"
                          height="12"
                          rx="3"
                          fill="#e2e8f0"
                          stroke="#38bdf8"
                          strokeWidth="2"
                        />
                        <circle cx="-12" cy="8" r="6" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                        <circle cx="12" cy="8" r="6" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                        <text
                          x="0"
                          y="-16"
                          textAnchor="middle"
                          fill="#7dd3fc"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          🛞 Moon Buggy
                        </text>
                      </g>

                      {/* Animated LRO Orbiter Scanning Overhead */}
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="105,36; 335,36; 105,36"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                        {/* Camera Scan Cone */}
                        <polygon
                          points="0,16 -52,130 52,130"
                          fill="#38bdf8"
                          opacity="0.22"
                        />
                        <rect
                          x="-44"
                          y="-6"
                          width="26"
                          height="12"
                          rx="2"
                          fill="#0284c7"
                          stroke="#7dd3fc"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="-18"
                          y="-12"
                          width="36"
                          height="24"
                          rx="4"
                          fill="#fbbf24"
                          stroke="#fef08a"
                          strokeWidth="2"
                        />
                        <text
                          x="0"
                          y="-20"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          📷 LROC Telephoto (50 cm/px)
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 3: PITCH-BLACK SOUTH POLE CRATERS COLDER THAN PLUTO (-248°C) */}
              {idx === 2 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 245"
                    className="w-full h-60 overflow-visible"
                  >
                    {/* Left & Right Sunlit South Pole Mountain Peaks + Deep Dark Shackleton Crater */}
                    <path
                      d="M 15 225 L 15 115 L 145 78 L 235 205 L 445 205 L 535 78 L 665 115 L 665 225 Z"
                      fill="#334155"
                      stroke="#94a3b8"
                      strokeWidth="3"
                    />

                    {/* Pitch-Black Permanently Shadowed Crater Floor + Glowing Water Ice Crystals */}
                    <polygon
                      points="152,88 235,205 445,205 528,88"
                      fill="#020617"
                    />
                    <rect
                      x="238"
                      y="184"
                      width="204"
                      height="22"
                      rx="6"
                      fill="#0284c7"
                      stroke="#7dd3fc"
                      strokeWidth="2"
                    />
                    <text
                      x="340"
                      y="199"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      ❄️ FROZEN WATER ICE RESERVOIR (-248°C / 25 K)
                    </text>

                    {/* Sunlit Peak Labels */}
                    <text
                      x="95"
                      y="64"
                      textAnchor="middle"
                      fill="#fde047"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      ☀️ Sunlit Rim
                    </text>
                    <text
                      x="585"
                      y="64"
                      textAnchor="middle"
                      fill="#fde047"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      ☀️ Sunlit Rim
                    </text>

                    {/* LRO Flying Overhead Using Diviner & LAMP UV Starlight Night-Vision */}
                    <g transform="translate(340, 36)">
                      <polygon
                        points="-12,18 -95,148 95,148 12,18"
                        fill="#a855f7"
                        opacity="0.24"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.15;0.34;0.15"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </polygon>

                      <rect
                        x="-78"
                        y="-8"
                        width="42"
                        height="16"
                        rx="3"
                        fill="#0284c7"
                        stroke="#7dd3fc"
                        strokeWidth="2"
                      />
                      <rect
                        x="-34"
                        y="-14"
                        width="68"
                        height="28"
                        rx="6"
                        fill="#fbbf24"
                        stroke="#fef08a"
                        strokeWidth="2.5"
                      />
                      <text
                        x="0"
                        y="5"
                        textAnchor="middle"
                        fill="#060814"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        LRO ORBITER
                      </text>

                      <text
                        x="0"
                        y="-22"
                        textAnchor="middle"
                        fill="#e9d5ff"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        ✨ LAMP Starlight Night-Vision + Diviner Thermometer!
                      </text>

                      <text
                        x="0"
                        y="118"
                        textAnchor="middle"
                        fill="#c084fc"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        Pitch-Black Shackleton Crater (Colder Than Pluto!)
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* SCENE 4: LOLA 5-BEAM LASER ALTIMETER (7 BILLION LASER PULSES) */}
              {idx === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-6 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/lro-lola-map.jpg"
                      alt="Real NASA 3D lunar topography map created by LRO's LOLA 5-beam laser altimeter"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                        📸 Real NASA LOLA 3D Elevation Map!
                      </span>
                      <span className="text-xs text-slate-200">
                        Built from 6.9+ billion laser pulses bouncing off every crater and peak!
                      </span>
                    </div>
                  </div>

                  {/* Animated 5-Beam Green Laser Ruler */}
                  <div className="lg:col-span-6 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex items-center justify-center">
                    <svg
                      viewBox="0 0 430 225"
                      className="w-full h-56 overflow-visible"
                    >
                      {/* 3D Terrain Mountains */}
                      <path
                        d="M 15 198 L 75 152 L 135 182 L 215 128 L 295 178 L 365 144 L 415 198 Z"
                        fill="#1e293b"
                        stroke="#34d399"
                        strokeWidth="2.5"
                      />

                      {/* LRO Firing 5 Green Laser Beams */}
                      <g transform="translate(215, 34)">
                        <rect
                          x="-64"
                          y="-6"
                          width="32"
                          height="14"
                          rx="2"
                          fill="#0284c7"
                          stroke="#7dd3fc"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="-30"
                          y="-12"
                          width="60"
                          height="24"
                          rx="5"
                          fill="#f8fafc"
                          stroke="#38bdf8"
                          strokeWidth="2"
                        />
                        <text
                          x="0"
                          y="5"
                          textAnchor="middle"
                          fill="#0f172a"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          LOLA LASER
                        </text>

                        {/* 5 Split Green Laser Beams */}
                        {[
                          [-140, 118],
                          [-75, 146],
                          [0, 94],
                          [75, 144],
                          [145, 110],
                        ].map(([tx, ty], bIdx) => (
                          <g key={bIdx}>
                            <line
                              x1="0"
                              y1="12"
                              x2={tx}
                              y2={ty}
                              stroke="#10b981"
                              strokeWidth="3"
                              strokeDasharray="7 4"
                            >
                              <animate
                                attributeName="opacity"
                                values="1;0.25;1"
                                dur="0.55s"
                                repeatCount="indefinite"
                              />
                            </line>
                            <circle cx={tx} cy={ty} r="6" fill="#34d399">
                              <animate
                                attributeName="r"
                                values="4;8;4"
                                dur="0.55s"
                                repeatCount="indefinite"
                              />
                            </circle>
                          </g>
                        ))}

                        <text
                          x="0"
                          y="-18"
                          textAnchor="middle"
                          fill="#34d399"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          📏 5-Beam Laser Fires 28 Times Every Second!
                        </text>
                      </g>

                      <text
                        x="215"
                        y="216"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        6.9+ Billion Laser Echoes = 10-cm Height Accuracy!
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 5: 1.4+ PETABYTES RECORD & 220+ NEW IMPACT CRATERS */}
              {idx === 4 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 235"
                    className="w-full h-56 overflow-visible"
                  >
                    {/* Left Panel: 1.4+ Petabytes Data Record Comparison */}
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
                      <text
                        x="0"
                        y="-62"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="15"
                        fontWeight="bold"
                      >
                        📡 1.4+ Petabytes Beamed to Earth!
                      </text>

                      {/* LRO Bar vs All Other Planetary Missions Bar */}
                      <rect
                        x="-120"
                        y="-34"
                        width="240"
                        height="32"
                        rx="6"
                        fill="#0284c7"
                        stroke="#7dd3fc"
                        strokeWidth="2"
                      />
                      <text
                        x="0"
                        y="-13"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        LRO ALONE: 1,400+ Terabytes (300,000 DVDs!)
                      </text>

                      <rect
                        x="-120"
                        y="12"
                        width="165"
                        height="28"
                        rx="6"
                        fill="#334155"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />
                      <text
                        x="-37"
                        y="30"
                        textAnchor="middle"
                        fill="#e2e8f0"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        All Other Planetary Missions
                      </text>

                      <text
                        x="0"
                        y="68"
                        textAnchor="middle"
                        fill="#34d399"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        100 Mbps Ka-Band Super-Radio Dish!
                      </text>
                    </g>

                    {/* Right Panel: Before & After Spotting 220+ Brand-New Impact Craters */}
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
                      <text
                        x="0"
                        y="-62"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="15"
                        fontWeight="bold"
                      >
                        💥 220+ Brand-New Craters Caught!
                      </text>

                      {/* Before Circle */}
                      <g transform="translate(-68, 2)">
                        <circle
                          cx="0"
                          cy="0"
                          r="40"
                          fill="#475569"
                          stroke="#94a3b8"
                          strokeWidth="2"
                        />
                        <text
                          x="0"
                          y="56"
                          textAnchor="middle"
                          fill="#cbd5e1"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          Before (Smooth Dust)
                        </text>
                      </g>

                      {/* After Circle with Fresh Starburst Crater */}
                      <g transform="translate(68, 2)">
                        <circle
                          cx="0"
                          cy="0"
                          r="40"
                          fill="#475569"
                          stroke="#fde047"
                          strokeWidth="2.5"
                        />
                        {/* Bright Ejecta Rays */}
                        <line x1="-26" y1="-26" x2="26" y2="26" stroke="#ffffff" strokeWidth="2.5" />
                        <line x1="26" y1="-26" x2="-26" y2="26" stroke="#ffffff" strokeWidth="2.5" />
                        <line x1="-32" y1="0" x2="32" y2="0" stroke="#ffffff" strokeWidth="2.5" />
                        <line x1="0" y1="-32" x2="0" y2="32" stroke="#ffffff" strokeWidth="2.5" />
                        <circle
                          cx="0"
                          cy="0"
                          r="12"
                          fill="#0f172a"
                          stroke="#fde047"
                          strokeWidth="3"
                        >
                          <animate
                            attributeName="r"
                            values="9;14;9"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <text
                          x="0"
                          y="56"
                          textAnchor="middle"
                          fill="#fde047"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          After: Fresh Crater!
                        </text>
                      </g>
                    </g>
                  </svg>
                </div>
              )}

              {/* SCENE 6: STILL ACTIVE TODAY — ARTEMIS III SCOUT & EARTHRISE */}
              {idx === 5 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/lro-orbiter.jpg"
                      alt="NASA Lunar Reconnaissance Orbiter operating in low polar orbit above the Moon"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4">
                      <span className="text-sm sm:text-base font-bold text-sky-300 block">
                        📸 Still Orbiting the Moon Every 2 Hours!
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200">
                        Scouting the 13 South Pole landing zones for NASA’s Artemis astronauts!
                      </span>
                    </div>
                  </div>

                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/60 bg-[#060814]">
                    <img
                      src="/images/missions/lro-earthrise.jpg"
                      alt="Real high-resolution NASA LRO photograph of Earth rising above the lunar horizon"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4">
                      <span className="text-sm sm:text-base font-bold text-amber-300 block">
                        📸 Real LRO Photo: Earthrise Over the Moon!
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200">
                        Captured by LRO’s camera looking back at our blue home planet from lunar orbit!
                      </span>
                    </div>
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
              <span>Finished LRO’s Story!</span>
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
