// Authentic NASA Public Domain Audio Feeds (Locally cached & amplified to max loudness)
export interface NasaAudioTrack {
  id: string;
  title: string;
  mission: string;
  nasaArchiveId: string;
  description: string;
  url: string;
}

export const NASA_AUTHENTIC_AUDIO_FEEDS: NasaAudioTrack[] = [
  {
    id: 'apollo-11-eagle',
    title: 'Apollo 11: "Houston, Tranquility Base Here. The Eagle Has Landed."',
    mission: 'Apollo 11 Lunar Module (1969)',
    nasaArchiveId: 'NASA-JSC-A11-LANDING-COMM',
    description:
      'Genuine NASA air-to-ground voice transmission from Neil Armstrong and Charlie Duke at the moment of lunar touchdown.',
    url: '/audio/apollo-11-eagle.mp3',
  },
  {
    id: 'voyager-golden-record',
    title: 'Voyager Interstellar Golden Record: Greetings from Earth',
    mission: 'Voyager 1 & 2 (1977–Present)',
    nasaArchiveId: 'NASA-JPL-VGR-GOLDEN-RECORD',
    description:
      'Authentic NASA recording from the gold-plated phonograph record carried aboard both Voyager spacecraft into interstellar space.',
    url: '/audio/voyager-golden-record.mp3',
  },
  {
    id: 'mars-perseverance-wind',
    title: 'Sounds of Mars: First Acoustic Wind Recording in Jezero Crater',
    mission: 'Perseverance Rover SuperCam Mic (2021)',
    nasaArchiveId: 'NASA-JPL-M2020-SUPERCAM-AUDIO',
    description:
      'Actual Martian wind gusts and rover acoustic telemetry recorded on the surface of Mars by Perseverance’s SuperCam microphone.',
    url: '/audio/mars-perseverance-wind.mp3',
  },
];

let activeNasaAudio: HTMLAudioElement | null = null;
let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;

export function playAuthenticNasaSnippet(
  trackId?: string,
  onEndedCallback?: () => void
) {
  try {
    const track =
      NASA_AUTHENTIC_AUDIO_FEEDS.find((t) => t.id === trackId) ||
      NASA_AUTHENTIC_AUDIO_FEEDS[0];

    if (activeNasaAudio) {
      activeNasaAudio.pause();
      activeNasaAudio.currentTime = 0;
    }

    const audio = new Audio(track.url);
    audio.volume = 1.0;
    audio.loop = true;

    // Route through Web Audio API GainNode to boost signal to maximum audible loudness
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioContextClass) {
        if (!audioCtx) {
          audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        const source = audioCtx.createMediaElementSource(audio);
        gainNode = audioCtx.createGain();
        gainNode.gain.value = 2.0; // 200% extra preamp boost on top of loudnorm MP3
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
      }
    } catch {
      // Fallback to native HTMLAudioElement at volume 1.0
    }

    if (onEndedCallback) {
      audio.onended = onEndedCallback;
    }

    activeNasaAudio = audio;
    audio.play().catch((err) => {
      console.warn('Audio playback warning:', err);
    });
  } catch {
    // Ignore audio errors
  }
}

export function stopAuthenticNasaSnippet() {
  if (activeNasaAudio) {
    activeNasaAudio.pause();
    activeNasaAudio.currentTime = 0;
    activeNasaAudio = null;
  }
}

export function playCelebrationFanfare() {}
export function playDiscoveryPop() {}
export function playQuizSuccessChime() {}
export function playGentleHintTone() {}
