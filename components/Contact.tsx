"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Send, CheckCircle2, Mail, User, MessageSquare } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const resetForm = () => {
    setForm({ name: "", email: "", message: "" });
    setSent(false);
  };

  return (
    <section id="contact" className="relative py-28 px-6 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader num="08" tag="Get In Touch" title="Send a Message" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT: Compose form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-hover disabled:opacity-50 text-background font-semibold text-sm px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,122,0,0.3)]"
            >
              {submitting ? "Sending..." : sent ? "Sent!" : "Send Message"}
              <Send size={15} />
            </button>
          </form>

          {/* RIGHT: Live preview */}
          <div className="relative flex justify-center md:justify-end pt-2">
            <div className="relative w-full max-w-sm">
              <p className="text-xs text-muted tracking-wide mb-3 text-center md:text-right">
                Live preview — what lands in my inbox
              </p>

              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 60, rotate: 6, transition: { duration: 0.4 } }}
                    className="rounded-2xl bg-card border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden"
                  >
                    {/* Notification header */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/10">
                      <Mail size={14} className="text-accent" />
                      <span className="text-xs text-muted">Mail</span>
                      <span className="ml-auto text-[10px] text-muted/50">now</span>
                    </div>

                    <div className="p-4">
                      <p className="text-sm font-semibold text-text mb-0.5">
                        {form.name.trim() || (
                          <span className="text-muted/40 italic font-normal">Waiting for name...</span>
                        )}
                      </p>
                      <p className="text-xs text-muted mb-3">
                        {form.email.trim() || (
                          <span className="text-muted/40 italic">waiting for email...</span>
                        )}
                      </p>
                      <div className="h-px bg-white/10 mb-3" />
                      <p className="text-sm text-text leading-relaxed min-h-[4.5em]">
                        {form.message.trim() || (
                          <span className="text-muted/40 italic">Your message will appear here as you type...</span>
                        )}
                      </p>
                    </div>

                    {/* Typing indicator dot */}
                    <div className="px-4 pb-4 flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          focusedField ? "bg-accent animate-[pulse-dot_1.2s_infinite]" : "bg-white/10"
                        }`}
                      />
                      <span className="text-[10px] text-muted/50">
                        {focusedField ? "typing..." : "idle"}
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="delivered"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl bg-card border border-green-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-8 flex flex-col items-center text-center gap-3"
                  >
                    <CheckCircle2 size={32} className="text-green-400" />
                    <p className="text-text font-semibold">Message Delivered</p>
                    <p className="text-xs text-muted">
                      Thanks, {form.name.split(" ")[0]} — I&apos;ll reply soon.
                    </p>
                    <button
                      onClick={resetForm}
                      className="text-xs text-accent hover:text-hover mt-2"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}