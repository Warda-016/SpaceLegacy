export interface GlossaryEntry {
  term: string;
  aliases: string[];
  pronunciation: string;
  emoji: string;
  category:
    | 'Measurement'
    | 'Planet Science'
    | 'Hardware Tech'
    | 'Deep Space'
    | 'Mission Comms'
    | 'Space Vocabulary';
  kidDefinition: string;
  playfulAnalogy: string;
  funFact: string;
  isTechnicalJargon?: boolean;
}

/**
 * Primary featured technical terms shown as quick-access chips in the Cosmic Dictionary
 * and highlighted with dotted sky-blue underlines across all mission stories & cards.
 */
export const COSMIC_GLOSSARY_TERMS: GlossaryEntry[] = [
  {
    term: 'AU (Astronomical Unit)',
    aliases: [
      'au',
      'astronomical unit',
      'astronomical units',
      '162.4 au',
      '162+ au',
      '60.4 au',
      '136+ au',
      '136.8 au',
      '1.524 au',
      '0.0026 au',
      '9.5 au',
      '9.58 au',
      '121 au',
      '121.6 au',
      '119 au',
      '80 au',
      '40 au',
      '40.5 au',
      '43 au',
      '43.4 au',
      '33 au',
    ],
    pronunciation: 'A-U (As-truh-NOM-ih-kul YOO-nit)',
    emoji: '📏',
    category: 'Measurement',
    kidDefinition:
      'An Astronomical Unit (AU) is a giant space ruler equal to the distance from Earth to the Sun—about 93 million miles (150 million kilometers)!',
    playfulAnalogy:
      'Measuring space in miles is like measuring a highway with a tiny fingernail! Using AU is like counting football fields: Earth is at the 1-AU line, Mars is at 1.5 AU, and Voyager 1 is way out past 162 AU!',
    funFact:
      'Sunlight takes about 8 minutes and 20 seconds to travel 1 AU from the Sun to your backyard!',
    isTechnicalJargon: true,
  },
  {
    term: 'SNAP-27 RTG',
    aliases: [
      'snap-27 rtg',
      'snap-27 rtgs',
      'snap-27',
      'snap-19 rtg',
      'snap-19',
      'mhw-rtg',
      'gphs-rtg',
      'mmrtg',
      'rtg',
      'rtgs',
      'radioisotope thermoelectric generator',
      'radioisotope',
      'nuclear battery',
      'nuclear batteries',
      'plutonium',
    ],
    pronunciation: 'SNAP Twen-tee-SEV-en R-T-G',
    emoji: '🔋',
    category: 'Hardware Tech',
    kidDefinition:
      'A special space battery (Radioisotope Thermoelectric Generator) that turns the natural warmth of glowing plutonium pellets into steady electricity without needing any sunlight!',
    playfulAnalogy:
      'Imagine a metal hand-warmer inside a thermos that stays toasty warm for decades and plugs into your science tools like a never-ending campfire battery!',
    funFact:
      'Apollo astronauts plugged SNAP-27 RTGs into their Moon science stations so they could survive freezing 14-day-long lunar nights for 8 straight years!',
    isTechnicalJargon: true,
  },
  {
    term: 'Laser Mirror (Retroreflector)',
    aliases: [
      'laser mirror',
      'laser mirrors',
      'retroreflector',
      'retroreflectors',
      'lrrr',
      'laser reflector',
      'corner-cube',
      'quartz prisms',
      'active today',
    ],
    pronunciation: 'LAY-zer MEER-er',
    emoji: '🪞',
    category: 'Hardware Tech',
    kidDefinition:
      'A suitcase-sized tray of 100 special crystal prisms left on the Moon by Apollo astronauts that bounces laser beams from Earth telescopes straight back to where they came from!',
    playfulAnalogy:
      'Like a super-shiny bicycle reflector parked on the Moon that flashes back whenever astronomers on Earth shine a giant laser pointer at it!',
    funFact:
      'Because laser mirrors need zero electricity or batteries, they are still working on the Moon 55+ years later—and proved the Moon drifts 1.5 inches away from Earth every year!',
    isTechnicalJargon: true,
  },
  {
    term: 'Moon Buggies (LRV)',
    aliases: [
      'moon buggies',
      'moon buggy',
      'lunar roving vehicle',
      'lunar roving vehicles',
      'lrv',
      'lrvs',
      '3 electric lrvs',
      'buggies',
      'buggy',
    ],
    pronunciation: 'MOON BUG-eez',
    emoji: '🚙',
    category: 'Hardware Tech',
    kidDefinition:
      'Foldable, battery-powered 4-wheel-drive electric cars that Apollo 15, 16, and 17 astronauts unfolded and drove across the craters and mountains of the Moon!',
    playfulAnalogy:
      'Imagine an electric two-seat go-kart that folds up like a beach chair, rides strapped to the outside of a rocket lander, and pops open when you pull a cord!',
    funFact:
      'Instead of rubber tires filled with air, Moon Buggies had bouncy wheels woven out of springy piano wire so they could never get a flat tire on sharp Moon rocks!',
    isTechnicalJargon: true,
  },
  {
    term: 'Golden Plaque & Golden Record',
    aliases: [
      'golden plaque',
      'golden record',
      'golden records',
      'pioneer plaque',
      'voyager golden record',
      'phonograph record',
      'plaque',
      'phonograph',
      'time capsule',
    ],
    pronunciation: 'GOHL-den PLAK',
    emoji: '📀',
    category: 'Deep Space',
    kidDefinition:
      'Shiny gold-coated metal greeting cards (on Pioneer 10 & 11) and 12-inch music records (on Voyager 1 & 2) bolted onto NASA’s farthest probes as a friendly hello from Earth!',
    playfulAnalogy:
      'Like putting a waterproof postcard, a playlist of Earth’s greatest hits, whale songs, and a return-address star map inside a bottle and tossing it into the cosmic ocean!',
    funFact:
      'Voyager’s Golden Record even comes with a picture instruction manual and a record needle so anyone who finds it millions of years from now can play the sounds of Earth!',
    isTechnicalJargon: true,
  },
  {
    term: 'Sol (Martian Day)',
    aliases: [
      'sol',
      'sols',
      'martian sol',
      'martian sols',
      '5,111 sols',
      'sol 5111',
      'sol 5,111',
      'sol 157',
      'sol 2210',
      'sol 1440',
      '90 sols',
    ],
    pronunciation: 'SAHL',
    emoji: '☀️',
    category: 'Measurement',
    kidDefinition:
      'One full day-and-night spin on the planet Mars! A Martian "sol" lasts 24 hours, 39 minutes, and 35 seconds—just a little bit longer than an Earth day.',
    playfulAnalogy:
      'If you went to school on Mars, every single day would have an extra 39 minutes of recess and bedtime built right into the clock!',
    funFact:
      'NASA’s Opportunity rover was only built to last 90 sols (about 3 Earth months), but it kept driving for an amazing 5,111 sols!',
    isTechnicalJargon: true,
  },
  {
    term: 'Permafrost',
    aliases: ['permafrost', 'subsurface ice', 'polygon', 'polygonal permafrost'],
    pronunciation: 'PUR-muh-frawst',
    emoji: '🧊',
    category: 'Planet Science',
    kidDefinition:
      'Underground soil and rock mixed with solid water ice that stays frozen hard as concrete all year long just inches beneath the dusty surface.',
    playfulAnalogy:
      'Picture a bowl of rock-hard freezer ice cream covered by a thin dusting of cocoa powder on top—brush away the red Martian dust and you hit solid ice!',
    funFact:
      'NASA’s Phoenix Lander used its robotic backhoe arm to scrape just 2 inches down into Mars’s northern permafrost to uncover gleaming white water ice!',
    isTechnicalJargon: true,
  },
  {
    term: 'Heliosphere & Heliopause',
    aliases: [
      'heliosphere',
      'heliopause',
      'interstellar',
      'interstellar space',
      'vlism',
      'interstellar medium',
    ],
    pronunciation: 'HEE-lee-oh-sfeer',
    emoji: '🫧',
    category: 'Deep Space',
    kidDefinition:
      'A gigantic invisible magnetic bubble blown by our Sun that wraps around all the planets and protects us from deep-space radiation. Its outer skin is called the Heliopause!',
    playfulAnalogy:
      'Imagine our Sun blowing a colossal soap bubble around the entire solar system. When Voyager 1 and 2 popped through the outer edge of that bubble, they entered the ocean between the stars!',
    funFact:
      'Voyager 1 popped through the Heliopause at 121 AU in 2012, becoming the first human-made object to enter interstellar space!',
    isTechnicalJargon: true,
  },
  {
    term: 'Telemetry',
    aliases: [
      'telemetry',
      'telemetry link',
      'downlink',
      'carrier',
      'carrier wave',
      'transponder',
      'dsn',
      'deep space network',
      'active (nasa dsn)',
    ],
    pronunciation: 'tuh-LEM-uh-tree',
    emoji: '📡',
    category: 'Mission Comms',
    kidDefinition:
      'Automatic radio check-up messages beamed from a space robot back to Earth telling scientists its battery level, temperature, location, and science discoveries.',
    playfulAnalogy:
      'Like a smartwatch on a space rover that sends text messages across millions of miles saying: "My battery is 85%, my wheels are rolling, and here is a new photo of Mars!"',
    funFact:
      'Even traveling at the speed of light (186,000 miles per second!), a telemetry message from Voyager 1 takes over 22.5 hours to reach Earth!',
    isTechnicalJargon: true,
  },
  {
    term: 'Houston Capcom Lock',
    aliases: [
      'houston capcom lock',
      'capcom',
      'houston',
      'tranquility base',
      'carrier lock',
      'signal lock',
      'telemetry lock',
      'dsn madrid lock',
      'dsn canberra lock',
    ],
    pronunciation: 'HYOO-stun KAP-kom LOK',
    emoji: '🎧',
    category: 'Mission Comms',
    kidDefinition:
      '"Houston" is NASA’s Mission Control Center in Texas, "Capcom" (Capsule Communicator) is the one astronaut on Earth who talks directly to the crew in space, and "Lock" means the radio antennas have a clear, steady connection!',
    playfulAnalogy:
      'Imagine playing walkie-talkie with your best friend from 240,000 miles away—"Houston Capcom Lock" means your walkie-talkies clicked onto the exact same channel with five bars of signal!',
    funFact:
      'When Neil Armstrong landed Apollo 11 on the Moon in 1969, astronaut Charlie Duke was the Houston Capcom who replied, "Roger, Tranquility, we copy you on the ground!"',
    isTechnicalJargon: true,
  },
  {
    term: 'Spectrometer',
    aliases: [
      'spectrometer',
      'spectrometers',
      'spectroscopy',
      'inms',
      'apxs',
      'mössbauer',
      'chemcam',
      'sherloc',
      'pixl',
      'chemin',
      'mini-tes',
    ],
    pronunciation: 'spek-TROM-uh-ter',
    emoji: '🌈',
    category: 'Hardware Tech',
    kidDefinition:
      'A science detective tool that splits light or gas molecules into a colorful "barcode" so rovers and probes can tell exactly what chemicals a rock, cloud, or water geyser is made of.',
    playfulAnalogy:
      'Just like a grocery store scanner reads black-and-white stripes to know if a box is cereal or cookies, a spectrometer reads rainbow stripes in light to spot water, iron, or carbon!',
    funFact:
      'Cassini used its mass spectrometer like a robotic nose to fly straight through Enceladus’s water geysers and "taste" the underground ocean!',
    isTechnicalJargon: true,
  },
  {
    term: 'Regolith',
    aliases: ['regolith', 'lunar dust', 'lunar soil', 'martian soil'],
    pronunciation: 'REG-uh-lith',
    emoji: '🌑',
    category: 'Planet Science',
    kidDefinition:
      'The blanket of powdery gray dust, shattered rock crumbs, and tiny glass beads covering the surface of the Moon and Mars.',
    playfulAnalogy:
      'Earth beaches have smooth sand polished by ocean waves, but the Moon has no water or wind—so billions of meteor crashes have smashed the top layer into clingy powder like flour mixed with glitter!',
    funFact:
      'Apollo astronauts said Moon regolith stuck to their spacesuits like Velcro and smelled just like fireworks gunpowder inside the cabin!',
    isTechnicalJargon: true,
  },
  {
    term: 'Seismometer (Moonquakes & Marsquakes)',
    aliases: [
      'seismometer',
      'seismometers',
      'seismic',
      'seis',
      'moonquakes',
      'moonquake',
      'marsquakes',
      'marsquake',
      '12,500+ logged',
      '1,319 detected',
      'magnitude 4.7',
    ],
    pronunciation: 'size-MOM-uh-ter',
    emoji: '🩺',
    category: 'Hardware Tech',
    kidDefinition:
      'An ultra-sensitive vibration listener placed flat on the ground of the Moon or Mars to feel underground rumbles, quakes, and meteor thumps.',
    playfulAnalogy:
      'Like a doctor’s stethoscope pressed gently against the tummy of a planet to listen to its rocky heartbeat and figure out if its center is liquid or solid!',
    funFact:
      'InSight’s seismometer on Mars was so sensitive it could feel ground vibrations smaller than the width of a single hydrogen atom!',
    isTechnicalJargon: true,
  },
  {
    term: 'Sky Crane',
    aliases: ['sky crane', 'aug 6, 2012', 'jetpack', 'descent stage'],
    pronunciation: 'SKY KRAYN',
    emoji: '🚁',
    category: 'Hardware Tech',
    kidDefinition:
      'A hovering, 8-rocket jetpack built by NASA to lower heavy SUV-sized rovers (Curiosity and Perseverance) gently onto Mars using strong nylon ropes!',
    playfulAnalogy:
      'Curiosity and Perseverance were as heavy as family cars—if they used bouncy airbags, the airbags would pop! So the Sky Crane hovered in mid-air and lowered them down like a spider on a silk thread!',
    funFact:
      'The instant the rover’s six wheels touched Martian dirt, small blades snipped the ropes and the Sky Crane flew safely away!',
    isTechnicalJargon: true,
  },
  {
    term: 'Kuiper Belt',
    aliases: [
      'kuiper belt',
      'kuiper',
      'arrokoth',
      'pluto',
      'pluto & arrokoth',
      'tombaugh regio',
      'sputnik planitia',
    ],
    pronunciation: 'KY-per BELT',
    emoji: '☄️',
    category: 'Deep Space',
    kidDefinition:
      'A colossal donut-shaped zone of icy worlds, dwarf planets (like Pluto!), and frozen comets orbiting past Neptune from 30 AU to over 55 AU from the Sun.',
    playfulAnalogy:
      'Think of it as the Solar System’s giant walk-in freezer attic, keeping icy snowballs and mini-worlds frozen since the planets were born 4.6 billion years ago!',
    funFact:
      'In 2019, NASA’s New Horizons probe flew past Arrokoth in the Kuiper Belt—an icy world shaped just like a cosmic snowman!',
    isTechnicalJargon: true,
  },
  {
    term: 'Sublimation',
    aliases: ['sublimation', 'sublimate', 'sublimated', 'sublimating'],
    pronunciation: 'sub-lih-MAY-shun',
    emoji: '💨',
    category: 'Planet Science',
    kidDefinition:
      'When solid ice warms up and turns straight into invisible gas (vapor) without ever melting into a wet puddle of liquid water first!',
    playfulAnalogy:
      'Just like spooky Halloween "dry ice" that smokes into fog without making a puddle! Because Mars has super-thin air, sunlit ice vanishes straight into water vapor.',
    funFact:
      'Watching white chunks disappear by sublimation over 4 days is how NASA’s Phoenix Lander proved it had dug up real water ice instead of salt!',
    isTechnicalJargon: true,
  },
  {
    term: 'Hematite ("Martian Blueberries")',
    aliases: ['hematite', 'blueberries', 'martian blueberries', 'spherules', 'concretions'],
    pronunciation: 'HEE-muh-tyt',
    emoji: '🫐',
    category: 'Planet Science',
    kidDefinition:
      'An iron-rich mineral that usually forms in wet environments. Opportunity discovered millions of tiny round gray hematite spheres on Mars nicknamed "Martian blueberries"!',
    playfulAnalogy:
      'Like tiny stone marbles scattered inside rock layers the way blueberries are baked inside a muffin—proving ancient groundwater once soaked the Martian soil!',
    funFact:
      'When Martian wind blows away the softer rock around them, piles of crunchy hematite "blueberries" collect on the ground!',
    isTechnicalJargon: true,
  },
  {
    term: 'LIDAR',
    aliases: ['lidar', 'snow lidar', '4 km clouds', 'lola', 'laser altimeter'],
    pronunciation: 'LY-dar',
    emoji: '🔦',
    category: 'Hardware Tech',
    kidDefinition:
      'Light Detection and Ranging—a tool that shoots rapid flashes of laser light at clouds or mountains and times how fast the light bounces back to measure distance.',
    playfulAnalogy:
      'Like a bat using echo-location in the dark, except shooting invisible or green laser beams instead of sound squeaks!',
    funFact:
      'Phoenix’s upward-pointing green LIDAR beam spotted real water-ice snow crystals falling from Martian clouds 2.5 miles up in the sky!',
    isTechnicalJargon: true,
  },
  {
    term: 'MOXIE (Mars Oxygen Maker)',
    aliases: ['moxie', 'moxie oxygen', '122g o₂ made', '122g pure o₂', 'electrolysis'],
    pronunciation: 'MOK-see',
    emoji: '🌱',
    category: 'Hardware Tech',
    kidDefinition:
      'A toaster-sized gold instrument inside the Perseverance rover that breathed in Mars’s carbon-dioxide air and turned it into pure, breathable oxygen!',
    playfulAnalogy:
      'Like a mechanical robo-tree living inside Perseverance’s belly that inhales carbon dioxide and exhales fresh oxygen for future astronauts!',
    funFact:
      'Across 16 test runs on Mars, MOXIE made 122 grams of pure oxygen—enough to keep a small dog breathing for 10 hours!',
    isTechnicalJargon: true,
  },
  {
    term: 'Ingenuity Mars Helicopter',
    aliases: ['ingenuity', 'ginny', 'chopper flights', '72 flights', 'mars helicopter'],
    pronunciation: 'in-juh-NOO-ih-tee',
    emoji: '🚁',
    category: 'Hardware Tech',
    kidDefinition:
      'A 4-pound solar-powered helicopter that rode to Mars under Perseverance’s belly and became the first aircraft in history to fly under its own power on another planet!',
    playfulAnalogy:
      'Imagine a tissue-box-sized drone with four carbon-fiber legs and twin propellers spinning 5 times faster than an Earth helicopter so it can grip Mars’s super-thin air!',
    funFact:
      'Built for only 5 test hops over 30 days, Ingenuity ("Ginny") flew an incredible 72 times over nearly 3 years and even carried a tiny piece of the Wright Brothers’ 1903 airplane wing!',
    isTechnicalJargon: true,
  },
];

