import React from 'react';
import { Briefcase, Building2, Calendar, MapPin } from 'lucide-react';
import { Experience } from '../types/portfolio';
import { soundFx } from '../utils/audio';

const EXPERIENCES: Experience[] = [
  {
    id: 'concentrix',
    role: 'Chat Support Executive',
    company: 'Concentrix (Amazon NA MU Process)',
    period: 'September 2026 – Present',
    badge: 'Current Role',
    description: [
      "Provide non-voice, chat-based customer support for Amazon's North America Marketplace (NA MU) process, resolving complex customer queries in real time.",
      'Work night shift on an international process while actively continuing B.Tech studies (7th semester) alongside the professional role.',
      'Handle high-volume live chat interactions with a strong focus on first-contact resolution (FCR), procedural accuracy, and customer satisfaction (CSAT).',
      'Navigate multi-tier CRM dashboards, order management workflows, and issue escalation pipelines rapidly.'
    ],
  },
  {
    id: 'xylofy',
    role: 'AI and Data Science Intern',
    company: 'XYlofy AI',
    period: 'June 2026 – July 2026',
    duration: '4-Week Intensive',
    description: [
      'Completed a focused 4-week internship centered on Artificial Intelligence, Machine Learning, Data Analysis, and Data Visualization.',
      'Applied data-driven statistical approaches to clean, analyze, and interpret multi-dimensional datasets.',
      'Developed practical exposure to predictive modeling, exploratory data analysis (EDA), and data-focused problem-solving workflows.',
      'Constructed visualization dashboards to translate raw data trends into clear actionable insights.'
    ],
  },
  {
    id: 'inamigos',
    role: 'Web Development Intern',
    company: 'InAmigos Foundation',
    period: 'May 2026',
    duration: '2-Week Sprint',
    description: [
      'Built and maintained highly responsive web pages using HTML5, CSS3, and JavaScript.',
      'Designed and deployed an interactive personal portfolio website emphasizing clean modern UI, mobile responsiveness, and intuitive navigation.',
      'Collaborated closely with the frontend engineering team to gather user requirements and deliver polished components on schedule.'
    ],
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#e8e8e2]">
      {/* Section Header */}
      <div className="space-y-2 mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#7c7c86]">
          02. Career Track
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a1a1e] font-display">
          Work Experience & Internships
        </h2>
      </div>

      {/* Experience Cards */}
      <div className="space-y-6">
        {EXPERIENCES.map((exp, index) => (
          <div
            key={exp.id}
            onMouseEnter={() => soundFx.playPop(480 + index * 20)}
            className="group bg-white border border-[#e4e4dd] hover:border-[#b8b8b0] rounded-2xl p-6 sm:p-8 transition-all hover:shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#efefe9]">
              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1e]">
                    {exp.role}
                  </h3>
                  {exp.badge && (
                    <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {exp.badge}
                    </span>
                  )}
                  {exp.duration && (
                    <span className="text-[11px] font-mono text-[#666670] bg-[#f4f4f0] px-2 py-0.5 rounded-md">
                      {exp.duration}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-[#4b4b55]">
                  <Building2 className="w-4 h-4 text-[#8a8a94]" />
                  <span>{exp.company}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-[#787884] tabular-nums shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Bullet points */}
            <ul className="mt-5 space-y-2.5">
              {exp.description.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#50505b] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1e] mt-2 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
