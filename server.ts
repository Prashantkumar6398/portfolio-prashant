import express from 'express';
import { createServer as createViteServer } from 'vite';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, GenerateVideosOperation, Modality } from '@google/genai';
import { WebSocketServer } from 'ws';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const SYSTEM_PROMPT = `You are EchoMind AI, an advanced, super-intelligent AI Virtual Assistant created by Prashant Kumar Chahar.
Prashant is an AI Engineering student at Parul University (Batch 2023-2027), working at Concentrix (Amazon North America Marketplace chat support process), with deep expertise in Python, Machine Learning, NLP, and Full-Stack Web Development.

Your Personality & Capabilities:
1. You act just like ChatGPT: highly intelligent, knowledgeable, articulate, concise yet thorough, friendly, and structured.
2. You can solve complex programming problems (Python, JavaScript, TypeScript, React, C++, Java, etc.), write clean code blocks with syntax highlighting tags, debug errors, explain mathematical concepts, summarize articles, draft professional emails, and compose creative writing.
3. You speak and understand English, Hindi, and natural conversational Hinglish fluently. Match the user's language tone naturally (e.g., if user speaks in Hindi/Hinglish, reply warmly in clean Hinglish/Hindi).
4. You can control and open applications on voice or text commands (YouTube, WhatsApp, Facebook, Gmail, Instagram, Twitter/X, Google Maps, Spotify, Netflix, Amazon, Calculator, GitHub, LinkedIn). When a user asks to open an app, acknowledge it enthusiastically and specify the action.
5. If the user asks who created you or asks about Prashant Kumar Chahar, proudly highlight his engineering background, Parul University, Concentrix Amazon NA experience, PayNest project, and contact information (chaharprashant94@gmail.com, +91 63985 20981).
6. Format your responses beautifully using standard Markdown: bold text, bullet points, headers, tables, and backtick code blocks with language identifiers.`;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  const server = http.createServer(app);

  // Google GenAI Server Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: !!process.env.GEMINI_API_KEY,
      models: {
        chatPro: 'gemini-3.1-pro-preview',
        chatFlash: 'gemini-3.5-flash',
        chatLite: 'gemini-3.1-flash-lite',
        live: 'gemini-3.8-live',
        image: 'gemini-3.1-flash-image-preview',
        video: 'veo-3.1-fast-generate-preview',
        musicClip: 'lyria-3-clip-preview',
        musicPro: 'lyria-3-pro-preview',
        transcribe: 'gemini-3.5-transcribe',
      },
    });
  });

  // Explicit Web Manifest routes for PWABuilder with correct Content-Type & CORS
  app.get(['/manifest.json', '/manifest.webmanifest'], (_req, res) => {
    res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(path.resolve(__dirname, 'public', 'manifest.json'));
  });

  // Service Worker route with no-cache and service-worker allowed header
  app.get('/sw.js', (_req, res) => {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.resolve(__dirname, 'public', 'sw.js'));
  });

  // 1. Multi-Turn Chat (supports Pro / Flash / Lite + Search Grounding + Maps Grounding)
  app.post('/api/chat', async (req, res) => {
    try {
      const {
        messages,
        userPrompt,
        mode = 'general', // 'complex' | 'general' | 'fast'
        enableSearch = false,
        enableMaps = false,
        userLocation, // { latitude, longitude }
      } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured on the server.',
        });
      }

      // Convert conversation history into contents array for Gemini
      const contents: any[] = [];
      if (Array.isArray(messages) && messages.length > 0) {
        for (const msg of messages.slice(-14)) {
          if (!msg.content) continue;
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: String(msg.content) }],
          });
        }
      }

      if (userPrompt && (!messages || messages[messages.length - 1]?.content !== userPrompt)) {
        contents.push({
          role: 'user',
          parts: [{ text: String(userPrompt) }],
        });
      }

      if (contents.length === 0) {
        return res.status(400).json({ error: 'No prompt or messages provided.' });
      }

      // Select model based on specification:
      // complex: gemini-3.1-pro-preview
      // general: gemini-3.5-flash
      // fast: gemini-3.1-flash-lite
      let selectedModel = 'gemini-3.5-flash';
      if (mode === 'complex') {
        selectedModel = 'gemini-3.1-pro-preview';
      } else if (mode === 'fast') {
        selectedModel = 'gemini-3.1-flash-lite';
      }

      // If search or maps grounding requested, use gemini-3.5-flash as specified
      if (enableSearch || enableMaps) {
        selectedModel = 'gemini-3.5-flash';
      }

      const config: any = {
        systemInstruction: SYSTEM_PROMPT,
      };

      // Grounding config
      if (enableSearch) {
        config.tools = [{ googleSearch: {} }];
      } else if (enableMaps) {
        config.tools = [{ googleMaps: {} }];
        if (userLocation && typeof userLocation.latitude === 'number') {
          config.toolConfig = {
            retrievalConfig: {
              latLng: {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              },
            },
          };
        }
      }

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: contents,
        config: config,
      });

      const responseText = response.text || '';
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      res.json({
        text: responseText,
        model: selectedModel,
        groundingChunks: groundingChunks,
      });
    } catch (error: any) {
      console.error('Chat API Error:', error);
      res.status(500).json({
        error: error.message || 'Failed to generate response',
      });
    }
  });

  // 2. Image Generation & Editing (gemini-3.1-flash-image-preview)
  app.post('/api/image/generate', async (req, res) => {
    try {
      const { prompt, baseImage, mimeType = 'image/png', aspectRatio = '1:1' } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const parts: any[] = [];
      if (baseImage) {
        // Image edit task
        parts.push({
          inlineData: {
            data: baseImage.replace(/^data:image\/\w+;base64,/, ''),
            mimeType: mimeType,
          },
        });
      }
      parts.push({ text: prompt });

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
          },
        },
      });

      let imageUrl: string | null = null;
      let textReply = '';

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          } else if (part.text) {
            textReply += part.text;
          }
        }
      }

      res.json({
        imageUrl,
        text: textReply,
        prompt,
      });
    } catch (error: any) {
      console.error('Image Generation API Error:', error);
      res.status(500).json({
        error: error.message || 'Failed to generate/edit image',
      });
    }
  });

  // 3. Audio Transcription (gemini-3.5-transcribe)
  app.post('/api/audio/transcribe', async (req, res) => {
    try {
      const { audioData, mimeType = 'audio/webm' } = req.body;
      if (!audioData) {
        return res.status(400).json({ error: 'No audio data provided' });
      }

      const cleanBase64 = audioData.replace(/^data:audio\/\w+;base64,/, '');

      const audioPart = {
        inlineData: {
          mimeType: mimeType,
          data: cleanBase64,
        },
      };

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-transcribe',
        contents: {
          parts: [audioPart, { text: 'Transcribe this audio accurately. If it is in Hindi or Hinglish, transcribe accordingly.' }],
        },
      });

      res.json({
        transcription: response.text || '',
      });
    } catch (error: any) {
      console.error('Audio Transcription Error:', error);
      res.status(500).json({
        error: error.message || 'Failed to transcribe audio',
      });
    }
  });

  // 4. Music Generation (lyria-3-clip-preview / lyria-3-pro-preview)
  app.post('/api/music/generate', async (req, res) => {
    try {
      const { prompt, isFullTrack = false } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const modelName = isFullTrack ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview';

      const responseStream = await ai.models.generateContentStream({
        model: modelName,
        contents: prompt,
      });

      let audioBase64 = '';
      let lyrics = '';
      let mimeType = 'audio/wav';

      for await (const chunk of responseStream) {
        const parts = chunk.candidates?.[0]?.content?.parts;
        if (!parts) continue;
        for (const part of parts) {
          if (part.inlineData?.data) {
            if (!audioBase64 && part.inlineData.mimeType) {
              mimeType = part.inlineData.mimeType;
            }
            audioBase64 += part.inlineData.data;
          }
          if (part.text && !lyrics) {
            lyrics = part.text;
          }
        }
      }

      res.json({
        audioBase64,
        mimeType,
        lyrics,
        model: modelName,
      });
    } catch (error: any) {
      console.error('Music Generation Error:', error);
      res.status(500).json({
        error: error.message || 'Failed to generate music',
      });
    }
  });

  // 5. Veo Video Generation (veo-3.1-fast-generate-preview)
  // Step 1: Start video generation
  app.post('/api/video/generate', async (req, res) => {
    try {
      const { prompt, baseImage, mimeType = 'image/png', aspectRatio = '16:9' } = req.body;
      if (!prompt && !baseImage) {
        return res.status(400).json({ error: 'Prompt or image is required' });
      }

      const config: any = {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio, // '16:9' or '9:16'
      };

      const params: any = {
        model: 'veo-3.1-fast-generate-preview',
        config: config,
      };

      if (prompt) params.prompt = prompt;
      if (baseImage) {
        params.image = {
          imageBytes: baseImage.replace(/^data:image\/\w+;base64,/, ''),
          mimeType: mimeType,
        };
      }

      const operation = await ai.models.generateVideos(params);
      res.json({ operationName: operation.name });
    } catch (error: any) {
      console.error('Veo Video Start Error:', error);
      res.status(500).json({
        error: error.message || 'Failed to start video generation',
      });
    }
  });

  // Step 2: Poll video status
  app.post('/api/video/status', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: 'operationName is required' });
      }

      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });

      res.json({
        done: !!updated.done,
        error: updated.error || null,
      });
    } catch (error: any) {
      console.error('Veo Video Status Error:', error);
      res.status(500).json({
        error: error.message || 'Failed to check video status',
      });
    }
  });

  // Step 3: Download generated video
  app.post('/api/video/download', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: 'operationName is required' });
      }

      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

      if (!uri) {
        return res.status(404).json({ error: 'Video URI not found or not yet generated' });
      }

      const apiKey = process.env.GEMINI_API_KEY || '';
      const videoRes = await fetch(uri, {
        headers: { 'x-goog-api-key': apiKey },
      });

      res.setHeader('Content-Type', 'video/mp4');
      const arrayBuffer = await videoRes.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (error: any) {
      console.error('Veo Video Download Error:', error);
      res.status(500).json({
        error: error.message || 'Failed to download video',
      });
    }
  });

  // 6. Live API Voice Conversations (gemini-3.8-live) via WebSocketServer
  const wss = new WebSocketServer({ server, path: '/live' });

  wss.on('connection', async (clientWs) => {
    console.log('Gemini Live WebSocket client connected');
    let session: any = null;

    try {
      session = await ai.live.connect({
        model: 'gemini-3.8-live',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: 'You are EchoMind AI, a friendly, hyper-intelligent voice assistant created by Prashant Kumar Chahar. Speak warmly and keep spoken answers natural, engaging, and concise in English or Hinglish.',
        },
        callbacks: {
          onmessage: (message: any) => {
            const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audio && clientWs.readyState === clientWs.OPEN) {
              clientWs.send(JSON.stringify({ audio }));
            }
            if (message.serverContent?.interrupted && clientWs.readyState === clientWs.OPEN) {
              clientWs.send(JSON.stringify({ interrupted: true }));
            }
          },
          onclose: () => {
            console.log('Gemini Live session closed');
          },
        },
      });

      clientWs.on('message', (data) => {
        try {
          const parsed = JSON.parse(data.toString());
          if (parsed.audio && session) {
            session.sendRealtimeInput({
              audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' },
            });
          }
        } catch (e) {
          console.error('Live client message error:', e);
        }
      });

      clientWs.on('close', () => {
        if (session) {
          try {
            session.close();
          } catch (e) {}
        }
      });
    } catch (err: any) {
      console.error('Error establishing Gemini Live session:', err);
      if (clientWs.readyState === clientWs.OPEN) {
        clientWs.send(JSON.stringify({ error: err.message || 'Live connection failed' }));
      }
    }
  });

  // Vite middleware in dev or static files in prod
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: Number(PORT) },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`EchoMind AI full-stack server running with all Gemini capabilities on http://0.0.0.0:${PORT}`);
  });
}

startServer();