interface CompactEntry {
  term: string;
  pronunciation: string;
  emoji: string;
  category: GlossaryEntry['category'];
  kidDefinition: string;
  playfulAnalogy: string;
  funFact: string;
  isTechnical?: boolean;
}

/**
 * Comprehensive site-wide dictionary mapping all mission names, instruments,
 * telemetry badges, planetary features, and space terms across Space Legacy.
 */
export const EXTENDED_SITE_DICTIONARY: Record<string, CompactEntry> = {
  // Missions & Hardware Pioneers
  apollo: {
    term: 'Apollo Program',
    pronunciation: 'uh-PAH-loh',
    emoji: '🌕',
    category: 'Hardware Tech',
    kidDefinition:
      'NASA’s historic Moon program (1969–1972) that landed 12 astronauts across 6 lunar landing sites using the Saturn V rocket and Lunar Module!',
    playfulAnalogy:
      'Humanity’s greatest road trip—flying 240,000 miles across space to camp on another world and bring back 842 pounds of Moon rocks!',
    funFact:
      'Six Apollo descent stages, three Moon Buggies, and five ALSEP stations are still resting on the Moon today!',
    isTechnical: true,
  },
  eagle: {
    term: 'Eagle (Apollo 11 Lunar Module)',
    pronunciation: 'EE-gul',
    emoji: '🦅',
    category: 'Hardware Tech',
    kidDefinition:
      'The spider-legged golden lunar lander that carried Neil Armstrong and Buzz Aldrin down to the Moon’s Sea of Tranquility on July 20, 1969.',
    playfulAnalogy:
      'A two-part lunar camper van: the gold bottom half served as the landing pad on the Moon, while the silver top half blasted the astronauts back into orbit!',
    funFact:
      'Neil Armstrong steered Eagle past a crater full of boulders and landed with only 25 seconds of hovering fuel left!',
    isTechnical: true,
  },
  alsep: {
    term: 'ALSEP (Apollo Lunar Surface Experiments Package)',
    pronunciation: 'AL-sep',
    emoji: '📡',
    category: 'Hardware Tech',
    kidDefinition:
      'A circle of scientific instruments unpacked by Apollo astronauts on the Moon to measure moonquakes, solar wind, magnetic fields, and lunar dust.',
    playfulAnalogy:
      'Like setting up an automated robotic weather and earthquake station on the Moon wired to a glowing nuclear battery in the middle!',
    funFact:
      'ALSEP stations radioed moonquake discoveries back to Earth every single day until September 30, 1977!',
    isTechnical: true,
  },
  pioneer: {
    term: 'Pioneer 10 & 11',
    pronunciation: 'py-uh-NEER',
    emoji: '🛸',
    category: 'Deep Space',
    kidDefinition:
      'Twin deep-space probes launched in 1972 and 1973 that became the first robotic pioneers to cross the Asteroid Belt and fly past giant Jupiter and Saturn!',
    playfulAnalogy:
      'The fearless trailblazers that cleared the path through the Asteroid Belt so Voyager, Galileo, and Cassini could follow safely!',
    funFact:
      'Each Pioneer carries a gold-anodized aluminum plaque designed by Carl Sagan showing two humans waving hello!',
    isTechnical: true,
  },
  voyager: {
    term: 'Voyager 1 & 2',
    pronunciation: 'VOY-uh-jer',
    emoji: '🌌',
    category: 'Deep Space',
    kidDefinition:
      'Twin robotic explorers launched in 1977 that toured Jupiter, Saturn, Uranus, and Neptune before becoming the first human-made objects in interstellar space!',
    playfulAnalogy:
      'Two tireless cosmic marathoners carrying Golden Records more than 15 billion miles from home and still calling Earth on a 23-watt radio!',
    funFact:
      'Voyager 2 is still the only probe in history to visit all four giant outer planets: Jupiter, Saturn, Uranus, and Neptune!',
    isTechnical: true,
  },
  cassini: {
    term: 'Cassini Saturn Orbiter',
    pronunciation: 'kuh-SEE-nee',
    emoji: '🪐',
    category: 'Deep Space',
    kidDefinition:
      'A school-bus-sized robotic orbiter that lived at Saturn for 13 years (2004–2017), circling the ringed giant 294 times and discovering ocean geysers on Enceladus!',
    playfulAnalogy:
      'Saturn’s resident photographer and chemist—carrying 12 science instruments and the golden Huygens lander on its side!',
    funFact:
      'In 2017, Cassini dove 22 times through the narrow gap between Saturn and its rings before plunging into Saturn’s clouds!',
    isTechnical: true,
  },
  huygens: {
    term: 'Huygens Titan Lander',
    pronunciation: 'HOY-genz',
    emoji: '🪂',
    category: 'Hardware Tech',
    kidDefinition:
      'A saucer-shaped European Space Agency probe that rode aboard Cassini for 7 years before parachuting onto Saturn’s giant orange moon Titan in 2005!',
    playfulAnalogy:
      'A golden clam-shell explorer that floated down through orange clouds for 2.5 hours and landed on rounded ice pebbles!',
    funFact:
      'Touching down on Titan nearly a billion miles away, Huygens holds the record for the farthest landing from Earth in human history!',
    isTechnical: true,
  },
  spirit: {
    term: 'Spirit Rover (MER-A)',
    pronunciation: 'SPEER-it',
    emoji: '🛞',
    category: 'Hardware Tech',
    kidDefinition:
      'Opportunity’s twin six-wheeled Mars rover that landed in Gusev Crater in January 2004, climbed Husband Hill, and discovered ancient hot-spring silica!',
    playfulAnalogy:
      'A tough little mountain climber that kept driving backward for years even after one of its front wheels got stuck—and used that dragging wheel like a shovel to find treasure!',
    funFact:
      'Built for 90 Martian days, Spirit operated for over 6 Earth years (2,210 sols)!',
    isTechnical: true,
  },
  opportunity: {
    term: 'Opportunity Rover ("Oppy")',
    pronunciation: 'ah-per-TOO-nih-tee',
    emoji: '🛞',
    category: 'Hardware Tech',
    kidDefinition:
      'NASA’s record-breaking Mars Exploration Rover (MER-B) that landed inside Eagle Crater in 2004, found water-formed "blueberries," and drove 28.06 miles over 15 years!',
    playfulAnalogy:
      'The ultimate "Little Engine That Could" of space—warrantied for 90 days, yet surviving 5,111 Martian days thanks to lucky wind gusts cleaning its solar wings!',
    funFact:
      'Opportunity was the first vehicle ever to complete a full 26.2-mile marathon distance on another planet!',
    isTechnical: true,
  },
  oppy: {
    term: 'Oppy (Opportunity Rover)',
    pronunciation: 'AH-pee',
    emoji: '🛞',
    category: 'Hardware Tech',
    kidDefinition:
      'The affectionate nickname NASA engineers and space fans gave to the Opportunity rover during its 15-year adventure across Meridiani Planum on Mars!',
    playfulAnalogy:
      'Like a beloved robotic puppy with a tall camera neck that explored four giant Martian craters before going to sleep in a 2018 dust storm.',
    funFact:
      'Oppy’s final radio telemetry message on Sol 5,111 is remembered as: "My battery is low and it’s getting dark."',
    isTechnical: true,
  },
  phoenix: {
    term: 'Phoenix Polar Lander',
    pronunciation: 'FEE-niks',
    emoji: '❄️',
    category: 'Hardware Tech',
    kidDefinition:
      'A three-legged NASA lander that touched down near the icy North Pole of Mars in 2008, dug up real underground water ice, and spotted snow falling from Martian clouds!',
    playfulAnalogy:
      'Named after the mythical bird because engineers built it from spare parts of earlier canceled Mars missions—giving those parts a heroic second life at the Martian Arctic!',
    funFact:
      'Phoenix’s robotic scoop arm dug a trench nicknamed "Dodo-Goldilocks" and hit hard white water ice just 2 inches below the red dirt!',
    isTechnical: true,
  },
  lro: {
    term: 'LRO (Lunar Reconnaissance Orbiter)',
    pronunciation: 'L-R-O',
    emoji: '🛰️',
    category: 'Hardware Tech',
    kidDefinition:
      'NASA’s sharp-eyed Moon orbiter that has been circling just 31 miles above the lunar surface since 2009, mapping safe landing zones and polar water ice for Artemis astronauts!',
    playfulAnalogy:
      'A high-tech spy satellite orbiting the Moon with a zoom lens sharp enough to spot the Apollo astronauts’ footprints and parked Moon Buggies below!',
    funFact:
      'LRO has beamed back over 1.4 petabytes of Moon maps—more data than all other planetary missions combined!',
    isTechnical: true,
  },
  curiosity: {
    term: 'Curiosity Rover (MSL)',
    pronunciation: 'kyoor-ee-AH-sih-tee',
    emoji: '🔬',
    category: 'Hardware Tech',
    kidDefinition:
      'An SUV-sized, nuclear-powered rover lowered onto Mars by a rocket Sky Crane in 2012 that proved Gale Crater was once a calm freshwater lake!',
    playfulAnalogy:
      'A one-ton rolling chemistry lab with a rock-zapping laser on its forehead and 74 tiny baking cups in its belly to sniff Mars rocks!',
    funFact:
      'Curiosity has zapped over 1,000,000 rock targets with its ChemCam laser while climbing half a mile up Mount Sharp!',
    isTechnical: true,
  },
  insight: {
    term: 'InSight Seismic Lander',
    pronunciation: 'IN-syt',
    emoji: '🩺',
    category: 'Hardware Tech',
    kidDefinition:
      'A stationary Mars lander (2018–2022) that placed a dome-covered seismometer on the ground to listen to Mars’s heartbeat—detecting 1,319 marsquakes!',
    playfulAnalogy:
      'Mars’s planetary doctor! While rovers look at surface rocks, InSight used a stethoscope to check Mars’s deep insides and proved its metal core is liquid!',
    funFact:
      'On May 4, 2022, InSight felt a monster magnitude 4.7 marsquake that shook the entire planet for over 6 hours!',
    isTechnical: true,
  },
  perseverance: {
    term: 'Perseverance Rover ("Percy")',
    pronunciation: 'pur-suh-VEER-uns',
    emoji: '🤖',
    category: 'Hardware Tech',
    kidDefinition:
      'NASA’s newest six-wheeled Mars rover that landed in Jezero Crater in 2021 to search for ancient microbial life, make oxygen, and seal rock cores in titanium tubes!',
    playfulAnalogy:
      'A robotic astrobiologist and treasure collector that carried the Ingenuity helicopter under its belly and packs prize Mars rocks into shiny tubes for future return to Earth!',
    funFact:
      'Perseverance carries two microphones that recorded the very first real audio of Martian wind gusts and laser zaps!',
    isTechnical: true,
  },
  percy: {
    term: 'Percy (Perseverance Rover)',
    pronunciation: 'PUR-see',
    emoji: '🤖',
    category: 'Hardware Tech',
    kidDefinition:
      'The friendly nickname for NASA’s Perseverance rover currently exploring the ancient river delta inside Jezero Crater on Mars!',
    playfulAnalogy:
      'Curiosity’s younger, upgraded sibling with stronger wheels, an oxygen-making box (MOXIE), and a helicopter sidekick!',
    funFact:
      'In 2024, Percy discovered a fascinating rock named "Cheyava Falls" with leopard-like spots that on Earth are often linked to ancient microbes!',
    isTechnical: true,
  },
  'new horizons': {
    term: 'New Horizons Pluto & Kuiper Belt Probe',
    pronunciation: 'NOO huh-RY-zunz',
    emoji: '🩵',
    category: 'Deep Space',
    kidDefinition:
      'A grand-piano-sized NASA probe launched in 2006 at 36,373 mph that revealed Pluto’s giant nitrogen-ice heart in 2015 and snowman-shaped Arrokoth in 2019!',
    playfulAnalogy:
      'A cosmic speed-skater that zoomed past the Moon in just 9 hours on launch day and is now over 60 AU away in the icy Kuiper Belt!',
    funFact:
      'One of New Horizons’ instruments—the Student Dust Counter—was built and operated by college students!',
    isTechnical: true,
  },

  // Subsystems, Instruments & Engineering Jargon
  kapton: {
    term: 'Gold Kapton Thermal Blanket',
    pronunciation: 'KAP-tahn',
    emoji: '✨',
    category: 'Hardware Tech',
    kidDefinition:
      'Paper-thin layers of golden plastic foil coated with aluminum that wrap around lunar landers and space probes to block +120°C sunlight and trap warmth at night.',
    playfulAnalogy:
      'Like a shiny gold emergency space-blanket combined with a vacuum thermos that keeps electronics from cooking in the sun or freezing in shadow!',
    funFact:
      'Even though it looks like solid gold metal on the Apollo Lunar Module, Kapton foil is actually amber-colored plastic as thin as kitchen plastic wrap!',
    isTechnical: true,
  },
  aerogel: {
    term: 'Aerogel ("Frozen Smoke" Insulation)',
    pronunciation: 'AIR-oh-jel',
    emoji: '☁️',
    category: 'Hardware Tech',
    kidDefinition:
      'An ultra-lightweight foam that is 99.8% air, used inside Mars rovers like Spirit and Opportunity to keep their batteries warm during -100°C Martian nights!',
    playfulAnalogy:
      'Nicknamed "frozen smoke," aerogel feels like a ghostly blue sponge that weighs almost nothing yet blocks freezing cold better than a thick winter parka!',
    funFact:
      'A block of aerogel the size of a brick weighs less than a marshmallow, yet it can hold up a real brick without squishing!',
    isTechnical: true,
  },
  tega: {
    term: 'TEGA (Thermal and Evolved Gas Analyzer)',
    pronunciation: 'TEE-guh',
    emoji: '🔥',
    category: 'Hardware Tech',
    kidDefinition:
      'Eight miniature high-temperature baking ovens on the Phoenix Mars Lander that heated scooped Martian dirt up to 1,000°C to sniff out real water vapor!',
    playfulAnalogy:
      'Like a robotic Easy-Bake Oven on Mars—drop a spoonful of icy dirt inside, bake it until it steams, and let a chemical nose smell the steam!',
    funFact:
      'On July 31, 2008, TEGA Oven #4 melted and vaporized real Martian ice, proving 100% that water H₂O was in the soil!',
    isTechnical: true,
  },
  pancam: {
    term: 'Pancam (Panoramic Stereo Camera)',
    pronunciation: 'PAN-kam',
    emoji: '📷',
    category: 'Hardware Tech',
    kidDefinition:
      'The twin high-resolution color cameras perched on top of Spirit and Opportunity’s neck mast at human eye-level (5 feet high) to take 3D stereo panoramas of Mars.',
    playfulAnalogy:
      'Like a pair of sharp eagle eyes with spinning color filter wheels that let the rovers see Mars in 3D and spot water-formed minerals!',
    funFact:
      'Opportunity’s Pancam took over 228,000 raw images during its 15 years on Mars!',
    isTechnical: true,
  },
  supercam: {
    term: 'SuperCam Laser & Microphone',
    pronunciation: 'SOO-per-kam',
    emoji: '🎯',
    category: 'Hardware Tech',
    kidDefinition:
      'The big camera "eye" on Perseverance’s head that fires a pulsing laser beam up to 20 feet away to vaporize tiny specks of rock and listens to the snap with a microphone!',
    playfulAnalogy:
      'Like a sci-fi superhero visor that zaps a rock from across the room and listens to how loud it "pops" to tell how hard the rock is!',
    funFact:
      'SuperCam’s microphone recorded the gentle whistling of Martian wind and the buzzing blades of the Ingenuity helicopter!',
    isTechnical: true,
  },
  lorri: {
    term: 'LORRI (Long-Range Reconnaissance Imager)',
    pronunciation: 'LOR-ee',
    emoji: '🔭',
    category: 'Hardware Tech',
    kidDefinition:
      'The high-powered telescopic eagle-eye camera on New Horizons that snapped crystal-clear close-ups of Pluto’s icy mountains and nitrogen-ice heart.',
    playfulAnalogy:
      'Like strapping a backyard astronomy telescope to a speeding space probe so it can photograph ice mountains from thousands of miles away!',
    funFact:
      'LORRI has no moving focus parts—it is built from silicon carbide so it stays in sharp focus even in the -220°C freeze of the Kuiper Belt!',
    isTechnical: true,
  },
  lroc: {
    term: 'LROC (Lunar Reconnaissance Orbiter Camera)',
    pronunciation: 'EL-rok',
    emoji: '📸',
    category: 'Hardware Tech',
    kidDefinition:
      'A pair of super-sharp telephoto cameras on NASA’s LRO satellite that photograph the Moon’s surface at 50 centimeters per pixel.',
    playfulAnalogy:
      'A camera flying 31 miles high that is so zoomed-in it can see the wiggly footpaths and Moon Buggy tire tracks left by astronauts in 1972!',
    funFact:
      'LROC has photographed all six Apollo landing sites from orbit, showing the golden descent stages casting long shadows in the sun!',
    isTechnical: true,
  },
  diviner: {
    term: 'Diviner Lunar Radiometer',
    pronunciation: 'dih-VY-ner',
    emoji: '🌡️',
    category: 'Hardware Tech',
    kidDefinition:
      'An infrared heat-measuring instrument on the Lunar Reconnaissance Orbiter that maps the extreme daytime heat and freezing nighttime cold across the Moon.',
    playfulAnalogy:
      'Like a giant no-touch forehead thermometer flying over the Moon—measuring boiling +120°C sunny rocks and freezing -248°C shadowed craters!',
    funFact:
      'Diviner discovered spots inside dark craters at the Moon’s South Pole at 25 Kelvin (-248°C)—the coldest measured places in our entire Solar System!',
    isTechnical: true,
  },
  magnetometer: {
    term: 'Magnetometer',
    pronunciation: 'mag-nuh-TOM-uh-ter',
    emoji: '🧭',
    category: 'Hardware Tech',
    kidDefinition:
      'A scientific sensor held out on a long pole (boom) that measures invisible magnetic fields around planets, moons, and in deep space.',
    playfulAnalogy:
      'Like a super-powered 3D Boy Scout compass that can feel the magnetic force-field of Jupiter or the edge of the Sun’s bubble!',
    funFact:
      'Voyager 1’s magnetometer sits at the end of a 43-foot fiberglass pole so the probe’s own electrical wires don’t confuse the compass!',
    isTechnical: true,
  },
  'rocker-bogie': {
    term: 'Rocker-Bogie Suspension',
    pronunciation: 'RAH-ker BOH-gee',
    emoji: '🦾',
    category: 'Hardware Tech',
    kidDefinition:
      'NASA’s clever 6-wheel bendable leg design (used on Spirit, Opportunity, Curiosity, and Perseverance) that keeps all six wheels on the ground while climbing over boulders!',
    playfulAnalogy:
      'Like mountain-goat legs on hinges: when one front wheel climbs up a tall rock, the other five wheels press down so the rover never tips over!',
    funFact:
      'A rocker-bogie rover can tilt up to 45 degrees on a steep crater wall without flipping over!',
    isTechnical: true,
  },
  hydrazine: {
    term: 'Hydrazine Thrusters',
    pronunciation: 'HY-druh-zeen',
    emoji: '🔥',
    category: 'Hardware Tech',
    kidDefinition:
      'High-energy rocket propellant used in small steering and landing jets (like Phoenix’s 12 landing thrusters) that fires instantly without needing a spark plug!',
    playfulAnalogy:
      'Like rapid-fire aerosol puffs of rocket power—pfft-pfft-pfft!—that let a lander gently brake or steer in space!',
    funFact:
      'Voyager 1’s tiny hydrazine thrusters still work after nearly 50 years in deep space!',
    isTechnical: true,
  },
  silica: {
    term: 'Opaline Silica (Hot-Spring Mineral)',
    pronunciation: 'SIL-ih-kuh',
    emoji: '💎',
    category: 'Planet Science',
    kidDefinition:
      'A bright white, glassy mineral that forms on Earth around steaming volcanic hot springs and geysers (like Yellowstone!). Spirit scraped up 90% pure silica on Mars!',
    playfulAnalogy:
      'A fossilized clue of ancient warm bathwater on Mars—when Spirit’s stuck wheel dug up white silica, scientists knew hot water once bubbled there!',
    funFact:
      'On Earth, hot-spring silica traps and preserves tiny microbes, making Spirit’s discovery at "Home Plate" one of the most exciting clues for ancient Martian life!',
    isTechnical: true,
  },
  perchlorates: {
    term: 'Perchlorates (Martian Salt)',
    pronunciation: 'per-KLOR-ayts',
    emoji: '🧂',
    category: 'Planet Science',
    kidDefinition:
      'Special chlorine-and-oxygen salts discovered in the Martian dirt by NASA’s Phoenix Lander that act like natural antifreeze, lowering the freezing point of water.',
    playfulAnalogy:
      'Just like trucks spread rock salt on icy winter roads so ice melts at colder temperatures, Martian perchlorate salts can keep briny water liquid even below freezing!',
    funFact:
      'Even though perchlorates are salty, some tough desert microbes on Earth actually use perchlorates as an energy source!',
    isTechnical: true,
  },
  methane: {
    term: 'Liquid Methane & Ethane',
    pronunciation: 'METH-ayn',
    emoji: '🌊',
    category: 'Planet Science',
    kidDefinition:
      'On warm Earth, methane is an invisible gas. But on Saturn’s moon Titan—where it is -179°C (-290°F)—methane turns into liquid rain, rivers, and giant lakes!',
    playfulAnalogy:
      'Imagine a world so freezing cold that natural gas turns into cool liquid oceans with waves, clouds, and rainstorms just like Earth’s water cycle!',
    funFact:
      'Cassini’s radar mapped Kraken Mare on Titan—a liquid methane sea bigger than all five North American Great Lakes combined!',
    isTechnical: true,
  },
  petabytes: {
    term: 'Petabyte (1.4+ Petabytes)',
    pronunciation: 'PEH-tuh-byts',
    emoji: '💾',
    category: 'Measurement',
    kidDefinition:
      'A gigantic unit of computer memory equal to 1,000 terabytes—or about 1,000,000 gigabytes! LRO has sent back over 1.4 petabytes of Moon photos and 3D maps.',
    playfulAnalogy:
      '1.4 petabytes is enough digital space to store over 350 million high-resolution photos or play non-stop music for 2,800 years!',
    funFact:
      'The Lunar Reconnaissance Orbiter beams data down using a high-speed Ka-band laser/radio link at 100 megabits per second!',
    isTechnical: true,
  },
  kelvin: {
    term: 'Kelvin (25K Cold Traps)',
    pronunciation: 'KEL-vin',
    emoji: '🥶',
    category: 'Measurement',
    kidDefinition:
      'The temperature scale space scientists use where 0 Kelvin ("Absolute Zero" or -273°C) is the coldest anything in the universe can possibly get!',
    playfulAnalogy:
      'Normal thermometers have minus numbers, which can be confusing. Kelvin starts at 0 at the bottom of the universe’s freezer—and Moon craters at 25 Kelvin (-248°C) are almost at the bottom!',
    funFact:
      'Dark craters at the Moon’s South Pole measured at 25 Kelvin by LRO are even colder than Pluto’s surface!',
    isTechnical: true,
  },
  tau: {
    term: 'Tau (Atmospheric Dust Opacity)',
    pronunciation: 'TOW (rhymes with cow)',
    emoji: '🌫️',
    category: 'Measurement',
    kidDefinition:
      'A number scientists use to measure how thick and dusty the Martian sky is. On a clear Mars day, Tau is below 1. During Oppy’s final 2018 dust storm, Tau hit a record 10.8!',
    playfulAnalogy:
      'Think of Tau like putting on layers of dark sunglasses: Tau 1 is one pair of sunglasses, while Tau 10.8 is like wearing 11 pairs at once—blocking 99.99% of sunlight!',
    funFact:
      'Tau 10.8 over Perseverance Valley in June 2018 was the darkest Martian dust storm ever recorded from the surface!',
    isTechnical: true,
  },

  // Destinations & Planetary Places
  moon: {
    term: 'The Moon (Luna)',
    pronunciation: 'MOON',
    emoji: '🌕',
    category: 'Planet Science',
    kidDefinition:
      'Earth’s rocky natural satellite orbiting 240,000 miles away (0.0026 AU), home to 6 Apollo landing sites, 3 Moon Buggies, 5 ALSEP stations, and the LRO orbiter!',
    playfulAnalogy:
      'Earth’s ancient cosmic partner—an airless museum world where astronaut footprints and rover tracks stay preserved for millions of years!',
    funFact:
      'Because the Moon has only 1/6th of Earth’s gravity, if you weigh 60 pounds on Earth, you would weigh just 10 pounds on the Moon and could jump 6 times higher!',
  },
  mars: {
    term: 'Mars (The Red Planet)',
    pronunciation: 'MARZ',
    emoji: '🔴',
    category: 'Planet Science',
    kidDefinition:
      'The fourth planet from the Sun at 1.524 AU—a rusty, desert world with giant canyons, polar ice caps, ancient dried-up lakes, and 6 Space Legacy rovers and landers!',
    playfulAnalogy:
      'The only planet in the universe we know of that is inhabited entirely by robots—rovers and landers exploring ancient riverbeds for us!',
    funFact:
      'Mars is red because its soil is rich in iron oxide—the exact same mineral as rust!',
  },
  saturn: {
    term: 'Saturn',
    pronunciation: 'SA-turn',
    emoji: '🪐',
    category: 'Deep Space',
    kidDefinition:
      'The sixth planet from the Sun at 9.5 AU—a colossal gas giant famous for its dazzling rings of water ice and over 140 moons including Titan and Enceladus!',
    playfulAnalogy:
      'The jewel of the Solar System—so huge that 760 Earths could fit inside it, yet so light and fluffy it would float in a giant bathtub of water!',
    funFact:
      'Saturn’s rings look solid from afar, but Cassini proved they are made of billions of tumbling icebergs and snowballs!',
  },
  jupiter: {
    term: 'Jupiter',
    pronunciation: 'JOO-pih-ter',
    emoji: '🟠',
    category: 'Deep Space',
    kidDefinition:
      'The largest planet in our Solar System (5.2 AU from the Sun), whose powerful gravity was used by Pioneer, Voyager, Cassini, and New Horizons as a cosmic slingshot!',
    playfulAnalogy:
      'The heavyweight champion of the planets—deep-space probes loop close to Jupiter to steal a tiny bit of its orbital speed and whip outward thousands of miles per hour faster!',
    funFact:
      'Voyager 1 discovered lightning bolts in Jupiter’s clouds and erupting volcanoes on Jupiter’s moon Io!',
  },
  titan: {
    term: 'Titan (Saturn’s Largest Moon)',
    pronunciation: 'TY-tun',
    emoji: '🟠',
    category: 'Deep Space',
    kidDefinition:
      'Saturn’s biggest moon (bigger than the planet Mercury!), wrapped in thick orange clouds with rain, rivers, and seas of liquid methane explored by Cassini and the Huygens lander.',
    playfulAnalogy:
      'A mysterious twin of early Earth kept in a deep freeze—the only moon in the Solar System with thick air and liquid lakes on its surface!',
    funFact:
      'Because Titan has thick air and low gravity, an astronaut wearing wings on their arms could literally flap and fly like a bird on Titan!',
  },
  enceladus: {
    term: 'Enceladus (Saturn’s Ocean Moon)',
    pronunciation: 'en-SEL-uh-dus',
    emoji: '⛲',
    category: 'Deep Space',
    kidDefinition:
      'A shiny white icy moon of Saturn (only as wide as Arizona!) that shoots giant geysers of salty water and organic molecules into space from a warm underground ocean.',
    playfulAnalogy:
      'A cosmic snowball hiding a global liquid ocean inside—and spraying free samples of its ocean water right out into space for Cassini to taste!',
    funFact:
      'Enceladus reflects almost 100% of the sunlight that hits it, making it the brightest, snowiest surface in the Solar System!',
  },
  jezero: {
    term: 'Jezero Crater',
    pronunciation: 'JEZ-uh-roh',
    emoji: '🏞️',
    category: 'Planet Science',
    kidDefinition:
      'A 28-mile-wide impact crater on Mars that held a deep freshwater lake and a fan-shaped river delta 3.5 billion years ago—where Perseverance and Ingenuity landed in 2021!',
    playfulAnalogy:
      'An ancient Martian lakebed treasure chest: rivers washed mud and minerals into Jezero Lake billions of years ago, making it the best spot to hunt for fossil microbes!',
    funFact:
      '"Jezero" means "lake" in several Slavic languages!',
  },
  'meridiani planum': {
    term: 'Meridiani Planum',
    pronunciation: 'muh-rid-ee-AH-nee PLAY-num',
    emoji: '🏜️',
    category: 'Planet Science',
    kidDefinition:
      'A flat, dark-sand plain near the Martian equator rich in water-formed gray hematite minerals where the Opportunity rover explored for nearly 15 years.',
    playfulAnalogy:
      'An ancient Martian shoreline and smooth highway that let Opportunity drive 28 miles from Eagle Crater to Endeavour Crater!',
    funFact:
      'NASA chose Meridiani Planum because orbiting satellites spotted the infrared glow of water-formed hematite crystals from space!',
  },

  // Common UI & Space Words across the Site
  abandoned: {
    term: 'Abandoned (But Not Lost)',
    pronunciation: 'uh-BAN-dund',
    emoji: '🛸',
    category: 'Space Vocabulary',
    kidDefinition:
      'Left resting in space or on another world after its astronauts flew home or its batteries ran out—yet still tracked and remembered forever by NASA!',
    playfulAnalogy:
      'Like a famous mountain climber’s flag and base camp left on the peak of Mount Everest: nobody lives inside it today, but it stands as a monument to history!',
    funFact:
      'Every single one of NASA’s 13 Space Legacy pioneers has known coordinates or orbital paths—none of them are lost!',
  },
  lost: {
    term: 'Not Lost (Tracked by NASA)',
    pronunciation: 'LAWST',
    emoji: '🧭',
    category: 'Space Vocabulary',
    kidDefinition:
      'When something is lost, nobody knows where it is. None of the 13 Space Legacy hardware pioneers are lost—scientists know their exact craters, hills, and trajectories!',
    playfulAnalogy:
      'Even when a rover’s battery goes silent on Mars, NASA satellites flying overhead can still take high-resolution photos of it parked in the red sand!',
    funFact:
      'Orbiters like LRO at the Moon and MRO at Mars regularly photograph our silent landers and rovers from space!',
  },
  pioneers: {
    term: 'Space Pioneers',
    pronunciation: 'py-uh-NEERZ',
    emoji: '🚀',
    category: 'Space Vocabulary',
    kidDefinition:
      'Brave trailblazing machines and crews that are the very first to travel into an unexplored region of the Moon, Mars, or deep space.',
    playfulAnalogy:
      'Like the first scouts to cross a wide ocean or map a dark cave so everyone who comes later knows what awaits!',
    funFact:
      'The 13 pioneers in Space Legacy span from Apollo 11 in 1969 to Perseverance and Voyager today!',
  },
  hardware: {
    term: 'Spaceflight Hardware',
    pronunciation: 'HARD-wair',
    emoji: '🔧',
    category: 'Hardware Tech',
    kidDefinition:
      'The real physical machines—metal rovers, golden landers, titanium wheels, laser mirrors, nuclear batteries, and cameras—built by engineers to fly in space.',
    playfulAnalogy:
      'If computer code is a robot’s "thoughts," hardware is its actual metal body, arms, eyes, and wheels!',
    funFact:
      'Space hardware is built inside ultra-clean "cleanrooms" where engineers wear bunny suits so not a single speck of Earth dust hitchhikes to Mars!',
  },
  rover: {
    term: 'Planetary Rover',
    pronunciation: 'ROH-ver',
    emoji: '🛞',
    category: 'Hardware Tech',
    kidDefinition:
      'A wheeled robotic vehicle engineered to drive across the solid ground of another world like Mars or the Moon.',
    playfulAnalogy:
      'A remote-controlled robotic geologist on six wheels with cameras for eyes and a tool-belt arm for drilling rocks!',
    funFact:
      'Because radio signals take 5 to 20 minutes to reach Mars, Mars rovers use smart self-driving software to steer around sharp rocks on their own!',
  },
  rovers: {
    term: 'Planetary Rovers',
    pronunciation: 'ROH-verz',
    emoji: '🛞',
    category: 'Hardware Tech',
    kidDefinition:
      'Wheeled explorers (like Apollo’s Moon Buggies and Mars’s Spirit, Opportunity, Curiosity, and Perseverance) that roll across craters and plains.',
    playfulAnalogy:
      'Off-road science trucks built to survive -100°C nights and rocky craters millions of miles from the nearest repair shop!',
    funFact:
      'Every Mars rover has 6 wheels driven by their own individual electric motors!',
  },
  lander: {
    term: 'Planetary Lander',
    pronunciation: 'LAN-der',
    emoji: '🛬',
    category: 'Hardware Tech',
    kidDefinition:
      'A robotic or crewed vehicle designed to touch down gently on sturdy legs on the surface of a moon or planet and do science from that landing spot.',
    playfulAnalogy:
      'Like a robotic treehouse base camp that lands on three or four feet and uses long mechanical arms to dig and listen to the ground!',
    funFact:
      'Phoenix and InSight are stationary three-legged Mars landers, while the Apollo Lunar Module had four wide landing pads!',
  },
  landers: {
    term: 'Planetary Landers',
    pronunciation: 'LAN-derz',
    emoji: '🛬',
    category: 'Hardware Tech',
    kidDefinition:
      'Explorers that land directly on a planet or moon (like Apollo Eagle, Huygens on Titan, and Phoenix & InSight on Mars) instead of staying in orbit.',
    playfulAnalogy:
      'Stationary robotic laboratories planted right on the ground of alien worlds!',
    funFact:
      'Stationary landers are best for seismometers (quake sensors) because they sit completely still on the ground!',
  },
  orbiter: {
    term: 'Planetary Orbiter',
    pronunciation: 'OR-bih-ter',
    emoji: '🛰️',
    category: 'Hardware Tech',
    kidDefinition:
      'A robotic explorer that flies in continuous loops (orbits) around a planet or moon—like LRO at the Moon or Cassini at Saturn—to map the whole world from above.',
    playfulAnalogy:
      'Like a high-flying eagle circling a mountain peak with binoculars and a radio relay!',
    funFact:
      'Orbiters also act as cosmic cell-phone towers, relaying messages from surface rovers back to Earth!',
  },
  probe: {
    term: 'Deep Space Probe',
    pronunciation: 'PROHB',
    emoji: '🛸',
    category: 'Deep Space',
    kidDefinition:
      'An uncrewed robotic pioneer sent millions or billions of miles into space to fly past planets, moons, asteroids, or into interstellar space.',
    playfulAnalogy:
      'A robotic scout sent far ahead of human astronauts to snap close-up photos and measure mysterious worlds!',
    funFact:
      'Voyager 1 is the farthest space probe in history—traveling at 38,000 miles per hour!',
  },
  crater: {
    term: 'Impact Crater',
    pronunciation: 'KRAY-ter',
    emoji: '🕳️',
    category: 'Planet Science',
    kidDefinition:
      'A bowl-shaped basin in the ground of a moon or planet carved out when a speeding space rock (meteoroid or asteroid) slams into the surface.',
    playfulAnalogy:
      'Drop a marble into a bowl of cocoa-dusted flour—the round dimple it splashes open is just like a planetary crater!',
    funFact:
      'Geologists love craters because the impact blasts deep, ancient underground rock layers right up to the surface where rovers can study them!',
  },
  craters: {
    term: 'Impact Craters',
    pronunciation: 'KRAY-terz',
    emoji: '🕳️',
    category: 'Planet Science',
    kidDefinition:
      'Bowl-shaped hollows across the Moon and Mars (like Eagle, Victoria, Gale, Jezero, and Shackleton Craters) that hold clues to ancient water and ice.',
    playfulAnalogy:
      'Natural time-capsules—some Martian craters once filled up with rivers to become ancient lakes, while deep lunar polar craters trap ancient water ice!',
    funFact:
      'Opportunity explored four major craters on Mars: Eagle, Endurance, Victoria, and 14-mile-wide Endeavour Crater!',
  },
  catalogue: {
    term: 'Space Legacy Hardware Catalogue',
    pronunciation: 'KAT-uh-log',
    emoji: '🗂️',
    category: 'Space Vocabulary',
    kidDefinition:
      'Our complete museum collection of 13 real NASA space hardware pioneers—organized chronologically from 1969 to today with stories, 3D labs, and quizzes!',
    playfulAnalogy:
      'Like an interactive trading-card binder of humanity’s greatest space robots and lunar artifacts!',
    funFact:
      'Every item in the Catalogue includes its real NASA Planetary Data System (PDS) archive ID and planetary coordinates!',
  },
  nasa: {
    term: 'NASA (National Aeronautics and Space Administration)',
    pronunciation: 'NAH-suh',
    emoji: '🚀',
    category: 'Space Vocabulary',
    kidDefinition:
      'America’s space agency, founded in 1958, whose scientists, engineers, and astronauts built and launched the 13 Space Legacy missions!',
    playfulAnalogy:
      'Earth’s giant team of space explorers, rocket builders, and planetary detectives!',
    funFact:
      'NASA shares all of its planetary photos and mission telemetry freely with kids and scientists around the whole world!',
  },
  jpl: {
    term: 'JPL (Jet Propulsion Laboratory)',
    pronunciation: 'J-P-L',
    emoji: '🛰️',
    category: 'Space Vocabulary',
    kidDefinition:
      'NASA’s robotic space exploration center in Pasadena, California, where engineers built Voyager, Cassini, Spirit, Opportunity, Phoenix, Curiosity, InSight, and Perseverance!',
    playfulAnalogy:
      'Santa’s workshop for interplanetary robots—and home to the Mission Control room that talks to every probe in deep space!',
    funFact:
      'Curiosity’s six metal wheels have tiny holes that stamp the letters "J-P-L" in Morse code into the Martian sand as it drives!',
  },
  astronaut: {
    term: 'Astronaut ("Star Sailor")',
    pronunciation: 'AS-truh-nawt',
    emoji: '👩‍🚀',
    category: 'Space Vocabulary',
    kidDefinition:
      'A trained human explorer, pilot, or scientist who flies into space to conduct experiments, repair stations, or walk on the Moon!',
    playfulAnalogy:
      'The word "astronaut" comes from Greek words meaning "star sailor"—wearing a pressurized spacesuit like a personal mini-submarine for the vacuum of space!',
    funFact:
      'Between 1969 and 1972, 12 Apollo astronauts walked and drove Moon Buggies across the lunar surface!',
  },
  astronauts: {
    term: 'Astronauts ("Star Sailors")',
    pronunciation: 'AS-truh-nawts',
    emoji: '👩‍🚀',
    category: 'Space Vocabulary',
    kidDefinition:
      'Human space explorers who fly aboard crewed missions—including the 12 Apollo Moon walkers who set up laser mirrors and ALSEP science stations!',
    playfulAnalogy:
      'Explorers wearing high-tech white spacesuits with built-in air conditioning, drinking straws, and gold-tinted sun visors!',
    funFact:
      'Apollo 17 astronaut Harrison Schmitt was the first trained geologist to walk on the Moon and scoop up ancient orange volcanic glass soil!',
  },
  solar: {
    term: 'Solar Power & Solar Panels',
    pronunciation: 'SOH-ler',
    emoji: '☀️',
    category: 'Hardware Tech',
    kidDefinition:
      'Dark blue or black wings covered in special silicon cells (on Spirit, Opportunity, Phoenix, LRO, InSight, and Ingenuity) that catch sunlight and turn it into electricity!',
    playfulAnalogy:
      'Like robotic leaves on a plant—instead of making sugar from sunlight like a tree leaf, solar panels make electric power to charge a robot’s batteries!',
    funFact:
      'Opportunity’s solar panels were cleaned multiple times by lucky Martian dust-devil whirlwinds that vacuumed the red dust right off!',
    isTechnical: true,
  },
  antenna: {
    term: 'High-Gain Radio Antenna',
    pronunciation: 'an-TEN-uh',
    emoji: '📡',
    category: 'Mission Comms',
    kidDefinition:
      'A bowl-shaped metal dish or mast on a space pioneer that focuses radio waves into a tight beam aimed right at giant listening dishes on Earth.',
    playfulAnalogy:
      'Like cupping your hands around your mouth to shout across a stadium—a dish antenna focuses a tiny 20-watt radio whisper across billions of miles!',
    funFact:
      'Voyager 1’s white high-gain dish antenna is 12 feet (3.7 meters) wide—the biggest part of the entire probe!',
    isTechnical: true,
  },
  parachute: {
    term: 'Supersonic Planetary Parachute',
    pronunciation: 'PAIR-uh-shoot',
    emoji: '🪂',
    category: 'Hardware Tech',
    kidDefinition:
      'A giant fabric canopy made of super-strong nylon and Kevlar that pops open at more than twice the speed of sound to slow landers and rovers entering Mars or Titan’s air!',
    playfulAnalogy:
      'Like pulling a colossal skydiving brake umbrella while zooming faster than a speeding bullet!',
    funFact:
      'Perseverance’s orange-and-white parachute had a secret binary code message stitched into its stripes reading: "DARE MIGHTY THINGS"!',
    isTechnical: true,
  },
  airbags: {
    term: 'Tetrahedral Landing Airbags',
    pronunciation: 'AIR-bagz',
    emoji: '🎈',
    category: 'Hardware Tech',
    kidDefinition:
      'Clusters of 24 giant Kevlar-reinforced cushions that inflated around the Spirit and Opportunity rovers so they could bounce safely onto the rocky surface of Mars!',
    playfulAnalogy:
      'Imagine wrapping a delicate science robot inside a giant bunch of super-tough bouncy-castle grapes and dropping it onto Mars to bounce 28 times before rolling to a stop!',
    funFact:
      'Opportunity’s airbags bounced right over the rim of Eagle Crater—scoring a cosmic "hole-in-one"!',
    isTechnical: true,
  },
  gravity: {
    term: 'Gravity & Gravity Assist',
    pronunciation: 'GRAV-ih-tee',
    emoji: '🪐',
    category: 'Planet Science',
    kidDefinition:
      'The invisible pulling force that every planet, moon, and star has. Space navigators also use giant planets’ gravity as a "slingshot" to speed up probes without using fuel!',
    playfulAnalogy:
      'Like a roller-coaster hill or a skater grabbing the hand of a spinning friend at the roller rink and getting whipped forward at super speed!',
    funFact:
      'Mars has 38% of Earth’s gravity, and the Moon has only 16.6%—so a 100-pound kid weighs 38 pounds on Mars and just 16.6 pounds on the Moon!',
  },
  atmosphere: {
    term: 'Planetary Atmosphere',
    pronunciation: 'AT-mus-feer',
    emoji: '🌬️',
    category: 'Planet Science',
    kidDefinition:
      'The blanket of gases wrapped around a planet or moon by gravity. Earth has breathable nitrogen and oxygen, Mars has thin carbon dioxide, and the Moon has almost no air at all!',
    playfulAnalogy:
      'Like a cozy jacket wrapped around a world: Earth wears a warm down jacket, Mars wears a super-thin windbreaker (1% as thick as Earth’s), and Titan wears a thick orange parka!',
    funFact:
      'Even though Mars’s atmosphere is 100 times thinner than Earth’s, it is still thick enough to create giant dust storms and let the Ingenuity helicopter fly!',
  },
  canyons: {
    term: 'Martian Canyons (Valles Marineris)',
    pronunciation: 'KAN-yunz',
    emoji: '🏜️',
    category: 'Planet Science',
    kidDefinition:
      'Enormous valleys and gorges carved across Mars by ancient tectonic cracks and rushing floodwaters billions of years ago.',
    playfulAnalogy:
      'Mars’s biggest canyon—Valles Marineris—is so huge it would stretch all the way from New York to Los Angeles and is 4 times deeper than Earth’s Grand Canyon!',
    funFact:
      'Early Mars rovers and orbiters proved that ancient rivers once carved winding channels right into Martian craters!',
  },
  interstellar: {
    term: 'Interstellar Space',
    pronunciation: 'in-ter-STEL-er',
    emoji: '🌌',
    category: 'Deep Space',
    kidDefinition:
      'The vast, cold region of the galaxy *between* the stars—outside our Sun’s protective magnetic bubble (the heliosphere), where Voyager 1 and Voyager 2 fly today!',
    playfulAnalogy:
      'If our Solar System is our home front yard with the Sun as the porch light, interstellar space is the wide open highway between all the other houses in the Milky Way neighborhood!',
    funFact:
      'Only two working machines built by humans have ever reached interstellar space: Voyager 1 (in 2012) and Voyager 2 (in 2018)!',
    isTechnical: true,
  },
  dsn: {
    term: 'NASA Deep Space Network (DSN)',
    pronunciation: 'D-S-N',
    emoji: '📡',
    category: 'Mission Comms',
    kidDefinition:
      'Three giant complexes of 70-meter radio dish antennas spaced evenly around Earth—in Goldstone (California), Madrid (Spain), and Canberra (Australia)—so NASA never loses sight of deep-space pioneers as Earth spins!',
    playfulAnalogy:
      'Three gigantic robotic ears placed 120 degrees apart around our spinning planet so at least one ear is always facing every rover and probe in the universe!',
    funFact:
      'Each 70-meter DSN dish antenna is as wide as a football field and can catch a radio signal 20 billion times weaker than a digital wristwatch battery!',
    isTechnical: true,
  },
  pds: {
    term: 'NASA Planetary Data System (PDS)',
    pronunciation: 'P-D-S',
    emoji: '🗄️',
    category: 'Mission Comms',
    kidDefinition:
      'NASA’s permanent digital library that preserves every photo, seismic rumble, laser bounce, and temperature reading from all planetary missions for future generations.',
    playfulAnalogy:
      'Humanity’s cosmic museum vault—where every single discovery from Apollo, Voyager, Cassini, and Mars rovers is saved forever!',
    funFact:
      'Every card in the Space Legacy Catalogue lists its official NASA PDS Archive ID!',
    isTechnical: true,
  },
  lunar: {
    term: 'Lunar (Of the Moon)',
    pronunciation: 'LOO-ner',
    emoji: '🌕',
    category: 'Planet Science',
    kidDefinition:
      'Anything that belongs to or happens on Earth’s Moon—like lunar landers, lunar rovers, lunar dust (regolith), and moonquakes!',
    playfulAnalogy:
      '"Luna" was the ancient Roman name for the Moon—so "lunar" is the science word for "Moon-related"!',
    funFact:
      'One lunar day-and-night cycle takes about 29.5 Earth days (14 Earth days of blazing sunlight followed by 14 Earth days of freezing darkness)!',
  },
  martian: {
    term: 'Martian (Of Mars)',
    pronunciation: 'MAR-shun',
    emoji: '🔴',
    category: 'Planet Science',
    kidDefinition:
      'Anything from or on the red planet Mars—like Martian rovers, Martian sols (days), Martian dust storms, and Martian water ice!',
    playfulAnalogy:
      'In science-fiction movies, "Martians" were little green aliens—but in real life, the true Martians are our heroic NASA rovers and landers!',
    funFact:
      'A Martian year is 687 Earth days long—almost twice as long as a year on Earth!',
  },
  artifacts: {
    term: 'Space Heritage Artifacts',
    pronunciation: 'AR-tih-fakts',
    emoji: '🏛️',
    category: 'Space Vocabulary',
    kidDefinition:
      'Historic human-made objects left on the Moon, Mars, Titan, or in deep space—like Apollo’s golden Eagle descent stage, Moon Buggies, laser mirrors, and Golden Records.',
    playfulAnalogy:
      'Like ancient treasures in a museum—except this museum is spread across the entire Solar System!',
    funFact:
      'Because the Moon has no wind or rain, the Apollo artifacts at Tranquility Base will stay preserved for millions of years!',
  },
  missions: {
    term: 'Space Exploration Missions',
    pronunciation: 'MISH-unz',
    emoji: '🚀',
    category: 'Space Vocabulary',
    kidDefinition:
      'Carefully planned journeys into space with specific scientific goals—like landing humans on the Moon, digging for Mars ice, or flying past Pluto!',
    playfulAnalogy:
      'A cosmic quest where thousands of scientists and engineers team up to build a pioneer, launch it on a rocket, and guide it across the Solar System!',
    funFact:
      'Space Legacy celebrates 13 historic missions spanning more than half a century of exploration!',
  },
  playground: {
    term: '3D Hardware Playground',
    pronunciation: 'PLAY-grownd',
    emoji: '🧊',
    category: 'Space Vocabulary',
    kidDefinition:
      'Our interactive 3D engineering lab where you can rotate, zoom, and click on the real physical parts of each space pioneer—from nuclear batteries to laser cameras!',
    playfulAnalogy:
      'Like having X-ray vision and a backstage pass inside NASA’s hardware cleanroom!',
    funFact:
      'Inspecting 5 different hardware subsystems in the 3D Lab unlocks the "Hardware Engineer" achievement badge!',
  },
  laser: {
    term: 'Space Laser Instrument',
    pronunciation: 'LAY-zer',
    emoji: '🔦',
    category: 'Hardware Tech',
    kidDefinition:
      'A super-focused beam of single-color light used by NASA pioneers to measure distances (like Apollo’s Laser Mirrors and LRO’s LOLA) or zap rocks to test their chemicals (like Curiosity’s ChemCam and Perseverance’s SuperCam)!',
    playfulAnalogy:
      'Like an ultra-precise ruler and rock-scanner made out of pure light!',
    funFact:
      'Scientists on Earth bounce green laser pulses off Apollo’s Moon mirrors to measure the Moon’s distance down to a single millimeter!',
    isTechnical: true,
  },
  mirror: {
    term: 'Laser Retroreflector Mirror',
    pronunciation: 'MEER-er',
    emoji: '🪞',
    category: 'Hardware Tech',
    kidDefinition:
      'Special corner-cube quartz prism mirrors left on the Moon by Apollo 11, 14, and 15 astronauts that reflect laser beams straight back to Earth telescopes!',
    playfulAnalogy:
      'Unlike a bathroom mirror that bounces light at an angle, a corner-cube mirror bounces light straight back to wherever it came from—like a cosmic ping-pong wall!',
    funFact:
      'Apollo’s laser mirrors are still working today after more than 55 years on the Moon without needing any batteries!',
    isTechnical: true,
  },
  plaque: {
    term: 'Pioneer Golden Plaque',
    pronunciation: 'PLAK',
    emoji: '🪙',
    category: 'Deep Space',
    kidDefinition:
      'A 6-by-9-inch gold-anodized aluminum plate bolted onto Pioneer 10 and Pioneer 11 showing a man, a woman, our Solar System, and a pulsar map pointing to Earth!',
    playfulAnalogy:
      'Humanity’s very first cosmic greeting card—engraved in metal so it can survive drifting between the stars for billions of years!',
    funFact:
      'Astronomer Carl Sagan and artist Linda Salzman Sagan designed the Pioneer plaque in just three weeks before Pioneer 10 launched in 1972!',
    isTechnical: true,
  },
  record: {
    term: 'Voyager Golden Record',
    pronunciation: 'REK-erd',
    emoji: '📀',
    category: 'Deep Space',
    kidDefinition:
      'A 12-inch gold-plated copper phonograph disc carried aboard Voyager 1 and Voyager 2 containing 115 images, greetings in 55 languages, nature sounds, and 90 minutes of music!',
    playfulAnalogy:
      'A cosmic time-capsule playlist of Earth—packed with whale songs, thunder, footsteps, Mozart, and Chuck Berry’s "Johnny B. Goode"!',
    funFact:
      'Each Golden Record is protected inside an aluminum jacket electroplated with a tiny speck of pure uranium-238 that acts as a billion-year atomic clock!',
    isTechnical: true,
  },
  houston: {
    term: 'Houston Mission Control (JSC)',
    pronunciation: 'HYOO-stun',
    emoji: '🎧',
    category: 'Mission Comms',
    kidDefinition:
      'Home of NASA’s Christopher C. Kraft Jr. Mission Control Center at the Johnson Space Center in Houston, Texas—where flight directors and Capcoms guide human spaceflight!',
    playfulAnalogy:
      'The ultimate nerve center on Earth where walls of giant screens track every heartbeat, fuel tank, and radio call from astronauts in space!',
    funFact:
      '"Houston" was the very first word spoken from the surface of the Moon when Neil Armstrong called: "Houston, Tranquility Base here. The Eagle has landed."',
    isTechnical: true,
  },
  capcom: {
    term: 'Capcom (Capsule Communicator)',
    pronunciation: 'KAP-kom',
    emoji: '🎙️',
    category: 'Mission Comms',
    kidDefinition:
      'The single person inside NASA’s Houston Mission Control—traditionally a fellow astronaut—who speaks directly over the radio to astronauts flying in space.',
    playfulAnalogy:
      'If 50 engineers in Mission Control all talked at once, the astronauts’ headsets would be super noisy! So the Capcom is the one trusted teammate holding the microphone!',
    funFact:
      'Astronaut Charlie Duke was the Apollo 11 Capcom during the Moon landing—and three years later, he walked on the Moon himself on Apollo 16!',
    isTechnical: true,
  },
  lock: {
    term: 'Telemetry Signal Lock',
    pronunciation: 'LOK',
    emoji: '📶',
    category: 'Mission Comms',
    kidDefinition:
      'When an Earth dish antenna (like Houston Capcom or the Deep Space Network) tunes into the exact radio frequency of a space pioneer and locks onto its data stream!',
    playfulAnalogy:
      'Like tuning an old car radio dial through static until—click!—your favorite music station comes in crystal clear!',
    funFact:
      'Even though Voyager 1 is over 15 billion miles away, NASA’s Deep Space Network dishes can still achieve a clean telemetry lock on its whisper-faint signal!',
    isTechnical: true,
  },
  tranquility: {
    term: 'Sea of Tranquility (Tranquility Base)',
    pronunciation: 'tran-KWIL-ih-tee',
    emoji: '🌕',
    category: 'Planet Science',
    kidDefinition:
      'A vast, flat plain of ancient dark volcanic basalt rock on the Moon where Apollo 11’s lunar module Eagle landed on July 20, 1969!',
    playfulAnalogy:
      'Early astronomers with small telescopes thought the dark flat spots on the Moon were oceans of water, so they named this smooth plain the "Sea of Tranquility"!',
    funFact:
      'Even though it’s called a "Sea," the Sea of Tranquility is bone-dry basalt lava that hardened over 3.5 billion years ago!',
    isTechnical: true,
  },
  pluto: {
    term: 'Pluto (Kuiper Belt Dwarf Planet)',
    pronunciation: 'PLOO-toh',
    emoji: '🩵',
    category: 'Deep Space',
    kidDefinition:
      'A fascinating icy world at the inner edge of the Kuiper Belt (39.5 AU from the Sun) with mountains of water ice and a giant heart-shaped glacier of nitrogen ice!',
    playfulAnalogy:
      'Once mysterious and blurry even in our biggest telescopes, New Horizons revealed Pluto in 2015 to be a lively wonderland with blue sky haze and five moons!',
    funFact:
      'Pluto’s giant bright heart is named Tombaugh Regio in honor of Clyde Tombaugh, who discovered Pluto in 1930!',
  },
  arrokoth: {
    term: 'Arrokoth (Kuiper Belt Object)',
    pronunciation: 'AIR-oh-koth',
    emoji: '⛄',
    category: 'Deep Space',
    kidDefinition:
      'A 22-mile-long icy world in the Kuiper Belt (43.4 AU from the Sun) shaped like a flattened red snowman that New Horizons flew past on New Year’s Day 2019!',
    playfulAnalogy:
      'Two ancient icy snowballs that gently bumped together at walking speed 4.5 billion years ago and stuck together to form a cosmic snowman!',
    funFact:
      'Arrokoth is the farthest and most primitive object in the universe ever visited up close by a space probe!',
    isTechnical: true,
  },
  uranus: {
    term: 'Uranus (Ice Giant Planet)',
    pronunciation: 'YOOR-uh-nus',
    emoji: '🔵',
    category: 'Deep Space',
    kidDefinition:
      'The seventh planet from the Sun (19.2 AU)—a pale cyan-blue ice giant that spins completely on its side and was visited up close only once in history, by Voyager 2 in 1986!',
    playfulAnalogy:
      'While other planets spin like upright tops, Uranus rolls around the Sun on its side like a bowling ball!',
    funFact:
      'Voyager 2 discovered 10 new moons and 2 new rings around Uranus during its 1986 flyby!',
  },
  neptune: {
    term: 'Neptune (Farthest Major Planet)',
    pronunciation: 'NEP-toon',
    emoji: '💙',
    category: 'Deep Space',
    kidDefinition:
      'The eighth and farthest major planet from the Sun (30 AU)—a deep-blue ice giant with 1,200-mph supersonic winds and an icy geyser moon named Triton, visited by Voyager 2 in 1989!',
    playfulAnalogy:
      'The windy blue lighthouse at the outer border of the major planets—where sunlight is 900 times dimmer than on Earth!',
    funFact:
      'Voyager 2’s 1989 flyby of Neptune completed humanity’s historic "Grand Tour" of the outer Solar System!',
  },
  earth: {
    term: 'Earth ("The Pale Blue Dot")',
    pronunciation: 'URTH',
    emoji: '🌍',
    category: 'Planet Science',
    kidDefinition:
      'Our home planet at 1.0 AU from the Sun—where NASA built and launched all 13 Space Legacy pioneers and where giant Deep Space Network antennas listen to their calls!',
    playfulAnalogy:
      'When Voyager 1 looked back from 3.7 billion miles away in 1990, all of Earth looked like a tiny "Pale Blue Dot" floating in a sunbeam!',
    funFact:
      'Earth is the only world in the Solar System known to have liquid water oceans right on its surface today!',
  },
  sun: {
    term: 'The Sun (Sol)',
    pronunciation: 'SUN',
    emoji: '☀️',
    category: 'Deep Space',
    kidDefinition:
      'The blazing star at the center of our Solar System whose gravity holds all the planets in orbit, whose light powers solar panels, and whose solar wind inflates the heliosphere!',
    playfulAnalogy:
      'Our Solar System’s giant campfire and powerhouse—so huge that 1.3 million Earths could fit inside it!',
    funFact:
      'Out at Pluto and the Kuiper Belt (40+ AU), the Sun looks like an extra-bright star rather than a warm disk, which is why deep-space probes use nuclear RTG batteries!',
  },
  water: {
    term: 'Liquid Water & Water Ice (H₂O)',
    pronunciation: 'WAW-ter',
    emoji: '💧',
    category: 'Planet Science',
    kidDefinition:
      'The essential molecule for life as we know it! NASA’s Mars rovers proved ancient Mars had liquid water lakes and rivers, while Phoenix and LRO found tons of frozen water ice!',
    playfulAnalogy:
      'NASA’s #1 treasure hunt clue in space is "Follow the Water"—because everywhere we find water on Earth, we find living microbes!',
    funFact:
      'Saturn’s moon Enceladus and Jupiter’s moon Europa both hide liquid water oceans beneath their icy crusts!',
  },
  ice: {
    term: 'Planetary Water & Nitrogen Ice',
    pronunciation: 'YS',
    emoji: '🧊',
    category: 'Planet Science',
    kidDefinition:
      'Frozen water (H₂O) or frozen gases (like carbon dioxide and nitrogen) found in Moon polar craters, beneath Martian soil, in Saturn’s rings, and across Pluto!',
    playfulAnalogy:
      'Future astronauts on the Moon and Mars will mine underground water ice both to drink and to split into hydrogen and oxygen rocket fuel!',
    funFact:
      'On Pluto, it is so cold (-230°C) that frozen water ice is as hard as granite bedrock, and frozen nitrogen flows like glaciers!',
  },
  oxygen: {
    term: 'Breathable Oxygen (O₂)',
    pronunciation: 'AHK-sih-jun',
    emoji: '🫧',
    category: 'Planet Science',
    kidDefinition:
      'The life-giving gas humans breathe and rockets use to burn fuel! On Mars, where the air is 95% carbon dioxide, Perseverance’s MOXIE instrument proved we can make fresh oxygen on site!',
    playfulAnalogy:
      'Making oxygen from Martian air with MOXIE means future astronauts won’t have to pack all their heavy oxygen tanks from Earth—they can brew it right on Mars!',
    funFact:
      'MOXIE produced 122 grams of 98%-pure oxygen on Mars across 16 test runs!',
  },
  dust: {
    term: 'Cosmic & Martian Dust',
    pronunciation: 'DUST',
    emoji: '🌪️',
    category: 'Planet Science',
    kidDefinition:
      'Ultra-fine iron-oxide powder floating in Mars’s sky, sharp regolith powder on the Moon, and microscopic star-dust grains zooming through the Kuiper Belt.',
    playfulAnalogy:
      'Martian dust is as fine as talcum powder—it turns the Martian sky butterscotch-pink and slowly settles on solar panels like flour in a bakery!',
    funFact:
      'New Horizons carries a Student Dust Counter that counts microscopic space dust grains hitting the probe past 60 AU!',
  },
  orbit: {
    term: 'Planetary Orbit',
    pronunciation: 'OR-bit',
    emoji: '🔄',
    category: 'Planet Science',
    kidDefinition:
      'The curved path a planet, moon, or satellite follows as it circles around a larger world—balanced between forward speed and the pull of gravity!',
    playfulAnalogy:
      'Imagine swinging a yo-yo in a circle on a string: the string is gravity pulling inward, and the yo-yo’s speed keeps it looping smoothly around!',
    funFact:
      'LRO completes one full polar orbit around the Moon every 113 minutes!',
  },
  camera: {
    term: 'Scientific Space Camera',
    pronunciation: 'KAM-ruh',
    emoji: '📷',
    category: 'Hardware Tech',
    kidDefinition:
      'Radiation-hardened digital eyes built onto orbiters, landers, and rovers (like Pancam, Mastcam, Navcam, SuperCam, LROC, and LORRI) to photograph alien worlds!',
    playfulAnalogy:
      'Unlike a normal phone camera, space cameras use special color filters and stereo lenses to measure rock minerals and build 3D maps in -150°C cold!',
    funFact:
      'Perseverance carries 23 cameras—more cameras than any interplanetary mission in history!',
  },
  wheels: {
    term: 'Rover Cleated Metal Wheels',
    pronunciation: 'WEELZ',
    emoji: '🛞',
    category: 'Hardware Tech',
    kidDefinition:
      'Specially engineered aluminum or piano-wire mesh wheels on Moon and Mars rovers that grip slippery sand and climb sharp volcanic rocks without ever getting a flat tire!',
    playfulAnalogy:
      'Air-filled rubber tires would pop or freeze brittle in space—so NASA makes rover wheels out of springy metal with built-in climbing cleats!',
    funFact:
      'Each of Perseverance’s six aluminum wheels has its own electric motor and titanium spokes curved like springs!',
  },
  arm: {
    term: 'Robotic Instrument Arm',
    pronunciation: 'ARM',
    emoji: '🦾',
    category: 'Hardware Tech',
    kidDefinition:
      'A multi-jointed mechanical arm with shoulder, elbow, and wrist motors that lets rovers and landers scoop soil, drill rock cores, or place seismometers on the ground!',
    playfulAnalogy:
      'A geologist’s arm and hand in space—holding a magnifying camera, rock drill, and chemical scanner right up against a Martian rock!',
    funFact:
      'Phoenix’s robotic arm stretched 7.7 feet (2.35 meters) long to dig trenches in the rock-hard Martian Arctic permafrost!',
  },
  badge: {
    term: 'Space Legacy Achievement Badge',
    pronunciation: 'BAJ',
    emoji: '🏅',
    category: 'Space Vocabulary',
    kidDefinition:
      'Special mission patches and interactive trophies you unlock by exploring Moon, Mars, and Deep Space hardware, inspecting 3D parts, acing quizzes, and using the Cosmic Dictionary!',
    playfulAnalogy:
      'Just like real NASA astronauts and engineers design an embroidered mission patch for every flight, you earn digital mission badges in your Explorer Dossier!',
    funFact:
      'Look up 4 technical jargon terms (like AU, SNAP-27 RTG, Laser Mirror, or Moon Buggies) to unlock the "Lexicon Master" badge!',
  },
  badges: {
    term: 'Space Legacy Achievement Badges',
    pronunciation: 'BAJ-ez',
    emoji: '🏅',
    category: 'Space Vocabulary',
    kidDefinition:
      'Collectible mission awards in Space Legacy—including Curious Spark, Lexicon Master, Lunar Pioneer, Red Planet Rover, Deep Space Voyager, Hardware Engineer, Signal Decoder, and Cosmic Genius!',
    playfulAnalogy:
      'Your personal NASA trophy case tracking every sector, 3D hardware lab, and quiz you conquer!',
    funFact:
      'Click the Badges tab in the top navigation bar anytime to see your progress toward all 8 dynamic achievement badges!',
  },
};

