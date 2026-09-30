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

interface PhoenixScrollStoryProps {
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

const PHOENIX_SCENES: StoryScene[] = [
  {
    id: 'launch-reborn',
    stepNumber: 1,
    shortLabel: '1. Built From Spare Parts!',
    whenLabel: 'STEP 1 OF 6 • AUGUST 4, 2007 • FLORIDA NIGHT LAUNCH',
    headline: 'Why Call It "Phoenix"? The Robot Built From Rescued Spare Parts!',
    kidStory:
      'Just like the mythical Phoenix bird that rises from the ashes, NASA built the Phoenix Lander using spare robot parts left over from two earlier canceled Mars missions! On August 4, 2007, a towering Delta II rocket lit up the Florida night sky like a second sun and launched Phoenix on a 422-million-mile journey to the freezing North Pole of Mars—where no robot had ever landed before!',
    spokenNarration:
      'Step 1: Why call it Phoenix? Just like the mythical bird rising from the ashes, NASA built the Phoenix Lander from spare parts of earlier canceled Mars missions! In August 2007, it blasted off at night toward the freezing North Pole of Mars!',
    kidTakeaway:
      '🐦 Ultimate Space Recycling: By rescuing a spare 2001 lander waiting in a cleanroom and giving it a robotic backhoe digging arm, NASA built a polar explorer for half the cost!',
  },
  {
    id: 'pulse-thrusters-landing',
    stepNumber: 2,
    shortLabel: '2. Pfft-Pfft Landing!',
    whenLabel: 'STEP 2 OF 6 • MAY 25, 2008 • MARS NORTH POLE ("GREEN VALLEY")',
    headline: 'No Bouncy Airbags! Landing on 3 Legs with 12 Rapid-Fire Rockets!',
    kidStory:
      'Earlier Mars rovers bounced onto the ground inside giant airbags, but Phoenix was a 3-legged science lab that needed to land right-side up! After its parachute slowed it down, Phoenix fired 12 rapid-fire rocket thrusters underneath its belly—"Pfft-pfft-pfft-pfft!"—to touch down softer than a hop off a curb! Then it waited 15 minutes for the rocket dust cloud to settle before unfolding two round solar wings like giant paper fans!',
    spokenNarration:
      'Step 2: Touchdown at the North Pole! Instead of bouncing in airbags, Phoenix fired twelve rapid-fire rocket thrusters under its belly—pfft, pfft, pfft!—and landed gently on three legs. After waiting 15 minutes for the dust to settle, it opened two round solar fan wings!',
    kidTakeaway:
      '⏱️ Smart 15-Minute Wait: If Phoenix opened its solar panels right away, the dust kicked up by its landing rockets would have coated the panels like dirty flour!',
  },
  {
    id: 'dodo-goldilocks-ice',
    stepNumber: 3,
    shortLabel: '3. Disappearing Ice!',
    whenLabel: 'STEP 3 OF 6 • JUNE 2008 • THE "DODO-GOLDILOCKS" TRENCH',
    headline: 'Digging 2 Inches Down: Look! Those White Crumbs Vanished!',
    kidStory:
      'Phoenix stretched out its 8-foot robotic backhoe arm and dug a shallow trench nicknamed "Dodo-Goldilocks." Just 2 inches under the rusty dirt, the scoop hit something rock-hard and bright white, kicking up three dice-sized white crumbs! Was it white salt or real water ice? Over 4 sunny days, Phoenix’s camera watched those three white crumbs completely VANISH into thin air! Salt never evaporates in sunlight—proving it was 100% real Martian water ice!',
    spokenNarration:
      'Step 3: Digging up disappearing ice! Phoenix used its eight-foot robot backhoe arm to dig a trench just two inches deep, uncovering bright white chunks! Over four sunny days, three dice-sized white crumbs vanished into thin air, proving they were real water ice and not salt!',
    kidTakeaway:
      '🧊 Science Detective Trick: In Mars’s thin air, warmed ice turns straight into invisible water vapor (called "sublimation")—while salt stays behind forever!',
  },
  {
    id: 'easy-bake-ovens',
    stepNumber: 4,
    shortLabel: '4. 1,800°F Dirt Ovens!',
    whenLabel: 'STEP 4 OF 6 • TEGA EASY-BAKE OVENS & WET CHEMISTRY LAB',
    headline: 'Baking Icy Dirt in 8 Tiny Ovens & Soil That Could Grow Asparagus!',
    kidStory:
      'Seeing ice was awesome, but Phoenix wanted to TASTE it too! The robot arm scooped up icy Martian soil and sprinkled it into 8 tiny toaster-sized ovens on its deck (called TEGA). When Oven #4 heated the dirt to a sizzling 1,800°F (1,000°C), the frozen ice melted and boiled into real steam—and Phoenix’s chemical nose sniffed pure H₂O water! Even better, its Wet Chemistry Lab proved Martian dirt isn’t toxic acid—it’s friendly enough to grow backyard vegetables like asparagus!',
    spokenNarration:
      'Step 4: Baking Martian dirt in tiny ovens! Phoenix scooped icy soil into eight tiny ovens on its deck and baked it at 1,800 degrees Fahrenheit! When the ice turned to steam, Phoenix sniffed real liquid water—and proved the soil has nutrients that could help grow vegetables like asparagus!',
    kidTakeaway:
      '🥦 Asparagus on Mars?! Phoenix’s chemistry lab discovered the soil is mildly alkaline (like kitchen baking soda) with magnesium, potassium, and calcium nutrients!',
  },
  {
    id: 'green-laser-snow',
    stepNumber: 5,
    shortLabel: '5. Snow on Mars!',
    whenLabel: 'STEP 5 OF 6 • SEPTEMBER 2008 • GREEN LASER IN THE SKY',
    headline: 'Shooting a Green Laser Beam Up at the Clouds—It’s Snowing on Mars!',
    kidStory:
      'Did you know it actually SNOWS on Mars? On Phoenix’s deck sat a Canadian weather station that shot a bright green laser beam straight up into the Martian sky like a lightsaber! One chilly evening (Sol 99), the laser bounced off fluffy clouds 2.5 miles overhead and caught real water-ice snowflakes gently falling down! Because Mars’s air is dry, the snowflakes turned into mist right before touching the ground!',
    spokenNarration:
      'Step 5: Catching Martian Snowflakes with a Green Laser! Phoenix shot a bright green laser beam straight up into the Martian sky. Two and a half miles overhead, the laser caught real water-ice snow falling from Martian clouds!',
    kidTakeaway:
      '❄️ What Is "Virga" Snow? When snow falls from high clouds in streaks but evaporates before touching the ground, weather scientists call it "virga"!',
  },
  {
    id: 'polar-winter-sleep',
    stepNumber: 6,
    shortLabel: '6. Frozen in Ice (Today)',
    whenLabel: 'STEP 6 OF 6 • NOVEMBER 2, 2008 – TODAY • ARCTIC WINTER SLEEP',
    headline: 'Why Phoenix Went to Sleep: Wrapped in a Blanket of Polar Ice!',
    kidStory:
      'Built to last just 90 Martian days, Phoenix worked for 157 days! Why did its mission end? Because at the North Pole of Mars, when winter arrives, the Sun sinks below the horizon and doesn’t rise at all for months! In pitch-black darkness at -200°F (-125°C), Phoenix’s solar fan wings couldn’t make electricity. After beaming one last word—"Triumph"—Phoenix went to sleep and was wrapped in a sparkling blanket of dry-ice frost, where it still rests today!',
    spokenNarration:
      'Step 6: Wrapped in a blanket of polar ice! Built for 90 days, Phoenix lasted 157 days until the long, dark Martian winter arrived. With no sunlight for its solar panels, Phoenix sent one final Triumph message and went to sleep in the polar ice, where it still rests today!',
    kidTakeaway:
      '💤 Sleeping Polar Hero: Every Martian winter, a 1-foot layer of sparkling dry-ice frost covers Phoenix like a snowglobe at the North Pole!',
  },
];

export const PhoenixScrollStory: React.FC<PhoenixScrollStoryProps> = ({
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
    const scene = PHOENIX_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `phoenix-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < PHOENIX_SCENES.length) {
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
              ❄️ Meet Mars’s North Pole Ice Detective
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How Phoenix Found Water Ice &amp; Snow on Mars (2007 – 2008)
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
          {PHOENIX_SCENES.map((sc, idx) => {
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
        {PHOENIX_SCENES.map((scene, idx) => {
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

              {/* SCENE 1: NIGHT BLASTOFF + SPARE PARTS TO MARS NORTH POLE */}
              {idx === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/phoenix-launch.jpg"
                        alt="Real NASA photo of Delta II rocket launching Phoenix Mars Lander at night in Florida"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                          📸 Real Photo: Night Blastoff!
                        </span>
                        <span className="text-xs text-slate-200">
                          Delta II rocket lighting up Florida at midnight (Aug 4, 2007)
                        </span>
                      </div>
                    </div>

                    <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                      <img
                        src="/images/missions/phoenix-lander.jpg"
                        alt="NASA Phoenix Mars Lander with round fan solar wings and 8-foot digging arm"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                        <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                          📸 Real Photo: Rescued Robot!
                        </span>
                        <span className="text-xs text-slate-200">
                          Built from spare 2001 parts + a brand-new digging scoop arm!
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Kid-Friendly Animation: Spare Parts Reborn & Flying to Mars North Pole */}
                  <div className="lg:col-span-5 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex flex-col justify-between min-h-[16rem]">
                    <span className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wider block text-center">
                      🎬 Live Animation: Heading to Mars’s Icy North Pole!
                    </span>
                    <svg
                      viewBox="0 0 360 195"
                      className="w-full h-44 overflow-visible my-auto"
                    >
                      {/* Earth */}
                      <circle cx="46" cy="145" r="24" fill="#0284c7" />
                      <circle cx="40" cy="138" r="10" fill="#34d399" />
                      <text
                        x="46"
                        y="182"
                        textAnchor="middle"
                        fill="#bae6fd"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        Earth (2007)
                      </text>

                      {/* Mars with Bright White North Pole Ice Cap on Top */}
                      <g transform="translate(308, 76)">
                        <circle cx="0" cy="0" r="32" fill="#ea580c" />
                        {/* White North Pole Ice Cap */}
                        <path
                          d="M -24 -20 Q 0 -38 24 -20 Q 0 -10 -24 -20 Z"
                          fill="#ffffff"
                          stroke="#7dd3fc"
                          strokeWidth="2"
                        />
                        <text
                          x="0"
                          y="-42"
                          textAnchor="middle"
                          fill="#7dd3fc"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          ❄️ Icy North Pole!
                        </text>
                        <text
                          x="0"
                          y="48"
                          textAnchor="middle"
                          fill="#fdba74"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          Mars (68° North)
                        </text>
                      </g>

                      {/* Flight Curve to the Top (North Pole) of Mars */}
                      <path
                        d="M 74 134 Q 175 28 282 52"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeDasharray="7 6"
                      />

                      {/* Animated Phoenix Spacecraft Flying Along Curve */}
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="-22,18; 24,-14; -22,18"
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                        <g transform="translate(175, 76)">
                          {/* Glowing Phoenix Wings Aura */}
                          <polygon
                            points="-28,-16 6,-4 -18,0"
                            fill="#fbbf24"
                            opacity="0.85"
                          />
                          <polygon
                            points="-28,16 6,4 -18,0"
                            fill="#fbbf24"
                            opacity="0.85"
                          />
                          <polygon
                            points="-22,0 20,-14 20,14"
                            fill="#f8fafc"
                            stroke="#38bdf8"
                            strokeWidth="2.5"
                          />
                          <text
                            x="0"
                            y="-22"
                            textAnchor="middle"
                            fill="#fde047"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            🐦 Reborn From Spare Parts!
                          </text>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 2: 12 PULSED THRUSTERS ("PFFT-PFFT!") & 15-MINUTE DUST WAIT */}
              {idx === 1 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 680 250"
                    className="w-full h-60 overflow-visible"
                  >
                    {/* Martian Arctic Ground with Polygon Permafrost Cracks */}
                    <rect
                      x="10"
                      y="202"
                      width="660"
                      height="40"
                      rx="8"
                      fill="#9a3412"
                      stroke="#fb923c"
                      strokeWidth="2"
                    />
                    {/* Ice Layer Just Under the Red Dirt */}
                    <rect
                      x="16"
                      y="214"
                      width="648"
                      height="10"
                      rx="4"
                      fill="#bae6fd"
                    />
                    <text
                      x="340"
                      y="237"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      ❄️ Hidden Sheet of Water Ice Just 2 Inches Under the Red Dirt!
                    </text>

                    {/* Left Stage: Soft Landing with 12 Rapid-Fire Rocket Puffs */}
                    <g transform="translate(185, 108)">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="185,92; 185,118; 185,92"
                        dur="2.6s"
                        repeatCount="indefinite"
                      />
                      <text
                        x="0"
                        y="-58"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="15"
                        fontWeight="bold"
                      >
                        1. 12 Rapid-Fire Rocket Thrusters!
                      </text>
                      <text
                        x="0"
                        y="-38"
                        textAnchor="middle"
                        fill="#7dd3fc"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        &ldquo;PFFT-PFFT-PFFT!&rdquo; (No Bouncy Airbags!)
                      </text>

                      {/* 12 Pulsing Rocket Puffs Under Belly */}
                      {[-45, -27, -9, 9, 27, 45].map((px, pIdx) => (
                        <polygon
                          key={pIdx}
                          points={`${px - 6},24 ${px + 6},24 ${px},58`}
                          fill="#fde047"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0.2;1"
                            dur="0.35s"
                            repeatCount="indefinite"
                          />
                        </polygon>
                      ))}

                      {/* Lander Deck & 3 Shock-Absorbing Legs */}
                      <rect
                        x="-58"
                        y="-6"
                        width="116"
                        height="30"
                        rx="6"
                        fill="#f8fafc"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <text
                        x="0"
                        y="13"
                        textAnchor="middle"
                        fill="#0f172a"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        PHOENIX (3 LEGS)
                      </text>
                      <line x1="-44" y1="24" x2="-62" y2="56" stroke="#e2e8f0" strokeWidth="4" />
                      <line x1="0" y1="24" x2="0" y2="56" stroke="#e2e8f0" strokeWidth="4" />
                      <line x1="44" y1="24" x2="62" y2="56" stroke="#e2e8f0" strokeWidth="4" />
                    </g>

                    {/* Right Stage: Waiting 15 Minutes Before Opening Fan Solar Wings */}
                    <g transform="translate(505, 118)">
                      <rect
                        x="-145"
                        y="-82"
                        width="290"
                        height="156"
                        rx="16"
                        fill="#0b132e"
                        stroke="#34d399"
                        strokeWidth="2.5"
                      />
                      <text
                        x="0"
                        y="-54"
                        textAnchor="middle"
                        fill="#34d399"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        2. Waited 15 Mins for Dust to Settle!
                      </text>

                      {/* Left & Right Octagonal Fan Solar Wings */}
                      <circle
                        cx="-78"
                        cy="8"
                        r="32"
                        fill="#0284c7"
                        stroke="#fbbf24"
                        strokeWidth="3"
                      />
                      <line x1="-110" y1="8" x2="-46" y2="8" stroke="#7dd3fc" strokeWidth="1.5" />
                      <line x1="-78" y1="-24" x2="-78" y2="40" stroke="#7dd3fc" strokeWidth="1.5" />

                      <circle
                        cx="78"
                        cy="8"
                        r="32"
                        fill="#0284c7"
                        stroke="#fbbf24"
                        strokeWidth="3"
                      />
                      <line x1="46" y1="8" x2="110" y2="8" stroke="#7dd3fc" strokeWidth="1.5" />
                      <line x1="78" y1="-24" x2="78" y2="40" stroke="#7dd3fc" strokeWidth="1.5" />

                      {/* Center Deck */}
                      <rect
                        x="-38"
                        y="-6"
                        width="76"
                        height="28"
                        rx="5"
                        fill="#f8fafc"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                      <text
                        x="0"
                        y="12"
                        textAnchor="middle"
                        fill="#0f172a"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        CLEAN WINGS!
                      </text>

                      <text
                        x="0"
                        y="58"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        ☀️ Round Fan Wings Unfolded Dust-Free!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* SCENE 3: DIGGING UP DISAPPEARING ICE ("DODO-GOLDILOCKS" TRENCH) */}
              {idx === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/phoenix-ice-trench.jpg"
                      alt="Real NASA photo taken by Phoenix showing dice-sized white ice crumbs in the Dodo-Goldilocks trench vanishing over 4 days"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                        📸 Real NASA Photo: Disappearing Ice!
                      </span>
                      <span className="text-xs text-slate-200">
                        Look inside the shadow: 3 white crumbs on Sol 20 vanished by Sol 24!
                      </span>
                    </div>
                  </div>

                  {/* Kid-Friendly Animation: Day 1 vs Day 4 Ice Sublimation Detective */}
                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex items-center justify-center">
                    <svg
                      viewBox="0 0 460 230"
                      className="w-full h-60 overflow-visible"
                    >
                      <text
                        x="230"
                        y="24"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="15"
                        fontWeight="bold"
                      >
                        🕵️ Ice vs. Salt Detective Test (2 Inches Underground!)
                      </text>

                      {/* Left Box: Day 1 (Sol 20) — 3 White Crumbs Dug Up */}
                      <g transform="translate(118, 126)">
                        <rect
                          x="-98"
                          y="-78"
                          width="196"
                          height="156"
                          rx="14"
                          fill="#431407"
                          stroke="#fb923c"
                          strokeWidth="2.5"
                        />
                        <text
                          x="0"
                          y="-52"
                          textAnchor="middle"
                          fill="#fed7aa"
                          fontSize="13"
                          fontWeight="bold"
                        >
                          DAY 1: Robot Arm Digs Trench
                        </text>

                        {/* Robot Scoop Arm Scraping */}
                        <polyline
                          points="-65,-34 -25,-8 15,-14"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />

                        {/* White Ice Floor + 3 Dice-Sized White Crumbs */}
                        <rect x="-74" y="28" width="148" height="22" rx="5" fill="#e0f2fe" />
                        <rect x="-42" y="8" width="18" height="16" rx="3" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
                        <rect x="-8" y="10" width="16" height="15" rx="3" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
                        <rect x="24" y="7" width="18" height="16" rx="3" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />

                        <text
                          x="0"
                          y="66"
                          textAnchor="middle"
                          fill="#7dd3fc"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          3 Bright White Crumbs Appear!
                        </text>
                      </g>

                      {/* Right Box: Day 4 (Sol 24) — Crumbs Evaporate in Sunlight! */}
                      <g transform="translate(342, 126)">
                        <rect
                          x="-98"
                          y="-78"
                          width="196"
                          height="156"
                          rx="14"
                          fill="#0b132e"
                          stroke="#34d399"
                          strokeWidth="2.5"
                        />
                        <text
                          x="0"
                          y="-52"
                          textAnchor="middle"
                          fill="#fde047"
                          fontSize="13"
                          fontWeight="bold"
                        >
                          DAY 4: Warmed by Sunlight ☀️
                        </text>

                        {/* Crumbs Fading & Turning into Rising Water Vapor */}
                        <rect x="-74" y="28" width="148" height="22" rx="5" fill="#e0f2fe" />
                        {[-34, 0, 34].map((cx, cIdx) => (
                          <g key={cIdx} transform={`translate(${cx}, 14)`}>
                            <rect
                              x="-8"
                              y="-6"
                              width="16"
                              height="14"
                              rx="3"
                              fill="#ffffff"
                            >
                              <animate
                                attributeName="opacity"
                                values="1;0.05;1"
                                dur="2.6s"
                                repeatCount="indefinite"
                              />
                            </rect>
                            <text
                              x="0"
                              y="-22"
                              textAnchor="middle"
                              fill="#38bdf8"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              💨 H₂O
                            </text>
                          </g>
                        ))}

                        <text
                          x="0"
                          y="66"
                          textAnchor="middle"
                          fill="#34d399"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          ✓ Vanished! Proved 100% Water Ice!
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 4: 1,800°F EASY-BAKE OVENS & ASPARAGUS SOIL TEST */}
              {idx === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/phoenix-deep-trenches.jpg"
                      alt="Real NASA photo of trenches dug by Phoenix Mars Lander's robotic arm in Martian arctic soil"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Real Photo: Scooping Martian Dirt!
                      </span>
                      <span className="text-xs text-slate-200">
                        Trenches dug by Phoenix’s robotic arm to feed its tiny chemistry ovens!
                      </span>
                    </div>
                  </div>

                  {/* Kid-Friendly Animation: 1,800°F TEGA Oven + Veggie-Friendly Soil */}
                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex items-center justify-center">
                    <svg
                      viewBox="0 0 460 225"
                      className="w-full h-56 overflow-visible"
                    >
                      {/* Left: TEGA 1,800°F Oven Baking Dirt into Water Steam */}
                      <g transform="translate(120, 115)">
                        <rect
                          x="-98"
                          y="-88"
                          width="196"
                          height="176"
                          rx="16"
                          fill="#0b132e"
                          stroke="#f59e0b"
                          strokeWidth="2.5"
                        />
                        <text
                          x="0"
                          y="-60"
                          textAnchor="middle"
                          fill="#fde047"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          🔥 Oven #4 (1,800°F)
                        </text>

                        {/* Glowing Baking Oven */}
                        <rect
                          x="-56"
                          y="-8"
                          width="112"
                          height="56"
                          rx="10"
                          fill="#ea580c"
                          stroke="#fef08a"
                          strokeWidth="2.5"
                        >
                          <animate
                            attributeName="fill"
                            values="#ea580c;#f59e0b;#ea580c"
                            dur="1.6s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <text
                          x="0"
                          y="24"
                          textAnchor="middle"
                          fill="#060814"
                          fontSize="13"
                          fontWeight="bold"
                        >
                          BAKING ICY DIRT!
                        </text>

                        {/* Rising Steam Bubbles */}
                        <g>
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0; 0,-20; 0,0"
                            dur="2.2s"
                            repeatCount="indefinite"
                          />
                          <circle cx="-26" cy="-24" r="12" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
                          <text x="-26" y="-20" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                            H₂O
                          </text>
                          <circle cx="24" cy="-28" r="12" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
                          <text x="24" y="-24" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                            H₂O
                          </text>
                        </g>

                        <text
                          x="0"
                          y="70"
                          textAnchor="middle"
                          fill="#7dd3fc"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          💧 Sniffed Real Water Steam!
                        </text>
                      </g>

                      {/* Right: Wet Chemistry Lab — Friendly Soil for Vegetables! */}
                      <g transform="translate(342, 115)">
                        <rect
                          x="-98"
                          y="-88"
                          width="196"
                          height="176"
                          rx="16"
                          fill="#06221e"
                          stroke="#34d399"
                          strokeWidth="2.5"
                        />
                        <text
                          x="0"
                          y="-60"
                          textAnchor="middle"
                          fill="#34d399"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          🧪 Wet Chemistry Lab
                        </text>

                        <rect
                          x="-74"
                          y="-34"
                          width="148"
                          height="76"
                          rx="12"
                          fill="#0f172a"
                          stroke="#10b981"
                          strokeWidth="2"
                        />
                        <text
                          x="0"
                          y="-8"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          🌱 Not Toxic Acid!
                        </text>
                        <text
                          x="0"
                          y="16"
                          textAnchor="middle"
                          fill="#fde047"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          Has Calcium &amp; Magnesium
                        </text>
                        <text
                          x="0"
                          y="34"
                          textAnchor="middle"
                          fill="#86efac"
                          fontSize="12"
                        >
                          (Like Backyard Garden Soil!)
                        </text>

                        <text
                          x="0"
                          y="70"
                          textAnchor="middle"
                          fill="#fde047"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          🥦 Could Grow Asparagus!
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 5: SHOOTING A GREEN LASER AT MARTIAN SNOW CLOUDS */}
              {idx === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-emerald-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/phoenix-laser-snow.jpg"
                      alt="Real NASA photo of Phoenix Mars Lander firing its green LIDAR laser beam straight up into the Martian sky"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-emerald-300 block">
                        📸 Real NASA Photo: Green Laser on Mars!
                      </span>
                      <span className="text-xs text-slate-200">
                        Phoenix’s actual green laser beam shooting up into the Martian sky!
                      </span>
                    </div>
                  </div>

                  {/* Kid-Friendly Animation: Green Laser Catching Falling Martian Snow */}
                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex items-center justify-center">
                    <svg
                      viewBox="0 0 460 230"
                      className="w-full h-60 overflow-visible"
                    >
                      {/* Martian Ground */}
                      <rect
                        x="12"
                        y="192"
                        width="436"
                        height="28"
                        rx="6"
                        fill="#9a3412"
                      />

                      {/* High Martian Snow Cloud (2.5 Miles Up) */}
                      <g transform="translate(230, 42)">
                        <ellipse
                          cx="0"
                          cy="0"
                          rx="145"
                          ry="26"
                          fill="#1e293b"
                          stroke="#7dd3fc"
                          strokeWidth="2.5"
                        />
                        <text
                          x="0"
                          y="5"
                          textAnchor="middle"
                          fill="#bae6fd"
                          fontSize="13"
                          fontWeight="bold"
                        >
                          ☁️ Martian Ice Cloud (2.5 Miles Overhead!)
                        </text>
                      </g>

                      {/* Pulsing Bright Green Laser Beam Shooting Up From Phoenix */}
                      <line
                        x1="230"
                        y1="172"
                        x2="230"
                        y2="42"
                        stroke="#22c55e"
                        strokeWidth="6"
                      >
                        <animate
                          attributeName="opacity"
                          values="1;0.35;1"
                          dur="0.6s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <text
                        x="128"
                        y="118"
                        textAnchor="middle"
                        fill="#4ade80"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        💚 Green Laser Beam!
                      </text>

                      {/* Falling Animated Snowflakes */}
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="0,0; 0,48; 0,0"
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                        <text x="165" y="88" fontSize="18">
                          ❄️
                        </text>
                        <text x="222" y="96" fontSize="20">
                          ❄️
                        </text>
                        <text x="278" y="85" fontSize="18">
                          ❄️
                        </text>
                        <text x="315" y="106" fontSize="16">
                          ❄️
                        </text>
                      </g>

                      <text
                        x="348"
                        y="144"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="13"
                        fontWeight="bold"
                      >
                        Real Martian Snow!
                      </text>

                      {/* Phoenix Lander on Ground */}
                      <g transform="translate(230, 178)">
                        <rect
                          x="-44"
                          y="-10"
                          width="88"
                          height="18"
                          rx="4"
                          fill="#f8fafc"
                          stroke="#38bdf8"
                          strokeWidth="2"
                        />
                        <text
                          x="0"
                          y="3"
                          textAnchor="middle"
                          fill="#0f172a"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          PHOENIX LIDAR
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* SCENE 6: SUNNY SUMMER VS FROZEN ARCTIC WINTER SLEEP (TODAY) */}
              {idx === 5 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/phoenix-selfie-deck.jpg"
                      alt="Real NASA self-portrait of Phoenix Lander deck and round solar wings under sunny Martian summer skies"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4">
                      <span className="text-sm sm:text-base font-bold text-sky-300 block">
                        📸 Summer 2008: 24-Hour Arctic Sunshine!
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200">
                        Phoenix’s round solar fan wings soaked up non-stop summer sun for 157 days!
                      </span>
                    </div>
                  </div>

                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/60 bg-[#060814]">
                    <img
                      src="/images/missions/phoenix-winter-sleep.jpg"
                      alt="Real NASA orbital view of Phoenix resting in the Martian arctic plains after polar winter frost"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4">
                      <span className="text-sm sm:text-base font-bold text-amber-300 block">
                        📸 Winter &amp; Today: Resting in Polar Frost!
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200">
                        When polar night arrived (-200°F), Phoenix sent &ldquo;Triumph&rdquo; and went to sleep in the ice!
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
              <span>Finished Phoenix’s Story!</span>
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
