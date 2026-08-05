"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Blogs", href: "#blogs" },
  { name: "Skills", href: "#skills" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-background/40 backdrop-blur-sm border-transparent"
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
          {navLinks.map((link, i) => (
            <li
              key={link.name}
              className="opacity-0"
              style={{
                animation: `fade-in-down 0.6s ease forwards ${0.15 * i + 0.3}s`,
              }}
            >
              <Link
                href={link.href}
                className="relative text-sm text-muted hover:text-hover transition-colors duration-300 tracking-wide group/link py-1"
              >
                {link.name}
                <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-accent scale-x-0 origin-center transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        {/* RHS: Contact button (desktop) */}
        <Link
          href="#contact"
          className="hidden md:inline-flex relative overflow-hidden items-center bg-accent hover:bg-hover text-background font-semibold text-sm px-5 py-2 rounded-full transition-colors duration-300 opacity-0 shadow-[0_0_20px_rgba(255,122,0,0.35)] hover:shadow-[0_0_28px_rgba(255,167,51,0.55)] hover:scale-105"
          style={{ animation: "fade-in-down 0.6s ease forwards 0.75s" }}
        >
          <span className="relative z-10">Contact</span>
          <span className="absolute top-0 left-0 h-full w-1/3 bg-white/40 blur-md animate-[shine-sweep_3s_ease-in-out_infinite]" />
        </Link>

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
            onClick={() => setIsOpen(false)}
            className="text-2xl text-text hover:text-accent transition-all duration-300"
            style={
              isOpen
                ? { animation: `fade-in-down 0.4s ease forwards ${0.1 * i}s` }
                : { opacity: 0 }
            }
          >
            {link.name}
          </Link>
        ))}
        <Link
          href="#contact"
          onClick={() => setIsOpen(false)}
          className="bg-accent hover:bg-hover text-background font-semibold px-6 py-3 rounded-full transition-colors duration-300 mt-4 shadow-[0_0_20px_rgba(255,122,0,0.4)]"
          style={
            isOpen
              ? { animation: "fade-in-down 0.4s ease forwards 0.45s" }
              : { opacity: 0 }
          }
        >
          Contact
        </Link>
      </div>
    </header>
  );
}