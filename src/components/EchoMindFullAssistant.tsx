import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Settings,
  Trash2,
  ExternalLink,
  Smartphone,
  Sparkles,
  Download,
  Copy,
  Check,
  Code,
  Terminal,
  Compass,
  Globe,
  MapPin,
  Image as ImageIcon,
  Video,
  Music,
  FileAudio,
  Activity,
  X,
  Menu,
  Maximize2,
  Minimize2,
  Radio,
  Play,
  Pause,
  Upload,
  Layers,
  Search
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export interface AppItem {
  id: string;
  name: string;
  icon: string;
  url: string;
  color: string;
  bgColor: string;
  keywords: string[];
  category: 'social' | 'media' | 'productivity' | 'developer';
}

export const APPS_LIST: AppItem[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '▶️',
    url: 'https://www.youtube.com',
    color: '#ff0000',
    bgColor: 'rgba(255, 0, 0, 0.12)',
    keywords: ['youtube', 'yt', 'video', 'videos', 'gana', 'gaane', 'song', 'songs'],
    category: 'media',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '💬',
    url: 'https://web.whatsapp.com',
    color: '#25d366',
    bgColor: 'rgba(37, 211, 102, 0.12)',
    keywords: ['whatsapp', 'wa', 'whats app', 'message', 'messages', 'chat'],
    category: 'social',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '📘',
    url: 'https://www.facebook.com',
    color: '#1877f2',
    bgColor: 'rgba(24, 119, 242, 0.12)',
    keywords: ['facebook', 'fb', 'fbook'],
    category: 'social',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    icon: '📧',
    url: 'https://mail.google.com',
    color: '#ea4335',
    bgColor: 'rgba(234, 67, 53, 0.12)',
    keywords: ['gmail', 'email', 'mail', 'inbox', 'g mail'],
    category: 'productivity',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📸',
    url: 'https://www.instagram.com',
    color: '#e1306c',
    bgColor: 'rgba(225, 48, 108, 0.12)',
    keywords: ['instagram', 'insta', 'ig', 'reels', 'story'],
    category: 'social',
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    icon: '🐦',
    url: 'https://www.x.com',
    color: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.12)',
    keywords: ['twitter', 'x.com', 'tweet', 'tweets', 'x '],
    category: 'social',
  },
  {
    id: 'maps',
    name: 'Google Maps',
    icon: '🗺️',
    url: 'https://maps.google.com',
    color: '#4285f4',
    bgColor: 'rgba(66, 133, 244, 0.12)',
    keywords: ['maps', 'google maps', 'map', 'location', 'rasta', 'directions', 'navigation'],
    category: 'productivity',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: '🎵',
    url: 'https://open.spotify.com',
    color: '#1ed760',
    bgColor: 'rgba(30, 215, 96, 0.12)',
    keywords: ['spotify', 'music', 'song', 'songs', 'playlist', 'gaana', 'gaane', 'audio'],
    category: 'media',
  },
  {
    id: 'google',
    name: 'Google',
    icon: '🔍',
    url: 'https://www.google.com',
    color: '#4285f4',
    bgColor: 'rgba(66, 133, 244, 0.12)',
    keywords: ['google', 'search', 'search engine', 'dhoondho'],
    category: 'productivity',
  },
  {
    id: 'netflix',
    name: 'Netflix',
    icon: '🎬',
    url: 'https://www.netflix.com',
    color: '#e50914',
    bgColor: 'rgba(229, 9, 20, 0.12)',
    keywords: ['netflix', 'movie', 'movies', 'series', 'film'],
    category: 'media',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    icon: '🛒',
    url: 'https://www.amazon.in',
    color: '#ff9900',
    bgColor: 'rgba(255, 153, 0, 0.12)',
    keywords: ['amazon', 'shopping', 'kharido', 'order', 'buy'],
    category: 'productivity',
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: '🧮',
    url: 'https://www.calculatorsoup.com/calculators/math/basic.php',
    color: '#4fc3f7',
    bgColor: 'rgba(79, 195, 247, 0.12)',
    keywords: ['calculator', 'calc', 'calculate', 'hisab', 'hisaab', 'math'],
    category: 'productivity',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    url: 'https://github.com/Prashantkumar6398',
    color: '#c084fc',
    bgColor: 'rgba(192, 132, 252, 0.12)',
    keywords: ['github', 'git', 'repo', 'repository', 'code'],
    category: 'developer',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    url: 'https://www.linkedin.com/in/prashant-kumar-chahar',
    color: '#0a66c2',
    bgColor: 'rgba(10, 102, 194, 0.12)',
    keywords: ['linkedin', 'resume', 'profile', 'job', 'hire', 'career'],
    category: 'developer',
  },
];

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
  appOpened?: AppItem;
  searchQuery?: string;
  groundingLinks?: { title: string; url: string }[];
  mediaOutput?: {
    type: 'image' | 'video' | 'music' | 'transcription';
    url?: string;
    lyrics?: string;
    details?: string;
  };
}

interface EchoMindFullAssistantProps {
  onSwitchToPortfolio?: () => void;
}

