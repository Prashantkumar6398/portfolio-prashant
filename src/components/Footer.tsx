import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playPop(560);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#e8e8e2] bg-[#f4f4ee] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-display font-bold text-sm sm:text-base text-[#1a1a1e]">
            Prashant Kumar Chahar
          </div>
          <p className="text-xs text-[#6e6e78]">
            AI Engineering Student · Parul University · Vadodara, Gujarat
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#60606c]">
          <a
            href="https://github.com/Prashantkumar6398"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#1a1a1e] transition-colors"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href="https://linkedin.com/in/prashant-kumar-chahar"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#1a1a1e] transition-colors"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href="mailto:chaharprashant94@gmail.com"
            className="hover:text-[#1a1a1e] transition-colors"
          >
            Email
          </a>
          <span>·</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-[#1a1a1e] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
