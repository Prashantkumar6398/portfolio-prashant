import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Certification } from '../types/portfolio';
import { soundFx } from '../utils/audio';

const CERTIFICATIONS: Certification[] = [
  {
    id: 'xylofy-cert',
    title: 'AI and Data Science Internship Certificate',
    issuer: 'XYlofy AI',
    date: 'June 2026 – July 2026',
    category: 'AI & ML',
  },
  {
    id: 'ms-pw',
    title: 'Generative AI for All',
    issuer: 'Microsoft x Physics Wallah',
    date: 'July 2026',
    category: 'AI & ML',
  },
  {
    id: 'aws-cloud',
    title: 'AWS Cloud Fundamentals',
    issuer: 'Amazon Web Services (AWS)',
    date: '2026',
    category: 'Web & Cloud',
  },
  {
    id: 'deloitte-data',
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte (Forage)',
    date: 'May 2026',
    category: 'Data Analytics',
  },
  {
    id: 'tata-data',
    title: 'Data Analytics Job Simulation',
    issuer: 'Tata iQ (Forage)',
    date: 'May 2026',
    category: 'Data Analytics',
  },
  {
    id: 'skyscanner-fe',
    title: 'Front-End Software Engineering Simulation',
    issuer: 'Skyscanner (Forage)',
    date: 'May 2026',
    category: 'Web & Cloud',
  },
  {
    id: 'algouni-graph',
    title: 'Graph Theory Camp Certificate',
    issuer: 'AlgoUniversity',
    date: '2026',
    category: 'Competitive',
  },
  {
    id: 'algouni-aiset',
    title: 'AISET — All India Scholarship Entrance Test',
    issuer: 'AlgoUniversity',
    date: '2026',
    category: 'Competitive',
  },
];

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#e8e8e2]">
      {/* Header */}
      <div className="space-y-2 mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#7c7c86]">
          05. Verified Credentials
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a1a1e] font-display">
          Industry Certifications & Job Simulations
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CERTIFICATIONS.map((cert, index) => (
          <div
            key={cert.id}
            onMouseEnter={() => soundFx.playPop(500 + (index % 4) * 30)}
            className="group bg-white border border-[#e4e4dd] hover:border-[#a8a89e] rounded-2xl p-5 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#666672] bg-[#f4f4ee] px-2 py-0.5 rounded">
                  {cert.category}
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#1a1a1e] group-hover:text-indigo-950 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs font-medium text-[#5c5c68] mt-1">
                  {cert.issuer}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#f0f0ea] flex items-center justify-between text-[11px] text-[#7a7a86] font-mono">
              <span>{cert.date}</span>
              <span className="text-emerald-700 font-medium">Verified</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
