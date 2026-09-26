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

interface PerseveranceScrollStoryProps {
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

const PERSEVERANCE_SCENES: StoryScene[] = [
  {
    id: 'launch',
    stepNumber: 1,
    shortLabel: '1. Launch (2020)',
    whenLabel: 'STEP 1 OF 6 • JULY 30, 2020 • FLORIDA',
    headline: 'Blastoff from Florida with Helicopter Buddy "Ginny"!',
    kidStory:
      'Nicknamed "Percy," this car-sized, 6-wheeled robot explorer folded up inside the nose cone of an Atlas V rocket and blasted off from Florida! Strapped right under Percy’s belly was a tiny, tissue-box-sized helicopter buddy named Ingenuity ("Ginny")!',
    spokenNarration:
      'Step 1: Blastoff from Florida! Nicknamed Percy, this six-wheeled Mars rover launched inside a giant rocket. Tucked right under Percy’s belly was a tiny helicopter buddy named Ginny!',
    kidTakeaway:
      '💡 Big Idea: Percy’s mission was to travel 300 million miles to Mars and search an ancient dried-up lake for clues of past alien microbe life!',
  },
  {
    id: 'parachute-skycrane',
    stepNumber: 2,
    shortLabel: '2. Sky Crane Landing',
    whenLabel: 'STEP 2 OF 6 • FEBRUARY 18, 2021 • JEZERO CRATER',
    headline: 'Giant Secret-Code Parachute & Flying "Sky Crane" Jetpack!',
    kidStory:
      'Slamming into Mars’s sky at 12,000 mph, Percy popped open a giant 70-foot red-and-white parachute! Then, 1.3 miles above the ground, the parachute let go and an 8-rocket jetpack called the "Sky Crane" hovered in mid-air—lowering Percy gently onto the dirt on three 21-foot ropes!',
    spokenNarration:
      'Step 2: Sky Crane landing! After opening a giant red-and-white parachute with a secret message, a flying rocket jetpack called the Sky Crane hovered in mid-air and lowered Percy gently onto Mars using three long ropes!',
    kidTakeaway:
      '🔍 Secret Parachute Code: NASA hid a puzzle in the red-and-white parachute stripes that spells "DARE MIGHTY THINGS"!',
  },
  {
    id: 'ingenuity',
    stepNumber: 3,
    shortLabel: '3. Ginny’s 72 Flights',
    whenLabel: 'STEP 3 OF 6 • 2021–2024 • FIRST AIRCRAFT ON ANOTHER PLANET',
    headline: 'Helicopter Buddy "Ginny" Flies 72 Times in Thin Mars Air!',
    kidStory:
      'Percy dropped its belly shield and set tiny helicopter Ingenuity ("Ginny") onto the red dirt. Spinning its twin blades at 2,500 RPM, Ginny became the first aircraft ever to fly on another planet! Built for just 5 test flights, Ginny flew 72 times to scout rocky paths ahead for Percy!',
    spokenNarration:
      'Step 3: Ginny’s 72 flights! Percy placed tiny helicopter Ginny onto the Martian dirt. Ginny spun her blades super fast and became the first aircraft ever to fly on another planet, flying 72 times before a blade tip clipped a sand dune!',
    kidTakeaway:
      '🚁 How Ginny’s Flights Ended: On Flight 72 (Jan 2024), a blade tip clipped a steep sand dune—so Ginny now rests on Mars as a stationary weather station!',
  },
  {
    id: 'laser-oxygen',
    stepNumber: 4,
    shortLabel: '4. Lasers & Oxygen',
    whenLabel: 'STEP 4 OF 6 • 2021–2023 • SUPER-SCIENCE TOOLS',
    headline: 'Zapping Rocks with a Red Laser & Making Breathable Oxygen!',
    kidStory:
      'Driving across the ancient lakebed, Percy fires a red laser from its head ("SuperCam") to zap rocks up to 20 feet away and see what minerals they are made of! Inside Percy’s belly, a golden toaster-sized box called MOXIE sucked in Mars’s carbon-dioxide air and turned it into real breathable oxygen!',
    spokenNarration:
      'Step 4: Lasers and Oxygen! Percy zaps Martian rocks with a red laser from its head to study them. And inside Percy’s belly, a golden box called MOXIE turned Mars’s air into real breathable oxygen for future astronauts!',
    kidTakeaway:
      '🫁 Future Astronaut Lifeline: MOXIE made 122 grams of pure oxygen—proving future astronauts can make their own air and rocket fuel on Mars!',
  },
  {
    id: 'tubes-leopard',
    stepNumber: 5,
    shortLabel: '5. Titanium Tubes',
    whenLabel: 'STEP 5 OF 6 • JULY 2024 • "LEOPARD SPOTS" DISCOVERY',
    headline: 'Sealing Shiny Titanium Tubes & Finding "Leopard Spot" Clues!',
    kidStory:
      'Percy drills chalk-sized rock cores and seals them inside shiny titanium tubes for future astronauts to bring back to Earth! In July 2024, Percy drilled a red mudstone rock named "Cheyava Falls" covered in tiny black-and-white "leopard spots"—the strongest clue yet of ancient Martian microbe life!',
    spokenNarration:
      'Step 5: Titanium tubes and leopard spots! Percy drills rock cores and seals them inside shiny titanium tubes to bring back to Earth. In 2024, Percy found a rock covered in tiny leopard spots, a big clue that ancient microscopic life may have lived on Mars!',
    kidTakeaway:
      '🦠 Why Leopard Spots Matter: On Earth, those exact spots form when microscopic life uses chemical energy in wet mud billions of years ago!',
  },
  {
    id: 'today',
    stepNumber: 6,
    shortLabel: '6. Where Percy Is Today',
    whenLabel: 'STEP 6 OF 6 • LATEST UPDATE • STILL ALIVE & CLIMBING!',
    headline: 'Still Alive Today: Climbing 1,600 Feet Up the Crater Wall!',
    kidStory:
      'Unlike solar rovers that lose power in Martian dust, Percy runs on a nuclear plutonium battery that works day and night! Having driven over 20 miles, Percy is STILL ALIVE today and just climbed 1,600 feet up the steep wall of Jezero Crater to explore 4-billion-year-old rocks at "Witch Hazel Hill"!',
    spokenNarration:
      'Step 6: Where Percy is today! Powered by its nuclear battery, Perseverance is still alive and driving on Mars right now! It recently climbed one thousand six hundred feet up the steep crater wall to explore ancient Martian rocks!',
    kidTakeaway:
      '📡 Live Status on Mars: Percy has sealed 28+ titanium sample tubes and is still exploring high on the crater rim right now!',
  },
];

export const PerseveranceScrollStory: React.FC<PerseveranceScrollStoryProps> = ({
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

  // Stop speech when unmounting
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
    const scene = PERSEVERANCE_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `perseverance-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < PERSEVERANCE_SCENES.length) {
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
              🤖 Meet &ldquo;Percy&rdquo; &amp; Helicopter Buddy &ldquo;Ginny&rdquo;
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How Perseverance Explores Mars (2020 – Still Active Today!)
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
          {PERSEVERANCE_SCENES.map((sc, idx) => {
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
        {PERSEVERANCE_SCENES.map((scene, idx) => {
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

              {/* Large, Razor-Sharp Headline & Story */}
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

              {/* SCENE 1: REAL LAUNCH PHOTOS + ROCKET TO MARS ANIMATION */}
              {idx === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/perseverance-liftoff.jpg"
                        alt="Real NASA photo of Atlas V rocket launching Perseverance Rover in Florida"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                          📸 Real NASA Photo: Liftoff!
                        </span>
                        <span className="text-xs text-slate-200">
                          Atlas V rocket blasting off from Florida (July 30, 2020)
                        </span>
                      </div>
                    </div>

                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/perseverance-launch-prep.jpg"
                        alt="Real NASA photo of Perseverance Rover packed inside rocket nose cone"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                          📸 Real Photo: Packed in Nose Cone
                        </span>
                        <span className="text-xs text-slate-200">
                          Percy folded up with Ginny strapped underneath!
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Animated Space Cruise from Earth to Mars */}
                  <div className="lg:col-span-5 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex flex-col justify-between min-h-[16rem]">
                    <span className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wider block text-center">
                      🎬 Live Animation: 7-Month Trip to Mars!
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
                        Earth
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
                        Mars
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
                            🚀 Percy + Ginny Inside!
                          </text>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 2: PARACHUTE + FLYING SKY CRANE JETPACK LANDING */}
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
                      Jezero Crater — Ancient 3.5-Billion-Year-Old Martian Lakebed
                    </text>

                    <g transform="translate(165, 62)">
                      <path
                        d="M -76 0 C -76 -62, 76 -62, 76 0 Z"
                        fill="#ef4444"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <path
                        d="M -42 -2 L -18 -44 L -2 -44 L -14 -2 Z"
                        fill="#ffffff"
                      />
                      <path
                        d="M 14 -2 L 2 -44 L 20 -44 L 42 -2 Z"
                        fill="#ffffff"
                      />
                      <line
                        x1="-64"
                        y1="0"
                        x2="-18"
                        y2="66"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                      />
                      <line
                        x1="64"
                        y1="0"
                        x2="18"
                        y2="66"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                      />
                      <polygon
                        points="-26,66 26,66 34,90 -34,90"
                        fill="#f8fafc"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <text
                        x="0"
                        y="115"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        1. 70-Foot Parachute Opens!
                      </text>
                      <text
                        x="0"
                        y="134"
                        textAnchor="middle"
                        fill="#fed7aa"
                        fontSize="12"
                      >
                        Code: &ldquo;DARE MIGHTY THINGS&rdquo;
                      </text>
                    </g>

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
                        x="-68"
                        y="-12"
                        width="136"
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
                        2. SKY CRANE JETPACK
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
                          values="0,82; 0,112; 0,82"
                          dur="2.8s"
                          repeatCount="indefinite"
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
                          PERCY ROVER
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

              {/* SCENE 3: INGENUITY ("GINNY") FLIES 72 TIMES */}
              {idx === 2 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 240"
                    className="w-full h-56 overflow-visible"
                  >
                    <path
                      d="M 10 195 Q 180 180 350 192 T 670 184 L 670 232 L 10 232 Z"
                      fill="#9a3412"
                    />

                    <g transform="translate(135, 152)">
                      <rect
                        x="22"
                        y="-28"
                        width="7"
                        height="28"
                        fill="#e2e8f0"
                      />
                      <rect
                        x="14"
                        y="-38"
                        width="22"
                        height="12"
                        rx="3"
                        fill="#38bdf8"
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
                      <circle
                        cx="-34"
                        cy="34"
                        r="9.5"
                        fill="#1e293b"
                        stroke="#cbd5e1"
                        strokeWidth="2.5"
                      />
                      <circle
                        cx="0"
                        cy="34"
                        r="9.5"
                        fill="#1e293b"
                        stroke="#cbd5e1"
                        strokeWidth="2.5"
                      />
                      <circle
                        cx="34"
                        cy="34"
                        r="9.5"
                        fill="#1e293b"
                        stroke="#cbd5e1"
                        strokeWidth="2.5"
                      />
                      <text
                        x="0"
                        y="60"
                        textAnchor="middle"
                        fill="#bae6fd"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        Percy Filming Ginny’s Flights
                      </text>
                    </g>

                    <g transform="translate(425, 88)">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="425,105; 425,58; 425,105"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                      <ellipse
                        cx="0"
                        cy="-22"
                        rx="64"
                        ry="6"
                        fill="#38bdf8"
                        opacity="0.85"
                      />
                      <ellipse
                        cx="0"
                        cy="-14"
                        rx="64"
                        ry="6"
                        fill="#7dd3fc"
                        opacity="0.85"
                      />
                      <rect
                        x="-3"
                        y="-28"
                        width="6"
                        height="28"
                        fill="#cbd5e1"
                      />
                      <rect
                        x="-18"
                        y="0"
                        width="36"
                        height="26"
                        rx="5"
                        fill="#fbbf24"
                        stroke="#fef08a"
                        strokeWidth="2"
                      />
                      <line
                        x1="-14"
                        y1="24"
                        x2="-34"
                        y2="46"
                        stroke="#e2e8f0"
                        strokeWidth="2.5"
                      />
                      <line
                        x1="14"
                        y1="24"
                        x2="34"
                        y2="46"
                        stroke="#e2e8f0"
                        strokeWidth="2.5"
                      />
                      <text
                        x="0"
                        y="-38"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="15"
                        fontWeight="bold"
                      >
                        🚁 Ingenuity (&ldquo;Ginny&rdquo;) — Flew 72 Times!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* SCENE 4: RED LASER ZAPPING & MAKING OXYGEN WITH MOXIE */}
              {idx === 3 && (
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

                    <g transform="translate(215, 138)">
                      <rect
                        x="32"
                        y="-36"
                        width="8"
                        height="36"
                        fill="#e2e8f0"
                      />
                      <rect
                        x="22"
                        y="-48"
                        width="26"
                        height="14"
                        rx="3"
                        fill="#38bdf8"
                      />

                      <line
                        x1="48"
                        y1="-41"
                        x2="215"
                        y2="28"
                        stroke="#ef4444"
                        strokeWidth="4"
                        strokeDasharray="8 4"
                      >
                        <animate
                          attributeName="opacity"
                          values="1;0.3;1"
                          dur="0.6s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <circle cx="215" cy="28" r="11" fill="#f97316" />
                      <text
                        x="145"
                        y="-22"
                        textAnchor="middle"
                        fill="#fca5a5"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        ⚡ SuperCam Red Laser Zap!
                      </text>

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
                      <rect
                        x="-52"
                        y="5"
                        width="74"
                        height="24"
                        rx="4"
                        fill="#f59e0b"
                        stroke="#fef08a"
                        strokeWidth="2"
                      />
                      <text
                        x="-15"
                        y="21"
                        textAnchor="middle"
                        fill="#060814"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        MOXIE O₂
                      </text>

                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="0,0; 0,-28; 0,0"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                        <circle
                          cx="-35"
                          cy="-18"
                          r="12"
                          fill="#0284c7"
                          stroke="#7dd3fc"
                          strokeWidth="2"
                        />
                        <text
                          x="-35"
                          y="-14"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          O₂
                        </text>
                        <circle
                          cx="-5"
                          cy="-28"
                          r="12"
                          fill="#0284c7"
                          stroke="#7dd3fc"
                          strokeWidth="2"
                        />
                        <text
                          x="-5"
                          y="-24"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          O₂
                        </text>
                      </g>

                      <text
                        x="-20"
                        y="-58"
                        textAnchor="middle"
                        fill="#7dd3fc"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        🫁 Made 122g of Breathable Oxygen!
                      </text>

                      <path
                        d="M 185 56 Q 220 12 255 56 Z"
                        fill="#78350f"
                        stroke="#fb923c"
                        strokeWidth="2.5"
                      />

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

              {/* SCENE 5: SHINY TITANIUM TUBES & LEOPARD SPOTS ROCK */}
              {idx === 4 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 235"
                    className="w-full h-56 overflow-visible"
                  >
                    <g transform="translate(175, 118)">
                      <rect
                        x="-145"
                        y="-92"
                        width="290"
                        height="184"
                        rx="16"
                        fill="#0b132e"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <text
                        x="0"
                        y="-62"
                        textAnchor="middle"
                        fill="#7dd3fc"
                        fontSize="15"
                        fontWeight="bold"
                      >
                        ✨ 28+ Shiny Titanium Tubes Sealed
                      </text>

                      {[-28, 8, 44].map((ry, i) => (
                        <g key={i} transform={`translate(0, ${ry})`}>
                          <rect
                            x="-75"
                            y="-10"
                            width="105"
                            height="20"
                            rx="5"
                            fill="#f8fafc"
                            stroke="#cbd5e1"
                            strokeWidth="2"
                          />
                          <rect
                            x="30"
                            y="-11"
                            width="42"
                            height="22"
                            rx="4"
                            fill="#fbbf24"
                          />
                        </g>
                      ))}
                    </g>

                    <g transform="translate(505, 118)">
                      <rect
                        x="-145"
                        y="-92"
                        width="290"
                        height="184"
                        rx="16"
                        fill="#1c1118"
                        stroke="#fb923c"
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
                        🦠 &ldquo;Cheyava Falls&rdquo; Leopard Spots!
                      </text>

                      <path
                        d="M -95 45 Q -65 -38 12 -42 Q 88 -35 102 45 Z"
                        fill="#9a3412"
                        stroke="#fdba74"
                        strokeWidth="2.5"
                      />
                      {[
                        [-38, -5],
                        [0, -14],
                        [38, -2],
                        [-18, 20],
                        [24, 22],
                      ].map(([sx, sy], i) => (
                        <circle
                          key={i}
                          cx={sx}
                          cy={sy}
                          r="9"
                          fill="#fef08a"
                          stroke="#060814"
                          strokeWidth="3.5"
                        />
                      ))}

                      <text
                        x="0"
                        y="72"
                        textAnchor="middle"
                        fill="#34d399"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        Clue of Ancient Martian Microbes!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* SCENE 6: WHERE PERCY IS TODAY — CLIMBING THE CRATER WALL */}
              {idx === 5 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 240"
                    className="w-full h-56 overflow-visible"
                  >
                    <path
                      d="M 15 215 L 180 205 L 540 58 L 665 58 L 665 228 L 15 228 Z"
                      fill="#7c2d12"
                      stroke="#fb923c"
                      strokeWidth="3"
                    />
                    <path
                      d="M 45 202 Q 250 175 515 55"
                      fill="none"
                      stroke="#fde047"
                      strokeWidth="3.5"
                      strokeDasharray="8 6"
                    />

                    <g>
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="260,138; 390,84; 260,138"
                        dur="3.6s"
                        repeatCount="indefinite"
                      />
                      <g transform="rotate(-22)">
                        <rect
                          x="-44"
                          y="-26"
                          width="88"
                          height="24"
                          rx="5"
                          fill="#f8fafc"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                        />
                        <text
                          x="0"
                          y="-10"
                          textAnchor="middle"
                          fill="#0f172a"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          PERCY
                        </text>
                        <circle
                          cx="-30"
                          cy="4"
                          r="9"
                          fill="#1e293b"
                          stroke="#fde047"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="0"
                          cy="4"
                          r="9"
                          fill="#1e293b"
                          stroke="#fde047"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="30"
                          cy="4"
                          r="9"
                          fill="#1e293b"
                          stroke="#fde047"
                          strokeWidth="2.5"
                        />
                      </g>
                    </g>

                    <text
                      x="185"
                      y="58"
                      textAnchor="middle"
                      fill="#34d399"
                      fontSize="16"
                      fontWeight="bold"
                    >
                      📡 STILL ALIVE &amp; DRIVING TODAY!
                    </text>
                    <text
                      x="185"
                      y="82"
                      textAnchor="middle"
                      fill="#bae6fd"
                      fontSize="14"
                    >
                      Climbed 1,600 Feet Up the Crater Rim!
                    </text>
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
              <span>Finished Perseverance’s Story!</span>
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
