import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, Github, Check } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    soundFx.playPop(520);
    navigator.clipboard.writeText('chaharprashant94@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    soundFx.playPop(540);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#d8d8d2] shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#e6e6e0] flex items-center justify-between z-20 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Verified Resume
            </span>
            <span className="text-xs text-[#70707c]">Prashant Kumar Chahar</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1a1a1e] bg-[#f4f4ee] hover:bg-[#eaeae2] rounded-xl transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Mail className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1a1a1e] hover:bg-[#2e2e36] rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                soundFx.playPop(420);
                onClose();
              }}
              className="p-1.5 text-[#7c7c86] hover:text-[#1a1a1e] hover:bg-[#f0f0eb] rounded-full transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="p-6 sm:p-10 font-sans text-[#1a1a1e] space-y-6 max-w-3xl mx-auto text-left">
          {/* Header */}
          <div className="text-center space-y-2 pb-5 border-b border-[#e4e4dd]">
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-[#111114]">
              Prashant Kumar Chahar
            </h1>
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#484852] uppercase">
              AI Engineering Student · AI & Data Science · Web Development
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#585864] pt-1">
              <span className="font-mono">+91 63985 20981</span>
              <span>·</span>
              <a href="mailto:chaharprashant94@gmail.com" className="hover:underline">
                chaharprashant94@gmail.com
              </a>
              <span>·</span>
              <a href="https://linkedin.com/in/prashant-kumar-chahar" target="_blank" rel="noreferrer" className="hover:underline">
                linkedin.com/in/prashant-kumar-chahar
              </a>
              <span>·</span>
              <a href="https://github.com/Prashantkumar6398" target="_blank" rel="noreferrer" className="hover:underline">
                github.com/Prashantkumar6398
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1e] pb-1 border-b border-[#e4e4dd]">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-[#464650] leading-relaxed">
              B.Tech Artificial Intelligence Engineering student at Parul University with internship experience in AI & Data Science and Web Development, currently working as a Chat Support Executive for an international Amazon process. Hands-on exposure to Python, machine learning fundamentals, data analysis, data visualization, HTML, CSS and JavaScript. Built practical projects including an AI conversational application, a UPI-style wallet interface and a browser-based expense tracker. Interested in AI, data science, frontend development and practical problem solving.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1e] pb-1 border-b border-[#e4e4dd]">
              Education
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-[#1a1a1e]">
                    B.Tech, Artificial Intelligence Engineering — Parul University, Vadodara, Gujarat
                  </div>
                </div>
                <div className="font-mono text-[#5c5c66] text-xs shrink-0">
                  2023–2027
                </div>
              </div>

              <div className="flex justify-between items-start text-xs text-[#52525c]">
                <div>Class XII (CBSE) — SG Public School Akola, Agra</div>
                <div className="font-mono text-xs">64% · 2021–2022</div>
              </div>

              <div className="flex justify-between items-start text-xs text-[#52525c]">
                <div>Class X (CBSE) — SG Public School Akola, Agra</div>
                <div className="font-mono text-xs">69.4% · 2019–2020</div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1e] pb-1 border-b border-[#e4e4dd]">
              Experience
            </h2>

            {/* Role 1 */}
            <div className="space-y-1">
              <div className="flex justify-between items-start text-xs sm:text-sm">
                <div className="font-bold text-[#1a1a1e]">
                  Chat Support Executive — Concentrix (Amazon NA MU Process)
                </div>
                <div className="font-mono text-xs text-[#5c5c66] shrink-0">
                  September 2026 – Present
                </div>
              </div>
              <ul className="list-disc list-inside text-xs text-[#484852] space-y-1 pl-1">
                <li>Provide non-voice, chat-based customer support for Amazon's North America Marketplace (NA MU) process, resolving customer queries in real time.</li>
                <li>Work night shift on an international process while continuing B.Tech studies (7th semester) alongside the role.</li>
                <li>Handle high-volume live chat interactions with a focus on quick resolution, accuracy and customer satisfaction.</li>
              </ul>
            </div>

            {/* Role 2 */}
            <div className="space-y-1">
              <div className="flex justify-between items-start text-xs sm:text-sm">
                <div className="font-bold text-[#1a1a1e]">
                  AI and Data Science Intern — XYlofy AI
                </div>
                <div className="font-mono text-xs text-[#5c5c66] shrink-0">
                  June 2026 – July 2026
                </div>
              </div>
              <ul className="list-disc list-inside text-xs text-[#484852] space-y-1 pl-1">
                <li>Completed a 4-week internship focused on Artificial Intelligence, Machine Learning, Data Analysis and Data Visualization.</li>
                <li>Applied data-driven approaches to analyze and interpret datasets.</li>
                <li>Developed practical exposure to analytical problem solving and data-focused workflows.</li>
              </ul>
            </div>

            {/* Role 3 */}
            <div className="space-y-1">
              <div className="flex justify-between items-start text-xs sm:text-sm">
                <div className="font-bold text-[#1a1a1e]">
                  Web Development Intern — InAmigos Foundation
                </div>
                <div className="font-mono text-xs text-[#5c5c66] shrink-0">
                  May 2026 | 2 Weeks
                </div>
              </div>
              <ul className="list-disc list-inside text-xs text-[#484852] space-y-1 pl-1">
                <li>Built and maintained responsive web pages using HTML, CSS and JavaScript.</li>
                <li>Designed and deployed a personal portfolio website with a focus on responsive UI and usability.</li>
                <li>Collaborated with the team to gather requirements and deliver frontend solutions on schedule.</li>
              </ul>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1e] pb-1 border-b border-[#e4e4dd]">
              Projects
            </h2>

            <div className="space-y-2 text-xs sm:text-sm">
              <div>
                <div className="font-bold text-[#1a1a1e]">
                  PayNest — Demo Wallet App | <span className="font-normal text-xs text-[#5c5c66]">HTML5, CSS3, JavaScript</span>
                </div>
                <p className="text-xs text-[#484852] mt-0.5">
                  Built a UPI-style mobile wallet interface simulating money transfers, QR-based payments and transaction history. Implemented real-time DOM-based state management and deployed the project through GitHub Pages.
                </p>
              </div>

              <div>
                <div className="font-bold text-[#1a1a1e]">
                  EchoMind AI | <span className="font-normal text-xs text-[#5c5c66]">Python, NLP, AI APIs</span>
                </div>
                <p className="text-xs text-[#484852] mt-0.5">
                  Built an AI-powered conversational application generating context-aware responses using NLP and AI APIs. Demonstrates prompt design and API orchestration.
                </p>
              </div>

              <div>
                <div className="font-bold text-[#1a1a1e]">
                  Smart Expense Tracker | <span className="font-normal text-xs text-[#5c5c66]">HTML, CSS, JavaScript</span>
                </div>
                <p className="text-xs text-[#484852] mt-0.5">
                  Built a browser-based finance tool for logging expenses, categorizing spending and visualizing spending trends as a college minor project.
                </p>
              </div>

              <div>
                <div className="font-bold text-[#1a1a1e]">
                  Portfolio Website | <span className="font-normal text-xs text-[#5c5c66]">Responsive Web Design</span>
                </div>
                <p className="text-xs text-[#484852] mt-0.5">
                  Built a professional portfolio website during internship with emphasis on clean UI and mobile responsiveness.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1e] pb-1 border-b border-[#e4e4dd]">
              Technical Skills
            </h2>
            <div className="text-xs text-[#484852] space-y-1">
              <div><strong className="text-[#1a1a1e]">Programming:</strong> Python, JavaScript</div>
              <div><strong className="text-[#1a1a1e]">Web:</strong> HTML5, CSS3, Responsive Design</div>
              <div><strong className="text-[#1a1a1e]">AI & Data Science:</strong> Machine Learning fundamentals, Data Analysis, Data Visualization, NLP, AI APIs</div>
              <div><strong className="text-[#1a1a1e]">Data Tools:</strong> Tableau, Microsoft Excel</div>
              <div><strong className="text-[#1a1a1e]">Other:</strong> GitHub, Prompt Design, API Orchestration</div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1e] pb-1 border-b border-[#e4e4dd]">
              Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#484852]">
              <div>• XYlofy AI — AI & Data Science Certificate (2026)</div>
              <div>• Deloitte (Forage) — Data Analytics Simulation</div>
              <div>• Tata iQ (Forage) — Data Analytics Simulation</div>
              <div>• Skyscanner (Forage) — Front-End Simulation</div>
              <div>• Microsoft x Physics Wallah — GenAI for All</div>
              <div>• AWS — AWS Cloud Fundamentals</div>
              <div>• AlgoUniversity — Graph Theory Camp</div>
              <div>• AlgoUniversity — AISET Scholarship Exam</div>
            </div>
          </div>

          {/* Core Strengths */}
          <div className="space-y-1 pt-2 border-t border-[#e4e4dd] text-xs text-[#484852]">
            <strong className="text-[#1a1a1e]">Core Strengths:</strong> Problem Solving • Quantitative Aptitude • Logical Reasoning • Teamwork • Communication • Quick Learning
          </div>
        </div>
      </div>
    </div>
  );
};