/**
 * Phrases highlighted inline in story & card text with dotted sky-blue underlines.
 * Ordered longest-first so multi-word technical terms match as a single clickable unit.
 */
export const HIGHLIGHT_PHRASES: string[] = [
  'Houston Capcom Lock',
  'HOUSTON CAPCOM LOCK',
  'Active (NASA DSN)',
  'DSN MADRID LOCK',
  'DSN CANBERRA LOCK',
  'Tranquility Base',
  'Meridiani Planum',
  'Pluto & Arrokoth',
  'Tombaugh Regio',
  'Sputnik Planitia',
  '3 Electric LRVs',
  '1.4+ Petabytes',
  '12,500+ Logged',
  '1,319 Detected',
  'Magnitude 4.7',
  '122g O₂ Made',
  '122g Pure O₂',
  '4 km Clouds',
  '5,111 Sols',
  '5,111 sols',
  'New Horizons',
  'SNAP-27 RTGs',
  'SNAP-27 RTG',
  'SNAP-19 RTG',
  'MHW-RTG',
  'GPHS-RTG',
  'MMRTG',
  'SNAP-27',
  'moon buggies',
  'Moon Buggies',
  'moon buggy',
  'Moon Buggy',
  'laser mirrors',
  'Laser Mirrors',
  'laser mirror',
  'Laser Mirror',
  'retroreflector',
  'Retroreflector',
  'golden plaque',
  'Golden Plaque',
  'Golden Records',
  'Golden Record',
  'golden record',
  'Kuiper Belt',
  'Sky Crane',
  'Jezero Crater',
  '162.4 AU',
  '162+ AU',
  '136+ AU',
  '136.8 AU',
  '60.4 AU',
  '1.524 AU',
  '0.0026 AU',
  '9.5 AU',
  '9.58 AU',
  '121.6 AU',
  '121 AU',
  '119 AU',
  '80 AU',
  '40.5 AU',
  '40 AU',
  'AU',
  'telemetry',
  'Telemetry',
  'permafrost',
  'Permafrost',
  'heliosphere',
  'Heliosphere',
  'heliopause',
  'Heliopause',
  'spectrometers',
  'spectrometer',
  'Spectrometer',
  'regolith',
  'Regolith',
  'seismometers',
  'seismometer',
  'Seismometer',
  'moonquakes',
  'Moonquakes',
  'marsquakes',
  'Marsquakes',
  'hematite',
  'Hematite',
  'sublimating',
  'sublimated',
  'sublimate',
  'sublimation',
  'Sublimation',
  'perchlorates',
  'Perchlorates',
  'magnetometer',
  'Magnetometer',
  'Ingenuity',
  'Perseverance',
  'Curiosity',
  'Opportunity',
  'InSight',
  'Phoenix',
  'Cassini',
  'Huygens',
  'Voyager',
  'Pioneer',
  'Enceladus',
  'Arrokoth',
  'ALSEP',
  'MOXIE',
  'LIDAR',
  'LROC',
  'LORRI',
  'Pancam',
  'SuperCam',
  'Diviner',
  'Kapton',
  'aerogel',
  'Aerogel',
  'silica',
  'Silica',
  'methane',
  'Methane',
  'hydrazine',
  'Hydrazine',
  'kelvin',
  'Kelvin',
  'RTGs',
  'RTG',
  'sols',
  'Sols',
  'sol',
  'Sol',
];

