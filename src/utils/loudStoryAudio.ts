// High-Power Web Audio API Narration Player
// Uses PCM normalization + soft-knee saturation + Vocal Presence EQ + 3.8x GainNode
// so story narration is ultra-loud and crystal-clear on any device speaker.

const AUDIO_PARTS_MAP: Record<string, string[]> = {
  'insight-1': ['/audio/insight-1-part0.mp3', '/audio/insight-1-part1.mp3'],
  'insight-2': ['/audio/insight-2-part0.mp3', '/audio/insight-2-part1.mp3'],
  'insight-3': ['/audio/insight-3-part0.mp3', '/audio/insight-3-part1.mp3'],
  'insight-4': ['/audio/insight-4-part0.mp3', '/audio/insight-4-part1.mp3'],
  'insight-5': ['/audio/insight-5-part0.mp3', '/audio/insight-5-part1.mp3'],
  'insight-6': ['/audio/insight-6-part0.mp3', '/audio/insight-6-part1.mp3'],
  'perseverance-1': [
    '/audio/perseverance-1-part0.mp3',
    '/audio/perseverance-1-part1.mp3',
  ],
  'perseverance-2': [
    '/audio/perseverance-2-part0.mp3',
    '/audio/perseverance-2-part1.mp3',
  ],
  'perseverance-3': [
    '/audio/perseverance-3-part0.mp3',
    '/audio/perseverance-3-part1.mp3',
  ],
  'perseverance-4': [
    '/audio/perseverance-4-part0.mp3',
    '/audio/perseverance-4-part1.mp3',
  ],
  'perseverance-5': [
    '/audio/perseverance-5-part0.mp3',
    '/audio/perseverance-5-part1.mp3',
  ],
  'perseverance-6': [
    '/audio/perseverance-6-part0.mp3',
    '/audio/perseverance-6-part1.mp3',
  ],
  'curiosity-1': [
    '/audio/curiosity-1-part0.mp3',
    '/audio/curiosity-1-part1.mp3',
  ],
  'curiosity-2': [
    '/audio/curiosity-2-part0.mp3',
    '/audio/curiosity-2-part1.mp3',
  ],
  'curiosity-3': [
    '/audio/curiosity-3-part0.mp3',
    '/audio/curiosity-3-part1.mp3',
  ],
  'curiosity-4': [
    '/audio/curiosity-4-part0.mp3',
    '/audio/curiosity-4-part1.mp3',
  ],
  'curiosity-5': [
    '/audio/curiosity-5-part0.mp3',
    '/audio/curiosity-5-part1.mp3',
  ],
  'curiosity-6': [
    '/audio/curiosity-6-part0.mp3',
    '/audio/curiosity-6-part1.mp3',
  ],
};

let sharedAudioCtx: AudioContext | null = null;
let currentSourceNode: AudioBufferSourceNode | null = null;
let activePlaybackToken = 0;
const decodedBufferCache = new Map<string, AudioBuffer>();

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function stopLoudNarration(): void {
  activePlaybackToken++;
  if (currentSourceNode) {
    try {
      currentSourceNode.onended = null;
      currentSourceNode.stop();
      currentSourceNode.disconnect();
    } catch {
      // ignore if already stopped
    }
    currentSourceNode = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

async function loadAndAmplifyClip(
  ctx: AudioContext,
  clipKey: string
): Promise<AudioBuffer | null> {
  if (decodedBufferCache.has(clipKey)) {
    return decodedBufferCache.get(clipKey)!;
  }

  const urls = AUDIO_PARTS_MAP[clipKey];
  if (!urls || urls.length === 0) return null;

  const partBuffers: AudioBuffer[] = [];
  for (const url of urls) {
    const res = await fetch(url);
    if (!res.ok) continue;
    const arrayBuf = await res.arrayBuffer();
    const audioBuf = await ctx.decodeAudioData(arrayBuf.slice(0));
    partBuffers.push(audioBuf);
  }

  if (partBuffers.length === 0) return null;

  const sampleRate = partBuffers[0].sampleRate;
  const pauseSamples = Math.floor(sampleRate * 0.12);
  const totalLength =
    partBuffers.reduce((acc, b) => acc + b.length, 0) +
    pauseSamples * Math.max(0, partBuffers.length - 1);

  const combined = ctx.createBuffer(1, totalLength, sampleRate);
  const outData = combined.getChannelData(0);

  let offset = 0;
  for (let i = 0; i < partBuffers.length; i++) {
    const chan = partBuffers[i].getChannelData(0);
    let peak = 0.01;
    for (let j = 0; j < chan.length; j++) {
      const abs = Math.abs(chan[j]);
      if (abs > peak) peak = abs;
    }
    const normFactor = 1.0 / peak;

    for (let j = 0; j < chan.length; j++) {
      const normalized = chan[j] * normFactor;
      outData[offset + j] = Math.tanh(normalized * 3.2);
    }
    offset += chan.length + pauseSamples;
  }

  decodedBufferCache.set(clipKey, combined);
  return combined;
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

  const ctx = getAudioContext();
  if (ctx) {
    try {
      const buffer = await loadAndAmplifyClip(ctx, options.clipKey);
      if (myToken !== activePlaybackToken) return;

      if (buffer) {
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const highpass = ctx.createBiquadFilter();
        highpass.type = 'highpass';
        highpass.frequency.value = 120;

        const presenceBoost = ctx.createBiquadFilter();
        presenceBoost.type = 'peaking';
        presenceBoost.frequency.value = 2400;
        presenceBoost.Q.value = 1.0;
        presenceBoost.gain.value = 9.0;

        const compressor = ctx.createDynamicsCompressor();
        compressor.threshold.value = -26;
        compressor.knee.value = 10;
        compressor.ratio.value = 8;
        compressor.attack.value = 0.002;
        compressor.release.value = 0.12;

        const masterGain = ctx.createGain();
        masterGain.gain.value = 3.8;

        source.connect(highpass);
        highpass.connect(presenceBoost);
        presenceBoost.connect(compressor);
        compressor.connect(masterGain);
        masterGain.connect(ctx.destination);

        currentSourceNode = source;
        options.onStart?.();

        source.onended = () => {
          if (myToken !== activePlaybackToken) return;
          currentSourceNode = null;
          options.onEnd?.();
        };

        source.start(0);
        return;
      }
    } catch {
      // Fall through to speechSynthesis fallback if audio fetch/decode fails
    }
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(options.fallbackText);
    utterance.volume = 1.0;
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.onstart = () => {
      if (myToken === activePlaybackToken) options.onStart?.();
    };
    utterance.onend = () => {
      if (myToken === activePlaybackToken) options.onEnd?.();
    };
    utterance.onerror = () => {
      if (myToken === activePlaybackToken) options.onError?.();
    };
    window.speechSynthesis.speak(utterance);
  } else {
    options.onStart?.();
    window.setTimeout(() => {
      if (myToken === activePlaybackToken) options.onEnd?.();
    }, 5000);
  }
}
