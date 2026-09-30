// Authentic NASA Public Domain Audio Feeds (Mastered 44.1kHz Stereo Broadcast Loudness)
import { speakTextLoudly, stopLoudNarration } from './loudStoryAudio';

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

let persistentNasaDomAudio: HTMLAudioElement | null = null;
let activeNasaToken = 0;

function getOrCreateNasaDomAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }
  const existing = document.getElementById(
    'space-legacy-nasa-feed-player'
  ) as HTMLAudioElement | null;
  if (existing) {
    existing.volume = 1.0;
    existing.muted = false;
    persistentNasaDomAudio = existing;
    return existing;
  }
  if (!persistentNasaDomAudio) {
    const el = document.createElement('audio');
    el.id = 'space-legacy-nasa-feed-fallback';
    el.preload = 'auto';
    el.volume = 1.0;
    el.muted = false;
    el.style.display = 'none';
    document.body.appendChild(el);
    persistentNasaDomAudio = el;
  }
  persistentNasaDomAudio.volume = 1.0;
  persistentNasaDomAudio.muted = false;
  return persistentNasaDomAudio;
}

export function playAuthenticNasaSnippet(
  trackId?: string,
  onEndedCallback?: () => void
) {
  const track =
    NASA_AUTHENTIC_AUDIO_FEEDS.find((t) => t.id === trackId) ||
    NASA_AUTHENTIC_AUDIO_FEEDS[0];

  stopAuthenticNasaSnippet();
  stopLoudNarration();
  const myToken = ++activeNasaToken;

  const audio = getOrCreateNasaDomAudio();
  if (audio) {
    try {
      if (!audio.src.endsWith(track.url)) {
        audio.src = track.url;
      }
      audio.volume = 1.0;
      audio.muted = false;
      audio.loop = true;

      if (onEndedCallback) {
        audio.onended = onEndedCallback;
      }

      audio.onerror = () => {
        if (myToken !== activeNasaToken) return;
        speakTextLoudly({
          text: `${track.title}. ${track.description}`,
          onEnd: onEndedCallback,
        });
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (myToken !== activeNasaToken) return;
          speakTextLoudly({
            text: `${track.title}. ${track.description}`,
            onEnd: onEndedCallback,
          });
        });
      }
      return;
    } catch {
      // fall through
    }
  }

  speakTextLoudly({
    text: `${track.title}. ${track.description}`,
    onEnd: onEndedCallback,
  });
}

export function stopAuthenticNasaSnippet() {
  activeNasaToken++;
  const domPlayer =
    typeof document !== 'undefined'
      ? (document.getElementById(
          'space-legacy-nasa-feed-player'
        ) as HTMLAudioElement | null)
      : null;

  for (const el of [domPlayer, persistentNasaDomAudio]) {
    if (el) {
      try {
        el.onended = null;
        el.onerror = null;
        el.pause();
      } catch {
        // Ignore cleanup errors
      }
    }
  }
}