/**
 * Checks whether a word or phrase has a direct entry in the Cosmic Dictionary
 * (either COSMIC_GLOSSARY_TERMS, EXTENDED_SITE_DICTIONARY, or a telemetry measurement).
 */
export function isKnownCosmicTerm(rawWord: string): boolean {
  const cleaned = rawWord
    .trim()
    .replace(/^[^a-zA-Z0-9°+-]+|[^a-zA-Z0-9°+₂-]+$/g, '');
  const lower = cleaned.toLowerCase();
  if (!lower || lower.length < 2) return false;

  const singular = lower.replace(/ies$/, 'y').replace(/s$/, '');
  const edKey = lower.replace(/ed$/, '');
  const ingKey = lower.replace(/ing$/, '');

  if (
    EXTENDED_SITE_DICTIONARY[lower] ||
    EXTENDED_SITE_DICTIONARY[singular] ||
    EXTENDED_SITE_DICTIONARY[edKey] ||
    EXTENDED_SITE_DICTIONARY[ingKey]
  ) {
    return true;
  }

  return COSMIC_GLOSSARY_TERMS.some(
    (entry) =>
      entry.term.toLowerCase() === lower ||
      entry.aliases.some((a) => a.toLowerCase() === lower) ||
      (lower.length >= 4 &&
        entry.aliases.some(
          (a) => a.toLowerCase().includes(lower) || a.toLowerCase().includes(singular)
        ))
  );
}

