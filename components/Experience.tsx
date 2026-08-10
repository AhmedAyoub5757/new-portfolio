"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -/";

type Flight = {
  code: string;
  role: string;
  org: string;
  status: string;
  desc: string;
  live?: boolean;
};

const flights: Flight[] = [
  {
    code: "EDU-01",
    role: "BS COMPUTER SCIENCE",
    org: "UNIVERSITY",
    status: "COMPLETED",
    desc: "Built the foundation — logic, data structures, and how software actually works under the hood.",
  },
  {
    code: "INT-01",
    role: "FULL STACK DEVELOPER",
    org: "GEXTON EDUCATION",
    status: "PART-TIME",
    desc: "First real-world code, shipping actual features part-time as a full stack intern while still in school.",
  },
  {
    code: "INT-02",
    role: "FRONTEND / REACT DEV",
    org: "BITSPRO",
    status: "COMPLETED",
    desc: "Went all-in on frontend right after graduating — React, component architecture, real interfaces, full-time.",
  },
  {
    code: "JOB-01",
    role: "FRONTEND DEVELOPER",
    org: "REDBOX TECHNOLOGIES",
    status: "NOW BOARDING",
    desc: "Building production interfaces professionally — where the last three stops were leading all along.",
    live: true,
  },
];

// Single flipping character cell with instant fallback
function FlapChar({ target, delay, trigger }: { target: string; delay: number; trigger: boolean }) {
  // Initialize with target character so content is NEVER invisible
  const [display, setDisplay] = useState(target === " " ? "\u00A0" : target);
  const [flipKey, setFlipKey] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let cancelled = false;
    const flips = 5 + Math.floor(Math.random() * 4);
    let count = 0;

    const start = setTimeout(() => {
      const interval = setInterval(() => {
        if (cancelled) return;
        count++;
        if (count >= flips) {
          setDisplay(target === " " ? "\u00A0" : target);
          setFlipKey((k) => k + 1);
          clearInterval(interval);
        } else {
          setDisplay(CHARSET[Math.floor(Math.random() * CHARSET.length)]);
          setFlipKey((k) => k + 1);
        }
      }, 45);
      return () => clearInterval(interval);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [trigger, target, delay]);

  return (
    <span className="relative inline-block w-[0.58em] sm:w-[0.66em] h-[1.2em] overflow-hidden text-center align-top shrink-0">
      <span
        key={flipKey}
        className="absolute inset-0 flex items-center justify-center animate-[flap_0.12s_ease-out]"
      >
        {display}
      </span>
      <span className="absolute left-0 right-0 top-1/2 h-px bg-white/10 pointer-events-none" />
    </span>
  );
}

function FlapText({
  text,
  trigger,
  className = "",
  stagger = 12,
}: {
  text: string;
  trigger: boolean;
  className?: string;
  stagger?: number;
}) {
  return (
    <span className={`font-mono tracking-wider whitespace-nowrap inline-flex ${className}`}>
      {text.split("").map((ch, i) => (
        <FlapChar key={i} target={ch} delay={i * stagger} trigger={trigger} />
      ))}
    </span>
  );
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setInView(true);
      return;
    }
    
    // Fallback timer if IntersectionObserver fails on mobile webview
    const fallbackTimer = setTimeout(() => setInView(true), 1000);

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          clearTimeout(fallbackTimer);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "50px" }
    );

    obs.observe(el);
    return () => {
      clearTimeout(fallbackTimer);
      obs.disconnect();
    };
  }, []);

  return { ref, inView };
}

export default function Experience() {
  const { ref: sectionRef, inView } = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleRow = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-16 sm:py-28 px-3 sm:px-6 bg-background overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader num="04" tag="Career Journey" title="Professional Experience" />

        {/* Board frame */}
        <motion.div
          className="rounded-2xl border border-white/10 bg-[#0F0F11] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Board header bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black/40 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse-dot_2s_infinite]" />
              <span className="text-[10px] sm:text-[11px] text-neutral-400 font-mono tracking-widest">
                CAREER TIMELINE & MILESTONES
              </span>
            </div>
            <span className="text-[11px] text-amber-500 font-mono tabular-nums">
              {time}
            </span>
          </div>

          {/* Column labels */}
          <div className="hidden sm:grid grid-cols-[100px_1fr_1fr_140px_28px] gap-4 px-6 py-3 text-[10px] text-neutral-500 tracking-widest border-b border-white/10 font-mono">
            <span>CODE</span>
            <span>ROLE</span>
            <span>ORGANIZATION</span>
            <span>STATUS</span>
            <span />
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/10">
            {flights.map((f, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={f.code}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleRow(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleRow(i);
                      }
                    }}
                    className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 hover:bg-white/[0.02] transition-colors duration-300 cursor-pointer select-none"
                  >
                    <div className="flex flex-col sm:grid sm:grid-cols-[100px_1fr_1fr_140px_28px] gap-2 sm:gap-4 items-start sm:items-center relative pr-8 sm:pr-0">
                      
                      {/* Mobile Code & Status Top Bar */}
                      <div className="flex items-center justify-between w-full sm:w-auto">
                        <FlapText text={f.code} trigger={inView} className="text-amber-500 text-xs sm:text-sm" stagger={10} />
                        
                        <div className="flex items-center gap-2 sm:hidden">
                          {f.live && (
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-[pulse-dot_1.5s_infinite]" />
                          )}
                          <FlapText
                            text={f.status}
                            trigger={inView}
                            className={`text-[11px] ${f.live ? "text-green-400" : "text-neutral-400"}`}
                            stagger={8}
                          />
                        </div>
                      </div>

                      {/* Role */}
                      <div className="overflow-x-auto max-w-full no-scrollbar">
                        <FlapText text={f.role} trigger={inView} className="text-white text-xs sm:text-base" stagger={6} />
                      </div>

                      {/* Organization */}
                      <div className="overflow-x-auto max-w-full no-scrollbar">
                        <FlapText text={f.org} trigger={inView} className="text-neutral-400 text-[11px] sm:text-sm" stagger={5} />
                      </div>

                      {/* Desktop Status */}
                      <div className="hidden sm:flex items-center gap-2">
                        {f.live && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-[pulse-dot_1.5s_infinite]" />
                        )}
                        <FlapText
                          text={f.status}
                          trigger={inView}
                          className={`text-xs sm:text-sm ${f.live ? "text-green-400" : "text-neutral-400"}`}
                          stagger={8}
                        />
                      </div>

                      {/* Dropdown Chevron */}
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 sm:relative sm:top-auto sm:translate-y-0 sm:justify-self-end text-neutral-400 pointer-events-none"
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-black/20"
                      >
                        <p className="px-4 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                          {f.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Footer strip */}
          <div className="px-4 sm:px-6 py-3 bg-black/40 border-t border-white/10 flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] text-neutral-500 font-mono tracking-widest">
              {flights.length} CAREER MILESTONES
            </span>
            <span className="text-[9px] sm:text-[10px] text-neutral-500 font-mono tracking-widest">
              TAP A ROW FOR DETAILS
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}