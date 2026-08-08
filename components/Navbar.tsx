"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
}

const navLinks: NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Blogs", href: "#blogs" },
  { name: "Skills", href: "#skills" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  // Default to empty so nothing is active initially
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionIds = ["about", "work", "blogs", "skills", "contact"];

  // Track scroll position for header glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Resolve the section based on document order and scroll position so the
  // visible section wins even when sticky content is present.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateActiveSection = () => {
      let nextActive = "";
      let bestVisibleHeight = 0;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, window.innerHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > bestVisibleHeight) {
          bestVisibleHeight = visibleHeight;
          nextActive = id;
        }
      }

      setActiveSection(nextActive);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  // Smooth scroll click handler
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.slice(1);
    const targetElement = document.getElementById(id);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(id);
    }
  }, []);

  // Scroll to top on logo click
  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSection("");
  }, []);

  return (
    <>
      {/* ---------------- STATIC MOBILE TOP BAR (Logo + WhatsApp) ---------------- */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40 px-4 pt-4 pointer-events-none">
        <div className="max-w-md mx-auto flex items-center justify-between pointer-events-auto bg-neutral-950/70 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full shadow-lg">
          {/* Logo */}
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-1.5">
            <span className="font-black text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400">
              AHMED
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#FF7A00]" />
          </a>

          {/* Quick WhatsApp Action */}
          <a
            href="https://wa.me/923113115428"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 px-3 py-1.5 rounded-full shadow-[0_0_12px_rgba(37,211,102,0.15)] active:scale-95 transition-all"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20.52 3.48A11.58 11.58 0 0 0 12.01 0C5.39 0 .01 5.37.01 11.99c0 2.11.55 4.17 1.6 6.01L0 24l6.13-1.58a11.95 11.95 0 0 0 5.86 1.49h.01c6.62 0 12-5.38 12-12 0-3.21-1.25-6.22-3.48-8.43Zm-8.51 18.45h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.64.94.97-3.54-.24-.37a9.85 9.85 0 0 1-1.51-5.23c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.44-4.43 9.75-9.97 9.75Z" fill="currentColor" />
              <path d="M17.12 14.56c-.29-.15-1.71-.85-1.98-.94-.27-.1-.46-.15-.66.15s-.76.94-.93 1.13-.34.22-.63.07a8.1 8.1 0 0 1-2.38-1.47 8.96 8.96 0 0 1-1.65-2.05c-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.5.15-.17.2-.29.3-.48.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.91-2.18-.24-.58-.49-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.29-1.03 1.01-1.03 2.47s1.05 2.87 1.2 3.07c.15.2 2.06 3.15 4.99 4.4.7.3 1.24.48 1.66.62.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.08-.12-.27-.2-.56-.35Z" fill="#fff" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* ---------------- DESKTOP NAVBAR ---------------- */}
      <header className="hidden md:block fixed top-0 left-0 w-full z-50 pt-4 px-6 transition-all duration-300">
        <div
          className={`max-w-6xl mx-auto rounded-full transition-all duration-500 border ${
            scrolled
              ? "bg-neutral-950/80 backdrop-blur-xl border-white/15 py-2.5 px-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              : "bg-neutral-900/40 backdrop-blur-md border-white/10 py-3.5 px-6 shadow-lg"
          }`}
        >
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" onClick={handleLogoClick} className="relative z-50 flex items-center gap-2 group">
              <span className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400">
                AHMED
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#FF7A00]" />
            </a>

            {/* Nav Items */}
            <ul className="flex items-center gap-1 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full">
              {navLinks.map((link) => {
                const id = link.href.replace(/^#/, "");
                const isActive = activeSection === id;

                return (
                  <li key={link.name} className="relative">
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative z-10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 block ${
                        isActive ? "text-black" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full z-0 transition-all duration-300" />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTAs */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/923113115428"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366] px-4 py-2 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.15)]"
              >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20.52 3.48A11.58 11.58 0 0 0 12.01 0C5.39 0 .01 5.37.01 11.99c0 2.11.55 4.17 1.6 6.01L0 24l6.13-1.58a11.95 11.95 0 0 0 5.86 1.49h.01c6.62 0 12-5.38 12-12 0-3.21-1.25-6.22-3.48-8.43Zm-8.51 18.45h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.64.94.97-3.54-.24-.37a9.85 9.85 0 0 1-1.51-5.23c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.44-4.43 9.75-9.97 9.75Z" fill="currentColor" />
                      <path d="M17.12 14.56c-.29-.15-1.71-.85-1.98-.94-.27-.1-.46-.15-.66.15s-.76.94-.93 1.13-.34.22-.63.07a8.1 8.1 0 0 1-2.38-1.47 8.96 8.96 0 0 1-1.65-2.05c-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.5.15-.17.2-.29.3-.48.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.91-2.18-.24-.58-.49-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.29-1.03 1.01-1.03 2.47s1.05 2.87 1.2 3.07c.15.2 2.06 3.15 4.99 4.4.7.3 1.24.48 1.66.62.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.08-.12-.27-.2-.56-.35Z" fill="#fff" />
                    </svg>
                <span>WhatsApp</span>
              </a>

              <Link
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className={`text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,122,0,0.4)] active:scale-95 ${
                  activeSection === "contact"
                    ? "text-black bg-gradient-to-r from-orange-500 to-amber-400"
                    : "text-black bg-gradient-to-r from-orange-500 to-amber-400 hover:brightness-110"
                }`}
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* ---------------- REDESIGNED MOBILE BOTTOM DOCK ---------------- */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
        <nav className="bg-neutral-950/90 backdrop-blur-2xl border border-white/15 p-1.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-1">
          {navLinks.map((link) => {
            const id = link.href.replace(/^#/, "");
            const isActive = activeSection === id;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative flex-1 text-center py-2.5 text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 rounded-full ${
                  isActive ? "text-black shadow-[0_0_15px_rgba(255,122,0,0.4)]" : "text-neutral-400 hover:text-white"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full z-0" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}