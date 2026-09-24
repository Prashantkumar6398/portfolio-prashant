import React from 'react';
import { GraduationCap, Award, Brain, CheckCircle2, Clock, UserCheck } from 'lucide-react';
import realPortraitImg from '../assets/images/prashant_real_portrait_1790279091550.jpg';
import { soundFx } from '../utils/audio';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#e8e8e2]">
      {/* Section Header */}
      <div className="space-y-2 mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#7c7c86]">
          01. Background & Philosophy
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a1a1e] font-display">
          Engineering Intelligence from Data to Production
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Bio Narrative */}
        <div className="lg:col-span-7 space-y-6 text-[#4d4d57] leading-relaxed text-base">
          <div className="flex items-center gap-4 p-4 bg-white border border-[#e4e4dd] rounded-2xl shadow-xs">
            <img
              src={realPortraitImg}
              alt="Prashant Kumar Chahar"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#deded8] shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[#1a1a1e] font-display">
                  Prashant Kumar Chahar
                </h3>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  Verified Profile
                </span>
              </div>
              <p className="text-xs text-[#62626e]">
                AI Engineering Student @ Parul University & Concentrix Amazon NA Process Support Executive.
              </p>
              <div className="text-[11px] font-mono text-[#8a8a96]">
                Agra, UP / Vadodara, Gujarat · +91 63985 20981
              </div>
            </div>
          </div>

          <p>
            I am a B.Tech Artificial Intelligence Engineering student at <strong className="font-semibold text-[#1a1a1e]">Parul University, Vadodara</strong> (2023–2027), with industry-tested internship experience in AI, Data Science, and modern Web Development.
          </p>
          <p>
            Currently, I thrive in a dual-focus role: I work as a <strong className="font-semibold text-[#1a1a1e]">Chat Support Executive for Amazon's North America Marketplace (NA MU) at Concentrix</strong> during high-intensity night shifts, while advancing my final year engineering studies by day. This demanding routine has honed my real-time problem-solving skills, operational resilience, and customer-first precision under pressure.
          </p>
          <p>
            My engineering work spans the full stack of modern applications: from training ML pipelines and orchestrating conversational AI prompts with Python and NLP, to engineering crisp, interactive user experiences with HTML5, CSS3, and JavaScript.
          </p>

          {/* Strengths List with clean unboxed typography */}
          <div className="pt-4 border-t border-[#e8e8e2]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1e] mb-3">
              Core Strengths
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-[#383840]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Problem Solving</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Quantitative Aptitude</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Logical Reasoning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Teamwork & Agility</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Customer Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Quick Learning</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Education & Milestones Card */}
        <div className="lg:col-span-5 bg-white border border-[#e2e2dc] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#ededeb]">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-[#1a1a1e]" />
              <h3 className="text-lg font-bold text-[#1a1a1e]">Education</h3>
            </div>
            <span className="text-xs font-mono text-[#787884] tabular-nums">2019–2027</span>
          </div>

          <div className="space-y-6">
            {/* Degree */}
            <div className="relative pl-5 border-l-2 border-[#1a1a1e] space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[#1a1a1e]">
                  B.Tech, Artificial Intelligence Engineering
                </h4>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  2023–2027
                </span>
              </div>
              <p className="text-xs text-[#5f5f6b]">
                Parul University, Vadodara, Gujarat
              </p>
              <p className="text-xs text-[#7c7c88] pt-1">
                Specializing in AI architectures, Machine Learning fundamentals, conversational systems, data structures and web development.
              </p>
            </div>

            {/* Class XII */}
            <div className="relative pl-5 border-l-2 border-[#d0d0c8] space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[#1a1a1e]">
                  Class XII (CBSE)
                </h4>
                <span className="text-xs font-mono text-[#5f5f6b]">
                  64.0% · 2021–2022
                </span>
              </div>
              <p className="text-xs text-[#5f5f6b]">
                SG Public School, Akola, Agra
              </p>
            </div>

            {/* Class X */}
            <div className="relative pl-5 border-l-2 border-[#d0d0c8] space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[#1a1a1e]">
                  Class X (CBSE)
                </h4>
                <span className="text-xs font-mono text-[#5f5f6b]">
                  69.4% · 2019–2020
                </span>
              </div>
              <p className="text-xs text-[#5f5f6b]">
                SG Public School, Akola, Agra
              </p>
            </div>
          </div>

          {/* Quick Highlight Banner */}
          <div className="p-3.5 bg-[#f6f6f2] rounded-xl flex items-start gap-3 text-xs text-[#4e4e58]">
            <Clock className="w-4 h-4 text-[#1a1a1e] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#1a1a1e]">Amazon NA MU Experience:</span>
              <p className="text-[11px] text-[#636370] mt-0.5">
                Managing high-volume live chat interactions with international customers, resolving real-time fulfillment and seller inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
