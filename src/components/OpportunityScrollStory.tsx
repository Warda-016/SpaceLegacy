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

interface OpportunityScrollStoryProps {
  onStartQuiz?: () => void;
}

interface StoryScene {
  id: string;
  stepNumber: number;
  shortLabel: string;
  visualFlowIcon: string;
  visualFlowCaption: string;
  whenLabel: string;
  headline: string;
  kidStory: string;
  spokenNarration: string;
  kidTakeaway: string;
}

const OPPORTUNITY_SCENES: StoryScene[] = [
  {
    id: 'origami-rocket-launch',
    stepNumber: 1,
    shortLabel: '1. Folded in Rocket',
    visualFlowIcon: '🚀',
    visualFlowCaption: 'Folded Like Origami',
    whenLabel: 'STEP 1 OF 6 • JULY 7, 2003 • FLORIDA NIGHT LAUNCH',
    headline: 'Folded Up Like Origami Inside a Rocket for a 7-Month Trip to Mars!',
    kidStory:
      'NASA built two twin golf-cart-sized robot geologists named Spirit and Opportunity ("Oppy"). To fit inside its rocket nosecone, Oppy folded up its solar wings, 6 wheels, and camera neck like a piece of origami inside a triangle protective shell! On the night of July 7, 2003, a roaring Delta II rocket launched Oppy on a 283-million-mile journey to the Red Planet!',
    spokenNarration:
      'Step 1: Folded up like origami inside a rocket! NASA built two twin golf-cart-sized rovers named Spirit and Opportunity. In July 2003, Opportunity folded up its solar wings and six wheels inside a triangle landing shell and blasted off on a seven-month trip to Mars!',
    kidTakeaway:
      '🤖 Twin Robot Sisters: Spirit landed on one side of Mars, and 3 weeks later Opportunity landed on the opposite side to hunt for ancient water!',
  },
  {
    id: 'airbag-bounce-hole-in-one',
    stepNumber: 2,
    shortLabel: '2. Airbag Hole-in-One!',
    visualFlowIcon: '🎈',
    visualFlowCaption: 'Bounced in 24 Airbags',
    whenLabel: 'STEP 2 OF 6 • JANUARY 25, 2004 • EAGLE CRATER, MARS',
    headline: 'BOING! Bouncing in 24 Giant Airbags & Rolling Straight Into a Crater!',
    kidStory:
      'How do you land on Mars without crashing? Seconds before hitting the ground, Oppy inflated 24 giant beach-ball airbags around itself! It hit Mars at 30 mph and BOUNCED 26 times across the dusty plain! On its very last roll, Oppy rolled straight into a 72-foot bowl called Eagle Crater—a 283-million-mile "Hole-in-One"! Then the airbags deflated, 3 lander petals opened flat, and Oppy unfolded its solar wings!',
    spokenNarration:
      'Step 2: Bouncing in giant airbags and a cosmic hole-in-one! To land safely on Mars, Opportunity inflated twenty-four giant airbags around itself like a beach ball! It bounced twenty-six times across the red dirt and rolled straight into Eagle Crater like a golf ball landing in the hole! Then the airbags opened and Oppy stood up!',
    kidTakeaway:
      '⛳ Cosmic Hole-in-One: Rolling right into Eagle Crater meant Oppy didn’t even have to drive to find underground rock layers—they were right in front of its cameras!',
  },
  {
    id: 'martian-blueberries-water',
    stepNumber: 3,
    shortLabel: '3. Water Blueberries!',
    visualFlowIcon: '🫐',
    visualFlowCaption: 'Found Water Pebbles',
    whenLabel: 'STEP 3 OF 6 • SPRING 2004 • INSIDE EAGLE CRATER',
    headline: 'Wait—Are Those Blueberries on Mars?! Proof That Water Once Soaked the Ground!',
    kidStory:
      'When Oppy rolled off its lander inside Eagle Crater, scientists zoomed in with its cameras and gasped: scattered all over the red dirt were thousands of tiny, round gray-blue balls that looked just like blueberries in a muffin! Oppy used its spinning diamond rock grinder (the RAT) and microscope arm to test them. They were "hematite"—a mineral that ONLY grows inside wet, water-soaked rock! Oppy proved Mars once had real liquid water!',
    spokenNarration:
      'Step 3: Discovering Martian blueberries made by water! Right inside Eagle Crater, Opportunity spotted thousands of tiny round gray pebbles that looked like blueberries in a muffin! Using its diamond rock grinder and microscope arm, Oppy proved those pebbles were hematite minerals that only grow inside wet, water-soaked ground!',
    kidTakeaway:
      '🫐 Not For Eating! "Martian Blueberries" are BB-sized iron-oxide spheres formed billions of years ago when salty groundwater soaked through the rocks!',
  },
  {
    id: 'wind-cleaning-car-wash',
    stepNumber: 4,
    shortLabel: '4. Wind Car-Wash!',
    visualFlowIcon: '🌪️',
    visualFlowCaption: 'Wind Cleaned Solar Wings',
    whenLabel: 'STEP 4 OF 6 • 90 DAYS TURNS INTO YEARS • LUCKY WIND GUSTS',
    headline: 'Built for Only 90 Days—Saved Again & Again by a Martian Wind Car-Wash!',
    kidStory:
      'Engineers thought Oppy would only live for 90 Martian days because red dust falling from the sky would cover its solar panels and block the Sun. Sure enough, Oppy’s panels got dusty and its battery dropped low! But then—WHOOSH!—friendly Martian wind gusts and spinning dust devils swept right across Oppy’s deck and blew the dust off like a free car-wash! With sparkling clean solar wings, Oppy’s battery jumped back to 95% so it could keep exploring for years!',
    spokenNarration:
      'Step 4: Saved by a lucky Martian wind car-wash! Engineers thought Opportunity would only last ninety days before red Martian dust covered its solar panels and drained its battery. Instead, friendly Martian wind gusts and dust devils kept sweeping the dust right off Oppy’s solar wings, recharging its power back to nearly one hundred percent!',
    kidTakeaway:
      '🌬️ Nature’s Helper:NASA never built a windshield wiper on Opportunity—wild Martian whirlwinds cleaned its solar panels dozens of times over 14 years!',
  },
  {
    id: 'mars-marathon-record',
    stepNumber: 5,
    shortLabel: '5. 28-Mile Marathon!',
    visualFlowIcon: '🏁',
    visualFlowCaption: 'Drove 28-Mile Record',
    whenLabel: 'STEP 5 OF 6 • 2004–2015 • CRATER-TO-CRATER ROAD TRIP',
    headline: 'First Marathon on Another Planet: 28 Miles Across Four Giant Craters!',
    kidStory:
      'Because the wind kept cleaning its solar wings, little Oppy drove farther than any wheel had ever rolled on another world! Over 14 years, it drove from Eagle Crater to Endurance Crater, found a shiny iron space meteorite ("Heat Shield Rock"), explored giant cliff-walled Victoria Crater, and reached 14-mile-wide Endeavour Crater! In 2015, Oppy crossed the 26.2-mile Marathon finish line—setting an all-time space driving record of 28.06 miles (45.16 km)!',
    spokenNarration:
      'Step 5: Running the first marathon on another planet! With clean solar wings, Opportunity kept driving from crater to crater for over fourteen years and even found a shiny iron meteorite! In 2015, Oppy crossed the twenty-six-point-two-mile marathon finish line and set the all-time space driving record of twenty-eight miles!',
    kidTakeaway:
      '🏅 Top Speed = 1 Inch Per Second: Oppy drove super carefully—about 100 times slower than a walking human—yet still finished a full 26.2-mile marathon!',
  },
  {
    id: 'planet-dust-storm-goodnight',
    stepNumber: 6,
    shortLabel: '6. Goodnight Oppy (5,111 Days)',
    visualFlowIcon: '💤',
    visualFlowCaption: '55× Longer Than Planned!',
    whenLabel: 'STEP 6 OF 6 • JUNE 10, 2018 (SOL 5,111) • PERSEVERANCE VALLEY',
    headline: '5,111 Days on Mars (55× Longer Than Planned!) & "Goodnight Oppy"',
    kidStory:
      'Built for just 90 days, Oppy explored Mars for an unbelievable 5,111 Martian days—almost 15 Earth years! Then in June 2018, while Oppy was exploring Perseverance Valley, a monster dust storm grew until it swallowed the ENTIRE planet Mars. The sky turned pitch black at noon, blocking 99.99% of sunlight. With no sun for its solar wings, Oppy sent one last quiet signal on June 10, 2018—poetically remembered as "My battery is low and it’s getting dark"—and went to sleep as Mars’s greatest champion!',
    spokenNarration:
      'Step 6: Five thousand days on Mars and Goodnight Oppy! Built for just ninety days, Opportunity explored Mars for five thousand one hundred and eleven days—fifty-five times longer than planned! In June 2018, a giant planet-wide dust storm blocked out the Sun in Perseverance Valley, and our champion rover went to sleep under the Martian stars.',
    kidTakeaway:
      '💛 Forever Remembered: Opportunity lasted 55 times longer than its 90-day goal and rests today in appropriately named "Perseverance Valley" on Mars!',
  },
];

