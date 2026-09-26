export type DestinationFilter = 'all' | 'moon' | 'mars' | 'deep space';
export type StatusFilter = 'all' | 'active' | 'complete' | 'traveling' | 'historic';
export type AgeTrack = 'junior' | 'cadet' | 'scientist';

export interface TelemetryMetric {
  label: string;
  value: string;
  accent?: 'primary' | 'primary-fixed' | 'secondary' | 'tertiary' | 'on-surface' | 'outline';
}

export interface SubsystemSpec {
  name: string;
  code: string;
  role: string;
  kidAnalogy: string;
  powerOrSpec: string;
  xPercent: number;
  yPercent: number;
}

export interface AchievementBadge {
  id: string;
  name: string;
  emoji: string;
  colorTheme: 'cyan' | 'amber' | 'violet' | 'emerald';
  description: string;
  unlockCriteria: string;
  xpValue: number;
  targetProgress: number;
}

export const ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'curious-spark',
    name: 'Curious Spark',
    emoji: '⚡',
    colorTheme: 'cyan',
    description: 'Awarded to inquisitive explorers who use the Cosmic Dictionary to decode space terms!',
    unlockCriteria: 'Open or look up words in the Cosmic Dictionary 3 times',
    xpValue: 150,
    targetProgress: 3,
  },
  {
    id: 'lexicon-master',
    name: 'Lexicon Master',
    emoji: '📖',
    colorTheme: 'violet',
    description: 'Mastered tough technical space jargon like AU, SNAP-27 RTG, laser mirror, moon buggies, and golden plaque!',
    unlockCriteria: 'Explore 3 technical terms (AU, SNAP-27 RTG, laser mirror, moon buggies, or golden plaque)',
    xpValue: 250,
    targetProgress: 3,
  },
  {
    id: 'lunar-pioneer',
    name: 'Lunar Pioneer',
    emoji: '🌕',
    colorTheme: 'cyan',
    description: 'Explored every Moon hardware artifact from Apollo landing stages and ALSEP stations to LRO!',
    unlockCriteria: 'Explore all 3 Moon hardware missions',
    xpValue: 200,
    targetProgress: 3,
  },
  {
    id: 'red-planet-rover',
    name: 'Red Planet Rover',
    emoji: '🛞',
    colorTheme: 'amber',
    description: 'Inspected all 6 Martian rovers and polar landers across the rusty plains and craters of Mars!',
    unlockCriteria: 'Explore all 6 Mars hardware missions',
    xpValue: 300,
    targetProgress: 6,
  },
  {
    id: 'deep-space-voyager',
    name: 'Deep Space Voyager',
    emoji: '🌌',
    colorTheme: 'violet',
    description: 'Journeyed to the outer solar system and interstellar space across all 4 deep space pioneers!',
    unlockCriteria: 'Explore all 4 Deep Space missions',
    xpValue: 250,
    targetProgress: 4,
  },
  {
    id: 'cosmic-genius',
    name: 'Cosmic Genius',
    emoji: '🧠',
    colorTheme: 'emerald',
    description: 'Achieved a 100% perfect score on mission quiz challenges!',
    unlockCriteria: 'Score 100% on any mission quiz challenge',
    xpValue: 300,
    targetProgress: 1,
  },
  {
    id: 'hardware-engineer',
    name: 'Hardware Engineer',
    emoji: '🔧',
    colorTheme: 'amber',
    description: 'Explored 5 historic NASA spacecraft, rovers, and landers across the Space Legacy Catalogue!',
    unlockCriteria: 'Explore 5 different mission hardware dossiers',
    xpValue: 200,
    targetProgress: 5,
  },
  {
    id: 'signal-decoder',
    name: 'Signal Decoder',
    emoji: '📡',
    colorTheme: 'emerald',
    description: 'Decoded Opportunity’s final Sol 5,111 Deep Space Network mystery transmission!',
    unlockCriteria: 'Solve the Daily Mystery Signal challenge',
    xpValue: 150,
    targetProgress: 1,
  },
];

export interface MissionHardware {
  id: string;
  orderNumber: number;
  title: string;
  shortTitle: string;
  destination: Exclude<DestinationFilter, 'all'>;
  sectorLabel: string;
  sectorAccent: 'primary' | 'secondary' | 'tertiary' | 'on-surface';
  launchText: string;
  launchYear: number;
  status: Exclude<StatusFilter, 'all'>;
  statusBadgeText: string;
  statusBadgeStyle: 'secondary' | 'tertiary' | 'primary' | 'historic';
  topRightIcon: string;
  nasaArchiveId: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
  narrativesByTrack: Record<AgeTrack, string>;
  telemetry: [TelemetryMetric, TelemetryMetric, TelemetryMetric];
  provenance: string;
  distanceAU: number;
  coordinates: string;
  lastTransmissionQuote: string;
  subsystems: SubsystemSpec[];
  badge: {
    name: string;
    emoji: string;
    colorTheme: 'cyan' | 'amber' | 'violet' | 'emerald';
    unlockCriteria: string;
    xpValue: number;
  };
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    badgeName: string;
  };
}

export const LOGO_URL = '/images/space-legacy-logo.svg';

const IMG_MOON = '/images/sectors/moon.jpg';
const IMG_MARS_VALLEY = '/images/sectors/mars.jpg';
const IMG_DEEP_SPACE = '/images/sectors/deep-space.jpg';

export const DESTINATION_SECTORS = [
  {
    id: 'moon' as const,
    badgeText: '3 Lunar Pioneers',
    badgeStyle: 'primary',
    title: 'The Moon',
    description:
      'Apollo descent stages, moon buggies, ALSEP seismic stations, and LRO polar ice reconnaissance above lunar regolith.',
    ctaText: 'Enter Lunar Sector',
    auText: '0.0026 AU',
    imageUrl: IMG_MOON,
  },
  {
    id: 'mars' as const,
    badgeText: '6 Surface Explorers',
    badgeStyle: 'tertiary',
    title: 'Mars',
    description:
      'Spirit, Opportunity, Phoenix, Curiosity, InSight, and Perseverance exploring ancient Martian lakes and polar ice.',
    ctaText: 'Enter Martian Field',
    auText: '1.524 AU',
    imageUrl: IMG_MARS_VALLEY,
  },
  {
    id: 'deep space' as const,
    badgeText: '4 Outer Voyagers',
    badgeStyle: 'secondary',
    title: 'Deep Space & Beyond',
    description:
      'Pioneer 10 & 11, Voyager 1 & 2, Cassini at Saturn, and New Horizons racing through the icy Kuiper Belt.',
    ctaText: 'Explore The Void',
    auText: '162+ AU',
    imageUrl: IMG_DEEP_SPACE,
  },
];

