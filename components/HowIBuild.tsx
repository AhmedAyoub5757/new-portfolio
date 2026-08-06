"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "./SectionHeader";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    const updateTranslate = () => {
      if (!trackRef.current) return;
      const scrollDistance = trackRef.current.scrollWidth - window.innerWidth;
      setMaxTranslate(Math.max(scrollDistance, 0));
    };

    updateTranslate();

    const resizeObserver = new ResizeObserver(() => updateTranslate());
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    window.addEventListener("resize", updateTranslate);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateTranslate);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  return (
    <section ref={containerRef} className="relative bg-background h-[450vh]">
      <div className="sticky top-0 min-h-screen h-screen flex flex-col justify-between py-12 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[200px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-6 relative z-10 flex flex-col gap-6">
          <SectionHeader num="03" tag="Engineering Process" title="How I Build" />
          <span className="text-xs font-mono text-muted hidden sm:block">
            {/* [ SCROLL VERTICALLY TO EXPLORE ]  */}
          </span>
        </div>

        {/* Viewport wrapper */}
        <div className="relative w-full z-10 flex-1 flex items-center min-h-0 my-auto">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-8 w-max pl-6 xl:pl-[calc((100vw-80rem)/2+1.5rem)] pr-6 xl:pr-[calc((100vw-80rem)/2+1.5rem)]"
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-[85vw] sm:w-[75vw] md:w-[700px] lg:w-[800px] shrink-0">
                <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 backdrop-blur-xl overflow-hidden min-h-[440px] flex flex-col justify-between group hover:border-accent/40 transition-colors duration-500">
                  <div
                    className={`absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-tl ${slide.accent} blur-3xl rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-700`}
                  />

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
      </div>
    </section>
  );
}