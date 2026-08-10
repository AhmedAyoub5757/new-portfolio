"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Send, Mail, User, MessageSquare, Copy, Check, ExternalLink, Clock, MapPin, Zap } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const canSubmit = form.name.trim() && isValidEmail(form.email) && form.message.trim().length > 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New portfolio message from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError("Something went wrong — mind trying again?");
      }
    } catch {
      setError("Network hiccup — mind trying again?");
    } finally {
      setSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("ahmed42.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-28 px-4 sm:px-6 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader num="07" tag="Get In Touch" title="Send a Message" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT: Compose form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <label className="flex items-center gap-2 text-xs text-muted tracking-wide mb-2">
                <User size={13} className="text-accent" /> YOUR NAME
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="John Hastings"
                className={`w-full bg-card border rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted/40 outline-none transition-colors duration-300 ${
                  focusedField === "name" ? "border-accent" : "border-white/10"
                }`}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs text-muted tracking-wide mb-2">
                <Mail size={13} className="text-accent" /> YOUR EMAIL
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="john@example.com"
                className={`w-full bg-card border rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted/40 outline-none transition-colors duration-300 ${
                  focusedField === "email" ? "border-accent" : "border-white/10"
                }`}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs text-muted tracking-wide mb-2">
                <MessageSquare size={13} className="text-accent" /> MESSAGE
              </label>
              <textarea
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                rows={5}
                placeholder="Tell me about your project, role, or just say hi..."
                className={`w-full resize-none bg-card border rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted/40 outline-none transition-colors duration-300 ${
                  focusedField === "message" ? "border-accent" : "border-white/10"
                }`}
              />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={!canSubmit || submitting || sent}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-hover disabled:opacity-50 text-background font-semibold text-sm px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,122,0,0.3)] cursor-pointer"
            >
              {submitting ? "Sending..." : sent ? "Sent!" : "Send Message"}
              <Send size={15} />
            </button>
          </motion.form>

          {/* RIGHT: Direct Connect & Response Commitment Dashboard */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Direct Channel 1: Email Copy Box */}
            <div className="rounded-2xl bg-card border border-white/10 p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text">Direct Inbox</h4>
                    <p className="text-[11px] text-muted">Copy address or send directly</p>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-accent/20 border border-white/10 text-xs font-mono text-text flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs font-mono text-accent bg-accent/5 border border-accent/10 p-2.5 rounded-xl">
                ahmed42.dev@gmail.com
              </p>
            </div>

            {/* Direct Channel 2: WhatsApp Chat & LinkedIn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://wa.me/923113115428"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-card border border-white/10 hover:border-[#25D366]/50 p-5 transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20.52 3.48A11.58 11.58 0 0 0 12.01 0C5.39 0 .01 5.37.01 11.99c0 2.11.55 4.17 1.6 6.01L0 24l6.13-1.58a11.95 11.95 0 0 0 5.86 1.49h.01c6.62 0 12-5.38 12-12 0-3.21-1.25-6.22-3.48-8.43Zm-8.51 18.45h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.64.94.97-3.54-.24-.37a9.85 9.85 0 0 1-1.51-5.23c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.44-4.43 9.75-9.97 9.75Z" fill="currentColor" />
                      <path d="M17.12 14.56c-.29-.15-1.71-.85-1.98-.94-.27-.1-.46-.15-.66.15s-.76.94-.93 1.13-.34.22-.63.07a8.1 8.1 0 0 1-2.38-1.47 8.96 8.96 0 0 1-1.65-2.05c-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.5.15-.17.2-.29.3-.48.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.91-2.18-.24-.58-.49-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.29-1.03 1.01-1.03 2.47s1.05 2.87 1.2 3.07c.15.2 2.06 3.15 4.99 4.4.7.3 1.24.48 1.66.62.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.08-.12-.27-.2-.56-.35Z" fill="#fff" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-text group-hover:text-[#25D366] transition-colors">
                      WhatsApp Chat
                    </h5>
                    <p className="text-[10px] text-muted font-mono">Instant Reply</p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-muted group-hover:text-[#25D366] transition-colors" />
              </a>

              <a
                href="https://www.linkedin.com/in/ahmed-ayoub-3a262b279/"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-card border border-white/10 hover:border-accent/50 p-5 transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                    <User size={18} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-text group-hover:text-accent transition-colors">
                      LinkedIn Profile
                    </h5>
                    <p className="text-[10px] text-muted font-mono">Connect Directly</p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-muted group-hover:text-accent transition-colors" />
              </a>
            </div>

            {/* Direct Connect Commitment Details */}
            <div className="rounded-2xl bg-[#0E0E10] border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
                <span className="flex items-center gap-2 text-muted">
                  <Clock size={14} className="text-accent" /> Response Time:
                </span>
                <span className="font-mono text-emerald-400 font-bold">&lt; 2 Hours</span>
              </div>

              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
                <span className="flex items-center gap-2 text-muted">
                  <MapPin size={14} className="text-accent" /> Location & Timezone:
                </span>
                <span className="font-mono text-text">Karachi, PK (UTC+5)</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-muted">
                  <Zap size={14} className="text-accent" /> Project Readiness:
                </span>
                <span className="font-mono text-accent font-bold">Immediate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}