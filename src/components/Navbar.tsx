import React from 'react';
import { Volume2, VolumeX, FileText } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMuted, onToggleMute, onOpenResume }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#fafaf8]/90 backdrop-blur-md border-b border-[#e6e6e2] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single Wordmark */}
        <a 
          href="#hero" 
          onClick={() => soundFx.playPop(520)}
          className="group flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-[#1a1a1e]"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-display">Prashant Kumar Chahar</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5c5c66]">
          <a
            href="#about"
            onClick={() => soundFx.playPop(480)}
            className="hover:text-[#1a1a1e] transition-colors relative py-1 hover:underline underline-offset-4"
          >
            About
          </a>
          <a
            href="#experience"
            onClick={() => soundFx.playPop(500)}
            className="hover:text-[#1a1a1e] transition-colors relative py-1 hover:underline underline-offset-4"
          >
            Experience
          </a>
          <a
            href="#projects"
            onClick={() => soundFx.playPop(520)}
            className="hover:text-[#1a1a1e] transition-colors relative py-1 hover:underline underline-offset-4"
          >
            Projects
          </a>
          <a
            href="#skills"
            onClick={() => soundFx.playPop(540)}
            className="hover:text-[#1a1a1e] transition-colors relative py-1 hover:underline underline-offset-4"
          >
            Skills
          </a>
          <a
            href="#certifications"
            onClick={() => soundFx.playPop(560)}
            className="hover:text-[#1a1a1e] transition-colors relative py-1 hover:underline underline-offset-4"
          >
            Credentials
          </a>
          <a
            href="#contact"
            onClick={() => soundFx.playPop(580)}
            className="hover:text-[#1a1a1e] transition-colors relative py-1 hover:underline underline-offset-4"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
            className="p-2 text-[#5c5c66] hover:text-[#1a1a1e] hover:bg-[#eaeae4] rounded-lg transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              soundFx.playPop(600);
              onOpenResume();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1a1a1e] hover:bg-[#2e2e34] active:scale-[0.98] rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};
