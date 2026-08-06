"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLenisScroll } from "./LenisProvider";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Blogs", href: "#blogs" },
  { name: "Skills", href: "#skills" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const lenisScroll = useLenisScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Respect reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduceMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
      if (mq.addEventListener) mq.addEventListener("change", handler);
      else mq.addListener(handler);
      return () => {
        if (mq.removeEventListener) mq.removeEventListener("change", handler);
        else mq.removeListener(handler);
      };
    } catch {
      return;
    }
  }, []);

  // Active section highlighting
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = navLinks.map((l) => l.href.replace(/^#/, "")).concat(["contact"]);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-30% 0px -50% 0px", threshold: 0.15 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Close mobile menu with Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNavClick = (e: any, href: string) => {
    if (!href.startsWith("#")) return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      if (reduceMotion) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        lenisScroll?.scrollToTarget(el);
      }
      setIsOpen(false);
      // update active immediately
      setActiveSection(id);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg border-white/10 shadow-[0_6px_40px_rgba(0,0,0,0.45)]"
          : "bg-background/60 backdrop-blur-md border-white/6 shadow-[0_6px_30px_rgba(10,10,10,0.25)]"
      }`}
    >
      <nav
        className={`max-w-6xl mx-auto flex items-center justify-between px-6 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* LHS: Animated Logo with glow */}
        <Link href="/" className="relative shrink-0 group">
          <span className="absolute -inset-4 rounded-full bg-accent/30 blur-xl opacity-60 animate-[glow-pulse_3s_ease-in-out_infinite] group-hover:opacity-90 transition-opacity" />
          <svg
            width="110"
            height="40"
            viewBox="0 0 110 40"
            className="relative overflow-visible"
          >
            <text
              x="0"
              y="28"
              fontSize="26"
              fontWeight="700"
              fill="#FF7A00"
              fillOpacity="0"
              stroke="#FF7A00"
              strokeWidth="1"
              strokeDasharray="300"
              strokeDashoffset="300"
              className="transition-all duration-300 group-hover:fill-[#FFA733]"
              style={{
                animation:
                  "draw-logo 2s ease forwards, fill-logo 0.6s ease forwards 1.8s",
              }}
            >
              Ahmed
            </text>
          </svg>
        </Link>

        {/* Center: Nav links (desktop only) */}
        <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link, i) => {
            const id = link.href.replace(/^#/, "");
            const isActive = activeSection === id;
            return (
              <li
                key={link.name}
                className="opacity-0"
                style={{
                  animation: reduceMotion ? undefined : `fade-in-down 0.6s ease forwards ${0.15 * i + 0.3}s`,
                }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e as any, link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-sm transition-colors duration-300 tracking-wide group/link py-1 ${
                    isActive ? "text-accent" : "text-muted hover:text-hover"
                  }`}
                >
                  {link.name}
                  <span className={`absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-accent origin-center transition-transform duration-300 ease-out ${isActive ? "scale-x-100" : "scale-x-0 group-hover/link:scale-x-100"}`} />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RHS: Contact + WhatsApp CTAs (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* WhatsApp first (desktop): icon + theme text */}
          <a
            href="https://wa.me/923113115428"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold text-sm px-3 py-2 rounded-full transition-colors duration-300 opacity-0 shadow-[0_8px_30px_rgba(37,211,102,0.15)] hover:shadow-[0_10px_40px_rgba(37,211,102,0.2)] hover:scale-105"
            style={{ animation: reduceMotion ? undefined : "fade-in-down 0.6s ease forwards 0.7s" }}
            aria-label="Message on WhatsApp"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-none">
              <path d="M21 11.5a8.5 8.5 0 10-9.3 8.36L3 21l1.14-4.02A8.5 8.5 0 0021 11.5z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />
              <path d="M17.5 14.25c-.45 0-1.12-.24-1.93-.52-.5-.18-1.02-.4-1.43-.55-.4-.15-.74-.24-1.03.21-.28.44-1.09 1.52-1.33 1.83-.24.31-.47.35-.97.12-.5-.24-2.1-.77-3.98-2.46C5.46 12.74 4.6 10.9 4.6 9.68c0-1.22.55-1.81.75-2.06.2-.25.5-.31.75-.31.24 0 .47 0 .67.01.22.02.52-.08.8.6.28.68.94 2.35 1.02 2.52.08.18.13.4-.08.64-.2.24-.36.55-.52.82-.16.28-.33.6-.15.96.18.36 1.02 1.66 2.2 2.85 1.51 1.5 2.77 2.05 3.19 2.29.42.25.67.22.92.13.24-.09.78-.31 1.12-.56.34-.25.55-.44.62-.68.07-.24.07-.45.05-.54-.02-.09-.18-.15-.42-.24-.24-.09-1.41-.58-1.64-.65-.23-.07-.38-.11-.55.07-.17.18-.66.64-.8.77-.14.13-.28.14-.5.05z" fill="white" />
            </svg>
            <span className="relative z-10 text-xs uppercase tracking-wider">WhatsApp</span>
            <span className="absolute top-0 left-0 h-full w-1/3 bg-white/10 blur-sm animate-[shine-sweep_3s_ease-in-out_infinite]" />
          </a>

          <Link
            href="#contact"
            onClick={(e) => handleNavClick(e as any, "#contact")}
            className={`relative overflow-hidden items-center bg-accent hover:bg-hover text-background font-semibold text-sm px-4 py-2 rounded-full transition-colors duration-300 opacity-0 shadow-[0_0_20px_rgba(255,122,0,0.35)] hover:shadow-[0_0_28px_rgba(255,167,51,0.55)] hover:scale-105 ${
              activeSection === "contact" ? "ring-2 ring-accent/30" : ""
            }`}
            style={{ animation: reduceMotion ? undefined : "fade-in-down 0.6s ease forwards 0.85s" }}
          >
            <span className="relative z-10">Contact</span>
            <span className="absolute top-0 left-0 h-full w-1/3 bg-white/40 blur-md animate-[shine-sweep_3s_ease-in-out_infinite]" />
          </Link>
        </div>

        {/* Mobile: Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-text transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-text transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-text transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background/98 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={(e) => {
              handleNavClick(e as any, link.href);
            }}
            className="text-2xl text-text hover:text-accent transition-all duration-300"
            style={
              isOpen
                ? { animation: reduceMotion ? undefined : `fade-in-down 0.4s ease forwards ${0.1 * i}s` }
                : { opacity: 0 }
            }
          >
            {link.name}
          </Link>
        ))}

        {/* Mobile: WhatsApp first */}
        <a
          href="https://wa.me/923113115428"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 mt-4 shadow-[0_10px_30px_rgba(37,211,102,0.12)]"
          style={
            isOpen
              ? { animation: reduceMotion ? undefined : "fade-in-down 0.4s ease forwards 0.45s" }
              : { opacity: 0 }
          }
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-none">
            <path d="M21 11.5a8.5 8.5 0 10-9.3 8.36L3 21l1.14-4.02A8.5 8.5 0 0021 11.5z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />
            <path d="M17.5 14.25c-.45 0-1.12-.24-1.93-.52-.5-.18-1.02-.4-1.43-.55-.4-.15-.74-.24-1.03.21-.28.44-1.09 1.52-1.33 1.83-.24.31-.47.35-.97.12-.5-.24-2.1-.77-3.98-2.46C5.46 12.74 4.6 10.9 4.6 9.68c0-1.22.55-1.81.75-2.06.2-.25.5-.31.75-.31.24 0 .47 0 .67.01.22.02.52-.08.8.6.28.68.94 2.35 1.02 2.52.08.18.13.4-.08.64-.2.24-.36.55-.52.82-.16.28-.33.6-.15.96.18.36 1.02 1.66 2.2 2.85 1.51 1.5 2.77 2.05 3.19 2.29.42.25.67.22.92.13.24-.09.78-.31 1.12-.56.34-.25.55-.44.62-.68.07-.24.07-.45.05-.54-.02-.09-.18-.15-.42-.24-.24-.09-1.41-.58-1.64-.65-.23-.07-.38-.11-.55.07-.17.18-.66.64-.8.77-.14.13-.28.14-.5.05z" fill="white" />
          </svg>
          <span className="text-sm">WhatsApp</span>
        </a>

        <Link
          href="#contact"
          onClick={() => setIsOpen(false)}
          className="bg-accent hover:bg-hover text-background font-semibold px-6 py-3 rounded-full transition-colors duration-300 mt-2 shadow-[0_0_20px_rgba(255,122,0,0.4)]"
          style={
            isOpen
              ? { animation: reduceMotion ? undefined : "fade-in-down 0.4s ease forwards 0.55s" }
              : { opacity: 0 }
          }
        >
          Contact
        </Link>
      </div>
    </header>
  );
}