import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Github, MessageSquare } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playWaveChime();
    setIsSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSent(false);
    }, 4500);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#e8e8e2]">
      {/* Header */}
      <div className="space-y-2 mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#7c7c86]">
          06. Connect & Collaborate
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a1a1e] font-display">
          Get in Touch with Prashant
        </h2>
        <p className="text-xs sm:text-sm text-[#666670] max-w-xl">
          Open to AI engineering internships, data science roles, and full-stack web engineering projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Details & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#e4e4dd] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-base font-bold text-[#1a1a1e]">
              Direct Contact Information
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <a
                href="mailto:chaharprashant94@gmail.com"
                className="flex items-start gap-3.5 group text-[#484854] hover:text-[#1a1a1e] transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-[#f4f4ee] group-hover:bg-[#1a1a1e] group-hover:text-white transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#1a1a1e]">Email Address</div>
                  <div className="font-mono text-xs text-[#6e6e7c] group-hover:underline">
                    chaharprashant94@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+916398520981"
                className="flex items-start gap-3.5 group text-[#484854] hover:text-[#1a1a1e] transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-[#f4f4ee] group-hover:bg-[#1a1a1e] group-hover:text-white transition-colors shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#1a1a1e]">Phone Number</div>
                  <div className="font-mono text-xs text-[#6e6e7c]">
                    +91 63985 20981
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-3.5 text-[#484854]">
                <div className="p-2.5 rounded-xl bg-[#f4f4ee] text-[#1a1a1e] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#1a1a1e]">Location</div>
                  <div className="text-xs text-[#6e6e7c]">
                    Parul University, Vadodara, Gujarat / Agra, UP
                  </div>
                </div>
              </div>
            </div>

            {/* Social profiles */}
            <div className="pt-4 border-t border-[#f0f0eb] space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#82828e]">
                Professional Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/in/prashant-kumar-chahar"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playPop(520)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#f6f6f2] hover:bg-[#ecece6] text-xs font-semibold text-[#1a1a1e] rounded-xl transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/Prashantkumar6398"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playPop(540)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#f6f6f2] hover:bg-[#ecece6] text-xs font-semibold text-[#1a1a1e] rounded-xl transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Message Box */}
        <div className="lg:col-span-7 bg-white border border-[#e4e4dd] rounded-2xl p-6 sm:p-8 shadow-xs">
          <h3 className="text-base font-bold text-[#1a1a1e] mb-4">
            Send a Direct Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-medium text-[#4c4c56]">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 bg-[#fafaf7] border border-[#d6d6d0] rounded-xl text-[#1a1a1e] focus:outline-none focus:ring-2 focus:ring-[#1a1a1e]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-[#4c4c56]">Your Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 bg-[#fafaf7] border border-[#d6d6d0] rounded-xl text-[#1a1a1e] focus:outline-none focus:ring-2 focus:ring-[#1a1a1e]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-medium text-[#4c4c56]">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Internship opportunity / Project collaboration"
                className="w-full px-3.5 py-2.5 bg-[#fafaf7] border border-[#d6d6d0] rounded-xl text-[#1a1a1e] focus:outline-none focus:ring-2 focus:ring-[#1a1a1e]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-[#4c4c56]">Message *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message or inquiry here..."
                className="w-full px-3.5 py-2.5 bg-[#fafaf7] border border-[#d6d6d0] rounded-xl text-[#1a1a1e] focus:outline-none focus:ring-2 focus:ring-[#1a1a1e] resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1a1e] hover:bg-[#2e2e36] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </div>

            {isSent && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs font-semibold text-emerald-800 animate-in fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you! Your message has been recorded. Prashant will respond shortly!</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
