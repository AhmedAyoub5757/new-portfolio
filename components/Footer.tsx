"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
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

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = bigTextRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-background overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-10">
        {/* Flashlight big text */}
        <div
          ref={bigTextRef}
          onMouseMove={handleMove}
          onMouseLeave={() => setSpot({ x: 50, y: -20 })}
          className="relative select-none cursor-default mb-16 overflow-hidden"
        >
          <h2
            className="text-[14vw] sm:text-[11vw] lg:text-[9rem] font-bold leading-none tracking-tight text-transparent"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}
          >
            LET&apos;S TALK
          </h2>
          <h2
            className="absolute inset-0 text-[14vw] sm:text-[11vw] lg:text-[9rem] font-bold leading-none tracking-tight text-accent pointer-events-none hidden md:block"
            style={{
              WebkitMaskImage: `radial-gradient(180px circle at ${spot.x}% ${spot.y}%, black 0%, transparent 80%)`,
              maskImage: `radial-gradient(180px circle at ${spot.x}% ${spot.y}%, black 0%, transparent 80%)`,
            }}
          >
            LET&apos;S TALK
          </h2>
        </div>

        {/* Info grid */}
        <div className="grid sm:grid-cols-3 gap-10 mb-14">
          {/* Bio blurb */}
          <div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-hover flex items-center justify-center text-background font-bold text-sm mb-4">
              A
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              CS graduate and frontend developer building fast, thoughtful web
              experiences — currently at Redbox Technologies.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs text-muted tracking-widest mb-4">QUICK LINKS</p>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text/80 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + socials */}
          <div>
            <p className="text-xs text-muted tracking-widest mb-4">CONNECT</p>
            <a
              href="mailto:ahmed42.dev@gmail.com"
              className="block text-sm text-text/80 hover:text-accent transition-colors duration-300 mb-1"
            >
              ahmed42.dev@gmail.com
            </a>
            <p className="text-sm text-muted mb-5">Karachi, Pakistan</p>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="relative h-px bg-white/10 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-accent" />
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted order-2 sm:order-1">
            © {new Date().getFullYear()} Ahmed. All rights reserved.
          </p>
          <p className="text-xs text-muted/60 order-3 sm:order-2">
            Built with Next.js & Tailwind CSS
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="order-1 sm:order-3 flex items-center gap-2 text-xs text-muted hover:text-accent transition-colors duration-300 group"
          >
            Back to top
            <span className="w-7 h-7 rounded-full border border-white/10 group-hover:border-accent flex items-center justify-center transition-colors duration-300">
              <ArrowUp size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}