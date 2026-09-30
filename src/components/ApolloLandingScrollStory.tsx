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

interface ApolloLandingScrollStoryProps {
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

const APOLLO_SCENES: StoryScene[] = [
  {
    id: 'launch-golden-bug',
    stepNumber: 1,
    shortLabel: '1. Launch & Gold Bug',
    whenLabel: 'STEP 1 OF 6 • JULY 16, 1969 • BLASTOFF FROM FLORIDA',
    headline: 'Riding a 36-Story Rocket With a Golden "Spider Spaceship" Inside!',
    kidStory:
      'How did humans travel 240,000 miles to the Moon for the first time? In July 1969, Apollo 11 blasted off from Florida on top of the giant Saturn V rocket—as tall as a 36-story skyscraper! Tucked inside was a special two-part Moon lander named "Eagle." Because space and the Moon have zero air or wind, Eagle didn’t need airplane wings! Instead, it looked like a boxy bug with 4 spider legs and shiny gold-foil blankets to block +250°F sunlight!',
    spokenNarration:
      'Step 1: Riding a 36-story rocket with a golden spider spaceship inside! To travel two hundred and forty thousand miles to the Moon, Apollo astronauts launched inside the giant Saturn Five rocket. Tucked inside was the Eagle Moon Lander. Because the Moon has zero air or wind, Eagle did not need airplane wings! Instead, it had four spider legs and shiny gold foil blankets to block scorching sunlight!',
    kidTakeaway:
      '💡 Why It Looked Like a Golden Bug: Because it only flew in the airless vacuum of space (zero wind resistance!), engineers skipped heavy wings and wrapped its thin aluminum walls in shiny gold foil to save weight and fuel!',
  },
  {
    id: 'dodging-boulders-25-sec',
    stepNumber: 2,
    shortLabel: '2. Dodging Boulders!',
    whenLabel: 'STEP 2 OF 6 • JULY 20, 1969 • "THE EAGLE HAS LANDED!"',
    headline: 'Smart Computer Rescue & Dodging Sharp Boulders With 25 Seconds of Fuel Left!',
    kidStory:
      'As Eagle flew down toward the Moon, its computer flashed a scary "1202 Overload Alarm" because too many radar signals rushed in at once! Thankfully, smart priority software led by NASA engineer Margaret Hamilton automatically dropped extra chores and kept the landing engines working! Then astronaut Neil Armstrong looked out the window and saw Eagle heading straight for a crater full of sharp boulders! He grabbed the joystick, hovered sideways past the rocks, and touched down on flat gray dust with only 25 seconds of fuel left!',
    spokenNarration:
      'Step 2: Smart computer rescue and dodging boulders with 25 seconds of fuel left! As Eagle descended toward the Moon, Margaret Hamilton’s smart computer software handled a 1202 overload alarm by dropping extra chores to keep the landing engines running. Then Neil Armstrong saw a crater full of sharp boulders ahead, steered sideways over the rocks, and landed safely on flat dust with just 25 seconds of fuel left!',
    kidTakeaway:
      '🕹️ Heroic Teamwork: Margaret Hamilton’s smart priority software stopped a computer crash, and Neil Armstrong steered past the boulders to announce: "Houston, Tranquility Base here. The Eagle has landed!"',
  },
  {
    id: 'moonwalkers-rocks-laser',
    stepNumber: 3,
    shortLabel: '3. Rocks & Laser Mirror',
    whenLabel: 'STEP 3 OF 6 • 1969–1972 • 12 MOONWALKERS & SCIENCE GEAR',
    headline: '12 Astronauts Walk on the Moon, Scoop 842 Pounds of Rocks & Set Up a Laser Mirror!',
    kidStory:
      'Neil Armstrong climbed down the 9-rung ladder on Eagle’s front leg, stepped into the powdery gray dust, and said: "That’s one small step for a man, one giant leap for mankind!" Across six landings (Apollo 11, 12, 14, 15, 16, and 17), 12 astronauts walked on the Moon! Because Moon gravity is 6 times weaker than Earth’s, they hopped like kangaroos, scooped up 842 pounds of ancient Moon rocks, and placed a special Laser Mirror tray in the dirt that scientists on Earth STILL bounce laser beams off today!',
    spokenNarration:
      'Step 3: Twelve Moonwalkers, Moon rocks, and the Laser Mirror! Across six Apollo landings, twelve astronauts climbed down the ladder to walk and hop on the Moon. They brought home 842 pounds of Moon rocks and set up a special Laser Mirror on the dirt. Even today, scientists on Earth bounce laser beams off that mirror, proving the Moon is slowly drifting one and a half inches farther from Earth every year!',
    kidTakeaway:
      '🔬 What the Laser Mirror Discovered: By bouncing laser beams from Earth off Apollo’s Moon mirror (which needs zero battery power!), scientists proved the Moon is slowly spiraling 1.5 inches (3.8 cm) farther away from Earth every year!',
  },
  {
    id: 'unfolding-moon-buggy',
    stepNumber: 4,
    shortLabel: '4. Unfolding Moon Car',
    whenLabel: 'STEP 4 OF 6 • APOLLO 15, 16 & 17 • 3 ELECTRIC MOON BUGGIES',
    headline: 'Unfolding an Electric Moon Buggy Like a Suitcase From the Lander’s Side!',
    kidStory:
      'Hopping in a puffy spacesuit makes astronauts tired fast—so on the last three missions (Apollo 15, 16, and 17), NASA packed an electric car! How do you fit a car inside a small Moon lander? You fold its wheels and seats flat like a lawn chair and strap it inside a side drawer on the golden lander! On the Moon, astronauts pulled two ropes and the 4-wheel-drive Moon Buggy popped out and unfolded! Its tires were woven out of springy piano wire instead of air-filled rubber so sharp rocks could never pop them!',
    spokenNarration:
      'Step 4: Unfolding an electric Moon Buggy like a suitcase! On Apollo 15, 16, and 17, astronauts pulled two ropes on the side of the golden lander to unfold a four-wheel-drive electric Moon Buggy! Its tires were made of woven piano-wire mesh so they could never get a flat tire as astronauts drove across lunar mountains!',
    kidTakeaway:
      '🏎️ Built for Lunar Mountains: Three electric Moon Buggies let astronauts drive miles away from their lander at up to 11.2 miles per hour—and all 3 Moon Buggies are still parked on the Moon right now!',
  },
  {
    id: 'why-half-stayed-behind',
    stepNumber: 5,
    shortLabel: '5. Why Half Stayed!',
    whenLabel: 'STEP 5 OF 6 • TIME TO FLY HOME • TWO-PIECE LIFTOFF SECRET',
    headline: 'Mystery Solved: Why Did Astronauts Leave 6 Golden Landers on the Moon?',
    kidStory:
      'Here is the secret of the Apollo Landing Hardware: How do you launch off the Moon when there is no launch tower on the Moon? Engineers built the lander in TWO separate halves! When it was time to go home, the astronauts climbed into the silver Top Cabin. With a loud POP, bolts disconnected the two halves, and the Top Cabin fired its rocket engine—using the Golden Bottom Half sitting in the dust as its own launchpad! The Top Cabin flew the astronauts home, leaving all 6 golden bottom halves on the Moon!',
    spokenNarration:
      'Step 5: Mystery solved—why astronauts left six golden landers on the Moon! Because there is no launch tower on the Moon, the lander was built in two separate halves. To fly home, the astronauts climbed into the silver Top Cabin and fired its rocket engine, using the Golden Bottom Half right on the Moon as their launchpad! The top half flew home while the six golden bottom halves stayed on the Moon!',
    kidTakeaway:
      '🚀 Genius Two-Piece Launchpad: Leaving the heavy landing legs, empty fuel tanks, and Moon Buggies behind made the silver Top Cabin light enough to blast back into orbit with a small rocket!',
  },
  {
    id: 'footprints-million-years',
    stepNumber: 6,
    shortLabel: '6. Footprints Forever!',
    whenLabel: 'STEP 6 OF 6 • STILL ON THE MOON TODAY • ZERO WIND OR RAIN',
    headline: 'Still Parked on the Moon Right Now: Why Footprints & Tire Tracks Never Fade!',
    kidStory:
      'When you look up at the Moon tonight, 6 golden lander bottom stages and 3 electric Moon Buggies are still sitting quietly in the gray lunar dust! Even cooler, every single bootprint and buggy tire track pressed into the dirt over 50 years ago is still razor-sharp today! Why? On Earth, wind and rain wash footprints away in a day. But the Moon has ZERO air, ZERO wind, and ZERO rain—so nothing ever blows the dust around! NASA’s Lunar Reconnaissance Orbiter even photographed the landers and footpaths from space!',
    spokenNarration:
      'Step 6: Still parked on the Moon right now! Today, six gold-foil descent stages and three electric Moon Buggies are still sitting on the Moon. On Earth, wind and rain wash footprints away quickly. But because the Moon has no air, wind, or rain, the astronauts’ footprints and Moon Buggy tracks are still sharp after more than 50 years and will last for millions of years!',
    kidTakeaway:
      '🌕 Preserved for Millions of Years: Without air, wind, or rain on the Moon, the 6 golden descent stages, 3 electric Moon Buggies, and astronaut footprints stay crisp like a time capsule!',
  },
];

export const ApolloLandingScrollStory: React.FC<ApolloLandingScrollStoryProps> = ({
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
    const scene = APOLLO_SCENES[stepIdx];
    if (!scene) return;

    setActiveStep(stepIdx);
    cardRefs.current[stepIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    playLoudNarration({
      clipKey: `apollo-${stepIdx + 1}`,
      fallbackText: scene.spokenNarration,
      onStart: () => {
        setSpeakingStep(stepIdx);
      },
      onEnd: () => {
        setSpeakingStep(null);
        if (continueAutoTour && autoPlayRef.current) {
          if (stepIdx + 1 < APOLLO_SCENES.length) {
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
              🌕 Meet &ldquo;Eagle&rdquo; &amp; the Moon Buggies — The Spaceships That Landed Humans on the Moon!
            </span>
            <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white mt-0.5">
              How 12 Astronauts Landed on the Moon &amp; What They Left Behind (1969 – 1972)
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
          {APOLLO_SCENES.map((sc, idx) => {
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
        {APOLLO_SCENES.map((scene, idx) => {
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
              <div className="space-y-3">
                <h4 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
                  {scene.headline}
                </h4>
                <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-normal">
                  {scene.kidStory}
                </p>
              </div>

              {/* ============================================================= */}
              {/* SCENE 1: REAL APOLLO PHOTO + EARTH-TO-MOON GOLDEN LANDER TRIP */}
              {/* ============================================================= */}
              {idx === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  {/* Real Photo of Apollo 11 Eagle Lander & Astronaut */}
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/apollo-landing-hardware.jpg"
                      alt="Real NASA photo of Apollo 11 Lunar Module Eagle and Buzz Aldrin on the Moon"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        📸 Real NASA Photo: Apollo 11&rsquo;s &ldquo;Eagle&rdquo; on the Moon!
                      </span>
                      <span className="text-xs text-slate-200">
                        See the shiny gold foil on the bottom half and the 4 wide spider legs!
                      </span>
                    </div>
                  </div>

                  {/* Live Animation: Saturn V Blastoff & Golden Spider Lander Flying to the Moon */}
                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 flex flex-col justify-between min-h-[17rem]">
                    <span className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wider block text-center">
                      🎬 Live Animation: 240,000-Mile Flight From Earth to the Moon!
                    </span>

                    <svg viewBox="0 0 520 215" className="w-full h-56 overflow-visible my-auto">
                      {/* Stars */}
                      <circle cx="95" cy="30" r="1.8" fill="#ffffff" opacity="0.8" />
                      <circle cx="210" cy="20" r="2" fill="#fde047" opacity="0.9" />
                      <circle cx="340" cy="28" r="1.8" fill="#ffffff" opacity="0.8" />
                      <circle cx="430" cy="115" r="1.8" fill="#7dd3fc" opacity="0.8" />

                      {/* LEFT: EARTH + 36-STORY SATURN V ROCKET */}
                      <g transform="translate(62, 138)">
                        <circle cx="0" cy="0" r="34" fill="#0284c7" stroke="#38bdf8" strokeWidth="2.5" />
                        <path d="M -18 -14 Q -4 -22 10 -8 Q 18 4 4 16 Q -12 12 -18 -14 Z" fill="#34d399" />
                        <circle cx="-10" cy="14" r="8" fill="#34d399" />
                        <text x="0" y="52" textAnchor="middle" fill="#bae6fd" fontSize="13" fontWeight="bold">
                          🌍 Earth (Florida)
                        </text>

                        {/* Mini Saturn V Rocket Launching Up from Earth */}
                        <g transform="translate(0, -48)">
                          <polygon points="0,-24 -8,-10 8,-10" fill="#f8fafc" stroke="#38bdf8" strokeWidth="1.5" />
                          <rect x="-8" y="-10" width="16" height="24" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
                          <rect x="-8" y="-2" width="16" height="6" fill="#0f172a" />
                          <polygon points="-6,14 6,14 0,26" fill="#f97316">
                            <animate attributeName="opacity" values="1;0.4;1" dur="0.4s" repeatCount="indefinite" />
                          </polygon>
                          <text x="0" y="-30" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                            🚀 36-Story Saturn V
                          </text>
                        </g>
                      </g>

                      {/* RIGHT: THE MOON */}
                      <g transform="translate(452, 74)">
                        <circle cx="0" cy="0" r="36" fill="#cbd5e1" stroke="#f8fafc" strokeWidth="2.5" />
                        <circle cx="-12" cy="-10" r="7" fill="#94a3b8" />
                        <circle cx="14" cy="8" r="9" fill="#94a3b8" />
                        <circle cx="-6" cy="16" r="5" fill="#94a3b8" />
                        <text x="0" y="54" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                          🌕 The Moon
                        </text>
                        <text x="0" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                          (Zero Air or Wind!)
                        </text>
                      </g>

                      {/* Curved Dashed Flight Path From Earth to Moon */}
                      <path
                        d="M 102 110 Q 255 20 408 66"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                        strokeDasharray="8 6"
                      />

                      {/* ANIMATED GOLDEN SPIDER LANDER ("EAGLE") FLYING ALONG THE PATH */}
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="210,82; 285,58; 210,82"
                          dur="3.2s"
                          repeatCount="indefinite"
                        />

                        {/* Thruster Puff Behind Lander */}
                        <polygon points="-44,6 -26,-2 -26,14" fill="#fde047">
                          <animate attributeName="opacity" values="1;0.3;1" dur="0.45s" repeatCount="indefinite" />
                        </polygon>

                        {/* Top Silver Cabin (Ascent Stage) */}
                        <polygon
                          points="-22,-4 22,-4 28,-28 -28,-28"
                          fill="#e2e8f0"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                        />
                        {/* Two Triangular Windows */}
                        <polygon points="-16,-10 -4,-10 -8,-20" fill="#0284c7" />
                        <polygon points="16,-10 4,-10 8,-20" fill="#0284c7" />
                        <text x="0" y="-34" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">
                          1. Silver Top Cabin (Crew)
                        </text>

                        {/* Bottom Golden Base (Descent Stage) */}
                        <rect
                          x="-28"
                          y="-4"
                          width="56"
                          height="22"
                          rx="4"
                          fill="#f59e0b"
                          stroke="#fef08a"
                          strokeWidth="2.5"
                        />
                        <text x="0" y="10" textAnchor="middle" fill="#060814" fontSize="10" fontWeight="bold">
                          GOLD FOIL
                        </text>

                        {/* 4 Spider Legs + Round Footpads */}
                        <line x1="-26" y1="14" x2="-42" y2="32" stroke="#fbbf24" strokeWidth="3" />
                        <line x1="26" y1="14" x2="42" y2="32" stroke="#fbbf24" strokeWidth="3" />
                        <line x1="-12" y1="18" x2="-18" y2="34" stroke="#fbbf24" strokeWidth="2.5" />
                        <line x1="12" y1="18" x2="18" y2="34" stroke="#fbbf24" strokeWidth="2.5" />
                        <ellipse cx="-42" cy="33" rx="7" ry="2.5" fill="#fde047" />
                        <ellipse cx="42" cy="33" rx="7" ry="2.5" fill="#fde047" />

                        <text x="0" y="50" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          2. Gold Base + 4 Spider Legs!
                        </text>
                      </g>

                      {/* Bottom Explanation Bar Inside SVG */}
                      <rect x="85" y="172" width="350" height="34" rx="10" fill="#10193a" stroke="#fbbf24" strokeWidth="1.8" />
                      <text x="260" y="194" textAnchor="middle" fill="#fef08a" fontSize="12" fontWeight="bold">
                        🛡️ No Air in Space = No Wings Needed! Gold Foil Blocks +250°F Sun!
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 2: SMART COMPUTER & DODGING SHARP BOULDERS TO LAND!     */}
              {/* ============================================================= */}
              {idx === 1 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6 space-y-2">
                  <span className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider block text-center">
                    🎬 Watch How Neil Armstrong &amp; Margaret Hamilton’s Code Saved the Apollo 11 Landing!
                  </span>

                  <svg viewBox="0 0 680 265" className="w-full h-64 overflow-visible">
                    {/* TOP LEFT HUD: MARGARET HAMILTON'S SMART COMPUTER */}
                    <g transform="translate(140, 46)">
                      <rect x="-125" y="-34" width="250" height="68" rx="12" fill="#0d1b2a" stroke="#34d399" strokeWidth="2.5" />
                      <text x="0" y="-12" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                        💻 1. COMPUTER ALARM 1202 FIXED!
                      </text>
                      <text x="0" y="6" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        ✅ Margaret Hamilton’s Smart Code
                      </text>
                      <text x="0" y="22" textAnchor="middle" fill="#bae6fd" fontSize="11">
                        Dropped Extra Chores &amp; Kept Engines On!
                      </text>
                    </g>

                    {/* TOP RIGHT HUD: 25 SECONDS OF FUEL GAUGE */}
                    <g transform="translate(535, 46)">
                      <rect x="-130" y="-34" width="260" height="68" rx="12" fill="#1f1224" stroke="#fbbf24" strokeWidth="2.5" />
                      <text x="0" y="-12" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                        ⛽ 3. FUEL TANK ALMOST EMPTY!
                      </text>
                      {/* Fuel Bar Background */}
                      <rect x="-95" y="-2" width="190" height="14" rx="7" fill="#060814" stroke="#cbd5e1" strokeWidth="1.5" />
                      {/* Animated Low Fuel Bar */}
                      <rect x="-92" y="1" width="42" height="8" rx="4" fill="#ef4444">
                        <animate attributeName="opacity" values="1;0.35;1" dur="0.6s" repeatCount="indefinite" />
                      </rect>
                      <text x="0" y="26" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">
                        Landed With Only 25 Seconds of Fuel Left!
                      </text>
                    </g>

                    {/* LUNAR GROUND AT BOTTOM */}
                    <rect x="12" y="206" width="656" height="48" rx="10" fill="#334155" stroke="#64748b" strokeWidth="2" />

                    {/* LEFT SIDE OF GROUND: DANGEROUS CRATER FULL OF SHARP BOULDERS */}
                    <g transform="translate(165, 206)">
                      {/* Crater Pit */}
                      <ellipse cx="0" cy="4" rx="115" ry="14" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                      {/* Sharp Jagged Boulders Sticking Up */}
                      <polygon points="-85,6 -60,-34 -35,6" fill="#64748b" stroke="#cbd5e1" strokeWidth="2" />
                      <polygon points="-40,8 -10,-42 22,8" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
                      <polygon points="15,6 45,-30 75,6" fill="#64748b" stroke="#cbd5e1" strokeWidth="2" />
                      <polygon points="55,8 78,-22 98,8" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
                      <text x="0" y="26" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">
                        ❌ DANGER: Crater Full of Sharp Boulders!
                      </text>
                    </g>

                    {/* RIGHT SIDE OF GROUND: SMOOTH FLAT LANDING PAD */}
                    <g transform="translate(505, 206)">
                      <rect x="-110" y="-4" width="220" height="10" rx="5" fill="#34d399" />
                      <text x="0" y="26" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">
                        ✅ SAFE FLAT DUST: &ldquo;The Eagle Has Landed!&rdquo;
                      </text>
                    </g>

                    {/* Dashed Flight Path Showing Sideways Hover Over Boulders to Safe Zone */}
                    <path
                      d="M 155 118 Q 330 96 505 152"
                      fill="none"
                      stroke="#fde047"
                      strokeWidth="3.5"
                      strokeDasharray="8 6"
                    />
                    <text x="330" y="96" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                      2. Neil Steers Sideways Over the Boulders! ➔
                    </text>

                    {/* ANIMATED EAGLE LANDER FLYING PAST BOULDERS TO LAND ON THE RIGHT */}
                    <g>
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="165,124; 340,115; 505,158; 505,158; 165,124"
                        keyTimes="0; 0.4; 0.75; 0.9; 1"
                        dur="4.8s"
                        repeatCount="indefinite"
                      />

                      {/* Braking Rocket Flame Shooting Down */}
                      <polygon points="-12,20 12,20 0,48" fill="#f97316">
                        <animate attributeName="opacity" values="1;0.4;1" dur="0.3s" repeatCount="indefinite" />
                      </polygon>
                      <polygon points="-7,20 7,20 0,36" fill="#fef08a" />

                      {/* Silver Top Cabin */}
                      <polygon
                        points="-22,-4 22,-4 28,-26 -28,-26"
                        fill="#e2e8f0"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                      <polygon points="-15,-9 -4,-9 -8,-18" fill="#0284c7" />
                      <polygon points="15,-9 4,-9 8,-18" fill="#0284c7" />

                      {/* Gold Bottom Base */}
                      <rect
                        x="-26"
                        y="-4"
                        width="52"
                        height="20"
                        rx="3"
                        fill="#f59e0b"
                        stroke="#fef08a"
                        strokeWidth="2"
                      />
                      <text x="0" y="9" textAnchor="middle" fill="#060814" fontSize="9" fontWeight="bold">
                        EAGLE
                      </text>

                      {/* 4 Spider Landing Legs */}
                      <line x1="-24" y1="14" x2="-38" y2="30" stroke="#fbbf24" strokeWidth="3" />
                      <line x1="24" y1="14" x2="38" y2="30" stroke="#fbbf24" strokeWidth="3" />
                      <ellipse cx="-38" cy="31" rx="6" ry="2.5" fill="#fde047" />
                      <ellipse cx="38" cy="31" rx="6" ry="2.5" fill="#fde047" />
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 3: 12 MOONWALKERS, 842 LBS OF ROCKS & LASER MIRROR!     */}
              {/* ============================================================= */}
              {idx === 2 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6 space-y-2">
                  <span className="text-xs sm:text-sm font-bold text-sky-300 uppercase tracking-wider block text-center">
                    🎬 Live Animation: Hopping on the Moon, Scooping Rocks &amp; Bouncing Lasers to Earth!
                  </span>

                  <svg viewBox="0 0 680 260" className="w-full h-64 overflow-visible">
                    {/* Lunar Surface Ground */}
                    <path
                      d="M 10 198 Q 180 190 350 198 T 670 194 L 670 248 L 10 248 Z"
                      fill="#475569"
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />
                    <text x="340" y="232" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">
                      👨‍🚀 6 Apollo Landings × 2 Moonwalkers Each = 12 Astronauts Walked on the Moon!
                    </text>

                    {/* PART 1 (LEFT): GOLDEN LANDER WITH LADDER + FLAG */}
                    <g transform="translate(95, 152)">
                      {/* Silver Top Cabin */}
                      <polygon points="-28,-8 28,-8 36,-38 -36,-38" fill="#e2e8f0" stroke="#38bdf8" strokeWidth="2.5" />
                      <polygon points="-18,-15 -5,-15 -10,-28" fill="#0284c7" />
                      <polygon points="18,-15 5,-15 10,-28" fill="#0284c7" />

                      {/* Golden Base */}
                      <rect x="-34" y="-8" width="68" height="26" rx="4" fill="#f59e0b" stroke="#fef08a" strokeWidth="2.5" />

                      {/* Spider Legs */}
                      <line x1="-32" y1="16" x2="-50" y2="42" stroke="#fbbf24" strokeWidth="3.5" />
                      <line x1="32" y1="16" x2="50" y2="42" stroke="#fbbf24" strokeWidth="3.5" />
                      <ellipse cx="-50" cy="43" rx="8" ry="3" fill="#fde047" />
                      <ellipse cx="50" cy="43" rx="8" ry="3" fill="#fde047" />

                      {/* 9-Rung Ladder on Front Leg */}
                      <line x1="20" y1="14" x2="34" y2="42" stroke="#0f172a" strokeWidth="4" />
                      <line x1="22" y1="20" x2="28" y2="20" stroke="#fde047" strokeWidth="2" />
                      <line x1="25" y1="27" x2="31" y2="27" stroke="#fde047" strokeWidth="2" />
                      <line x1="28" y1="34" x2="34" y2="34" stroke="#fde047" strokeWidth="2" />

                      {/* Planted Flag Next to Lander */}
                      <line x1="68" y1="-15" x2="68" y2="42" stroke="#f8fafc" strokeWidth="2.5" />
                      <rect x="68" y="-15" width="32" height="18" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                      <rect x="68" y="-15" width="14" height="10" fill="#1d4ed8" />

                      <text x="10" y="-50" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">
                        1. Climbed Down Ladder!
                      </text>
                    </g>

                    {/* PART 2 (CENTER): HOPPING ASTRONAUT + 842 POUNDS OF MOON ROCKS */}
                    <g transform="translate(295, 152)">
                      {/* Animated Hopping Astronaut in White Spacesuit */}
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="0,0; 0,-26; 0,0"
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                        {/* PLSS Backpack */}
                        <rect x="-18" y="-24" width="12" height="24" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                        {/* Spacesuit Body */}
                        <rect x="-10" y="-22" width="22" height="24" rx="6" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
                        {/* Chest Control Box */}
                        <rect x="-3" y="-16" width="10" height="8" rx="2" fill="#38bdf8" />
                        {/* Helmet + Golden Sun Visor */}
                        <circle cx="1" cy="-34" r="13" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                        <ellipse cx="4" cy="-34" rx="8" ry="6" fill="#f59e0b" />
                        {/* Legs & Boots */}
                        <line x1="-4" y1="2" x2="-8" y2="22" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                        <line x1="6" y1="2" x2="12" y2="22" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                        <ellipse cx="-8" cy="24" rx="6" ry="3" fill="#64748b" />
                        <ellipse cx="12" cy="24" rx="6" ry="3" fill="#64748b" />
                        {/* Arm Holding Rock Scoop */}
                        <line x1="10" y1="-14" x2="32" y2="8" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
                        <line x1="32" y1="8" x2="46" y2="24" stroke="#fbbf24" strokeWidth="3" />
                      </g>

                      {/* Sparkling Pile of Ancient Moon Rocks */}
                      <g transform="translate(65, 34)">
                        <polygon points="-18,8 -10,-8 4,-6 12,8" fill="#e2e8f0" stroke="#38bdf8" strokeWidth="2" />
                        <polygon points="4,10 14,-10 28,-4 32,10" fill="#cbd5e1" stroke="#fde047" strokeWidth="2" />
                        <polygon points="-4,12 6,-2 18,12" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
                        <text x="8" y="-16" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          ✨ 842 lbs of Rocks!
                        </text>
                      </g>

                      <text x="20" y="-64" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        2. Hop &amp; Scoop Moon Rocks!
                      </text>
                    </g>

                    {/* PART 3 (RIGHT): APOLLO LASER MIRROR BOUNCING LASER BEAMS TO EARTH */}
                    <g transform="translate(535, 168)">
                      {/* Laser Mirror Stand on the Moon */}
                      <rect x="-28" y="8" width="56" height="16" rx="3" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
                      {/* Tilted Mirror Tray with Quartz Prisms */}
                      <polygon
                        points="-30,8 22,-16 32,-8 -20,16"
                        fill="#38bdf8"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <text x="0" y="38" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">
                        🪞 Laser Mirror (Zero Battery!)
                      </text>

                      {/* Earth High in the Lunar Sky */}
                      <g transform="translate(68, -118)">
                        <circle cx="0" cy="0" r="22" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                        <circle cx="-6" cy="-4" r="8" fill="#34d399" />
                        <circle cx="7" cy="6" r="6" fill="#34d399" />
                        <text x="-12" y="-28" textAnchor="middle" fill="#bae6fd" fontSize="12" fontWeight="bold">
                          🌍 3. Earth Shoots Laser!
                        </text>
                      </g>

                      {/* Animated Green Laser Beam Bouncing Between Earth and Mirror */}
                      <line
                        x1="2"
                        y1="-4"
                        x2="52"
                        y2="-98"
                        stroke="#34d399"
                        strokeWidth="4"
                        strokeDasharray="8 5"
                      >
                        <animate attributeName="opacity" values="1;0.25;1" dur="0.55s" repeatCount="indefinite" />
                      </line>

                      <text x="-38" y="-60" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        ⚡ Laser Bounces Back!
                      </text>
                      <text x="-38" y="-44" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        Moon Drifts 1.5 in/yr!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 4: UNFOLDING & DRIVING THE ELECTRIC MOON BUGGY!         */}
              {/* ============================================================= */}
              {idx === 3 && (
                <div className="rounded-2xl bg-[#070b1e] border border-amber-400/40 p-4 sm:p-6 space-y-2">
                  <span className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider block text-center">
                    🎬 Live Animation: Unfolding Like a Lawn Chair &amp; Driving Across the Moon on Wire-Mesh Tires!
                  </span>

                  <svg viewBox="0 0 680 255" className="w-full h-64 overflow-visible">
                    {/* Rolling Lunar Hills Ground */}
                    <path
                      d="M 10 196 Q 170 184 330 196 T 670 188 L 670 245 L 10 245 Z"
                      fill="#475569"
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />

                    {/* STEP 1 (LEFT): UNFOLDING FROM SIDE OF GOLDEN LANDER */}
                    <g transform="translate(115, 146)">
                      <rect x="-75" y="-42" width="92" height="58" rx="6" fill="#f59e0b" stroke="#fef08a" strokeWidth="2.5" />
                      <text x="-29" y="-18" textAnchor="middle" fill="#060814" fontSize="11" fontWeight="bold">
                        GOLD LANDER
                      </text>
                      <text x="-29" y="-4" textAnchor="middle" fill="#060814" fontSize="10" fontWeight="bold">
                        SIDE DRAWER
                      </text>
                      {/* Leg */}
                      <line x1="-65" y1="16" x2="-85" y2="48" stroke="#fbbf24" strokeWidth="3.5" />
                      <ellipse cx="-85" cy="49" rx="8" ry="3" fill="#fde047" />

                      {/* Animated Unfolding Flap */}
                      <g transform="translate(17, 10)">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          values="-55 17 10; 0 17 10; -55 17 10"
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                        <rect x="0" y="-8" width="52" height="12" rx="3" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="14" cy="8" r="9" fill="#1e293b" stroke="#fde047" strokeWidth="2" />
                        <circle cx="40" cy="8" r="9" fill="#1e293b" stroke="#fde047" strokeWidth="2" />
                      </g>

                      <text x="-10" y="-66" textAnchor="middle" fill="#fde047" fontSize="13" fontWeight="bold">
                        1. Pull 2 Ropes: Car Unfolds!
                      </text>
                      <text x="-10" y="-49" textAnchor="middle" fill="#bae6fd" fontSize="11">
                        Packed Flat Like a Suitcase!
                      </text>
                    </g>

                    {/* Arrow Between Step 1 and Step 2 */}
                    <text x="235" y="135" textAnchor="middle" fill="#fde047" fontSize="26" fontWeight="bold">
                      ➔
                    </text>

                    {/* STEP 2 (CENTER-RIGHT): ANIMATED ELECTRIC MOON BUGGY DRIVING */}
                    <g>
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="365,148; 445,144; 365,148"
                        dur="3s"
                        repeatCount="indefinite"
                      />

                      {/* Chassis Frame */}
                      <rect x="-68" y="6" width="136" height="10" rx="4" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" />

                      {/* Two Lawn-Chair Seats */}
                      <polyline points="-32,6 -32,-18 -12,-18" fill="none" stroke="#94a3b8" strokeWidth="4" />
                      <polyline points="8,6 8,-18 28,-18" fill="none" stroke="#94a3b8" strokeWidth="4" />

                      {/* Astronaut Driver in White Spacesuit */}
                      <rect x="-26" y="-24" width="18" height="22" rx="5" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="-17" cy="-34" r="11" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                      <ellipse cx="-14" cy="-34" rx="7" ry="5" fill="#f59e0b" />
                      {/* Arm Holding T-Bar Steering Stick */}
                      <line x1="-10" y1="-14" x2="8" y2="-8" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                      <line x1="8" y1="-14" x2="8" y2="6" stroke="#fbbf24" strokeWidth="3" />

                      {/* Gold Umbrella Dish Antenna on Front */}
                      <line x1="46" y1="6" x2="46" y2="-32" stroke="#fde047" strokeWidth="3" />
                      <path d="M 26 -32 Q 46 -48 66 -32 Z" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
                      <text x="46" y="-52" textAnchor="middle" fill="#fde047" fontSize="10" fontWeight="bold">
                        📡 TV Camera Dish
                      </text>

                      {/* Orange Dust Fenders Over Wheels */}
                      <path d="M -64 16 Q -42 -2 -20 16" fill="none" stroke="#f97316" strokeWidth="4" />
                      <path d="M 20 16 Q 42 -2 64 16" fill="none" stroke="#f97316" strokeWidth="4" />

                      {/* Woven Piano-Wire Mesh Rear Wheel */}
                      <circle cx="-42" cy="24" r="18" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3.5" strokeDasharray="5 3" />
                      <circle cx="-42" cy="24" r="6" fill="#f97316" />

                      {/* Woven Piano-Wire Mesh Front Wheel */}
                      <circle cx="42" cy="24" r="18" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3.5" strokeDasharray="5 3" />
                      <circle cx="42" cy="24" r="6" fill="#f97316" />
                    </g>

                    {/* Top Right Callout: Why Wire Mesh Tires? */}
                    <g transform="translate(475, 42)">
                      <rect x="-175" y="-28" width="350" height="54" rx="12" fill="#0d1b2a" stroke="#34d399" strokeWidth="2" />
                      <text x="0" y="-6" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                        2. 🛞 Woven Piano-Wire Mesh Tires (No Air Inside!)
                      </text>
                      <text x="0" y="14" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        Sharp Moon Rocks Could Never Pop Them! Drove 11.2 MPH!
                      </text>
                    </g>

                    <text x="455" y="226" textAnchor="middle" fill="#fef08a" fontSize="13" fontWeight="bold">
                      🏎️ Apollo 15, 16 &amp; 17 Drove 3 Electric Moon Buggies Across the Moon!
                    </text>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 5: WHY HALF STAYED ON THE MOON (TWO-PIECE LIFTOFF!)     */}
              {/* ============================================================= */}
              {idx === 4 && (
                <div className="rounded-2xl bg-[#070b1e] border border-sky-400/35 p-4 sm:p-6 space-y-2">
                  <span className="text-xs sm:text-sm font-bold text-emerald-300 uppercase tracking-wider block text-center">
                    🎬 Watch the Two Halves Separate: Silver Top Half Flies Home • Golden Bottom Half Stays on the Moon!
                  </span>

                  <svg viewBox="0 0 680 270" className="w-full h-64 overflow-visible">
                    {/* Lunar Surface Ground */}
                    <rect x="12" y="210" width="656" height="48" rx="10" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
                    <text x="340" y="240" textAnchor="middle" fill="#fef08a" fontSize="13" fontWeight="bold">
                      🌕 Result: All 6 Golden Bottom Halves &amp; 3 Moon Buggies Are Still Sitting on the Moon Today!
                    </text>

                    {/* WAITING COMMAND SHIP IN LUNAR ORBIT (TOP RIGHT) */}
                    <g transform="translate(555, 42)">
                      <polygon points="-24,10 0,-14 24,10" fill="#cbd5e1" stroke="#38bdf8" strokeWidth="2" />
                      <rect x="-16" y="10" width="32" height="18" fill="#94a3b8" stroke="#38bdf8" strokeWidth="2" />
                      <text x="0" y="44" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">
                        🛸 Command Ship Waiting
                      </text>
                      <text x="0" y="58" textAnchor="middle" fill="#bae6fd" fontSize="10">
                        in Orbit to Fly Home to Earth!
                      </text>
                    </g>

                    {/* PARKED MOON BUGGY STAYING ON THE MOON (BOTTOM RIGHT) */}
                    <g transform="translate(520, 192)">
                      <rect x="-36" y="0" width="72" height="6" rx="2" fill="#f8fafc" />
                      <line x1="22" y1="0" x2="22" y2="-18" stroke="#fde047" strokeWidth="2" />
                      <path d="M 12 -18 Q 22 -28 32 -18 Z" fill="#f59e0b" />
                      <circle cx="-22" cy="10" r="10" fill="#1e293b" stroke="#fde047" strokeWidth="2" />
                      <circle cx="22" cy="10" r="10" fill="#1e293b" stroke="#fde047" strokeWidth="2" />
                      <text x="0" y="-32" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        🛞 Parked Moon Buggy Stays Too!
                      </text>
                    </g>

                    {/* PIECE 1 (BOTTOM): GOLDEN DESCENT STAGE STAYING ON THE MOON AS LAUNCHPAD */}
                    <g transform="translate(275, 172)">
                      <rect
                        x="-56"
                        y="-12"
                        width="112"
                        height="34"
                        rx="5"
                        fill="#f59e0b"
                        stroke="#fef08a"
                        strokeWidth="3"
                      />
                      <text x="0" y="4" textAnchor="middle" fill="#060814" fontSize="11" fontWeight="bold">
                        GOLDEN BOTTOM HALF
                      </text>
                      <text x="0" y="16" textAnchor="middle" fill="#060814" fontSize="9.5" fontWeight="bold">
                        (LAUNCHPAD ON MOON)
                      </text>

                      {/* 4 Spider Legs Resting on the Moon */}
                      <line x1="-54" y1="14" x2="-82" y2="38" stroke="#fbbf24" strokeWidth="4" />
                      <line x1="54" y1="14" x2="82" y2="38" stroke="#fbbf24" strokeWidth="4" />
                      <line x1="-26" y1="22" x2="-36" y2="38" stroke="#fbbf24" strokeWidth="3" />
                      <line x1="26" y1="22" x2="36" y2="38" stroke="#fbbf24" strokeWidth="3" />
                      <ellipse cx="-82" cy="39" rx="10" ry="3.5" fill="#fde047" />
                      <ellipse cx="82" cy="39" rx="10" ry="3.5" fill="#fde047" />

                      {/* Left Explanation Box Pointing to Golden Base */}
                      <rect x="-250" y="-22" width="175" height="52" rx="10" fill="#1e1510" stroke="#fbbf24" strokeWidth="2" />
                      <text x="-162" y="-2" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                        1. BOTTOM HALF STAYS!
                      </text>
                      <text x="-162" y="16" textAnchor="middle" fill="#fef08a" fontSize="10.5">
                        Acts as Launchpad on Moon!
                      </text>
                    </g>

                    {/* PIECE 2 (TOP): SILVER ASCENT CABIN BLASTING OFF UPWARD */}
                    <g>
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="275,142; 275,56; 275,142"
                        dur="3.2s"
                        repeatCount="indefinite"
                      />

                      {/* Bright Rocket Flame Shooting Out of Top Half */}
                      <polygon points="-16,2 16,2 0,38" fill="#f97316">
                        <animate attributeName="opacity" values="1;0.4;1" dur="0.3s" repeatCount="indefinite" />
                      </polygon>
                      <polygon points="-9,2 9,2 0,24" fill="#fef08a" />

                      {/* Silver Top Cabin Body */}
                      <polygon
                        points="-42,2 42,2 52,-38 -52,-38"
                        fill="#e2e8f0"
                        stroke="#38bdf8"
                        strokeWidth="3"
                      />
                      {/* Windows */}
                      <polygon points="-28,-10 -8,-10 -14,-26" fill="#0284c7" />
                      <polygon points="28,-10 8,-10 14,-26" fill="#0284c7" />
                      <text x="0" y="-2" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
                        SILVER TOP CABIN
                      </text>

                      {/* Callout Tag Moving With Top Cabin */}
                      <rect x="64" y="-36" width="195" height="44" rx="10" fill="#082420" stroke="#34d399" strokeWidth="2" />
                      <text x="161" y="-17" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        🚀 2. TOP HALF BLASTS OFF!
                      </text>
                      <text x="161" y="-1" textAnchor="middle" fill="#ffffff" fontSize="10.5">
                        Flies Astronauts Back to Earth!
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* ============================================================= */}
              {/* SCENE 6: REAL LRO SPACE PHOTO + EARTH VS. MOON FOOTPRINTS!    */}
              {/* ============================================================= */}
              {idx === 5 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  {/* Left: Real NASA LRO Photo Showing Apollo Lander & Footpaths From Space */}
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-emerald-400/50 bg-[#060814]">
                    <img
                      src="/images/missions/lro-apollo-sites.jpg"
                      alt="Real NASA Lunar Reconnaissance Orbiter photo showing Apollo lander and astronaut footpaths on the Moon"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5">
                      <span className="text-xs sm:text-sm font-bold text-emerald-300 block">
                        📸 Real Photo From Space (NASA’s LRO Orbiter)
                      </span>
                      <span className="text-xs text-slate-200">
                        Photographed 31 miles overhead: you can still see the Apollo lander and dark astronaut footpaths!
                      </span>
                    </div>
                  </div>

                  {/* Right: Animated Comparison — Why Footprints Vanish on Earth vs. Stay Forever on Moon */}
                  <div className="lg:col-span-7 rounded-2xl bg-[#070b1e] border border-emerald-400/40 p-3 sm:p-4 flex flex-col justify-between">
                    <span className="text-xs sm:text-sm font-bold text-emerald-300 uppercase tracking-wider block text-center">
                      🎬 Why Do Footprints Disappear on Earth But Last a Million Years on the Moon?
                    </span>

                    <svg viewBox="0 0 540 220" className="w-full h-56 overflow-visible my-auto">
                      {/* LEFT BOX: ON EARTH (WIND & RAIN ERASE FOOTPRINTS) */}
                      <g transform="translate(135, 110)">
                        <rect x="-125" y="-96" width="250" height="192" rx="14" fill="#10193a" stroke="#38bdf8" strokeWidth="2" />
                        <text x="0" y="-72" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">
                          🌍 ON EARTH: GONE IN 1 DAY!
                        </text>

                        {/* Sandy Beach Ground */}
                        <rect x="-110" y="20" width="220" height="36" rx="6" fill="#d97706" />

                        {/* Fading Footprint on Earth */}
                        <g transform="translate(0, 38)">
                          <animate attributeName="opacity" values="1;0.1;1" dur="2.4s" repeatCount="indefinite" />
                          <ellipse cx="0" cy="0" rx="26" ry="11" fill="#92400e" stroke="#fde047" strokeWidth="1.5" />
                        </g>

                        {/* Animated Wind Gusts & Rain Sweeping Across */}
                        <g>
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="-35,0; 35,0; -35,0"
                            dur="2.4s"
                            repeatCount="indefinite"
                          />
                          <path d="M -60 -20 Q -20 -32 20 -20" fill="none" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />
                          <path d="M -45 -4 Q -5 -16 35 -4" fill="none" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
                          <line x1="-30" y1="-38" x2="-40" y2="-10" stroke="#38bdf8" strokeWidth="2.5" />
                          <line x1="0" y1="-38" x2="-10" y2="-10" stroke="#38bdf8" strokeWidth="2.5" />
                          <line x1="30" y1="-38" x2="20" y2="-10" stroke="#38bdf8" strokeWidth="2.5" />
                        </g>

                        <text x="0" y="74" textAnchor="middle" fill="#bae6fd" fontSize="11.5" fontWeight="bold">
                          🌬️ Wind &amp; 🌧️ Rain Wash Tracks Away!
                        </text>
                      </g>

                      {/* RIGHT BOX: ON THE MOON (ZERO WIND + ZERO RAIN = FOREVER!) */}
                      <g transform="translate(405, 110)">
                        <rect x="-125" y="-96" width="250" height="192" rx="14" fill="#082420" stroke="#34d399" strokeWidth="2.5" />
                        <text x="0" y="-72" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                          🌕 ON MOON: 1,000,000+ YEARS!
                        </text>

                        <text x="0" y="-48" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">
                          🚫 ZERO WIND • 🚫 ZERO RAIN • 🚫 ZERO AIR
                        </text>

                        {/* Gray Moon Dust Ground */}
                        <rect x="-110" y="18" width="220" height="38" rx="6" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />

                        {/* Mini Golden Lander Base Sitting Intact */}
                        <g transform="translate(-55, 6)">
                          <rect x="-22" y="-12" width="44" height="18" rx="3" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
                          <line x1="-22" y1="4" x2="-34" y2="16" stroke="#fbbf24" strokeWidth="2.5" />
                          <line x1="22" y1="4" x2="34" y2="16" stroke="#fbbf24" strokeWidth="2.5" />
                          <text x="0" y="-18" textAnchor="middle" fill="#fde047" fontSize="9.5" fontWeight="bold">
                            6 Gold Landers
                          </text>
                        </g>

                        {/* Crisp Ribbed Astronaut Bootprint */}
                        <g transform="translate(38, 12)">
                          <rect x="-18" y="-26" width="36" height="52" rx="16" fill="#334155" stroke="#fde047" strokeWidth="2.5" />
                          {[-16, -6, 4, 14].map((ry, i) => (
                            <line key={i} x1="-12" y1={ry} x2="12" y2={ry} stroke="#fde047" strokeWidth="3" />
                          ))}
                          <text x="0" y="-32" textAnchor="middle" fill="#34d399" fontSize="9.5" fontWeight="bold">
                            Sharp Bootprint!
                          </text>
                        </g>

                        <text x="0" y="74" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="bold">
                          6 Landers, 3 Buggies &amp; Tracks Stay Crisp!
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
              <span>Finished Apollo Landing Hardware’s Story!</span>
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
