import React, { useState } from 'react';
import { Code2, Database, Brain, Sparkles, Terminal, Check } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: { name: string; level: string; description: string }[];
}

const SKILL_GROUPS: SkillCategory[] = [
  {
    title: 'Programming & Web',
    icon: Code2,
    skills: [
      { name: 'Python', level: 'Advanced', description: 'Data structures, scripting, ML model prototyping, scripting, API ingestion' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', description: 'Modern DOM manipulation, async/await, event-driven state engines' },
      { name: 'HTML5 & CSS3', level: 'Expert', description: 'Semantic markup, Flexbox, CSS Grid, mobile responsiveness, WCAG compliance' },
      { name: 'Responsive Web Design', level: 'Expert', description: 'Adaptive multi-device architectures, touch targets, and typography math' },
    ],
  },
  {
    title: 'AI, ML & NLP',
    icon: Brain,
    skills: [
      { name: 'Machine Learning Fundamentals', level: 'Proficient', description: 'Supervised/unsupervised algorithms, evaluation metrics, feature engineering' },
      { name: 'Natural Language Processing (NLP)', level: 'Proficient', description: 'Tokenization, text pre-processing, context extraction, embeddings' },
      { name: 'AI APIs & LLM Integration', level: 'Advanced', description: 'Multi-turn conversation state, system instructions, error handling' },
      { name: 'Prompt Design & Orchestration', level: 'Advanced', description: 'Few-shot prompts, structured JSON outputs, deterministic validation' },
    ],
  },
  {
    title: 'Data Science & Analytics',
    icon: Database,
    skills: [
      { name: 'Data Analysis & Cleaning', level: 'Proficient', description: 'Exploratory data analysis (EDA), anomaly handling, statistical summaries' },
      { name: 'Data Visualization', level: 'Proficient', description: 'Translating multi-dimensional metrics into intuitive charts and graphics' },
      { name: 'Tableau', level: 'Intermediate', description: 'Interactive business intelligence dashboards, KPI sheets, filter actions' },
      { name: 'Microsoft Excel', level: 'Advanced', description: 'VLOOKUP/XLOOKUP, pivot tables, data modeling, nested formulas' },
    ],
  },
  {
    title: 'Tools & Operations',
    icon: Terminal,
    skills: [
      { name: 'GitHub & Version Control', level: 'Proficient', description: 'Branch management, pull requests, CI/CD page deployment, conflict resolution' },
      { name: 'Amazon NA MU Workflows', level: 'Expert', description: 'Real-time high volume chat resolution, international order & CRM operations' },
      { name: 'API Orchestration', level: 'Proficient', description: 'Connecting client interfaces with REST endpoints, rate limiting, token headers' },
      { name: 'Problem Solving & Logic', level: 'Expert', description: 'Quantitative reasoning, algorithmic problem solving, structured debugging' },
    ],
  },
];

export const SkillsSection: React.FC = () => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#e8e8e2]">
      {/* Header */}
      <div className="space-y-2 mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#7c7c86]">
          04. Technical Capabilities
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a1a1e] font-display">
          Skills, Tools & Technologies
        </h2>
      </div>

      {/* Interactive Category Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#f0f0eb] rounded-2xl max-w-3xl mb-8">
        {SKILL_GROUPS.map((group, idx) => {
          const Icon = group.icon;
          const isActive = activeGroupIndex === idx;
          return (
            <button
              key={group.title}
              onClick={() => {
                soundFx.playPop(500 + idx * 20);
                setActiveGroupIndex(idx);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-[#1a1a1e] shadow-xs'
                  : 'text-[#5a5a64] hover:text-[#1a1a1e] hover:bg-white/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{group.title}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILL_GROUPS[activeGroupIndex].skills.map((skill, sIdx) => (
          <div
            key={skill.name}
            onMouseEnter={() => soundFx.playPop(520 + sIdx * 25)}
            className="bg-white border border-[#e4e4de] hover:border-[#b0b0a6] rounded-2xl p-6 transition-all shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-700 bg-indigo-50/70 px-2 py-0.5 rounded">
                  {skill.level}
                </span>
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-[#1a1a1e] font-display">
                {skill.name}
              </h3>
              <p className="text-xs text-[#595964] leading-relaxed">
                {skill.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#f2f2ee] text-[11px] text-[#868692] font-mono">
              Tested & Deployed
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