export const OpportunityScrollStory: React.FC<OpportunityScrollStoryProps> = ({
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
    const scene = OPPORTUNITY_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `opportunity-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < OPPORTUNITY_SCENES.length) {
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
              🛞 Meet &ldquo;Oppy&rdquo; — Mars’s 28-Mile Marathon Champion!
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How Opportunity Explored Mars for 15 Years (2003 – 2018)
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
          {OPPORTUNITY_SCENES.map((sc, idx) => {
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
        {OPPORTUNITY_SCENES.map((scene, idx) => {
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
                {/* SCENE 1: FOLDED LIKE ORIGAMI INSIDE A ROCKET (1 -> 2 -> 3)    */}
                {/* ============================================================= */}
                {idx === 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                    {/* Real NASA Launch Photo */}
                    <div className="lg:col-span-4 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-black">
                      <img
                        src="/images/missions/opportunity-launch.jpg"
                        alt="NASA Opportunity Rover (MER-B) Delta II launch to Mars"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                        <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                          📸 Real NASA Photo: July 7, 2003
                        </span>
                        <span className="text-xs text-slate-200">
                          Oppy’s Delta II rocket lighting up the Florida night sky on its way to Mars!
                        </span>
                      </div>
                    </div>

                    {/* 1 -> 2 -> 3 Visual Story Animation: Fold Like Origami -> Rocket Blastoff -> Earth to Mars */}
                    <div className="lg:col-span-8 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-3 sm:p-4 flex items-center justify-center">
                      <svg
                        viewBox="0 0 600 235"
                        className="w-full h-60 overflow-visible"
                      >
                        {/* PANEL 1: Fold Up Like Origami */}
                        <g transform="translate(105, 118)">
                          <rect
                            x="-92"
                            y="-102"
                            width="184"
                            height="204"
                            rx="14"
                            fill="#0c1536"
                            stroke="#38bdf8"
                            strokeWidth="2"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                            1. FOLD LIKE ORIGAMI
                          </text>

                          {/* Pyramid Lander Shell */}
                          <polygon
                            points="0,-46 -58,38 58,38"
                            fill="#1e293b"
                            stroke="#fbbf24"
                            strokeWidth="2.5"
                            strokeDasharray="5 3"
                          />

                          {/* Animated Folding Solar Wings */}
                          <g>
                            <animateTransform
                              attributeName="transform"
                              type="scale"
                              values="1,1; 0.55,0.75; 1,1"
                              dur="2.4s"
                              repeatCount="indefinite"
                            />
                            <rect x="-42" y="-6" width="84" height="22" rx="4" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
                            <rect x="-22" y="12" width="44" height="18" rx="4" fill="#f59e0b" />
                            <circle cx="-20" cy="32" r="7" fill="#94a3b8" stroke="#ffffff" strokeWidth="1.5" />
                            <circle cx="0" cy="32" r="7" fill="#94a3b8" stroke="#ffffff" strokeWidth="1.5" />
                            <circle cx="20" cy="32" r="7" fill="#94a3b8" stroke="#ffffff" strokeWidth="1.5" />
                            {/* Camera Mast Folding Down */}
                            <line x1="0" y1="-6" x2="0" y2="-28" stroke="#fde047" strokeWidth="3" />
                            <rect x="-10" y="-36" width="20" height="9" rx="3" fill="#f8fafc" stroke="#38bdf8" strokeWidth="1.5" />
                          </g>

                          <text x="0" y="64" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                            6 Wheels + Solar Wings
                          </text>
                          <text x="0" y="82" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                            Tucked in Triangle Shell!
                          </text>
                        </g>

                        {/* Arrow 1 -> 2 */}
                        <text x="206" y="122" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="bold">
                          ➔
                        </text>

                        {/* PANEL 2: Night Rocket Launch */}
                        <g transform="translate(302, 118)">
                          <rect
                            x="-85"
                            y="-102"
                            width="170"
                            height="204"
                            rx="14"
                            fill="#0c1536"
                            stroke="#f59e0b"
                            strokeWidth="2"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                            2. NIGHT BLASTOFF!
                          </text>

                          {/* Animated Rocket Rising */}
                          <g>
                            <animateTransform
                              attributeName="transform"
                              type="translate"
                              values="0,16; 0,-22; 0,16"
                              dur="2.2s"
                              repeatCount="indefinite"
                            />
                            {/* Flame */}
                            <polygon points="-12,26 12,26 0,58" fill="#f97316" />
                            <polygon points="-6,26 6,26 0,46" fill="#fef08a" />
                            {/* Rocket Body */}
                            <rect x="-13" y="-22" width="26" height="48" rx="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                            {/* Nosecone with Oppy inside */}
                            <polygon points="-15,-22 15,-22 0,-52" fill="#f8fafc" stroke="#fbbf24" strokeWidth="2" />
                            <text x="0" y="6" textAnchor="middle" fill="#060814" fontSize="9" fontWeight="bold">
                              OPPY
                            </text>
                          </g>

                          <text x="0" y="64" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                            Delta II Rocket
                          </text>
                          <text x="0" y="82" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                            July 7, 2003
                          </text>
                        </g>

                        {/* Arrow 2 -> 3 */}
                        <text x="396" y="122" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="bold">
                          ➔
                        </text>

                        {/* PANEL 3: 7-Month Cruise from Earth to Mars */}
                        <g transform="translate(495, 118)">
                          <rect
                            x="-92"
                            y="-102"
                            width="184"
                            height="204"
                            rx="14"
                            fill="#0c1536"
                            stroke="#34d399"
                            strokeWidth="2"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                            3. 7 MONTHS TO MARS!
                          </text>

                          {/* Earth */}
                          <circle cx="-54" cy="18" r="18" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
                          <circle cx="-58" cy="14" r="7" fill="#34d399" />
                          <text x="-54" y="48" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                            Earth
                          </text>

                          {/* Dotted Arc */}
                          <path
                            d="M -34 8 Q 0 -52 34 -10"
                            fill="none"
                            stroke="#fde047"
                            strokeWidth="3"
                            strokeDasharray="6 5"
                          />

                          {/* Flying Capsule */}
                          <g>
                            <animateTransform
                              attributeName="transform"
                              type="translate"
                              values="-34,8; 0,-26; 34,-10"
                              dur="2.2s"
                              repeatCount="indefinite"
                            />
                            <polygon points="0,-9 -10,6 10,6" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
                          </g>

                          {/* Mars */}
                          <circle cx="54" cy="-6" r="22" fill="#dc2626" stroke="#fca5a5" strokeWidth="2" />
                          <text x="54" y="28" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">
                            Mars
                          </text>

                          <text x="0" y="68" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                            283 Million Miles!
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* SCENE 2: 24 BOUNCY AIRBAGS & HOLE-IN-ONE INTO EAGLE CRATER!   */}
                {/* ============================================================= */}
                {idx === 1 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                    {/* Real NASA Photo of Opportunity's Empty Lander Inside Eagle Crater */}
                    <div className="lg:col-span-4 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-black">
                      <img
                        src="/images/missions/opportunity-eagle-lander.jpg"
                        alt="Real NASA photo of Opportunity's deflated airbag lander inside Eagle Crater on Mars"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                        <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                          📸 Real Photo Inside Eagle Crater!
                        </span>
                        <span className="text-xs text-slate-200">
                          Oppy looked back and photographed its flat airbag lander platform right inside the crater!
                        </span>
                      </div>
                    </div>

                    {/* 1 -> 2 -> 3 Visual Story Animation: Inflate Airbags -> Bounce Into Crater -> Unfold Wings */}
                    <div className="lg:col-span-8 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-3 sm:p-4 flex items-center justify-center">
                      <svg
                        viewBox="0 0 600 235"
                        className="w-full h-60 overflow-visible"
                      >
                        {/* PANEL 1: 24 Giant Airbags Inflate */}
                        <g transform="translate(95, 118)">
                          <rect
                            x="-84"
                            y="-102"
                            width="168"
                            height="204"
                            rx="14"
                            fill="#171226"
                            stroke="#fbbf24"
                            strokeWidth="2"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                            1. 24 AIRBAGS PUFF UP!
                          </text>

                          {/* Parachute on top */}
                          <path d="M -28 -52 Q 0 -75 28 -52 Z" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
                          <line x1="-22" y1="-52" x2="-6" y2="-28" stroke="#e2e8f0" strokeWidth="1.5" />
                          <line x1="22" y1="-52" x2="6" y2="-28" stroke="#e2e8f0" strokeWidth="1.5" />

                          {/* Pulsing Airbag Cluster */}
                          <g>
                            <animateTransform
                              attributeName="transform"
                              type="scale"
                              values="0.85; 1.08; 0.85"
                              dur="1.6s"
                              repeatCount="indefinite"
                            />
                            <circle cx="-18" cy="-8" r="18" fill="#fbbf24" stroke="#fef08a" strokeWidth="2" />
                            <circle cx="18" cy="-8" r="18" fill="#fbbf24" stroke="#fef08a" strokeWidth="2" />
                            <circle cx="-18" cy="20" r="18" fill="#fbbf24" stroke="#fef08a" strokeWidth="2" />
                            <circle cx="18" cy="20" r="18" fill="#fbbf24" stroke="#fef08a" strokeWidth="2" />
                            <circle cx="0" cy="6" r="20" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                            <text x="0" y="10" textAnchor="middle" fill="#060814" fontSize="10" fontWeight="bold">
                              OPPY
                            </text>
                          </g>

                          <text x="0" y="64" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                            Giant Beach-Ball Cushion
                          </text>
                          <text x="0" y="82" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                            Protects Rover Inside!
                          </text>
                        </g>

                        {/* Arrow 1 -> 2 */}
                        <text x="188" y="122" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">
                          ➔
                        </text>

                        {/* PANEL 2: BOING! 26 Bounces Straight Into Eagle Crater ("Hole in One!") */}
                        <g transform="translate(302, 118)">
                          <rect
                            x="-100"
                            y="-102"
                            width="200"
                            height="204"
                            rx="14"
                            fill="#1f1218"
                            stroke="#f97316"
                            strokeWidth="2"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#fdba74" fontSize="13" fontWeight="bold">
                            2. BOUNCED 26 TIMES!
                          </text>

                          {/* Martian Ground + Eagle Crater Bowl */}
                          <path
                            d="M -90 25 L -15 25 Q 35 65 85 25 L 92 25"
                            fill="none"
                            stroke="#ea580c"
                            strokeWidth="5"
                          />
                          <text x="35" y="54" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                            ⛳ EAGLE CRATER!
                          </text>

                          {/* Bounce Trail Arcs */}
                          <path
                            d="M -78 16 Q -55 -48 -32 16 Q 2 -32 35 28"
                            fill="none"
                            stroke="#fef08a"
                            strokeWidth="2.5"
                            strokeDasharray="4 4"
                          />

                          {/* Animated Bouncing Airbag Ball */}
                          <g>
                            <animateMotion
                              path="M -78 16 Q -55 -48 -32 16 Q 2 -32 35 28"
                              dur="2.2s"
                              repeatCount="indefinite"
                            />
                            <circle cx="0" cy="-10" r="14" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                            <circle cx="-7" cy="-14" r="8" fill="#f59e0b" />
                            <circle cx="7" cy="-14" r="8" fill="#f59e0b" />
                          </g>

                          <text x="0" y="76" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                            Rolled Right Into the Crater!
                          </text>
                        </g>

                        {/* Arrow 2 -> 3 */}
                        <text x="412" y="122" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">
                          ➔
                        </text>

                        {/* PANEL 3: Petals Open & Oppy Unfolds Solar Wings */}
                        <g transform="translate(508, 118)">
                          <rect
                            x="-84"
                            y="-102"
                            width="168"
                            height="204"
                            rx="14"
                            fill="#0c1536"
                            stroke="#34d399"
                            strokeWidth="2"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                            3. STAND UP &amp; DRIVE!
                          </text>

                          {/* Flat Deflated Lander Petals */}
                          <ellipse cx="0" cy="34" rx="64" ry="9" fill="#94a3b8" stroke="#fde047" strokeWidth="2" />

                          {/* Animated Rover Standing Up & Opening Wings */}
                          <g>
                            <animateTransform
                              attributeName="transform"
                              type="translate"
                              values="0,6; 0,-4; 0,6"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                            {/* Wide Blue Solar Wings */}
                            <polygon points="-58,6 58,6 44,20 -44,20" fill="#0284c7" stroke="#7dd3fc" strokeWidth="2" />
                            {/* Gold Body */}
                            <rect x="-20" y="14" width="40" height="16" rx="3" fill="#f59e0b" />
                            {/* 6 Wheels */}
                            <circle cx="-24" cy="32" r="6" fill="#334155" stroke="#ffffff" strokeWidth="1.5" />
                            <circle cx="0" cy="32" r="6" fill="#334155" stroke="#ffffff" strokeWidth="1.5" />
                            <circle cx="24" cy="32" r="6" fill="#334155" stroke="#ffffff" strokeWidth="1.5" />
                            {/* Tall Pancam Camera Mast */}
                            <line x1="8" y1="6" x2="8" y2="-28" stroke="#fde047" strokeWidth="3.5" />
                            <rect x="-4" y="-36" width="24" height="10" rx="3" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" />
                            <circle cx="3" cy="-31" r="2.5" fill="#0284c7" />
                            <circle cx="13" cy="-31" r="2.5" fill="#0284c7" />
                          </g>

                          <text x="0" y="64" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                            Solar Wings Open!
                          </text>
                          <text x="0" y="82" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                            Ready to Roll Off!
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* SCENE 3: DISCOVERING WATER-FORMED "MARTIAN BLUEBERRIES"!      */}
                {/* ============================================================= */}
                {idx === 2 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                    {/* Real NASA Photo of Martian Blueberries */}
                    <div className="lg:col-span-4 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-black">
                      <img
                        src="/images/missions/opportunity-blueberries.jpg"
                        alt="Real NASA Opportunity Rover photo of round hematite spherules nicknamed Martian Blueberries"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                        <span className="text-xs sm:text-sm font-bold text-sky-300 block">
                          📸 Real Photo: &ldquo;Martian Blueberries&rdquo;!
                        </span>
                        <span className="text-xs text-slate-200">
                          Round hematite mineral balls spotted by Oppy inside Eagle Crater—formed in ancient water!
                        </span>
                      </div>
                    </div>

                    {/* 1 -> 2 -> 3 Visual Story Animation: Ancient Groundwater -> Oppy Grinds & Inspects -> Water Confirmed! */}
                    <div className="lg:col-span-8 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-3 sm:p-4 flex items-center justify-center">
                      <svg
                        viewBox="0 0 600 235"
                        className="w-full h-60 overflow-visible"
                      >
                        {/* PANEL 1: Ancient Water Soaked Underground Rocks */}
                        <g transform="translate(100, 118)">
                          <rect
                            x="-88"
                            y="-102"
                            width="176"
                            height="204"
                            rx="14"
                            fill="#0a1938"
                            stroke="#38bdf8"
                            strokeWidth="2"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                            1. ANCIENT WET MARS
                          </text>

                          {/* Underground Rock with Flowing Water Waves */}
                          <rect x="-68" y="-42" width="136" height="84" rx="10" fill="#7c2d12" stroke="#fdba74" strokeWidth="2" />
                          <path
                            d="M -62 -18 Q -30 -30 0 -18 T 62 -18"
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="4"
                          />
                          <path
                            d="M -62 14 Q -30 2 0 14 T 62 14"
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="4"
                          />

                          {/* Growing Blueberries Inside Wet Rock */}
                          <g>
                            <animate
                              attributeName="opacity"
                              values="0.5;1;0.5"
                              dur="1.8s"
                              repeatCount="indefinite"
                            />
                            <circle cx="-32" cy="-2" r="9" fill="#60a5fa" stroke="#ffffff" strokeWidth="2" />
                            <circle cx="4" cy="-6" r="10" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                            <circle cx="36" cy="2" r="9" fill="#60a5fa" stroke="#ffffff" strokeWidth="2" />
                          </g>

                          <text x="0" y="64" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="bold">
                            💧 Salty Water Soaked Rock
                          </text>
                          <text x="0" y="82" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                            Grew Round Mineral Balls!
                          </text>
                        </g>

                        {/* Arrow 1 -> 2 */}
                        <text x="198" y="122" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">
                          ➔
                        </text>

                        {/* PANEL 2: Oppy Uses Diamond Grinder (RAT) & Microscope Arm */}
                        <g transform="translate(302, 118)">
                          <rect
                            x="-88"
                            y="-102"
                            width="176"
                            height="204"
                            rx="14"
                            fill="#1a1228"
                            stroke="#f59e0b"
                            strokeWidth="2"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                            2. OPPY TESTS PEBBLES
                          </text>

                          {/* Red Martian Ground with Blueberries */}
                          <rect x="-70" y="16" width="140" height="26" rx="6" fill="#9a3412" />
                          <circle cx="-35" cy="14" r="9" fill="#60a5fa" stroke="#e0f2fe" strokeWidth="2" />
                          <circle cx="0" cy="12" r="11" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                          <circle cx="35" cy="14" r="9" fill="#60a5fa" stroke="#e0f2fe" strokeWidth="2" />

                          {/* Robotic Arm Reaching Down */}
                          <polyline
                            points="-58,-42 -20,-42 0,-4"
                            fill="none"
                            stroke="#cbd5e1"
                            strokeWidth="6"
                            strokeLinecap="round"
                          />
                          {/* Spinning RAT Grinder Head */}
                          <g transform="translate(0, -4)">
                            <circle cx="0" cy="0" r="11" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                            <text x="0" y="-16" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                              🔍 Microscope + Drill
                            </text>
                          </g>

                          <text x="0" y="64" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                            🫐 &ldquo;Martian Blueberries&rdquo;
                          </text>
                          <text x="0" y="82" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                            Made of Hematite Iron!
                          </text>
                        </g>

                        {/* Arrow 2 -> 3 */}
                        <text x="400" y="122" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">
                          ➔
                        </text>

                        {/* PANEL 3: Proof Mars Was Once Wet! */}
                        <g transform="translate(502, 118)">
                          <rect
                            x="-88"
                            y="-102"
                            width="176"
                            height="204"
                            rx="14"
                            fill="#082420"
                            stroke="#34d399"
                            strokeWidth="2.5"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                            3. WATER CONFIRMED!
                          </text>

                          <circle cx="0" cy="-12" r="34" fill="#0284c7" stroke="#7dd3fc" strokeWidth="3" />
                          <text x="0" y="-4" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="bold">
                            💧
                          </text>

                          <text x="0" y="44" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                            100% PROOF:
                          </text>
                          <text x="0" y="64" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                            Liquid Water Once
                          </text>
                          <text x="0" y="82" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                            Flowed on Mars!
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* SCENE 4: SAVED BY A MARTIAN WIND CAR-WASH! (1 -> 2 -> 3)      */}
                {/* ============================================================= */}
                {idx === 3 && (
                  <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6 flex items-center justify-center">
                    <svg
                      viewBox="0 0 600 235"
                      className="w-full h-60 overflow-visible"
                    >
                        {/* PANEL 1: After 90 Days, Red Dust Covers Panels */}
                        <g transform="translate(100, 118)">
                          <rect
                            x="-88"
                            y="-102"
                            width="176"
                            height="204"
                            rx="14"
                            fill="#231212"
                            stroke="#f87171"
                            strokeWidth="2"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="bold">
                            1. DUST COVERS WINGS
                          </text>

                          {/* Dusty Brown Solar Panel */}
                          <polygon
                            points="-62,-10 62,-10 48,22 -48,22"
                            fill="#7c2d12"
                            stroke="#fdba74"
                            strokeWidth="2"
                          />
                          <circle cx="-26" cy="4" r="4" fill="#d97706" />
                          <circle cx="0" cy="8" r="5" fill="#d97706" />
                          <circle cx="24" cy="2" r="4" fill="#d97706" />
                          <text x="0" y="-22" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="bold">
                            Thick Red Mars Dust
                          </text>

                          {/* Low Battery */}
                          <rect x="-46" y="36" width="92" height="22" rx="5" fill="#450a0a" stroke="#f87171" strokeWidth="2" />
                          <rect x="-42" y="40" width="22" height="14" rx="2" fill="#ef4444" />
                          <text x="8" y="51" textAnchor="middle" fill="#fecaca" fontSize="11" fontWeight="bold">
                            🪫 25% LOW
                          </text>

                          <text x="0" y="80" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">
                            Almost Out of Power!
                          </text>
                        </g>

                        {/* Arrow 1 -> 2 */}
                        <text x="198" y="122" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">
                          ➔
                        </text>

                        {/* PANEL 2: Friendly Martian Wind Gust Blows Dust Off! */}
                        <g transform="translate(302, 118)">
                          <rect
                            x="-88"
                            y="-102"
                            width="176"
                            height="204"
                            rx="14"
                            fill="#0c1938"
                            stroke="#38bdf8"
                            strokeWidth="2"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                            2. WHOOSH! WIND WASH!
                          </text>

                          {/* Solar Panel Half Clean */}
                          <polygon
                            points="-60,2 60,2 46,28 -46,28"
                            fill="#0284c7"
                            stroke="#7dd3fc"
                            strokeWidth="2"
                          />

                          {/* Animated Wind Swirl & Flying Dust Specks */}
                          <g>
                            <animateTransform
                              attributeName="transform"
                              type="translate"
                              values="-35,0; 35,-12; -35,0"
                              dur="1.8s"
                              repeatCount="indefinite"
                            />
                            <path
                              d="M -40 -26 Q -10 -42 25 -22"
                              fill="none"
                              stroke="#bae6fd"
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                            <path
                              d="M -30 -10 Q 0 -24 35 -6"
                              fill="none"
                              stroke="#7dd3fc"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <circle cx="32" cy="-24" r="4" fill="#f97316" />
                            <circle cx="44" cy="-12" r="3.5" fill="#fb923c" />
                            <circle cx="38" cy="-34" r="3" fill="#fdba74" />
                          </g>

                          <text x="0" y="62" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                            🌪️ Martian Whirlwind
                          </text>
                          <text x="0" y="80" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                            Sweeps Dust Away!
                          </text>
                        </g>

                        {/* Arrow 2 -> 3 */}
                        <text x="400" y="122" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">
                          ➔
                        </text>

                        {/* PANEL 3: Shiny Clean Wings = 95% Battery for 15 Years! */}
                        <g transform="translate(502, 118)">
                          <rect
                            x="-88"
                            y="-102"
                            width="176"
                            height="204"
                            rx="14"
                            fill="#082420"
                            stroke="#34d399"
                            strokeWidth="2.5"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                            3. RECHARGED TO 95%!
                          </text>

                          {/* Bright Sun */}
                          <circle cx="0" cy="-42" r="15" fill="#fde047" />

                          {/* Sparkling Clean Blue Solar Wings */}
                          <polygon
                            points="-62,-6 62,-6 48,22 -48,22"
                            fill="#0284c7"
                            stroke="#fef08a"
                            strokeWidth="2.5"
                          />
                          <text x="-32" y="12" fill="#fef08a" fontSize="13">
                            ✨
                          </text>
                          <text x="22" y="12" fill="#fef08a" fontSize="13">
                            ✨
                          </text>

                          {/* Full Green Battery */}
                          <rect x="-50" y="36" width="100" height="22" rx="5" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                          <rect x="-46" y="40" width="84" height="14" rx="2" fill="#10b981" />
                          <text x="0" y="51" textAnchor="middle" fill="#060814" fontSize="11" fontWeight="bold">
                            🔋 95% FULL!
                          </text>

                          <text x="0" y="80" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                            Kept Driving for 15 Years!
                          </text>
                        </g>
                      </svg>
                  </div>
                )}

                {/* ============================================================= */}
                {/* SCENE 5: 28-MILE MARS MARATHON ACROSS 4 CRATERS!              */}
                {/* ============================================================= */}
                {idx === 4 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                    {/* Real NASA Photo of Opportunity's Wheel Tracks & Crater */}
                    <div className="lg:col-span-4 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-emerald-400/50 bg-black">
                      <img
                        src="/images/missions/opportunity-marathon-tracks.jpg"
                        alt="Real NASA photo of Opportunity Rover wheel tracks stretching across Mars"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                        <span className="text-xs sm:text-sm font-bold text-emerald-300 block">
                          📸 Real Photo: Oppy’s Marathon Tracks!
                        </span>
                        <span className="text-xs text-slate-200">
                          28.06 miles (45.16 km) of wheel tracks carved across the red plains of Mars!
                        </span>
                      </div>
                    </div>

                    {/* Continuous Animated Mars Marathon Map: Eagle -> Endurance -> Victoria -> Endeavour (28 Miles!) */}
                    <div className="lg:col-span-8 rounded-2xl bg-[#070b1e] border border-emerald-400/35 p-3 sm:p-4 flex items-center justify-center">
                      <svg
                        viewBox="0 0 600 235"
                        className="w-full h-60 overflow-visible"
                      >
                        <rect
                          x="10"
                          y="12"
                          width="580"
                          height="210"
                          rx="16"
                          fill="#171124"
                          stroke="#34d399"
                          strokeWidth="2.5"
                        />
                        <text x="300" y="38" textAnchor="middle" fill="#fde047" fontSize="15" fontWeight="bold">
                          🏁 FIRST MARATHON ON ANOTHER PLANET: 28.06 MILES (2004 – 2018)!
                        </text>

                        {/* Continuous Tire-Track Road Across Mars */}
                        <path
                          d="M 65 135 Q 180 85 290 135 T 525 120"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="4"
                          strokeDasharray="8 6"
                        />

                        {/* Stop 1: Eagle Crater (0 mi) */}
                        <g transform="translate(65, 135)">
                          <ellipse cx="0" cy="0" rx="26" ry="14" fill="#7c2d12" stroke="#fdba74" strokeWidth="2" />
                          <text x="0" y="-22" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                            1. Eagle Crater
                          </text>
                          <text x="0" y="28" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                            Start (0 mi)
                          </text>
                        </g>

                        {/* Stop 2: Endurance Crater + Iron Meteorite */}
                        <g transform="translate(195, 110)">
                          <ellipse cx="0" cy="0" rx="32" ry="16" fill="#7c2d12" stroke="#fdba74" strokeWidth="2" />
                          <circle cx="28" cy="-16" r="9" fill="#94a3b8" stroke="#ffffff" strokeWidth="1.5" />
                          <text x="0" y="-30" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                            2. Endurance + ☄️ Meteorite
                          </text>
                          <text x="0" y="32" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                            Found Space Iron!
                          </text>
                        </g>

                        {/* Stop 3: Giant Scalloped Victoria Crater */}
                        <g transform="translate(345, 135)">
                          <ellipse cx="0" cy="0" rx="40" ry="20" fill="#7c2d12" stroke="#fdba74" strokeWidth="2.5" />
                          <text x="0" y="-28" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                            3. Victoria Crater
                          </text>
                          <text x="0" y="36" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                            Mile 7 • Giant Cliffs!
                          </text>
                        </g>

                        {/* Stop 4: Huge Endeavour Crater + 26.2-Mile Marathon Finish Line */}
                        <g transform="translate(515, 120)">
                          <ellipse cx="0" cy="0" rx="52" ry="26" fill="#064e3b" stroke="#34d399" strokeWidth="3" />
                          <text x="0" y="-34" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                            4. Endeavour Crater
                          </text>
                          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                            🏁 26.2 MI MARATHON!
                          </text>
                          <text x="0" y="42" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                            Record: 28.06 Miles!
                          </text>
                        </g>

                        {/* Animated Mini Oppy Driving the Whole Trail! */}
                        <g>
                          <animateMotion
                            path="M 65 135 Q 180 85 290 135 T 525 120"
                            dur="4.5s"
                            repeatCount="indefinite"
                          />
                          <rect x="-14" y="-12" width="28" height="12" rx="3" fill="#0284c7" stroke="#fef08a" strokeWidth="2" />
                          <circle cx="-9" cy="3" r="4" fill="#fde047" />
                          <circle cx="0" cy="3" r="4" fill="#fde047" />
                          <circle cx="9" cy="3" r="4" fill="#fde047" />
                          <line x1="6" y1="-12" x2="6" y2="-24" stroke="#fde047" strokeWidth="2.5" />
                          <rect x="1" y="-28" width="10" height="5" rx="1.5" fill="#ffffff" />
                        </g>

                        <text x="300" y="204" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                          🏆 Longest Distance Ever Driven by Any Robot on Another Planet!
                        </text>
                      </svg>
                    </div>
                  </div>
                )}

                {/* ============================================================= */}
                {/* SCENE 6: 5,111 DAYS (55x LONGER!) & 2018 GLOBAL DUST STORM    */}
                {/* ============================================================= */}
                {idx === 5 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                    {/* Real NASA Image of the 2018 Global Dust Storm Blotting Out the Sun */}
                    <div className="lg:col-span-4 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-black">
                      <img
                        src="/images/missions/opportunity-dust-storm.jpg"
                        alt="Real NASA Opportunity image showing the Martian Sun dimming during the June 2018 global dust storm"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                        <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                          📸 Real NASA Image: June 2018 Dust Storm
                        </span>
                        <span className="text-xs text-slate-200">
                          How the monster planet-wide dust storm blotted out the noon Sun over Perseverance Valley!
                        </span>
                      </div>
                    </div>

                    {/* 1 -> 2 -> 3 Visual Story Animation: 90 Days vs 5,111 Days -> Giant Dust Storm Blocks Sun -> Goodnight Oppy */}
                    <div className="lg:col-span-8 rounded-2xl bg-[#070b1e] border border-amber-400/35 p-3 sm:p-4 flex items-center justify-center">
                      <svg
                        viewBox="0 0 600 235"
                        className="w-full h-60 overflow-visible"
                      >
                        {/* PANEL 1: 90-Day Goal vs 5,111 Days Achieved! */}
                        <g transform="translate(100, 118)">
                          <rect
                            x="-88"
                            y="-102"
                            width="176"
                            height="204"
                            rx="14"
                            fill="#0c1536"
                            stroke="#38bdf8"
                            strokeWidth="2"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                            1. 55× LONGER LIFE!
                          </text>

                          {/* Tiny 90-Day Planned Bar */}
                          <text x="-70" y="-38" fill="#bae6fd" fontSize="11" fontWeight="bold">
                            Planned: 90 Days
                          </text>
                          <rect x="-70" y="-30" width="22" height="14" rx="3" fill="#38bdf8" />

                          {/* Huge 5,111-Day Actual Bar */}
                          <text x="-70" y="6" fill="#fde047" fontSize="11" fontWeight="bold">
                            Actual: 5,111 Days!
                          </text>
                          <rect x="-70" y="14" width="140" height="22" rx="5" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
                          <text x="0" y="29" textAnchor="middle" fill="#060814" fontSize="11" fontWeight="bold">
                            NEARLY 15 YEARS!
                          </text>

                          <text x="0" y="64" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                            🏅 55 Times Longer
                          </text>
                          <text x="0" y="82" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                            Than Engineers Expected!
                          </text>
                        </g>

                        {/* Arrow 1 -> 2 */}
                        <text x="198" y="122" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">
                          ➔
                        </text>

                        {/* PANEL 2: June 2018 Planet-Wide Dust Storm Blocks the Sun */}
                        <g transform="translate(302, 118)">
                          <rect
                            x="-88"
                            y="-102"
                            width="176"
                            height="204"
                            rx="14"
                            fill="#24140e"
                            stroke="#f97316"
                            strokeWidth="2"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#fdba74" fontSize="13" fontWeight="bold">
                            2. GIANT DUST STORM
                          </text>

                          {/* Sun Getting Covered by Animated Dark Dust Cloud */}
                          <circle cx="0" cy="-24" r="22" fill="#fde047" />
                          <g>
                            <animateTransform
                              attributeName="transform"
                              type="translate"
                              values="-28,0; 0,0; -28,0"
                              dur="2.6s"
                              repeatCount="indefinite"
                            />
                            <ellipse cx="6" cy="-22" rx="46" ry="26" fill="#431407" stroke="#ea580c" strokeWidth="2" />
                            <text x="6" y="-18" textAnchor="middle" fill="#fdba74" fontSize="10" fontWeight="bold">
                              99.99% DARK!
                            </text>
                          </g>

                          <text x="0" y="34" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">
                            No Sunlight at Noon!
                          </text>
                          <text x="0" y="64" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                            Solar Wings Couldn’t
                          </text>
                          <text x="0" y="82" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                            Charge the Battery
                          </text>
                        </g>

                        {/* Arrow 2 -> 3 */}
                        <text x="400" y="122" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">
                          ➔
                        </text>

                        {/* PANEL 3: Goodnight Oppy — Resting Under the Martian Stars */}
                        <g transform="translate(502, 118)">
                          <rect
                            x="-88"
                            y="-102"
                            width="176"
                            height="204"
                            rx="14"
                            fill="#0d132e"
                            stroke="#fbbf24"
                            strokeWidth="2.5"
                          />
                          <text x="0" y="-78" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                            3. GOODNIGHT OPPY 💛
                          </text>

                          {/* Twinkling Stars */}
                          <circle cx="-52" cy="-50" r="2" fill="#ffffff" />
                          <circle cx="48" cy="-46" r="2.5" fill="#fde047" />
                          <circle cx="-20" cy="-56" r="1.8" fill="#bae6fd" />

                          {/* Pulsing Golden Heart Above Sleeping Oppy */}
                          <g>
                            <animateTransform
                              attributeName="transform"
                              type="scale"
                              values="0.92; 1.12; 0.92"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                            <text x="0" y="-22" textAnchor="middle" fontSize="22">
                              💛
                            </text>
                          </g>

                          {/* Sleeping Oppy on Perseverance Valley Slope */}
                          <path d="M -72 28 L 72 18" stroke="#b45309" strokeWidth="5" />
                          <rect x="-32" y="4" width="64" height="12" rx="3" fill="#0284c7" stroke="#fde047" strokeWidth="1.5" />
                          <circle cx="-18" cy="20" r="5.5" fill="#64748b" />
                          <circle cx="0" cy="19" r="5.5" fill="#64748b" />
                          <circle cx="18" cy="18" r="5.5" fill="#64748b" />

                          <text x="0" y="54" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                            &ldquo;My battery is low and
                          </text>
                          <text x="0" y="69" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                            it’s getting dark.&rdquo;
                          </text>
                          <text x="0" y="86" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                            🏆 Mars Champion Forever!
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
              <span>Finished Opportunity’s Story!</span>
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
