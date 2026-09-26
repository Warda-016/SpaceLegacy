import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory server cache for instant repeat dictionary lookups
const dictionaryCache = new Map<string, Record<string, unknown>>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post('/api/cosmic-dictionary', async (req, res) => {
    const rawTerm = typeof req.body?.term === 'string' ? req.body.term.trim() : '';
    if (!rawTerm) {
      res.status(400).json({ error: 'Please provide a word or space term to look up.' });
      return;
    }

    const cacheKey = rawTerm.toLowerCase();
    if (dictionaryCache.has(cacheKey)) {
      res.json(dictionaryCache.get(cacheKey));
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Define and explain the word, acronym, phrase, or concept "${rawTerm}" for a curious young explorer (ages 10-15) visiting the NASA "Space Legacy: Abandoned But Not Lost" interactive museum. Even if "${rawTerm}" is an everyday word, custom term, or general science/engineering word, connect it clearly to how it works in everyday life and in space exploration!`,
        config: {
          systemInstruction:
            'You are the Universal Cosmic Dictionary AI for Space Legacy, an educational NASA space hardware museum for kids and teens. For ANY word, acronym, number, or phrase the user types, generate an accurate, super engaging, kid-friendly definition, a phonetic pronunciation guide, a vivid everyday analogy (starting with "Like..." or "Imagine..."), and a real space or science fun fact. Never say a word is not found—always explain the exact word they asked about!',
          temperature: 0.7,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              term: {
                type: Type.STRING,
                description: 'The formatted title of the term or word being defined.',
              },
              pronunciation: {
                type: Type.STRING,
                description: 'Simple phonetic pronunciation guide (e.g., "AY-YOO" or "GRAV-ih-tee").',
              },
              emoji: {
                type: Type.STRING,
                description: 'A single expressive emoji matching the concept.',
              },
              category: {
                type: Type.STRING,
                description:
                  'One of: "Hardware Tech", "Deep Space", "Planet Science", "Mission Comms", "Measurement", or "Space Vocabulary".',
              },
              kidDefinition: {
                type: Type.STRING,
                description:
                  'A clear, exciting, kid-friendly 1-2 sentence definition explaining what the word means.',
              },
              playfulAnalogy: {
                type: Type.STRING,
                description:
                  'A relatable everyday analogy for kids (starting with "Like..." or "Imagine...") that makes the concept click immediately.',
              },
              funFact: {
                type: Type.STRING,
                description:
                  'A fascinating, true NASA, astronomy, or science fun fact connected to this word.',
              },
              isTechnicalJargon: {
                type: Type.BOOLEAN,
                description:
                  'True if this is a scientific, engineering, space, or technical term/acronym.',
              },
            },
            required: [
              'term',
              'pronunciation',
              'emoji',
              'category',
              'kidDefinition',
              'playfulAnalogy',
              'funFact',
              'isTechnicalJargon',
            ],
          },
        },
      });

      const text = response.text?.trim();
      if (!text) {
        throw new Error('Empty response from Gemini model');
      }

      const parsed = JSON.parse(text);
      const entry = {
        term: parsed.term || rawTerm,
        aliases: [rawTerm.toLowerCase()],
        pronunciation: parsed.pronunciation || rawTerm.toUpperCase(),
        emoji: parsed.emoji || '🚀',
        category: parsed.category || 'Space Vocabulary',
        kidDefinition: parsed.kidDefinition,
        playfulAnalogy: parsed.playfulAnalogy,
        funFact: parsed.funFact,
        isTechnicalJargon: Boolean(parsed.isTechnicalJargon),
      };

      dictionaryCache.set(cacheKey, entry);
      res.json(entry);
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : 'Failed to generate AI definition';
      res.status(500).json({ error: errMsg });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Space Legacy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