export const MISSION_HARDWARE: MissionHardware[] = [
  {
    id: 'apollo-landing-hardware',
    orderNumber: 1,
    title: 'Apollo Landing Hardware',
    shortTitle: 'Apollo Lunar Hardware',
    destination: 'moon',
    sectorLabel: 'Moon (6 Landing Sites)',
    sectorAccent: 'primary',
    launchText: 'Landed 1969–1972',
    launchYear: 1969,
    status: 'historic',
    statusBadgeText: 'Historic Lunar Monuments',
    statusBadgeStyle: 'historic',
    topRightIcon: 'flag',
    nasaArchiveId: 'NASA-JSC-AS11-40-5903',
    imageUrl: '/images/missions/apollo-landing-hardware.jpg',
    imageAlt: 'Apollo 11 Lunar Module Eagle landing gear and astronaut Buzz Aldrin on the lunar surface.',
    description:
      'Six golden Lunar Module descent stages and three electric moon buggies still rest untouched in the airless lunar dust.',
    narrativesByTrack: {
      junior:
        'Between 1969 and 1972, twelve astronauts walked on the Moon! When it was time to fly home, they blasted off in the top half of their lander, leaving six golden bottom halves and three electric moon buggies parked in the gray dust!',
      cadet:
        'Across Apollo 11, 12, 14, 15, 16, and 17, NASA left six Grumman Lunar Module descent stages and three foldable moon buggies (Lunar Roving Vehicles) on the Moon—preserved for millions of years in airless vacuum.',
      scientist:
        'Positioned across Mare Tranquillitatis, Oceanus Procellarum, Fra Mauro, Hadley-Apennine, Descartes, and Taurus-Littrow, the six Apollo descent stages and moon buggies serve as long-duration space-weathering benchmarks.',
    },
    telemetry: [
      { label: 'Landers Left', value: '6 Stages', accent: 'primary' },
      { label: 'Moon Buggies', value: '3 Electric LRVs', accent: 'tertiary' },
      { label: 'Moon Rocks', value: '382 kg Returned', accent: 'on-surface' },
    ],
    provenance: 'NASA Johnson Space Center Lunar Curatorial',
    distanceAU: 0.0026,
    coordinates: '0° 40′ N, 23° 28′ E (Mare Tranquillitatis + 5 Sites)',
    lastTransmissionQuote:
      'HOUSTON CAPCOM LOCK: "Houston, Tranquility Base here. The Eagle has landed." • 25 seconds hover fuel remaining.',
    subsystems: [
      {
        name: 'Gold Kapton Thermal Shield',
        code: 'SHD-AU69',
        role: 'Reflects blistering +120°C lunar daytime sunlight and traps warmth at night',
        kidAnalogy: 'Like wrapping the lunar lander in a shiny golden space-blanket thermos!',
        powerOrSpec: '±120°C Shield',
        xPercent: 28,
        yPercent: 45,
      },
      {
        name: 'Apollo Guidance Computer',
        code: 'CPU-AGC',
        role: 'First integrated-circuit flight computer with priority task scheduling',
        kidAnalogy: 'A computer with less memory than a singing birthday card that landed humans on the Moon!',
        powerOrSpec: '2.048 MHz / 73KB',
        xPercent: 52,
        yPercent: 32,
      },
      {
        name: 'Foldable Moon Buggies (LRV)',
        code: 'LRV-BUGGY',
        role: '4-wheel-drive electric moon buggies with woven piano-wire mesh tires',
        kidAnalogy: 'A folding electric go-kart unpacked from the side of the lander like a suitcase!',
        powerOrSpec: '18 km/h Top Speed',
        xPercent: 72,
        yPercent: 62,
      },
      {
        name: 'Descent Propulsion Engine',
        code: 'ENG-DPS',
        role: 'Throttleable rocket engine that let astronauts hover over boulder fields',
        kidAnalogy: 'A rocket dimmer switch that let Neil Armstrong hover smoothly past sharp rocks!',
        powerOrSpec: '45 kN Thrust',
        xPercent: 48,
        yPercent: 72,
      },
    ],
    badge: {
      name: 'Lunar Pioneer',
      emoji: '🌕',
      colorTheme: 'cyan',
      unlockCriteria: 'Explore all 3 Moon hardware missions',
      xpValue: 150,
    },
    quizQuestion: {
      question: 'Why are the Apollo astronauts’ footprints and moon buggies tracks still sharp on the Moon over 50 years later?',
      options: [
        'Because the Moon has no wind, rain, or air to erase them',
        'Because robots sweep around them every morning',
        'Because the dust is made of superglue',
      ],
      correctIndex: 0,
      explanation:
        'Without air, wind, or rain on the Moon, footprints and moon buggies tire tracks stay crisp for millions of years!',
      badgeName: 'Cosmic Genius',
    },
  },
  {
    id: 'alsep-stations',
    orderNumber: 2,
    title: 'ALSEP Science Stations',
    shortTitle: 'ALSEP Lunar Stations',
    destination: 'moon',
    sectorLabel: 'Moon Surface Network',
    sectorAccent: 'primary',
    launchText: 'Deployed 1969–1977',
    launchYear: 1969,
    status: 'complete',
    statusBadgeText: 'Laser Mirrors Still Active',
    statusBadgeStyle: 'primary',
    topRightIcon: 'radar',
    nasaArchiveId: 'NASA-ALSJ-AS14-67-09361',
    imageUrl: '/images/missions/alsep-stations.jpg',
    imageAlt: 'Apollo Lunar Surface Experiments Package (ALSEP) central station and SNAP-27 RTG deployed on the Moon.',
    description:
      'Nuclear-powered science stations set up by astronauts with SNAP-27 RTG batteries that detected over 12,000 moonquakes and still bounce Earth lasers off a laser mirror today.',
    narrativesByTrack: {
      junior:
        'Apollo astronauts didn’t just grab rocks—they unpacked whole science stations called ALSEP on the Moon powered by a SNAP-27 RTG! They detected thousands of rumbling moonquakes and left a special laser mirror that scientists on Earth still bounce beams off today!',
      cadet:
        'Powered by SNAP-27 RTG radioisotope generators, the Apollo Lunar Surface Experiments Packages (ALSEP) transmitted seismic, solar-wind, and magnetic data to Earth until 1977, while their passive laser mirror retroreflectors remain active today.',
      scientist:
        'Operating as a 5-station planetary seismic network powered by SNAP-27 RTG units until September 1977, ALSEP recorded >12,500 deep tidal moonquakes, meteoroid impacts, and shallow tectonic events, constraining the Moon’s 38-km crustal thickness.',
    },
    telemetry: [
      { label: 'Moonquakes', value: '12,500+ Logged', accent: 'primary' },
      { label: 'Laser Mirror', value: 'Active Today', accent: 'secondary' },
      { label: 'Power Source', value: 'SNAP-27 RTG', accent: 'tertiary' },
    ],
    provenance: 'NASA Goddard Lunar Seismic & Laser Network',
    distanceAU: 0.0026,
    coordinates: '5 Lunar Network Nodes (Apollo 12, 14, 15, 16, 17)',
    lastTransmissionQuote:
      'ALSEP NETWORK LOG: 12,558 seismic events cataloged • LRRR laser mirror return lock active (+3.8 cm/yr lunar recession).',
    subsystems: [
      {
        name: 'Laser Mirror Retroreflector',
        code: 'OPT-LRRR',
        role: '100 corner-cube quartz prisms reflecting Earth telescope lasers with zero power',
        kidAnalogy: 'A magic laser mirror box that bounces laser beams straight back to Earth—even 55+ years later!',
        powerOrSpec: 'Passive Optical',
        xPercent: 30,
        yPercent: 55,
      },
      {
        name: 'Passive Seismic Seismometer',
        code: 'GEO-PSE',
        role: 'Gold-wrapped stethoscope that felt moonquakes and tiny meteorite hits',
        kidAnalogy: 'So sensitive it could feel an astronaut’s footsteps from hundreds of feet away!',
        powerOrSpec: '0.1 nm Sensitivity',
        xPercent: 58,
        yPercent: 64,
      },
      {
        name: 'SNAP-27 RTG Nuclear Battery',
        code: 'PWR-SNAP27',
        role: 'Plutonium heat generator keeping instruments alive through 14-day freezing nights',
        kidAnalogy: 'A glowing space campfire (SNAP-27 RTG) that generated 70 watts of electricity for 8 straight years!',
        powerOrSpec: '70 Watts Continuous',
        xPercent: 75,
        yPercent: 42,
      },
      {
        name: 'Central Telemetry Station',
        code: 'COM-ALSEP',
        role: 'S-band radio transmitter tower wired to all the surrounding surface experiments',
        kidAnalogy: 'The Wi-Fi router of the Moon that beamed moonquake charts back to Houston!',
        powerOrSpec: '2.2 GHz S-Band',
        xPercent: 45,
        yPercent: 35,
      },
    ],
    badge: {
      name: 'Lunar Pioneer',
      emoji: '🪞',
      colorTheme: 'violet',
      unlockCriteria: 'Explore all 3 Moon hardware missions',
      xpValue: 150,
    },
    quizQuestion: {
      question: 'Which ALSEP experiment left by Apollo astronauts is STILL working on the Moon today?',
      options: [
        'The passive laser mirror (Retroreflector) array',
        'A lunar wind vane',
        'A solar-powered television screen',
      ],
      correctIndex: 0,
      explanation:
        'Corner-cube laser mirror prisms need zero electricity—observatories on Earth still bounce lasers off them today!',
      badgeName: 'Cosmic Genius',
    },
  },
  {
    id: 'pioneer-10-11',
    orderNumber: 3,
    title: 'Pioneer 10 & 11',
    shortTitle: 'Pioneer 10 & 11',
    destination: 'deep space',
    sectorLabel: 'Deep Space (Taurus & Scutum)',
    sectorAccent: 'secondary',
    launchText: 'Launched 1972–1973',
    launchYear: 1972,
    status: 'historic',
    statusBadgeText: 'Silent Cosmic Trailblazers',
    statusBadgeStyle: 'historic',
    topRightIcon: 'satellite_alt',
    nasaArchiveId: 'NASA-ARC-1972-AC72-2135',
    imageUrl: '/images/missions/pioneer-10-11.jpg',
    imageAlt: 'Pioneer 10 deep-space probe showing its parabolic dish antenna and the position of the Pioneer Golden Plaque.',
    description:
      'The first deep-space pioneers to cross the Asteroid Belt, survive Jupiter’s radiation, visit Saturn, and carry a golden plaque toward the stars.',
    narrativesByTrack: {
      junior:
        'Before Pioneer 10 launched in 1972, scientists worried the Asteroid Belt might smash any probe to pieces! Pioneer 10 zoomed safely through, took the first close-up photos of Jupiter, and carries a golden plaque showing a friendly wave from humans!',
      cadet:
        'Pioneer 10 (1972) and Pioneer 11 (1973) blazed the trail through the main asteroid belt, proved hardware could survive Jupiter’s intense magnetosphere, and achieved the first flyby of Saturn while carrying a golden plaque.',
      scientist:
        'Spin-stabilized at 4.8 RPM around a 2.74-meter parabolic dish, Pioneer 10 and 11 mapped Jovian and Saturnian magnetospheres with helium vector magnetometers and transmitted telemetry until 2003 (at 80 AU from the Sun).',
    },
    telemetry: [
      { label: 'Est. Distance', value: '136+ AU', accent: 'secondary' },
      { label: 'Time Capsule', value: 'Golden Plaque', accent: 'tertiary' },
      { label: 'Final Signal', value: 'Jan 23, 2003', accent: 'outline' },
    ],
    provenance: 'NASA Ames Research Center Archive',
    distanceAU: 136.8,
    coordinates: 'Heading toward Aldebaran (Taurus Constellation)',
    lastTransmissionQuote:
      'DSN MADRID 70M LOCK (JAN 2003): Faint carrier wave detected at 80 AU • RTG voltage below transmitter threshold.',
    subsystems: [
      {
        name: 'Pioneer Golden Plaque',
        code: 'ART-PLQ72',
        role: '6×9 inch gold-anodized aluminum pictorial golden plaque designed by Carl Sagan & Frank Drake',
        kidAnalogy: 'A cosmic golden plaque greeting card showing two humans waving and a star map pointing back to Earth!',
        powerOrSpec: '120 Grams Gold-Al',
        xPercent: 50,
        yPercent: 52,
      },
      {
        name: 'Meteoroid Asteroid Detector',
        code: 'SCI-ASTD',
        role: '13 pressurized argon-nitrogen panels on the back of the dish counting dust hits',
        kidAnalogy: 'Like bubble-wrap pads that popped and counted every tiny space dust grain in the Asteroid Belt!',
        powerOrSpec: '208 Pressurized Cells',
        xPercent: 32,
        yPercent: 38,
      },
      {
        name: '4x SNAP-19 RTG Booms',
        code: 'PWR-SNAP19',
        role: 'Plutonium power generators held on 3-meter booms away from sensitive sensors',
        kidAnalogy: 'Four nuclear batteries held out on long selfie-sticks so they didn’t warm the cameras!',
        powerOrSpec: '155 Watts at Launch',
        xPercent: 78,
        yPercent: 35,
      },
      {
        name: 'Spin-Scan Photopolarimeter',
        code: 'OPT-IPP',
        role: 'Telescope that built images strip-by-strip as the whole pioneer probe spun like a top',
        kidAnalogy: 'Instead of a normal camera, the whole pioneer spun around 5 times a minute to paint pictures line by line!',
        powerOrSpec: '4.8 RPM Spin Scan',
        xPercent: 62,
        yPercent: 68,
      },
    ],
    badge: {
      name: 'Deep Space Voyager',
      emoji: '🛸',
      colorTheme: 'violet',
      unlockCriteria: 'Explore all 4 Deep Space missions',
      xpValue: 150,
    },
    quizQuestion: {
      question: 'What famous obstacle did Pioneer 10 prove hardware pioneers could safely fly through in 1972?',
      options: [
        'The Asteroid Belt between Mars and Jupiter',
        'A ring of fire around Venus',
        'The center of the Sun',
      ],
      correctIndex: 0,
      explanation:
        'Pioneer 10 was the very first mission hardware to cross the Asteroid Belt and reach giant Jupiter!',
      badgeName: 'Cosmic Genius',
    },
  },
  {
    id: 'voyager-1',
    orderNumber: 4,
    title: 'Voyager 1 & 2',
    shortTitle: 'Voyager 1 & 2 Twins',
    destination: 'deep space',
    sectorLabel: 'Interstellar Space (>135–162 AU)',
    sectorAccent: 'secondary',
    launchText: 'Launched 1977',
    launchYear: 1977,
    status: 'traveling',
    statusBadgeText: 'Traveling • Interstellar',
    statusBadgeStyle: 'secondary',
    topRightIcon: 'satellite_alt',
    nasaArchiveId: 'NASA-JPL-PIA17046',
    imageUrl: '/images/missions/voyager-1.jpg',
    imageAlt: 'Voyager 1 interstellar probe with its high-gain dish antenna, magnetometer boom, and RTG power source in deep space.',
    description:
      'Humanity’s farthest active ambassadors at 162+ AU! Completed the Grand Tour of Jupiter, Saturn, Uranus, and Neptune before crossing into interstellar space.',
    narrativesByTrack: {
      junior:
        'Launched in 1977, twin probes Voyager 1 and Voyager 2 used a rare 176-year line-up of the giant planets to visit Jupiter, Saturn, Uranus, and Neptune! Both have now popped clean out of the Sun’s bubble at over 135 to 162 AU into interstellar space carrying Golden Records!',
      cadet:
        'Crossing the heliopause in 2012 (Voyager 1 at 121 AU) and 2018 (Voyager 2 at 119 AU), the Voyagers remain the only human-built pioneers actively sampling the interstellar medium across 24+ billion kilometers.',
      scientist:
        'Operating in the Very Local Interstellar Medium (VLISM), Voyager 1 and 2 measure interstellar magnetic fields, cosmic ray anisotropy, and plasma wave oscillations while communicating via 23-watt X-band links to NASA’s 70m DSN apertures.',
    },
    telemetry: [
      { label: 'Voyager 1 Dist', value: '162.4 AU', accent: 'primary' },
      { label: 'Telemetry Link', value: 'Active (NASA DSN)', accent: 'secondary' },
      { label: 'Speed', value: '38,000 mph', accent: 'on-surface' },
    ],
    provenance: 'NASA JPL Open Telemetry API',
    distanceAU: 162.4,
    coordinates: 'Ophiuchus (V1: +12° Dec) & Pavo (V2: -55° Dec)',
    lastTransmissionQuote:
      'DSN MADRID LOCK: Carrier 8.42 GHz nominal • Round-trip light time 45h 14m • PWS interstellar plasma hum stable.',
    subsystems: [
      {
        name: 'Golden Phonograph Record',
        code: 'REC-AU77',
        role: 'Gold-plated copper time capsule carrying 115 images, 55 language greetings & music',
        kidAnalogy: 'A golden vinyl record with a needle included so alien DJs can play Earth music and whale songs!',
        powerOrSpec: '12-inch 16⅔ RPM',
        xPercent: 46,
        yPercent: 50,
      },
      {
        name: '3x MHW-RTG Power Cores',
        code: 'PWR-PU238',
        role: 'Radioisotope thermoelectric generators providing power for nearly 50 years',
        kidAnalogy: 'Three warm nuclear batteries that still power Voyager after half a century in freezing darkness!',
        powerOrSpec: '220W Remaining',
        xPercent: 32,
        yPercent: 72,
      },
      {
        name: 'High-Gain Parabolic Dish',
        code: 'ANT-3.7M',
        role: '12-foot white dish beaming a 23-watt whisper across 15 billion miles to Earth',
        kidAnalogy: 'A giant megaphone dish that beams a refrigerator-lightbulb-sized signal across 15 billion miles!',
        powerOrSpec: '22.4 Watts RF',
        xPercent: 60,
        yPercent: 36,
      },
      {
        name: '13-Meter Magnetometer Boom',
        code: 'MAG-BOOM',
        role: 'Fiberglass truss boom sensing the magnetic boundary between our Sun and the stars',
        kidAnalogy: 'A 43-foot pop-up fishing rod that felt the exact moment Voyager entered interstellar space!',
        powerOrSpec: '13m Astromast',
        xPercent: 22,
        yPercent: 80,
      },
    ],
    badge: {
      name: 'Deep Space Voyager',
      emoji: '🌌',
      colorTheme: 'violet',
      unlockCriteria: 'Explore all 4 Deep Space missions',
      xpValue: 200,
    },
    quizQuestion: {
      question: 'What boundary did Voyager 1 and Voyager 2 cross to enter interstellar space?',
      options: [
        'The Heliopause (the edge of our Sun’s magnetic bubble)',
        'The Moon’s shadow',
        'The rings of Mars',
      ],
      correctIndex: 0,
      explanation:
        'The Heliopause is the outer edge of the Sun’s heliosphere bubble where interstellar space begins!',
      badgeName: 'Cosmic Genius',
    },
  },
  {
    id: 'cassini-orbiter',
    orderNumber: 5,
    title: 'Cassini',
    shortTitle: 'Cassini Saturn Orbiter',
    destination: 'deep space',
    sectorLabel: 'Saturn & Moons (9.5 AU)',
    sectorAccent: 'secondary',
    launchText: 'Launched 1997',
    launchYear: 1997,
    status: 'historic',
    statusBadgeText: 'Historic Grand Finale',
    statusBadgeStyle: 'historic',
    topRightIcon: 'cyclone',
    nasaArchiveId: 'NASA-JPL-PIA03883',
    imageUrl: '/images/missions/cassini-orbiter.jpg',
    imageAlt: 'Cassini orbiter firing its main engine above Saturn and its glowing rings.',
    description:
      'Orbited Saturn 294 times at 9.5 AU, landed the Huygens probe on Titan, and flew through icy ocean geysers erupting from Enceladus!',
    narrativesByTrack: {
      junior:
        'Cassini lived at Saturn for 13 years! It dropped the Huygens parachute probe onto orange Titan, flew right through water fountains spraying out of icy Enceladus, and dove 22 times between Saturn and its rings!',
      cadet:
        'Completing 294 Saturnian orbits, Cassini mapped liquid methane seas on Titan and sampled hydrothermal plumes from Enceladus’s subsurface ocean before plunging into Saturn in 2017 to protect those moons.',
      scientist:
        'Cassini’s INMS and CDA directly sampled H₂, silica nanoparticles, and organics in Enceladus’s south-polar plumes, while Grand Finale gravity harmonics constrained Saturn’s ring mass and differential rotation.',
    },
    telemetry: [
      { label: 'Saturn Orbits', value: '294 Tours', accent: 'on-surface' },
      { label: 'Moons Mapped', value: '60+ Satellites', accent: 'secondary' },
      { label: 'Grand Finale', value: 'Sept 15, 2017', accent: 'tertiary' },
    ],
    provenance: 'NASA JPL / ESA / ASI Cassini Archive',
    distanceAU: 9.58,
    coordinates: '9.4° N, 53° W (Saturn Upper Stratosphere Entry)',
    lastTransmissionQuote:
      'FINAL TELEMETRY 11:55:46 UTC: Thrusters at 100% torque • INMS sampling Saturn atmosphere • Signal lock concluded.',
    subsystems: [
      {
        name: 'Ion & Neutral Mass Spectrometer',
        code: 'SCI-INMS',
        role: 'Sniffed and tasted water vapor and hydrogen inside Enceladus’s geysers',
        kidAnalogy: 'A robotic nose that flew through an alien water fountain and tasted an underground ocean!',
        powerOrSpec: '1–99 amu Mass',
        xPercent: 45,
        yPercent: 40,
      },
      {
        name: 'Ku-Band Titan Radar Mapper',
        code: 'RAD-TITAN',
        role: 'Bounced radio waves through Titan’s thick orange smog to map liquid methane seas',
        kidAnalogy: 'X-ray vision goggles that saw lakes and islands right through thick orange clouds!',
        powerOrSpec: '13.78 GHz Radar',
        xPercent: 55,
        yPercent: 30,
      },
      {
        name: 'Huygens Titan Lander Probe',
        code: 'ESA-HUYG',
        role: 'Golden saucer probe that parachuted onto Titan’s icy pebble floodplain in 2005',
        kidAnalogy: 'A golden flying saucer backpack that detached and parachuted onto an alien moon!',
        powerOrSpec: '318 kg Lander',
        xPercent: 38,
        yPercent: 56,
      },
      {
        name: 'Twin Main Rocket Engines',
        code: 'ENG-R4D',
        role: 'Bipropellant thrusters that steered Cassini through 162 moon flybys',
        kidAnalogy: 'Twin steering rockets that let Cassini play pinball around 60+ moons of Saturn!',
        powerOrSpec: '445 N Thrust',
        xPercent: 52,
        yPercent: 72,
      },
    ],
    badge: {
      name: 'Deep Space Voyager',
      emoji: '🪐',
      colorTheme: 'violet',
      unlockCriteria: 'Explore all 4 Deep Space missions',
      xpValue: 200,
    },
    quizQuestion: {
      question: 'Why did NASA intentionally plunge Cassini into Saturn at the end of its mission?',
      options: [
        'To protect potentially habitable ocean moons like Enceladus and Titan from Earth microbes',
        'To see if Saturn had a rocky parking lot',
        'Because its camera lens was dusty',
      ],
      correctIndex: 0,
      explanation:
        'Because Enceladus and Titan could host microbial life, Cassini plunged into Saturn so it could never contaminate them!',
      badgeName: 'Cosmic Genius',
    },
  },
  {
    id: 'spirit-rover',
    orderNumber: 6,
    title: 'Spirit Rover (MER-A)',
    shortTitle: 'Spirit Rover (MER-A)',
    destination: 'mars',
    sectorLabel: 'Mars (Gusev Crater)',
    sectorAccent: 'tertiary',
    launchText: 'Launched 2003',
    launchYear: 2003,
    status: 'complete',
    statusBadgeText: 'Mission Complete (6+ Yrs)',
    statusBadgeStyle: 'tertiary',
    topRightIcon: 'smart_toy',
    nasaArchiveId: 'NASA-JPL-PIA03231',
    imageUrl: '/images/missions/spirit-rover.jpg',
    imageAlt: 'Spirit Mars Exploration Rover (MER-A) climbing the flank of Husband Hill inside Gusev Crater on Mars.',
    description:
      'Opportunity’s fearless twin! Climbed the Columbia Hills and accidentally scraped up 90% pure silica—proving ancient Martian hot springs existed!',
    narrativesByTrack: {
      junior:
        'Spirit was the first of the twin rovers to bounce onto Mars in January 2004! Even after one of its six wheels jammed, Spirit drove backward for years—and that dragging wheel scraped up bright white soil that proved Mars once had steaming hot springs!',
      cadet:
        'Landing in Gusev Crater on January 4, 2004, MER-A Spirit climbed Husband Hill (82 meters high) and used its stuck right-front wheel to trench a deposit of 90% opaline silica at "Home Plate," proving ancient hydrothermal activity.',
      scientist:
        'Traversing 7.73 km across Gusev Crater’s basaltic plains into the Noachian Columbia Hills, Spirit identified goethite, magnesium-iron carbonates, and amorphous opaline silica deposits diagnostic of fumarolic or hot-spring environments.',
    },
    telemetry: [
      { label: 'Odometer', value: '7.73 km', accent: 'tertiary' },
      { label: 'Discovery', value: '90% Pure Silica', accent: 'primary' },
      { label: 'Final Link', value: 'March 22, 2010', accent: 'outline' },
    ],
    provenance: 'NASA JPL Mars Exploration Rover Archive',
    distanceAU: 1.524,
    coordinates: '14.57° S, 175.47° E (Troy Sand Trap, Gusev Crater)',
    lastTransmissionQuote:
      'SOL 2210 TELEMETRY: Stationary science platform at Troy • Winter tilt angle 11° South • Entering low-power hibernation.',
    subsystems: [
      {
        name: 'Trenching Right-Front Wheel',
        code: 'WHL-RF06',
        role: 'Cleated aluminum wheel whose jammed motor accidentally dug up hidden hot-spring silica',
        kidAnalogy: 'A broken wheel that turned into a lucky treasure shovel as Spirit dragged it backward!',
        powerOrSpec: '25 cm Cleated Al',
        xPercent: 68,
        yPercent: 72,
      },
      {
        name: 'Pancam & Mini-TES Mast',
        code: 'OPT-MAST',
        role: 'Periscope camera and infrared heat sensor scanning Gusev Crater’s hills',
        kidAnalogy: 'Spirit’s head and neck that looked around in 360-degree color and heat vision!',
        powerOrSpec: '1.5m Eye Height',
        xPercent: 45,
        yPercent: 26,
      },
      {
        name: 'Rocker-Bogie Climbing Suspension',
        code: 'SUS-ROCK',
        role: 'Springless titanium leg joints that let Spirit climb the rocky slopes of Husband Hill',
        kidAnalogy: 'Bendable mountain-goat legs that kept Spirit balanced over rocks twice as tall as its wheels!',
        powerOrSpec: '45° Tilt Limit',
        xPercent: 40,
        yPercent: 66,
      },
      {
        name: 'Dust-Cleaned Solar Wings',
        code: 'SOL-WING',
        role: 'Fold-out solar panels rescued in 2005 when a Martian dust devil blew the dust off',
        kidAnalogy: 'Solar wings that got a surprise free car-wash from a passing Martian whirlwind!',
        powerOrSpec: '140 Watts Peak',
        xPercent: 52,
        yPercent: 48,
      },
    ],
    badge: {
      name: 'Red Planet Rover',
      emoji: '⛰️',
      colorTheme: 'amber',
      unlockCriteria: 'Explore all 6 Mars hardware missions',
      xpValue: 150,
    },
    quizQuestion: {
      question: 'How did Spirit accidentally make its biggest discovery of ancient Martian hot springs?',
      options: [
        'Its jammed wheel dug a trench while driving backward, uncovering bright white silica soil!',
        'It fell into a swimming pool',
        'A Martian bird dropped a rock on its deck',
      ],
      correctIndex: 0,
      explanation:
        'Spirit’s stuck wheel acted like a plow as it drove backward, scraping away red dust to reveal 90% pure silica formed in ancient hot springs!',
      badgeName: 'Cosmic Genius',
    },
  },
  {
    id: 'opportunity-rover',
    orderNumber: 7,
    title: 'Opportunity Rover (MER-B)',
    shortTitle: 'Opportunity ("Oppy")',
    destination: 'mars',
    sectorLabel: 'Mars (Meridiani Planum)',
    sectorAccent: 'tertiary',
    launchText: 'Launched 2003',
    launchYear: 2003,
    status: 'complete',
    statusBadgeText: 'Mission Complete (15 Yrs)',
    statusBadgeStyle: 'tertiary',
    topRightIcon: 'smart_toy',
    nasaArchiveId: 'NASA-JPL-PIA04928',
    imageUrl: '/images/missions/opportunity-rover.jpg',
    imageAlt: 'Opportunity Mars Exploration Rover (MER-B) on the surface of Meridiani Planum, Mars.',
    description:
      'Built for 90 days, Oppy explored Mars for nearly 15 years—driving a 28-mile marathon and discovering water-formed "Martian blueberries"!',
    narrativesByTrack: {
      junior:
        'Nicknamed "Oppy," this six-wheeled robot bounced onto Mars inside giant airbags and rolled straight into Eagle Crater! Built to last 90 days, it drove for nearly 15 years and finished the first marathon on another planet!',
      cadet:
        'Landing on January 25, 2004, MER-B Opportunity discovered hematite concretions ("blueberries") proving liquid water once soaked Meridiani Planum, driving 45.16 km over 5,111 sols until a 2018 global dust storm.',
      scientist:
        'Using its Mössbauer, APXS, and Pancam instruments across 45.16 km from Eagle to Endeavour Crater, Opportunity identified sulfate evaporites and neutral-pH smectite clays before Tau > 10.8 dust opacity ended operations on Sol 5,111.',
    },
    telemetry: [
      { label: 'Odometer', value: '45.16 km', accent: 'tertiary' },
      { label: 'Martian Sols', value: '5,111 Sols', accent: 'on-surface' },
      { label: 'Final Link', value: 'June 10, 2018', accent: 'outline' },
    ],
    provenance: 'NASA Planetary Data System (PDS)',
    distanceAU: 1.524,
    coordinates: '2.05° S, 354.47° E (Perseverance Valley)',
    lastTransmissionQuote:
      'SOL 5111 TELEMETRY: Solar array current 22 mAh • Atmospheric opacity Tau = 10.8 • ("My battery is low and it’s getting dark").',
    subsystems: [
      {
        name: 'Pancam Stereo Mast Camera',
        code: 'OPT-PANCAM',
        role: 'Twin high-resolution color cameras perched 5 feet high like human eyes',
        kidAnalogy: 'Oppy’s sharpest eyes that spotted tiny blueberry-shaped water minerals in the crater wall!',
        powerOrSpec: '1024×1024 Stereo',
        xPercent: 66,
        yPercent: 22,
      },
      {
        name: 'Rock Abrasion Tool (RAT)',
        code: 'ARM-RAT04',
        role: 'Diamond-toothed spinning grinder on the robotic arm that brushed and drilled rocks',
        kidAnalogy: 'A robotic dentist drill that ground away dusty rock crusts to see the fresh stone inside!',
        powerOrSpec: '45 mm Rock Bore',
        xPercent: 76,
        yPercent: 60,
      },
      {
        name: 'Triple-Junction Solar Wings',
        code: 'SOL-GAAS',
        role: 'Wing-shaped solar panels refreshed dozens of times by windy Martian cleaning events',
        kidAnalogy: 'Solar wings that caught sunlight for 5,111 Martian days thanks to lucky wind gusts!',
        powerOrSpec: '140W Peak Sol',
        xPercent: 45,
        yPercent: 48,
      },
      {
        name: 'Warm Electronics Box ("Heart")',
        code: 'THM-WEB',
        role: 'Gold-insulated belly coated in aerogel that kept batteries warm during -100°C nights',
        kidAnalogy: 'A cozy insulated winter coat made of "frozen smoke" aerogel inside the rover’s belly!',
        powerOrSpec: 'Aerogel Insulated',
        xPercent: 52,
        yPercent: 62,
      },
    ],
    badge: {
      name: 'Red Planet Rover',
      emoji: '🛞',
      colorTheme: 'amber',
      unlockCriteria: 'Explore all 6 Mars hardware missions',
      xpValue: 200,
    },
    quizQuestion: {
      question: 'What mineral spheres ("Martian blueberries") did Opportunity discover that proved ancient water existed?',
      options: [
        'Hematite spherules formed in ancient groundwater',
        'Plastic beads',
        'Frozen hailstones',
      ],
      correctIndex: 0,
      explanation:
        'Hematite spherules grow inside water-soaked rock layers, proving Meridiani Planum was once wet!',
      badgeName: 'Cosmic Genius',
    },
  },
  {
    id: 'new-horizons',
    orderNumber: 8,
    title: 'New Horizons',
    shortTitle: 'New Horizons Probe',
    destination: 'deep space',
    sectorLabel: 'Kuiper Belt (60+ AU)',
    sectorAccent: 'secondary',
    launchText: 'Launched 2006',
    launchYear: 2006,
    status: 'traveling',
    statusBadgeText: 'Traveling • Kuiper Belt',
    statusBadgeStyle: 'secondary',
    topRightIcon: 'satellite_alt',
    nasaArchiveId: 'NASA-KSC-05PD-2412',
    imageUrl: '/images/missions/new-horizons.jpg',
    imageAlt: 'NASA New Horizons probe wrapped in gold thermal blanket in the Kennedy Space Center cleanroom.',
    description:
      'Launched as the fastest probe ever to leave Earth! Revealed Pluto’s giant nitrogen-ice heart and explored snowman-shaped Arrokoth in the Kuiper Belt.',
    narrativesByTrack: {
      junior:
        'Shaped like a grand piano and launched at 36,000 mph—fast enough to pass the Moon in just 9 hours!—New Horizons zoomed past Pluto in 2015 and discovered a giant bright heart made of nitrogen ice on Pluto’s surface!',
      cadet:
        'Launching in January 2006 at a record Earth-departure speed of 16.26 km/s, New Horizons completed the first reconnaissance of the Pluto-Charon binary system in 2015 and Kuiper Belt contact-binary Arrokoth (43 AU) in 2019.',
      scientist:
        'Using LORRI, Ralph/MVIC, and Alice UV spectrometry at Pluto (33 AU) and 486958 Arrokoth (43.4 AU), New Horizons revealed active convective N₂ glaciation in Sputnik Planitia and pristine planetesimal accretion in the cold classical Kuiper Belt.',
    },
    telemetry: [
      { label: 'Distance', value: '60.4 AU', accent: 'primary' },
      { label: 'Launch Speed', value: '36,373 mph', accent: 'secondary' },
      { label: 'Kuiper Targets', value: 'Pluto & Arrokoth', accent: 'tertiary' },
    ],
    provenance: 'NASA / Johns Hopkins APL Kuiper Belt Archive',
    distanceAU: 60.4,
    coordinates: 'Sagittarius • Cold Classical Kuiper Belt (60.4 AU)',
    lastTransmissionQuote:
      'DSN CANBERRA LOCK: Student Dust Counter active at 60.4 AU • Lyman-alpha galactic background scan nominal.',
    subsystems: [
      {
        name: 'LORRI Telephoto Eagle Eye',
        code: 'OPT-LORRI',
        role: 'Long-Range Reconnaissance Imager that photographed Pluto’s ice mountains and heart',
        kidAnalogy: 'A super-zoom telescope camera that spotted ice mountains as tall as the Rockies on Pluto!',
        powerOrSpec: '20.8 cm Aperture',
        xPercent: 42,
        yPercent: 38,
      },
      {
        name: 'Student Dust Counter (SDC)',
        code: 'SCI-SDC',
        role: 'First planetary instrument built and operated by college students, counting dust past Pluto',
        kidAnalogy: 'A cosmic dust-catcher built by students that has counted space grains for 5 billion miles!',
        powerOrSpec: 'Student-Built Detector',
        xPercent: 30,
        yPercent: 60,
      },
      {
        name: 'Ralph Color & Infrared Camera',
        code: 'OPT-RALPH',
        role: 'Mapped the colors and frozen methane, nitrogen, and water ice across Pluto',
        kidAnalogy: 'Pluto’s color artist that showed us Pluto’s reddish-gold terrain and bright white heart!',
        powerOrSpec: 'Multispectral IR',
        xPercent: 58,
        yPercent: 46,
      },
      {
        name: 'GPHS-RTG Nuclear Thermos',
        code: 'PWR-RTG06',
        role: 'Black finned nuclear battery sticking out the side where sunlight is 1,000x dimmer than Earth',
        kidAnalogy: 'A glowing heat generator that keeps the piano-sized probe warm 5 billion miles from the Sun!',
        powerOrSpec: '200 Watts',
        xPercent: 74,
        yPercent: 55,
      },
    ],
    badge: {
      name: 'Deep Space Voyager',
      emoji: '🩵',
      colorTheme: 'violet',
      unlockCriteria: 'Explore all 4 Deep Space missions',
      xpValue: 175,
    },
    quizQuestion: {
      question: 'What giant shape did New Horizons discover gleaming on Pluto’s surface in 2015?',
      options: [
        'A 1,000-mile-wide heart made of nitrogen glacier ice (Tombaugh Regio)',
        'A giant square waffle',
        'A ring of palm trees',
      ],
      correctIndex: 0,
      explanation:
        'Pluto’s famous bright heart (Tombaugh Regio) is a vast basin filled with slowly churning nitrogen and carbon monoxide glacier ice!',
      badgeName: 'Cosmic Genius',
    },
  },
  {
    id: 'phoenix-lander',
    orderNumber: 9,
    title: 'Phoenix Lander',
    shortTitle: 'Phoenix Polar Lander',
    destination: 'mars',
    sectorLabel: 'Mars Arctic Plains (68° N)',
    sectorAccent: 'tertiary',
    launchText: 'Launched 2007',
    launchYear: 2007,
    status: 'complete',
    statusBadgeText: 'Water Ice Confirmed',
    statusBadgeStyle: 'tertiary',
    topRightIcon: 'solar_power',
    nasaArchiveId: 'NASA-JPL-PIA09942',
    imageUrl: '/images/missions/phoenix-lander.jpg',
    imageAlt: 'NASA Phoenix Mars Lander on the Martian arctic plains with octagonal solar wings and robotic scoop arm deployed.',
    description:
      'Touched and tasted Martian arctic water ice with its robotic backhoe arm and spotted snow falling from Martian clouds!',
    narrativesByTrack: {
      junior:
        'Phoenix landed near the icy North Pole of Mars using 12 pulsing rocket thrusters! Its 8-foot robotic arm dug a trench called "Dodo-Goldilocks" and uncovered bright white water ice just 2 inches underground!',
      cadet:
        'Touching down in Green Valley (68.22° N) in May 2008, Phoenix excavated 5 cm into polygonal permafrost, proved excavated clasts sublimated over 4 sols, and chemically verified H₂O vapor inside its 1,000°C TEGA ovens.',
      scientist:
        'Phoenix’s Wet Chemistry Lab measured mildly alkaline regolith (pH 7.7) with ~0.5% ClO₄⁻ perchlorates and CaCO₃, while its upward-pointing LIDAR detected water-ice snow precipitation from 4-km cirrus clouds.',
    },
    telemetry: [
      { label: 'Polar Lat', value: '68.22° N', accent: 'tertiary' },
      { label: 'Ice Trench', value: '5 cm Depth', accent: 'primary' },
      { label: 'Snow LIDAR', value: '4 km Clouds', accent: 'on-surface' },
    ],
    provenance: 'University of Arizona • NASA JPL',
    distanceAU: 1.524,
    coordinates: '68.22° N, 234.25° E (Vastitas Borealis)',
    lastTransmissionQuote:
      'SOL 157 TELEMETRY: TEGA Oven #4 H2O mass peak confirmed • Atmospheric LIDAR detected snow virga at 4 km altitude.',
    subsystems: [
      {
        name: 'Robotic Backhoe Scoop Arm',
        code: 'ARM-RA2.3',
        role: '8-foot titanium-aluminum arm with tungsten blade that scraped into rock-hard water ice',
        kidAnalogy: 'A super-strong mechanical digging arm with a camera right inside its wrist!',
        powerOrSpec: '2.35m Reach',
        xPercent: 58,
        yPercent: 62,
      },
      {
        name: 'TEGA 1,000°C Baking Ovens',
        code: 'LAB-TEGA8',
        role: '8 tiny ovens that baked Martian dirt until the frozen water turned into steam to be sniffed',
        kidAnalogy: 'An Easy-Bake Oven on Mars that baked icy dirt to taste real Martian water vapor!',
        powerOrSpec: '1000°C Pyrolysis',
        xPercent: 36,
        yPercent: 38,
      },
      {
        name: 'Octagonal UltraFlex Solar Wings',
        code: 'SOL-OCTA',
        role: 'Two round fan-shaped solar arrays that unfolded like Chinese paper fans after landing',
        kidAnalogy: 'Two giant round solar umbrellas that unfolded after the landing dust settled!',
        powerOrSpec: '3.0m Span Wings',
        xPercent: 20,
        yPercent: 25,
      },
      {
        name: 'Green Laser Snow LIDAR',
        code: 'MET-LIDAR',
        role: 'Upward-pointing green laser beam that spotted real snow falling from Martian clouds',
        kidAnalogy: 'A green laser pointer shooting straight up into the sky that caught Martian snowflakes falling!',
        powerOrSpec: '532 nm Laser',
        xPercent: 42,
        yPercent: 20,
      },
    ],
    badge: {
      name: 'Red Planet Rover',
      emoji: '❄️',
      colorTheme: 'cyan',
      unlockCriteria: 'Explore all 6 Mars hardware missions',
      xpValue: 200,
    },
    quizQuestion: {
      question: 'How did scientists prove the white chunks in Phoenix’s trench were water ice and not salt?',
      options: [
        'They vanished into vapor (sublimated) over 4 days in the sun!',
        'A polar bear licked them',
        'They floated up into the sky',
      ],
      correctIndex: 0,
      explanation:
        'Salt never evaporates in sunlight, but exposed water ice sublimates (turns straight from solid to gas) in Mars’s thin air!',
      badgeName: 'Cosmic Genius',
    },
  },
  {
    id: 'lro-orbiter',
    orderNumber: 10,
    title: 'Lunar Reconnaissance Orbiter (LRO)',
    shortTitle: 'LRO Lunar Mapper',
    destination: 'moon',
    sectorLabel: 'Lunar Polar Orbit (50 km)',
    sectorAccent: 'primary',
    launchText: 'Launched 2009',
    launchYear: 2009,
    status: 'active',
    statusBadgeText: 'Active Artemis Scout',
    statusBadgeStyle: 'primary',
    topRightIcon: 'radar',
    nasaArchiveId: 'NASA-JPL-PIA18163',
    imageUrl: '/images/missions/lro-orbiter.jpg',
    imageAlt: 'NASA Lunar Reconnaissance Orbiter (LRO) operating in low polar orbit above the Moon.',
    description:
      'Skimming 31 miles above the Moon, LRO photographed Apollo’s footprints and moon buggies from orbit and discovered icy polar craters colder than Pluto!',
    narrativesByTrack: {
      junior:
        'Flying just 31 miles above the Moon’s mountains, LRO has a camera so sharp it photographed the actual footpaths and moon buggies left by Apollo astronauts! It also discovered billions of tons of water ice hiding inside dark South Pole craters.',
      cadet:
        'Operating in a polar orbit since 2009, LRO has returned over 1.4 petabytes of planetary data—more than all other planetary missions combined—mapping Artemis III South Polar landing zones.',
      scientist:
        'Combining LROC 0.5m/px photogrammetry, LOLA 5-beam laser altimetry, Diviner thermal radiometry (<25 K in PSRs), and LAMP UV starlight imaging, LRO characterizes polar volatile cold traps.',
    },
    telemetry: [
      { label: 'Orbit Alt', value: '50 km Polar', accent: 'primary' },
      { label: 'Data Archive', value: '1.4+ Petabytes', accent: 'secondary' },
      { label: 'Cold Traps', value: '-248°C (25K)', accent: 'tertiary' },
    ],
    provenance: 'NASA Goddard • ASU LROC Science Center',
    distanceAU: 0.0026,
    coordinates: '89.9° Inclination • Polar Orbit over Shackleton Crater',
    lastTransmissionQuote:
      'WHITE SANDS Ka-BAND: Downlink 100 Mbps • LROC NAC pass over Shackleton Crater rim • Diviner cold-trap reading 25 Kelvin.',
    subsystems: [
      {
        name: 'Lunar Reconnaissance Camera (LROC)',
        code: 'OPT-LROC',
        role: 'Twin telephoto cameras sharp enough to photograph Apollo landers and astronaut footpaths',
        kidAnalogy: 'A spyglass in orbit so sharp it can spot moon buggies parked 31 miles below!',
        powerOrSpec: '50 cm / pixel',
        xPercent: 48,
        yPercent: 38,
      },
      {
        name: 'LOLA 5-Beam Laser Altimeter',
        code: 'LAS-LOLA5',
        role: 'Fires 5 laser spots 28 times a second to build a 3D height map of every lunar mountain',
        kidAnalogy: 'A 5-dot laser ruler that measured the height of every single crater and mountain on the Moon!',
        powerOrSpec: '6.9 Billion Pulses',
        xPercent: 64,
        yPercent: 52,
      },
      {
        name: 'Diviner Cold-Trap Thermometer',
        code: 'IR-DIVNR',
        role: 'Measured dark South Pole crater floors at -248°C—the coldest spots in the solar system',
        kidAnalogy: 'An infrared thermometer that found dark lunar craters colder than distant Pluto!',
        powerOrSpec: '25 K Minimum',
        xPercent: 32,
        yPercent: 55,
      },
      {
        name: 'LAMP Starlight Night-Vision',
        code: 'UV-LAMP',
        role: 'Uses faint ultraviolet starlight to see frost inside pitch-black polar craters',
        kidAnalogy: 'Night-vision goggles that use the gentle glow of distant stars to see inside dark caves!',
        powerOrSpec: 'UV Lyman-Alpha',
        xPercent: 55,
        yPercent: 68,
      },
    ],
    badge: {
      name: 'Lunar Pioneer',
      emoji: '🛰️',
      colorTheme: 'cyan',
      unlockCriteria: 'Explore all 3 Moon hardware missions',
      xpValue: 175,
    },
    quizQuestion: {
      question: 'Where on the Moon has LRO detected reservoirs of frozen water ice for future Artemis astronauts?',
      options: [
        'Inside permanently shadowed craters at the Moon’s Poles where sunlight never reaches',
        'In warm tropical rivers',
        'Floating in clouds',
      ],
      correctIndex: 0,
      explanation:
        'Deep craters at the Lunar South Pole never receive sunlight, staying below -240°C and trapping ancient water ice!',
      badgeName: 'Cosmic Genius',
    },
  },
  {
    id: 'curiosity-rover',
    orderNumber: 11,
    title: 'Curiosity Rover',
    shortTitle: 'Curiosity (MSL)',
    destination: 'mars',
    sectorLabel: 'Mars (Gale Crater / Mt. Sharp)',
    sectorAccent: 'tertiary',
    launchText: 'Launched 2011',
    launchYear: 2011,
    status: 'active',
    statusBadgeText: 'Active Flagship Rover',
    statusBadgeStyle: 'primary',
    topRightIcon: 'smart_toy',
    nasaArchiveId: 'NASA-JPL-PIA19807',
    imageUrl: '/images/missions/curiosity-rover.jpg',
    imageAlt: 'Curiosity Mars Science Laboratory rover self-portrait at the Buckskin drilling site on Mount Sharp in Gale Crater.',
    description:
      'Lowered onto Mars by a rocket-powered Sky Crane! This SUV-sized chemist proved Gale Crater was once a freshwater lake with all the ingredients for life.',
    narrativesByTrack: {
      junior:
        'Too heavy for airbags, SUV-sized Curiosity was lowered onto Mars on cables from a hovering rocket backpack called the Sky Crane! It shoots rocks with a laser on its head and proved Gale Crater was once a calm freshwater lake!',
      cadet:
        'Landing in Gale Crater on August 6, 2012 via the supersonic parachute and Sky Crane descent stage, the 899-kg Curiosity rover drilled ancient mudstones at Yellowknife Bay—confirming CHNOPS organic elements and a long-lived habitable lake.',
      scientist:
        'Powered by a 110W MMRTG and equipped with SAM (GCMS/TLS), CheMin X-ray diffraction, and ChemCam LIBS laser spectroscopy, Curiosity has ascended >800 vertical meters up Aeolis Mons (Mount Sharp), documenting Mars’s clay-to-sulfate climatic transition.',
    },
    telemetry: [
      { label: 'Sky Crane', value: 'Aug 6, 2012', accent: 'primary' },
      { label: 'Rock Holes', value: '40+ Drilled', accent: 'tertiary' },
      { label: 'Laser Zaps', value: '1,000,000+', accent: 'secondary' },
    ],
    provenance: 'NASA JPL Mars Science Laboratory (MSL)',
    distanceAU: 1.524,
    coordinates: '4.58° S, 137.44° E (Aeolis Mons / Mount Sharp)',
    lastTransmissionQuote:
      'MRO UHF RELAY: ChemCam LIBS shot #1,012,400 nominal • Gediz Vallis pure sulfur crystal deposit confirmed.',
    subsystems: [
      {
        name: 'ChemCam Rock-Zapping Laser',
        code: 'LAS-CHEM',
        role: 'Fires an infrared laser beam up to 23 feet to vaporize tiny rock spots and read the glowing spark',
        kidAnalogy: 'A real sci-fi laser on Curiosity’s forehead that zaps rocks and reads the color of the spark!',
        powerOrSpec: '1 Million+ Zaps',
        xPercent: 48,
        yPercent: 24,
      },
      {
        name: 'SAM Belly Chemistry Lab',
        code: 'LAB-SAM',
        role: 'Bakes powdered rock samples drilled by the robotic arm to sniff out carbon and organic molecules',
        kidAnalogy: 'A full chemistry classroom tucked inside the rover’s tummy that tastes powdered Mars rocks!',
        powerOrSpec: '74 Sample Cups',
        xPercent: 52,
        yPercent: 56,
      },
      {
        name: 'MMRTG Nuclear Power Tail',
        code: 'PWR-MMRTG',
        role: 'Finned white nuclear battery on the back that lets Curiosity work day, night, and through dust storms',
        kidAnalogy: 'An all-weather nuclear tail battery so Curiosity never has to worry about dusty solar panels!',
        powerOrSpec: '110 Watts Steady',
        xPercent: 24,
        yPercent: 52,
      },
      {
        name: 'JPL Morse Code Aluminum Wheels',
        code: 'WHL-MORSE',
        role: 'Six 20-inch wheels with holes that stamp "J-P-L" in Morse code into the Martian sand to measure distance',
        kidAnalogy: 'Secret agent tires that stamp "• - - -   • - - •   • - • •" (JPL) into the sand with every turn!',
        powerOrSpec: '50 cm Diameter',
        xPercent: 64,
        yPercent: 76,
      },
    ],
    badge: {
      name: 'Red Planet Rover',
      emoji: '🔬',
      colorTheme: 'emerald',
      unlockCriteria: 'Explore all 6 Mars hardware missions',
      xpValue: 200,
    },
    quizQuestion: {
      question: 'How did NASA land the heavy SUV-sized Curiosity rover safely on Mars?',
      options: [
        'A rocket-powered "Sky Crane" hovered in the air and lowered Curiosity down on nylon cables!',
        'Giant water balloons',
        'A long wooden ramp from orbit',
      ],
      correctIndex: 0,
      explanation:
        'Because Curiosity weighed almost a ton—too heavy for airbags—a jetpack-like Sky Crane hovered on 8 rockets and lowered the rover on cables!',
      badgeName: 'Cosmic Genius',
    },
  },
  {
    id: 'insight-lander',
    orderNumber: 12,
    title: 'InSight Lander',
    shortTitle: 'InSight Seismic Lander',
    destination: 'mars',
    sectorLabel: 'Mars (Elysium Planitia)',
    sectorAccent: 'tertiary',
    launchText: 'Launched 2018',
    launchYear: 2018,
    status: 'complete',
    statusBadgeText: '1,319 Marsquakes Logged',
    statusBadgeStyle: 'tertiary',
    topRightIcon: 'solar_power',
    nasaArchiveId: 'NASA-JPL-PIA22876',
    imageUrl: '/images/missions/insight-lander.jpg',
    imageAlt: 'InSight Mars Lander self-portrait on Elysium Planitia showing its circular solar panels and SEIS seismometer.',
    description:
      'Mars’s planetary doctor! Placed a stethoscope on the Martian ground, detecting over 1,300 marsquakes and measuring Mars’s liquid metal core.',
    narrativesByTrack: {
      junior:
        'Built from the same blueprint as Phoenix, InSight landed on a quiet flat plain on Mars in 2018 to give the Red Planet a health checkup! Its robotic arm placed a dome-covered stethoscope on the ground and felt 1,319 rumbling marsquakes!',
      cadet:
        'Operating on Elysium Planitia from 2018 to December 2022, InSight deployed the French SEIS seismometer directly onto the Martian surface, recording 1,319 marsquakes (up to magnitude 4.7) and meteor impacts that excavated subterranean ice.',
      scientist:
        'Through P- and S-wave seismic travel-time inversions from 1,319 cataloged events, InSight’s SEIS instrument determined a layered Martian crust (24–72 km thick), a lithospheric mantle, and a large liquid Fe-Ni-S core (radius ~1,830 km).',
    },
    telemetry: [
      { label: 'Marsquakes', value: '1,319 Detected', accent: 'tertiary' },
      { label: 'Biggest Quake', value: 'Magnitude 4.7', accent: 'primary' },
      { label: 'Core Radius', value: '1,830 km Liquid', accent: 'on-surface' },
    ],
    provenance: 'NASA JPL / CNES / DLR InSight Seismic Archive',
    distanceAU: 1.524,
    coordinates: '4.50° N, 135.62° E (Elysium Planitia)',
    lastTransmissionQuote:
      'SOL 1440 TELEMETRY: SEIS seismometer kept active to final battery watt • 1,319 marsquakes archived.',
    subsystems: [
      {
        name: 'SEIS Dome Seismometer',
        code: 'GEO-SEIS',
        role: 'Ultra-sensitive quake sensor covered by a white wind-and-thermal shield dome on the ground',
        kidAnalogy: 'A planetary stethoscope under a cozy white igloo hat so the wind wouldn’t tickle it!',
        powerOrSpec: 'Atom-Width Precision',
        xPercent: 62,
        yPercent: 72,
      },
      {
        name: 'Instrument Deployment Arm',
        code: 'ARM-IDA18',
        role: 'Five-fingered grapple claw that lifted the seismometer off the deck and set it on Mars',
        kidAnalogy: 'A claw-machine crane on Mars that carefully picked up science instruments and placed them on the dirt!',
        powerOrSpec: '1.8m Grapple Arm',
        xPercent: 52,
        yPercent: 48,
      },
      {
        name: 'HP³ "The Mole" Heat Probe',
        code: 'GEO-MOLE',
        role: 'Self-hammering mechanical spike designed to take Mars’s internal temperature',
        kidAnalogy: 'A robotic mechanical earthworm that hammered itself into the sticky Martian soil!',
        powerOrSpec: '40 cm Spike',
        xPercent: 40,
        yPercent: 68,
      },
      {
        name: 'RISE Radio Wobble Tracker',
        code: 'NAV-RISE',
        role: 'Tracked tiny wobbles in Mars’s spin as it orbited the Sun to prove its core is liquid',
        kidAnalogy: 'Like spinning a raw egg vs. a hard-boiled egg—Mars’s wobble proved its metal core is liquid!',
        powerOrSpec: '2 cm Precision',
        xPercent: 35,
        yPercent: 32,
      },
    ],
    badge: {
      name: 'Red Planet Rover',
      emoji: '🩺',
      colorTheme: 'amber',
      unlockCriteria: 'Explore all 6 Mars hardware missions',
      xpValue: 175,
    },
    quizQuestion: {
      question: 'What did InSight discover about the deep center (core) of Mars by listening to 1,319 marsquakes?',
      options: [
        'Mars has a giant molten (liquid) metal core!',
        'Mars is completely hollow like a basketball',
        'Mars is made of solid ice all the way to the middle',
      ],
      correctIndex: 0,
      explanation:
        'By timing how marsquake waves bounced off the center of the planet, InSight proved Mars has a liquid iron-alloy core about 1,830 km across!',
      badgeName: 'Cosmic Genius',
    },
  },
  {
    id: 'perseverance-rover',
    orderNumber: 13,
    title: 'Perseverance Rover',
    shortTitle: 'Perseverance & Ingenuity',
    destination: 'mars',
    sectorLabel: 'Mars (Jezero Crater Delta)',
    sectorAccent: 'tertiary',
    launchText: 'Launched 2020',
    launchYear: 2020,
    status: 'active',
    statusBadgeText: 'Active Sample Hunter',
    statusBadgeStyle: 'primary',
    topRightIcon: 'smart_toy',
    nasaArchiveId: 'NASA-JPL-PIA24542',
    imageUrl: '/images/missions/perseverance-rover.jpg',
    imageAlt: 'Perseverance Mars Rover self-portrait alongside the Ingenuity Mars Helicopter in Jezero Crater.',
    description:
      'Exploring an ancient Martian river delta! Made breathable oxygen out of Martian air, flew the Ingenuity helicopter 72 times, and seals rock tubes for Earth return.',
    narrativesByTrack: {
      junior:
        'Nicknamed "Percy," this six-wheeled explorer landed in Jezero Crater in 2021 with a tiny helicopter buddy named Ingenuity tucked under its belly! Ingenuity flew 72 times in the thin Martian air while Percy drills rock cores and seals them in shiny titanium tubes!',
      cadet:
        'Using Terrain-Relative Navigation to touch down beside Jezero Crater’s ancient river delta on February 18, 2021, Perseverance has cached titanium sample tubes, produced breathable O₂ via MOXIE, and spotted "leopard-spot" biosignature clues at Cheyava Falls.',
      scientist:
        'Equipped with PIXL X-ray fluorescence, SHERLOC deep-UV Raman/luminescence spectroscopy, RIMFAX ground-penetrating radar, and the MOXIE solid-oxide electrolysis unit, Perseverance investigates deltaic mudstones and carbonate rims for ancient biosignatures.',
    },
    telemetry: [
      { label: 'Chopper Flights', value: '72 Flights', accent: 'primary' },
      { label: 'Sample Tubes', value: '25+ Sealed', accent: 'tertiary' },
      { label: 'MOXIE Oxygen', value: '122g O₂ Made', accent: 'secondary' },
    ],
    provenance: 'NASA JPL Mars 2020 Perseverance Archive',
    distanceAU: 1.524,
    coordinates: '18.38° N, 77.58° E (Jezero Crater River Delta)',
    lastTransmissionQuote:
      'JEZERO DELTA TELEMETRY: Cheyava Falls core sample sealed • SHERLOC organic carbon + vivianite/greigite leopard spots logged.',
    subsystems: [
      {
        name: 'Ingenuity Mars Helicopter ("Ginny")',
        code: 'AIR-ING72',
        role: '4-pound solar helicopter that achieved the first powered flight on another planet (72 flights!)',
        kidAnalogy: 'A tissue-box-sized drone with super-fast carbon-fiber blades that flew 72 times on Mars!',
        powerOrSpec: '2,400 RPM Blades',
        xPercent: 26,
        yPercent: 68,
      },
      {
        name: 'MOXIE Oxygen Maker',
        code: 'LAB-MOXIE',
        role: 'Toaster-sized gold box that breathed in Martian CO₂ air and split it into pure breathable oxygen!',
        kidAnalogy: 'A mechanical tree inside the rover that turned Martian carbon dioxide into breathable oxygen for future astronauts!',
        powerOrSpec: '122g Pure O₂',
        xPercent: 48,
        yPercent: 52,
      },
      {
        name: 'SHERLOC & WATSON Turret Arm',
        code: 'ARM-SHRLC',
        role: '7-foot robotic arm with an ultraviolet scanner and rotary drill that seals rock cores in tubes',
        kidAnalogy: 'A detective magnifying glass and drill that packs Mars rocks into lightsaber-shaped titanium tubes!',
        powerOrSpec: '43 Titanium Tubes',
        xPercent: 74,
        yPercent: 58,
      },
      {
        name: 'SuperCam Laser & Microphone',
        code: 'OPT-SUPCM',
        role: 'Camera head that zaps rocks from 20 feet away and recorded the first real sounds of Martian wind!',
        kidAnalogy: 'Eyes and ears on Percy’s head that let us hear real Martian wind gusts and laser snaps!',
        powerOrSpec: 'Laser + Audio Mic',
        xPercent: 62,
        yPercent: 24,
      },
    ],
    badge: {
      name: 'Red Planet Rover',
      emoji: '🚁',
      colorTheme: 'emerald',
      unlockCriteria: 'Explore all 6 Mars hardware missions',
      xpValue: 250,
    },
    quizQuestion: {
      question: 'What historic aviation first did Perseverance’s tiny partner Ingenuity achieve on Mars?',
      options: [
        'The first powered, controlled aircraft flight on another planet (completing 72 flights!)',
        'The first submarine dive on Mars',
        'Flying all the way back to Earth',
      ],
      correctIndex: 0,
      explanation:
        'Built for just 5 test flights, the 4-pound Ingenuity helicopter flew 72 times across Jezero Crater—the Wright Brothers moment on another world!',
      badgeName: 'Cosmic Genius',
    },
  },
];

