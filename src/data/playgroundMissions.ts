export interface PlaygroundComponentPart {
  id: string;
  name: string;
  emoji: string;
  roleTag: string;
  whatItIs: string;
  whatItDoes: string;
  kidAnalogy: string;
  explodeOffset: [number, number, number];
  labelOffset: [number, number, number];
}

export interface PlaygroundMissionSpec {
  id: string;
  orderNumber: number;
  name: string;
  shortName: string;
  destination: 'moon' | 'mars' | 'deep space';
  era: string;
  summary: string;
  cameraDistance: number;
  cameraHeight: number;
  parts: PlaygroundComponentPart[];
}

export const PLAYGROUND_MISSIONS: PlaygroundMissionSpec[] = [
  {
    id: 'apollo-landing-hardware',
    orderNumber: 1,
    name: 'Apollo Lunar Module (LM-5)',
    shortName: 'Apollo Lander',
    destination: 'moon',
    era: 'Moon · 1969–1972',
    summary:
      'The two-part golden spider spaceship that landed astronauts on the Moon—and blasted the top cabin back home!',
    cameraDistance: 5.4,
    cameraHeight: 1.5,
    parts: [
      {
        id: 'ascent-cabin',
        name: 'Ascent Crew Cabin',
        emoji: '👩‍🚀',
        roleTag: 'Astronaut Home & Mini Rocket',
        whatItIs:
          'The dark, angular upper cabin with two triangular windows where two astronauts stood and piloted the lander.',
        whatItDoes:
          'It kept the astronauts alive with breathable air and computers—and when it was time to leave the Moon, this top half fired its own rocket to launch back up to orbit!',
        kidAnalogy:
          'Imagine a treehouse that turns into a mini rocket and blasts off while leaving its porch behind!',
        explodeOffset: [0, 1.55, 0],
        labelOffset: [0, 0.72, 0],
      },
      {
        id: 'radar-dishes',
        name: 'Radar & Radio Dishes',
        emoji: '📡',
        roleTag: 'Space Phone & Eyes',
        whatItIs:
          'A round dish antenna and side tracking radar mounted on top of the crew cabin.',
        whatItDoes:
          'It beamed astronauts’ voices, live Moonwalk TV video, and safety data 240,000 miles back to Earth—and helped the lander find its mothership in orbit.',
        kidAnalogy:
          'Like a super-long-range walkie-talkie plus radar eyes looking straight up at the sky!',
        explodeOffset: [1.35, 2.0, 0.3],
        labelOffset: [0, 0.52, 0],
      },
      {
        id: 'descent-stage',
        name: 'Gold Descent Stage',
        emoji: '🟨',
        roleTag: 'Foil Launchpad & Tank Base',
        whatItIs:
          'The octagon-shaped lower base wrapped in crinkly shiny gold Kapton foil.',
        whatItDoes:
          'The gold blanket blocked blistering +120°C sunlight and freezing shadow cold, while holding fuel tanks, water, and Moon tools—and served as the launchpad left on the Moon forever.',
        kidAnalogy:
          'Like wrapping a treasure chest in a shiny golden thermos blanket so nothing melts or freezes!',
        explodeOffset: [-1.4, -0.15, 0.25],
        labelOffset: [0, 0.65, 0],
      },
      {
        id: 'descent-engine',
        name: 'Landing Engine Nozzle',
        emoji: '🔥',
        roleTag: 'Gentle Moon Brakes',
        whatItIs:
          'A wide dark metal rocket bell tucked underneath the middle of the golden base.',
        whatItDoes:
          'Because the Moon has no air for parachutes, this throttleable engine fired downward like a hover-brake so the astronauts could glide down softly onto the dust.',
        kidAnalogy:
          'Like a giant rocket hoverboard pushing against gravity so you land softer than a jump off a curb!',
        explodeOffset: [0, -1.65, 0],
        labelOffset: [0, -0.5, 0],
      },
      {
        id: 'landing-legs',
        name: 'Spider Legs & Ladder',
        emoji: '🪜',
        roleTag: 'Shock-Absorbing Feet',
        whatItIs:
          'Four splayed metal struts with big round saucer footpads and a 9-rung ladder on the front leg.',
        whatItDoes:
          'Honeycomb crush-tubes inside the legs absorbed the bump of landing, wide footpads kept it from sinking in Moon dust, and astronauts climbed the ladder for "one small step."',
        kidAnalogy:
          'Like wearing four bouncy snowshoes with a front porch ladder down to the lunar dust!',
        explodeOffset: [1.55, -0.8, 0.2],
        labelOffset: [0, -0.35, 0],
      },
    ],
  },
  {
    id: 'alsep-stations',
    orderNumber: 2,
    name: 'ALSEP Science Stations',
    shortName: 'ALSEP Station',
    destination: 'moon',
    era: 'Moon · 1969–1977',
    summary:
      'Mini lunar science labs connected by ribbon cables that listened for moonquakes and bounced laser beams for decades.',
    cameraDistance: 6.2,
    cameraHeight: 1.9,
    parts: [
      {
        id: 'central-station',
        name: 'Central Station & Antenna',
        emoji: '📻',
        roleTag: 'Data Brain & Transmitter',
        whatItIs:
          'A gold-wrapped control box in the middle topped by a tall spiral white corkscrew antenna.',
        whatItDoes:
          'It acted as the station’s brain—collecting readings from all the nearby Moon gadgets through flat white cables and beaming them back to Earth.',
        kidAnalogy:
          'Like the Wi-Fi router and main computer hub of a miniature Moon science village!',
        explodeOffset: [0, 1.35, 0],
        labelOffset: [0, 0.85, 0],
      },
      {
        id: 'snap27-rtg',
        name: 'SNAP-27 Nuclear Battery',
        emoji: '🔋',
        roleTag: '8-Year Power Generator',
        whatItIs:
          'A gray cylinder covered in cooling fins standing on a square metal plate on the left.',
        whatItDoes:
          'Warm glowing plutonium inside turned heat directly into electricity—keeping every instrument awake even through pitch-black, -170°C two-week-long Moon nights!',
        kidAnalogy:
          'Like a cozy hand-warmer battery that never ran out for eight straight years!',
        explodeOffset: [-1.85, 0.75, 0.2],
        labelOffset: [0, 0.7, 0],
      },
      {
        id: 'pse-seismometer',
        name: 'Moonquake Sensor (PSE)',
        emoji: '📈',
        roleTag: 'Ground Shaking Ear',
        whatItIs:
          'A square science box sitting beneath a tan/gold thermal sun-umbrella skirt.',
        whatItDoes:
          'It pressed right against the lunar soil and felt over 12,000 tiny moonquakes and meteor crashes, proving the Moon actually trembles inside!',
        kidAnalogy:
          'Like pressing a super-sensitive doctor’s stethoscope right onto the Moon’s floor!',
        explodeOffset: [-0.45, 0.85, -1.35],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'lrrr-mirror',
        name: 'Laser Mirror (LRRR)',
        emoji: '🪞',
        roleTag: 'Still Working Today!',
        whatItIs:
          'A shiny tilted square panel filled with 100 special glass corner-cube prisms on a tripod.',
        whatItDoes:
          'Astronomers on Earth still fire bright green lasers at this mirror today—and the light bounces straight back to measure the Moon’s distance down to a millimeter!',
        kidAnalogy:
          'Like a super-precise bicycle reflector in space that bounces Earth lasers straight back to where they came from!',
        explodeOffset: [1.85, 0.85, -0.35],
        labelOffset: [0, 0.65, 0],
      },
      {
        id: 'lsm-leam-sensors',
        name: 'Wind & Dust Sniffers',
        emoji: '🌪️',
        roleTag: 'Magnet & Space Dust Tools',
        whatItIs:
          'A 3-legged magnetometer tripod (LSM) paired with a 3-lens space-dust detector box (LEAM).',
        whatItDoes:
          'One measured invisible magnetic fields swept past the Moon by the Sun, while the other counted tiny grains of speedy micrometeorite dust hitting the surface.',
        kidAnalogy:
          'Like a tiny weather vane and bug-catcher net for invisible solar wind and space dust!',
        explodeOffset: [1.15, -0.85, 1.05],
        labelOffset: [0, 0.55, 0],
      },
    ],
  },
  {
    id: 'pioneer-10-11',
    orderNumber: 3,
    name: 'Pioneer 10 & 11',
    shortName: 'Pioneer 10 & 11',
    destination: 'deep space',
    era: 'Deep Space · 1972–2003',
    summary:
      'The fearless trailblazer scouts that crossed the Asteroid Belt, photographed Jupiter & Saturn, and carry Earth’s golden postcard.',
    cameraDistance: 6.2,
    cameraHeight: 1.4,
    parts: [
      {
        id: 'pioneer-dish',
        name: '2.7m High-Gain Dish',
        emoji: '📡',
        roleTag: 'Long-Distance Voice',
        whatItIs:
          'A large white bowl-shaped antenna on top with three thin metal struts holding a receiver tip.',
        whatItDoes:
          'Because Pioneer spun like a top to stay steady, this huge white dish always stayed pointed straight back at Earth to whisper faint radio data from billions of miles out.',
        kidAnalogy:
          'Like a giant megaphone aimed carefully across the whole solar system back toward home!',
        explodeOffset: [0, 1.55, 0],
        labelOffset: [0, 0.65, 0],
      },
      {
        id: 'pioneer-bus',
        name: 'Gold Hexagon Bus',
        emoji: '🛸',
        roleTag: 'Armored Brain Box',
        whatItIs:
          'A six-sided golden foil container tucked right underneath the white radio dish.',
        whatItDoes:
          'Inside sat the flight computer and radio transmitters—shielded by shiny gold foil against fierce radiation belts around giant planet Jupiter.',
        kidAnalogy:
          'Like a tough golden backpack holding the spaceship’s computer brain safe inside a cosmic storm!',
        explodeOffset: [0, -0.35, 0.35],
        labelOffset: [0, 0.5, 0],
      },
      {
        id: 'pioneer-plaque',
        name: 'Golden Greeting Plaque',
        emoji: '🪙',
        roleTag: 'Postcard for Aliens',
        whatItIs:
          'A shiny rectangular gold-anodized aluminum plate bolted onto the antenna support struts.',
        whatItDoes:
          'It carries etched drawings of two humans, our solar system map, and pulsar star directions—showing any future star-travelers who sent Pioneer and where Earth lives!',
        kidAnalogy:
          'Like dropping a message-in-a-bottle into the ocean of stars with Earth’s return address drawn on gold!',
        explodeOffset: [1.35, 0.25, 1.25],
        labelOffset: [0, 0.45, 0],
      },
      {
        id: 'pioneer-rtgs',
        name: 'Twin Nuclear Power Booms',
        emoji: '⚡',
        roleTag: 'Deep-Space Batteries',
        whatItIs:
          'Two finned dark power drums stretched out on long metal truss arms away from the body.',
        whatItDoes:
          'Sunlight gets 25 times dimmer at Jupiter, so solar panels couldn’t work—these plutonium drums powered Pioneer for over 30 years!',
        kidAnalogy:
          'Like carrying two long glowing campfires on poles so the spacecraft never runs out of electricity in the dark!',
        explodeOffset: [-1.75, -0.35, 0.35],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'pioneer-mag',
        name: 'Magnetometer & Science Boom',
        emoji: '🧭',
        roleTag: 'Magnetic Force Sniffer',
        whatItIs:
          'A long slender pole sticking far out the opposite side with a magnetic sensor tip.',
        whatItDoes:
          'By holding the magnetic compass far away from Pioneer’s own wires, it cleanly measured Jupiter’s giant invisible magnetic bubble and Saturn’s brand-new F-ring.',
        kidAnalogy:
          'Like holding a compass on the end of a long fishing rod so your metal belt buckle doesn’t trick the needle!',
        explodeOffset: [1.85, -0.55, -0.3],
        labelOffset: [0, 0.45, 0],
      },
    ],
  },
  {
    id: 'voyager-1',
    orderNumber: 4,
    name: 'Voyager 1 & 2',
    shortName: 'Voyager 1 & 2',
    destination: 'deep space',
    era: 'Interstellar · 1977–Today',
    summary:
      'Humanity’s farthest explorers—now flying outside the Sun’s bubble in interstellar space with the Golden Record aboard!',
    cameraDistance: 6.8,
    cameraHeight: 1.5,
    parts: [
      {
        id: 'voyager-dish',
        name: '3.7m High-Gain Dish',
        emoji: '📡',
        roleTag: 'Interstellar Radio Ear',
        whatItIs:
          'The huge crisp white saucer dish perched on top (plus its auxiliary calibration dish on the side).',
        whatItDoes:
          'Voyager is now over 15 billion miles away! Even at light speed, radio signals whispered from this dish take more than 22 hours just to reach Earth.',
        kidAnalogy:
          'Like a gigantic satellite ear listening and whispering back across billions of miles of empty space!',
        explodeOffset: [0, 1.65, 0],
        labelOffset: [0, 0.65, 0],
      },
      {
        id: 'golden-record',
        name: 'The Golden Record',
        emoji: '💿',
        roleTag: 'Earth’s Cosmic Mixtape',
        whatItIs:
          'A gleaming round gold disc mounted prominently on the side of Voyager’s ten-sided body.',
        whatItDoes:
          'Inside the gold cover is a copper phonograph record packed with whale songs, rain, Beethoven, Chuck Berry, 115 Earth photos, and greetings in 55 languages!',
        kidAnalogy:
          'Imagine packing Earth’s favorite songs, animal sounds, and family photos onto a shiny gold CD for deep space!',
        explodeOffset: [0.35, 0.25, 1.55],
        labelOffset: [0, 0.48, 0],
      },
      {
        id: 'voyager-bus',
        name: '10-Sided Computer Core',
        emoji: '🧠',
        roleTag: 'Voyager’s Spaceship Brain',
        whatItIs:
          'A gold-and-dark ten-sided hollow ring housing Voyager’s flight computers and gyroscopes.',
        whatItDoes:
          'Even though its 1970s computers have less memory than a car key fob, NASA engineers still beam software patches 15 billion miles to keep it working today!',
        kidAnalogy:
          'Like a tiny, ultra-reliable vintage pocket calculator steering a spaceship between the stars!',
        explodeOffset: [0, -0.35, -0.45],
        labelOffset: [0, 0.5, 0],
      },
      {
        id: 'voyager-rtg',
        name: 'Triple Nuclear Pack (RTGs)',
        emoji: '☢️',
        roleTag: '47+ Year Power Source',
        whatItIs:
          'Three ribbed cylindrical plutonium power canisters stacked on a sturdy side truss boom.',
        whatItDoes:
          'Out where Voyager flies, the Sun looks no brighter than a distant dot—so these three warm nuclear canisters have kept Voyager alive for almost 50 years!',
        kidAnalogy:
          'Like three super-powered rechargeable battery bricks that slowly glow with warmth for half a century!',
        explodeOffset: [-1.8, -0.45, 0.4],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'voyager-scan-boom',
        name: 'Camera Platform & Mag Boom',
        emoji: '📷',
        roleTag: 'Grand Tour Cameras & Sensors',
        whatItIs:
          'The long lattice boom carrying magnetic sensors plus the swiveling camera arm on the opposite truss.',
        whatItDoes:
          'Those cameras snapped the first volcano eruption ever seen off Earth (on Jupiter’s moon Io), Saturn’s braided rings, Uranus, Neptune, and the famous "Pale Blue Dot" photo!',
        kidAnalogy:
          'Like a super-steady selfie stick and swivel neck that took baby pictures of all four giant outer planets!',
        explodeOffset: [1.95, -0.4, -0.25],
        labelOffset: [0, 0.5, 0],
      },
    ],
  },
  {
    id: 'cassini-orbiter',
    orderNumber: 5,
    name: 'Cassini-Huygens',
    shortName: 'Cassini-Huygens',
    destination: 'deep space',
    era: 'Saturn · 1997–2017',
    summary:
      'The towering Saturn explorer that dropped a probe onto hazy moon Titan and discovered hidden oceans under Enceladus.',
    cameraDistance: 6.1,
    cameraHeight: 1.5,
    parts: [
      {
        id: 'cassini-dish',
        name: 'Gold High-Gain Dish',
        emoji: '📡',
        roleTag: 'Umbrella Sunshade & Radio',
        whatItIs:
          'A wide, shallow gold-mesh dish crowning the very top of the spacecraft.',
        whatItDoes:
          'Not only did it beam 453,048 dazzling photos of Saturn’s rings to Earth, it also tilted toward the Sun like a big beach umbrella to keep Cassini cool!',
        kidAnalogy:
          'Like a golden patio umbrella that doubles as a giant space Wi-Fi antenna!',
        explodeOffset: [0, 1.75, 0],
        labelOffset: [0, 0.6, 0],
      },
      {
        id: 'huygens-probe',
        name: 'Huygens Titan Probe',
        emoji: '🛸',
        roleTag: 'Piggyback Moon Lander',
        whatItIs:
          'A golden saucer-shaped capsule attached cleanly to the front side of Cassini’s body.',
        whatItDoes:
          'Built in Europe, Huygens detached from Cassini, popped open parachutes, and landed on Saturn’s misty orange moon Titan—showing rivers of liquid methane!',
        kidAnalogy:
          'Like carrying a tiny mini-submarine on a ship’s side and dropping it onto a mysterious foggy island!',
        explodeOffset: [1.55, 0.55, 1.0],
        labelOffset: [0, 0.5, 0],
      },
      {
        id: 'cassini-core',
        name: 'Gold & Silver Instrument Core',
        emoji: '🔭',
        roleTag: '12-Instrument Science Tower',
        whatItIs:
          'The tall stacked gold-foil and metallic drum body stuffed with cameras, radar, and power.',
        whatItDoes:
          'It carried 12 science instruments that mapped Saturn’s icy rings, flew through water geysers spraying off Enceladus, and plunged into Saturn in a heroic Grand Finale!',
        kidAnalogy:
          'Like a 22-foot flying science skyscraper filled with zoom cameras, chemical sniffers, and thermometers!',
        explodeOffset: [0, 0, -0.35],
        labelOffset: [-0.85, 0.35, 0],
      },
      {
        id: 'cassini-engines',
        name: 'Twin Main Rocket Engines',
        emoji: '🚀',
        roleTag: 'Orbit Brakes & Steering',
        whatItIs:
          'Two large metallic rocket bells (plus attitude thrusters) clustered beneath the lower skirt.',
        whatItDoes:
          'These powerful engines braked Cassini into Saturn’s orbit in 2004 and carefully steered its daring 22 dives right between Saturn and its icy rings!',
        kidAnalogy:
          'Like twin jet thrusters that hit the cosmic brakes at just the right second to park around Saturn!',
        explodeOffset: [0, -1.75, 0],
        labelOffset: [0, -0.45, 0],
      },
      {
        id: 'cassini-boom',
        name: '36-Foot Magnetometer Boom',
        emoji: '🪄',
        roleTag: 'Magnetic Aurora Detector',
        whatItIs:
          'A long thin lattice pole sticking diagonally downward and outward from Cassini’s side.',
        whatItDoes:
          'It held delicate magnetic sensors way outside the spacecraft so scientists could map Saturn’s invisible force fields and glowing polar auroras.',
        kidAnalogy:
          'Like sticking a metal-detector wand far out the window so the car engine doesn’t set it off!',
        explodeOffset: [-1.85, -0.55, 0.35],
        labelOffset: [0, 0.45, 0],
      },
    ],
  },
  {
    id: 'spirit-rover',
    orderNumber: 6,
    name: 'Spirit Rover (MER-A)',
    shortName: 'Spirit Rover',
    destination: 'mars',
    era: 'Mars · 2004–2010',
    summary:
      'The tough Martian mountain climber that scaled Husband Hill and discovered proof Mars once had hot springs!',
    cameraDistance: 5.4,
    cameraHeight: 1.5,
    parts: [
      {
        id: 'spirit-mast',
        name: 'Pancam Camera Head',
        emoji: '👀',
        roleTag: '3D Panoramic Rover Eyes',
        whatItIs:
          'A tall white robotic neck holding a wide binocular camera bar with stereo glass eyes.',
        whatItDoes:
          'Spirit’s cameras snapped 3D color postcards of Gusev Crater and helped drivers spot safe slopes—while shooting an infrared eye to check rock temperatures!',
        kidAnalogy:
          'Like a tall giraffe neck with 3D superhero goggles scanning Mars for clues of ancient water!',
        explodeOffset: [0, 1.55, 0.25],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'spirit-solar',
        name: 'Solar Butterfly Wings',
        emoji: '☀️',
        roleTag: 'Sun-Powered Recharger',
        whatItIs:
          'Flat dark-blue solar panels spread across the top deck like wide open wings.',
        whatItDoes:
          'Sunlight charged Spirit’s batteries every day—and lucky Martian wind devils actually blew dust off the wings so Spirit worked 24× longer than planned!',
        kidAnalogy:
          'Like spread-out solar butterfly wings that drink in sunshine every morning for breakfast!',
        explodeOffset: [1.5, 0.75, -0.3],
        labelOffset: [0, 0.5, 0],
      },
      {
        id: 'spirit-body',
        name: 'Warm Gold Electronics Box',
        emoji: '🧰',
        roleTag: 'Insulated Rover Belly',
        whatItIs:
          'The central white-and-gold Kapton foil box bearing the Spirit nameplate and NASA logo.',
        whatItDoes:
          'Aerogel blankets and warm heaters inside this sealed chest protected Spirit’s computer brain and batteries from freezing -100°C Martian nights.',
        kidAnalogy:
          'Like a puffy winter down jacket keeping the rover’s computer heart cozy and warm all night!',
        explodeOffset: [-1.25, 0.25, 0.25],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'spirit-wheels',
        name: '6-Wheel Rocker-Bogie Legs',
        emoji: '🛞',
        roleTag: 'Rock-Climbing Suspension',
        whatItIs:
          'Six gray metal treaded wheels connected by pivoted silver spider struts.',
        whatItDoes:
          'Even when Spirit’s front-right wheel jammed, it drove backwards dragging that wheel like a plow—and accidentally uncovered bright white silica from ancient hot springs!',
        kidAnalogy:
          'Like six flexible skateboard-monster-truck legs that never tip over while climbing big boulders!',
        explodeOffset: [0, -1.45, 0],
        labelOffset: [0, -0.45, 0],
      },
      {
        id: 'spirit-arm-comms',
        name: 'Antennas & Science Arm',
        emoji: '🦾',
        roleTag: 'Earth Walkie-Talkies & Arm',
        whatItIs:
          'The low/high-gain antennas on the back deck plus Spirit’s compact front instrument arm.',
        whatItDoes:
          'Its antennas beamed stories home through Mars orbiters, while its front arm reached right up to touch rocks and grind tiny holes to see fresh minerals inside.',
        kidAnalogy:
          'Like having a walkie-talkie on your backpack plus a mini geologist hammer-hand in front!',
        explodeOffset: [-1.45, -0.35, 1.0],
        labelOffset: [0, 0.45, 0],
      },
    ],
  },
  {
    id: 'opportunity-rover',
    orderNumber: 7,
    name: 'Opportunity Rover (MER-B)',
    shortName: 'Opportunity Rover',
    destination: 'mars',
    era: 'Mars · 2004–2018',
    summary:
      'The marathon champion rover that rolled into a lucky hole-in-one crater and drove 28 miles over nearly 15 years!',
    cameraDistance: 5.5,
    cameraHeight: 1.5,
    parts: [
      {
        id: 'oppy-mast',
        name: 'Dusty Pancam Mast',
        emoji: '📸',
        roleTag: 'Geologist’s Eyes',
        whatItIs:
          'The tall mast rising up from the dusty orange solar deck with twin stereo cameras.',
        whatItDoes:
          'Opportunity used these eyes to discover tiny round mineral pebbles nicknamed "Martian blueberries"—proving salty water once rippled across the plains!',
        kidAnalogy:
          'Like binoculars on a selfie pole that spotted tiny clues proving Mars used to have puddles!',
        explodeOffset: [0, 1.55, 0.15],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'oppy-solar',
        name: 'Dust-Peppered Solar Wings',
        emoji: '🔋',
        roleTag: '15-Year Sun Catcher',
        whatItIs:
          'Wide orange-dusted dark solar panels shaped like angled wings over Oppy’s back.',
        whatItDoes:
          'They powered Oppy for an unbelievable 5,111 Martian days until a planet-wide dark dust storm blocked 99.99% of sunlight in 2018.',
        kidAnalogy:
          'Like giant dusty solar superhero capes that only stopped when the whole planet’s sky went pitch dark!',
        explodeOffset: [1.55, 0.65, -0.35],
        labelOffset: [0, 0.5, 0],
      },
      {
        id: 'oppy-arm',
        name: 'RAT Grinder & Robot Arm',
        emoji: '🦾',
        roleTag: 'Rock Brushing & Microscope',
        whatItIs:
          'A long white folding robotic arm reaching forward with a blocky multi-tool turret wrist.',
        whatItDoes:
          'Like a human arm with shoulder, elbow, and wrist, it used a wire brush and diamond rock abrasion tool (RAT) to clean dust off rocks and inspect them up close!',
        kidAnalogy:
          'Like a miniature geologist’s arm holding a toothbrush, magnifying glass, and tiny rock drill!',
        explodeOffset: [-1.75, 0.15, 1.15],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'oppy-body',
        name: 'Gold Foil Warm Chassis',
        emoji: '🟧',
        roleTag: 'Rover Brain & Heater Core',
        whatItIs:
          'The copper-gold foil-wrapped rectangular box tucked beneath the solar wings.',
        whatItDoes:
          'It shielded Oppy’s flight computer and twin lithium batteries inside an insulated thermos box through nearly 8 frigid Martian winters!',
        kidAnalogy:
          'Like a tough golden lunchbox protecting the rover’s brain and batteries from freezing red dust!',
        explodeOffset: [-1.1, 0.35, -0.6],
        labelOffset: [0, 0.5, 0],
      },
      {
        id: 'oppy-wheels',
        name: '6 Marathon Climbing Wheels',
        emoji: '🏁',
        roleTag: '28-Mile Dune Runners',
        whatItIs:
          'Six dusty metallic wheels with deep zig-zag chevron treads on springy suspension arms.',
        whatItDoes:
          'Designed to drive only half a mile, these 6 wheels instead drove 28.06 miles (45.16 km)—a full marathon distance—exploring giant Martian craters!',
        kidAnalogy:
          'Like ultra-tough off-road sneakers that walked all the way through a 28-mile Martian marathon!',
        explodeOffset: [0.35, -1.45, 0.25],
        labelOffset: [0, -0.45, 0],
      },
    ],
  },
  {
    id: 'new-horizons',
    orderNumber: 8,
    name: 'New Horizons',
    shortName: 'New Horizons',
    destination: 'deep space',
    era: 'Pluto & Kuiper Belt · 2006–Today',
    summary:
      'The fastest probe ever launched from Earth—racing past Pluto to snap its giant icy heart and continuing deep into the Kuiper Belt.',
    cameraDistance: 5.5,
    cameraHeight: 1.5,
    parts: [
      {
        id: 'nh-dish',
        name: 'Giant 2.1m White Dish',
        emoji: '📡',
        roleTag: '3-Billion-Mile Transmitter',
        whatItIs:
          'A wide crisp white bowl antenna mounted right across the top of the gold spacecraft.',
        whatItDoes:
          'From 3 billion miles out at Pluto, data trickles slowly—so this huge dish spent 16 straight months beaming all of Pluto’s stunning close-up photos back home!',
        kidAnalogy:
          'Like a giant megaphone sending crystal-clear postcards across three billion miles of dark space!',
        explodeOffset: [0, 1.55, 0],
        labelOffset: [0, 0.65, 0],
      },
      {
        id: 'nh-body',
        name: 'Gold Grand-Piano Body',
        emoji: '🎹',
        roleTag: 'Lightweight Foil Hull',
        whatItIs:
          'A triangular gold-blanketed wedge shaped remarkably like a miniature grand piano.',
        whatItDoes:
          'Built lightweight like a racing bike (weighing less than a piano!), its triangle frame let New Horizons blast away from Earth at 36,000 mph!',
        kidAnalogy:
          'Like a super-lightweight golden race-car shell built to break solar system speed records!',
        explodeOffset: [0.25, -0.2, 0.2],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'nh-lorri',
        name: 'LORRI Space Telescope',
        emoji: '🔭',
        roleTag: 'Pluto Eagle-Eye Camera',
        whatItIs:
          'A chunky black cylindrical telescope camera sticking forward out of the golden hull.',
        whatItDoes:
          'Even in dim starlight 1,000 times fainter than Earth’s noon sun, LORRI snapped razor-sharp photos revealing Pluto’s giant frozen-nitrogen heart and ice mountains!',
        kidAnalogy:
          'Like a giant bird-watcher’s super-zoom camera snapping crisp pictures while zooming past at 30,000 mph!',
        explodeOffset: [1.55, -0.45, 0.9],
        labelOffset: [0, 0.45, 0],
      },
      {
        id: 'nh-rtg',
        name: 'Nuclear Power Tailpipe (RTG)',
        emoji: '🔋',
        roleTag: 'Icy-Dark Power Battery',
        whatItIs:
          'A ribbed black-and-silver cylindrical tube angled out the back-left side.',
        whatItDoes:
          'Because Pluto is so far from the Sun, solar panels would produce almost zero power—this plutonium generator keeps all 7 instruments awake into the 2040s!',
        kidAnalogy:
          'Like a warm nuclear power pack strapped to the back like a jet booster battery!',
        explodeOffset: [-1.85, -0.2, 0.25],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'nh-swap',
        name: 'SWAP Sky & Dust Sniffers',
        emoji: '💨',
        roleTag: 'Atmosphere & Solar Wind Tools',
        whatItIs:
          'Compact dark science sensor boxes (including SWAP) bolted along the sides and belly.',
        whatItDoes:
          'They tasted Pluto’s surprisingly hazy blue sky, measured solar wind whipping past, and counted frozen dust specks—including data on distant snowman-shaped Arrokoth!',
        kidAnalogy:
          'Like sticking an ice-cream scoop and wind-speed meter out a spaceship window to taste space air!',
        explodeOffset: [0.25, -1.45, 0.85],
        labelOffset: [0, -0.4, 0],
      },
    ],
  },
  {
    id: 'phoenix-lander',
    orderNumber: 9,
    name: 'Phoenix Mars Lander',
    shortName: 'Phoenix Lander',
    destination: 'mars',
    era: 'Mars North Pole · 2008',
    summary:
      'The polar robot rebuilt from spare parts that dug into Martian permafrost, uncovered real water ice, and spotted falling Martian snow!',
    cameraDistance: 5.8,
    cameraHeight: 1.6,
    parts: [
      {
        id: 'phoenix-solar',
        name: 'Twin Fan Solar Wings',
        emoji: '🪭',
        roleTag: 'Origami Polar Sun Panels',
        whatItIs:
          'Two circular 10-sided solar arrays that unfolded like giant origami paper fans on each side.',
        whatItDoes:
          'During Martian Arctic summer, the Sun never set—so these twin round wings soaked up nonstop sunshine to run Phoenix’s digging arm and ovens!',
        kidAnalogy:
          'Like two folding party fans snapping open into round solar umbrellas to catch midnight Arctic sun!',
        explodeOffset: [1.85, 0.75, 0],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'phoenix-arm',
        name: 'Digging Arm & Scoop (RA/ISAD)',
        emoji: '🥄',
        roleTag: 'Permafrost Ice Backhoe',
        whatItIs:
          'A long white articulated crane arm topped with a pointed metal digging scoop bucket.',
        whatItDoes:
          'Phoenix scraped away shallow red dust and struck hard bright-white chunks—which vanished into vapor 4 days later, proving for sure they were real water ice!',
        kidAnalogy:
          'Like a backyard excavator bucket digging under sand to find buried frozen ice cubes!',
        explodeOffset: [1.65, -0.15, 1.15],
        labelOffset: [0, 0.5, 0],
      },
      {
        id: 'phoenix-masts',
        name: 'Weather Pole & Eyes (MET/SSI)',
        emoji: '❄️',
        roleTag: 'Snow-Spotting Laser & Eyes',
        whatItIs:
          'The tall skinny weather tower (MET) plus the boxy stereo camera mast (SSI) rising off the deck.',
        whatItDoes:
          'While SSI took 3D pictures of ice trenches, a green laser beam shot upward into Martian clouds and spotted real water-ice snow crystals falling from the sky!',
        kidAnalogy:
          'Like a backyard weather station with a superhero green laser pointer checking the clouds for snow!',
        explodeOffset: [-0.25, 1.55, 0.25],
        labelOffset: [0, 0.65, 0],
      },
      {
        id: 'phoenix-deck',
        name: 'Gold Octagon Lab Deck',
        emoji: '🧪',
        roleTag: 'Soil-Baking Mini Kitchen',
        whatItIs:
          'The eight-sided gold Kapton-wrapped lander body marked with NASA and PHOENIX badges.',
        whatItDoes:
          'Inside sat tiny single-use ovens (TEGA) and wet chemistry beakers that baked Arctic dirt to check if ice once melted into life-friendly soil!',
        kidAnalogy:
          'Like an Easy-Bake science oven lab right on top of the Martian North Pole!',
        explodeOffset: [-1.45, 0.35, -0.25],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'phoenix-legs',
        name: 'Landing Legs & Thrusters',
        emoji: '🦿',
        roleTag: 'Soft Arctic Touchdown',
        whatItIs:
          'Four silver tripod struts ending in flat circular footpads beneath the body.',
        whatItDoes:
          'Instead of bouncy airbags, Phoenix used 12 rapid-puff thrusters and these springy metal legs to set down gently right onto fragile Arctic ice soil!',
        kidAnalogy:
          'Like four sturdy tiptoe ski-poles setting a robot gently onto frozen ground without cracking it!',
        explodeOffset: [0, -1.45, 0],
        labelOffset: [0, -0.4, 0],
      },
    ],
  },
  {
    id: 'lro-orbiter',
    orderNumber: 10,
    name: 'Lunar Reconnaissance Orbiter',
    shortName: 'LRO Orbiter',
    destination: 'moon',
    era: 'Moon Orbit · 2009–Today',
    summary:
      'NASA’s Moon-mapping detective flying low overhead—spotting Apollo astronauts’ footprints and frozen water inside dark polar craters!',
    cameraDistance: 5.8,
    cameraHeight: 1.5,
    parts: [
      {
        id: 'lro-hga',
        name: 'Gold High-Gain Dish',
        emoji: '📡',
        roleTag: 'High-Speed Moon Wi-Fi',
        whatItIs:
          'A shiny parabolic gold dish mounted on an angled arm on the left side.',
        whatItDoes:
          'LRO maps the Moon in jaw-dropping detail, so this fast radio dish beams home gigabytes of crisp Moon pictures every single day!',
        kidAnalogy:
          'Like a golden high-speed fiber antenna downloading giant photo albums from the Moon!',
        explodeOffset: [-1.85, 0.95, 0.35],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'lro-solar',
        name: 'Solar Array Wing',
        emoji: '☀️',
        roleTag: 'Swiveling Power Wing',
        whatItIs:
          'A long 3-panel deep-blue solar wing extending far out to the right on a rotating joint.',
        whatItDoes:
          'As LRO zooms around the Moon every 2 hours, this motor-driven wing swivels to stay aimed at the Sun and keep batteries topped up.',
        kidAnalogy:
          'Like a giant sunflower leaf turning toward the Sun as LRO races around the Moon!',
        explodeOffset: [2.05, 0.85, 0],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'lro-bus',
        name: 'Gold Spacecraft Trunk',
        emoji: '🟨',
        roleTag: 'Flight Computer & Fuel Tank',
        whatItIs:
          'The chunky gold Kapton-wrapped cube core studded with silver radiator panels and star trackers.',
        whatItDoes:
          'It houses fuel tanks, star-watching navigation cameras, and thermal blankets so LRO doesn’t overheat over sunny craters or freeze over dark ones.',
        kidAnalogy:
          'Like an insulated space suitcase keeping the steering computers and fuel tanks balanced in orbit!',
        explodeOffset: [0, 0.35, -0.35],
        labelOffset: [0, 0.65, 0],
      },
      {
        id: 'lro-lroc',
        name: 'LROC Super-Zoom Cameras',
        emoji: '🔍',
        roleTag: 'Footprint-Spotting Eyes',
        whatItIs:
          'Compact twin telescopic lenses tucked onto the bottom Moon-facing instrument bay.',
        whatItDoes:
          'Flying just 31 miles high, LROC’s cameras are so sharp they photographed the actual Apollo lunar buggies, flags, and astronauts’ dusty footprints!',
        kidAnalogy:
          'Like the sharpest magnifying glass in space—able to spot a backpack-sized lander from 30 miles up!',
        explodeOffset: [-0.9, -1.45, 0.85],
        labelOffset: [0, -0.4, 0],
      },
      {
        id: 'lro-lola-ice',
        name: 'LOLA Laser & Ice Hunters',
        emoji: '🟢',
        roleTag: '3D Crater & Water Scanner',
        whatItIs:
          'A multi-barrel optical cluster (LOLA, Diviner, LEND, CRaTER) pointed straight downward.',
        whatItDoes:
          'LOLA shoots 5 green laser dots 28 times every second to make 3D Moon maps, while LEND & Diviner hunt for hidden frozen water inside shadowy south-pole craters!',
        kidAnalogy:
          'Like a 5-beam laser 3D printer scanner paired with an icy-treasure detector!',
        explodeOffset: [1.05, -1.45, 0.55],
        labelOffset: [0, -0.4, 0],
      },
    ],
  },
  {
    id: 'curiosity-rover',
    orderNumber: 11,
    name: 'Curiosity Rover',
    shortName: 'Curiosity Rover',
    destination: 'mars',
    era: 'Mars Gale Crater · 2012–Today',
    summary:
      'The car-sized rolling chemistry lab climbing Mount Sharp—proving Gale Crater held freshwater lakes for millions of years!',
    cameraDistance: 6.2,
    cameraHeight: 1.65,
    parts: [
      {
        id: 'curiosity-head',
        name: 'ChemCam Laser Head',
        emoji: '🔴',
        roleTag: 'Rock-Zapping Eyes',
        whatItIs:
          'A tall white robotic neck topped with a boxy white head holding a big round laser cyclops eye.',
        whatItDoes:
          'Curiosity’s head zaps rocks up to 23 feet away with a tiny invisible laser spark—reading the flash’s rainbow colors to tell what minerals are inside!',
        kidAnalogy:
          'Like a robot scientist wearing X-ray laser glasses to taste rocks from across the room!',
        explodeOffset: [0, 1.65, 0.3],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'curiosity-arm',
        name: '7-Foot Drill Arm',
        emoji: '🔩',
        roleTag: 'Powder Drill & Brush',
        whatItIs:
          'A long white-and-black jointed robot arm holding a heavy rotary hammer-drill turret in front.',
        whatItDoes:
          'It reaches out to brush off red dust, zoom in with a hand-lens camera, and drill gray rock powder straight into Curiosity’s built-in chemistry ovens!',
        kidAnalogy:
          'Like a giant robotic Swiss-Army arm carrying a rock drill, toothbrush, and magnifying glass!',
        explodeOffset: [1.85, 0.35, 0.75],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'curiosity-rtg',
        name: 'JPL Nuclear Battery (MMRTG)',
        emoji: '☢️',
        roleTag: 'Nonstop Day/Night Power',
        whatItIs:
          'The finned silver-and-white generator tilted off the rear end with red JPL markings.',
        whatItDoes:
          'Because Curiosity is as heavy as a car, solar panels wouldn’t give enough energy—plutonium heat powers Curiosity day and night for well over 12+ years!',
        kidAnalogy:
          'Like having an un-killable nuclear campfire engine at the back that never needs sunlight!',
        explodeOffset: [-1.85, 0.75, -0.35],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'curiosity-chassis',
        name: 'Chemistry Lab Belly',
        emoji: '🔬',
        roleTag: 'SAM & CheMin Mini Labs',
        whatItIs:
          'The sturdy white SUV-sized central body wearing the blue NASA meatball insignia.',
        whatItDoes:
          'Inside its belly sit two full laboratories (SAM and CheMin) that bake rock dust and sniff gases—discovering organic carbon molecules and ancient lakebed mud!',
        kidAnalogy:
          'Like driving an entire school chemistry classroom around on six rugged Martian wheels!',
        explodeOffset: [-0.35, 0.35, -0.55],
        labelOffset: [0, 0.65, 0],
      },
      {
        id: 'curiosity-wheels',
        name: '6 Morse-Code Wheels',
        emoji: '🛞',
        roleTag: 'J-P-L Stamping Treads',
        whatItIs:
          'Six wide black-and-titanium aluminum wheels suspended on articulated bogie legs.',
        whatItDoes:
          'Engineers cut clever dot-and-dash holes into the wheel treads so every turn stamps "J-P-L" in Morse code into Martian sand to help measure distance!',
        kidAnalogy:
          'Like six giant monster-truck sneakers that stamp secret team initials into the red sand as they roll!',
        explodeOffset: [0, -1.45, 0.2],
        labelOffset: [0, -0.45, 0],
      },
    ],
  },
  {
    id: 'insight-lander',
    orderNumber: 12,
    name: 'InSight Lander',
    shortName: 'InSight Lander',
    destination: 'mars',
    era: 'Mars Elysium · 2018–2022',
    summary:
      'The stationary robotic doctor that pressed an ear to Mars’s chest—detecting over 1,300 real marsquakes!',
    cameraDistance: 6.2,
    cameraHeight: 1.75,
    parts: [
      {
        id: 'insight-solar',
        name: 'Twin Circular Solar Wings',
        emoji: '☀️',
        roleTag: '20-Foot Sun Umbrellas',
        whatItIs:
          'Two huge circular, 10-sided pleated solar fans extending wide to the left and right.',
        whatItDoes:
          'They soaked up sunlight for 4+ years—generating enough electricity for InSight to listen for deep marsquakes until thick dust finally tucked it into retirement.',
        kidAnalogy:
          'Like two giant round beach parasols turned upside down to catch every drop of Martian sunshine!',
        explodeOffset: [0, 1.55, -0.35],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'insight-seis',
        name: 'SEIS Dome Seismometer',
        emoji: '🩺',
        roleTag: 'Marsquake Heartbeat Ear',
        whatItIs:
          'A shiny silver-and-copper dome bell resting right on the Martian ground on a tether cable.',
        whatItDoes:
          'Super sensitive enough to feel vibrations smaller than a single hydrogen atom! Its shiny dome blocked Martian wind so it heard 1,300+ real marsquakes and meteor hits.',
        kidAnalogy:
          'Like putting a soundproof silver bowl over a super-microphone pressed flat against the planet’s floor!',
        explodeOffset: [1.65, -0.45, 1.2],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'insight-arm',
        name: 'Gentle Crane Arm',
        emoji: '🏗️',
        roleTag: 'Precision Instrument Placer',
        whatItIs:
          'A jointed white-and-gold mechanical crane arm reaching out from the right side of the deck.',
        whatItDoes:
          'Because InSight had no wheels, this 6-foot arm carefully lifted SEIS and the Mole off the lander’s back and placed them gently onto the dirt by itself!',
        kidAnalogy:
          'Like an arcade claw machine guided with surgical precision from 100 million miles away!',
        explodeOffset: [1.85, 0.75, 0.55],
        labelOffset: [0, 0.5, 0],
      },
      {
        id: 'insight-body',
        name: 'Copper Lander & Tripod Legs',
        emoji: '🛸',
        roleTag: 'Rock-Steady Base',
        whatItIs:
          'The central copper-gold octagonal body supported on three splayed silver tripod legs.',
        whatItDoes:
          'Its sturdy legs absorbed landing shock and kept the deck completely rock-steady—holding computers, cameras, and radio gear in quiet Elysium Planitia.',
        kidAnalogy:
          'Like a steady three-legged camera tripod planted firmly in the ground so nothing wobbles!',
        explodeOffset: [-1.45, -0.35, 0.25],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'insight-mole',
        name: 'HP³ Heat Probe & Dishes',
        emoji: '🌡️',
        roleTag: 'Planet Thermometer & Spin Check',
        whatItIs:
          'The ground heat-probe box ("The Mole") plus twin white radio dishes and weather tower on deck.',
        whatItDoes:
          'While The Mole tried burrowing to check Mars’s inner warmth, the twin radio dishes tracked tiny planet wobbles—revealing Mars has a liquid metal core!',
        kidAnalogy:
          'Like taking a planet’s temperature while checking how smoothly it spins like a bowling ball!',
        explodeOffset: [0.35, -1.45, -0.5],
        labelOffset: [0, -0.4, 0],
      },
    ],
  },
  {
    id: 'perseverance-rover',
    orderNumber: 13,
    name: 'Perseverance & Ingenuity',
    shortName: 'Perseverance & Ginny',
    destination: 'mars',
    era: 'Jezero Crater · 2021–Today',
    summary:
      'NASA’s newest robotic astrobiologist hunting for ancient microbes—teamed up with Ingenuity, the first helicopter to fly on another world!',
    cameraDistance: 6.4,
    cameraHeight: 1.65,
    parts: [
      {
        id: 'ingenuity-copter',
        name: 'Ingenuity Helicopter (Ginny)',
        emoji: '🚁',
        roleTag: 'First Alien-Planet Flyer!',
        whatItIs:
          'The tiny gold-foil box drone standing beside Percy with two wide black carbon rotor blades and 4 thin legs.',
        whatItDoes:
          'Built for just 5 test hops, this 4-pound chopper spun 2,500 RPM in Mars’s paper-thin air and made history with 72 epic flights scouting paths ahead of Percy!',
        kidAnalogy:
          'Like a miniature solar-powered dragonfly drone that became the Wright Brothers of Mars!',
        explodeOffset: [2.1, 0.9, 0.85],
        labelOffset: [0, 0.65, 0],
      },
      {
        id: 'percy-head',
        name: 'SuperCam Laser & Mic Head',
        emoji: '🎙️',
        roleTag: '23 Cameras + Mars Microphones',
        whatItIs:
          'Percy’s tall white mast carrying a white cyclops laser camera head and acoustic microphones.',
        whatItDoes:
          'It zaps rocks from 20 feet away, steers safely with AI eyes, AND recorded the very first real audio of Martian wind gusts and swirling dust devils!',
        kidAnalogy:
          'Like a smart robot head with a rock-zapping laser eye AND ears that let us finally hear Mars!',
        explodeOffset: [-0.2, 1.65, 0.3],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'percy-arm',
        name: 'Sample-Coring Turret Arm',
        emoji: '🧪',
        roleTag: 'Alien-Life Rock Collector',
        whatItIs:
          'The massive 7-foot white-and-titanium front arm ending in a heavy rotary coring drill turret.',
        whatItDoes:
          'Percy drills chalk-sized rock cores—including the famous "leopard-spot" mudstone—and seals them inside 43 super-clean titanium tubes for future astronauts to bring to Earth!',
        kidAnalogy:
          'Like a giant robotic ice-cream scooper sealing precious ancient Martian rock popsicles in shiny tubes!',
        explodeOffset: [-1.85, 0.25, 1.05],
        labelOffset: [0, 0.55, 0],
      },
      {
        id: 'percy-body-moxie',
        name: 'Chassis, MOXIE & Nuclear Tail',
        emoji: '🫁',
        roleTag: 'Oxygen Maker + MMRTG Heart',
        whatItIs:
          'The armored white hull stamped "USA" and NASA with its angled rear plutonium generator.',
        whatItDoes:
          'Alongside its long-life nuclear battery, inside sits MOXIE—a magic toaster-sized experiment that turned dusty carbon-dioxide Martian air into real breathable oxygen!',
        kidAnalogy:
          'Like a mechanical tree inside the rover’s belly making fresh oxygen for future human astronauts!',
        explodeOffset: [-1.35, 0.45, -0.6],
        labelOffset: [0, 0.6, 0],
      },
      {
        id: 'percy-wheels',
        name: '6 Thick Titanium Wheels',
        emoji: '🛞',
        roleTag: 'Dune-Gripping Cleats',
        whatItIs:
          'Six rugged curved-spoke aluminum wheels with stronger, deeper tread cleats on rocker-bogie legs.',
        whatItDoes:
          'Upgraded after Curiosity’s sharp-rock experience, these thicker wheels carry Percy cleanly up steep Jezero Crater river-delta cliffs without wearing down!',
        kidAnalogy:
          'Like custom-armored hiking boots designed to climb razor-sharp Martian river rocks for miles!',
        explodeOffset: [0.1, -1.45, 0.15],
        labelOffset: [0, -0.45, 0],
      },
    ],
  },
];
