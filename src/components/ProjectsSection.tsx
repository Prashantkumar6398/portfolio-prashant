import React, { useState } from 'react';
import { ExternalLink, Github, Play, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { Project } from '../types/portfolio';
import { ProjectDemoModal } from './ProjectDemoModal';
import { soundFx } from '../utils/audio';

const PROJECTS: Project[] = [
  {
    id: 'paynest',
    title: 'PayNest — Demo Wallet App',
    subtitle: 'UPI-Style Mobile Payment Simulator',
    description:
      'A full-featured UPI-style digital wallet simulating real-time peer-to-peer money transfers, dynamic QR code payments, balance ledger, and instant transaction logs with zero server latency.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'DOM State Engine', 'GitHub Pages'],
    githubUrl: 'https://github.com/Prashantkumar6398/paynest',
    liveUrl: 'https://prashantkumar6398.github.io/paynest',
    interactiveType: 'paynest',
    highlights: [
      'Engineered pure JavaScript real-time DOM state management for instant balance recalculation.',
      'Implemented dynamic QR-code transaction simulation and validation.',
      'Designed a mobile-first, native fintech wallet UI with responsive touch feedback.',
    ],
  },
  {
    id: 'echomind',
    title: 'EchoMind AI',
    subtitle: 'Conversational Context-Aware Intelligence Engine',
    description:
      'An AI-powered conversational assistant that processes multi-turn prompts and generates context-aware, grounded responses utilizing NLP algorithms and API orchestration.',
    technologies: ['Python', 'NLP', 'AI APIs', 'Prompt Design', 'JSON Schema'],
    interactiveType: 'echomind',
    highlights: [
      'Architected prompt engineering templates for reliable entity extraction and contextual reasoning.',
      'Integrated external REST AI endpoints with error recovery fallbacks.',
      'Implemented conversational state preservation across multi-step user sessions.',
    ],
  },
  {
    id: 'expense-tracker',
    title: 'Smart Expense Tracker',
    subtitle: 'Browser-Based Personal Finance Tool',
    description:
      'Interactive financial management application built as an engineering minor project for logging expenditures, automated categorization, and real-time visual spending trend analytics.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'Data Visualization'],
    interactiveType: 'tracker',
    highlights: [
      'Automated category breakdown with dynamic percentage charts.',
      'Persistent client-side data storage with zero external dependencies.',
      'Clean tabular ledger with filterable date and category breakdowns.',
    ],
  },
  {
    id: 'portfolio-site',
    title: 'Responsive Web Portfolio',
    subtitle: 'Modern Clean UI & Interactive Experience',
    description:
      'Engineered during internship at InAmigos Foundation, focused on responsive layout math, accessible typography, fast load times, and fluid touch interactions across desktop and mobile.',
    technologies: ['Responsive Design', 'Modern CSS', 'JavaScript', 'Web Performance'],
    highlights: [
      'Engineered seamless multi-breakpoint responsive grid structures.',
      'WCAG AA compliant color contrast and semantic HTML architecture.',
      'High client retention through fast rendering and interactive micro-states.',
    ],
  },
];

export const ProjectsSection: React.FC = () => {
  const [activeDemoProject, setActiveDemoProject] = useState<Project | null>(null);

  const handleOpenDemo = (project: Project) => {
    soundFx.playWaveChime();
    setActiveDemoProject(project);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#e8e8e2]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c7c86]">
            03. Engineering Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a1a1e] font-display">
            Featured Projects & Interactive Prototypes
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#666670] max-w-md">
          Every project features tested source code. Click <strong className="text-[#1a1a1e]">"Test Interactive Demo"</strong> on any project to try the simulator right inside this page!
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="group bg-white border border-[#e2e2dc] hover:border-[#b8b8ae] rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-sm"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-medium text-[#7c7c88]">
                    {project.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a1e] font-display group-hover:text-indigo-950 transition-colors">
                    {project.title}
                  </h3>
                </div>
                {project.interactiveType && (
                  <button
                    onClick={() => handleOpenDemo(project)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all border border-emerald-200 cursor-pointer shrink-0"
                  >
                    <Play className="w-3 h-3 fill-emerald-700 text-emerald-700" />
                    <span>Interactive Demo</span>
                  </button>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#50505c] leading-relaxed">
                {project.description}
              </p>

              {/* Key Engineering Highlights */}
              <div className="space-y-2 pt-2 border-t border-[#f0f0eb]">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#888894]">
                  Key Highlights
                </span>
                <ul className="space-y-1.5 text-xs text-[#52525d]">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies unboxed tags */}
              <div className="pt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#6e6e78]">
                {project.technologies.map((tech, idx) => (
                  <React.Fragment key={tech}>
                    <span className="font-mono text-[#383842]">{tech}</span>
                    {idx < project.technologies.length - 1 && (
                      <span className="text-[#c0c0b8]" aria-hidden="true">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-[#ecece6] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFx.playPop(500)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a1a1e] hover:text-indigo-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFx.playPop(520)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Deployment</span>
                  </a>
                )}
              </div>

              {project.interactiveType && (
                <button
                  onClick={() => handleOpenDemo(project)}
                  className="text-xs font-semibold text-[#1a1a1e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Launch simulator</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ProjectDemoModal
        project={activeDemoProject}
        onClose={() => setActiveDemoProject(null)}
      />
    </section>
  );
};
