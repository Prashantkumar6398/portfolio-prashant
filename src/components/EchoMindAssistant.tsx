import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, User, Lightbulb } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface EchoMindAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['amazon', 'concentrix', 'support', 'experience', 'job', 'shift'],
    answer:
      "Prashant currently works at Concentrix as a Chat Support Executive for Amazon's North America Marketplace (NA MU) process. He manages high-volume customer inquiries in real-time on night shifts, ensuring swift resolution, high CSAT, and accurate order handling—all while maintaining his B.Tech studies in his 7th semester!",
  },
  {
    keywords: ['parul', 'education', 'college', 'degree', 'university', 'btech', 'gpa', 'study'],
    answer:
      "Prashant is pursuing B.Tech in Artificial Intelligence Engineering at Parul University, Vadodara, Gujarat (Batch 2023–2027). Prior to university, he scored 64% in Class XII and 69.4% in Class X (CBSE) at SG Public School, Akola, Agra.",
  },
  {
    keywords: ['paynest', 'wallet', 'upi', 'payment'],
    answer:
      "PayNest is a UPI-style mobile wallet demo app built with HTML5, CSS3, and JavaScript. It simulates real-time money transfers, dynamic QR payments, and live balance updates using pure DOM state management. You can try the live demo directly in the Projects section above!",
  },
  {
    keywords: ['project', 'projects', 'built', 'portfolio', 'tracker', 'expense'],
    answer:
      "Prashant has built 4 key projects:\n1. PayNest: UPI wallet simulator with dynamic QR payments\n2. EchoMind AI: Context-aware conversational AI application with NLP\n3. Smart Expense Tracker: Financial budgeting tool with trend visualization\n4. Responsive Portfolio Website: Clean, accessible mobile-first web app.",
  },
  {
    keywords: ['skill', 'skills', 'python', 'javascript', 'stack', 'technologies', 'ml'],
    answer:
      "Prashant's technical stack includes:\n• Languages: Python, JavaScript (ES6+)\n• Web: HTML5, CSS3, Responsive Design\n• AI & Data: Machine Learning, NLP, AI APIs, Prompt Design\n• Tools: Tableau, Microsoft Excel, Git/GitHub, API Orchestration.",
  },
  {
    keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'linkedin', 'github', 'call'],
    answer:
      "You can connect with Prashant directly:\n• Email: chaharprashant94@gmail.com\n• Phone: +91 63985 20981\n• LinkedIn: linkedin.com/in/prashant-kumar-chahar\n• GitHub: github.com/Prashantkumar6398\nHe is actively open to AI engineering internships and developer roles!",
  },
  {
    keywords: ['internship', 'xylofy', 'inamigos'],
    answer:
      "Prashant completed two impactful internships:\n1. XYlofy AI (June–July 2026): AI and Data Science Intern working on ML models, EDA, and data visualization.\n2. InAmigos Foundation (May 2026): Web Development Intern engineering responsive web interfaces.",
  },
  {
    keywords: ['certifications', 'deloitte', 'aws', 'tata', 'skyscanner'],
    answer:
      "Prashant holds certifications from Microsoft x Physics Wallah (Generative AI for All), AWS (Cloud Fundamentals), Deloitte & Tata iQ (Data Analytics Simulations), Skyscanner (Front-End Engineering), and AlgoUniversity (Graph Theory).",
  },
];

export const EchoMindAssistant: React.FC<EchoMindAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Namaste! I'm EchoMind AI, Prashant's interactive portfolio assistant. Ask me anything about his AI projects, Amazon NA operations, education, or skill set!",
      timestamp: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    soundFx.playPop(520);
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const qLower = query.toLowerCase();
      let match = KNOWLEDGE_BASE.find((kb) =>
        kb.keywords.some((kw) => qLower.includes(kw))
      );

      const aiReply = match
        ? match.answer
        : "Prashant is an AI Engineering student at Parul University skilled in Python, NLP, Machine Learning, and Web Development. He currently works at Concentrix (Amazon NA Process). Feel free to ask about his projects, experience, or resume details!";

      const botMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      soundFx.playPop(580);
    }, 500);
  };

  const sampleQuestions = [
    "What is your Amazon NA MU role?",
    "Tell me about PayNest",
    "What AI skills do you have?",
    "How can I contact or hire Prashant?",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full h-[580px] max-h-[90vh] flex flex-col border border-[#dcdcd6] shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 py-4 bg-[#1a1a1e] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-display flex items-center gap-1.5">
                <span>EchoMind AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-[11px] text-gray-400">
                Prashant's Portfolio Knowledge Assistant
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playPop(420);
              onClose();
            }}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fafaf7]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-[#1a1a1e] text-white'
                    : 'bg-indigo-100 text-indigo-800'
                }`}
              >
                {m.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
              </div>

              <div
                className={`max-w-[82%] text-xs sm:text-sm p-3 rounded-2xl whitespace-pre-line leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#1a1a1e] text-white rounded-tr-none'
                    : 'bg-white text-[#2a2a32] border border-[#e2e2dc] shadow-xs rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center">
                <Bot className="w-3 h-3" />
              </div>
              <div className="bg-white border border-[#e2e2dc] text-xs text-[#7c7c88] px-3 py-2 rounded-2xl animate-pulse">
                EchoMind is composing an answer...
              </div>
            </div>
          )}
        </div>

        {/* Sample Prompt Chips */}
        <div className="p-2.5 bg-[#f4f4ef] border-t border-[#e8e8e2] overflow-x-auto flex gap-1.5 text-xs whitespace-nowrap">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 bg-white hover:bg-[#ecece6] border border-[#d6d6d0] text-[#3e3e48] rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-[#e2e2dc] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-[#fafaf7] border border-[#d8d8d2] rounded-xl text-[#1a1a1e] focus:outline-none focus:ring-2 focus:ring-[#1a1a1e]"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="px-3.5 py-2 bg-[#1a1a1e] hover:bg-[#2e2e36] disabled:opacity-40 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
