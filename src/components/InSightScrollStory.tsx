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

interface InSightScrollStoryProps {
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

const INSIGHT_SCENES: StoryScene[] = [
  {
    id: 'launch',
    stepNumber: 1,
    shortLabel: '1. Launch (2018)',
    whenLabel: 'STEP 1 OF 6 • MAY 5, 2018 • CALIFORNIA',
    headline: 'Rocket Blastoff with Two Helper Twins ("Wall-E" & "Eva")!',
    kidStory:
      'InSight was a robot "planet doctor" built to check Mars’s heartbeat! It blasted off from California inside an Atlas V rocket. Right behind it flew two briefcase-sized helper satellites nicknamed "Wall-E" and "Eva" to watch over InSight all the way to Mars!',
    spokenNarration:
      'Step 1: Blastoff from California! InSight was a robot planet doctor built to check the heartbeat of Mars. It launched inside a giant rocket, followed by two tiny helper satellites nicknamed Wall-E and Eva!',
    kidTakeaway:
      '💡 Big Idea: InSight didn’t have wheels like a rover—its job was to sit super still in one spot and listen deep inside Mars!',
  },
  {
    id: 'landing',
    stepNumber: 2,
    shortLabel: '2. Landing on Mars',
    whenLabel: 'STEP 2 OF 6 • NOVEMBER 26, 2018 • ELYSIUM PLANITIA',
    headline: 'Touchdown on the Flattest "Parking Lot" on Mars!',
    kidStory:
      'After cruising 300 million miles through space, InSight dropped its parachute and fired 12 rocket thrusters under its belly! It landed gently on 3 shock-absorbing legs on the flattest, quietest plain on Mars—then unfolded two round solar panels like giant fan wings.',
    spokenNarration:
      'Step 2: Touchdown on Mars! InSight fired twelve rocket thrusters underneath its belly and landed gently on three legs on the flattest, quietest plain on Mars. Then it opened two round solar panels to soak up sunlight!',
    kidTakeaway:
      '🛰️ Live News Relay: Flying overhead, helper twins "Wall-E" and "Eva" beamed InSight’s "I landed safely!" message straight back to Earth!',
  },
  {
    id: 'stethoscope',
    stepNumber: 3,
    shortLabel: '3. Mars Stethoscope',
    whenLabel: 'STEP 3 OF 6 • DECEMBER 2018 • ROBOTIC CLAW ARM',
    headline: 'Putting a Giant Stethoscope Right on Mars’s Ground!',
    kidStory:
      'Just like a doctor puts a stethoscope on your chest to hear your heartbeat, InSight used its 6-foot robotic claw arm to pick up a copper quake sensor (called SEIS) and place it directly onto the Martian dirt! Then it covered the sensor with a white dome so howling wind wouldn’t shake it.',
    spokenNarration:
      'Step 3: Putting a stethoscope on Mars! Using its robotic claw arm, InSight picked up a copper earthquake sensor and placed it right onto the Martian dirt. Then it lowered a white dome over it to block the wind!',
    kidTakeaway:
      '🩺 Super-Sensitive Ears: This stethoscope was so sensitive it could feel the ground tremble by less than the width of a single atom!',
  },
  {
    id: 'mole',
    stepNumber: 4,
    shortLabel: '4. The Burrowing Mole',
    whenLabel: 'STEP 4 OF 6 • 2019–2021 • TAKING MARS’S TEMPERATURE',
    headline: 'The Digging "Mole" Gets Stuck—And the Robot Arm Rescues It!',
    kidStory:
      'Next, InSight tried to hammer a 16-inch spike called "The Mole" deep underground to take Mars’s temperature. Uh-oh! The soil was crusty like cement, and the Mole kept bouncing backward! So NASA engineers used the robot arm’s shovel to press right on top of the Mole and push it underground!',
    spokenNarration:
      'Step 4: The digging Mole gets stuck! InSight tried to hammer a temperature spike called The Mole into the dirt, but the crunchy Martian soil made it bounce out. So InSight used its robot shovel to push the Mole underground!',
    kidTakeaway:
      '🛠️ Smart Teamwork: Even 100 million miles away, engineers on Earth figured out how to use InSight’s tiny shovel to save the day!',
  },
  {
    id: 'marsquakes',
    stepNumber: 5,
    shortLabel: '5. 1,319 Quakes & Heart',
    whenLabel: 'STEP 5 OF 6 • 2019–2022 • BIGGEST DISCOVERY',
    headline: '1,319 Marsquakes Reveal Mars Has a Giant Liquid Metal Heart!',
    kidStory:
      'Mars isn’t a quiet, dead rock—it rumbles! InSight felt 1,319 "marsquakes," including a monster Magnitude 4.7 quake that shook Mars for 6 hours! By timing how quake waves echoed deep underground, InSight discovered that the center of Mars is a giant, molten LIQUID IRON METAL CORE!',
    spokenNarration:
      'Step 5: One thousand three hundred and nineteen Marsquakes! InSight felt Mars rumble again and again. By listening to how those quake waves echoed deep inside the planet, InSight proved that Mars has a giant liquid metal heart at its center!',
    kidTakeaway:
      '❤️ What InSight Proved: Mars has 3 layers inside—a rocky crust, a warm mantle, and a huge liquid metal heart 2,270 miles wide!',
  },
  {
    id: 'goodbye',
    stepNumber: 6,
    shortLabel: '6. Dusty Goodbye (2022)',
    whenLabel: 'STEP 6 OF 6 • DECEMBER 15, 2022 • HOW INSIGHT ENDED',
    headline: 'Covered in Red Dust: Listening Until Its Final Drop of Power!',
    kidStory:
      'Why did InSight’s mission end? Because Mars is super dusty! Over 4 years, thick orange dust piled up on InSight’s round solar wings until sunlight could barely get through. Instead of turning off the stethoscope to save battery, NASA kept it ON until the very last drop of power—falling asleep forever in December 2022.',
    spokenNarration:
      'Step 6: How InSight ended. Over four years on Mars, thick orange dust covered InSight’s solar wings until it ran out of sunlight power. It kept listening for Marsquakes until its very last drop of battery in December 2022!',
    kidTakeaway:
      '🌟 Hero’s Goodbye: Look at InSight’s real final selfie below—completely blanketed in Martian dust after 4 amazing years of science!',
  },
];

export const InSightScrollStory: React.FC<InSightScrollStoryProps> = ({
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

  // Stop any speech when unmounting
  useEffect(() => {
    return () => {
      stopLoudNarration();
    };
  }, []);

  // Track which scene card is currently in view when scrolling manually
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
    const scene = INSIGHT_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `insight-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < INSIGHT_SCENES.length) {
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
              🩺 Meet Mars’s Robot Doctor
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How InSight Checked Mars’s Heartbeat (2018 – 2022)
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
          {INSIGHT_SCENES.map((sc, idx) => {
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
        {INSIGHT_SCENES.map((scene, idx) => {
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
                        src="/images/missions/insight-launch.jpg"
                        alt="Real NASA photo of InSight Atlas V rocket on launchpad in California"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                          📸 Real Photo: Atlas V Rocket
                        </span>
                        <span className="text-xs text-slate-200">
                          Ready to blast off through California fog!
                        </span>
                      </div>
                    </div>

                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/insight-cleanroom.jpg"
                        alt="Real NASA photo of InSight Lander unfolding its round solar fan wings"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                          📸 Real Photo: Round Solar Wings
                        </span>
                        <span className="text-xs text-slate-200">
                          Tested by NASA engineers before launch!
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Animated Diagram: Rocket + Wall-E & Eva Helper Satellites */}
                  <div className="lg:col-span-5 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex flex-col justify-between min-h-[16rem]">
                    <span className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wider block text-center">
                      🎬 Live Animation: Flying to Mars Together!
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
                          values="0,8; 16,-8; 0,8"
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                        <g transform="translate(185, 78)">
                          <polygon
                            points="-26,0 18,-18 18,18"
                            fill="#f8fafc"
                            stroke="#38bdf8"
                            strokeWidth="2.5"
                          />
                          <polygon
                            points="18,-10 38,0 18,10"
                            fill="#f59e0b"
                          />
                          <text
                            x="-4"
                            y="-24"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="13"
                            fontWeight="bold"
                          >
                            🚀 InSight
                          </text>
                        </g>

                        <g transform="translate(120, 46)">
                          <rect
                            x="-12"
                            y="-8"
                            width="24"
                            height="16"
                            rx="3"
                            fill="#fbbf24"
                          />
                          <rect
                            x="-30"
                            y="-4"
                            width="16"
                            height="8"
                            fill="#38bdf8"
                          />
                          <rect
                            x="14"
                            y="-4"
                            width="16"
                            height="8"
                            fill="#38bdf8"
                          />
                          <text
                            x="0"
                            y="-14"
                            textAnchor="middle"
                            fill="#fde047"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            🛰️ &ldquo;Wall-E&rdquo;
                          </text>
                        </g>

                        <g transform="translate(128, 118)">
                          <rect
                            x="-12"
                            y="-8"
                            width="24"
                            height="16"
                            rx="3"
                            fill="#fbbf24"
                          />
                          <rect
                            x="-30"
                            y="-4"
                            width="16"
                            height="8"
                            fill="#38bdf8"
                          />
                          <rect
                            x="14"
                            y="-4"
                            width="16"
                            height="8"
                            fill="#38bdf8"
                          />
                          <text
                            x="0"
                            y="24"
                            textAnchor="middle"
                            fill="#fde047"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            🛰️ &ldquo;Eva&rdquo;
                          </text>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 2: ROCKET LANDING ON FLAT MARS PLAIN */}
              {idx === 1 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 250"
                    className="w-full h-56 sm:h-64 overflow-visible"
                  >
                    <rect
                      x="10"
                      y="198"
                      width="660"
                      height="44"
                      rx="10"
                      fill="#9a3412"
                    />
                    <line
                      x1="15"
                      y1="198"
                      x2="665"
                      y2="198"
                      stroke="#fdba74"
                      strokeWidth="3"
                    />
                    <text
                      x="340"
                      y="226"
                      textAnchor="middle"
                      fill="#ffedd5"
                      fontSize="15"
                      fontWeight="bold"
                    >
                      Elysium Planitia — Super-Flat Martian Plain (No Rocks in the Way!)
                    </text>

                    <g transform="translate(135, 38)">
                      <rect
                        x="-16"
                        y="-10"
                        width="32"
                        height="20"
                        rx="4"
                        fill="#fbbf24"
                      />
                      <rect
                        x="-42"
                        y="-5"
                        width="24"
                        height="10"
                        fill="#38bdf8"
                      />
                      <rect
                        x="18"
                        y="-5"
                        width="24"
                        height="10"
                        fill="#38bdf8"
                      />
                      <text
                        x="0"
                        y="-16"
                        textAnchor="middle"
                        fill="#7dd3fc"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        🛰️ Twin Helper &ldquo;Wall-E&rdquo;
                      </text>
                    </g>

                    <g transform="translate(545, 38)">
                      <rect
                        x="-16"
                        y="-10"
                        width="32"
                        height="20"
                        rx="4"
                        fill="#fbbf24"
                      />
                      <rect
                        x="-42"
                        y="-5"
                        width="24"
                        height="10"
                        fill="#38bdf8"
                      />
                      <rect
                        x="18"
                        y="-5"
                        width="24"
                        height="10"
                        fill="#38bdf8"
                      />
                      <text
                        x="0"
                        y="-16"
                        textAnchor="middle"
                        fill="#7dd3fc"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        🛰️ Twin Helper &ldquo;Eva&rdquo;
                      </text>
                    </g>

                    <g>
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,-24; 0,14; 0,-24"
                        dur="3.2s"
                        repeatCount="indefinite"
                      />

                      <line
                        x1="290"
                        y1="115"
                        x2="155"
                        y2="52"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                      />
                      <line
                        x1="390"
                        y1="115"
                        x2="525"
                        y2="52"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                      />

                      <g transform="translate(340, 132)">
                        {[-42, -21, 0, 21, 42].map((fx, i) => (
                          <polygon
                            key={i}
                            points={`${fx - 7},22 ${fx + 7},22 ${fx},56`}
                            fill="#fde047"
                          >
                            <animate
                              attributeName="opacity"
                              values="1;0.45;1"
                              dur="0.4s"
                              repeatCount="indefinite"
                            />
                          </polygon>
                        ))}

                        <ellipse
                          cx="-86"
                          cy="4"
                          rx="36"
                          ry="16"
                          fill="#1e293b"
                          stroke="#f59e0b"
                          strokeWidth="3"
                        />
                        <ellipse
                          cx="86"
                          cy="4"
                          rx="36"
                          ry="16"
                          fill="#1e293b"
                          stroke="#f59e0b"
                          strokeWidth="3"
                        />

                        <rect
                          x="-52"
                          y="-10"
                          width="104"
                          height="28"
                          rx="6"
                          fill="#f8fafc"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                        />
                        <text
                          x="0"
                          y="9"
                          textAnchor="middle"
                          fill="#0f172a"
                          fontSize="13"
                          fontWeight="bold"
                        >
                          INSIGHT LANDER
                        </text>

                        <line
                          x1="-40"
                          y1="18"
                          x2="-56"
                          y2="48"
                          stroke="#cbd5e1"
                          strokeWidth="4"
                        />
                        <line
                          x1="0"
                          y1="18"
                          x2="0"
                          y2="48"
                          stroke="#cbd5e1"
                          strokeWidth="4"
                        />
                        <line
                          x1="40"
                          y1="18"
                          x2="56"
                          y2="48"
                          stroke="#cbd5e1"
                          strokeWidth="4"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              )}

              {/* SCENE 3: ROBOT ARM PLACING THE STETHOSCOPE ON MARS */}
              {idx === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/insight-seis-mars.jpg"
                      alt="Real photo taken by InSight on Mars showing its copper SEIS stethoscope sitting on the red dirt"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Real Photo from Mars Surface
                      </span>
                      <span className="text-xs text-slate-200">
                        InSight’s copper SEIS stethoscope sitting on the Martian dirt!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex items-center justify-center">
                    <svg
                      viewBox="0 0 460 220"
                      className="w-full h-56 overflow-visible"
                    >
                      <rect
                        x="10"
                        y="175"
                        width="440"
                        height="36"
                        rx="8"
                        fill="#9a3412"
                      />

                      <g transform="translate(95, 138)">
                        <ellipse
                          cx="-54"
                          cy="2"
                          rx="28"
                          ry="11"
                          fill="#1e293b"
                          stroke="#f59e0b"
                          strokeWidth="2"
                        />
                        <rect
                          x="-38"
                          y="-12"
                          width="84"
                          height="24"
                          rx="5"
                          fill="#f8fafc"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                        />
                        <text
                          x="4"
                          y="4"
                          textAnchor="middle"
                          fill="#0f172a"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          InSight Deck
                        </text>
                        <line
                          x1="-26"
                          y1="12"
                          x2="-36"
                          y2="37"
                          stroke="#cbd5e1"
                          strokeWidth="3.5"
                        />
                        <line
                          x1="34"
                          y1="12"
                          x2="44"
                          y2="37"
                          stroke="#cbd5e1"
                          strokeWidth="3.5"
                        />
                      </g>

                      <polyline
                        points="125,126 205,48 310,82"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <text
                        x="205"
                        y="32"
                        textAnchor="middle"
                        fill="#7dd3fc"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        🦾 6-Foot Robot Claw Arm
                      </text>

                      <g transform="translate(310, 175)">
                        <rect
                          x="-28"
                          y="-22"
                          width="56"
                          height="22"
                          rx="4"
                          fill="#d97706"
                          stroke="#fde047"
                          strokeWidth="2"
                        />
                        <text
                          x="0"
                          y="-7"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          SEIS Sensor
                        </text>

                        <g>
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,-48; 0,0; 0,-48"
                            dur="3.4s"
                            repeatCount="indefinite"
                          />
                          <path
                            d="M -48 0 C -48 -44, 48 -44, 48 0 Z"
                            fill="#f8fafc"
                            stroke="#38bdf8"
                            strokeWidth="2.5"
                          />
                          <text
                            x="0"
                            y="-12"
                            textAnchor="middle"
                            fill="#0f172a"
                            fontSize="11"
                            fontWeight="bold"
                          >
                            White Wind Dome
                          </text>
                        </g>

                        <text
                          x="0"
                          y="24"
                          textAnchor="middle"
                          fill="#fde047"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          🩺 Mars Stethoscope Placed on Dirt!
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 4: THE BURROWING MOLE & ROBOT SHOVEL RESCUE */}
              {idx === 3 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 235"
                    className="w-full h-56 overflow-visible"
                  >
                    <rect
                      x="15"
                      y="108"
                      width="650"
                      height="42"
                      rx="6"
                      fill="#b45309"
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />
                    <text
                      x="165"
                      y="134"
                      textAnchor="middle"
                      fill="#fef08a"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      Crunchy, Cement-Like Martian Soil!
                    </text>

                    <rect
                      x="15"
                      y="150"
                      width="650"
                      height="75"
                      rx="6"
                      fill="#7c2d12"
                    />
                    <text
                      x="165"
                      y="194"
                      textAnchor="middle"
                      fill="#fed7aa"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      Deep Underground (Taking Mars’s Temperature)
                    </text>

                    <g transform="translate(415, 96)">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="415,88; 415,108; 415,88"
                        dur="1.6s"
                        repeatCount="indefinite"
                      />

                      <polyline
                        points="-130,-52 -55,-32 -8,-6"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M -28 -12 L 28 -12 L 20 4 L -20 4 Z"
                        fill="#38bdf8"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <text
                        x="-70"
                        y="-48"
                        textAnchor="middle"
                        fill="#7dd3fc"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        🛠️ Robot Shovel Pushes Down!
                      </text>

                      <rect
                        x="-11"
                        y="4"
                        width="22"
                        height="86"
                        rx="5"
                        fill="#fbbf24"
                        stroke="#fef08a"
                        strokeWidth="2"
                      />
                      <polygon points="-11,90 11,90 0,110" fill="#f59e0b" />
                      <text
                        x="88"
                        y="52"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        🌡️ &ldquo;The Mole&rdquo; Thermometer
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* SCENE 5: 1,319 MARSQUAKES & LIQUID METAL HEART */}
              {idx === 4 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 250"
                    className="w-full h-60 overflow-visible"
                  >
                    <g transform="translate(175, 125)">
                      <circle
                        r="102"
                        fill="#9a3412"
                        stroke="#fb923c"
                        strokeWidth="4"
                      />
                      <circle
                        r="82"
                        fill="#ea580c"
                        stroke="#fdba74"
                        strokeWidth="2"
                      />
                      <circle
                        r="50"
                        fill="#fde047"
                        stroke="#ffffff"
                        strokeWidth="3"
                      >
                        <animate
                          attributeName="r"
                          values="47;53;47"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <text
                        x="0"
                        y="-4"
                        textAnchor="middle"
                        fill="#060814"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        ❤️ LIQUID METAL
                      </text>
                      <text
                        x="0"
                        y="13"
                        textAnchor="middle"
                        fill="#060814"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        CORE!
                      </text>

                      <path
                        d="M -68 58 Q -28 15 0 -102"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                        strokeDasharray="6 5"
                      />
                      <path
                        d="M 68 58 Q 28 15 0 -102"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="3"
                        strokeDasharray="6 5"
                      />
                      <text
                        x="0"
                        y="-112"
                        textAnchor="middle"
                        fill="#7dd3fc"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        🩺 InSight Listening on Top
                      </text>
                    </g>

                    <g transform="translate(335, 22)">
                      <rect
                        x="0"
                        y="0"
                        width="325"
                        height="205"
                        rx="16"
                        fill="#050816"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <text
                        x="162"
                        y="32"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="15"
                        fontWeight="bold"
                      >
                        📈 1,319 Marsquakes Detected!
                      </text>
                      <text
                        x="162"
                        y="54"
                        textAnchor="middle"
                        fill="#bae6fd"
                        fontSize="13"
                      >
                        Biggest Quake: Magnitude 4.7 (Shook 6 Hours!)
                      </text>

                      <polyline
                        points="20,118 55,118 75,92 95,148 115,68 135,165 155,62 175,158 195,78 215,142 235,95 255,132 280,118 305,118"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <animate
                          attributeName="stroke-width"
                          values="3;5;3"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                      </polyline>

                      <text
                        x="162"
                        y="188"
                        textAnchor="middle"
                        fill="#34d399"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        Quake Echoes Revealed Mars’s Liquid Heart!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* SCENE 6: HOW INSIGHT ENDED — REAL CLEAN VS DUSTY SELFIE */}
              {idx === 5 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/insight-lander.jpg"
                      alt="Real NASA selfie of InSight in 2018 with clean solar panels"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4">
                      <span className="text-sm sm:text-base font-bold text-sky-300 block">
                        📸 2018 Selfie: Shiny &amp; Clean!
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200">
                        Right after landing, InSight’s solar wings made 100% power!
                      </span>
                    </div>
                  </div>

                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/60 bg-[#060814]">
                    <img
                      src="/images/missions/insight-final-selfie.jpg"
                      alt="Real NASA final selfie of InSight in 2022 covered in thick red Martian dust"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4">
                      <span className="text-sm sm:text-base font-bold text-amber-300 block">
                        📸 Dec 2022 Final Selfie: Buried in Red Dust!
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200">
                        Thick dust blocked the sunlight—so InSight went to sleep forever.
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
              <span>Finished InSight’s Story!</span>
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
