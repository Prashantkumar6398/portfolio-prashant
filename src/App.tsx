/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InteractiveHero } from './components/InteractiveHero';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { EchoMindFullAssistant } from './components/EchoMindFullAssistant';
import { soundFx } from './utils/audio';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'assistant' | 'portfolio'>('assistant');
  const [isMuted, setIsMuted] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const toggleMute = () => {
    soundFx.isMuted = !soundFx.isMuted;
    setIsMuted(soundFx.isMuted);
    if (!soundFx.isMuted) {
      soundFx.playPop(520);
    }
  };

  // If in Assistant view mode (Default & Primary experience as requested by user)
  if (viewMode === 'assistant') {
    return (
      <EchoMindFullAssistant
        onSwitchToPortfolio={() => {
          soundFx.playPop(550);
          setViewMode('portfolio');
        }}
      />
    );
  }

  // Portfolio view mode
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8] text-[#1a1a1e]">
      {/* Return to EchoMind Assistant Banner */}
      <div className="bg-[#03071e] text-cyan-300 px-4 py-2 text-xs flex items-center justify-between border-b border-cyan-500/30">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-semibold font-['Orbitron']">EchoMind AI Assistant is running</span>
          <span className="hidden sm:inline text-slate-400">— Voice commands & App launcher ready</span>
        </div>
        <button
          onClick={() => {
            soundFx.playPop(580);
            setViewMode('assistant');
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Launch EchoMind AI</span>
        </button>
      </div>

      {/* Navigation */}
      <Navbar
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Interactive 3D Hero */}
        <InteractiveHero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenAssistant={() => setViewMode('assistant')}
        />

        {/* About & Education */}
        <AboutSection />

        {/* Experience & Internships */}
        <ExperienceSection />

        {/* Projects with live simulations */}
        <ProjectsSection />

        {/* Skills & Capabilities */}
        <SkillsSection />

        {/* Certifications & Simulations */}
        <CertificationsSection />

        {/* Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Verified Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
