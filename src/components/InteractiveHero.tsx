import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowDown, ExternalLink, Mail, Github, Linkedin, MousePointer, Terminal, UserCheck, Upload, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { CharacterPose } from '../types/portfolio';
import { soundFx } from '../utils/audio';

// Realistic 3D character images crafted with Prashant's exact features (hair, mustache, shirt)
import centerWaveImg from '../assets/images/prashant_real_center_wave_1790279025160.jpg';
import lookLeftImg from '../assets/images/prashant_real_look_left_1790279040256.jpg';
import lookRightImg from '../assets/images/prashant_real_look_right_1790279051548.jpg';
import typingImg from '../assets/images/prashant_real_typing_work_1790279079322.jpg';
import pointImg from '../assets/images/prashant_real_point_laptop_1790279064627.jpg';
import realPortraitImg from '../assets/images/prashant_real_portrait_1790279091550.jpg';

interface InteractiveHeroProps {
  onOpenResume: () => void;
  onOpenAssistant: () => void;
}

const POSE_IMAGES: Record<CharacterPose, string> = {
  center: centerWaveImg,
  left: lookLeftImg,
  right: lookRightImg,
  typing: typingImg,
  pointing: pointImg,
};

const POSE_DIALOGUES: Record<CharacterPose, { text: string; sub: string }> = {
  center: {
    text: "Namaste! I'm Prashant 👋",
    sub: "Welcome to my reactive 3D portfolio! Move your cursor around to interact.",
  },
  left: {
    text: "Looking to the left! 👀",
    sub: "Check out my background, education & Amazon experience.",
  },
  right: {
    text: "Looking to the right! 👉",
    sub: "Explore my PayNest wallet demo, EchoMind AI, and certifications!",
  },
  pointing: {
    text: "Check out what I've built! 🚀",
    sub: "Live interactive project prototypes are waiting below.",
  },
  typing: {
    text: "Focus mode: building code... 💻",
    sub: "AI algorithms, data pipelines, and responsive web engines.",
  },
};

