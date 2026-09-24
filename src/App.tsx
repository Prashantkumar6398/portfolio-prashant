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
import { EchoMindAssistant } from './components/EchoMindAssistant';
import { soundFx } from './utils/audio';

export default function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const toggleMute = () => {
    soundFx.isMuted = !soundFx.isMuted;
    setIsMuted(soundFx.isMuted);
    if (!soundFx.isMuted) {
      soundFx.playPop(520);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8] text-[#1a1a1e]">
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
          onOpenAssistant={() => setIsAssistantOpen(true)}
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

      {/* EchoMind AI Interactive Assistant */}
      <EchoMindAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
}
