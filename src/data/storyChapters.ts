interface MissionQuizChapter {
  number: number;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    playfulExplanations: string[];
  };
}

const QUIZ_CHAPTERS_BY_MISSION: Record<string, MissionQuizChapter[]> = {
  "phoenix-lander": [
    {
      "number": 1,
      "quiz": {
        "question": "Why was this polar robot named \"Phoenix\"?",
        "options": [
          "Because Mars is hotter than a desert",
          "Because it rose from spare parts of earlier canceled Mars missions",
          "Because it had flapping wings"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "Actually, the Martian North Pole is freezing cold—dropping below -100°C!",
          "Spot on! Like the mythical bird rising from the ashes, Phoenix was built from spare mission hardware waiting in a cleanroom!",
          "It had octagonal solar wings that unfolded like fans, but they didn’t flap!"
        ]
      }
    },
    {
      "number": 2,
      "quiz": {
        "question": "How did Phoenix slow down for the final seconds before touching the Martian soil?",
        "options": [
          "Giant bouncy airbags",
          "12 pulsed rocket thrusters firing like rapid puffs",
          "Skis sliding across the ice"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "Spirit and Opportunity used airbags, but Phoenix was a three-legged lander that needed a gentle rocket landing!",
          "Bingo! Twelve pulsed hydrazine thrusters fired rapid bursts to set Phoenix down softer than a hop off a curb!",
          "Even though it landed near the pole, the ice was hidden under a blanket of dry red soil!"
        ]
      }
    },
    {
      "number": 3,
      "quiz": {
        "question": "What happened to the dice-sized white chunks Phoenix dug up after 4 days in the sun?",
        "options": [
          "They vanished into vapor (sublimated), proving they were water ice",
          "They turned into green plants",
          "They rolled uphill"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Yes! Because Mars has very thin air, warmed ice turns straight into gas (sublimation). Salt would have stayed behind!",
          "No plants yet—though Phoenix proved the soil isn’t acidic and contains nutrients!",
          "They stayed right in the shadow of the trench until they sublimated away!"
        ]
      }
    },
    {
      "number": 4,
      "quiz": {
        "question": "What surprising weather event did Phoenix’s upward laser beam spot in the Martian sky?",
        "options": [
          "A rainbow tornado",
          "Snow crystals falling from Martian clouds 2.5 miles up",
          "Hailstones the size of golf balls"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "Martian dust devils happen, but no rainbows without liquid raindrops!",
          "Correct! Phoenix’s green laser LIDAR spotted real water-ice snow falling from high Martian clouds!",
          "No giant hailstones—just delicate ice-crystal snow streaks!"
        ]
      }
    }
  ],
  "opportunity-rover": [
    {
      "number": 1,
      "quiz": {
        "question": "How long was Opportunity originally designed to last on Mars?",
        "options": [
          "Only 90 Martian days (sols)",
          "50 Earth years",
          "Just 24 hours"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Yes! It was warrantied for just 90 sols—and went on to explore for 5,111 sols (nearly 15 years)!",
          "Even the most optimistic engineers only hoped for 90 days to a year!",
          "24 hours is only one Martian sol—Oppy lasted 5,111 sols!"
        ]
      }
    },
    {
      "number": 2,
      "quiz": {
        "question": "Why did NASA engineers call Opportunity’s landing a \"300-million-mile hole-in-one\"?",
        "options": [
          "It landed on a golf ball left by Vikings",
          "Its bouncing airbags rolled right into Eagle Crater next to exposed ancient bedrock",
          "It fell down a bottomless lava tube"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "The Viking landers were thousands of miles away!",
          "Exact match! Out of a flat plain stretching for miles, Oppy rolled straight into a tiny crater with exposed water-formed bedrock!",
          "Thankfully Eagle Crater was shallow and easy for Oppy to drive out of afterward!"
        ]
      }
    },
    {
      "number": 3,
      "quiz": {
        "question": "What were the \"Martian blueberries\" that Opportunity discovered in the rocks?",
        "options": [
          "Frozen berries from space",
          "Tiny round mineral spheres (hematite) formed in ancient groundwater",
          "Pebbles dropped by meteors"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "Not edible berries—they were solid iron-oxide mineral spheres!",
          "Spot on! Hematite spherules grow inside water-soaked sediment, proving ancient Mars had liquid water!",
          "Their even spacing inside the rock layers proved they formed gently in water, not from meteor impacts!"
        ]
      }
    },
    {
      "number": 4,
      "quiz": {
        "question": "How did scientists poetically translate Opportunity’s final telemetry numbers on Sol 5,111?",
        "options": [
          "\"My battery is low and it’s getting dark.\"",
          "\"Mission accomplished, heading home.\"",
          "\"Too much sand in my wheels.\""
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Yes! The final telemetry showed critically low battery power (22 Wh) and record sky darkness (Tau 10.8)—forever remembered as \"My battery is low and it’s getting dark.\"",
          "Oppy stayed on Mars in Perseverance Valley as a permanent monument for future explorers!",
          "Oppy’s wheels were still parked safely on the slope of Perseverance Valley!"
        ]
      }
    }
  ],
  "voyager-1": [
    {
      "number": 1,
      "quiz": {
        "question": "How often do the outer giant planets line up for the \"Grand Tour\" slingshot path Voyager used?",
        "options": [
          "Every summer",
          "Once every 176 years",
          "Every 10 million years"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "Outer planets orbit slowly—Saturn takes 29 years and Uranus takes 84 years!",
          "Spot on! That planetary alignment only happens once every 176 years!",
          "Thankfully we didn’t have to wait millions of years—1977 was the perfect window!"
        ]
      }
    },
    {
      "number": 2,
      "quiz": {
        "question": "What surprising discovery did Voyager 1 make on Jupiter’s colorful moon Io?",
        "options": [
          "Active volcanoes erupting plumes into space",
          "Thick forests of pine trees",
          "Giant icebergs floating in water"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Yes! Io was the first place beyond Earth where scientists saw active volcanoes erupting right before our eyes!",
          "Io is covered in colorful sulfur lava flows, not forests!",
          "Jupiter’s next moon over, Europa, has the icy crust—Io is the fiery volcanic moon!"
        ]
      }
    },
    {
      "number": 3,
      "quiz": {
        "question": "What did Voyager 1 cross in August 2012 at 121 AU from the Sun?",
        "options": [
          "The Moon’s orbit",
          "The Heliopause—the boundary into interstellar space between the stars",
          "The edge of the Milky Way galaxy"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "Voyager passed the Moon’s distance on its very first day in 1977!",
          "Spot on! Crossing the Heliopause made Voyager 1 the first human-made pioneer in interstellar space!",
          "It is inside the interstellar space of our Milky Way galaxy!"
        ]
      }
    },
    {
      "number": 4,
      "quiz": {
        "question": "How powerful is Voyager 1’s radio transmitter that beams signals across 15 billion miles?",
        "options": [
          "Only about 23 watts—like a refrigerator lightbulb!",
          "A million-watt stadium spotlight",
          "As powerful as a lightning bolt"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Unbelievable but true! Just 23 watts—about a refrigerator bulb—picked up by giant 230-foot NASA Deep Space Network dishes on Earth!",
          "Deep-space pioneers have very limited power, so Voyager beams across the void with just 23 watts!",
          "No lightning bolts—just a steady 23-watt whisper focused through its dish antenna!"
        ]
      }
    }
  ],
  "cassini-orbiter": [
    {
      "number": 1,
      "quiz": {
        "question": "What was the golden saucer-shaped passenger riding on Cassini’s side?",
        "options": [
          "A spare satellite dish",
          "The European Huygens lander built to parachute onto Saturn’s moon Titan",
          "A giant pizza oven"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "Cassini already had a big white high-gain dish on top!",
          "Yes! The ESA Huygens probe rode on Cassini for 7 years before parachuting onto Titan!",
          "Definitely not a pizza oven—though its heat shield got sizzling hot entering Titan’s air!"
        ]
      }
    },
    {
      "number": 2,
      "quiz": {
        "question": "What are the rivers, rain, and lakes on Saturn’s freezing moon Titan made of?",
        "options": [
          "Warm salty ocean water",
          "Liquid methane and ethane",
          "Melted gold"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "At -179°C (-290°F), water on Titan’s surface is frozen as hard as granite rock! (Though there is a deep water ocean far underground).",
          "Correct! At Titan’s freezing temperature, methane gas condenses into liquid rain, rivers, and giant lakes!",
          "Gold requires scorching heat to melt—Titan is an icy hydrocarbon world!"
        ]
      }
    },
    {
      "number": 3,
      "quiz": {
        "question": "What did Cassini discover hiding underneath the icy shell of Saturn’s moon Enceladus?",
        "options": [
          "A global liquid water ocean with warm hydrothermal vents",
          "A solid ball of iron with no water",
          "Giant underground caverns full of bats"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Yes! Silica grains and hydrogen gas in the geysers proved warm hydrothermal vents are active on Enceladus’s ocean floor!",
          "Gravity and wobble measurements proved a global liquid ocean sits between the rocky core and the ice shell!",
          "No bats—but hydrothermal vents make Enceladus one of the best places to search for microbial life!"
        ]
      }
    },
    {
      "number": 4,
      "quiz": {
        "question": "Where did Cassini fly during its final 22 \"Grand Finale\" orbits before its final plunge?",
        "options": [
          "Back to Earth",
          "Right through the narrow gap between Saturn’s clouds and its innermost rings",
          "Inside a black hole"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "Cassini stayed at Saturn for its entire 13-year tour!",
          "Spot on! No pioneer had ever flown inside the gap between Saturn and its rings—measuring the weight and age of the rings for the first time!",
          "No black holes near Saturn—just the majestic ringed gas giant!"
        ]
      }
    }
  ],
  "apollo-landing-hardware": [
    {
      "number": 1,
      "quiz": {
        "question": "Why did the Eagle Lunar Module look like a boxy geometric bug instead of a sleek airplane?",
        "options": [
          "Because it only flew in the vacuum of space where there is no air resistance",
          "Because engineers ran out of curved metal",
          "So it could swim in lunar lakes"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Yes! Eagle was the first crewed vehicle designed to fly only in vacuum—so it didn’t need aerodynamic streamlining!",
          "Every angle was carefully engineered to save weight, not because they ran out of curved metal!",
          "The \"Sea of Tranquility\" is actually an ancient plain of dry volcanic basalt rock!"
        ]
      }
    },
    {
      "number": 2,
      "quiz": {
        "question": "How did the Apollo Guidance Computer survive the 1202 overload alarm during landing?",
        "options": [
          "Astronauts unplugged it and used a paper map",
          "Smart software led by Margaret Hamilton automatically dropped low-priority tasks to keep landing controls running",
          "It rebooted for 20 minutes"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "You can’t land on the Moon with a paper map—you need millisecond thruster control!",
          "Spot on! Margaret Hamilton’s team designed priority-scheduling software that kept the critical landing engine tasks running without missing a beat!",
          "A 20-minute reboot would have crashed—the restart took less than a blink of an eye!"
        ]
      }
    },
    {
      "number": 3,
      "quiz": {
        "question": "What amazing fact did scientists discover by bouncing lasers off Apollo’s laser mirror on the Moon?",
        "options": [
          "The Moon is made of green cheese",
          "The Moon is slowly spiraling 1.5 inches (3.8 cm) farther away from Earth every year",
          "The Moon shrinks by half every winter"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "The Moon rocks proved it’s volcanic basalt and anorthosite!",
          "Yes! Ocean tides on Earth transfer energy to the Moon, pushing it 3.8 centimeters farther away each year!",
          "The Moon stays practically the same size year-round!"
        ]
      }
    },
    {
      "number": 4,
      "quiz": {
        "question": "Which parts of the Apollo missions are still sitting on the Moon today?",
        "options": [
          "Six gold-foil descent stages and three electric moon buggies",
          "The giant Saturn V launch tower",
          "The splashdown parachutes"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Spot on! The bottom descent stages and three electric moon buggies stayed on the Moon while the top ascent stages flew the astronauts back to lunar orbit!",
          "The launch tower stayed in Florida!",
          "Only the Command Module used parachutes when splashing down in the Pacific Ocean on Earth!"
        ]
      }
    }
  ],
  "lro-orbiter": [
    {
      "number": 1,
      "quiz": {
        "question": "Why does LRO fly in a loop over the Moon’s North and South Poles?",
        "options": [
          "So it can map 100% of the Moon’s surface and peer directly into polar craters",
          "Because the Moon’s equator has too many clouds",
          "To stay warm near the poles"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Yes! As the Moon slowly rotates once a month underneath LRO’s polar loop, the orbiter scans every square meter of the lunar globe!",
          "The Moon has no clouds anywhere!",
          "Actually, the lunar poles have the coldest craters in the entire solar system!"
        ]
      }
    },
    {
      "number": 2,
      "quiz": {
        "question": "What was LRO’s camera sharp enough to photograph at the Apollo landing sites?",
        "options": [
          "The actual lander descent stages, moon buggies, and astronaut footpath trails",
          "The brand name printed on the bottom of a boot",
          "Earth cities"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Yes! At 0.5 meters per pixel, LRO clearly resolved the Apollo descent stages, parked moon buggies, and disturbed footpath trails!",
          "Letters on a boot are only millimeters wide—you’d need to walk up close on the surface to read those!",
          "LRO’s high-res cameras are tuned for scanning the lunar surface 50 km below!"
        ]
      }
    },
    {
      "number": 3,
      "quiz": {
        "question": "Why is discovering water ice at the Moon’s South Pole such a big deal for Artemis astronauts?",
        "options": [
          "They can build a lunar hockey rink",
          "Water can be used for drinking AND split into breathable oxygen and rocket fuel!",
          "It proves fish live on the Moon"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "While lunar curling sounds fun, water is far too precious!",
          "Bingo! H₂O gives astronauts drinking water, oxygen to breathe, and hydrogen/oxygen propellant so rockets can refuel on the Moon!",
          "No lunar fish—that ice came from ancient comets and solar wind interactions!"
        ]
      }
    },
    {
      "number": 4,
      "quiz": {
        "question": "How has LRO measured the exact height of every mountain and crater slope on the Moon?",
        "options": [
          "By dropping a long tape measure",
          "By firing billions of laser pulses at the surface and timing how fast they bounce back (LOLA)",
          "By guessing from shadows alone"
        ],
        "correctIndex": 1,
        "playfulExplanations": [
          "A 31-mile tape measure at 3,600 mph would snag on the first mountain!",
          "Correct! LRO’s LOLA laser altimeter has fired nearly 7 billion laser pulses to build the most accurate 3D map of the Moon ever made!",
          "Shadows help, but laser pulses measure height down to the centimeter—even inside dark craters!"
        ]
      }
    }
  ],
  "alsep-stations": [
    {
      "number": 1,
      "quiz": {
        "question": "How did the ALSEP science stations keep working after the Apollo astronauts flew back to Earth?",
        "options": [
          "They used nuclear heat batteries (SNAP-27 RTGs) and radioed data automatically to Earth for 8 years!",
          "Astronauts stayed behind to wind them up",
          "They ran on wind turbines"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Spot on! Those SNAP-27 RTG generators powered the stations day and night until September 1977!",
          "Every astronaut returned safely to Earth—the stations ran 100% robotically!",
          "The Moon has no air or wind to spin a turbine!"
        ]
      }
    },
    {
      "number": 2,
      "quiz": {
        "question": "How many moonquakes and meteor impacts did the ALSEP seismic stations detect on the Moon?",
        "options": [
          "Over 12,000!",
          "Zero—the Moon is completely still",
          "Only 2"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Yes! Over 12,000 moonquakes and meteorite hits were recorded across 8 years, proving the Moon is geologically active!",
          "The Moon actually rumbles with deep tidal moonquakes and shallow quakes!",
          "Way more than 2—thousands of quakes were logged!"
        ]
      }
    },
    {
      "number": 3,
      "quiz": {
        "question": "What amazing secret did the Apollo Laser Mirrors reveal about the Moon’s orbit?",
        "options": [
          "The Moon is slowly spiraling away from Earth by 3.8 cm (1.5 inches) every year!",
          "The Moon is getting closer every day",
          "The Moon is shaped like a cube"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Bullseye! Tidal forces between Earth’s oceans and the Moon push the Moon outward by 3.8 cm per year—and laser mirrors still measure it today!",
          "It is actually spiraling outward, not inward!",
          "The Moon is a rocky sphere!"
        ]
      }
    },
    {
      "number": 4,
      "quiz": {
        "question": "Which part of the Apollo surface science stations is STILL actively used by astronomers on Earth today?",
        "options": [
          "The quartz Laser Mirror Retroreflector trays",
          "A steam engine",
          "A weather balloon"
        ],
        "correctIndex": 0,
        "playfulExplanations": [
          "Yes! Because the quartz corner laser mirrors need zero electricity, observatories still bounce laser pulses off them every week!",
          "No steam engines on the Moon!",
          "With no air on the Moon, a balloon cannot float!"
        ]
      }
    }
  ]
};