export const InteractiveHero: React.FC<InteractiveHeroProps> = ({ onOpenResume, onOpenAssistant }) => {
  const [currentPose, setCurrentPose] = useState<CharacterPose>('center');
  const [displayMode, setDisplayMode] = useState<'avatar' | 'portrait'>('avatar');
  const [customPhoto, setCustomPhoto] = useState<string | null>(() => {
    return localStorage.getItem('prashant_custom_photo') || null;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number; pctX: number; pctY: number }>({
    x: 0,
    y: 0,
    pctX: 50,
    pctY: 50,
  });
  const [isManualOverride, setIsManualOverride] = useState(false);
  const [isHoveringLaptop, setIsHoveringLaptop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastPoseRef = useRef<CharacterPose>('center');

  // Handle custom photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomPhoto(result);
        localStorage.setItem('prashant_custom_photo', result);
        setDisplayMode('portrait');
        soundFx.playWaveChime();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setCustomPhoto(null);
    localStorage.removeItem('prashant_custom_photo');
    setDisplayMode('avatar');
    soundFx.playPop(450);
  };

  // Clear idle timer
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      if (!isManualOverride && !isHoveringLaptop && displayMode === 'avatar') {
        setCurrentPose('typing');
      }
    }, 4500);
  }, [isManualOverride, isHoveringLaptop, displayMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = Math.round((x / rect.width) * 100);
    const pctY = Math.round((y / rect.height) * 100);

    setMousePos({ x, y, pctX, pctY });
    resetIdleTimer();

    if (isManualOverride) return;

    if (isHoveringLaptop) {
      if (currentPose !== 'pointing') {
        setCurrentPose('pointing');
        soundFx.playPop(520);
      }
      return;
    }

    // Zone detection matching the video demo:
    // Left zone: pctX < 36%
    // Right zone: pctX > 64%
    // Center zone: 36% <= pctX <= 64%
    let newPose: CharacterPose = 'center';
    if (pctX < 36) {
      newPose = 'left';
    } else if (pctX > 64) {
      newPose = 'right';
    } else {
      newPose = 'center';
    }

    if (newPose !== lastPoseRef.current) {
      lastPoseRef.current = newPose;
      setCurrentPose(newPose);
      if (newPose === 'center') {
        soundFx.playWaveChime();
      } else {
        soundFx.playPop(newPose === 'left' ? 440 : 480);
      }
    }
  };

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  const handleManualPose = (pose: CharacterPose) => {
    setIsManualOverride(true);
    setCurrentPose(pose);
    lastPoseRef.current = pose;
    soundFx.playPop(560);
    // Return to auto tracking after 6 seconds
    setTimeout(() => {
      setIsManualOverride(false);
    }, 6000);
  };

  // 3D tilt calculation
  const tiltX = (mousePos.pctY - 50) * -0.15; // Max +-7.5deg
  const tiltY = (mousePos.pctX - 50) * 0.18;  // Max +-9deg

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#fafaf8] via-[#f7f7f4] to-[#f2f2ee]"
    >
      {/* Subtle ambient light gradient background */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-amber-50/60 via-indigo-50/30 to-transparent rounded-full blur-3xl"
        style={{
          transform: `translate(calc(-50% + ${(mousePos.pctX - 50) * 0.5}px), ${(mousePos.pctY - 50) * 0.3}px)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Identity & Bio (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-6 z-10">
          
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#63636e]">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Available for Internships & AI Roles</span>
          </div>

          {/* Main Title & Domain Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1a1a1e] leading-[1.08] text-balance">
              Prashant Kumar Chahar
            </h1>
            <p className="text-lg sm:text-xl font-medium text-[#4a4a54] font-display">
              AI Engineering Student <span className="text-[#8e8e93]">·</span> AI & Data Science <span className="text-[#8e8e93]">·</span> Web Developer
            </p>
          </div>

          {/* Resume Summary Excerpt */}
          <p className="text-sm sm:text-base text-[#5c5c66] leading-relaxed max-w-xl">
            B.Tech AI Engineering student at <strong className="font-semibold text-[#1a1a1e]">Parul University</strong> (2023–2027) with hands-on exposure in Python, ML, NLP, and modern Web Development. Currently working as a Chat Support Executive for <strong className="font-semibold text-[#1a1a1e]">Amazon NA MU Process at Concentrix</strong>.
          </p>

          {/* Interactive Reactivity Badge / Tooltip */}
          <div className="p-3.5 bg-white/80 border border-[#e6e6e2] rounded-xl shadow-xs transition-all flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#f4f4f0] text-[#1a1a1e] shrink-0">
              <MousePointer className="w-4 h-4 text-emerald-600 animate-bounce" />
            </div>
            <div className="space-y-0.5 text-xs">
              <p className="font-semibold text-[#1a1a1e]">
                Interactive 3D Avatar Active
              </p>
              <p className="text-[#6c6c76]">
                Move your cursor left, center, or right across the screen to see me look around and wave at you!
              </p>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              onClick={() => soundFx.playPop(520)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1a1a1e] hover:bg-[#2d2d34] active:scale-[0.98] rounded-xl shadow-sm transition-all"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                soundFx.playPop(580);
                onOpenAssistant();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#1a1a1e] bg-white hover:bg-[#f5f5f1] border border-[#d8d8d2] active:scale-[0.98] rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-indigo-600" />
              <span>Ask EchoMind AI</span>
            </button>

            <button
              onClick={() => {
                soundFx.playPop(600);
                onOpenResume();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[#4a4a54] hover:text-[#1a1a1e] hover:bg-[#ecece6] rounded-xl transition-all cursor-pointer"
            >
              <span>View Resume</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Social Links & Quick Contact info */}
          <div className="pt-2 flex items-center gap-4 text-xs text-[#6e6e78]">
            <a
              href="https://github.com/Prashantkumar6398"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#1a1a1e] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-[#c8c8c2]">/</span>
            <a
              href="https://linkedin.com/in/prashant-kumar-chahar"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#1a1a1e] transition-colors"
            >
              <Linkedin className="w-4 h-4 text-blue-600" />
              <span>LinkedIn</span>
            </a>
            <span className="text-[#c8c8c2]">/</span>
            <a
              href="mailto:chaharprashant94@gmail.com"
              className="flex items-center gap-1.5 hover:text-[#1a1a1e] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

        </div>

        {/* Right Column: The 3D Interactive Avatar Stage (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          
          {/* Top Control Bar: Display Mode Toggle & Upload Photo */}
          <div className="w-full max-w-xl flex items-center justify-between mb-3 px-1 gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1 p-1 bg-[#f0f0eb] rounded-xl border border-[#e2e2dc] text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  soundFx.playPop(480);
                  setDisplayMode('avatar');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  displayMode === 'avatar' && !customPhoto
                    ? 'bg-white text-[#1a1a1e] shadow-xs'
                    : 'text-[#60606a] hover:text-[#1a1a1e]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>3D Reactive Avatar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playPop(510);
                  setDisplayMode('portrait');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  displayMode === 'portrait'
                    ? 'bg-white text-[#1a1a1e] shadow-xs'
                    : 'text-[#60606a] hover:text-[#1a1a1e]'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>{customPhoto ? 'Custom Photo Active' : 'Studio Portrait'}</span>
              </button>
            </div>

            {/* Upload your exact photo button */}
            <div className="flex items-center gap-1.5">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => {
                  soundFx.playPop(520);
                  fileInputRef.current?.click();
                }}
                title="Upload your exact original photo (e.g. WhatsApp photo)"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-[#d8d8d2] hover:bg-[#f6f6f2] text-xs font-medium text-[#2d2d34] rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#5e5e68]" />
                <span>{customPhoto ? 'Change Photo' : 'Upload Exact Photo'}</span>
              </button>

              {customPhoto && (
                <button
                  type="button"
                  onClick={handleResetPhoto}
                  title="Reset to default 3D avatar"
                  className="p-1.5 text-xs text-[#70707c] hover:text-[#1a1a1e] bg-white border border-[#d8d8d2] rounded-xl hover:bg-[#f6f6f2] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Reactive Speech Bubble */}
          <motion.div
            key={displayMode === 'portrait' ? 'portrait-bubble' : currentPose}
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 z-20 max-w-sm w-full"
          >
            <div className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#e2e2dd] shadow-md relative">
              {/* Little speech pointer downwards */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-[#e2e2dd] rotate-45" />
              
              <div className="flex items-start gap-2.5">
                <span className="p-1 rounded-md bg-amber-50 text-amber-700 text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#1a1a1e]">
                    {displayMode === 'portrait'
                      ? "Prashant Kumar Chahar 📸"
                      : POSE_DIALOGUES[currentPose].text}
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#666670] mt-0.5">
                    {displayMode === 'portrait'
                      ? (customPhoto ? "Showing your original uploaded photo with live 3D tilt!" : "AI Engineering Student & Amazon Process Chat Support Executive.")
                      : POSE_DIALOGUES[currentPose].sub}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3D Perspective Card Container */}
          <div
            className="relative w-full max-w-xl aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-white border border-[#e6e6e0] transition-transform duration-150 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transformStyle: 'preserve-3d',
            }}
            onMouseEnter={() => setIsHoveringLaptop(true)}
            onMouseLeave={() => setIsHoveringLaptop(false)}
          >
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#f1f1eb] via-transparent to-white/40 pointer-events-none" />

            {/* Avatar / Portrait Image with Smooth Cross-Fade */}
            <AnimatePresence mode="wait">
              {displayMode === 'portrait' ? (
                <motion.img
                  key={customPhoto ? 'custom-photo' : 'real-portrait'}
                  src={customPhoto || realPortraitImg}
                  alt="Prashant Kumar Chahar Portrait"
                  initial={{ opacity: 0.7, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.7, scale: 1.01 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <motion.img
                  key={currentPose}
                  src={POSE_IMAGES[currentPose]}
                  alt={`Prashant Kumar Chahar 3D avatar pose: ${currentPose}`}
                  initial={{ opacity: 0.7, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.7, scale: 1.01 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              )}
            </AnimatePresence>

            {/* Subtle Glare Overlay responding to mouse position */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-br from-white via-transparent to-black/10"
              style={{
                transform: `translate(${(mousePos.pctX - 50) * 0.2}%, ${(mousePos.pctY - 50) * 0.2}%)`,
              }}
            />

            {/* Interactive zone labels on bottom edge */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-xl text-[10px] sm:text-xs font-mono text-white/90">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase tracking-wider">
                  {displayMode === 'portrait' ? (customPhoto ? 'Original Photo' : 'Studio Likeness') : `Pose: ${currentPose}`}
                </span>
              </div>
              <div className="tabular-nums">
                X: {mousePos.pctX}% · Y: {mousePos.pctY}%
              </div>
            </div>
          </div>

          {/* Interactive Pose Buttons for Touch / Direct Testing (Available in Avatar Mode) */}
          {displayMode === 'avatar' && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-white/90 border border-[#e6e6e0] rounded-2xl shadow-xs">
              <span className="text-[11px] font-medium text-[#7c7c86] px-2">3D Poses:</span>
              <button
                onClick={() => handleManualPose('center')}
                className={`px-3 py-1 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  currentPose === 'center'
                    ? 'bg-[#1a1a1e] text-white shadow-xs'
                    : 'text-[#4e4e56] hover:bg-[#f2f2ee]'
                }`}
              >
                Wave 👋
              </button>
              <button
                onClick={() => handleManualPose('left')}
                className={`px-3 py-1 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  currentPose === 'left'
                    ? 'bg-[#1a1a1e] text-white shadow-xs'
                    : 'text-[#4e4e56] hover:bg-[#f2f2ee]'
                }`}
              >
                Look Left 👀
              </button>
              <button
                onClick={() => handleManualPose('right')}
                className={`px-3 py-1 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  currentPose === 'right'
                    ? 'bg-[#1a1a1e] text-white shadow-xs'
                    : 'text-[#4e4e56] hover:bg-[#f2f2ee]'
                }`}
              >
                Look Right 👉
              </button>
              <button
                onClick={() => handleManualPose('pointing')}
                className={`px-3 py-1 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  currentPose === 'pointing'
                    ? 'bg-[#1a1a1e] text-white shadow-xs'
                    : 'text-[#4e4e56] hover:bg-[#f2f2ee]'
                }`}
              >
                Point 🎯
              </button>
              <button
                onClick={() => handleManualPose('typing')}
                className={`px-3 py-1 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  currentPose === 'typing'
                    ? 'bg-[#1a1a1e] text-white shadow-xs'
                    : 'text-[#4e4e56] hover:bg-[#f2f2ee]'
                }`}
              >
                Coding 💻
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
