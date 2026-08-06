"use client";

import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";
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
  repeatCount = 4,
}: {
  items: Skill[];
  baseVelocity: number;
  repeatCount?: number;
}) {
  const baseX = useMotionValue(0);

  // Repeat items dynamic number of times to guarantee full screen bleed
  const repeatedItems = Array.from({ length: repeatCount }, () => items).flat();

  useAnimationFrame((_, delta) => {
    const moveBy = baseVelocity * (delta / 1000) * 8;
    baseX.set(baseX.get() + moveBy);
  });

  // Seamless continuous modulo shift
  const x = useTransform(baseX, (v) => `${(v % 50) - 50}%`);

  return (
    <div className="flex whitespace-nowrap overflow-hidden py-3 select-none">
      <motion.div className="flex gap-6 min-w-max" style={{ x }}>
        {repeatedItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
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
      </motion.div>
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <section
      id="skills"
      className="relative bg-background py-24 overflow-hidden flex flex-col justify-center min-h-[50vh]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-accent/5 blur-[240px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full px-6 relative z-10 mb-12">
        <SectionHeader num="04" tag="Tech Stack" title="Tools & Technologies" />
      </div>

      {/* Full-Width Runway with Fade Edge Masks */}
      <div className="w-full relative z-10 [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
        <div className="flex flex-col gap-4">
          {/* Row 1: Leftward Drift with 8x Extended Array Length */}
          <MarqueeRow items={row1} baseVelocity={-0.15} repeatCount={8} />

          {/* Row 2: Rightward Drift with 8x Extended Array Length */}
          <MarqueeRow items={row2} baseVelocity={0.15} repeatCount={8} />
        </div>
      </div>
    </section>
  );
}