"use client";

import { useRef, useState, useCallback } from "react";
import { ArrowUp, Copy, Check } from "lucide-react";
import { useLenisScroll } from "./LenisProvider";

const quickLinks = [
  { label: "About", href: "#about", desc: "Background & Bio" },
  { label: "Work", href: "#work", desc: "Featured Projects" },
  { label: "Experience", href: "#experience", desc: "Career Journey" },
  { label: "Contact", href: "#contact", desc: "Get In Touch" },
];

const icons = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M2 6.5v11h5.5L12 13l4.5 4.5H22v-11h-3.5L12 16 5.5 6.5H2z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  ),
};

const socials = [
  { label: "GitHub", href: "https://github.com/AhmedAyoub5757", icon: icons.github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-ayoub-3a262b279/", icon: icons.linkedin },
  { label: "Medium", href: "https://medium.com/@kkahmed5757", icon: icons.twitter },
  { label: "Email", href: "mailto:ahmed42.dev@gmail.com", icon: icons.mail },
];

export default function Footer() {
  const bigTextRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: -20 });
  const [copied, setCopied] = useState(false);
  const lenisScroll = useLenisScroll();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = bigTextRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        if (lenisScroll) {
          lenisScroll.scrollToTarget(targetElement);
        } else {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    [lenisScroll]
  );

  const scrollToTop = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (lenisScroll) {
      lenisScroll.scrollToTarget(0, 0);
    }
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } catch {
      window.scrollTo(0, 0);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("ahmed42.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative bg-[#0B0B0C] text-[#FFFFFF] overflow-hidden border-t border-white/[0.08] pt-20 pb-28 sm:pb-16 font-sans">
      {/* --- AMBIENT GLOW & GRID BACKGROUND --- */}
      {/* 1. Large Corner Ambient Glowing Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FFA733]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. Linear Gradient Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* 3. Subtle Animated Accent Beam */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* HERO HEADING */}
        <div
          ref={bigTextRef}
          onMouseMove={handleMove}
          onMouseLeave={() => setSpot({ x: 50, y: -20 })}
          className="relative cursor-default mb-20 group text-center md:text-left"
        >
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-ping" />
            <span className="text-xs font-mono tracking-widest text-[#FF7A00] uppercase">
              Next Step
            </span>
          </div>

          <div className="relative inline-block w-full">
            <h2
              className="text-[12vw] sm:text-[10vw] lg:text-[7.5rem] font-black leading-[0.9] tracking-tighter text-transparent select-none"
              style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)" }}
            >
              LET&apos;S BUILD <br className="hidden sm:inline" />
              TOGETHER<span className="text-[#FF7A00]">.</span>
            </h2>

            <h2
              className="absolute inset-0 text-[12vw] sm:text-[10vw] lg:text-[7.5rem] font-black leading-[0.9] tracking-tighter text-[#FF7A00] pointer-events-none hidden md:block select-none"
              style={{
                WebkitMaskImage: `radial-gradient(280px circle at ${spot.x}% ${spot.y}%, black 0%, transparent 75%)`,
                maskImage: `radial-gradient(280px circle at ${spot.x}% ${spot.y}%, black 0%, transparent 75%)`,
              }}
            >
              LET&apos;S BUILD <br className="hidden sm:inline" />
              TOGETHER.
            </h2>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Bio Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#161618] border border-white/10 flex items-center justify-center text-[#FF7A00] font-mono font-bold text-base shadow-sm">
                A
              </div>
              <div>
                <h3 className="text-[#FFFFFF] font-medium text-base">Ahmed Ayoub</h3>
                <p className="text-xs text-[#A3A3A3]">Frontend Engineer</p>
              </div>
            </div>

            <p className="text-sm text-[#A3A3A3] leading-relaxed max-w-sm">
              Computer Science graduate building fast, interactive web applications.
              Currently engineering frontend interfaces at{" "}
              <span className="text-[#FFFFFF] font-medium">Redbox Technologies</span>.
            </p>

            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#161618] border border-emerald-500/30 text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Open for new opportunities
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs text-[#A3A3A3] uppercase tracking-widest font-mono">
              Navigation
            </p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="group flex items-center justify-between py-2 text-sm text-[#A3A3A3] hover:text-[#FFA733] transition-colors duration-200 cursor-pointer min-h-[44px]"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200 font-medium">
                      {link.label}
                    </span>
                    <span className="text-[10px] text-[#A3A3A3]/50 group-hover:text-[#FF7A00] transition-colors font-mono">
                      {link.desc}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs text-[#A3A3A3] uppercase tracking-widest font-mono">
              Get In Touch
            </p>

            <button
              onClick={copyEmail}
              className="w-full text-left p-4 rounded-2xl border border-white/10 bg-[#161618] hover:border-[#FF7A00]/50 transition-all duration-300 group relative overflow-hidden active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-[#A3A3A3] mb-0.5 font-mono">
                    Direct Line
                  </p>
                  <p className="text-sm text-[#FFFFFF] font-mono group-hover:text-[#FFA733] transition-colors">
                    ahmed42.dev@gmail.com
                  </p>
                </div>
                <span className="text-[11px] font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#A3A3A3] group-hover:border-[#FF7A00]/40 group-hover:text-[#FFFFFF] transition-all flex items-center gap-1.5">
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </span>
              </div>
            </button>

            <div className="pt-2">
              <p className="text-[10px] text-[#A3A3A3]/70 mb-3 font-mono tracking-wider">
                LOCATION: KARACHI, PK (UTC+5)
              </p>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-xl border border-white/10 bg-[#161618] flex items-center justify-center text-[#A3A3A3] hover:text-[#FFFFFF] hover:border-[#FF7A00] hover:bg-[#FF7A00]/10 transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sleek Multi-Layered Separator Divider */}
        <div className="relative my-12 py-4 flex items-center justify-center">
          {/* Background glowing line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00]/40 to-transparent" />
          <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#FFA733]/60 to-transparent blur-[3px]" />

          {/* Central Emblem Crest */}
          <div className="relative z-10 flex items-center gap-3 px-6 py-1.5 rounded-full bg-[#111113] border border-white/10 shadow-[0_0_20px_rgba(255,122,0,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
            <span className="text-[10px] font-mono text-[#A3A3A3] tracking-widest uppercase">
              KARACHI, PK (UTC+5) // OPEN FOR GLOBAL ROLES
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-[#A3A3A3] font-mono order-2 md:order-1">
            © {new Date().getFullYear()} AHMED AYOUB. ALL RIGHTS RESERVED.
          </p>

          <button
            onClick={scrollToTop}
            className="order-1 md:order-3 group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-[#161618] hover:border-[#FF7A00]/50 hover:bg-[#FF7A00]/10 text-xs text-[#A3A3A3] hover:text-[#FFFFFF] transition-all duration-300 cursor-pointer active:scale-95"
          >
            <span>Back to top</span>
            <div className="w-5 h-5 rounded-full bg-white/5 group-hover:bg-[#FF7A00] group-hover:text-[#0B0B0C] flex items-center justify-center transition-all duration-300">
              <ArrowUp size={11} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}