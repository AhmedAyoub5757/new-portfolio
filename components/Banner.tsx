"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Check, Sparkles, ShieldCheck, Gauge, Smartphone, Zap } from "lucide-react";

export default function Banner() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  
  const [isVisible, setIsVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  // Visibility observer for desktop entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMagnet({
      x: (e.clientX - rect.left - rect.width / 2) * 0.35,
      y: (e.clientY - rect.top - rect.height / 2) * 0.35,
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("ahmed42.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="contact-cta"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative py-12 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden select-none"
      
    >
      {/* Dynamic Mouse Spotlight — desktop only */}
      {/* <div
        className="hidden md:block absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,122,0,0.12), transparent 70%)`,
        }}
      /> */}

      {/* Futuristic Background Laser Beam Mesh */}
      {/* <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent opacity-75 shadow-[0_0_15px_#FF7A00]" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#FFA733] to-transparent opacity-50" /> */}

      {/* Floating Ambient Glowing Flares */}
      {/* <div className="absolute top-1/3 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-[#FF7A00]/12 rounded-full blur-[140px] pointer-events-none animate-[float_7s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-[#FFA733]/12 rounded-full blur-[140px] pointer-events-none animate-[float-slow_9s_ease-in-out_infinite]" /> */}

      {/* ---------------- MOBILE VERSION: 100% RELIABLE, CLEAN & ALWAYS VISIBLE ---------------- */}
      <div className="block md:hidden relative max-w-md mx-auto rounded-2xl bg-[#141416] border border-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent" />

        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2 bg-[#1C1C1F] border border-white/10 rounded-full px-3 py-1 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase font-semibold">
            Available for New Projects
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl font-black text-white leading-snug tracking-tight mb-3">
          Let&apos;s Build Something <br />
          <span
            className="bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]"
            style={{ backgroundImage: "linear-gradient(90deg, #FF7A00, #FFA733, #FF7A00)" }}
          >
            High-Performance.
          </span>
        </h2>

        <p className="text-xs text-muted leading-relaxed mb-6">
          Fast React & Next.js interfaces, custom PHP/Node.js backends, and responsive web applications built to scale.
        </p>

        {/* Mobile Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-[#FF7A00] hover:bg-[#FFA733] text-[#0B0B0C] font-bold text-xs px-6 py-3.5 rounded-full shadow-[0_0_25px_rgba(255,122,0,0.35)] active:scale-95 transition-all text-center"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={16} />
          </Link>

          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-mono text-xs px-5 py-3 rounded-full active:scale-95 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={13} className="text-muted" />
                <span className="text-muted">ahmed42.dev@gmail.com</span>
              </>
            )}
          </button>
        </div>

        {/* Tech Badges */}
        <div className="pt-4 mt-5 border-t border-white/10 flex flex-wrap gap-1.5 justify-center">
          {["Next.js 14", "React", "TypeScript", "PHP"].map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- DESKTOP VERSION: FULL FEATURED RICH DASHBOARD ---------------- */}
      <div
        className="hidden md:block relative max-w-6xl mx-auto rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 lg:p-14 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        {/* Animated Light Beam Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent opacity-60" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT COLUMN: Main Offer & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 bg-[#161618] border border-white/10 hover:border-[#FF7A00]/40 rounded-full px-4 py-1.5 mb-6 transition-colors duration-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-[#A3A3A3] tracking-wide uppercase">
                Available for Contract & Full-Time Roles
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight mb-5">
              Engineering Ideas into <br />
              <span
                className="bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]"
                style={{ backgroundImage: "linear-gradient(90deg, #FF7A00, #FFA733, #FF7A00)" }}
              >
                High-Performance Products.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-muted text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
              Whether you need a pixel-perfect Next.js frontend, a scalable backend, or full application optimization — I build web software engineered to perform.
            </p>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                ref={btnRef}
                href="#contact"
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
                className="group relative inline-flex items-center justify-center gap-2.5 bg-[#FF7A00] hover:bg-[#FFA733] text-[#0B0B0C] font-bold text-sm px-7 py-4 rounded-full transition-colors duration-300 shadow-[0_0_30px_rgba(255,122,0,0.35)] hover:shadow-[0_0_45px_rgba(255,167,51,0.55)] cursor-pointer"
                style={{
                  transform: `translate(${magnet.x}px, ${magnet.y}px)`,
                  transition: "transform 0.15s ease-out, background-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <span>Start a Conversation</span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              {/* Direct Copy Email Action */}
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 bg-[#161618] hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-mono text-xs px-5 py-4 rounded-full transition-all duration-300 active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-[#A3A3A3]" />
                    <span className="text-[#A3A3A3]">ahmed42.dev@gmail.com</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Production Quality Dashboard Widget */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#141416]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#FF7A00]" />
                  <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                    Production Standards
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  PASSED
                </span>
              </div>

              {/* Lighthouse Metric Circle Row */}
              <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-xl p-4">
                <div>
                  <p className="text-xs text-[#A3A3A3] font-mono mb-1">Lighthouse Score</p>
                  <p className="text-xl font-bold text-white font-mono">98 / 100</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold">
                  <Gauge size={20} />
                  <span>Sub-Second Load</span>
                </div>
              </div>

              {/* Core Web Vitals Checklist */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="flex items-center gap-2 text-[#A3A3A3]">
                    <Zap size={14} className="text-[#FF7A00]" /> First Contentful Paint (FCP)
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">&lt; 0.4s</span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="flex items-center gap-2 text-[#A3A3A3]">
                    <Sparkles size={14} className="text-[#FF7A00]" /> Cumulative Layout Shift (CLS)
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">0.00</span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="flex items-center gap-2 text-[#A3A3A3]">
                    <Smartphone size={14} className="text-[#FF7A00]" /> Responsive Architecture
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">100% Verified</span>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-2 flex flex-wrap gap-2">
                {["Next.js 14", "TypeScript", "Tailwind CSS", "PHP / REST API"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#A3A3A3]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}