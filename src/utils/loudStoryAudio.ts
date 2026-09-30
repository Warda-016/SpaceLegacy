// Universal High-Loudness Story & Speech Narration Engine
// 1. Plays pre-mastered single-file 44.1kHz stereo MP3s (/audio/<mission>-<step>.mp3)
//    via a persistent DOM-mounted <audio> element unlocked on user interaction.
// 2. For dynamic/chapter/dictionary text without a static file, streams MP3 audio from
//    the local server endpoint (/api/tts?text=...) through the same DOM <audio> element.
// 3. Falls back to Web Speech API with a safe delay after cancel() so Chromium IPC never
//    drops utterances if exported as a static site without the Node backend.

const SINGLE_AUDIO_MAP: Record<string, string> = {
  'insight-1': '/audio/insight-1.mp3',
  'insight-2': '/audio/insight-2.mp3',
  'insight-3': '/audio/insight-3.mp3',
  'insight-4': '/audio/insight-4.mp3',
  'insight-5': '/audio/insight-5.mp3',
  'insight-6': '/audio/insight-6.mp3',
  'perseverance-1': '/audio/perseverance-1.mp3',
  'perseverance-2': '/audio/perseverance-2.mp3',
  'perseverance-3': '/audio/perseverance-3.mp3',
  'perseverance-4': '/audio/perseverance-4.mp3',
  'perseverance-5': '/audio/perseverance-5.mp3',
  'perseverance-6': '/audio/perseverance-6.mp3',
  'curiosity-1': '/audio/curiosity-1.mp3',
  'curiosity-2': '/audio/curiosity-2.mp3',
  'curiosity-3': '/audio/curiosity-3.mp3',
  'curiosity-4': '/audio/curiosity-4.mp3',
  'curiosity-5': '/audio/curiosity-5.mp3',
  'curiosity-6': '/audio/curiosity-6.mp3',
  'lro-1': '/audio/lro-1.mp3',
  'lro-2': '/audio/lro-2.mp3',
  'lro-3': '/audio/lro-3.mp3',
  'lro-4': '/audio/lro-4.mp3',
  'lro-5': '/audio/lro-5.mp3',
  'lro-6': '/audio/lro-6.mp3',
  'phoenix-1': '/audio/phoenix-1.mp3',
  'phoenix-2': '/audio/phoenix-2.mp3',
  'phoenix-3': '/audio/phoenix-3.mp3',
  'phoenix-4': '/audio/phoenix-4.mp3',
  'phoenix-5': '/audio/phoenix-5.mp3',
  'phoenix-6': '/audio/phoenix-6.mp3',
  'newhorizons-1': '/audio/newhorizons-1.mp3',
  'newhorizons-2': '/audio/newhorizons-2.mp3',
  'newhorizons-3': '/audio/newhorizons-3.mp3',
  'newhorizons-4': '/audio/newhorizons-4.mp3',
  'newhorizons-5': '/audio/newhorizons-5.mp3',
  'newhorizons-6': '/audio/newhorizons-6.mp3',
  'opportunity-1': '/audio/opportunity-1.mp3',
  'opportunity-2': '/audio/opportunity-2.mp3',
  'opportunity-3': '/audio/opportunity-3.mp3',
  'opportunity-4': '/audio/opportunity-4.mp3',
  'opportunity-5': '/audio/opportunity-5.mp3',
  'opportunity-6': '/audio/opportunity-6.mp3',
  'spirit-1': '/audio/spirit-1.mp3',
  'spirit-2': '/audio/spirit-2.mp3',
  'spirit-3': '/audio/spirit-3.mp3',
  'spirit-4': '/audio/spirit-4.mp3',
  'spirit-5': '/audio/spirit-5.mp3',
  'spirit-6': '/audio/spirit-6.mp3',
  'cassini-1': '/audio/cassini-1.mp3',
  'cassini-2': '/audio/cassini-2.mp3',
  'cassini-3': '/audio/cassini-3.mp3',
  'cassini-4': '/audio/cassini-4.mp3',
  'cassini-5': '/audio/cassini-5.mp3',
  'cassini-6': '/audio/cassini-6.mp3',
  'voyager-1': '/audio/voyager-1.mp3',
  'voyager-2': '/audio/voyager-2.mp3',
  'voyager-3': '/audio/voyager-3.mp3',
  'voyager-4': '/audio/voyager-4.mp3',
  'voyager-5': '/audio/voyager-5.mp3',
  'voyager-6': '/audio/voyager-6.mp3',
  'pioneer-1': '/audio/pioneer-1.mp3',
  'pioneer-2': '/audio/pioneer-2.mp3',
  'pioneer-3': '/audio/pioneer-3.mp3',
  'pioneer-4': '/audio/pioneer-4.mp3',
  'pioneer-5': '/audio/pioneer-5.mp3',
  'pioneer-6': '/audio/pioneer-6.mp3',
  'alsep-1': '/audio/alsep-1.mp3',
  'alsep-2': '/audio/alsep-2.mp3',
  'alsep-3': '/audio/alsep-3.mp3',
  'alsep-4': '/audio/alsep-4.mp3',
  'alsep-5': '/audio/alsep-5.mp3',
  'alsep-6': '/audio/alsep-6.mp3',
  'apollo-1': '/audio/apollo-1.mp3',
  'apollo-2': '/audio/apollo-2.mp3',
  'apollo-3': '/audio/apollo-3.mp3',
  'apollo-4': '/audio/apollo-4.mp3',
  'apollo-5': '/audio/apollo-5.mp3',
  'apollo-6': '/audio/apollo-6.mp3',
};

let persistentDomAudio: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let speechTimeoutId: number | null = null;
let activePlaybackToken = 0;

function getOrCreateDomAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }
  if (!persistentDomAudio) {
    const el = document.createElement('audio');
    el.id = 'space-legacy-narration-audio';
    el.preload = 'auto';
    el.volume = 1.0;
    el.muted = false;
    el.style.display = 'none';
    document.body.appendChild(el);
    persistentDomAudio = el;
  }
  persistentDomAudio.volume = 1.0;
  persistentDomAudio.muted = false;
  return persistentDomAudio;
}

export function stopLoudNarration(): void {
  activePlaybackToken++;

  if (speechTimeoutId !== null && typeof window !== 'undefined') {
    window.clearTimeout(speechTimeoutId);
    speechTimeoutId = null;
  }

  if (persistentDomAudio) {
    try {
      persistentDomAudio.onended = null;
      persistentDomAudio.onerror = null;
      persistentDomAudio.pause();
      persistentDomAudio.currentTime = 0;
    } catch {
      // ignore cleanup errors
    }
  }

  activeUtterance = null;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      if (
        window.speechSynthesis.speaking ||
        window.speechSynthesis.pending
      ) {
        window.speechSynthesis.cancel();
      }
    } catch {
      // ignore
    }
  }
}

function fallbackBrowserSpeechSynthesis(
  myToken: number,
  options: {
    text: string;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      if (
        window.speechSynthesis.speaking ||
        window.speechSynthesis.pending
      ) {
        window.speechSynthesis.cancel();
      }

      // Wait 60ms after cancel() so Chromium's async IPC queue doesn't cancel the new utterance
      speechTimeoutId = window.setTimeout(() => {
        if (myToken !== activePlaybackToken) return;
        try {
          window.speechSynthesis.resume();
          const utterance = new SpeechSynthesisUtterance(options.text);
          activeUtterance = utterance;
          utterance.volume = 1.0;
          utterance.rate = 0.96;
          utterance.pitch = 1.02;

          const voices = window.speechSynthesis.getVoices();
          const preferredVoice =
            voices.find(
              (v) =>
                v.lang.startsWith('en') &&
                (v.name.includes('Natural') ||
                  v.name.includes('Google') ||
                  v.name.includes('Online'))
            ) || voices.find((v) => v.lang.startsWith('en'));

          if (preferredVoice) {
            utterance.voice = preferredVoice;
          }

          utterance.onstart = () => {
            if (myToken === activePlaybackToken) {
              options.onStart?.();
            }
          };
          utterance.onend = () => {
            if (myToken === activePlaybackToken) {
              activeUtterance = null;
              options.onEnd?.();
            }
          };
          utterance.onerror = () => {
            if (myToken === activePlaybackToken) {
              activeUtterance = null;
              options.onError?.();
            }
          };

          window.speechSynthesis.speak(utterance);
        } catch {
          options.onError?.();
        }
      }, 60);
      return;
    } catch {
      // ignore
    }
  }

  options.onStart?.();
  speechTimeoutId = window.setTimeout(() => {
    if (myToken === activePlaybackToken) {
      options.onEnd?.();
    }
  }, 4000);
}

export function speakTextLoudly(options: {
  text: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}): void {
  stopLoudNarration();
  const myToken = ++activePlaybackToken;

  const audio = getOrCreateDomAudio();
  if (audio) {
    const ttsStreamUrl = `/api/tts?text=${encodeURIComponent(options.text)}`;
    audio.src = ttsStreamUrl;
    audio.loop = false;
    audio.volume = 1.0;
    audio.muted = false;

    let started = false;
    audio.onended = () => {
      if (myToken !== activePlaybackToken) return;
      options.onEnd?.();
    };
    audio.onerror = () => {
      if (myToken !== activePlaybackToken) return;
      fallbackBrowserSpeechSynthesis(myToken, {
        text: options.text,
        onStart: started ? undefined : options.onStart,
        onEnd: options.onEnd,
        onError: options.onError,
      });
    };

    const playPromise = audio.play();
    started = true;
    options.onStart?.();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (myToken !== activePlaybackToken) return;
        fallbackBrowserSpeechSynthesis(myToken, {
          text: options.text,
          onStart: undefined,
          onEnd: options.onEnd,
          onError: options.onError,
        });
      });
    }
    return;
  }

  fallbackBrowserSpeechSynthesis(myToken, options);
}

export async function playLoudNarration(options: {
  clipKey: string;
  fallbackText: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}): Promise<void> {
  stopLoudNarration();
  const myToken = ++activePlaybackToken;

  const singleUrl = SINGLE_AUDIO_MAP[options.clipKey];
  const audio = getOrCreateDomAudio();

  if (singleUrl && audio) {
    audio.src = singleUrl;
    audio.loop = false;
    audio.volume = 1.0;
    audio.muted = false;

    let hasStarted = false;

    audio.onended = () => {
      if (myToken !== activePlaybackToken) return;
      options.onEnd?.();
    };

    audio.onerror = () => {
      if (myToken !== activePlaybackToken) return;
      speakTextLoudly({
        text: options.fallbackText,
        onStart: hasStarted ? undefined : options.onStart,
        onEnd: options.onEnd,
        onError: options.onError,
      });
    };

    const playPromise = audio.play();
    hasStarted = true;
    options.onStart?.();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (myToken !== activePlaybackToken) return;
        fallbackBrowserSpeechSynthesis(myToken, {
          text: options.fallbackText,
          onStart: undefined,
          onEnd: options.onEnd,
          onError: options.onError,
        });
      });
    }
    return;
  }

  speakTextLoudly({
    text: options.fallbackText,
    onStart: options.onStart,
    onEnd: options.onEnd,
    onError: options.onError,
  });
}