export const DAILY_MYSTERY = {
  title: "What was Opportunity's heartbreaking last transmission?",
  shortPrompt: "What was Opportunity's heartbreaking last transmission?",
  context:
    'On June 10, 2018 (Sol 5,111), a historic planet-wide dust storm enveloped Meridiani Planum on Mars, blotting out 99.99% of sunlight.',
  question:
    'Before entering low-power hibernation in Perseverance Valley, what poetic translation did mission engineers give to Opportunity’s final telemetry packet?',
  options: [
    {
      id: 'a',
      label: '"My battery is low and it’s getting dark."',
      telemetryRaw: 'PWR_BUS: 22Wh // TAU_OPACITY: 10.8',
      isCorrect: true,
    },
    {
      id: 'b',
      label: '"Tell Earth I found the ancient ocean."',
      telemetryRaw: 'SCI_LOG: H2O_HEMATITE_LOCK',
      isCorrect: false,
    },
    {
      id: 'c',
      label: '"Waiting for the solar winds to clear."',
      telemetryRaw: 'ARR_CLEAN_WAIT: SOL_5112',
      isCorrect: false,
    },
  ],
  rewardNote:
    'Correct! Opportunity sent two crucial numbers: dangerously low solar array energy (22 watt-hours) and record-breaking sky darkness (atmospheric opacity tau = 10.8), which science reporter Jacob Margolis and NASA engineers famously summarized as "My battery is low and it’s getting dark."',
};
