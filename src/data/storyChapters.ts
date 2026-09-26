export type AgeTrack = 'junior' | 'cadet' | 'scientist';

export interface StoryMicroDecision {
  prompt: string;
  options: {
    label: string;
    outcome: string;
    isOptimal: boolean;
  }[];
}

export interface StoryChapterQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  playfulExplanations: string[];
}

export interface StoryChapter {
  number: number;
  title: string;
  subtitle: string;
  telemetryCallout: string;
  storyByTrack: Record<AgeTrack, string[]>;
  scientistDecision: StoryMicroDecision;
  quiz: StoryChapterQuiz;
}

export const STORY_CHAPTERS_BY_MISSION: Record<string, StoryChapter[]> = {
  'phoenix-lander': [
    {
      number: 1,
      title: 'Leaving Earth',
      subtitle: 'August 4, 2007 • Cape Canaveral Launch Pad 17-A',
      telemetryCallout: 'DELTA II 7925 THRUST: 3.8 MN • TRAJECTORY: MARS NORTH POLE',
      storyByTrack: {
        junior: [
          'Before midnight in Florida, a towering Delta II rocket lit up the night sky like a second sun. Tucked inside its nose cone was Phoenix—a polar lander built from parts of earlier Mars missions given a brand-new chance to fly!',
          'Phoenix had one daring goal: fly 422 million miles to the freezing North Pole of Mars, where no robot had ever landed before, to dig into the dirt and see if real water ice was hiding just beneath the red dust.'
        ],
        cadet: [
          'Rising from Launch Complex 17-A on August 4, 2007, Phoenix began a 10-month, 679-million-kilometer interplanetary cruise toward Vastitas Borealis at 68° North latitude on Mars.',
          'Engineered from spare hardware originally built for the canceled 2001 Mars Surveyor Lander, Phoenix carried a 2.35-meter robotic backhoe arm and miniature high-temperature ovens to test polar permafrost.'
        ],
        scientist: [
          'Launched aboard a Delta II 7925 on a Type II heliocentric transfer trajectory, Phoenix targeted the high-latitude Vastitas Borealis plains (68.22° N) where Mars Odyssey GRS epithermal neutron flux data indicated abundant shallow subsurface water-ice.',
          'The polar lander integrated heritage Lockheed Martin bus architecture with an 8-oven Thermal and Evolved Gas Analyzer (TEGA) and a 4-cell Wet Chemistry Laboratory (WCL).'
        ]
      },
      scientistDecision: {
        prompt: 'You are picking Phoenix’s landing zone at the Martian North Pole. Orbiters show two spots: Crater A is dramatic and steep, while Green Valley is flat with polygon cracks like Earth’s Arctic permafrost. Which do you choose?',
        options: [
          {
            label: 'Land in flat Green Valley with polygon ground cracks',
            outcome: 'Bullseye! Those polygon cracks are formed by seasonal freezing and thawing of shallow ice, giving Phoenix a safe flat landing AND ice just 5 cm down!',
            isOptimal: true
          },
          {
            label: 'Land on the steep rocky slopes of Crater A',
            outcome: 'Whoa—careful! Steep boulders could tip a three-legged lander over on touchdown. Mission Control chose flat Green Valley instead so Phoenix’s solar panels stayed level!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'Why was this polar robot named "Phoenix"?',
        options: [
          'Because Mars is hotter than a desert',
          'Because it rose from spare parts of earlier canceled Mars missions',
          'Because it had flapping wings'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'Actually, the Martian North Pole is freezing cold—dropping below -100°C!',
          'Spot on! Like the mythical bird rising from the ashes, Phoenix was built from spare mission hardware waiting in a cleanroom!',
          'It had octagonal solar wings that unfolded like fans, but they didn’t flap!'
        ]
      }
    },
    {
      number: 2,
      title: 'The Thruster Touchdown',
      subtitle: 'May 25, 2008 • Seven Minutes of Terror',
      telemetryCallout: 'ENTRY SPEED: 21,000 KM/H • PULSE THRUSTERS: 12 HYDRAZINE JETS',
      storyByTrack: {
        junior: [
          'Slamming into the thin Martian air at 12,500 miles per hour, Phoenix glowed white-hot inside its heat shield. Then—POP!—a giant parachute slowed it down.',
          'Unlike Opportunity, Phoenix did NOT use bouncy airbags. Instead, it dropped its legs and fired 12 rapid-fire rocket thrusters—pfft-pfft-pfft!—gently setting down on three feet with barely a tilt!'
        ],
        cadet: [
          'Entering the atmosphere at 5.7 km/s, Phoenix endured peak deceleration before deploying its disk-gap-band parachute at Mach 1.7 and jettisoning its heat shield.',
          'At 900 meters altitude, Phoenix separated from its parachute and ignited 12 pulsed hydrazine monopropellant thrusters, guided by Doppler radar to touch down softly at 2.4 m/s.'
        ],
        scientist: [
          'Executing the first powered Martian landing since Viking 2 (1976), Phoenix utilized pulse-width modulated (PWM) hydrazine thrusters coupled with a Ka-band radar altimeter to null horizontal velocity and settle within 0.3° of level.',
          'Touchdown waited 15 minutes before unfurling its UltraFlex octagonal gallium-arsenide solar arrays to allow thrusters’ dust plumes to settle.'
        ]
      },
      scientistDecision: {
        prompt: 'Phoenix has just touched down on Mars! Dust kicked up by the landing rockets is still floating in the air. Do you open the solar panels immediately or wait 15 minutes?',
        options: [
          {
            label: 'Wait 15 minutes on battery power for the dust cloud to settle',
            outcome: 'Smart engineering call! Waiting 15 minutes kept the fresh solar panels pristine and dust-free so Phoenix could generate maximum power!',
            isOptimal: true
          },
          {
            label: 'Pop the solar panels open the second the feet touch the ground',
            outcome: 'Waiting is actually safer! If you open them right away, the settling rocket dust coats the solar cells. Waiting 15 minutes kept them sparkling clean!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'How did Phoenix slow down for the final seconds before touching the Martian soil?',
        options: [
          'Giant bouncy airbags',
          '12 pulsed rocket thrusters firing like rapid puffs',
          'Skis sliding across the ice'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'Spirit and Opportunity used airbags, but Phoenix was a three-legged lander that needed a gentle rocket landing!',
          'Bingo! Twelve pulsed hydrazine thrusters fired rapid bursts to set Phoenix down softer than a hop off a curb!',
          'Even though it landed near the pole, the ice was hidden under a blanket of dry red soil!'
        ]
      }
    },
    {
      number: 3,
      title: 'Discovering Ice & Water',
      subtitle: 'June 15, 2008 • The "Dodo-Goldilocks" Trench',
      telemetryCallout: 'SCOOP DEPTH: 5 CM • SUBLIMATION PROOF: 4 MARTIAN SOLS',
      storyByTrack: {
        junior: [
          'Phoenix stretched out its 8-foot robotic arm like a mechanical backhoe and scraped a shallow trench nicknamed "Dodo-Goldilocks." Just two inches under the rusty dirt, the camera spotted something gleaming bright white!',
          'Was it salt or real water ice? Four days later, three crumb-sized white chunks in the trench had vanished completely into thin air—sublimating into water vapor when the sun hit them. It was 100% real Martian water ice!'
        ],
        cadet: [
          'Excavating 5 centimeters into the polygon trough, Phoenix’s Robotic Arm Camera photographed bright, hard material and dice-sized crumbs at the bottom of the Dodo-Goldilocks trench on Sol 20.',
          'By Sol 24, the crumbs had sublimated directly from solid to gas, proving they were water ice rather than salt. Later, TEGA Oven #4 heated a sample and chemically confirmed H₂O vapor!'
        ],
        scientist: [
          'Optical monitoring between Sol 20 and Sol 24 documented complete phase transition (sublimation) of excavated clasts under ambient Martian triple-point pressure (~6.1 mbar).',
          'Subsequent differential scanning calorimetry in TEGA detected an endothermic melting peak at 0°C and mass spectrometer confirmation of H₂O, alongside WCL detection of CaCO₃ buffer and ~0.5% ClO₄⁻ perchlorates.'
        ]
      },
      scientistDecision: {
        prompt: 'You see bright white chunks at the bottom of the trench! How can you prove whether they are salt or frozen water ice using only Phoenix’s camera?',
        options: [
          {
            label: 'Photograph the trench over 4 days to see if the chunks evaporate (sublimate) in sunlight',
            outcome: 'Brilliant! Salt never evaporates in cold sunlight, but exposed water ice turns straight into water vapor in Mars’s thin air. On Sol 24, the chunks vanished!',
            isOptimal: true
          },
          {
            label: 'Wait for Martian rain to wash the trench clean',
            outcome: 'It never rains liquid water on Mars today because the air is too thin and cold! Watching the chunks sublimate into vapor over 4 days proved they were water ice!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'What happened to the dice-sized white chunks Phoenix dug up after 4 days in the sun?',
        options: [
          'They vanished into vapor (sublimated), proving they were water ice',
          'They turned into green plants',
          'They rolled uphill'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Yes! Because Mars has very thin air, warmed ice turns straight into gas (sublimation). Salt would have stayed behind!',
          'No plants yet—though Phoenix proved the soil isn’t acidic and contains nutrients!',
          'They stayed right in the shadow of the trench until they sublimated away!'
        ]
      }
    },
    {
      number: 4,
      title: 'The Silent Night',
      subtitle: 'November 2, 2008 • Sol 157 Arctic Twilight',
      telemetryCallout: 'LIDAR SNOWFALL: 4 KM ALTITUDE • SOLAR ARRAY: 0 WATTS',
      storyByTrack: {
        junior: [
          'Before winter arrived, Phoenix’s laser beam pointed up at the sky and spotted something magical: real snow falling from Martian clouds high above the plains!',
          'As autumn turned to arctic winter, the sun dipped lower and lower until it never rose at all. With its solar panels in total darkness and frost blanketing its deck, Phoenix sent one final "Triumph" signal on Sol 157 and went to sleep in the polar ice.'
        ],
        cadet: [
          'On Sol 99, Phoenix’s upward-pointing Canadian LIDAR beam detected water-ice snow crystals falling from clouds 4 km overhead, vaporizing in virga streaks before hitting the ground.',
          'Designed for 90 sols, Phoenix lasted 157 sols until the Martian polar night plunged temperatures below -125°C and dry-ice CO₂ frost encased the lander.'
        ],
        scientist: [
          'Atmospheric LIDAR backscatter profiles confirmed cirrus-like water-ice precipitation at 4 km altitude during late northern summer as polar hood condensation accelerated.',
          'As solar insolation dropped below survival heater thresholds on Sol 157, Phoenix exhausted its Li-ion battery reserves prior to seasonal CO₂ slab-ice deposition across 68° N.'
        ]
      },
      scientistDecision: {
        prompt: 'The Martian sun is setting for the long polar winter and battery power is down to its final hours. Which instrument do you keep running last?',
        options: [
          {
            label: 'Keep the weather station & LIDAR recording the arrival of Martian frost and snow',
            outcome: 'Spot on! Digging requires huge power, so engineers shut down the arm heaters and used the final watts to capture historic data of Martian snowfall!',
            isOptimal: true
          },
          {
            label: 'Run the 1,000°C baking oven one more time',
            outcome: 'The oven draws way too much electricity! Mission Control saved the final battery trickle for the weather sensors and radio transmitter.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'What surprising weather event did Phoenix’s upward laser beam spot in the Martian sky?',
        options: [
          'A rainbow tornado',
          'Snow crystals falling from Martian clouds 2.5 miles up',
          'Hailstones the size of golf balls'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'Martian dust devils happen, but no rainbows without liquid raindrops!',
          'Correct! Phoenix’s green laser LIDAR spotted real water-ice snow falling from high Martian clouds!',
          'No giant hailstones—just delicate ice-crystal snow streaks!'
        ]
      }
    }
  ],
  'opportunity-rover': [
    {
      number: 1,
      title: 'Leaving Earth',
      subtitle: 'July 7, 2003 • Twins Bound for the Red Planet',
      telemetryCallout: 'MISSION DESIGN: 90 MARTIAN SOLS • TARGET: MERIDIANI PLANUM',
      storyByTrack: {
        junior: [
          'In the summer of 2003, NASA launched two twin golf-cart-sized rovers toward Mars: Spirit and Opportunity ("Oppy"). Each had six wheels, a long camera neck like a friendly mechanical bird, and solar wings on its back.',
          'Engineers promised Oppy would drive for 90 Martian days (about 3 months) and travel maybe 600 yards before fine red dust covered its solar panels. Oppy had much bigger plans!'
        ],
        cadet: [
          'Launched aboard a Delta II Heavy rocket on July 7, 2003, MER-B Opportunity targeted Meridiani Planum—a flat equatorial plain where orbital infrared spectrometers had detected coarse-grained crystalline hematite.',
          'Rated for a 90-sol baseline warranty and a 600-meter traverse, Opportunity carried a robotic arm equipped with a Rock Abrasion Tool, microscopic imager, and dual spectrometers.'
        ],
        scientist: [
          'MER-B Opportunity launched during the historic 2003 perihelic opposition of Mars, targeting Meridiani Planum based on Mars Global Surveyor TES thermal emission signatures of gray crystalline hematite (α-Fe₂O₃).',
          'The 185-kg rover utilized a rocker-bogie titanium suspension and triple-junction GaInP/GaAs/Ge solar arrays.'
        ]
      },
      scientistDecision: {
        prompt: 'Satellites orbiting Mars see a rare mineral called gray hematite across a flat plain called Meridiani Planum. On Earth, hematite usually forms in water. Do you send Opportunity there?',
        options: [
          {
            label: 'Yes! Follow the water clues to flat Meridiani Planum',
            outcome: 'Cosmic bullseye! Following the hematite signature led Opportunity straight to an ancient Martian shoreline and groundwater bed!',
            isOptimal: true
          },
          {
            label: 'Skip the flat plain and aim for the top of Olympus Mons volcano',
            outcome: 'Olympus Mons is too high (21 km up!)—there isn’t enough air at the peak for parachutes to slow the rover down! Meridiani Planum was the winning choice.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'How long was Opportunity originally designed to last on Mars?',
        options: [
          'Only 90 Martian days (sols)',
          '50 Earth years',
          'Just 24 hours'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Yes! It was warrantied for just 90 sols—and went on to explore for 5,111 sols (nearly 15 years)!',
          'Even the most optimistic engineers only hoped for 90 days to a year!',
          '24 hours is only one Martian sol—Oppy lasted 5,111 sols!'
        ]
      }
    },
    {
      number: 2,
      title: 'The Bouncing Landing',
      subtitle: 'January 25, 2004 • Cosmic Hole-in-One at Eagle Crater',
      telemetryCallout: 'AIRBAG BOUNCES: 26 TIMES • CRATER DIAMETER: 22 METERS',
      storyByTrack: {
        junior: [
          'Seconds before hitting the ground, giant airbags inflated all around Opportunity like a colossal cluster of beach balls! Released from its rocket bridle, the airbag bundle hit Mars and bounced 26 times across the plains!',
          'When it finally stopped rolling and deflated its airbags, scientists gasped at the first camera view: Oppy had rolled across a flat plain and dropped straight into a tiny crater like a 300-million-mile hole-in-one!'
        ],
        cadet: [
          'Encased in a four-sided Vectran airbag tetrahedron, Opportunity impacted Meridiani Planum at 50 km/h, bouncing 26 times and rolling 200 meters across the dark basaltic sand.',
          'By sheer cosmic luck, the lander rolled over the lip of 22-meter-wide Eagle Crater—exposing a bedrock outcrop right in front of the rover without needing days of driving!'
        ],
        scientist: [
          'Following RAD-rocket firing at 15 meters altitude, the Vectran airbag assembly attenuated ~40g impact loads across 26 bounces before coming to rest inside Eagle Crater (1.95° S, 354.47° E).',
          'Pancam’s initial panorama revealed exposed layered sulfate-rich sedimentary bedrock along the crater wall—the first in-situ bedrock ever imaged on Mars.'
        ]
      },
      scientistDecision: {
        prompt: 'You just unfolded Opportunity inside Eagle Crater and see layered pale rocks sticking out of the crater wall 10 meters away. What is your first move?',
        options: [
          {
            label: 'Roll down the ramp and inspect the layered crater wall bedrock first',
            outcome: 'History made! That very rock outcrop held finely layered ripples and mineral spheres that proved liquid water once flowed on Mars!',
            isOptimal: true
          },
          {
            label: 'Drive immediately out of the crater without looking at the wall',
            outcome: 'Hold on! Outside the crater is flat sand for miles. That crater wall right in front of Oppy was a treasure chest of ancient water clues!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'Why did NASA engineers call Opportunity’s landing a "300-million-mile hole-in-one"?',
        options: [
          'It landed on a golf ball left by Vikings',
          'Its bouncing airbags rolled right into Eagle Crater next to exposed ancient bedrock',
          'It fell down a bottomless lava tube'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'The Viking landers were thousands of miles away!',
          'Exact match! Out of a flat plain stretching for miles, Oppy rolled straight into a tiny crater with exposed water-formed bedrock!',
          'Thankfully Eagle Crater was shallow and easy for Oppy to drive out of afterward!'
        ]
      }
    },
    {
      number: 3,
      title: 'Discovering Ancient Water',
      subtitle: 'Martian "Blueberries" & A 28-Mile Marathon',
      telemetryCallout: 'ODOMETER: 45.16 KM • HEMATITE SPHERULES: CONFIRMED',
      storyByTrack: {
        junior: [
          'Peering closely at the rocks with its magnifying lens, Opportunity saw thousands of tiny round gray spheres embedded in the stone like blueberries in a muffin! Scientists tested them and proved these "Martian blueberries" grew inside wet, water-soaked ground billions of years ago.',
          'And whenever red dust built up on Oppy’s solar panels, lucky gusts of Martian wind—"cleaning events"—swept the panels clean! Oppy drove from crater to crater for 14 years, becoming the first machine to finish a 26.2-mile marathon on another world!'
        ],
        cadet: [
          'Using its Mössbauer and Alpha Particle X-ray spectrometers, Opportunity identified millimeter-scale hematite concretions ("blueberries") and jarosite sulfates formed in acidic groundwater.',
          'Aided by serendipitous seasonal wind-cleaning events that restored solar array output above 600 Wh/sol, Opportunity trekked 45.16 km to Victoria and Endeavour Craters, where it found neutral-pH clay minerals.'
        ],
        scientist: [
          'Cross-bedding festoon geometries in the Burns Formation and hematitic spherule concretions demonstrated ancient eolian-playa-groundwater diagenesis.',
          'Upon reaching the Noachian-aged rim of 22-km Endeavour Crater on Sol 2681, Opportunity identified Fe/Mg-smectite phyllosilicates (Matijevic Hill) and calcium sulfate veins indicative of benign, habitable neutral-water chemistry.'
        ]
      },
      scientistDecision: {
        prompt: 'After two years of driving, dust covers Opportunity’s solar panels and power drops to 40%. Suddenly, a Martian dust devil whirls past! What happens?',
        options: [
          {
            label: 'The wind gusts sweep the dust off the solar panels, boosting power back near 90%!',
            outcome: 'Miracle on Mars! NASA engineers called these "cleaning events"—Martian winds acted like free car washes that kept Oppy alive for 15 years!',
            isOptimal: true
          },
          {
            label: 'The rover uses windshield wipers to brush the panels',
            outcome: 'Oppy didn’t have any wipers! It relied entirely on lucky Martian wind gusts ("cleaning events") to blow the dust away!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'What were the "Martian blueberries" that Opportunity discovered in the rocks?',
        options: [
          'Frozen berries from space',
          'Tiny round mineral spheres (hematite) formed in ancient groundwater',
          'Pebbles dropped by meteors'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'Not edible berries—they were solid iron-oxide mineral spheres!',
          'Spot on! Hematite spherules grow inside water-soaked sediment, proving ancient Mars had liquid water!',
          'Their even spacing inside the rock layers proved they formed gently in water, not from meteor impacts!'
        ]
      }
    },
    {
      number: 4,
      title: 'The Silent Night',
      subtitle: 'June 10, 2018 • Sol 5,111 in Perseverance Valley',
      telemetryCallout: 'SKY OPACITY TAU: 10.8 • FINAL POWER: 22 WATT-HOURS',
      storyByTrack: {
        junior: [
          'In June 2018, after nearly 15 incredible years on Mars, a monster dust storm grew until it wrapped around the entire planet. Day turned as pitch-black as midnight in Perseverance Valley.',
          'On Sol 5,111, Opportunity sent its final radio whisper to Earth—two numbers showing its battery was almost empty and the sky was dark, poetically remembered as: "My battery is low and it’s getting dark." NASA listened for 8 months before bidding farewell to the little rover that could.'
        ],
        cadet: [
          'In May 2018, a planetary-scale dust storm spiked atmospheric optical depth (Tau) to a record 10.8 over Perseverance Valley, blocking 99.99% of incoming sunlight.',
          'Unable to recharge its batteries or power its survival heaters through the freezing night, Opportunity transmitted its final telemetry packet on June 10, 2018 (Sol 5,111), concluding the longest surface traverse on another planet.'
        ],
        scientist: [
          'At Tau > 10.8, solar array insolation dropped below the 22 Wh threshold required to sustain the rover’s master clock and plutonium RHU-supplemented warm electronics box.',
          'After over 1,000 recovery commands transmitted via the 70-meter Deep Space Network antennas yielded no carrier lock, NASA formally concluded the MER mission on February 13, 2019.'
        ]
      },
      scientistDecision: {
        prompt: 'Months after the global dust storm clears, Mission Control sends one final song across 140 million miles of space to say goodbye to Opportunity. What mood fits Oppy’s 15-year legacy?',
        options: [
          {
            label: 'Celebrate! Play Billie Holiday’s "I’ll Be Seeing You" and honor its 45.16 km record',
            outcome: 'Heartwarming and true! Control room engineers played "I’ll Be Seeing You"—knowing future astronauts will one day visit Oppy’s resting place in Perseverance Valley.',
            isOptimal: true
          },
          {
            label: 'Consider the mission a failure because the storm stopped it',
            outcome: 'Never! A rover built for 90 days lasted 5,111 days and drove 45.16 km—making it one of the greatest triumphs in space exploration history!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'How did scientists poetically translate Opportunity’s final telemetry numbers on Sol 5,111?',
        options: [
          '"My battery is low and it’s getting dark."',
          '"Mission accomplished, heading home."',
          '"Too much sand in my wheels."'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Yes! The final telemetry showed critically low battery power (22 Wh) and record sky darkness (Tau 10.8)—forever remembered as "My battery is low and it’s getting dark."',
          'Oppy stayed on Mars in Perseverance Valley as a permanent monument for future explorers!',
          'Oppy’s wheels were still parked safely on the slope of Perseverance Valley!'
        ]
      }
    }
  ],
  'voyager-1': [
    {
      number: 1,
      title: 'Leaving Earth',
      subtitle: 'September 5, 1977 • The Once-in-176-Years Alignment',
      telemetryCallout: 'LAUNCH VEHICLE: TITAN IIIE • GOLDEN RECORD: ONBOARD',
      storyByTrack: {
        junior: [
          'In 1977, astronomers noticed a cosmic gift: the giant outer planets were lining up in a curve that only happens once every 176 years! A deep-space probe could use each planet’s gravity like a slingshot to whip faster and faster outward.',
          'Bolted to Voyager 1’s side was a shiny gold-plated phonograph record holding greetings in 55 Earth languages, thunder, whale songs, and music—a message in a bottle cast into the cosmic ocean!'
        ],
        cadet: [
          'Launching on a Titan IIIE-Centaur rocket in September 1977, Voyager 1 capitalized on a rare 176-year geometric alignment of the outer gas giants to execute gravity-assist trajectories.',
          'Curated by Carl Sagan’s committee, Voyager’s 12-inch gold-plated copper phonograph record encoded 115 analog images and 90 minutes of Earth audio alongside a pulsar map pointing back to our Sun.'
        ],
        scientist: [
          'Exploiting the late-1970s syzygy of the outer planets, Voyager 1 utilized heliocentric gravitational slingshots to exceed solar system escape velocity (v∞ ≈ 17 km/s) without extra propellant stages.',
          'Its cover diagram etched in electroplated uranium-238 (half-life 4.468 Gyr) encodes binary hyperfine hydrogen transitions specifying the epoch and galactocentric coordinates of Sol.'
        ]
      },
      scientistDecision: {
        prompt: 'You are helping Carl Sagan pick sounds and pictures for Voyager’s Golden Record in case distant star-travelers find it millions of years from now. What do you include?',
        options: [
          {
            label: 'Greetings in 55 languages, nature sounds, music, and a pulsar star map to our Sun',
            outcome: 'Iconic choice! That exact collection is flying through interstellar space on Voyager 1 right now!',
            isOptimal: true
          },
          {
            label: 'Leave the probe blank to save 1 pound of weight',
            outcome: 'The Golden Record weighed almost nothing compared to the probe, and it turned Voyager into humanity’s greatest time capsule!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'How often do the outer giant planets line up for the "Grand Tour" slingshot path Voyager used?',
        options: [
          'Every summer',
          'Once every 176 years',
          'Every 10 million years'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'Outer planets orbit slowly—Saturn takes 29 years and Uranus takes 84 years!',
          'Spot on! That planetary alignment only happens once every 176 years!',
          'Thankfully we didn’t have to wait millions of years—1977 was the perfect window!'
        ]
      }
    },
    {
      number: 2,
      title: 'Slingshot Past the Giants',
      subtitle: '1979–1980 • Volcanic Moons & Saturn’s Rings',
      telemetryCallout: 'JUPITER FLYBY: MARCH 1979 • SATURN FLYBY: NOVEMBER 1980',
      storyByTrack: {
        junior: [
          'Racing past Jupiter in 1979, Voyager 1 discovered raging lightning storms in Jupiter’s clouds and active volcanoes shooting plumes 100 miles into space on its moon Io!',
          'Next, it whipped past Saturn in 1980, revealing thousands of braided ringlets and flying closely past Saturn’s giant orange moon Titan, which had a thick, mysterious atmosphere.'
        ],
        cadet: [
          'During its March 1979 Jovian encounter, Voyager 1 discovered a faint ring around Jupiter and active sulfur-dioxide volcanism on Io—the first active volcanoes ever seen beyond Earth.',
          'At Saturn in November 1980, mission navigators bent Voyager’s path close to Titan, confirming its dense nitrogen-methane atmosphere and flinging Voyager 35° northward out of the ecliptic plane.'
        ],
        scientist: [
          'Voyager 1’s Imaging Science Subsystem (ISS) and IRIS spectrometer resolved tidal-heating-driven silicate/sulfurous vulcanism on Io and complex density-wave resonances across Saturn’s A, B, and F rings.',
          'The close 6,490-km Titan flyby determined a surface pressure of 1.5 bar dominated by N₂ and CH₄, imparting a high-inclination heliocentric escape asymptote.'
        ]
      },
      scientistDecision: {
        prompt: 'At Saturn in 1980, you can steer Voyager 1 close to the mysterious moon Titan to study its thick atmosphere, which will fling Voyager upward out of the planets’ flat plane toward the stars. Do you do it?',
        options: [
          {
            label: 'Fly close to Titan to unlock its secrets and head straight toward interstellar space!',
            outcome: 'Mission Control made that exact call! Titan’s thick organic atmosphere was a huge discovery, paving the way for the Cassini-Huygens mission later!',
            isOptimal: true
          },
          {
            label: 'Skip Titan completely and stay far away from Saturn’s moons',
            outcome: 'Titan was the top scientific prize at Saturn! Plus, twin sister probe Voyager 2 was right behind to visit Uranus and Neptune.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'What surprising discovery did Voyager 1 make on Jupiter’s colorful moon Io?',
        options: [
          'Active volcanoes erupting plumes into space',
          'Thick forests of pine trees',
          'Giant icebergs floating in water'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Yes! Io was the first place beyond Earth where scientists saw active volcanoes erupting right before our eyes!',
          'Io is covered in colorful sulfur lava flows, not forests!',
          'Jupiter’s next moon over, Europa, has the icy crust—Io is the fiery volcanic moon!'
        ]
      }
    },
    {
      number: 3,
      title: 'The Pale Blue Dot & Heliopause',
      subtitle: '1990–2012 • Crossing into the Galactic Ocean',
      telemetryCallout: 'HELIOPAUSE CROSSED: 121 AU (AUG 2012) • SPEED: 38,000 MPH',
      storyByTrack: {
        junior: [
          'On Valentine’s Day 1990, from 3.7 billion miles away, Voyager 1 turned its camera around one last time and snapped a family portrait of our solar system. Earth appeared as a tiny "Pale Blue Dot"—less than a single pixel floating in a sunbeam!',
          'Then in August 2012, Voyager 1 crossed the Heliopause—the edge of the Sun’s magnetic bubble—becoming the first human-made pioneer to sail out into the ocean of space between the stars!'
        ],
        cadet: [
          'At 40 AU in 1990, Voyager 1 captured the iconic "Pale Blue Dot" portrait before engineers powered down its cameras to conserve plutonium RTG heat and electricity for the decades ahead.',
          'On August 25, 2012, at 121.6 AU from the Sun, solar wind particles vanished and galactic cosmic rays surged: Voyager 1 had crossed the heliopause into interstellar space.'
        ],
        scientist: [
          'Following acquisition of the 60-frame Solar System Family Portrait at 40.5 AU, imaging heaters were decommissioned to reallocate RTG electrical margin.',
          'In August 2012, PWS detected 2.6 kHz electron plasma oscillations corresponding to an interstellar density of nₑ ≈ 0.08 cm⁻³, confirming crossing of the heliopause into the Very Local Interstellar Medium.'
        ]
      },
      scientistDecision: {
        prompt: 'In 1990, Voyager 1 is 3.7 billion miles away and will never pass close to another planet. Carl Sagan asks to turn the camera around to take one picture of tiny Earth before turning the camera off forever to save power. Do you approve?',
        options: [
          {
            label: 'Yes! Turn the camera around to capture the "Pale Blue Dot" photo of Earth',
            outcome: 'One of the most famous photographs in human history! Earth shone as a 0.12-pixel point of light suspended in a scattered sunbeam.',
            isOptimal: true
          },
          {
            label: 'No, turn the camera off without looking back',
            outcome: 'Taking that final look back gave humanity the unforgettable "Pale Blue Dot" portrait before the cameras were powered down to save energy!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'What did Voyager 1 cross in August 2012 at 121 AU from the Sun?',
        options: [
          'The Moon’s orbit',
          'The Heliopause—the boundary into interstellar space between the stars',
          'The edge of the Milky Way galaxy'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'Voyager passed the Moon’s distance on its very first day in 1977!',
          'Spot on! Crossing the Heliopause made Voyager 1 the first human-made pioneer in interstellar space!',
          'It is inside the interstellar space of our Milky Way galaxy!'
        ]
      }
    },
    {
      number: 4,
      title: 'Whisper Across the Void',
      subtitle: '162.4 AU & Counting • The 23-Watt Miracle',
      telemetryCallout: 'ROUND-TRIP RADIO TIME: 45 HOURS • TRANSMITTER: 23 WATTS',
      storyByTrack: {
        junior: [
          'Today, Voyager 1 is over 15 billion miles from home! Its radio transmitter uses only 23 watts of power—about the same as a refrigerator light bulb—yet giant dish antennas on Earth still catch its whisper!',
          'Because radio waves travel at the speed of light, it takes over 22.5 hours for a single "hello" from Voyager 1 to reach Earth, and 45 hours for a round-trip conversation!'
        ],
        cadet: [
          'More than 48 years after launch, Voyager 1’s 1970s computers—with just 69 kilobytes of memory—continue transmitting interstellar plasma and magnetic field telemetry from 162.4 AU.',
          'When a memory chip glitched in 2023, JPL engineers rewrote flight software across 24 billion kilometers to restore clean science downlinks in 2024!'
        ],
        scientist: [
          'At 162.4 AU, Voyager 1’s 22.4-watt X-band signal arrives at NASA’s 70-meter Deep Space Network apertures attenuated to ~10⁻²² watts.',
          'In 2024, JPL flight engineers successfully patched the Flight Data Subsystem (FDS) CMOS memory across a 45-hour two-way light time, resuming continuous interstellar field and particle telemetry.'
        ]
      },
      scientistDecision: {
        prompt: 'In 2024, one memory chip on Voyager 1’s 47-year-old computer breaks from a cosmic ray hit 15 billion miles away! What do you do?',
        options: [
          {
            label: 'Beam up clever new code that splits the program across healthy memory sections',
            outcome: 'Incredible engineering! That’s exactly what NASA JPL engineers did—fixing a pioneer 15 billion miles away with a 45-hour radio delay!',
            isOptimal: true
          },
          {
            label: 'Send a repair astronaut with a screwdriver',
            outcome: 'At 15 billion miles away, even a rocket would take decades to catch up! Beaming up a software patch saved Voyager 1 from Earth!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'How powerful is Voyager 1’s radio transmitter that beams signals across 15 billion miles?',
        options: [
          'Only about 23 watts—like a refrigerator lightbulb!',
          'A million-watt stadium spotlight',
          'As powerful as a lightning bolt'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Unbelievable but true! Just 23 watts—about a refrigerator bulb—picked up by giant 230-foot NASA Deep Space Network dishes on Earth!',
          'Deep-space pioneers have very limited power, so Voyager beams across the void with just 23 watts!',
          'No lightning bolts—just a steady 23-watt whisper focused through its dish antenna!'
        ]
      }
    }
  ],
  'cassini-orbiter': [
    {
      number: 1,
      title: 'Leaving Earth',
      subtitle: 'October 15, 1997 • Bound for the Lord of the Rings',
      telemetryCallout: 'LAUNCH: TITAN IVB • PASSENGER: ESA HUYGENS TITAN PROBE',
      storyByTrack: {
        junior: [
          'Standing taller than a school bus, Cassini was a giant robotic explorer built by NASA and European scientists to move in and live at Saturn! Clinging to its side like a shiny golden seashell was a smaller lander named Huygens.',
          'To reach Saturn nearly a billion miles away, Cassini played cosmic pinball—looping past Venus twice, Earth once, and giant Jupiter to pick up speed!'
        ],
        cadet: [
          'Launched in October 1997, the 5,600-kg Cassini-Huygens mission executed a VVEJGA (Venus-Venus-Earth-Jupiter Gravity Assist) trajectory spanning 7 years and 3.5 billion kilometers.',
          'Powered by three radioisotope thermoelectric generators because sunlight at Saturn is only 1% as strong as at Earth, Cassini carried 12 orbiter instruments plus the European Huygens Titan probe.'
        ],
        scientist: [
          'The joint NASA/ESA/ASI Flagship mission utilized a 6.7-year VVEJGA interplanetary transfer to deliver a 2,523-kg dry-mass orbiter and the 318-kg Huygens atmospheric entry probe to 9.5 AU.',
          'Three GPHS-RTGs supplied ~885 watts at BOM, enabling sustained operations at 1% terrestrial solar irradiance.'
        ]
      },
      scientistDecision: {
        prompt: 'At Saturn’s distance (almost 1 billion miles from the Sun), sunlight is 100 times dimmer than on Earth. How do you power Cassini?',
        options: [
          {
            label: 'Use warm plutonium RTG power cores that generate steady electricity in the dark',
            outcome: 'Spot on! Solar panels in 1997 would have been heavier than the whole orbiter! RTGs powered Cassini for 20 straight years.',
            isOptimal: true
          },
          {
            label: 'Pack 10,000 AA alkaline batteries',
            outcome: 'AA batteries would drain in a few days! Radioisotope power cores kept Cassini humming for two decades.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'What was the golden saucer-shaped passenger riding on Cassini’s side?',
        options: [
          'A spare satellite dish',
          'The European Huygens lander built to parachute onto Saturn’s moon Titan',
          'A giant pizza oven'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'Cassini already had a big white high-gain dish on top!',
          'Yes! The ESA Huygens probe rode on Cassini for 7 years before parachuting onto Titan!',
          'Definitely not a pizza oven—though its heat shield got sizzling hot entering Titan’s air!'
        ]
      }
    },
    {
      number: 2,
      title: 'Touchdown on Titan',
      subtitle: 'January 14, 2005 • Rivers & Seas of Liquid Methane',
      telemetryCallout: 'HUYGENS DESCENT: 2H 27M • SURFACE TEMP: -179°C',
      storyByTrack: {
        junior: [
          'After arriving at Saturn, Cassini released the Huygens probe toward Saturn’s biggest moon, Titan. Floating down by parachute through thick orange clouds for two and a half hours, Huygens snapped jaw-dropping photos!',
          'Below the haze were winding river channels, coastlines, and rounded pebbles—except at -290°F, the rain, rivers, and lakes on Titan are made of liquid methane and ethane instead of water!'
        ],
        cadet: [
          'On January 14, 2005, Huygens accomplished the farthest landing from Earth in human history, parachuting onto Titan’s equatorial region and transmitting surface images for 72 minutes.',
          'Cassini’s radar later pierced Titan’s smog across 127 flybys, mapping vast liquid hydrocarbon seas (Kraken Mare and Ligeia Mare) alongside an active methane hydrological cycle.'
        ],
        scientist: [
          'Huygens’s Descent Imager/Spectral Radiometer (DISR) and Surface Science Package (SSP) revealed dendritic fluvial drainage networks and rounded water-ice cobbles at the Adiri landing site (93.7 K, 1.47 bar).',
          'Cassini Ku-band SAR altimetry confirmed specular reflections and bathymetry exceeding 160 meters in Titan’s polar methane-ethane seas.'
        ]
      },
      scientistDecision: {
        prompt: 'Titan is wrapped in thick orange smog that regular cameras can’t see through. How can Cassini map the lakes and mountains on Titan’s surface as it flies past?',
        options: [
          {
            label: 'Bounce radar waves through the clouds and measure the echoes!',
            outcome: 'Brilliant! Radar pierces right through thick haze and clouds, revealing giant liquid methane seas near Titan’s poles!',
            isOptimal: true
          },
          {
            label: 'Wait for a sunny cloudless day over the whole moon',
            outcome: 'Titan’s orange photochemical haze wraps the entire moon year-round! Radar was the secret key to mapping its surface.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'What are the rivers, rain, and lakes on Saturn’s freezing moon Titan made of?',
        options: [
          'Warm salty ocean water',
          'Liquid methane and ethane',
          'Melted gold'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'At -179°C (-290°F), water on Titan’s surface is frozen as hard as granite rock! (Though there is a deep water ocean far underground).',
          'Correct! At Titan’s freezing temperature, methane gas condenses into liquid rain, rivers, and giant lakes!',
          'Gold requires scorching heat to melt—Titan is an icy hydrocarbon world!'
        ]
      }
    },
    {
      number: 3,
      title: 'Discovering Ocean Geysers',
      subtitle: 'Enceladus • The Tiny Moon Shooting Water into Space',
      telemetryCallout: 'PLUME FLYTHROUGH: 50 KM ALTITUDE • H2 & ORGANICS DETECTED',
      storyByTrack: {
        junior: [
          'Nobody expected tiny Enceladus—a bright white moon only as wide as Arizona—to be active. Yet when Cassini looked closely at its South Pole, it saw giant geysers shooting icy water vapor and snow hundreds of miles into space!',
          'Even better, Cassini flew right through those spraying water plumes and "tasted" them with its sensors: finding salty water, organic building blocks, and hydrogen gas from warm hydrothermal vents on a hidden ocean floor!'
        ],
        cadet: [
          'In 2005, Cassini discovered cryovolcanic plumes erupting from four warm fractures ("Tiger Stripes") at the south pole of Enceladus, feeding Saturn’s E-ring.',
          'Diving just 49 km above the surface right through the plumes, Cassini’s mass spectrometer detected sodium salts, silica nanoparticles, complex organics, and molecular hydrogen (H₂)—pointing to hydrothermal vents in a global subsurface ocean!'
        ],
        scientist: [
          'Magnetometer perturbations and libration measurements confirmed a global liquid water ocean beneath Enceladus’s 5-km south-polar ice shell.',
          'Direct INMS and CDA sampling during the E21 plume flythrough identified native H₂ (0.4–1.4 vol%), CH₄, macromolecular organics (>200 amu), and 6–9 nm hydrothermal silica grains—establishing all prerequisites for methanogenic habitability.'
        ]
      },
      scientistDecision: {
        prompt: 'You spot giant water geysers spraying into space from Enceladus’s underground ocean! How can you test that ocean water without a lander?',
        options: [
          {
            label: 'Steer Cassini right through the spraying geyser plume and catch the water droplets in its chemical analyzer!',
            outcome: 'Ingenious! Enceladus gives out free ocean samples in space—letting Cassini taste an alien ocean without even landing!',
            isOptimal: true
          },
          {
            label: 'Crash Cassini onto the ice to crack it open',
            outcome: 'Never crash into Enceladus! Flying cleanly through the spraying plume let Cassini sample the ocean water safely.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'What did Cassini discover hiding underneath the icy shell of Saturn’s moon Enceladus?',
        options: [
          'A global liquid water ocean with warm hydrothermal vents',
          'A solid ball of iron with no water',
          'Giant underground caverns full of bats'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Yes! Silica grains and hydrogen gas in the geysers proved warm hydrothermal vents are active on Enceladus’s ocean floor!',
          'Gravity and wobble measurements proved a global liquid ocean sits between the rocky core and the ice shell!',
          'No bats—but hydrothermal vents make Enceladus one of the best places to search for microbial life!'
        ]
      }
    },
    {
      number: 4,
      title: 'The Grand Finale Plunge',
      subtitle: 'September 15, 2017 • Protecting the Ocean Moons',
      telemetryCallout: 'PROXIMAL DIVES: 22 • FINAL SIGNAL: 11:55:46 UTC',
      storyByTrack: {
        junior: [
          'After 13 years at Saturn and 294 orbits, Cassini’s fuel tank was almost empty. Because Enceladus and Titan might hold living microbes in their oceans, NASA couldn’t risk an out-of-fuel Cassini accidentally crashing into them.',
          'So Cassini finished with a heroic "Grand Finale": diving 22 times through the narrow gap between Saturn and its rings, before plunging into Saturn’s golden clouds like a shooting star—beaming back science until the very last second!'
        ],
        cadet: [
          'With propellant nearly depleted in 2017, planetary protection protocols required safely disposing of Cassini to guarantee zero biological contamination of Enceladus or Titan.',
          'Cassini executed 22 daring orbits through the 2,000-km gap between Saturn’s cloud tops and inner D-ring before entering Saturn’s atmosphere at 113,000 km/h with its antenna locked on Earth.'
        ],
        scientist: [
          'During the 22 proximal Grand Finale orbits, Cassini measured ring mass via gravity harmonics (determining a low mass of ~0.4 M_Mimas and a young ring age of 10–100 Myr) and sampled ring-rain influx.',
          'On September 15, 2017, Cassini performed real-time atmospheric mass spectrometry down to ~1,500 km above the 1-bar level before aerodynamic torque broke X-band lock.'
        ]
      },
      scientistDecision: {
        prompt: 'Cassini is almost out of steering fuel. Why is it critical to intentionally plunge Cassini into Saturn instead of leaving it floating around Saturn’s moons?',
        options: [
          {
            label: 'To protect the oceans of Enceladus and Titan from any hitchhiking Earth microbes on the hardware!',
            outcome: '100% right! Because Cassini discovered Enceladus has a habitable ocean, it sacrificed itself into Saturn to keep those moons pristine!',
            isOptimal: true
          },
          {
            label: 'Because Saturn needed extra metal in its clouds',
            outcome: 'Saturn is 95 times heavier than Earth—it didn’t need the metal! Planetary protection of Enceladus and Titan was the true reason.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'Where did Cassini fly during its final 22 "Grand Finale" orbits before its final plunge?',
        options: [
          'Back to Earth',
          'Right through the narrow gap between Saturn’s clouds and its innermost rings',
          'Inside a black hole'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'Cassini stayed at Saturn for its entire 13-year tour!',
          'Spot on! No pioneer had ever flown inside the gap between Saturn and its rings—measuring the weight and age of the rings for the first time!',
          'No black holes near Saturn—just the majestic ringed gas giant!'
        ]
      }
    }
  ],
  'apollo-landing-hardware': [
    {
      number: 1,
      title: 'Leaving Earth',
      subtitle: 'July 16, 1969 • Riding the Saturn V Moon Rocket',
      telemetryCallout: 'SATURN V THRUST: 34.5 MN • CREW: ARMSTRONG, ALDRIN, COLLINS',
      storyByTrack: {
        junior: [
          'On July 16, 1969, a rocket as tall as a 36-story building roared off Launch Pad 39A in Florida! Packed inside was the spider-shaped Lunar Module named "Eagle"—the first crewed lander ever built to fly exclusively in the airless vacuum of space.',
          'Because the Moon has no air or wind, Eagle didn’t need smooth wings or a pointy nose. Its walls were made of thin aluminum and wrapped in shiny gold foil to block the Sun’s intense heat!'
        ],
        cadet: [
          'Propelled by five F-1 engines generating 7.5 million pounds of thrust, Apollo 11’s Saturn V launched Neil Armstrong, Buzz Aldrin, and Michael Collins on a 386,000-km translunar trajectory.',
          'In lunar orbit, Armstrong and Aldrin undocked Grumman’s LM-5 Eagle—a two-stage lunar lander wrapped in gold-aluminized Kapton thermal blankets—while Collins maintained vigil in Command Module Columbia.'
        ],
        scientist: [
          'Following Trans-Lunar Injection (TLI) and CSM transposition-and-docking extraction, Apollo 11 entered a 110-km lunar parking orbit prior to LM-5 Eagle undocking on Revolution 13.',
          'The 15,200-kg Lunar Module featured a throttleable hypergolic Descent Propulsion System and a 36,864-word core-rope memory Apollo Guidance Computer (AGC).'
        ]
      },
      scientistDecision: {
        prompt: 'You are designing the Eagle Lunar Module to land on the Moon, where there is zero air. Do you add heavy aerodynamic wings and thick steel walls, or ultra-light aluminum and gold thermal foil?',
        options: [
          {
            label: 'Use ultra-light aluminum skin and gold foil blankets—no air means no wind resistance!',
            outcome: 'Spot on! Saving every kilogram of weight was critical so Eagle had enough rocket fuel to land and launch back to lunar orbit!',
            isOptimal: true
          },
          {
            label: 'Add airplane wings so it can glide down to the craters',
            outcome: 'Wings need air to generate lift, and the Moon is an airless vacuum! Rocket thrusters and lightweight foil were the winning design.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'Why did the Eagle Lunar Module look like a boxy geometric bug instead of a sleek airplane?',
        options: [
          'Because it only flew in the vacuum of space where there is no air resistance',
          'Because engineers ran out of curved metal',
          'So it could swim in lunar lakes'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Yes! Eagle was the first crewed vehicle designed to fly only in vacuum—so it didn’t need aerodynamic streamlining!',
          'Every angle was carefully engineered to save weight, not because they ran out of curved metal!',
          'The "Sea of Tranquility" is actually an ancient plain of dry volcanic basalt rock!'
        ]
      }
    },
    {
      number: 2,
      title: 'The 25-Second Touchdown',
      subtitle: 'July 20, 1969 • Program Alarm 1202 & Boulder Field',
      telemetryCallout: 'COMPUTER ALARM: 1202 • FUEL REMAINING AT LANDING: 25 SEC',
      storyByTrack: {
        junior: [
          'As Eagle descended toward the Moon, its computer flashed a scary warning: "1202 ALARM!" A radar switch was feeding the computer too many tasks at once. Back in Houston, 26-year-old engineer Steve Bales knew the computer was smart enough to drop low-priority tasks and keep flying: "GO!"',
          'Looking out the window, Neil Armstrong saw the computer was steering them straight into a crater full of car-sized boulders! Taking manual control, he skimmed right over the rocks and set Eagle down on flat ground with just 25 seconds of fuel left!'
        ],
        cadet: [
          'During powered descent, Eagle’s Apollo Guidance Computer triggered 1202 and 1201 Executive Overflow alarms caused by the rendezvous radar steals of CPU cycles. MIT software architect Margaret Hamilton’s priority-scheduling code automatically shed low-priority tasks and kept the lander flying.',
          'At 150 meters altitude, Armstrong spotted West Crater’s boulder field, switched to semi-manual P66 attitude hold, and hovered downrange to land at Tranquility Base with 25 seconds of hover margin.'
        ],
        scientist: [
          'Cycle-stealing by the rendezvous radar’s resolver interface loaded the AGC by 15%, triggering 1202/1201 restarts. Hamilton’s asynchronous priority executive preserved P64/P66 guidance loops without losing attitude control.',
          'Armstrong’s manual pitch-over extended cross-range trajectory 350 meters past West Crater ejecta blocks until lunar contact probes illuminated at 20:17:40 UTC.'
        ]
      },
      scientistDecision: {
        prompt: 'At 400 feet above the Moon, you look out the window and see Eagle is heading straight into a crater filled with giant boulders! What do you do?',
        options: [
          {
            label: 'Switch to manual hover control and fly past the boulders to a smooth patch of lunar dust!',
            outcome: 'Heroic piloting! Neil Armstrong flew past West Crater and landed smoothly with 25 seconds of fuel left: "The Eagle has landed!"',
            isOptimal: true
          },
          {
            label: 'Land right on top of the sharp boulders and hope the legs don’t snap',
            outcome: 'Tilting more than 12 degrees on a boulder could prevent the top stage from launching back home! Flying past the boulders saved the mission.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'How did the Apollo Guidance Computer survive the 1202 overload alarm during landing?',
        options: [
          'Astronauts unplugged it and used a paper map',
          'Smart software led by Margaret Hamilton automatically dropped low-priority tasks to keep landing controls running',
          'It rebooted for 20 minutes'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'You can’t land on the Moon with a paper map—you need millisecond thruster control!',
          'Spot on! Margaret Hamilton’s team designed priority-scheduling software that kept the critical landing engine tasks running without missing a beat!',
          'A 20-minute reboot would have crashed—the restart took less than a blink of an eye!'
        ]
      }
    },
    {
      number: 3,
      title: 'Moon Rocks, Moon Buggies & Laser Mirrors',
      subtitle: '1969–1972 • Exploring Six Lunar Landing Sites',
      telemetryCallout: 'MOON BUGGIES: 3 ELECTRIC LRVS • LASER REFLECTOR: 100 PRISMS',
      storyByTrack: {
        junior: [
          'Stepping onto the powdery gray dust, Apollo astronauts collected ancient Moon rocks and—on Apollo 15, 16, and 17—unfolded electric moon buggies strapped to the side of the lander to drive across mountains and valleys!',
          'They also set up a special suitcase-sized laser mirror array on the dirt. Even today, scientists on Earth shoot laser beams at Apollo’s laser mirror and catch the reflection—proving the Moon is slowly drifting 1.5 inches farther from Earth every year!'
        ],
        cadet: [
          'Across six landings, Apollo astronauts deployed the Lunar Laser Ranging Retroreflector (LRRR) containing fused-silica corner-cube laser mirror prisms and drove three battery-powered moon buggies across the lunar highlands.',
          'They gathered 382 kg of titanium-rich mare basalts and highland breccias, revealing the Moon formed from a giant impact early in Solar System history.'
        ],
        scientist: [
          'Radiometric dating of Apollo basalts constrained Mare Tranquillitatis volcanism to ~3.7 Ga, while Lunar Roving Vehicle (moon buggies) traverses sampled crustal anorthosites across Hadley-Apennine, Descartes, and Taurus-Littrow.',
          'The 100-prism LRRR laser mirror array continues enabling millimeter-precision Earth-Moon range measurements, testing general relativity and tidal recession (+38 mm/yr).'
        ]
      },
      scientistDecision: {
        prompt: 'You want to leave an experiment on the Moon that will still work 60+ years later after all batteries die. Which instrument do you set up?',
        options: [
          {
            label: 'A passive corner-cube prism laser mirror array that reflects laser beams fired from telescopes on Earth!',
            outcome: 'Genius! Because corner-cube laser mirrors need zero electricity, observatories on Earth STILL bounce lasers off Apollo’s reflector today!',
            isOptimal: true
          },
          {
            label: 'A battery-powered lightbulb',
            outcome: 'A battery freezes during the 14-day lunar night! The passive laser mirror needs zero power and works forever.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'What amazing fact did scientists discover by bouncing lasers off Apollo’s laser mirror on the Moon?',
        options: [
          'The Moon is made of green cheese',
          'The Moon is slowly spiraling 1.5 inches (3.8 cm) farther away from Earth every year',
          'The Moon shrinks by half every winter'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'The Moon rocks proved it’s volcanic basalt and anorthosite!',
          'Yes! Ocean tides on Earth transfer energy to the Moon, pushing it 3.8 centimeters farther away each year!',
          'The Moon stays practically the same size year-round!'
        ]
      }
    },
    {
      number: 4,
      title: 'The Quiet Monument',
      subtitle: 'Mare Tranquillitatis • Footprints That Last a Million Years',
      telemetryCallout: 'DESCENT STAGES: 6 INTACT • EROSION RATE: MICROMETEOROIDS ONLY',
      storyByTrack: {
        junior: [
          'When it was time to go home, the top half of Eagle blasted off using the golden bottom half as its launchpad! Six golden descent stages and three electric moon buggies are still sitting quietly on the Moon right now.',
          'Because the Moon has no wind, no rain, and no rivers, the bootprints and moon buggies tracks pressed into the lunar dust are still sharp and crisp today—waiting for future explorers!'
        ],
        cadet: [
          'Igniting its 15.6-kN Ascent Propulsion System engine, Eagle’s upper stage lifted Armstrong and Aldrin back to dock with Columbia, leaving the octagonal descent stage resting at Tranquility Base.',
          'In 2009 and 2012, NASA’s Lunar Reconnaissance Orbiter photographed the Apollo descent stages, parked moon buggies, and astronauts’ dark footpath trails from 50 km overhead.'
        ],
        scientist: [
          'Following ascent-stage staging via pyrotechnic guillotine severing of interstage umbilicals, the six LM descent stages remained intact across the lunar nearside.',
          'In the absence of atmospheric or fluvial erosion, regolith footprints and moon buggies ruts degrade solely via space weathering and micrometeoroid gardening (~1 mm per Myr).'
        ]
      },
      scientistDecision: {
        prompt: 'Why are the footprints and moon buggies tire tracks left by Apollo astronauts still sitting in the Moon’s dust today?',
        options: [
          {
            label: 'Because the Moon has no wind, rain, or air to blow or wash them away!',
            outcome: 'Exact match! Without wind or water, footprints on the Moon last for millions of years!',
            isOptimal: true
          },
          {
            label: 'Because robots sweep around them every week',
            outcome: 'No sweeping needed! The airless vacuum of the Moon preserves the footprints naturally.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'Which parts of the Apollo missions are still sitting on the Moon today?',
        options: [
          'Six gold-foil descent stages and three electric moon buggies',
          'The giant Saturn V launch tower',
          'The splashdown parachutes'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Spot on! The bottom descent stages and three electric moon buggies stayed on the Moon while the top ascent stages flew the astronauts back to lunar orbit!',
          'The launch tower stayed in Florida!',
          'Only the Command Module used parachutes when splashing down in the Pacific Ocean on Earth!'
        ]
      }
    }
  ],
  'lro-orbiter': [
    {
      number: 1,
      title: 'Leaving Earth',
      subtitle: 'June 18, 2009 • The Vanguard of Return to the Moon',
      telemetryCallout: 'ATLAS V LAUNCH • ORBIT: 50 KM POLAR RECONNAISSANCE',
      storyByTrack: {
        junior: [
          'In 2009, NASA launched the Lunar Reconnaissance Orbiter (LRO)—a robotic scout sent to map every single mountain, crater, and boulder on the Moon from just 31 miles up!',
          'LRO’s mission was to create the ultimate 3D treasure map of the Moon so future Artemis astronauts know the safest, most scientifically exciting places to land.'
        ],
        cadet: [
          'Launching atop an Atlas V 401 rocket alongside the LCROSS impactor on June 18, 2009, LRO entered a low polar orbit skimming just 50 km above the lunar peaks.',
          'Carrying seven instruments—including a 5-beam laser altimeter and sub-meter narrow-angle cameras—LRO bridged historical Apollo exploration with the modern Artemis program.'
        ],
        scientist: [
          'Inserted into a quasi-frozen polar lunar orbit (30 × 50 km over the South Pole), LRO integrated seven payload suites including LROC, LOLA, Diviner, LAMP, LEND, CRaTER, and Mini-RF.',
          'Its Ka-band high-rate transmitter (100 Mbps) has delivered over 1.4 petabytes of planetary geospatial data—exceeding all other planetary missions combined.'
        ]
      },
      scientistDecision: {
        prompt: 'You want LRO to map the ENTIRE Moon—including the North and South Poles—not just the equator. What kind of orbit do you choose?',
        options: [
          {
            label: 'A Polar Orbit looping over the North and South Poles as the Moon spins underneath!',
            outcome: 'Smart navigation! A polar orbit lets LRO pass directly over the icy poles on every single lap while the rotating Moon reveals 100% of its surface!',
            isOptimal: true
          },
          {
            label: 'Hover in one spot above the Moon’s equator',
            outcome: 'If you stay over the equator, you can never see into the deep craters at the North and South Poles!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'Why does LRO fly in a loop over the Moon’s North and South Poles?',
        options: [
          'So it can map 100% of the Moon’s surface and peer directly into polar craters',
          'Because the Moon’s equator has too many clouds',
          'To stay warm near the poles'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Yes! As the Moon slowly rotates once a month underneath LRO’s polar loop, the orbiter scans every square meter of the lunar globe!',
          'The Moon has no clouds anywhere!',
          'Actually, the lunar poles have the coldest craters in the entire solar system!'
        ]
      }
    },
    {
      number: 2,
      title: 'Spotting Apollo’s Footprints',
      subtitle: '50 Centimeters Per Pixel • History Seen from Space',
      telemetryCallout: 'CAMERA RESOLUTION: 0.5 METERS/PIXEL • 6 APOLLO SITES MAPPED',
      storyByTrack: {
        junior: [
          'Skimming low over the Moon, LRO pointed its telephoto camera at the six Apollo landing sites from the 1960s and 1970s. The photos were so sharp you could see the golden Apollo descent stages casting long shadows!',
          'Even more amazing: you can clearly see the wiggly footpaths where astronauts walked and the parallel tire tracks left by the Apollo 15, 16, and 17 moon buggies!'
        ],
        cadet: [
          'With its Narrow Angle Cameras resolving details down to 50 centimeters per pixel, LRO imaged all six Apollo landing sites, Soviet Lunokhod rovers, and Surveyor landers.',
          'By photographing the sites under low-angle sunrise and sunset lighting, LRO revealed the disturbed darker regolith of astronaut boot trails and moon buggies tracks.'
        ],
        scientist: [
          'LROC NAC push-broom imaging from periapsis altitudes of 21–50 km achieved ground sample distances (GSD) of 0.25–0.50 m/pixel across Mare Tranquillitatis, Fra Mauro, Hadley Rille, Descartes, and Taurus-Littrow.',
          'Multi-temporal reflectance ratios also quantified blast-zone regolith smoothing from descent engine plumes.'
        ]
      },
      scientistDecision: {
        prompt: 'You want to photograph the Apollo 11 lander on the Moon so it stands out clearly from 31 miles up. What time of the lunar day gives the best contrast?',
        options: [
          {
            label: 'When the Sun is low on the horizon so the lander casts a long, dramatic shadow!',
            outcome: 'Photographer’s bullseye! Low sunlight casts long shadows across the flat gray dust, making the lander and scientific gear pop right out!',
            isOptimal: true
          },
          {
            label: 'Wait for pitch-black midnight with no sunlight',
            outcome: 'In pitch-black night, optical cameras only see darkness! Low-angle sunlight casts crisp shadows.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'What was LRO’s camera sharp enough to photograph at the Apollo landing sites?',
        options: [
          'The actual lander descent stages, moon buggies, and astronaut footpath trails',
          'The brand name printed on the bottom of a boot',
          'Earth cities'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Yes! At 0.5 meters per pixel, LRO clearly resolved the Apollo descent stages, parked moon buggies, and disturbed footpath trails!',
          'Letters on a boot are only millimeters wide—you’d need to walk up close on the surface to read those!',
          'LRO’s high-res cameras are tuned for scanning the lunar surface 50 km below!'
        ]
      }
    },
    {
      number: 3,
      title: 'Discovering Polar Ice Traps',
      subtitle: 'Shackleton Crater • The Coldest Places in the Solar System',
      telemetryCallout: 'COLD TRAP TEMP: -248°C (25 K) • WATER ICE RESERVOIRS: CONFIRMED',
      storyByTrack: {
        junior: [
          'At the Moon’s South Pole, deep craters like Shackleton have walls so tall that sunlight has NEVER touched their floors in 2 billion years! LRO’s heat sensor measured these dark crater floors at -415°F (-248°C)—colder than distant Pluto!',
          'Because they are so icy cold, any water from ancient comets that bounced into those craters got trapped as frozen ice! LRO confirmed billions of tons of water ice are waiting there for future astronauts.'
        ],
        cadet: [
          'Using its Diviner radiometer, LAMP ultraviolet starlight sensor, and LEND neutron detector, LRO discovered that Permanently Shadowed Regions (PSRs) at the lunar poles drop to 25 Kelvin (-248°C).',
          'These cryogenic cold traps preserve ancient water frost and subsurface ice deposits—which astronauts can harvest for drinking water, breathable oxygen, and hydrogen/oxygen rocket fuel!'
        ],
        scientist: [
          'Diviner thermal mapping identified Permanently Shadowed Regions inside South Polar craters (Shackleton, Haworth, Shoemaker) maintaining bolometric temperatures < 30 K—colder than Pluto’s surface.',
          'LEND epithermal neutron suppression and LAMP Lyman-alpha UV albedo profiles confirmed sequestered H₂O frost (1–5 wt%) within polar regolith cold traps.'
        ]
      },
      scientistDecision: {
        prompt: 'A crater at the Moon’s South Pole is in 100% pitch darkness because sunlight never reaches the bottom. How can LRO’s ultraviolet camera see the frost on the crater floor?',
        options: [
          {
            label: 'Use the faint ultraviolet glow of distant stars and space hydrogen to see in the dark!',
            outcome: 'Mind-blowing science! LRO’s LAMP instrument actually uses gentle ultraviolet starlight to see frost inside pitch-black craters!',
            isOptimal: true
          },
          {
            label: 'Wait until summer for the Sun to shine straight down into the crater',
            outcome: 'Because the Moon’s tilt is only 1.5 degrees, the Sun NEVER shines into the bottom of deep polar craters—even in summer!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'Why is discovering water ice at the Moon’s South Pole such a big deal for Artemis astronauts?',
        options: [
          'They can build a lunar hockey rink',
          'Water can be used for drinking AND split into breathable oxygen and rocket fuel!',
          'It proves fish live on the Moon'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'While lunar curling sounds fun, water is far too precious!',
          'Bingo! H₂O gives astronauts drinking water, oxygen to breathe, and hydrogen/oxygen propellant so rockets can refuel on the Moon!',
          'No lunar fish—that ice came from ancient comets and solar wind interactions!'
        ]
      }
    },
    {
      number: 4,
      title: 'Guiding Artemis Home',
      subtitle: 'Active Lunar Recon • Peaks of Eternal Light',
      telemetryCallout: 'ARCHIVE: 1.4+ PETABYTES • ARTEMIS III LANDING ZONES: MAPPED',
      storyByTrack: {
        junior: [
          'Right next to those pitch-black ice craters at the South Pole, LRO’s laser altimeter mapped tall mountain rims bathed in sunlight almost 90% of the year!',
          'Still orbiting the Moon today after 17+ years, LRO has mapped the exact landing zones where Artemis astronauts will touch down—with sunny peaks for solar power right next to shadowy craters holding water ice!'
        ],
        cadet: [
          'Using over 6.9 billion laser pulses from its LOLA altimeter, LRO created a 3D topographic map of the Moon accurate to within centimeters.',
          'This dataset identified the candidate Artemis III South Polar landing regions: elevated ridges with near-continuous solar illumination adjacent to water-rich permanently shadowed craters.'
        ],
        scientist: [
          'LOLA’s 5-spot 1064-nm laser altimeter generated geodetically controlled digital elevation models (DEMs) and slope-hazard maps across the 13 candidate Artemis III landing regions within 6° of the lunar South Pole.',
          'Simultaneously, LRO continues monitoring contemporary impact cratering rates, discovering over 220 fresh impact craters formed since 2009.'
        ]
      },
      scientistDecision: {
        prompt: 'You are picking the base camp spot for Artemis astronauts at the Moon’s South Pole. Where is the sweet spot?',
        options: [
          {
            label: 'On a high sunny crater rim (for solar power & warmth) right next to a dark crater holding water ice!',
            outcome: 'Textbook lunar base design! You get nearly continuous sunlight for solar arrays while being right next door to water ice resources!',
            isOptimal: true
          },
          {
            label: 'At the very bottom of a -248°C dark crater with zero sunlight',
            outcome: 'Brrr! Living permanently in -248°C darkness would freeze your base! Camping on the sunny rim right above the crater gives you solar power AND access to the ice.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'How has LRO measured the exact height of every mountain and crater slope on the Moon?',
        options: [
          'By dropping a long tape measure',
          'By firing billions of laser pulses at the surface and timing how fast they bounce back (LOLA)',
          'By guessing from shadows alone'
        ],
        correctIndex: 1,
        playfulExplanations: [
          'A 31-mile tape measure at 3,600 mph would snag on the first mountain!',
          'Correct! LRO’s LOLA laser altimeter has fired nearly 7 billion laser pulses to build the most accurate 3D map of the Moon ever made!',
          'Shadows help, but laser pulses measure height down to the centimeter—even inside dark craters!'
        ]
      }
    }
  ],
  'alsep-stations': [
    {
      number: 1,
      title: 'Unpacking the Lunar Science Suitcase',
      subtitle: '1969–1972 • Apollo 12, 14, 15, 16 & 17 Surface Stations',
      telemetryCallout: 'POWER: SNAP-27 RTG (70W) • CENTRAL STATION: S-BAND LINK',
      storyByTrack: {
        junior: [
          'After Apollo astronauts landed on the Moon, they didn’t just collect rocks—they unpacked shiny silver suitcases and set up robotic science villages right on the gray lunar dust!',
          'Each station was powered by a glowing nuclear heater called a SNAP-27 RTG generator, letting the instruments survive the freezing 14-day-long lunar nights after the astronauts flew home!'
        ],
        cadet: [
          'Deployed across five lunar landing sites (Apollo 12, 14, 15, 16, and 17), the Apollo Lunar Surface Experiments Package (ALSEP) formed a solar-system-first planetary geophysical network.',
          'Each station connected via ribbon cables to a Central Station powered by a 70-watt plutonium-238 radioisotope thermoelectric generator (SNAP-27 RTG), transmitting telemetry continuously for up to 8 years.'
        ],
        scientist: [
          'The five-node ALSEP array integrated tri-axial long-period and short-period passive seismometers, suprathermal ion detectors, heat-flow probes, and cold-cathode ion gauges around a 25-kg Central Station.',
          'Powered by SNAP-27 RTG Pu-238 units (2,300 W thermal / 73 W electrical), the stations survived 300 K diurnal thermal swings across nearly 100 lunations.'
        ]
      },
      scientistDecision: {
        prompt: 'A single lunar night lasts 14 Earth days in pitch darkness at -173°C. How should you power the ALSEP science stations so they stay awake all night?',
        options: [
          {
            label: 'Use a compact SNAP-27 RTG nuclear heat battery that generates steady power day and night!',
            outcome: 'Brilliant! The SNAP-27 RTG nuclear generators kept all five ALSEP stations running continuously through freezing two-week lunar nights until 1977!',
            isOptimal: true
          },
          {
            label: 'Use only tiny solar panels with no night battery',
            outcome: 'Without heat and power during the 354-hour lunar night, delicate electronics would freeze solid! That is why NASA used SNAP-27 RTGs.',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'How did the ALSEP science stations keep working after the Apollo astronauts flew back to Earth?',
        options: [
          'They used nuclear heat batteries (SNAP-27 RTGs) and radioed data automatically to Earth for 8 years!',
          'Astronauts stayed behind to wind them up',
          'They ran on wind turbines'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Spot on! Those SNAP-27 RTG generators powered the stations day and night until September 1977!',
          'Every astronaut returned safely to Earth—the stations ran 100% robotically!',
          'The Moon has no air or wind to spin a turbine!'
        ]
      }
    },
    {
      number: 2,
      title: 'The Moon Rings Like a Bell',
      subtitle: '12,000+ Moonquakes & Meteor Impacts Recorded',
      telemetryCallout: 'SEISMIC SENSITIVITY: 0.1 NANOMETER • REVERB: >60 MINUTES',
      storyByTrack: {
        junior: [
          'When NASA deliberately crashed an empty rocket stage into the Moon to test the ALSEP quake sensors, something spooky happened: the Moon vibrated for over an hour! Mission Control said the Moon "rang like a giant bell!"',
          'Why? Because Earth has water in its rocks that acts like a wet sponge to soak up vibrations, while the Moon is bone-dry and rigid!'
        ],
        cadet: [
          'ALSEP’s Passive Seismic Experiments detected over 12,000 seismic events between 1969 and 1977, including deep tidal moonquakes, meteoroid strikes, and shallow tectonic quakes.',
          'Unlike Earth quakes that fade in minutes, lunar seismic waves reverberated for over an hour due to the absence of water and volatile damping in the dry, fractured lunar megaregolith.'
        ],
        scientist: [
          'P- and S-wave arrival times across the Apollo 12, 14, 15, and 16 seismic triangle constrained the lunar crust thickness (~30–40 km), deep moonquake nests at 700–1,200 km depth, and a small partially molten core.',
          'High seismic Q-factors (Q ≈ 3,000–5,000 in the upper crust) produced intense codas lasting >60 minutes following S-IVB and LM ascent-stage artificial impacts.'
        ]
      },
      scientistDecision: {
        prompt: 'Why did moonquakes make the Moon vibrate for over an hour ("ringing like a bell") while earthquakes stop after a minute?',
        options: [
          {
            label: 'Because the Moon’s rocks are bone-dry with no water to absorb the vibrations!',
            outcome: 'Exact science! Water in Earth’s rocks damps out seismic waves quickly, whereas dry lunar rock lets vibrations echo back and forth for an hour!',
            isOptimal: true
          },
          {
            label: 'Because the Moon is made of hollow brass metal',
            outcome: 'The Moon is solid silicate rock and iron—its dry, fractured upper crust simply scatters seismic echoes without water to absorb them!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'How many moonquakes and meteor impacts did the ALSEP seismic stations detect on the Moon?',
        options: [
          'Over 12,000!',
          'Zero—the Moon is completely still',
          'Only 2'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Yes! Over 12,000 moonquakes and meteorite hits were recorded across 8 years, proving the Moon is geologically active!',
          'The Moon actually rumbles with deep tidal moonquakes and shallow quakes!',
          'Way more than 2—thousands of quakes were logged!'
        ]
      }
    },
    {
      number: 3,
      title: 'Bouncing Lasers Off the Moon',
      subtitle: 'Lunar Laser Ranging Retroreflectors (LRRR) • Still Active Today!',
      telemetryCallout: 'LASER PRECISION: MILLIMETERS • LUNAR DRIFT: +3.8 CM/YEAR',
      storyByTrack: {
        junior: [
          'One part of the Apollo science stations didn’t need electricity at all: a suitcase-sized laser mirror tray of 100 quartz corner mirrors! Any laser beam fired from Earth hits the laser mirror and bounces straight back where it came from.',
          'Astronomers still bounce lasers off these laser mirrors today! By timing the light’s 2.5-second round trip, we discovered the Moon is slowly spiraling away from Earth by 3.8 centimeters (1.5 inches) every year—about as fast as your fingernails grow!'
        ],
        cadet: [
          'Deployed on Apollo 11, 14, and 15, the Lunar Laser Ranging Retroreflector (LRRR) laser mirror arrays consist of fused-silica corner-cube prisms that reflect Earth-based observatory laser pulses directly back along their incident vector.',
          'Over 55+ years of continuous laser ranging, millimeter-precision time-of-flight measurements proved the Moon recedes from Earth at 3.8 cm/year due to tidal angular momentum transfer.'
        ],
        scientist: [
          'Utilizing total internal reflection within 3.8-cm fused-quartz corner cubes, the passive LRRR laser mirror arrays enable sub-centimeter range normal points from Apache Point and Grasse laser stations.',
          'Long-baseline lunar laser ranging constrains the Equivalence Principle, relativistic geodetic precession, tidal dissipation (Q ≈ 12), and fluid-core oblateness.'
        ]
      },
      scientistDecision: {
        prompt: 'You want an experiment on the Moon that will still work 55+ years later with zero battery power. What do you leave on the surface?',
        options: [
          {
            label: 'A passive laser mirror tray of quartz corner-cube prisms (Retroreflector) to bounce Earth lasers back!',
            outcome: 'Genius! The Apollo 11, 14, and 15 Laser Mirrors have no moving parts or batteries and are STILL used by observatories today!',
            isOptimal: true
          },
          {
            label: 'A giant spotlight that needs plugs and bulbs',
            outcome: 'Bulbs burn out and batteries drain—passive quartz prisms last for centuries!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'What amazing secret did the Apollo Laser Mirrors reveal about the Moon’s orbit?',
        options: [
          'The Moon is slowly spiraling away from Earth by 3.8 cm (1.5 inches) every year!',
          'The Moon is getting closer every day',
          'The Moon is shaped like a cube'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Bullseye! Tidal forces between Earth’s oceans and the Moon push the Moon outward by 3.8 cm per year—and laser mirrors still measure it today!',
          'It is actually spiraling outward, not inward!',
          'The Moon is a rocky sphere!'
        ]
      }
    },
    {
      number: 4,
      title: 'The 1977 Command Shutdown & Eternal Vigil',
      subtitle: 'September 30, 1977 • Standing Intact on the Lunar Plains',
      telemetryCallout: 'FINAL COMMAND: SEPT 30, 1977 • LASER ARRAYS: STILL ACTIVE',
      storyByTrack: {
        junior: [
          'The SNAP-27 RTG nuclear batteries on the Apollo science stations worked so well that they outlasted their planned 1-year mission by 7 extra years! Finally, on September 30, 1977, NASA turned off the radio receivers on Earth to save budget for new space missions.',
          'Even though their radios were switched off, all five ALSEP stations still stand intact in the vacuum of the Moon—and their quartz laser mirrors still flash answers back to Earth every clear night!'
        ],
        cadet: [
          'After logging over 12,000 seismic events and operating up to eight times longer than designed, the ALSEP network’s S-band transmitters were commanded into standby on September 30, 1977.',
          'In the airless lunar environment, the gold-foiled Central Stations, SNAP-27 RTG fins, and ribbon cables remain preserved as historic scientific monuments.'
        ],
        scientist: [
          'Following termination of network ground support on 30 September 1977, over 11,000 magnetic tapes of ALSEP telemetry were later recovered and digitized under the Lunar Data Node restoration project.',
          'These archival waveforms enabled modern reanalysis of lunar core-mantle boundary reflections that directly informed the Artemis Geophysical Network.'
        ]
      },
      scientistDecision: {
        prompt: 'Old 1970s computer tapes holding ALSEP moonquake recordings are sitting in dusty archives. Should modern scientists digitize and re-study them with 21st-century supercomputers?',
        options: [
          {
            label: 'Yes! Modern seismic algorithms can find hidden deep-core echoes in 1970s Apollo data!',
            outcome: 'Spot on! In 2011, scientists re-analyzed digitized Apollo seismic tapes and proved the Moon has a hot, partially liquid iron core!',
            isOptimal: true
          },
          {
            label: 'Throw the old tapes away—1970s data is useless',
            outcome: 'Never throw away planetary telemetry! Re-analyzing Apollo tapes revealed the Moon’s inner core 40 years after the astronauts landed!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: 'Which part of the Apollo surface science stations is STILL actively used by astronomers on Earth today?',
        options: [
          'The quartz Laser Mirror Retroreflector trays',
          'A steam engine',
          'A weather balloon'
        ],
        correctIndex: 0,
        playfulExplanations: [
          'Yes! Because the quartz corner laser mirrors need zero electricity, observatories still bounce laser pulses off them every week!',
          'No steam engines on the Moon!',
          'With no air on the Moon, a balloon cannot float!'
        ]
      }
    }
  ]
};

export function getMissionStoryChapters(
  missionId: string,
  fallbackMission: {
    title: string;
    launchText: string;
    sectorLabel: string;
    nasaArchiveId: string;
    narrativesByTrack: Record<AgeTrack, string>;
    lastTransmissionQuote: string;
    subsystems: { name: string; role: string; kidAnalogy: string; code: string }[];
    quizQuestion: {
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    };
  }
): StoryChapter[] {
  if (STORY_CHAPTERS_BY_MISSION[missionId]) {
    return STORY_CHAPTERS_BY_MISSION[missionId];
  }

  const sub0 = fallbackMission.subsystems[0];
  const sub1 = fallbackMission.subsystems[1] || fallbackMission.subsystems[0];
  const sub2 = fallbackMission.subsystems[2] || fallbackMission.subsystems[0];

  return [
    {
      number: 1,
      title: 'Leaving Earth & Liftoff',
      subtitle: `${fallbackMission.launchText} • Target: ${fallbackMission.sectorLabel}`,
      telemetryCallout: `ARCHIVE ID: ${fallbackMission.nasaArchiveId} • LAUNCH SEQUENCE NOMINAL`,
      storyByTrack: {
        junior: [
          fallbackMission.narrativesByTrack.junior,
          `Equipped with ${sub0.name} (${sub0.kidAnalogy.toLowerCase()}), ${fallbackMission.title} blasted off from Florida on a daring one-way voyage into the solar system!`
        ],
        cadet: [
          fallbackMission.narrativesByTrack.cadet,
          `Engineered around ${sub0.name} (${sub0.code})—${sub0.role.toLowerCase()}—the hardware pioneer set course for ${fallbackMission.sectorLabel}.`
        ],
        scientist: [
          fallbackMission.narrativesByTrack.scientist,
          `Primary payload integration centered on ${sub0.name} (${sub0.code}), calibrated to execute high-precision observations at ${fallbackMission.sectorLabel}.`
        ]
      },
      scientistDecision: {
        prompt: `As Mission Director for ${fallbackMission.title}, you must verify ${sub0.name} before entering ${fallbackMission.sectorLabel}. What is your command?`,
        options: [
          {
            label: `Run full calibration on ${sub0.name} to ensure peak scientific accuracy!`,
            outcome: `Telemetry nominal! ${sub0.name} locked on target and returned historic planetary data!`,
            isOptimal: true
          },
          {
            label: 'Skip instrument checks to save 5 minutes',
            outcome: 'In deep space, careful instrument calibration during cruise is essential before reaching your target!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: fallbackMission.quizQuestion.question,
        options: fallbackMission.quizQuestion.options,
        correctIndex: fallbackMission.quizQuestion.correctIndex,
        playfulExplanations: fallbackMission.quizQuestion.options.map((_, idx) =>
          idx === fallbackMission.quizQuestion.correctIndex
            ? fallbackMission.quizQuestion.explanation
            : `Not quite! ${fallbackMission.quizQuestion.explanation}`
        )
      }
    },
    {
      number: 2,
      title: 'Arrival & First Contact',
      subtitle: `${fallbackMission.sectorLabel} • Deploying ${sub1.name}`,
      telemetryCallout: `SUBSYSTEM ACTIVE: ${sub1.code} • TELEMETRY LOCK ESTABLISHED`,
      storyByTrack: {
        junior: [
          `Arriving at ${fallbackMission.sectorLabel}, ${fallbackMission.title} activated its ${sub1.name}! Think of it as ${sub1.kidAnalogy.toLowerCase()}`,
          'Right away, pictures and science clues began streaming back across millions of miles to cheering engineers at NASA Mission Control!'
        ],
        cadet: [
          `Upon arrival in ${fallbackMission.sectorLabel}, ${fallbackMission.title} deployed ${sub1.name} (${sub1.code}): ${sub1.role}.`,
          'Deep Space Network dishes locked onto the mission carrier signal, decoding unprecedented environmental measurements.'
        ],
        scientist: [
          `Operating in ${fallbackMission.sectorLabel}, ${sub1.name} (${sub1.code}) executed primary science acquisition (${sub1.role}).`,
          `Downlink packets confirmed nominal instrument thermal margins and high signal-to-noise ratio across the Deep Space Network.`
        ]
      },
      scientistDecision: {
        prompt: `${fallbackMission.title} has reached ${fallbackMission.sectorLabel}! How do you use ${sub1.name} first?`,
        options: [
          {
            label: `Activate ${sub1.name} (${sub1.role.toLowerCase()}) and transmit high-priority telemetry!`,
            outcome: `Awesome choice! ${sub1.name} worked flawlessly and revealed brand-new planetary secrets!`,
            isOptimal: true
          },
          {
            label: 'Keep all science instruments turned off',
            outcome: 'We flew millions of miles to explore—turning on the science instruments is why we came!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: `What is the special job of ${fallbackMission.title}’s ${sub1.name}?`,
        options: [
          sub1.role,
          'Making ice cream in zero gravity',
          'Playing loud rock music in space'
        ],
        correctIndex: 0,
        playfulExplanations: [
          `Spot on! In kid terms: ${sub1.kidAnalogy}`,
          'No ice cream freezers aboard this mission hardware!',
          'Remember, sound waves can’t travel through the vacuum of space!'
        ]
      }
    },
    {
      number: 3,
      title: 'Breakthrough Discovery',
      subtitle: `Unveiling the Secrets of ${fallbackMission.sectorLabel}`,
      telemetryCallout: `INSTRUMENT: ${sub2.code} • DISCOVERY LOG VERIFIED`,
      storyByTrack: {
        junior: [
          `Next, ${fallbackMission.title} used its ${sub2.name}—${sub2.kidAnalogy.toLowerCase()}`,
          `Thanks to this clever tool, ${fallbackMission.title} rewrote science textbooks and showed kids everywhere what ${fallbackMission.sectorLabel} is really like!`
        ],
        cadet: [
          `Using ${sub2.name} (${sub2.code}), ${fallbackMission.title} achieved a major milestone: ${sub2.role}.`,
          fallbackMission.quizQuestion.explanation
        ],
        scientist: [
          `High-resolution datasets from ${sub2.name} (${sub2.code})—${sub2.role}—provided definitive empirical evidence in ${fallbackMission.sectorLabel}.`,
          fallbackMission.quizQuestion.explanation
        ]
      },
      scientistDecision: {
        prompt: `${sub2.name} just detected an exciting anomaly in ${fallbackMission.sectorLabel}! What should the science team do?`,
        options: [
          {
            label: `Focus ${sub2.name} for a deep-dive observation and beam the discovery to Earth!`,
            outcome: `Discovery confirmed! ${fallbackMission.quizQuestion.explanation}`,
            isOptimal: true
          },
          {
            label: 'Ignore the reading and look away',
            outcome: 'Real space scientists always investigate surprising readings—that’s how the biggest discoveries happen!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: `How does the Cosmic Glossary describe ${sub2.name} in kid-friendly terms?`,
        options: [
          sub2.kidAnalogy,
          'A giant wooden paddle for rowing through space',
          'A submarine periscope for underwater oceans on Earth'
        ],
        correctIndex: 0,
        playfulExplanations: [
          `Yes! ${sub2.kidAnalogy}`,
          'You can’t row a paddle in vacuum!',
          `This instrument was built specifically for ${fallbackMission.sectorLabel}!`
        ]
      }
    },
    {
      number: 4,
      title: 'Enduring Cosmic Legacy',
      subtitle: `Preserved in ${fallbackMission.sectorLabel} • Abandoned but not lost`,
      telemetryCallout: fallbackMission.lastTransmissionQuote,
      storyByTrack: {
        junior: [
          `Last recorded signal log: "${fallbackMission.lastTransmissionQuote}"`,
          `Today, ${fallbackMission.title} is an unforgettable hero of the Space Legacy archive—proving that even when a mission grows quiet or travels billions of miles away, it is abandoned but not lost!`
        ],
        cadet: [
          `Final / Latest Telemetry Log: "${fallbackMission.lastTransmissionQuote}"`,
          `Every measurement gathered by ${fallbackMission.title} in ${fallbackMission.sectorLabel} is permanently archived in NASA’s Planetary Data System for future explorers.`
        ],
        scientist: [
          `Telemetry Archive Packet: "${fallbackMission.lastTransmissionQuote}"`,
          `${fallbackMission.title} remains a cornerstone dataset within the NASA Planetary Data System, guiding next-generation robotic and human exploration of ${fallbackMission.sectorLabel}.`
        ]
      },
      scientistDecision: {
        prompt: `Why does NASA preserve every single photo and telemetry packet from ${fallbackMission.title} in public archives?`,
        options: [
          {
            label: 'So students, engineers, and future astronauts can build on its discoveries!',
            outcome: '100% true! Every mission in Space Legacy paved the road for the next generation of explorers—including YOU!',
            isOptimal: true
          },
          {
            label: 'Nobody ever looks at space photos again',
            outcome: 'Scientists and kids around the world explore NASA’s public mission archives every single day!',
            isOptimal: false
          }
        ]
      },
      quiz: {
        question: fallbackMission.quizQuestion.question,
        options: fallbackMission.quizQuestion.options,
        correctIndex: fallbackMission.quizQuestion.correctIndex,
        playfulExplanations: fallbackMission.quizQuestion.options.map((_, idx) =>
          idx === fallbackMission.quizQuestion.correctIndex
            ? fallbackMission.quizQuestion.explanation
            : `Remember: ${fallbackMission.quizQuestion.explanation}`
        )
      }
    }
  ];
}
