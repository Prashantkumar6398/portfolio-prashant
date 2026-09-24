import React, { useState } from 'react';
import { X, Send, QrCode, ArrowUpRight, CheckCircle, RefreshCw, Wallet, Bot, PieChart, Plus } from 'lucide-react';
import { Project } from '../types/portfolio';
import { soundFx } from '../utils/audio';

interface ProjectDemoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, onClose }) => {
  // PayNest demo state
  const [walletBalance, setWalletBalance] = useState(12500);
  const [transferAmount, setTransferAmount] = useState('');
  const [recipient, setRecipient] = useState('Rahul Verma (rahul@okaxis)');
  const [showPaySuccess, setShowPaySuccess] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 'tx-1', to: 'Coffee House', amount: -220, date: 'Today, 11:30 AM', status: 'Success' },
    { id: 'tx-2', to: 'Amazon NA Refund', amount: +1499, date: 'Yesterday', status: 'Success' },
    { id: 'tx-3', to: 'Parul Canteen', amount: -150, date: '22 Sep', status: 'Success' },
  ]);

  // EchoMind demo state
  const [echoPrompt, setEchoPrompt] = useState('');
  const [echoHistory, setEchoHistory] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    {
      role: 'ai',
      text: "Hello! I am EchoMind AI, built by Prashant. Ask me about Prashant's skills in Machine Learning, Python, Amazon operations, or his projects!",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  // Expense Tracker demo state
  const [expenses, setExpenses] = useState([
    { category: 'Food & Dining', amount: 3200, color: 'bg-amber-500' },
    { category: 'Tech & Hosting', amount: 1800, color: 'bg-indigo-500' },
    { category: 'Travel & Commute', amount: 1200, color: 'bg-emerald-500' },
    { category: 'Books & Courses', amount: 950, color: 'bg-rose-500' },
  ]);
  const [newExpTitle, setNewExpTitle] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');

  if (!project) return null;

  const handleSendPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(transferAmount);
    if (isNaN(val) || val <= 0 || val > walletBalance) return;

    soundFx.playWaveChime();
    setWalletBalance((prev) => prev - val);
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        to: recipient,
        amount: -val,
        date: 'Just now',
        status: 'Success',
      },
      ...prev,
    ]);
    setShowPaySuccess(true);
    setTransferAmount('');
    setTimeout(() => setShowPaySuccess(false), 3000);
  };

  const handleEchoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!echoPrompt.trim()) return;

    soundFx.playPop(520);
    const userQuery = echoPrompt.trim();
    setEchoHistory((prev) => [...prev, { role: 'user', text: userQuery }]);
    setEchoPrompt('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = "Prashant is an AI Engineering student at Parul University proficient in Python, ML algorithms, conversational APIs, and web engineering.";
      const lower = userQuery.toLowerCase();
      if (lower.includes('amazon') || lower.includes('concentrix')) {
        reply = "Prashant works as a Chat Support Executive for Amazon's North America Marketplace (NA MU) at Concentrix, handling real-time customer interactions during night shifts!";
      } else if (lower.includes('project') || lower.includes('paynest')) {
        reply = "Prashant built PayNest (a UPI-style wallet simulation), EchoMind AI (conversational NLP engine), and Smart Expense Tracker with responsive web design!";
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) {
        reply = "You can contact Prashant at chaharprashant94@gmail.com or +91 63985 20981. He is open for AI engineering internships and frontend/full-stack opportunities!";
      }
      setEchoHistory((prev) => [...prev, { role: 'ai', text: reply }]);
      setIsThinking(false);
      soundFx.playPop(580);
    }, 600);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newExpAmount);
    if (!newExpTitle.trim() || isNaN(val) || val <= 0) return;

    soundFx.playPop(540);
    setExpenses((prev) => [
      ...prev,
      { category: newExpTitle.trim(), amount: val, color: 'bg-violet-500' },
    ]);
    setNewExpTitle('');
    setNewExpAmount('');
  };

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#deded8] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#ecece8] flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Interactive Simulation
              </span>
              <h3 className="text-lg font-bold text-[#1a1a1e] font-display">
                {project.title}
              </h3>
            </div>
            <p className="text-xs text-[#6e6e78] mt-0.5">
              Live functional prototype showcasing real-time logic
            </p>
          </div>
          <button
            onClick={() => {
              soundFx.playPop(420);
              onClose();
            }}
            className="p-2 text-[#787882] hover:text-[#1a1a1e] hover:bg-[#f0f0ec] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* PayNest Simulation */}
          {project.interactiveType === 'paynest' && (
            <div className="space-y-6">
              {/* Wallet Card */}
              <div className="bg-gradient-to-br from-[#1a1a1e] via-[#2a2a32] to-[#121216] text-white p-6 rounded-2xl shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-semibold tracking-wide">PayNest UPI Wallet</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    Live Balance
                  </span>
                </div>

                <div>
                  <div className="text-xs text-gray-400">Available Funds</div>
                  <div className="text-3xl font-extrabold font-mono tracking-tight text-white mt-1">
                    ₹{walletBalance.toLocaleString('en-IN')}.00
                  </div>
                </div>

                <div className="text-xs font-mono text-gray-400 flex items-center justify-between pt-2 border-t border-white/10">
                  <span>UPI ID: prashant@paynest</span>
                  <span className="text-emerald-400">Verified VPA</span>
                </div>
              </div>

              {/* Transfer Form */}
              <form onSubmit={handleSendPayment} className="space-y-4 bg-[#f8f8f5] p-5 rounded-2xl border border-[#e6e6e0]">
                <h4 className="text-sm font-bold text-[#1a1a1e] flex items-center justify-between">
                  <span>Quick Instant Money Transfer</span>
                  <QrCode className="w-4 h-4 text-[#5e5e68]" />
                </h4>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#5e5e68]">Recipient</label>
                  <select
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-white border border-[#d2d2cc] rounded-xl px-3 py-2 text-[#1a1a1e] focus:outline-none focus:ring-2 focus:ring-[#1a1a1e]"
                  >
                    <option value="Rahul Verma (rahul@okaxis)">Rahul Verma (rahul@okaxis)</option>
                    <option value="Ananya Sharma (ananya@paytm)">Ananya Sharma (ananya@paytm)</option>
                    <option value="Parul University Fees (fees@parul)">Parul University Fees (fees@parul)</option>
                    <option value="Amazon Pay NA (seller@amazon)">Amazon Pay NA (seller@amazon)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#5e5e68]">Amount (₹ INR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#686874]">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      placeholder="e.g. 500"
                      min="1"
                      max={walletBalance}
                      className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-[#d2d2cc] rounded-xl text-[#1a1a1e] focus:outline-none focus:ring-2 focus:ring-[#1a1a1e]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1a1a1e] hover:bg-[#2d2d35] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Payment Now</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setWalletBalance(12500);
                      soundFx.playPop(450);
                    }}
                    title="Reset Balance"
                    className="p-2.5 bg-white border border-[#d2d2cc] hover:bg-[#eeeeea] rounded-xl text-[#686874] cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {showPaySuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Transfer Successful! Wallet updated in real time.</span>
                  </div>
                )}
              </form>

              {/* Transactions List */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#7e7e8a]">
                  Recent Activity (DOM State Ledger)
                </h5>
                <div className="divide-y divide-[#ecece8] border border-[#ecece8] rounded-xl overflow-hidden">
                  {transactions.map((t) => (
                    <div key={t.id} className="p-3 flex items-center justify-between text-xs bg-white">
                      <div>
                        <div className="font-semibold text-[#1a1a1e]">{t.to}</div>
                        <div className="text-[11px] text-[#747480]">{t.date}</div>
                      </div>
                      <div className={`font-mono font-bold ${t.amount > 0 ? 'text-emerald-600' : 'text-[#1a1a1e]'}`}>
                        {t.amount > 0 ? `+₹${t.amount}` : `-₹${Math.abs(t.amount)}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EchoMind AI Playground */}
          {project.interactiveType === 'echomind' && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-center gap-2 text-xs text-indigo-950">
                <Bot className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Conversational NLP engine prompt orchestrator. Type any question below.</span>
              </div>

              {/* Chat Message Box */}
              <div className="h-64 overflow-y-auto space-y-3 p-4 bg-[#f8f8f5] rounded-2xl border border-[#e4e4dd]">
                {echoHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm ${
                        msg.role === 'user'
                          ? 'bg-[#1a1a1e] text-white'
                          : 'bg-white text-[#1a1a1e] border border-[#e0e0d8] shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="bg-white text-xs text-gray-500 rounded-2xl p-3 border border-[#e0e0d8] animate-pulse">
                      EchoMind AI is generating context-aware response...
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setEchoPrompt("Tell me about Prashant's Amazon experience")}
                  className="px-2.5 py-1 bg-white border border-[#d6d6cf] hover:bg-[#f0f0ec] rounded-lg text-[#3c3c44] cursor-pointer"
                >
                  Amazon NA Process?
                </button>
                <button
                  type="button"
                  onClick={() => setEchoPrompt("What projects has Prashant built?")}
                  className="px-2.5 py-1 bg-white border border-[#d6d6cf] hover:bg-[#f0f0ec] rounded-lg text-[#3c3c44] cursor-pointer"
                >
                  Projects Overview?
                </button>
                <button
                  type="button"
                  onClick={() => setEchoPrompt("How can I hire or contact Prashant?")}
                  className="px-2.5 py-1 bg-white border border-[#d6d6cf] hover:bg-[#f0f0ec] rounded-lg text-[#3c3c44] cursor-pointer"
                >
                  Hire / Contact?
                </button>
              </div>

              {/* Chat Form */}
              <form onSubmit={handleEchoSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={echoPrompt}
                  onChange={(e) => setEchoPrompt(e.target.value)}
                  placeholder="Ask EchoMind about Prashant's background..."
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#d2d2cc] rounded-xl text-[#1a1a1e] focus:outline-none focus:ring-2 focus:ring-[#1a1a1e]"
                />
                <button
                  type="submit"
                  disabled={!echoPrompt.trim() || isThinking}
                  className="px-4 py-2.5 bg-[#1a1a1e] hover:bg-[#2d2d34] disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Ask</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* Smart Expense Tracker Demo */}
          {project.interactiveType === 'tracker' && (
            <div className="space-y-6">
              <div className="bg-[#f8f8f5] p-5 rounded-2xl border border-[#e4e4dd] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#6e6e78]">Total Tracked Spending</span>
                    <h4 className="text-2xl font-bold font-mono text-[#1a1a1e]">
                      ₹{totalExpense.toLocaleString('en-IN')}
                    </h4>
                  </div>
                  <PieChart className="w-6 h-6 text-indigo-600" />
                </div>

                {/* Expense Visual Bars */}
                <div className="space-y-2.5 pt-2 border-t border-[#e2e2dc]">
                  {expenses.map((exp, i) => {
                    const pct = Math.round((exp.amount / (totalExpense || 1)) * 100);
                    return (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-[#383842]">
                          <span>{exp.category}</span>
                          <span className="font-mono">₹{exp.amount} ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-[#e8e8e2] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${exp.color} transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add Expense Form */}
              <form onSubmit={handleAddExpense} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Category (e.g. Cloud Server)"
                  value={newExpTitle}
                  onChange={(e) => setNewExpTitle(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-[#d2d2cc] rounded-xl text-[#1a1a1e]"
                />
                <input
                  type="number"
                  placeholder="Amount ₹"
                  value={newExpAmount}
                  onChange={(e) => setNewExpAmount(e.target.value)}
                  className="w-28 px-3 py-2 text-xs bg-white border border-[#d2d2cc] rounded-xl text-[#1a1a1e]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#1a1a1e] text-white text-xs font-semibold rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            </div>
          )}

          {/* Direct external links */}
          <div className="mt-6 pt-4 border-t border-[#ecece8] flex items-center justify-between flex-wrap gap-3">
            <div className="text-xs text-[#70707c]">
              Built with: <span className="font-semibold text-[#1a1a1e]">{project.technologies.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-[#1a1a1e] hover:underline flex items-center gap-1"
                >
                  <span>View on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-indigo-600 hover:underline flex items-center gap-1"
                >
                  <span>Production Link</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
