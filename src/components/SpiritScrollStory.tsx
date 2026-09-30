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

interface SpiritScrollStoryProps {
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

const SPIRIT_SCENES: StoryScene[] = [
  {
    id: 'launch-twin',
    stepNumber: 1,
    shortLabel: '1. Launch (2003)',
    whenLabel: 'STEP 1 OF 6 • JUNE 10, 2003 • FLORIDA LAUNCH',
    headline: 'First of the Twin Golf-Cart Rovers Blasts Off for Mars!',
    kidStory:
      'In June 2003, NASA launched Spirit (MER-A)—the fearless older twin sister of Opportunity! Folded up like origami inside a triangle protective shell atop a Delta II rocket, Spirit raced 300 million miles toward Gusev Crater, a giant bowl on Mars that scientists thought was once a deep ancient lake!',
    spokenNarration:
      'Step 1: Blastoff of Twin Rover Spirit! In June 2003, Spirit folded up inside a Delta 2 rocket and launched from Florida toward Gusev Crater on Mars, three weeks ahead of its twin sister Opportunity!',
    kidTakeaway:
      '🤖 Twin Robot Geologists: Spirit launched 3 weeks before Opportunity to explore the opposite side of Mars!',
  },
  {
    id: 'airbag-landing',
    stepNumber: 2,
    shortLabel: '2. 28 Airbag Bounces!',
    whenLabel: 'STEP 2 OF 6 • JANUARY 4, 2004 • GUSEV CRATER',
    headline: 'BOING! Bouncing 28 Times Inside 24 Giant Beach-Ball Airbags!',
    kidStory:
      'Slamming into Mars’s sky at 12,000 mph, Spirit popped its parachute, fired braking rockets, and inflated 24 giant airbags around itself! It hit the ground and BOUNCED 28 times across the rocky plain! When it finally stopped rolling, the airbags deflated, 3 metal petals opened flat, and Spirit unfolded its solar wings!',
    spokenNarration:
      'Step 2: Bouncing in twenty-four giant airbags! Spirit slammed into Mars and bounced twenty-eight times inside its beach-ball airbags! When it rolled to a stop in Gusev Crater, the petals opened and Spirit unfolded its solar wings!',
    kidTakeaway:
      '🎈 Tougher Than Steel: Spirit’s airbags were made of Vectran—the same super-strong cloth used in spacesuits and tennis rackets!',
  },
  {
    id: 'dust-devil-carwash',
    stepNumber: 3,
    shortLabel: '3. Dust Devil Car-Wash!',
    whenLabel: 'STEP 3 OF 6 • MARCH 2005 • LUCKY WHIRLWIND RESCUE',
    headline: 'Battery Almost Dead—Then a Spinning Dust Devil Washes Spirit Clean!',
    kidStory:
      'Built for only 90 days, Spirit’s solar panels got covered in thick red Martian dust after a year, and its battery dropped dangerously low! Then on March 9, 2005—WHOOSH!—a spinning Martian dust devil whirlwind swept right over Spirit, vacuuming the dust off its solar wings like a free car-wash and shooting its power back to 93%!',
    spokenNarration:
      'Step 3: Saved by a Martian Dust Devil Car-Wash! After a year on Mars, red dust covered Spirit’s solar panels and drained its battery. Suddenly, a spinning Martian dust devil swept across Spirit and blew the dust clean off, shooting power back up!',
    kidTakeaway:
      '🌪️ Filmed Live on Mars: Spirit even used its cameras to film spinning dust devils racing across the flat floor of Gusev Crater!',
  },
  {
    id: 'husband-hill-climb',
    stepNumber: 4,
    shortLabel: '4. Climbed a Mountain!',
    whenLabel: 'STEP 4 OF 6 • AUGUST 2005 • SUMMIT OF HUSBAND HILL',
    headline: 'First Robot in History to Climb to the Top of a Mountain on Another Planet!',
    kidStory:
      'With recharged solar wings, Spirit drove 2 miles to the Columbia Hills and began a daring 14-month climb up a steep rocky mountain called Husband Hill! Using its 6 bendable "rocker-bogie" mountain-goat legs, Spirit conquered 270 feet (82 meters) of slippery slopes to reach the summit—taking the first-ever mountain-top panorama on Mars!',
    spokenNarration:
      'Step 4: First robot to climb a mountain on another planet! With fresh solar power, Spirit used its six bendable mountain-goat legs to climb 270 feet all the way to the top of Husband Hill, taking a 360-degree view of Mars!',
    kidTakeaway:
      '⛰️ Taller Than the Statue of Liberty: Husband Hill rose 270 feet above the plains—and Spirit climbed every inch on 6 aluminum wheels!',
  },
  {
    id: 'broken-wheel-silica',
    stepNumber: 5,
    shortLabel: '5. Broken Wheel Treasure!',
    whenLabel: 'STEP 5 OF 6 • MAY 2007 • "HOME PLATE" HOT SPRINGS',
    headline: 'A Jammed Wheel Digs a Trench—And Uncovers Ancient Steaming Hot Springs!',
    kidStory:
      'In 2006, Spirit’s right-front wheel motor broke and locked up! Instead of giving up, NASA engineers drove Spirit BACKWARD on 5 working wheels while dragging the stuck 6th wheel behind it like an anchor. In May 2007, that dragging wheel scraped away red dirt and dug up bright-white 90% pure silica—100% proof that Mars once had steaming hot springs!',
    spokenNarration:
      'Step 5: A broken wheel digs up a secret treasure! In 2006, Spirit’s right-front wheel stopped spinning, so engineers drove Spirit backward for years! That dragging wheel dug a trench in the dirt and uncovered bright white silica—proving Mars once had steaming hot springs!',
    kidTakeaway:
      '♨️ Best Accident in Space History: Without that broken wheel scraping a deep trench, the bright white hot-spring silica under the red dust would never have been seen!',
  },
  {
    id: 'troy-sand-trap',
    stepNumber: 6,
    shortLabel: '6. Sand Trap & Legacy',
    whenLabel: 'STEP 6 OF 6 • MARCH 22, 2010 (SOL 2,210) • "TROY" SAND TRAP',
    headline: '24× Longer Than Planned: Resting Forever at "Troy" After 6 Heroic Years!',
    kidStory:
      'Built for just 90 days, fearless Spirit explored Mars for over 6 Earth years (2,210 Martian days)! In 2009, while driving past "Home Plate," Spirit’s wheels broke through a thin crust into hidden baby-powder sand nicknamed "Troy." Unable to tilt its solar wings toward the weak winter sun, Spirit sent its final message on March 22, 2010 and went to sleep!',
    spokenNarration:
      'Step 6: Twenty-four times longer than planned at Sand Trap Troy! Built for just 90 days, fearless Spirit explored Mars for over six years until its wheels got stuck in soft hidden sand called Troy before the freezing winter of 2010!',
    kidTakeaway:
      '🏆 Unstoppable Spirit: Warrantied for 90 days, Spirit lasted 2,210 Martian days—24 times longer than planned—and proved ancient Mars had warm, life-friendly hot springs!',
  },
];

export const SpiritScrollStory: React.FC<SpiritScrollStoryProps> = ({
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
    const scene = SPIRIT_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `spirit-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < SPIRIT_SCENES.length) {
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
              ⛰️ Meet &ldquo;Spirit&rdquo; — Mars’s Mountain-Climbing Hot-Spring Finder!
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How Spirit Climbed a Martian Mountain &amp; Found Hot Springs (2003 – 2010)
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
          {SPIRIT_SCENES.map((sc, idx) => {
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
        {SPIRIT_SCENES.map((scene, idx) => {
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
              {/* SCENE 1: TWIN ROVER FOLDED IN ROCKET -> BLASTOFF TO MARS      */}
              {/* ============================================================= */}
              {idx === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-black">
                    <img
                      src="/images/missions/spirit-rover.jpg"
                      alt="NASA Spirit Mars Exploration Rover (MER-A) on Mars"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Meet Spirit (MER-A) — Twin #1!
                      </span>
                      <span className="text-xs text-slate-200">
                        Golf-cart-sized robot geologist launched June 10, 2003 toward Gusev Crater!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      {/* Panel 1: Folded Inside Nosecone */}
                      <g transform="translate(95, 115)">
                        <rect x="-80" y="-98" width="160" height="196" rx="14" fill="#10193a" stroke="#38bdf8" strokeWidth="2" />
                        <text x="0" y="-74" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                          1. FOLDED IN SHELL
                        </text>
                        <polygon points="0,-42 -48,30 48,30" fill="#1e293b" stroke="#fbbf24" strokeWidth="2.5" />
                        <rect x="-20" y="-4" width="40" height="24" rx="4" fill="#38bdf8" />
                        <text x="0" y="12" textAnchor="middle" fill="#060814" fontSize="10" fontWeight="bold">
                          SPIRIT
                        </text>
                        <text x="0" y="58" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                          6 Wheels Folded Tight
                        </text>
                        <text x="0" y="76" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Like Origami!
                        </text>
                      </g>

                      <text x="186" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                      {/* Panel 2: Rocket Liftoff */}
                      <g transform="translate(280, 115)">
                        <rect x="-80" y="-98" width="160" height="196" rx="14" fill="#10193a" stroke="#f97316" strokeWidth="2" />
                        <text x="0" y="-74" textAnchor="middle" fill="#fdba74" fontSize="13" fontWeight="bold">
                          2. DELTA II LIFTOFF!
                        </text>
                        <g>
                          <animateTransform attributeName="transform" type="translate" values="0,8; 0,-12; 0,8" dur="2s" repeatCount="indefinite" />
                          <polygon points="0,-48 -14,-22 14,-22" fill="#f8fafc" />
                          <rect x="-14" y="-22" width="28" height="42" fill="#0284c7" />
                          <polygon points="-10,20 10,20 0,46" fill="#fbbf24" />
                        </g>
                        <text x="0" y="62" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          June 10, 2003
                        </text>
                        <text x="0" y="78" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                          Roars Off From Florida!
                        </text>
                      </g>

                      <text x="372" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                      {/* Panel 3: 300M Miles to Gusev Crater */}
                      <g transform="translate(465, 115)">
                        <rect x="-80" y="-98" width="160" height="196" rx="14" fill="#10193a" stroke="#34d399" strokeWidth="2" />
                        <text x="0" y="-74" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="bold">
                          3. TO GUSEV CRATER!
                        </text>
                        <circle cx="-38" cy="0" r="14" fill="#0284c7" />
                        <path d="M -20 -6 Q 0 -30 20 -6" fill="none" stroke="#fde047" strokeWidth="2.5" strokeDasharray="4 4" />
                        <circle cx="38" cy="0" r="18" fill="#ea580c" />
                        <text x="0" y="56" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                          300 Million Miles
                        </text>
                        <text x="0" y="74" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Ancient Mars Lakebed!
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 2: BOUNCING IN 24 AIRBAGS -> UNFOLDING PETALS           */}
              {/* ============================================================= */}
              {idx === 1 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 680 230" className="w-full h-56 overflow-visible">
                    {/* Ground */}
                    <path d="M 15 190 L 665 190 L 665 222 L 15 222 Z" fill="#7c2d12" stroke="#fb923c" strokeWidth="2" />

                    {/* Step 1: Parachute & Airbags Inflate */}
                    <g transform="translate(110, 95)">
                      <text x="0" y="-72" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">
                        1. AIRBAGS INFLATE!
                      </text>
                      <path d="M -36 -48 Q 0 -78 36 -48 Z" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                      <line x1="-26" y1="-48" x2="-10" y2="-12" stroke="#cbd5e1" strokeWidth="1.5" />
                      <line x1="26" y1="-48" x2="10" y2="-12" stroke="#cbd5e1" strokeWidth="1.5" />
                      <circle cx="-14" cy="6" r="16" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
                      <circle cx="14" cy="6" r="16" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
                      <circle cx="0" cy="-10" r="16" fill="#fde047" stroke="#f59e0b" strokeWidth="2" />
                      <circle cx="0" cy="18" r="16" fill="#fde047" stroke="#f59e0b" strokeWidth="2" />
                      <text x="0" y="54" textAnchor="middle" fill="#bae6fd" fontSize="12" fontWeight="bold">
                        24 Giant Beach Balls!
                      </text>
                    </g>

                    <text x="225" y="105" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="bold">➔</text>

                    {/* Step 2: Bouncing 28 Times */}
                    <g transform="translate(345, 95)">
                      <text x="0" y="-72" textAnchor="middle" fill="#fb923c" fontSize="14" fontWeight="bold">
                        2. BOUNCED 28 TIMES!
                      </text>
                      <path d="M -75 85 Q -38 5 0 85 Q 38 25 75 85" fill="none" stroke="#fde047" strokeWidth="3" strokeDasharray="6 5" />
                      <g>
                        <animateTransform attributeName="transform" type="translate" values="-40,55; 0,10; 40,65; -40,55" dur="2.2s" repeatCount="indefinite" />
                        <circle cx="-10" cy="0" r="14" fill="#fbbf24" />
                        <circle cx="10" cy="0" r="14" fill="#fbbf24" />
                        <circle cx="0" cy="-12" r="14" fill="#fde047" />
                        <circle cx="0" cy="12" r="14" fill="#fde047" />
                      </g>
                      <text x="0" y="54" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                        Boing! Boing! Boing!
                      </text>
                    </g>

                    <text x="465" y="105" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="bold">➔</text>

                    {/* Step 3: Petals Open & Spirit Stands Up */}
                    <g transform="translate(570, 125)">
                      <text x="0" y="-102" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">
                        3. PETALS OPEN FLAT!
                      </text>
                      <polygon points="-68,55 68,55 45,65 -45,65" fill="#cbd5e1" stroke="#38bdf8" strokeWidth="2" />
                      <rect x="-26" y="18" width="52" height="22" rx="4" fill="#0284c7" stroke="#fde047" strokeWidth="2" />
                      <line x1="12" y1="18" x2="12" y2="-6" stroke="#f8fafc" strokeWidth="3" />
                      <rect x="4" y="-14" width="18" height="10" rx="2" fill="#fde047" />
                      <circle cx="-18" cy="46" r="8" fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
                      <circle cx="0" cy="46" r="8" fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
                      <circle cx="18" cy="46" r="8" fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
                      <text x="0" y="-28" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        Ready to Roll in Gusev!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 3: MARTIAN DUST DEVIL CAR-WASH (1 -> 2 -> 3)            */}
              {/* ============================================================= */}
              {idx === 2 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    {/* Panel 1: Dusty Solar Wings */}
                    <g transform="translate(100, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#231212" stroke="#f87171" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="bold">
                        1. DUST COVERS WINGS
                      </text>
                      <polygon points="-60,-8 60,-8 46,22 -46,22" fill="#7c2d12" stroke="#fdba74" strokeWidth="2" />
                      <text x="0" y="-20" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="bold">
                        Red Dust Blocks Sun
                      </text>
                      <rect x="-46" y="34" width="92" height="22" rx="5" fill="#450a0a" stroke="#f87171" strokeWidth="2" />
                      <rect x="-42" y="38" width="22" height="14" rx="2" fill="#ef4444" />
                      <text x="10" y="49" textAnchor="middle" fill="#fecaca" fontSize="11" fontWeight="bold">
                        🪫 28% LOW!
                      </text>
                      <text x="0" y="76" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">
                        Almost Out of Power!
                      </text>
                    </g>

                    <text x="198" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 2: Spinning Dust Devil Sweeps Over Spirit */}
                    <g transform="translate(300, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#0c1938" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                        2. DUST DEVIL CAR-WASH!
                      </text>
                      <polygon points="-58,6 58,6 44,30 -44,30" fill="#0284c7" stroke="#7dd3fc" strokeWidth="2" />
                      <g>
                        <animateTransform attributeName="transform" type="translate" values="-32,0; 32,-8; -32,0" dur="1.8s" repeatCount="indefinite" />
                        <path d="M -22 -44 Q 0 -54 22 -44 Q -18 -26 18 -18 Q -12 -6 12 2" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" />
                        <circle cx="28" cy="-24" r="4" fill="#fb923c" />
                        <circle cx="38" cy="-12" r="3.5" fill="#f97316" />
                      </g>
                      <text x="0" y="58" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                        🌪️ March 9, 2005 Whirlwind
                      </text>
                      <text x="0" y="76" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                        Vacuums the Dust Off!
                      </text>
                    </g>

                    <text x="400" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 3: Sparkling Clean Wings = 93% Power */}
                    <g transform="translate(500, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#082420" stroke="#34d399" strokeWidth="2.5" />
                      <text x="0" y="-74" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        3. POWER JUMPS TO 93%!
                      </text>
                      <circle cx="0" cy="-38" r="14" fill="#fde047" />
                      <polygon points="-60,-6 60,-6 46,22 -46,22" fill="#0284c7" stroke="#fef08a" strokeWidth="2.5" />
                      <rect x="-50" y="34" width="100" height="22" rx="5" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                      <rect x="-46" y="38" width="84" height="14" rx="2" fill="#10b981" />
                      <text x="0" y="49" textAnchor="middle" fill="#060814" fontSize="11" fontWeight="bold">
                        🔋 93% FULL!
                      </text>
                      <text x="0" y="76" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        Ready to Climb a Mountain!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 4: CLIMBING 270 FEET UP HUSBAND HILL                    */}
              {/* ============================================================= */}
              {idx === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-black">
                    <img
                      src="/images/missions/spirit-husband-hill.jpg"
                      alt="NASA Spirit Rover view from the summit of Husband Hill on Mars"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Real NASA Photo: Summit of Husband Hill!
                      </span>
                      <span className="text-xs text-slate-200">
                        First time any robot climbed to the top of a mountain on another world!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      <path d="M 20 205 L 150 195 L 430 55 L 540 55 L 540 218 L 20 218 Z" fill="#7c2d12" stroke="#fb923c" strokeWidth="3" />
                      <path d="M 45 192 Q 230 150 420 50" fill="none" stroke="#fde047" strokeWidth="3.5" strokeDasharray="8 6" />

                      {/* Summit Flag */}
                      <g transform="translate(455, 55)">
                        <line x1="0" y1="0" x2="0" y2="-38" stroke="#fde047" strokeWidth="3" />
                        <polygon points="0,-38 72,-26 0,-14" fill="#10b981" />
                        <text x="36" y="-23" textAnchor="middle" fill="#060814" fontSize="10" fontWeight="bold">
                          270 FT TOP!
                        </text>
                      </g>

                      {/* Animated Spirit Climbing */}
                      <g>
                        <animateTransform attributeName="transform" type="translate" values="165,152; 355,68; 165,152" dur="3.6s" repeatCount="indefinite" />
                        <g transform="rotate(-22)">
                          <rect x="-36" y="-22" width="72" height="20" rx="4" fill="#38bdf8" stroke="#fde047" strokeWidth="2" />
                          <text x="0" y="-8" textAnchor="middle" fill="#060814" fontSize="10" fontWeight="bold">
                            SPIRIT
                          </text>
                          <circle cx="-24" cy="4" r="8" fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
                          <circle cx="0" cy="4" r="8" fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
                          <circle cx="24" cy="4" r="8" fill="#1e293b" stroke="#f8fafc" strokeWidth="2" />
                        </g>
                      </g>

                      <text x="165" y="45" textAnchor="middle" fill="#fde047" fontSize="15" fontWeight="bold">
                        ⛰️ FIRST MOUNTAIN CLIMB ON MARS!
                      </text>
                      <text x="165" y="68" textAnchor="middle" fill="#bae6fd" fontSize="13" fontWeight="bold">
                        Climbed 270 Feet Up Husband Hill (As Tall as the Statue of Liberty!)
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 5: JAMMED WHEEL DIGS UP 90% PURE HOT-SPRING SILICA!     */}
              {/* ============================================================= */}
              {idx === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-emerald-400/50 bg-black">
                    <img
                      src="/images/missions/spirit-silica-trench.jpg"
                      alt="NASA Spirit Rover bright white silica soil uncovered by its stuck wheel on Mars"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-emerald-300 block">
                        📸 Real NASA Photo: Bright White Silica Trench!
                      </span>
                      <span className="text-xs text-slate-200">
                        90% pure white silica scraped up by Spirit’s stuck wheel—proof of ancient hot springs!
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-emerald-400/35 p-3 sm:p-4 flex items-center justify-center">
                    <svg viewBox="0 0 560 230" className="w-full h-60 overflow-visible">
                      {/* Panel 1: 1 Wheel Breaks -> Drives Backward */}
                      <g transform="translate(95, 115)">
                        <rect x="-80" y="-98" width="160" height="196" rx="14" fill="#1e132a" stroke="#f87171" strokeWidth="2" />
                        <text x="0" y="-74" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="bold">
                          1. 1 WHEEL JAMS!
                        </text>
                        <rect x="-38" y="-18" width="76" height="22" rx="4" fill="#38bdf8" />
                        <circle cx="-26" cy="12" r="10" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                        <circle cx="0" cy="12" r="10" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                        <circle cx="26" cy="12" r="11" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2.5" />
                        <text x="26" y="16" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="bold">✕</text>
                        <text x="0" y="54" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          ⬅️ Drives Backward
                        </text>
                        <text x="0" y="72" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                          Dragging Stuck Wheel!
                        </text>
                      </g>

                      <text x="186" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                      {/* Panel 2: Dragging Wheel Scrapes White Silica */}
                      <g transform="translate(280, 115)">
                        <rect x="-80" y="-98" width="160" height="196" rx="14" fill="#10193a" stroke="#fde047" strokeWidth="2" />
                        <text x="0" y="-74" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                          2. DIGS WHITE DIRT!
                        </text>
                        <rect x="-64" y="14" width="128" height="22" rx="4" fill="#9a3412" />
                        <rect x="-42" y="12" width="84" height="12" rx="4" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" />
                        <text x="0" y="-6" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">
                          ✨ 90% Pure Silica!
                        </text>
                        <text x="0" y="56" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Hidden Under Red Dust
                        </text>
                        <text x="0" y="74" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">
                          Like a Treasure Shovel!
                        </text>
                      </g>

                      <text x="372" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                      {/* Panel 3: Proof of Ancient Steaming Hot Springs */}
                      <g transform="translate(465, 115)">
                        <rect x="-80" y="-98" width="160" height="196" rx="14" fill="#082420" stroke="#34d399" strokeWidth="2.5" />
                        <text x="0" y="-74" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                          3. HOT SPRINGS PROOF!
                        </text>
                        <ellipse cx="0" cy="12" rx="46" ry="18" fill="#0284c7" stroke="#7dd3fc" strokeWidth="2.5" />
                        <text x="0" y="-18" textAnchor="middle" fill="#fde047" fontSize="22">
                          ♨️💧
                        </text>
                        <text x="0" y="54" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                          Warm Steaming Water
                        </text>
                        <text x="0" y="72" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          Perfect for Ancient Life!
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 6: 24X LONGER THAN PLANNED & "TROY" SAND TRAP           */}
              {/* ============================================================= */}
              {idx === 5 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6">
                  <svg viewBox="0 0 600 230" className="w-full h-56 overflow-visible">
                    {/* Panel 1: 90 Days Goal vs 2,210 Days Actual */}
                    <g transform="translate(100, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#101836" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                        1. 24× LONGER LIFE!
                      </text>
                      <text x="0" y="-44" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                        Planned: Only 90 Days
                      </text>
                      <rect x="-64" y="-34" width="22" height="14" rx="3" fill="#94a3b8" />
                      <text x="0" y="4" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        Actual: 2,210 Days (6+ Yrs!)
                      </text>
                      <rect x="-64" y="14" width="128" height="18" rx="4" fill="#10b981" stroke="#fef08a" strokeWidth="1.5" />
                      <text x="0" y="68" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        Drove 4.8 Miles on Mars!
                      </text>
                    </g>

                    <text x="198" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 2: Soft Sand Trap "Troy" */}
                    <g transform="translate(300, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#231212" stroke="#f59e0b" strokeWidth="2" />
                      <text x="0" y="-74" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">
                        2. &ldquo;TROY&rdquo; SAND TRAP
                      </text>
                      <path d="M -70 18 Q 0 42 70 18 L 70 48 L -70 48 Z" fill="#b45309" />
                      <rect x="-32" y="-8" width="64" height="20" rx="4" fill="#38bdf8" />
                      <circle cx="-20" cy="20" r="9" fill="#1e293b" stroke="#fde047" strokeWidth="2" />
                      <circle cx="0" cy="22" r="9" fill="#1e293b" stroke="#fde047" strokeWidth="2" />
                      <circle cx="20" cy="20" r="9" fill="#1e293b" stroke="#fde047" strokeWidth="2" />
                      <text x="0" y="70" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="bold">
                        Wheels Sank in Soft Sand!
                      </text>
                    </g>

                    <text x="400" y="120" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">➔</text>

                    {/* Panel 3: Sleeping Hero */}
                    <g transform="translate(500, 115)">
                      <rect x="-88" y="-98" width="176" height="196" rx="14" fill="#0d132e" stroke="#34d399" strokeWidth="2.5" />
                      <text x="0" y="-74" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                        3. GOODNIGHT SPIRIT!
                      </text>
                      <text x="0" y="-12" textAnchor="middle" fill="#fde047" fontSize="30">
                        🏆💤
                      </text>
                      <text x="0" y="34" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                        March 22, 2010
                      </text>
                      <text x="0" y="54" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        Proved Ancient Mars Had
                      </text>
                      <text x="0" y="72" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        Warm Water Hot Springs!
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
              <span>Finished Spirit’s Story!</span>
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
