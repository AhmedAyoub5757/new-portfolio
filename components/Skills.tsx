"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

interface Skill {
  id: string;
  name: string;
  category: string;
  symbol: string;
}

const row1: Skill[] = [
  { id: "react", name: "React", category: "UI Engine", symbol: "⚛️" },
  { id: "nextjs", name: "Next.js", category: "Framework", symbol: "▲" },
  { id: "typescript", name: "TypeScript", category: "Type System", symbol: "TS" },
  { id: "tailwind", name: "Tailwind CSS", category: "Styling", symbol: "🎨" },
  { id: "framer", name: "Framer Motion", category: "Animation", symbol: "✨" },
];

const row2: Skill[] = [
  { id: "php", name: "Core PHP", category: "Backend Engine", symbol: "🐘" },
  { id: "mysql", name: "MySQL", category: "Database", symbol: "🛢️" },
  { id: "apis", name: "REST APIs", category: "Architecture", symbol: "⚡" },
  { id: "wordpress", name: "WordPress Core", category: "CMS", symbol: "🌐" },
  { id: "git", name: "Git & GitHub", category: "Version Control", symbol: "🌿" },
];

function MarqueeRow({
  items,
  baseVelocity = 0.15,
}: {
  items: Skill[];
  baseVelocity: number;
}) {
  const duration = `${Math.max(18, 30 - Math.abs(baseVelocity) * 40)}s`;
  const direction = baseVelocity < 0 ? "normal" : "reverse";

  return (
    <div className="flex whitespace-nowrap overflow-hidden py-3 select-none">
      <div
        className="flex w-max gap-6 min-w-max will-change-transform animate-[marquee_24s_linear_infinite]"
        style={{ animationDuration: duration, animationDirection: direction }}
      >
        {[0, 1].map((groupIndex) => (
          <div key={groupIndex} className="flex gap-6 min-w-max pr-6" aria-hidden={groupIndex === 1}>
            {items.map((item) => (
              <div
                key={`${groupIndex}-${item.id}`}
                className="px-7 py-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex items-center gap-4"
              >
                <span className="text-3xl font-mono">{item.symbol}</span>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-sm tracking-tight text-text font-medium">
                    {item.name}
                  </span>
                  <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <section
      id="skills"
      className="relative bg-background py-16 sm:py-24 overflow-hidden flex flex-col justify-center min-h-[40vh]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-accent/5 blur-[240px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 relative z-10 mb-8 sm:mb-12">
        <SectionHeader num="02" tag="Tech Stack" title="Tools & Technologies" />
      </div>

      {/* MOBILE DEDICATED LAYOUT (< md): 100% RELIABLE & VISIBLE GRID */}
      <div className="block md:hidden px-4 relative z-10 w-full">
        <div className="grid grid-cols-2 gap-3">
          {[...row1, ...row2].map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md flex items-center gap-3 shadow-sm"
            >
              <span className="text-2xl font-mono shrink-0">{item.symbol}</span>
              <div className="flex flex-col text-left min-w-0">
                <span className="font-mono text-xs font-semibold text-white truncate">
                  {item.name}
                </span>
                <span className="font-mono text-[9px] text-amber-500 uppercase tracking-wider truncate">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP LAYOUT (>= md): MARQUEE RUNWAY */}
      <motion.div
        className="hidden md:block w-full relative z-10 [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]"
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col gap-4">
          {/* Row 1: Leftward Drift */}
          <MarqueeRow items={row1} baseVelocity={-0.15} />

          {/* Row 2: Rightward Drift */}
          <MarqueeRow items={row2} baseVelocity={0.15} />
        </div>
      </motion.div>
    </section>
  );
}