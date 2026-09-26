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

interface CuriosityScrollStoryProps {
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

const CURIOSITY_SCENES: StoryScene[] = [
  {
    id: 'launch',
    stepNumber: 1,
    shortLabel: '1. Launch (2011)',
    whenLabel: 'STEP 1 OF 6 • NOVEMBER 26, 2011 • FLORIDA',
    headline: 'Blastoff of the SUV-Sized Robot Chemist with a Nuclear Tail!',
    kidStory:
      'Weighing almost a ton (2,000 pounds!), Curiosity was way bigger than any Mars rover before it! Packed inside an Atlas V rocket, it blasted off from Florida on an 8-month voyage to Mars. Instead of solar panels that get covered in dust, Curiosity has a white nuclear battery tail (MMRTG) so it can work day, night, and through dust storms!',
    spokenNarration:
      'Step 1: Blastoff from Florida! On November 26, 2011, an SUV-sized robot chemist named Curiosity launched inside an Atlas V rocket. Powered by a nuclear tail battery instead of solar panels, it was built to work day and night on Mars!',
    kidTakeaway:
      '🔋 All-Weather Nuclear Tail: Curiosity’s warm plutonium battery generates 110 watts of steady electricity without needing sunlight!',
  },
  {
    id: 'skycrane',
    stepNumber: 2,
    shortLabel: '2. Sky Crane Landing',
    whenLabel: 'STEP 2 OF 6 • AUGUST 6, 2012 • GALE CRATER',
    headline: 'Too Heavy for Airbags: The First-Ever "Sky Crane" Jetpack!',
    kidStory:
      'Earlier smaller rovers bounced onto Mars inside giant airbags—but SUV-sized Curiosity was so heavy it would have popped any airbag! So NASA invented a wild new way to land: after a supersonic parachute slowed it down, an 8-rocket jetpack called the "Sky Crane" hovered in mid-air and lowered Curiosity gently onto Gale Crater on nylon ropes!',
    spokenNarration:
      'Step 2: The First Sky Crane Landing! Weighing almost a ton, Curiosity was way too heavy for landing airbags. So after opening a giant parachute, an eight-rocket jetpack called the Sky Crane hovered in mid-air and lowered Curiosity gently onto Gale Crater using nylon ropes!',
    kidTakeaway:
      '🚀 "Seven Minutes of Terror": The Sky Crane worked so well on Curiosity in 2012 that NASA used the exact same invention to land Perseverance 9 years later!',
  },
  {
    id: 'chemcam',
    stepNumber: 3,
    shortLabel: '3. 1 Million Laser Zaps',
    whenLabel: 'STEP 3 OF 6 • CHEMCAM FOREHEAD LASER',
    headline: 'Zapping Rocks Over 1,000,000 Times with a Forehead Laser!',
    kidStory:
      'Mounted right on top of Curiosity’s head is a real sci-fi laser called ChemCam! Whenever scientists spot an interesting rock up to 23 feet away, Curiosity fires a pinpoint infrared laser beam that vaporizes a tiny speck of rock into a glowing plasma spark—and its telescope reads the colors of the spark to tell what the rock is made of!',
    spokenNarration:
      'Step 3: One Million Laser Zaps! Curiosity has a real science-fiction laser on its forehead called ChemCam. It has zapped Martian rocks over one million times from up to 23 feet away, reading the glowing sparks to see what minerals are inside!',
    kidTakeaway:
      '⚡ Laser Milestone: Curiosity has fired over 1,000,000 laser zaps on Mars—saving days of driving by testing rocks from across the room!',
  },
  {
    id: 'drilling-sam',
    stepNumber: 4,
    shortLabel: '4. Belly Chemistry Lab',
    whenLabel: 'STEP 4 OF 6 • 40+ DRILLED ROCK HOLES • SAM LAB',
    headline: 'Drilling 40+ Rock Holes & Baking Powder in Its Belly Lab!',
    kidStory:
      'At the end of Curiosity’s 7-foot robotic arm is a rotary hammer drill! Curiosity has drilled over 40 holes into ancient Martian rocks, scooping the gray rock powder into 74 tiny ovens inside its belly chemistry lab (called SAM). Right away at Yellowknife Bay, SAM proved Gale Crater was once a calm, drinkable freshwater lake with all the chemical ingredients for life!',
    spokenNarration:
      'Step 4: Drilling Rocks and Baking Them in Its Belly Lab! Using the drill on its robotic arm, Curiosity has bored over 40 holes into Martian rocks! It drops the rock powder into a chemistry lab inside its tummy called SAM, proving Gale Crater was once a calm freshwater lake!',
    kidTakeaway:
      '🧪 Tummy Chemistry Classroom: By baking rock dust at 1,800°F inside its SAM belly ovens, Curiosity sniffed out carbon, hydrogen, oxygen, nitrogen, phosphorus, and sulfur!',
  },
  {
    id: 'morse-wheels',
    stepNumber: 5,
    shortLabel: '5. Morse Code Wheels',
    whenLabel: 'STEP 5 OF 6 • SECRET AGENT TIRE TRACKS',
    headline: 'Six Aluminum Wheels That Stamp "J-P-L" in Secret Morse Code!',
    kidStory:
      'Look closely at the tracks Curiosity leaves behind in the Martian sand! NASA engineers cut tiny pattern holes into Curiosity’s six 20-inch aluminum wheels that stamp "• - - -   • - - •   • - • •" right into the dirt with every turn—spelling "J-P-L" (Jet Propulsion Laboratory) in Morse code!',
    spokenNarration:
      'Step 5: Secret Morse Code Wheel Tracks! As Curiosity drives across Martian sand dunes, tiny holes inside its six aluminum wheels stamp the letters J, P, L in Morse code right into the dirt to help scientists measure how far it rolls!',
    kidTakeaway:
      '🕵️ Why Stamp Morse Code in Sand? Besides being a fun secret message, Curiosity’s cameras photograph the spacing between the Morse code stamps to measure if its wheels are slipping in soft sand!',
  },
  {
    id: 'mount-sharp-today',
    stepNumber: 6,
    shortLabel: '6. Today: Yellow Sulfur!',
    whenLabel: 'STEP 6 OF 6 • STILL ACTIVE ON MOUNT SHARP • 2024–TODAY',
    headline: 'Still Alive Today: Climbing Mount Sharp & Cracking Yellow Sulfur!',
    kidStory:
      'More than 13 years after landing, Curiosity is STILL ALIVE and climbing up 3-mile-tall Mount Sharp in the middle of Gale Crater! In 2024, while driving through an ancient water channel called Gediz Vallis, Curiosity’s heavy wheel accidentally rolled over a brittle rock and cracked it open—revealing dazzling pure yellow sulfur crystals never seen before on Mars!',
    spokenNarration:
      'Step 6: Still Alive Today and Crushing Pure Yellow Sulfur Rocks! Curiosity is still driving strong up three-mile-tall Mount Sharp! In 2024, its heavy wheel rolled over a brittle rock and cracked it open, revealing dazzling pure yellow sulfur crystals never seen before on Mars!',
    kidTakeaway:
      '💎 Accidental Treasure: Scientists thought the pale stones were ordinary mudrocks until Curiosity’s 2,000-pound wheel crushed one open to reveal glittering yellow crystals!',
  },
];

export const CuriosityScrollStory: React.FC<CuriosityScrollStoryProps> = ({
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
    const scene = CURIOSITY_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `curiosity-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < CURIOSITY_SCENES.length) {
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
              🔬 Meet Mars’s SUV-Sized Robot Chemist
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How Curiosity Explores Gale Crater &amp; Mount Sharp (2011 – Today!)
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
          {CURIOSITY_SCENES.map((sc, idx) => {
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
        {CURIOSITY_SCENES.map((scene, idx) => {
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

              {/* SCENE 1: LAUNCH + REAL NASA PHOTOS */}
              {idx === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/curiosity-launch.jpg"
                        alt="Real NASA photo of Mars Science Laboratory Curiosity atop its Atlas V rocket in Florida"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                          📸 Real Photo: Atlas V Rocket
                        </span>
                        <span className="text-xs text-slate-200">
                          Curiosity packed inside the nose cone in Florida (Nov 2011)
                        </span>
                      </div>
                    </div>

                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/curiosity-cleanroom.jpg"
                        alt="Real NASA photo of SUV-sized Curiosity Rover during testing in the NASA cleanroom"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                          📸 Real Photo: SUV-Sized Rover!
                        </span>
                        <span className="text-xs text-slate-200">
                          Look how big Curiosity is next to NASA engineers!
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Animated Diagram: Nuclear Tail Battery Powering Curiosity to Mars */}
                  <div className="lg:col-span-5 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex flex-col justify-between min-h-[16rem]">
                    <span className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wider block text-center">
                      🎬 Live Animation: Nuclear Tail Power!
                    </span>
                    <svg
                      viewBox="0 0 360 190"
                      className="w-full h-44 overflow-visible my-auto"
                    >
                      <circle cx="42" cy="145" r="24" fill="#0284c7" />
                      <circle cx="36" cy="138" r="10" fill="#34d399" />
                      <text
                        x="42"
                        y="182"
                        textAnchor="middle"
                        fill="#bae6fd"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        Earth (2011)
                      </text>

                      <circle cx="318" cy="52" r="26" fill="#ea580c" />
                      <text
                        x="318"
                        y="94"
                        textAnchor="middle"
                        fill="#fdba74"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        Mars (2012)
                      </text>

                      <path
                        d="M 72 135 Q 180 55 282 55"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                        strokeDasharray="7 7"
                      />

                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="-18,12; 22,-10; -18,12"
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                        <g transform="translate(180, 78)">
                          <polygon
                            points="-26,0 18,-18 18,18"
                            fill="#f8fafc"
                            stroke="#38bdf8"
                            strokeWidth="2.5"
                          />
                          <polygon
                            points="-42,0 -26,-9 -26,9"
                            fill="#fde047"
                          />
                          <text
                            x="0"
                            y="-26"
                            textAnchor="middle"
                            fill="#fde047"
                            fontSize="13"
                            fontWeight="bold"
                          >
                            🚀 2,000-lb Curiosity!
                          </text>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 2: FIRST-EVER SKY CRANE JETPACK LANDING */}
              {idx === 1 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 250"
                    className="w-full h-60 overflow-visible"
                  >
                    <rect
                      x="10"
                      y="202"
                      width="660"
                      height="40"
                      rx="8"
                      fill="#9a3412"
                    />
                    <text
                      x="340"
                      y="227"
                      textAnchor="middle"
                      fill="#ffedd5"
                      fontSize="15"
                      fontWeight="bold"
                    >
                      Gale Crater — Ancient Lakebed at the Foot of 3-Mile-Tall Mount Sharp!
                    </text>

                    {/* Left: Why No Airbags? */}
                    <g transform="translate(165, 105)">
                      <rect
                        x="-125"
                        y="-62"
                        width="250"
                        height="124"
                        rx="16"
                        fill="#0b132e"
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />
                      <text
                        x="0"
                        y="-30"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="15"
                        fontWeight="bold"
                      >
                        ⚖️ Why No Bouncing Airbags?
                      </text>
                      <text
                        x="0"
                        y="-4"
                        textAnchor="middle"
                        fill="#f8fafc"
                        fontSize="13"
                      >
                        Curiosity weighed 2,000 lbs
                      </text>
                      <text
                        x="0"
                        y="18"
                        textAnchor="middle"
                        fill="#f8fafc"
                        fontSize="13"
                      >
                        (as heavy as a Mini Cooper SUV!)
                      </text>
                      <text
                        x="0"
                        y="42"
                        textAnchor="middle"
                        fill="#34d399"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        Airbags would have POPPED!
                      </text>
                    </g>

                    {/* Right: Animated Sky Crane Hovering & Lowering Curiosity on 3 Nylon Ropes */}
                    <g transform="translate(485, 36)">
                      <polygon
                        points="-60,14 -98,74 -46,64"
                        fill="#fde047"
                        opacity="0.85"
                      />
                      <polygon
                        points="60,14 98,74 46,64"
                        fill="#fde047"
                        opacity="0.85"
                      />
                      <rect
                        x="-72"
                        y="-12"
                        width="144"
                        height="28"
                        rx="8"
                        fill="#f59e0b"
                        stroke="#fef08a"
                        strokeWidth="2"
                      />
                      <text
                        x="0"
                        y="6"
                        textAnchor="middle"
                        fill="#060814"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        8-ROCKET SKY CRANE
                      </text>

                      <line
                        x1="-34"
                        y1="16"
                        x2="-30"
                        y2="108"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <line
                        x1="0"
                        y1="16"
                        x2="0"
                        y2="108"
                        stroke="#fde047"
                        strokeWidth="3"
                      />
                      <line
                        x1="34"
                        y1="16"
                        x2="30"
                        y2="108"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />

                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="0,80; 0,112; 0,80"
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                        {/* Finned White MMRTG Nuclear Tail */}
                        <rect
                          x="-66"
                          y="-6"
                          width="22"
                          height="18"
                          rx="3"
                          fill="#e2e8f0"
                          stroke="#38bdf8"
                          strokeWidth="2"
                        />
                        <rect
                          x="-48"
                          y="0"
                          width="96"
                          height="26"
                          rx="6"
                          fill="#f8fafc"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                        />
                        <text
                          x="0"
                          y="17"
                          textAnchor="middle"
                          fill="#0f172a"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          CURIOSITY
                        </text>
                        <circle
                          cx="-34"
                          cy="34"
                          r="9"
                          fill="#1e293b"
                          stroke="#cbd5e1"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="0"
                          cy="34"
                          r="9"
                          fill="#1e293b"
                          stroke="#cbd5e1"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="34"
                          cy="34"
                          r="9"
                          fill="#1e293b"
                          stroke="#cbd5e1"
                          strokeWidth="2.5"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              )}

              {/* SCENE 3: CHEMCAM 1,000,000+ LASER ZAPS */}
              {idx === 2 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 240"
                    className="w-full h-56 overflow-visible"
                  >
                    <rect
                      x="10"
                      y="194"
                      width="660"
                      height="38"
                      rx="8"
                      fill="#9a3412"
                    />

                    <g transform="translate(195, 138)">
                      {/* White Finned Nuclear Battery Tail on Back */}
                      <rect
                        x="-92"
                        y="-12"
                        width="28"
                        height="24"
                        rx="4"
                        fill="#f8fafc"
                        stroke="#fbbf24"
                        strokeWidth="2"
                      />
                      <text
                        x="-78"
                        y="-18"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        🔋 Nuclear Tail
                      </text>

                      {/* Camera Mast & Cyclops ChemCam Eye */}
                      <rect
                        x="32"
                        y="-42"
                        width="9"
                        height="42"
                        fill="#e2e8f0"
                      />
                      <rect
                        x="18"
                        y="-58"
                        width="34"
                        height="18"
                        rx="4"
                        fill="#f8fafc"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                      <circle cx="38" cy="-49" r="6" fill="#ef4444" />

                      {/* Pulsing Laser Beam Zapping Martian Rock */}
                      <line
                        x1="52"
                        y1="-49"
                        x2="285"
                        y2="24"
                        stroke="#ef4444"
                        strokeWidth="4.5"
                        strokeDasharray="10 5"
                      >
                        <animate
                          attributeName="opacity"
                          values="1;0.25;1"
                          dur="0.45s"
                          repeatCount="indefinite"
                        />
                      </line>

                      {/* Glowing Plasma Spark on Target Rock */}
                      <circle cx="285" cy="24" r="14" fill="#fde047">
                        <animate
                          attributeName="r"
                          values="8;16;8"
                          dur="0.45s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <text
                        x="175"
                        y="-32"
                        textAnchor="middle"
                        fill="#fca5a5"
                        fontSize="15"
                        fontWeight="bold"
                      >
                        ⚡ ChemCam Laser: 1,000,000+ Rock Zaps!
                      </text>

                      {/* Rover Body */}
                      <rect
                        x="-68"
                        y="0"
                        width="136"
                        height="34"
                        rx="6"
                        fill="#f8fafc"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <text
                        x="0"
                        y="22"
                        textAnchor="middle"
                        fill="#0f172a"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        CURIOSITY ROVER
                      </text>

                      {/* Target Rock */}
                      <path
                        d="M 245 56 Q 290 2 335 56 Z"
                        fill="#78350f"
                        stroke="#fb923c"
                        strokeWidth="2.5"
                      />
                      <text
                        x="290"
                        y="-8"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        💥 Glowing Spark Shows Minerals!
                      </text>

                      <circle
                        cx="-46"
                        cy="44"
                        r="11"
                        fill="#1e293b"
                        stroke="#cbd5e1"
                        strokeWidth="2.5"
                      />
                      <circle
                        cx="0"
                        cy="44"
                        r="11"
                        fill="#1e293b"
                        stroke="#cbd5e1"
                        strokeWidth="2.5"
                      />
                      <circle
                        cx="46"
                        cy="44"
                        r="11"
                        fill="#1e293b"
                        stroke="#cbd5e1"
                        strokeWidth="2.5"
                      />
                    </g>
                  </svg>
                </div>
              )}

              {/* SCENE 4: 40+ DRILLED ROCK HOLES & SAM BELLY CHEMISTRY LAB */}
              {idx === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-6 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/curiosity-drill-holes.jpg"
                      alt="Real NASA collage showing 42 rock holes drilled by Curiosity Rover across Gale Crater on Mars"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Real NASA Photo: 42 Drilled Rock Holes on Mars!
                      </span>
                      <span className="text-xs text-slate-200">
                        Every hole is where Curiosity drilled ancient Martian lake rock to taste its chemistry!
                      </span>
                    </div>
                  </div>

                  {/* Animated SAM Belly Chemistry Oven */}
                  <div className="lg:col-span-6 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex items-center justify-center">
                    <svg
                      viewBox="0 0 420 220"
                      className="w-full h-56 overflow-visible"
                    >
                      <rect
                        x="15"
                        y="16"
                        width="390"
                        height="188"
                        rx="16"
                        fill="#0b132e"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <text
                        x="210"
                        y="44"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="15"
                        fontWeight="bold"
                      >
                        🧪 Inside Curiosity’s &ldquo;SAM&rdquo; Belly Chemistry Lab
                      </text>

                      {/* 3 Glowing Sample Cups Baking Rock Powder */}
                      {[95, 210, 325].map((cx, i) => (
                        <g key={i} transform={`translate(${cx}, 122)`}>
                          <rect
                            x="-26"
                            y="-24"
                            width="52"
                            height="54"
                            rx="6"
                            fill="#ea580c"
                            stroke="#fde047"
                            strokeWidth="2"
                          >
                            <animate
                              attributeName="fill"
                              values="#ea580c;#f59e0b;#ea580c"
                              dur="1.8s"
                              repeatCount="indefinite"
                            />
                          </rect>
                          <text
                            x="0"
                            y="6"
                            textAnchor="middle"
                            fill="#060814"
                            fontSize="11"
                            fontWeight="bold"
                          >
                            1,800°F
                          </text>
                          <text
                            x="0"
                            y="-34"
                            textAnchor="middle"
                            fill="#34d399"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            {i === 0 ? 'Carbon' : i === 1 ? 'Water' : 'Sulfur'}
                          </text>
                        </g>
                      ))}

                      <text
                        x="210"
                        y="184"
                        textAnchor="middle"
                        fill="#7dd3fc"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        🌊 Proved Gale Crater Was a Calm Freshwater Lake!
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 5: SECRET MORSE CODE WHEEL TRACKS */}
              {idx === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-6 relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/curiosity-tracks.jpg"
                      alt="Real NASA photo of Curiosity Rover wheel tracks stamped into Martian sand dunes"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                        📸 Real Photo: Curiosity’s Wheel Tracks on Mars!
                      </span>
                      <span className="text-xs text-slate-200">
                        Each wheel turn stamps secret Morse code letters into the sand!
                      </span>
                    </div>
                  </div>

                  {/* Animated Morse Code Stamp Track Diagram */}
                  <div className="lg:col-span-6 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex items-center justify-center">
                    <svg
                      viewBox="0 0 420 210"
                      className="w-full h-52 overflow-visible"
                    >
                      <rect
                        x="15"
                        y="18"
                        width="390"
                        height="174"
                        rx="16"
                        fill="#7c2d12"
                        stroke="#fb923c"
                        strokeWidth="2.5"
                      />
                      <text
                        x="210"
                        y="48"
                        textAnchor="middle"
                        fill="#fef08a"
                        fontSize="15"
                        fontWeight="bold"
                      >
                        🕵️ Secret Morse Code Stamped in Martian Sand:
                      </text>

                      {/* J: . - - - */}
                      <g transform="translate(85, 112)">
                        <rect
                          x="-48"
                          y="-28"
                          width="96"
                          height="56"
                          rx="10"
                          fill="#431407"
                          stroke="#fde047"
                          strokeWidth="2"
                        />
                        <text
                          x="0"
                          y="-4"
                          textAnchor="middle"
                          fill="#fde047"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          • — — —
                        </text>
                        <text
                          x="0"
                          y="18"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          Letter &ldquo;J&rdquo;
                        </text>
                      </g>

                      {/* P: . - - . */}
                      <g transform="translate(210, 112)">
                        <rect
                          x="-48"
                          y="-28"
                          width="96"
                          height="56"
                          rx="10"
                          fill="#431407"
                          stroke="#fde047"
                          strokeWidth="2"
                        />
                        <text
                          x="0"
                          y="-4"
                          textAnchor="middle"
                          fill="#fde047"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          • — — •
                        </text>
                        <text
                          x="0"
                          y="18"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          Letter &ldquo;P&rdquo;
                        </text>
                      </g>

                      {/* L: . - . . */}
                      <g transform="translate(335, 112)">
                        <rect
                          x="-48"
                          y="-28"
                          width="96"
                          height="56"
                          rx="10"
                          fill="#431407"
                          stroke="#fde047"
                          strokeWidth="2"
                        />
                        <text
                          x="0"
                          y="-4"
                          textAnchor="middle"
                          fill="#fde047"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          • — • •
                        </text>
                        <text
                          x="0"
                          y="18"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          Letter &ldquo;L&rdquo;
                        </text>
                      </g>

                      <text
                        x="210"
                        y="172"
                        textAnchor="middle"
                        fill="#fed7aa"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        Spells &ldquo;JPL&rdquo; (Jet Propulsion Laboratory) on Every Drive!
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 6: TODAY ON MOUNT SHARP & PURE YELLOW SULFUR CRYSTALS */}
              {idx === 5 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/curiosity-rover.jpg"
                      alt="Real NASA self-portrait of Curiosity Rover on Mount Sharp in Gale Crater"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4">
                      <span className="text-sm sm:text-base font-bold text-sky-300 block">
                        📸 Real Selfie on Mount Sharp!
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200">
                        Still driving strong today—more than 2,600 feet up Mount Sharp!
                      </span>
                    </div>
                  </div>

                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/60 bg-[#060814]">
                    <img
                      src="/images/missions/curiosity-sulfur.jpg"
                      alt="Real NASA photo of pure yellow sulfur stones discovered when Curiosity's wheel crushed a rock in Gediz Vallis channel"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4">
                      <span className="text-sm sm:text-base font-bold text-amber-300 block">
                        📸 Real Photo: Pure Yellow Sulfur Stones!
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200">
                        Crushed open by Curiosity’s heavy wheel in Gediz Vallis channel!
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
              <span>Finished Curiosity’s Story!</span>
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
