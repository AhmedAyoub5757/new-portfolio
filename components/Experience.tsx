"use client";

import { useEffect, useRef, useState } from "react";
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

// Single flipping character cell
function FlapChar({ target, delay, trigger }: { target: string; delay: number; trigger: boolean }) {
  const [display, setDisplay] = useState(" ");
  const [flipKey, setFlipKey] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let cancelled = false;
    const flips = 6 + Math.floor(Math.random() * 5);
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
    <span className="relative inline-block w-[0.62em] sm:w-[0.66em] h-[1.2em] overflow-hidden text-center align-top">
      <span
        key={flipKey}
        className="absolute inset-0 flex items-center justify-center animate-[flap_0.12s_ease-out]"
      >
        {display}
      </span>
      <span className="absolute left-0 right-0 top-1/2 h-px bg-black/40" />
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
    <span className={`font-mono tracking-wider whitespace-nowrap ${className}`}>
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
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), obs.disconnect()),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
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

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 bg-background overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-end gap-4 mb-10">
          <span className="text-6xl sm:text-7xl font-bold text-white/5 leading-none select-none">03</span>
          <div className="pb-1">
            <p className="text-accent text-sm font-mono tracking-widest mb-1">// EXPERIENCE</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text">Career Departures</h2>
          </div>
        </div>

        {/* Board frame */}
        <div className="rounded-2xl border border-white/10 bg-[#0F0F11] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.5)]">
          {/* Board header bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black/40 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse-dot_2s_infinite]" />
              <span className="text-[11px] text-muted font-mono tracking-widest">
                DEPARTURES — CAREER TIMELINE
              </span>
            </div>
            <span className="text-[11px] text-accent font-mono tabular-nums hidden sm:block">
              {time}
            </span>
          </div>

          {/* Column labels */}
          <div className="hidden sm:grid grid-cols-[100px_1fr_1fr_140px_28px] gap-4 px-6 py-3 text-[10px] text-muted/60 tracking-widest border-b border-white/10 font-mono">
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
                <div key={f.code}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-[100px_1fr_1fr_140px_28px] gap-x-4 gap-y-2 items-center">
                      <div className="col-span-2 sm:col-span-1">
                        <FlapText text={f.code} trigger={inView} className="text-accent text-sm" stagger={10} />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <FlapText text={f.role} trigger={inView} className="text-text text-sm sm:text-base" stagger={6} />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <FlapText text={f.org} trigger={inView} className="text-muted text-xs sm:text-sm" stagger={5} />
                      </div>
                      <div className="flex items-center gap-2 col-span-1">
                        {f.live && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-[pulse-dot_1.5s_infinite]" />
                        )}
                        <FlapText
                          text={f.status}
                          trigger={inView}
                          className={`text-xs sm:text-sm ${f.live ? "text-green-400" : "text-muted"}`}
                          stagger={8}
                        />
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="justify-self-end text-muted"
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-black/20"
                      >
                        <p className="px-4 sm:px-6 pb-5 pt-1 text-sm text-muted leading-relaxed max-w-2xl">
                          {f.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Footer strip */}
          <div className="px-4 sm:px-6 py-3 bg-black/40 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-muted/50 font-mono tracking-widest">
              {flights.length} ENTRIES LOGGED
            </span>
            <span className="text-[10px] text-muted/50 font-mono tracking-widest">
              TAP A ROW FOR DETAILS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}