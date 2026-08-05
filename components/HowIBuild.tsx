"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring as useFramerSpring,
} from "framer-motion";

interface Slide {
  id: string;
  number: string;
  tag: string;
  headline: string;
  statement: string;
  accent: string;
}

const slides: Slide[] = [
  {
    id: "architecture",
    number: "01",
    tag: "FOUNDATION & SYSTEM DESIGN",
    headline: "Clean Architecture Over Clever Code.",
    statement:
      "Before writing visual elements, I structure component trees and data hydration boundaries. No prop drilling, no unnecessary state rerenders — just predictable, maintainable software.",
    accent: "from-cyan-500/20 to-blue-600/10",
  },
  {
    id: "motion",
    number: "02",
    tag: "KINETIC PHYSICS & UI",
    headline: "Interfaces That Feel Tactile and Alive.",
    statement:
      "Static pages are boring. I engineer fluid, 60fps micro-interactions using physics-based springs so every tap, drag, and hover feels responsive and intentional.",
    accent: "from-purple-500/20 to-pink-600/10",
  },
  {
    id: "performance",
    number: "03",
    tag: "PERFORMANCE & HYDRATION",
    headline: "Sub-Second Load Times by Default.",
    statement:
      "A beautiful design means nothing if it takes 5 seconds to load. I audit DOM tree sizes, optimize dynamic imports, and eliminate layout shifts (CLS) for instant readiness.",
    accent: "from-emerald-500/20 to-teal-600/10",
  },
  {
    id: "resilience",
    number: "04",
    tag: "PRODUCTION READY",
    headline: "Software Built to Outlast the Project Ship.",
    statement:
      "Production-ready code means strict TypeScript interfaces, responsive cross-browser layouts down to 320px, and zero-bloat modular builds.",
    accent: "from-amber-500/20 to-orange-600/10",
  },
];

export default function HowIBuildFilmstrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tracks vertical scroll progress across a 400vh tall container runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out vertical scroll input into horizontal sliding translation
  const smoothProgress = useFramerSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });

  // Maps vertical scroll (0 to 1) to horizontal movement (-0% to -75%)
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    // Runway section: 400vh gives ample room to scroll horizontally without feeling rushed
    <section ref={containerRef} className="relative bg-background h-[400vh]">
      
      {/* Viewport Frame Pinned Sticky */}
      <div className="sticky top-0 h-screen flex flex-col justify-between py-12 px-6 overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[200px] rounded-full pointer-events-none" />

        {/* Top Header & Progress Line */}
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
              <span className="text-xs uppercase tracking-[0.25em] text-muted font-mono">
                ENGINEERING PROCESS // 03
              </span>
            </div>
            <span className="text-xs font-mono text-muted hidden sm:block">
              [ SCROLL VERTICALLY TO EXPLORE ]
            </span>
          </div>

          {/* Horizontal Track Progress Indicator */}
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        {/* Middle: Horizontal Pinned Filmstrip Track */}
        <div className="relative w-full max-w-7xl mx-auto my-auto z-10">
          <motion.div style={{ x }} className="flex gap-8 w-[400%]">
            
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="w-[100%] max-w-[90vw] md:max-w-[800px]"
              >
                <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 backdrop-blur-xl overflow-hidden min-h-[440px] flex flex-col justify-between group hover:border-accent/40 transition-colors duration-500">
                  
                  {/* Slide Gradient Flare */}
                  <div
                    className={`absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tl ${slide.accent} blur-3xl rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-700`}
                  />

                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-xs text-accent tracking-widest uppercase">
                        {slide.tag}
                      </span>
                      <span className="font-mono text-3xl font-light text-white/20 group-hover:text-accent transition-colors">
                        {slide.number}
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-text leading-[1.15] tracking-tight mb-6 max-w-xl">
                      {slide.headline}
                    </h3>

                    <p className="text-sm sm:text-base text-muted leading-relaxed max-w-lg">
                      {slide.statement}
                    </p>
                  </div>

                  {/* Interactive Visual Element per Slide */}
                  <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-xs text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>STAGE_{slide.number}_VERIFIED</span>
                    </div>

                    <span className="text-xs font-mono text-muted group-hover:text-accent group-hover:translate-x-1 transition-all">
                      SLIDE {slide.number} / 04 →
                    </span>
                  </div>

                </div>
              </div>
            ))}

          </motion.div>
        </div>

        {/* Bottom Status */}
        <div className="max-w-7xl mx-auto w-full relative z-10 flex items-center justify-between font-mono text-xs text-muted">
          <span>PIPELINE: ACTIVE</span>
          <span>01 — 04 STAGES</span>
        </div>

      </div>
    </section>
  );
}