/**
 * Looks up any word, phrase, or telemetry string clicked or searched by the user
 * and returns an accurate, engaging, kid-friendly GlossaryEntry.
 */
export function lookupAnyCosmicWord(rawWord: string): GlossaryEntry {
  const cleaned = rawWord
    .trim()
    .replace(/^[^a-zA-Z0-9°+-]+|[^a-zA-Z0-9°+₂-]+$/g, '');
  const lower = cleaned.toLowerCase();

  if (!lower) {
    return COSMIC_GLOSSARY_TERMS[0];
  }

  // 1. Exact or alias match in primary COSMIC_GLOSSARY_TERMS
  const exactPrimary = COSMIC_GLOSSARY_TERMS.find(
    (entry) =>
      entry.term.toLowerCase() === lower ||
      entry.aliases.some((a) => a.toLowerCase() === lower)
  );
  if (exactPrimary) return exactPrimary;

  // 2. Match in EXTENDED_SITE_DICTIONARY (exact, singular, or stem)
  const singularKey = lower.replace(/ies$/, 'y').replace(/s$/, '');
  const edKey = lower.replace(/ed$/, '');
  const ingKey = lower.replace(/ing$/, '');
  const directDict =
    EXTENDED_SITE_DICTIONARY[lower] ||
    EXTENDED_SITE_DICTIONARY[singularKey] ||
    EXTENDED_SITE_DICTIONARY[edKey] ||
    EXTENDED_SITE_DICTIONARY[ingKey];

  if (directDict) {
    return {
      term: directDict.term,
      aliases: [lower],
      pronunciation: directDict.pronunciation,
      emoji: directDict.emoji,
      category: directDict.category,
      kidDefinition: directDict.kidDefinition,
      playfulAnalogy: directDict.playfulAnalogy,
      funFact: directDict.funFact,
      isTechnicalJargon: Boolean(directDict.isTechnical),
    };
  }

  // 3. Partial alias or term match in primary COSMIC_GLOSSARY_TERMS (for >=3 char tokens like "buggy", "capcom", "plaque", "mirror", "rtg")
  if (lower.length >= 3) {
    const partialPrimary = COSMIC_GLOSSARY_TERMS.find(
      (entry) =>
        entry.term.toLowerCase().includes(lower) ||
        entry.term.toLowerCase().includes(singularKey) ||
        entry.aliases.some(
          (a) =>
            a.toLowerCase().includes(lower) ||
            a.toLowerCase().includes(singularKey) ||
            lower.includes(a.toLowerCase())
        )
    );
    if (partialPrimary) return partialPrimary;
  }

  // 4. Substring search across EXTENDED_SITE_DICTIONARY keys or terms
  if (lower.length >= 3) {
    for (const [key, item] of Object.entries(EXTENDED_SITE_DICTIONARY)) {
      if (
        key.includes(lower) ||
        lower.includes(key) ||
        item.term.toLowerCase().includes(lower)
      ) {
        return {
          term: item.term,
          aliases: [lower],
          pronunciation: item.pronunciation,
          emoji: item.emoji,
          category: item.category,
          kidDefinition: item.kidDefinition,
          playfulAnalogy: item.playfulAnalogy,
          funFact: item.funFact,
          isTechnicalJargon: Boolean(item.isTechnical),
        };
      }
    }
  }

  // 5. Smart Unit & Telemetry Number Parser (for telemetry card values like "45.16 km", "38,000 mph", "382 kg Returned", "68.22° N", "294 Tours", "60+ Satellites", "25+ Sealed")
  if (/\d/.test(cleaned)) {
    if (lower.includes('au')) {
      return COSMIC_GLOSSARY_TERMS[0]; // AU
    }
    if (lower.includes('sol')) {
      return COSMIC_GLOSSARY_TERMS[5]; // Sol
    }
    if (lower.includes('km') || lower.includes('cm') || lower.includes('m')) {
      return {
        term: `${cleaned} (Distance / Size Measurement)`,
        aliases: [lower],
        pronunciation: cleaned.toUpperCase(),
        emoji: '📐',
        category: 'Measurement',
        kidDefinition: `"${cleaned}" measures exact distance, depth, or altitude using the metric system—where 1 kilometer (km) is about 0.62 miles (10 football fields) and 5 centimeters (cm) is about the width of two thumbs!`,
        playfulAnalogy:
          'Scientists around the world use meters and kilometers so nobody ever mixes up inches and centimeters when landing a robot on Mars!',
        funFact:
          'Opportunity drove 45.16 km (28.06 miles) on Mars, and Phoenix dug 5 cm (2 inches) down to hit water ice!',
        isTechnicalJargon: false,
      };
    }
    if (lower.includes('mph')) {
      return {
        term: `${cleaned} (Probe Speed)`,
        aliases: [lower],
        pronunciation: cleaned.toUpperCase(),
        emoji: '⚡',
        category: 'Measurement',
        kidDefinition: `"${cleaned}" (miles per hour) measures how fast a deep-space probe is zooming through the Solar System! At 36,000 to 38,000 mph, a probe travels more than 10 miles every single second!`,
        playfulAnalogy:
          'That is 60 times faster than a passenger jet airplane—fast enough to fly from New York to Los Angeles in under 4 minutes!',
        funFact:
          'New Horizons launched at 36,373 mph and passed the Moon’s orbit in just 9 hours!',
        isTechnicalJargon: false,
      };
    }
    if (lower.includes('kg') || lower.includes('g')) {
      return {
        term: `${cleaned} (Mass / Weight Returned)`,
        aliases: [lower],
        pronunciation: cleaned.toUpperCase(),
        emoji: '⚖️',
        category: 'Measurement',
        kidDefinition: `"${cleaned}" measures mass in kilograms or grams! Apollo astronauts brought back 382 kilograms (842 pounds) of Moon rocks, and Perseverance’s MOXIE made 122 grams of pure oxygen on Mars!`,
        playfulAnalogy:
          '382 kilograms of Moon rocks weighs as much as a grand piano—carried all the way back from the Moon in six Apollo missions!',
        funFact:
          'Scientists still study those 382 kg of Apollo Moon rocks in special nitrogen-filled gloveboxes in Houston today!',
        isTechnicalJargon: false,
      };
    }
    if (lower.includes('°') || lower.includes('k')) {
      return {
        term: `${cleaned} (Planetary Coordinate / Temperature)`,
        aliases: [lower],
        pronunciation: cleaned.toUpperCase(),
        emoji: '🧭',
        category: 'Measurement',
        kidDefinition: `"${cleaned}" marks an exact latitude/longitude spot on a planet’s globe (like 68.22° N in the Martian Arctic) or an extreme space temperature in Celsius/Kelvin!`,
        playfulAnalogy:
          'Just like GPS coordinates on a treasure map tell you the exact X-marks-the-spot on Earth, planetary coordinates mark where every lander rests on the Moon and Mars!',
        funFact:
          'Phoenix landed at 68.22° North latitude on Mars—just as far north as northern Alaska is on Earth!',
        isTechnicalJargon: false,
      };
    }

    return {
      term: `${cleaned} (Mission Milestone)`,
      aliases: [lower],
      pronunciation: cleaned.toUpperCase(),
      emoji: '🏆',
      category: 'Measurement',
      kidDefinition: `"${cleaned}" is an official NASA mission count or date recorded in the Space Legacy archive—tracking how many orbits, rock holes, sample tubes, or years a pioneer achieved!`,
      playfulAnalogy:
        'Like the high-score scoreboard in a video game—recording every orbit Cassini flew (294!), every rock Curiosity drilled (40+!), and every tube Perseverance sealed!',
      funFact:
        'Click any highlighted blue space term like "AU", "SNAP-27 RTG", "Laser Mirror", or "Moon Buggies" to unlock the Lexicon Master badge!',
      isTechnicalJargon: false,
    };
  }

  // 6. Full-text search across all definitions in COSMIC_GLOSSARY_TERMS & EXTENDED_SITE_DICTIONARY
  if (lower.length >= 4) {
    const contentMatch = COSMIC_GLOSSARY_TERMS.find(
      (entry) =>
        entry.kidDefinition.toLowerCase().includes(lower) ||
        entry.playfulAnalogy.toLowerCase().includes(lower)
    );
    if (contentMatch) return contentMatch;

    for (const item of Object.values(EXTENDED_SITE_DICTIONARY)) {
      if (
        item.kidDefinition.toLowerCase().includes(lower) ||
        item.playfulAnalogy.toLowerCase().includes(lower)
      ) {
        return {
          term: item.term,
          aliases: [lower],
          pronunciation: item.pronunciation,
          emoji: item.emoji,
          category: item.category,
          kidDefinition: item.kidDefinition,
          playfulAnalogy: item.playfulAnalogy,
          funFact: item.funFact,
          isTechnicalJargon: Boolean(item.isTechnical),
        };
      }
    }
  }

  // 7. Dynamic Universal Word & Acronym Synthesizer (for any custom word, acronym, or scientific term while AI fetches or offline)
  const formattedTerm =
    cleaned === cleaned.toUpperCase() && cleaned.length <= 8
      ? cleaned.toUpperCase()
      : cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  const isAllCapsAcronym =
    cleaned === cleaned.toUpperCase() && /^[A-Z0-9-]+$/.test(cleaned);

  // Phonetic syllable generator for any custom word
  const phonetic = isAllCapsAcronym
    ? cleaned.split('').join('-')
    : cleaned
        .toUpperCase()
        .replace(/([AEIOUY]+)/g, '$1-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

  if (isAllCapsAcronym) {
    return {
      term: `${formattedTerm} (Space & Engineering Acronym)`,
      aliases: [lower],
      pronunciation: phonetic,
      emoji: '🛰️',
      category: 'Hardware Tech',
      kidDefinition: `"${formattedTerm}" is a specialized space or engineering code! NASA engineers use short letter-codes like ${formattedTerm} to name scientific instruments, mission systems, and telemetry signals without having to say a giant mouthful of words over the radio.`,
      playfulAnalogy: `Like using initials or a cool nickname for your best friend so you can call them super fast during a game—NASA uses acronyms like "${formattedTerm}" on control-room screens!`,
      funFact: `NASA has used thousands of acronyms since 1958—even the word "NASA" itself is an acronym for National Aeronautics and Space Administration!`,
      isTechnicalJargon: true,
    };
  }

  return {
    term: formattedTerm,
    aliases: [lower],
    pronunciation: phonetic || formattedTerm.toUpperCase(),
    emoji: '🔭',
    category: 'Space Vocabulary',
    kidDefinition: `"${formattedTerm}" is a key concept explored in space science and mission storytelling! When NASA scientists and engineers plan missions to the Moon, Mars, and deep space, understanding "${lower}" helps them describe how worlds form, how hardware operates, and how explorers navigate the cosmos.`,
    playfulAnalogy: `Imagine packing a backpack for the ultimate camping trip to another planet—every tool, action, and idea like "${lower}" is a puzzle piece that helps astronauts and robotic pioneers succeed!`,
    funFact: `Our AI-powered Universal Cosmic Dictionary can explain any word in the universe—press "Ask AI" to generate a custom deep-dive for "${formattedTerm}"!`,
    isTechnicalJargon: lower.length >= 6,
  };
}