export const EchoMindFullAssistant: React.FC<EchoMindFullAssistantProps> = ({
  onSwitchToPortfolio,
}) => {
  // User Profile & Settings
  const [userName, setUserName] = useState(() => localStorage.getItem('em_user_name') || 'Prashant');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('em_user_email') || 'chaharprashant94@gmail.com');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('em_logged_in') === 'true');
  const [ttsEnabled, setTtsEnabled] = useState(() => localStorage.getItem('em_tts') !== 'false');

  // Gemini Chat Mode State
  // Model selector: Complex (gemini-3.1-pro-preview), General (gemini-3.5-flash), Fast (gemini-3.1-flash-lite)
  const [chatModelMode, setChatModelMode] = useState<'complex' | 'general' | 'fast'>('general');
  const [isSearchGroundingActive, setIsSearchGroundingActive] = useState(false);
  const [isMapsGroundingActive, setIsMapsGroundingActive] = useState(false);

  // Chat & Messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState<'ONLINE' | 'LISTENING...' | 'THINKING...' | 'SPEAKING...' | 'LIVE ACTIVE'>('ONLINE');
  const [isWaveActive, setIsWaveActive] = useState(false);

  // Standard Voice Recognition (SpeechRecognition)
  const [isListening, setIsListening] = useState(false);

  // Gemini 3.8 Live API Real-Time Audio WebSocket Session
  const [isLiveActive, setIsLiveActive] = useState(false);
  const liveWsRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  // Active Multimodal Studio Tool Modal / Tab
  const [activeStudioTool, setActiveStudioTool] = useState<null | 'image' | 'video' | 'music' | 'transcribe' | 'live'>(null);

  // Multimodal Studio Inputs
  const [imagePrompt, setImagePrompt] = useState('');
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const [isGeneratingMedia, setIsGeneratingMedia] = useState(false);
  const [mediaProgressText, setMediaProgressText] = useState('');

  // Video generation input
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16'>('16:9');

  // Music generation input
  const [musicPrompt, setMusicPrompt] = useState('');
  const [isFullTrackMusic, setIsFullTrackMusic] = useState(false);

  // Audio Transcribe recorder state
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // UI Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileSimMode, setIsMobileSimMode] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [pwaPromptEvent, setPwaPromptEvent] = useState<any>(null);
  const [isCopiedCode, setIsCopiedCode] = useState<string | null>(null);

  // Refs
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recognitionRef = useRef<any>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isGeneratingMedia]);

  // Starfield Canvas Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let stars: { x: number; y: number; r: number; a: number; da: number }[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      const count = Math.min(160, Math.floor((canvas.width * canvas.height) / 9000));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.3 + 0.4,
          a: Math.random(),
          da: (Math.random() - 0.5) * 0.006 + 0.001,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.a += s.da;
        if (s.a > 1 || s.a < 0.05) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(130, 195, 255, ${Math.max(0.1, s.a * 0.7)})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // PWA install prompt & Service Worker
  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setPwaPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => console.log('EchoMind Service Worker registered'))
        .catch((err) => console.log('SW registration error:', err));
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  // Initial Welcome Greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      const welcome: ChatMessage = {
        id: 'welcome-0',
        role: 'assistant',
        content: `Namaste **${userName}**! 👋 Main hoon **EchoMind AI** — aapka super-intelligent AI Virtual Assistant & Multimodal Creator Studio!\n\n✨ **New Upgraded Capabilities:**\n- 🎙️ **Live Voice Conversations:** \`gemini-3.8-live\` real-time audio WebSocket conversation.\n- 🎬 **Veo Video Generation:** Text ya photo se \`veo-3.1-fast-generate-preview\` se cinematic videos generate karein.\n- 🎨 **Image Studio:** \`gemini-3.1-flash-image-preview\` se prompt se images create & edit karein.\n- 🎵 **Music Creator:** \`lyria-3-clip-preview\` (short clips) aur \`lyria-3-pro-preview\` (full tracks) se music banayein.\n- 🔍 **Google Search & Maps Grounding:** Real-time web information aur places/locations.\n- 🎙️ **Audio Transcription:** \`gemini-3.5-transcribe\` se mic audio transcribe karein.\n- 📱 **Voice Apps Launcher:** YouTube, WhatsApp, Maps, Spotify bolte hi launch karein!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.5-flash',
      };
      setMessages([welcome]);
      if (ttsEnabled) {
        speakText("Namaste! Main hoon EchoMind AI, aapka smart virtual assistant. Poochhiye kya karna hai?");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // TTS Speech Synthesis
  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const plainText = text
      .replace(/[*_#`~[\]()<>]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 280);

    if (!plainText) return;

    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) => v.lang.includes('hi') || v.lang.includes('IN') || v.name.includes('India') || v.name.includes('Natural')
    );
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      setIsWaveActive(true);
      setStatusText('SPEAKING...');
    };
    utterance.onend = () => {
      setIsWaveActive(false);
      setStatusText('ONLINE');
    };
    utterance.onerror = () => {
      setIsWaveActive(false);
      setStatusText('ONLINE');
    };

    window.speechSynthesis.speak(utterance);
  };

  // Convert Float32Array PCM to 16-bit PCM Base64 for Gemini Live
  const pcmFloat32ToBase64 = (float32Array: Float32Array): string => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < float32Array.length; i++) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Play 24kHz PCM Audio Chunk from Gemini Live
  const playLiveAudioChunk = (audioCtx: AudioContext, base64Audio: string) => {
    try {
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768;
      }

      const audioBuffer = audioCtx.createBuffer(1, float32Array.length, 24000);
      audioBuffer.getChannelData(0).set(float32Array);

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
    } catch (e) {
      console.warn('Live audio decode error:', e);
    }
  };

  // Gemini 3.8 Live API Toggle (Real-time Audio Conversation)
  const toggleLiveSession = async () => {
    if (isLiveActive) {
      stopLiveSession();
    } else {
      startLiveSession();
    }
  };

  const startLiveSession = async () => {
    try {
      soundFx.playPop(650);
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);

      const inputAudioCtx = new AudioContext({ sampleRate: 16000 });
      const outputAudioCtx = new AudioContext({ sampleRate: 24000 });
      audioCtxRef.current = outputAudioCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const source = inputAudioCtx.createMediaStreamSource(stream);
      const processor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
      scriptProcessorRef.current = processor;

      source.connect(processor);
      processor.connect(inputAudioCtx.destination);

      ws.onopen = () => {
        setIsLiveActive(true);
        setStatusText('LIVE ACTIVE');
        setIsWaveActive(true);

        processor.onaudioprocess = (e) => {
          if (ws.readyState === WebSocket.OPEN) {
            const inputData = e.inputBuffer.getChannelData(0);
            const base64 = pcmFloat32ToBase64(inputData);
            ws.send(JSON.stringify({ audio: base64 }));
          }
        };
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.audio) {
            playLiveAudioChunk(outputAudioCtx, msg.audio);
          }
          if (msg.interrupted) {
            outputAudioCtx.suspend().then(() => outputAudioCtx.resume());
          }
        } catch (e) {
          console.error(e);
        }
      };

      ws.onerror = (err) => {
        console.error('Live WS error:', err);
        stopLiveSession();
      };

      ws.onclose = () => {
        stopLiveSession();
      };

      liveWsRef.current = ws;
    } catch (err: any) {
      alert(`Live API Mic error: ${err.message || err}`);
      stopLiveSession();
    }
  };

  const stopLiveSession = () => {
    if (liveWsRef.current) {
      try {
        liveWsRef.current.close();
      } catch (e) {}
      liveWsRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }

    setIsLiveActive(false);
    setIsWaveActive(false);
    setStatusText('ONLINE');
  };

  // Standard Voice Recognition
  const toggleMic = () => {
    if (isListening) {
      stopMic();
    } else {
      startMic();
    }
  };

  const startMic = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice Recognition is best supported in Google Chrome, Edge, or mobile browsers!');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setStatusText('LISTENING...');
        setIsWaveActive(true);
        soundFx.playPop(620);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputVal(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
        setIsWaveActive(false);
        setStatusText('ONLINE');
        if (inputVal.trim()) {
          handleSendMessage(inputVal.trim());
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition error:', e.error);
        setIsListening(false);
        setIsWaveActive(false);
        setStatusText('ONLINE');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition start failed:', err);
      setIsListening(false);
      setIsWaveActive(false);
      setStatusText('ONLINE');
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error(err);
      }
    }
    setIsListening(false);
    setIsWaveActive(false);
    setStatusText('ONLINE');
  };

  // Audio Transcription Tool (gemini-3.5-transcribe)
  const startRecordingForTranscription = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach((t) => t.stop());

        // Convert blob to Base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Data = reader.result as string;
          await performTranscription(base64Data);
        };
      };

      mediaRecorder.start();
      setIsTranscribing(true);
      soundFx.playPop(500);
    } catch (err: any) {
      alert(`Microphone access error: ${err.message || err}`);
    }
  };

  const stopRecordingForTranscription = () => {
    if (mediaRecorderRef.current && isTranscribing) {
      mediaRecorderRef.current.stop();
      setIsTranscribing(false);
    }
  };

  const performTranscription = async (audioData: string) => {
    setIsGeneratingMedia(true);
    setMediaProgressText('Transcribing audio with gemini-3.5-transcribe...');

    try {
      const res = await fetch('/api/audio/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioData, mimeType: 'audio/webm' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Transcription failed');

      const transcriptionText = data.transcription || 'No speech detected';
      setInputVal(transcriptionText);

      const msg: ChatMessage = {
        id: `trans-${Date.now()}`,
        role: 'assistant',
        content: `🎙️ **gemini-3.5-transcribe Transcription:**\n\n"${transcriptionText}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.5-transcribe',
      };
      setMessages((prev) => [...prev, msg]);
      setActiveStudioTool(null);
    } catch (err: any) {
      alert(`Transcription Error: ${err.message}`);
    } finally {
      setIsGeneratingMedia(false);
      setMediaProgressText('');
    }
  };

  // Image Generation & Editing (gemini-3.1-flash-image-preview)
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setIsGeneratingMedia(true);
    setMediaProgressText('Generating image with gemini-3.1-flash-image-preview...');

    try {
      const res = await fetch('/api/image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt,
          baseImage: selectedImageBase64,
          aspectRatio: aspectRatio,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Image generation failed');

      const msg: ChatMessage = {
        id: `img-${Date.now()}`,
        role: 'assistant',
        content: `🎨 **Image ${selectedImageBase64 ? 'Edited' : 'Created'} with gemini-3.1-flash-image-preview!**\n\n*Prompt:* "${imagePrompt}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.1-flash-image-preview',
        mediaOutput: {
          type: 'image',
          url: data.imageUrl,
          details: imagePrompt,
        },
      };

      setMessages((prev) => [...prev, msg]);
      setImagePrompt('');
      setSelectedImageBase64(null);
      setActiveStudioTool(null);
      soundFx.playPop(580);
    } catch (err: any) {
      alert(`Image Generation Error: ${err.message}`);
    } finally {
      setIsGeneratingMedia(false);
      setMediaProgressText('');
    }
  };

  // Veo Video Generation (veo-3.1-fast-generate-preview)
  const handleGenerateVideo = async () => {
    if (!videoPrompt.trim() && !selectedImageBase64) return;
    setIsGeneratingMedia(true);
    setMediaProgressText('Starting Veo 3 video generation with veo-3.1-fast-generate-preview...');

    try {
      const res = await fetch('/api/video/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: videoPrompt,
          baseImage: selectedImageBase64,
          aspectRatio: videoAspectRatio,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to start video generation');

      const opName = data.operationName;
      setMediaProgressText('Veo is rendering your high-fidelity video... Polling operation status.');

      // Poll until completed
      let isDone = false;
      let attempts = 0;
      while (!isDone && attempts < 40) {
        await new Promise((r) => setTimeout(r, 6000));
        attempts++;
        setMediaProgressText(`Veo rendering video frames... (${attempts * 6}s elapsed)`);

        const pollRes = await fetch('/api/video/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName: opName }),
        });
        const pollData = await pollRes.json();
        if (pollData.error) throw new Error(pollData.error.message || 'Video generation error');
        if (pollData.done) {
          isDone = true;
        }
      }

      if (isDone) {
        setMediaProgressText('Downloading rendered MP4 video stream...');
        const dlRes = await fetch('/api/video/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName: opName }),
        });
        const videoBlob = await dlRes.blob();
        const videoUrl = URL.createObjectURL(videoBlob);

        const msg: ChatMessage = {
          id: `vid-${Date.now()}`,
          role: 'assistant',
          content: `🎬 **Veo Video Generated Successfully!** (Model: \`veo-3.1-fast-generate-preview\`, Aspect Ratio: ${videoAspectRatio})\n\n*Prompt:* "${videoPrompt || 'Animate Image into Video'}"`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: 'veo-3.1-fast-generate-preview',
          mediaOutput: {
            type: 'video',
            url: videoUrl,
            details: videoPrompt,
          },
        };

        setMessages((prev) => [...prev, msg]);
        setVideoPrompt('');
        setSelectedImageBase64(null);
        setActiveStudioTool(null);
        soundFx.playPop(620);
      }
    } catch (err: any) {
      alert(`Veo Video Error: ${err.message}`);
    } finally {
      setIsGeneratingMedia(false);
      setMediaProgressText('');
    }
  };

  // Music Generation (lyria-3-clip-preview & lyria-3-pro-preview)
  const handleGenerateMusic = async () => {
    if (!musicPrompt.trim()) return;
    setIsGeneratingMedia(true);
    const model = isFullTrackMusic ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview';
    setMediaProgressText(`Composing audio with ${model}...`);

    try {
      const res = await fetch('/api/music/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: musicPrompt,
          isFullTrack: isFullTrackMusic,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Music generation failed');

      // Decode base64 audio into playable Blob URL
      const binary = atob(data.audioBase64 || '');
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);

      const msg: ChatMessage = {
        id: `mus-${Date.now()}`,
        role: 'assistant',
        content: `🎵 **Music Track Composed with ${model}!**\n\n*Style / Prompt:* "${musicPrompt}"\n${data.lyrics ? `\n*Lyrics:*\n${data.lyrics}` : ''}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: model,
        mediaOutput: {
          type: 'music',
          url: audioUrl,
          lyrics: data.lyrics,
          details: musicPrompt,
        },
      };

      setMessages((prev) => [...prev, msg]);
      setMusicPrompt('');
      setActiveStudioTool(null);
      soundFx.playPop(540);
    } catch (err: any) {
      alert(`Music Generation Error: ${err.message}`);
    } finally {
      setIsGeneratingMedia(false);
      setMediaProgressText('');
    }
  };

  // Handle Image File Upload helper
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Detect App Launching Commands
  const detectAppCommand = (text: string): AppItem | null => {
    const lower = text.toLowerCase();
    const launchWords = [
      'open',
      'kholo',
      'kholna',
      'chalu',
      'chalao',
      'launch',
      'start',
      'show',
      'dikhao',
      'go to',
      'play',
      'lagao',
      'run',
    ];
    const hasLaunchWord = launchWords.some((w) => lower.includes(w));

    for (const app of APPS_LIST) {
      for (const kw of app.keywords) {
        if (lower.includes(kw)) {
          if (hasLaunchWord || lower.trim().split(/\s+/).length <= 2) {
            return app;
          }
        }
      }
    }
    return null;
  };

  // Open App in new tab & append assistant card
  const handleOpenApp = (app: AppItem) => {
    soundFx.playPop(520);
    window.open(app.url, '_blank');

    const appMsg: ChatMessage = {
      id: `app-${Date.now()}`,
      role: 'assistant',
      content: `✅ **${app.name}** khol diya hai! Naye tab mein launch ho gaya.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      appOpened: app,
    };

    setMessages((prev) => [...prev, appMsg]);

    if (ttsEnabled) {
      speakText(`${app.name} khol diya gaya hai!`);
    }
  };

  // Send Chat Message (Multi-turn Chat with Gemini Pro/Flash/Lite & Grounding)
  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = (textOverride !== undefined ? textOverride : inputVal).trim();
    if (!textToSend || isLoading) return;

    soundFx.playPop(480);
    setInputVal('');

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);

    // 1. Check if user wants to open an application
    const detectedApp = detectAppCommand(textToSend);
    if (detectedApp) {
      handleOpenApp(detectedApp);
      return;
    }

    // 2. Obtain geolocation if Maps Grounding is active
    let userLocation: { latitude: number; longitude: number } | undefined = undefined;
    if (isMapsGroundingActive && 'geolocation' in navigator) {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000 });
        });
        userLocation = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
      } catch (e) {
        console.log('Location query fallback');
      }
    }

    // 3. Call Server Gemini API (`/api/chat`)
    setIsLoading(true);
    setStatusText('THINKING...');
    setIsWaveActive(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userPrompt: textToSend,
          mode: chatModelMode,
          enableSearch: isSearchGroundingActive,
          enableMaps: isMapsGroundingActive,
          userLocation: userLocation,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.text || 'EchoMind AI response received.';

      // Extract Grounding URLs
      const groundingLinks: { title: string; url: string }[] = [];
      if (Array.isArray(data.groundingChunks)) {
        for (const chunk of data.groundingChunks) {
          if (chunk.web?.uri) {
            groundingLinks.push({ title: chunk.web.title || chunk.web.uri, url: chunk.web.uri });
          }
          if (chunk.maps?.uri) {
            groundingLinks.push({ title: chunk.maps.title || 'View on Google Maps', url: chunk.maps.uri });
          }
        }
      }

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model || 'gemini-3.5-flash',
        groundingLinks: groundingLinks.length > 0 ? groundingLinks : undefined,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsWaveActive(false);
      setStatusText('ONLINE');

      if (ttsEnabled) {
        speakText(replyText);
      }
    } catch (err: any) {
      console.error('Error in chat API:', err);
      // Smart offline / fallback responses
      const fallbackReply = generateSmartFallback(textToSend, userName);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.1-flash-lite',
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsWaveActive(false);
      setStatusText('ONLINE');

      if (ttsEnabled) {
        speakText(fallbackReply);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generateSmartFallback = (query: string, user: string): string => {
    const q = query.toLowerCase();

    if (q.includes('who are you') || q.includes('kaun ho') || q.includes('who created')) {
      return `Main hoon **EchoMind AI**, ek ultra-smart AI Virtual Assistant jise **Prashant Kumar Chahar** ne develop kiya hai!\n\nPrashant Parul University mein B.Tech Artificial Intelligence Engineering kar rahe hain aur Concentrix mein Amazon NA support process mein experience rakhte hain.\n\nMain aapke voice aur text commands par apps khol sakta hoon, coding kar sakta hoon, Veo videos & Lyria music generate kar sakta hoon, aur ChatGPT ki tarah har sawaal ka uttar de sakta hoon! 🚀`;
    }

    if (q.includes('time') || q.includes('samay') || q.includes('ghadi')) {
      return `Abhi ka local time hai: **${new Date().toLocaleTimeString()}** ⏰`;
    }

    if (q.includes('date') || q.includes('tarikh') || q.includes('aaj')) {
      return `Aaj ki date hai: **${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}** 📅`;
    }

    return `Maine aapka sawaal samajh liya! 🌟 Main **EchoMind AI** Gemini Pro, Flash & Lite models ke sath aapko coding, reasoning, live audio conversations aur applications launcher mein assist karta hoon.`;
  };

  // Copy code helper
  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setIsCopiedCode(codeText);
    setTimeout(() => setIsCopiedCode(null), 2000);
  };

  // Format Markdown with syntax highlighted code blocks
  const renderMessageContent = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const lang = lines[0].trim().toLowerCase() || 'code';
        const codeContent = lines.slice(1).join('\n') || lines[0];

        return (
          <div key={index} className="my-3 rounded-lg overflow-hidden border border-cyan-500/25 bg-[#081028]">
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#0e1c44] border-b border-cyan-500/20 text-xs text-cyan-300 font-mono">
              <span className="flex items-center gap-1.5 uppercase font-semibold">
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                {lang}
              </span>
              <button
                onClick={() => handleCopyCode(codeContent)}
                className="flex items-center gap-1 hover:text-white px-2 py-0.5 rounded bg-cyan-950/60 transition"
              >
                {isCopiedCode === codeContent ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 text-xs md:text-sm text-cyan-100 font-mono overflow-x-auto leading-relaxed">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      }

      const formattedLines = part.split('\n').map((line, lIdx) => {
        let parsed = line;
        parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-300 font-semibold">$1</strong>');
        parsed = parsed.replace(/\*(.*?)\*/g, '<em class="text-purple-300">$1</em>');

        return (
          <span
            key={lIdx}
            className="block min-h-[1.2em]"
            dangerouslySetInnerHTML={{ __html: parsed }}
          />
        );
      });

      return <span key={index}>{formattedLines}</span>;
    });
  };

  // Trigger PWA Installation
  const handleInstallPWA = async () => {
    if (pwaPromptEvent) {
      try {
        await pwaPromptEvent.prompt();
        const choice = await pwaPromptEvent.userChoice;
        if (choice.outcome === 'accepted') {
          alert('🎉 EchoMind AI install ho gaya hai! Apni Home Screen ya Apps drawer check karein.');
        }
        setPwaPromptEvent(null);
      } catch (err) {
        setIsPublishModalOpen(true);
      }
    } else {
      // If native browser prompt is not ready or inside an iframe, open the guided modal
      setIsPublishModalOpen(true);
    }
  };

  const quickPrompts = [
    { label: '▶️ YouTube kholo', prompt: 'open YouTube' },
    { label: '💬 WhatsApp kholo', prompt: 'open WhatsApp' },
    { label: '🗺️ Google Maps kholo', prompt: 'open Google Maps' },
    { label: '🎵 Spotify kholo', prompt: 'open Spotify' },
    { label: '💼 Who is Prashant?', prompt: 'Who is Prashant Kumar Chahar and what are his skills?' },
    { label: '🐍 Write Python algorithm', prompt: 'Write a Python function with time complexity analysis to solve the Two Sum problem.' },
    { label: '🚀 Fun fact batao', prompt: 'Tell me a mind-blowing fun fact about space and AI in Hinglish.' },
  ];

  return (
    <div className={`relative w-full h-screen bg-[#03071e] text-[#c8e6ff] flex flex-col overflow-hidden font-['Exo_2',sans-serif] ${isMobileSimMode ? 'items-center justify-center p-2 sm:p-6 bg-[#020512]' : ''}`}>
      {/* Starfield Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 15% 25%, rgba(0, 120, 255, 0.09) 0%, transparent 55%), radial-gradient(ellipse at 85% 70%, rgba(100, 0, 255, 0.08) 0%, transparent 55%)',
        }}
      />

      {/* MOBILE SIMULATOR WRAPPER */}
      <div className={`relative z-10 flex flex-col w-full h-full overflow-hidden ${isMobileSimMode ? 'max-w-[420px] max-h-[860px] rounded-[44px] border-[8px] border-[#1a254b] shadow-[0_0_50px_rgba(79,195,247,0.3)] bg-[#03071e]' : ''}`}>
        
        {/* Mobile Mockup Notch */}
        {isMobileSimMode && (
          <div className="w-full flex items-center justify-center py-2 bg-[#020617] border-b border-cyan-900/40 select-none">
            <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500/60 animate-pulse" />
              <div className="w-10 h-1 bg-slate-800 rounded-full" />
            </div>
          </div>
        )}

        {/* TOPBAR */}
        <header className="relative z-20 flex items-center justify-between px-3 md:px-5 py-2.5 bg-[#03071e]/90 border-b border-[#4fc3f7]/20 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="md:hidden p-1.5 text-cyan-400 hover:text-white border border-cyan-500/30 rounded-lg bg-cyan-950/40"
              title="Toggle Apps Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex flex-col">
              <span className="font-['Orbitron'] text-base md:text-lg font-bold tracking-wider text-[#4fc3f7] drop-shadow-[0_0_15px_rgba(79,195,247,0.6)]">
                Echo<span className="text-[#a78bfa]">Mind</span> <span className="text-white text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/30">AI</span>
              </span>
              <span className="text-[9px] tracking-widest text-[#96b4ff]/70 -mt-0.5 uppercase hidden sm:block">
                Multimodal Assistant & Creator Studio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Gemini 3.8 Live Real-Time Audio Button */}
            <button
              onClick={toggleLiveSession}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border font-medium transition shadow-md ${
                isLiveActive
                  ? 'border-red-500 bg-red-600/30 text-red-200 animate-pulse'
                  : 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50'
              }`}
              title="Gemini 3.8 Live Real-time Audio Conversation"
            >
              <Radio className={`w-3.5 h-3.5 ${isLiveActive ? 'text-red-400 animate-spin' : 'text-emerald-400'}`} />
              <span className="hidden sm:inline">{isLiveActive ? 'Stop Live API' : 'Gemini Live'}</span>
            </button>

            {/* Model Role Selector: Pro / Flash / Lite */}
            <div className="hidden lg:flex items-center bg-[#09153a] border border-cyan-500/30 rounded-lg p-0.5 text-[11px]">
              <button
                onClick={() => setChatModelMode('complex')}
                className={`px-2 py-0.5 rounded ${chatModelMode === 'complex' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
                title="Use gemini-3.1-pro-preview for complex reasoning & code"
              >
                Pro
              </button>
              <button
                onClick={() => setChatModelMode('general')}
                className={`px-2 py-0.5 rounded ${chatModelMode === 'general' ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
                title="Use gemini-3.5-flash for general chat"
              >
                Flash
              </button>
              <button
                onClick={() => setChatModelMode('fast')}
                className={`px-2 py-0.5 rounded ${chatModelMode === 'fast' ? 'bg-amber-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
                title="Use gemini-3.1-flash-lite for instant speed"
              >
                Lite
              </button>
            </div>

            {/* Grounding Toggles */}
            <button
              onClick={() => setIsSearchGroundingActive(!isSearchGroundingActive)}
              className={`p-1.5 rounded-lg border text-xs transition hidden sm:flex items-center gap-1 ${
                isSearchGroundingActive
                  ? 'border-cyan-400 bg-cyan-500/30 text-cyan-200 font-medium'
                  : 'border-cyan-500/20 text-slate-400 hover:text-white'
              }`}
              title="Toggle Google Search Grounding (gemini-3.5-flash)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[10px]">Search</span>
            </button>

            <button
              onClick={() => setIsMapsGroundingActive(!isMapsGroundingActive)}
              className={`p-1.5 rounded-lg border text-xs transition hidden sm:flex items-center gap-1 ${
                isMapsGroundingActive
                  ? 'border-emerald-400 bg-emerald-500/30 text-emerald-200 font-medium'
                  : 'border-cyan-500/20 text-slate-400 hover:text-white'
              }`}
              title="Toggle Google Maps Grounding (gemini-3.5-flash)"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-[10px]">Maps</span>
            </button>

            {/* User Profile / Auth State */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-2 py-1 text-xs rounded-lg border border-cyan-500/25 bg-[#09153a] text-cyan-300 hover:bg-[#10245e] transition"
              title="User Account & Firebase Auth"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold text-[10px]">
                {userName[0]?.toUpperCase() || 'P'}
              </div>
              <span className="hidden md:inline max-w-[80px] truncate">{userName}</span>
            </button>

            {/* Mobile App & Publish button */}
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30 transition"
              title="Mobile App & Play Store Publish Guide"
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              <span className="font-medium hidden sm:inline">App</span>
            </button>

            {/* 3D Portfolio view switch */}
            {onSwitchToPortfolio && (
              <button
                onClick={onSwitchToPortfolio}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border border-purple-500/40 bg-purple-950/30 text-purple-200 hover:bg-purple-900/40 transition"
                title="View Prashant's 3D Interactive Portfolio"
              >
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                <span>Portfolio</span>
              </button>
            )}

            {/* Settings */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-1.5 rounded-lg border border-cyan-500/25 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 bg-[#09153a] transition"
              title="EchoMind Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* MAIN BODY LAYOUT */}
        <div className="relative z-10 flex flex-1 overflow-hidden">
          
          {/* LEFT PANEL (APPS & MULTIMODAL CREATOR STUDIO) */}
          <aside className={`w-[260px] shrink-0 md:flex flex-col border-r border-[#4fc3f7]/20 bg-[#03071e]/75 backdrop-blur-md p-3.5 gap-2.5 overflow-y-auto ${isMobileDrawerOpen ? 'fixed inset-y-0 left-0 z-50 flex shadow-2xl bg-[#03071e]' : 'hidden md:flex'}`}>
            
            {isMobileDrawerOpen && (
              <div className="flex md:hidden justify-between items-center pb-2 border-b border-cyan-500/20">
                <span className="font-['Orbitron'] text-xs font-bold text-cyan-400">ECHOMIND STUDIO</span>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* AVATAR WITH ORBITAL RINGS */}
            <div className="flex flex-col items-center gap-1.5 py-1">
              <div className="relative w-16 h-16 rounded-full border border-cyan-400/40 flex items-center justify-center animate-[spin_12s_linear_infinite] shadow-[0_0_20px_rgba(79,195,247,0.15)]">
                <div className="absolute -inset-1 rounded-full border border-purple-400/25 animate-[spin_7s_linear_infinite_reverse]" />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0d1b4b] to-[#1a0a3d] border border-cyan-400/60 flex items-center justify-center animate-[spin_12s_linear_infinite_reverse]">
                  <div className="flex items-center gap-0.5 h-5">
                    {[3, 5, 8, 6, 9, 6, 8, 4, 3].map((h, i) => (
                      <span
                        key={i}
                        className={`w-0.5 rounded-full bg-gradient-to-t from-cyan-400 to-purple-400 transition-all ${isWaveActive ? 'animate-[pulse_0.8s_ease-in-out_infinite]' : 'opacity-40'}`}
                        style={{ height: isWaveActive ? `${h * 2}px` : '4px' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="font-['Orbitron'] text-xs font-bold tracking-widest text-[#4fc3f7]">
                  ECHOMIND
                </div>
                <div className="text-[8.5px] tracking-widest text-[#96b4ff]/60 uppercase">
                  {statusText}
                </div>
              </div>
            </div>

            {/* CREATIVE AI TOOLS (VEO, IMAGEN, LYRIA, TRANSCRIBE) */}
            <div className="flex items-center justify-between text-[10px] tracking-wider text-[#96b4ff]/70 font-semibold uppercase px-1">
              <span>🎨 Creative Studio</span>
              <span className="text-[9px] text-purple-400 font-mono">GENAI</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => setActiveStudioTool('image')}
                className="flex items-center gap-2 p-2 rounded-xl bg-[#0a143c]/80 hover:bg-[#11235a] border border-cyan-500/20 text-left transition"
              >
                <ImageIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-cyan-100 text-[11px] truncate">Image Studio</div>
                  <div className="text-[8.5px] text-slate-400 truncate">Create & Edit</div>
                </div>
              </button>

              <button
                onClick={() => setActiveStudioTool('video')}
                className="flex items-center gap-2 p-2 rounded-xl bg-[#0a143c]/80 hover:bg-[#11235a] border border-purple-500/20 text-left transition"
              >
                <Video className="w-4 h-4 text-purple-400 shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-purple-100 text-[11px] truncate">Veo 3 Video</div>
                  <div className="text-[8.5px] text-slate-400 truncate">Text/Photo to Video</div>
                </div>
              </button>

              <button
                onClick={() => setActiveStudioTool('music')}
                className="flex items-center gap-2 p-2 rounded-xl bg-[#0a143c]/80 hover:bg-[#11235a] border border-emerald-500/20 text-left transition"
              >
                <Music className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-emerald-100 text-[11px] truncate">Lyria Music</div>
                  <div className="text-[8.5px] text-slate-400 truncate">Clips & Full Tracks</div>
                </div>
              </button>

              <button
                onClick={() => setActiveStudioTool('transcribe')}
                className="flex items-center gap-2 p-2 rounded-xl bg-[#0a143c]/80 hover:bg-[#11235a] border border-amber-500/20 text-left transition"
              >
                <FileAudio className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-amber-100 text-[11px] truncate">Transcribe</div>
                  <div className="text-[8.5px] text-slate-400 truncate">Mic to Text</div>
                </div>
              </button>
            </div>

            {/* QUICK APPS SECTION */}
            <div className="flex items-center justify-between text-[10px] tracking-wider text-[#96b4ff]/70 font-semibold uppercase px-1 mt-1">
              <span>📱 Open Apps ({APPS_LIST.length})</span>
              <span className="text-[8.5px] text-cyan-400 font-mono">VOICE/CLICK</span>
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {APPS_LIST.slice(0, 10).map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    handleOpenApp(app);
                    if (isMobileDrawerOpen) setIsMobileDrawerOpen(false);
                  }}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#0a143c]/80 hover:bg-[#11235a] border border-cyan-500/15 hover:border-cyan-400/40 transition group relative overflow-hidden text-center"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {app.icon}
                  </span>
                  <span className="text-[10px] font-medium text-slate-200 mt-1 truncate w-full">
                    {app.name}
                  </span>
                  <span className="text-[8px] text-cyan-400/60 group-hover:text-cyan-300 transition">
                    Open ↗
                  </span>
                </button>
              ))}
            </div>

            {/* CLEAR CHAT BUTTON */}
            <button
              onClick={() => {
                setMessages([]);
                soundFx.playPop(350);
              }}
              className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-red-500/20 hover:border-red-500/50 text-red-400/80 hover:text-red-300 text-xs transition mt-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </aside>

          {/* RIGHT MAIN PANEL (CHAT & STUDIO) */}
          <main className="flex-1 flex flex-col overflow-hidden relative">
            
            {/* ACTIVE STUDIO MODAL / DRAWER (IMAGE, VIDEO, MUSIC, TRANSCRIBE) */}
            {activeStudioTool && (
              <div className="bg-[#061030] border-b border-cyan-400/30 p-4 shrink-0 transition animate-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-3">
                  <div className="flex items-center gap-2">
                    {activeStudioTool === 'image' && <ImageIcon className="w-5 h-5 text-cyan-400" />}
                    {activeStudioTool === 'video' && <Video className="w-5 h-5 text-purple-400" />}
                    {activeStudioTool === 'music' && <Music className="w-5 h-5 text-emerald-400" />}
                    {activeStudioTool === 'transcribe' && <FileAudio className="w-5 h-5 text-amber-400" />}
                    <h3 className="text-sm font-bold font-['Orbitron'] text-cyan-200">
                      {activeStudioTool === 'image' && 'Image Generation & Editing (gemini-3.1-flash-image-preview)'}
                      {activeStudioTool === 'video' && 'Veo 3 Video Generator (veo-3.1-fast-generate-preview)'}
                      {activeStudioTool === 'music' && 'Lyria AI Music Composer (lyria-3-clip-preview & pro)'}
                      {activeStudioTool === 'transcribe' && 'Microphone Audio Transcribe (gemini-3.5-transcribe)'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveStudioTool(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 1. Image Tool UI */}
                {activeStudioTool === 'image' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="E.g. A cybernetic owl perched on a neon skyscraper in 4K sci-fi style..."
                        className="flex-1 px-3 py-2 rounded-xl bg-[#0a143c] border border-cyan-500/30 text-cyan-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                      <div className="flex gap-1.5 items-center">
                        <select
                          value={aspectRatio}
                          onChange={(e: any) => setAspectRatio(e.target.value)}
                          className="px-2.5 py-2 rounded-xl bg-[#0a143c] border border-cyan-500/30 text-cyan-200"
                        >
                          <option value="1:1">1:1 Square</option>
                          <option value="16:9">16:9 Landscape</option>
                          <option value="9:16">9:16 Portrait</option>
                        </select>
                        <label className="cursor-pointer px-3 py-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{selectedImageBase64 ? 'Photo Attached' : 'Attach Photo'}</span>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      </div>
                    </div>
                    {selectedImageBase64 && (
                      <div className="flex items-center gap-2 text-[11px] text-cyan-300">
                        <img src={selectedImageBase64} alt="base" className="w-8 h-8 object-cover rounded-md border border-cyan-400/40" />
                        <span>Base image attached for AI editing. Prompt will edit this photo!</span>
                        <button onClick={() => setSelectedImageBase64(null)} className="text-red-400 underline ml-auto">Remove</button>
                      </div>
                    )}
                    <button
                      onClick={handleGenerateImage}
                      disabled={isGeneratingMedia || !imagePrompt.trim()}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition disabled:opacity-50 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isGeneratingMedia ? 'Generating Image...' : 'Generate Image'}</span>
                    </button>
                  </div>
                )}

                {/* 2. Video Tool UI */}
                {activeStudioTool === 'video' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                        placeholder="E.g. A drone flying through a futuristic holographic city with neon waterfalls..."
                        className="flex-1 px-3 py-2 rounded-xl bg-[#0a143c] border border-cyan-500/30 text-cyan-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                      <div className="flex gap-1.5 items-center">
                        <select
                          value={videoAspectRatio}
                          onChange={(e: any) => setVideoAspectRatio(e.target.value)}
                          className="px-2.5 py-2 rounded-xl bg-[#0a143c] border border-cyan-500/30 text-purple-200"
                        >
                          <option value="16:9">16:9 Landscape</option>
                          <option value="9:16">9:16 Portrait</option>
                        </select>
                        <label className="cursor-pointer px-3 py-2 rounded-xl border border-purple-500/30 bg-purple-950/40 text-purple-300 hover:bg-purple-900/50 flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{selectedImageBase64 ? 'Image Attached' : 'Animate Photo'}</span>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      </div>
                    </div>
                    {selectedImageBase64 && (
                      <div className="flex items-center gap-2 text-[11px] text-purple-300">
                        <img src={selectedImageBase64} alt="base" className="w-8 h-8 object-cover rounded-md border border-purple-400/40" />
                        <span>Starting photo selected. Veo will bring this photo to life into a motion video!</span>
                        <button onClick={() => setSelectedImageBase64(null)} className="text-red-400 underline ml-auto">Remove</button>
                      </div>
                    )}
                    <button
                      onClick={handleGenerateVideo}
                      disabled={isGeneratingMedia || (!videoPrompt.trim() && !selectedImageBase64)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 text-white font-semibold transition disabled:opacity-50 flex items-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      <span>{isGeneratingMedia ? 'Generating Veo Video...' : 'Generate Veo 3 Video'}</span>
                    </button>
                  </div>
                )}

                {/* 3. Music Tool UI */}
                {activeStudioTool === 'music' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={musicPrompt}
                        onChange={(e) => setMusicPrompt(e.target.value)}
                        placeholder="E.g. Upbeat cyberpunk synthwave soundtrack with driving percussion and arpeggios..."
                        className="flex-1 px-3 py-2 rounded-xl bg-[#0a143c] border border-cyan-500/30 text-cyan-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                      <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0a143c] border border-emerald-500/30 text-emerald-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isFullTrackMusic}
                          onChange={(e) => setIsFullTrackMusic(e.target.checked)}
                          className="rounded text-emerald-500"
                        />
                        <span>Full Track (Lyria Pro)</span>
                      </label>
                    </div>
                    <button
                      onClick={handleGenerateMusic}
                      disabled={isGeneratingMedia || !musicPrompt.trim()}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition disabled:opacity-50 flex items-center gap-2"
                    >
                      <Music className="w-4 h-4" />
                      <span>{isGeneratingMedia ? 'Composing Music...' : 'Compose Track with Lyria'}</span>
                    </button>
                  </div>
                )}

                {/* 4. Transcribe Tool UI */}
                {activeStudioTool === 'transcribe' && (
                  <div className="space-y-3 text-xs">
                    <p className="text-slate-300">
                      Record audio using your microphone. \`gemini-3.5-transcribe\` will convert your voice into exact text (Hindi/English/Hinglish).
                    </p>
                    <div className="flex items-center gap-3">
                      {!isTranscribing ? (
                        <button
                          onClick={startRecordingForTranscription}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold"
                        >
                          <Mic className="w-4 h-4" />
                          <span>Start Recording</span>
                        </button>
                      ) : (
                        <button
                          onClick={stopRecordingForTranscription}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-semibold animate-pulse"
                        >
                          <MicOff className="w-4 h-4" />
                          <span>Stop & Transcribe Now</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Progress banner */}
                {isGeneratingMedia && (
                  <div className="mt-3 p-2 rounded-lg bg-cyan-950/60 border border-cyan-400/30 flex items-center gap-2 text-xs text-cyan-300">
                    <Activity className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>{mediaProgressText}</span>
                  </div>
                )}
              </div>
            )}

            {/* CHAT MESSAGES SCROLL AREA */}
            <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 space-y-4">
              
              {/* WELCOME BANNER (when empty or top) */}
              {messages.length <= 1 && (
                <div className="max-w-2xl mx-auto my-3 p-5 rounded-2xl border border-cyan-500/25 bg-[#0a143c]/50 backdrop-blur-sm text-center">
                  <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 mb-2">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h1 className="font-['Orbitron'] text-xl md:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    ECHOMIND AI ASSISTANT
                  </h1>
                  <p className="text-xs md:text-sm text-cyan-200/80 mt-1 max-w-lg mx-auto">
                    ChatGPT-grade intelligence with Gemini Pro/Flash/Lite, Veo video generation, Lyria music, Live voice API aur voice app launcher!
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {quickPrompts.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(chip.prompt)}
                        className="text-xs px-3 py-1.5 rounded-full border border-cyan-500/30 bg-[#0c1844] hover:bg-[#142866] hover:border-cyan-400 text-cyan-200 transition text-left"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MESSAGES LIST */}
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-xs font-bold font-mono ${
                        isUser
                          ? 'bg-purple-950/80 border-purple-400/50 text-purple-300'
                          : 'bg-cyan-950/80 border-cyan-400/50 text-cyan-300'
                      }`}
                    >
                      {isUser ? userName[0]?.toUpperCase() || 'U' : 'EM'}
                    </div>

                    <div className={`max-w-[85%] md:max-w-[75%] space-y-2`}>
                      <div
                        className={`p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed border shadow-lg ${
                          isUser
                            ? 'bg-purple-950/35 border-purple-500/30 text-purple-100 rounded-tr-xs'
                            : 'bg-[#0a143c]/85 border-cyan-500/25 text-[#c8e6ff] rounded-tl-xs'
                        }`}
                      >
                        {/* Text Content */}
                        <div className="space-y-1">{renderMessageContent(msg.content)}</div>

                        {/* Media Output Preview (Image / Video / Music) */}
                        {msg.mediaOutput && (
                          <div className="mt-3 p-2.5 rounded-xl border border-cyan-400/30 bg-[#071333] space-y-2">
                            {msg.mediaOutput.type === 'image' && msg.mediaOutput.url && (
                              <div className="space-y-2">
                                <img
                                  src={msg.mediaOutput.url}
                                  alt="Generated"
                                  className="w-full max-h-[360px] object-contain rounded-lg border border-cyan-500/20 shadow-md"
                                />
                                <div className="flex justify-end">
                                  <a
                                    href={msg.mediaOutput.url}
                                    download="echomind-image.png"
                                    className="flex items-center gap-1 text-[11px] text-cyan-300 hover:text-white px-2.5 py-1 rounded bg-cyan-950/60"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download Image</span>
                                  </a>
                                </div>
                              </div>
                            )}

                            {msg.mediaOutput.type === 'video' && msg.mediaOutput.url && (
                              <div className="space-y-2">
                                <video
                                  src={msg.mediaOutput.url}
                                  controls
                                  autoPlay
                                  loop
                                  className="w-full max-h-[360px] rounded-lg border border-purple-500/20 shadow-md"
                                />
                                <div className="flex justify-end">
                                  <a
                                    href={msg.mediaOutput.url}
                                    download="echomind-veo-video.mp4"
                                    className="flex items-center gap-1 text-[11px] text-purple-300 hover:text-white px-2.5 py-1 rounded bg-purple-950/60"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download Veo MP4</span>
                                  </a>
                                </div>
                              </div>
                            )}

                            {msg.mediaOutput.type === 'music' && msg.mediaOutput.url && (
                              <div className="space-y-2">
                                <audio src={msg.mediaOutput.url} controls className="w-full" />
                                <div className="flex justify-end">
                                  <a
                                    href={msg.mediaOutput.url}
                                    download="echomind-track.wav"
                                    className="flex items-center gap-1 text-[11px] text-emerald-300 hover:text-white px-2.5 py-1 rounded bg-emerald-950/60"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download Audio WAV</span>
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Grounding Search & Maps Links */}
                        {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-cyan-500/20 space-y-1.5">
                            <div className="text-[10px] text-cyan-300/80 font-mono font-semibold uppercase flex items-center gap-1">
                              <Globe className="w-3 h-3 text-cyan-400" />
                              <span>Grounding Citations & Places:</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.groundingLinks.map((link, lIdx) => (
                                <a
                                  key={lIdx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-[10px] text-cyan-200 transition"
                                >
                                  <span className="truncate max-w-[200px]">{link.title}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* App Launch Card */}
                        {msg.appOpened && (
                          <div className="mt-3 p-2.5 rounded-xl border border-cyan-400/30 bg-[#0e1c44]/80 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <span className="text-2xl">{msg.appOpened.icon}</span>
                              <div>
                                <div className="font-semibold text-cyan-300 text-xs md:text-sm">
                                  {msg.appOpened.name}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono truncate max-w-[200px]">
                                  {msg.appOpened.url}
                                </div>
                              </div>
                            </div>
                            <a
                              href={msg.appOpened.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/30 font-medium transition"
                            >
                              <span>Open</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}

                        {/* Assistant Footer Info */}
                        {!isUser && (
                          <div className="flex items-center justify-between pt-2 mt-2 border-t border-cyan-500/15 text-[10px] text-cyan-400/60">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => speakText(msg.content)}
                                className="flex items-center gap-1 hover:text-cyan-300 transition"
                                title="Listen to response"
                              >
                                <Volume2 className="w-3 h-3" />
                                <span>Listen</span>
                              </button>
                              {msg.modelUsed && (
                                <span className="font-mono text-[9px] text-cyan-500/80 px-1 rounded bg-cyan-950/40">
                                  {msg.modelUsed}
                                </span>
                              )}
                            </div>
                            <span>{msg.timestamp}</span>
                          </div>
                        )}
                      </div>

                      {isUser && (
                        <div className="text-[9.5px] text-purple-300/60 text-right mr-1">
                          {msg.timestamp}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Thinking Indicator */}
              {isLoading && (
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-cyan-400/50 bg-cyan-950/80 text-cyan-300 text-xs font-bold font-mono">
                    EM
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-xs bg-[#0a143c]/85 border border-cyan-500/25 flex items-center gap-2">
                    <span className="text-xs text-cyan-300 animate-pulse">
                      EchoMind {chatModelMode.toUpperCase()} thinking
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* INPUT BAR */}
            <div className="p-2.5 md:p-3 bg-[#03071e]/90 border-t border-[#4fc3f7]/20 backdrop-blur-md shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 max-w-4xl mx-auto"
              >
                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center border transition shrink-0 ${
                    isListening
                      ? 'border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse'
                      : 'border-cyan-500/30 bg-[#0a143c] text-cyan-400 hover:border-cyan-400 hover:text-white'
                  }`}
                  title={isListening ? 'Stop Voice Input' : 'Speak Voice Command'}
                >
                  {isListening ? <MicOff className="w-4 h-4 md:w-5 md:h-5" /> : <Mic className="w-4 h-4 md:w-5 md:h-5" />}
                </button>

                {/* Quick Studio Trigger Button */}
                <button
                  type="button"
                  onClick={() => setActiveStudioTool(activeStudioTool ? null : 'image')}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center border border-purple-500/40 bg-[#0d1640] text-purple-300 hover:text-white hover:border-purple-400 transition shrink-0"
                  title="Open Creative Studio (Images, Videos, Music, Transcribe)"
                >
                  <Sparkles className="w-4 h-4" />
                </button>

                {/* Text Input Field */}
                <div className="relative flex-1">
                  <input
                    ref={textInputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    disabled={isLoading}
                    placeholder='Likhke poochho ya 🎙️ se bolo... "open YouTube", "write Python code", "solve math"...'
                    className="w-full h-10 md:h-11 px-3 md:px-4 rounded-xl bg-[#0a143c]/90 border border-cyan-500/30 text-xs md:text-sm text-[#c8e6ff] placeholder:text-[#96b4ff]/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition disabled:opacity-50"
                  />
                </div>

                {/* TTS Toggle Button */}
                <button
                  type="button"
                  onClick={() => {
                    setTtsEnabled(!ttsEnabled);
                    localStorage.setItem('em_tts', String(!ttsEnabled));
                  }}
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center border transition shrink-0 ${
                    ttsEnabled
                      ? 'border-cyan-500/40 bg-[#0a143c] text-cyan-300'
                      : 'border-slate-700 bg-slate-900/50 text-slate-500'
                  }`}
                  title={ttsEnabled ? 'Voice output active' : 'Voice output muted'}
                >
                  {ttsEnabled ? <Volume2 className="w-4 h-4 md:w-5 md:h-5" /> : <VolumeX className="w-4 h-4 md:w-5 md:h-5" />}
                </button>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isLoading}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center border border-cyan-400/40 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 hover:from-cyan-500/50 hover:to-purple-500/50 text-cyan-300 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-[0_0_12px_rgba(79,195,247,0.2)]"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>

      {/* USER PROFILE & FIREBASE AUTH MODAL */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm p-5 rounded-2xl bg-[#060f2e] border border-cyan-400/30 shadow-[0_0_40px_rgba(79,195,247,0.2)] space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold text-xs">
                  {userName[0]?.toUpperCase() || 'P'}
                </div>
                <h3 className="font-['Orbitron'] text-sm font-bold text-cyan-300">USER PROFILE & AUTH</h3>
              </div>
              <button onClick={() => setIsAuthModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-semibold text-slate-400">User Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0a143c] border border-cyan-500/30 text-cyan-100 mt-1"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-semibold text-slate-400">Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0a143c] border border-cyan-500/30 text-cyan-100 mt-1"
                />
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-cyan-200">
                <span>EchoMind AI stores your preferences, session context, and created media locally in your browser.</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-cyan-500/20">
              <button
                onClick={() => {
                  localStorage.setItem('em_user_name', userName);
                  localStorage.setItem('em_user_email', userEmail);
                  setIsAuthModalOpen(false);
                  soundFx.playPop(500);
                }}
                className="px-4 py-2 text-xs rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#060f2e] border border-cyan-400/30 shadow-[0_0_40px_rgba(79,195,247,0.2)] space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-400" />
                <h3 className="font-['Orbitron'] text-sm font-bold tracking-wider text-cyan-300">
                  ECHOMIND SETTINGS
                </h3>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#09153a] border border-cyan-500/20">
                <div>
                  <div className="font-semibold text-cyan-100">Voice Output (TTS)</div>
                  <div className="text-[10px] text-slate-400">Assistant answers spoken aloud</div>
                </div>
                <button
                  onClick={() => {
                    setTtsEnabled(!ttsEnabled);
                    localStorage.setItem('em_tts', String(!ttsEnabled));
                  }}
                  className={`w-12 h-6 rounded-full transition relative p-0.5 ${ttsEnabled ? 'bg-cyan-500' : 'bg-slate-700'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${ttsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#09153a] border border-cyan-500/20 space-y-1">
                <div className="font-semibold text-cyan-200">Active Gemini Models:</div>
                <ul className="text-[11px] text-slate-400 space-y-0.5 list-disc list-inside">
                  <li><strong>Complex Chat:</strong> gemini-3.1-pro-preview</li>
                  <li><strong>General Chat & Grounding:</strong> gemini-3.5-flash</li>
                  <li><strong>Fast Chat:</strong> gemini-3.1-flash-lite</li>
                  <li><strong>Live Real-time Audio:</strong> gemini-3.8-live</li>
                  <li><strong>Image Studio:</strong> gemini-3.1-flash-image-preview</li>
                  <li><strong>Veo 3 Video:</strong> veo-3.1-fast-generate-preview</li>
                  <li><strong>Music:</strong> lyria-3-clip-preview & lyria-3-pro-preview</li>
                  <li><strong>Audio Transcribe:</strong> gemini-3.5-transcribe</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-cyan-500/20">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 text-xs rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE APP INSTALL & PLAY STORE PUBLISH MODAL */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#060f2e] border border-cyan-400/30 shadow-[0_0_40px_rgba(79,195,247,0.3)] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                <h3 className="font-['Orbitron'] text-sm font-bold tracking-wider text-cyan-300">
                  MOBILE APP & PUBLISHING GUIDE
                </h3>
              </div>
              <button onClick={() => setIsPublishModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* PWA Install Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 to-purple-950/40 border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-3">
                <img src="/icon-192.svg" alt="EchoMind App Icon" className="w-12 h-12 rounded-xl shadow-lg border border-cyan-400/50" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-cyan-200">EchoMind AI Mobile App</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                      PWA Active
                    </span>
                  </div>
                  <p className="text-xs text-cyan-200/80 mt-1">
                    Bina Google Play Store ke bhi seedha phone ki home screen par install karein!
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={handleInstallPWA}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition shadow-[0_0_15px_rgba(79,195,247,0.4)]"
                >
                  <Download className="w-4 h-4" />
                  <span>Install App Now</span>
                </button>

                <button
                  onClick={() => setIsMobileSimMode(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-purple-400/40 bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 text-xs transition"
                >
                  <Smartphone className="w-4 h-4 text-purple-400" />
                  <span>Open Mobile Simulator</span>
                </button>
              </div>
            </div>

            {/* Direct App Link for Mobile */}
            <div className="p-3 rounded-xl bg-[#09153a] border border-cyan-500/25 space-y-2 text-xs">
              <div className="flex items-center justify-between text-cyan-300 font-semibold">
                <span>📱 Direct Mobile Link (Apne phone ke browser mein kholo):</span>
                <span className="text-[10px] text-emerald-400 font-mono">LIVE / PUBLIC</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="https://ais-pre-cjebsmixwxhhp3pvr5ztld-823553588499.asia-southeast1.run.app"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#040a20] border border-cyan-500/30 text-cyan-200 text-xs font-mono select-all"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("https://ais-pre-cjebsmixwxhhp3pvr5ztld-823553588499.asia-southeast1.run.app");
                    alert("✅ Link copied! Phone ke Chrome ya Safari mein paste karo.");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition shrink-0"
                >
                  Copy Link
                </button>
              </div>
              <p className="text-[10.5px] text-amber-300/90">
                ⚠️ <strong>Note:</strong> Dev preview iframe ke andar browser direct install prompt block kar deta hai. Is live link ko phone ke <strong>Google Chrome</strong> ya <strong>Safari</strong> mein kholkar install karein!
              </p>
            </div>
            <div className="space-y-3 text-xs">
              <div className="font-semibold text-cyan-300 flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Mobile Phone par kaise use karein?</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <div className="p-3 rounded-xl bg-[#09153a] border border-cyan-500/20 space-y-1">
                  <div className="font-semibold text-cyan-200">🤖 Android (Chrome/Edge):</div>
                  <p className="text-[11px] text-slate-400">
                    1. Browser ke 3 dots (⋮) par tap karein.<br />
                    2. <strong>"Install app"</strong> ya <strong>"Add to Home screen"</strong> select karein.<br />
                    3. App icon phone launcher mein aa jayega!
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#09153a] border border-purple-500/20 space-y-1">
                  <div className="font-semibold text-purple-200">🍎 iPhone / iOS (Safari):</div>
                  <p className="text-[11px] text-slate-400">
                    1. Safari mein Share icon (⎋) par tap karein.<br />
                    2. Scroll karke <strong>"Add to Home Screen"</strong> dabayein.<br />
                    3. Standalone app launch hoga without browser bar!
                  </p>
                </div>
              </div>
            </div>

            {/* Google Play Store / APK Generation Guide */}
            <div className="p-3.5 rounded-xl bg-[#09153a] border border-cyan-500/20 space-y-2 text-xs">
              <div className="font-semibold text-cyan-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Google Play Store par Publish karne ka process:</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                EchoMind AI standard Progressive Web App (PWA) manifest aur service worker ke sath fully compliant hai. Iska Android APK / AAB package 2 minute mein generate kiya ja sakta hai:
              </p>
              <ol className="list-decimal list-inside text-[11px] text-slate-400 space-y-1">
                <li><strong className="text-cyan-200">PWABuilder.com</strong> (Official Microsoft Tool) par jaayein.</li>
                <li>Apna app URL paste karein aur <strong>"Build My APK"</strong> par click karein.</li>
                <li>Signed Android App Bundle (.aab) download karke Google Play Console par upload kar dein!</li>
              </ol>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href="https://www.pwabuilder.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 underline"
                >
                  <span>Open PWABuilder.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="/manifest.json"
                  target="_blank"
                  className="text-xs text-purple-300 hover:text-white underline font-mono"
                >
                  View Web Manifest
                </a>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-cyan-500/20">
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="px-4 py-2 text-xs rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
