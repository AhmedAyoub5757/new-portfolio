"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), obs.disconnect()),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function CTA() {
  const { ref, inView } = useInView();
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMagnet({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    });
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 px-6 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 blur-[140px] rounded-full pointer-events-none" />

      <div
        className="relative max-w-3xl mx-auto text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.7s ease",
        }}
      >
        <div className="inline-flex items-center gap-2 bg-card border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-[pulse-dot_2s_infinite]" />
          <span className="text-xs text-muted tracking-wide">Currently available for work</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
          Got an idea?{" "}
          <span
            className="bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]"
            style={{ backgroundImage: "linear-gradient(90deg, #FF7A00, #FFA733, #FF7A00)" }}
          >
            Let&apos;s build it.
          </span>
        </h2>

        <p className="text-muted text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Have a project, a role, or just a question? I&apos;m one message away.
        </p>

        <Link
          ref={btnRef}
          href="mailto:hello@ahmed.dev"
          onMouseMove={handleMove}
          onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
          className="group relative inline-flex items-center gap-2 bg-accent hover:bg-hover text-background font-semibold text-base px-8 py-4 rounded-full transition-colors duration-300 shadow-[0_0_30px_rgba(255,122,0,0.35)] hover:shadow-[0_0_45px_rgba(255,167,51,0.55)]"
          style={{
            transform: `translate(${magnet.x}px, ${magnet.y}px)`,
            transition: "transform 0.15s ease-out, background-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          Get In Touch
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </section>
  );
}