export function getMissionStoryChapters(
  missionId: string,
  fallbackMission: {
    title: string;
    sectorLabel: string;
    subsystems: { name: string; role: string; kidAnalogy: string }[];
    quizQuestion: {
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    };
  }
): MissionQuizChapter[] {
  if (QUIZ_CHAPTERS_BY_MISSION[missionId]) {
    return QUIZ_CHAPTERS_BY_MISSION[missionId];
  }

  const sub1 = fallbackMission.subsystems[1] || fallbackMission.subsystems[0];
  const sub2 = fallbackMission.subsystems[2] || fallbackMission.subsystems[0];

  return [
    {
      number: 1,
      quiz: {
        question: fallbackMission.quizQuestion.question,
        options: fallbackMission.quizQuestion.options,
        correctIndex: fallbackMission.quizQuestion.correctIndex,
        playfulExplanations: fallbackMission.quizQuestion.options.map((_, idx) =>
          idx === fallbackMission.quizQuestion.correctIndex
            ? fallbackMission.quizQuestion.explanation
            : `Not quite! ${fallbackMission.quizQuestion.explanation}`
        ),
      },
    },
    {
      number: 2,
      quiz: {
        question: `What is the special job of ${fallbackMission.title}’s ${sub1.name}?`,
        options: [
          sub1.role,
          'Making ice cream in zero gravity',
          'Playing loud rock music in space',
        ],
        correctIndex: 0,
        playfulExplanations: [
          `Spot on! In kid terms: ${sub1.kidAnalogy}`,
          'No ice cream freezers aboard this mission hardware!',
          'Remember, sound waves can’t travel through the vacuum of space!',
        ],
      },
    },
    {
      number: 3,
      quiz: {
        question: `How does the Cosmic Glossary describe ${sub2.name} in kid-friendly terms?`,
        options: [
          sub2.kidAnalogy,
          'A giant wooden paddle for rowing through space',
          'A submarine periscope for underwater oceans on Earth',
        ],
        correctIndex: 0,
        playfulExplanations: [
          `Yes! ${sub2.kidAnalogy}`,
          'You can’t row a paddle in vacuum!',
          `This instrument was built specifically for ${fallbackMission.sectorLabel}!`,
        ],
      },
    },
    {
      number: 4,
      quiz: {
        question: fallbackMission.quizQuestion.question,
        options: fallbackMission.quizQuestion.options,
        correctIndex: fallbackMission.quizQuestion.correctIndex,
        playfulExplanations: fallbackMission.quizQuestion.options.map((_, idx) =>
          idx === fallbackMission.quizQuestion.correctIndex
            ? fallbackMission.quizQuestion.explanation
            : `Remember: ${fallbackMission.quizQuestion.explanation}`
        ),
      },
    },
  ];
}
