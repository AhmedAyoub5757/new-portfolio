"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiJavascript,
  SiNodedotjs,
  SiRedux,
  SiVite,
  SiSass,
  SiPhp,
  SiMysql,
  SiWordpress,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiLaravel,
  SiFigma,
  SiVercel,
  SiRedis,
  SiGraphql,
  SiExpress,
  SiNpm,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import type { IconType } from "react-icons";

interface Skill {
  id: string;
  name: string;
  category: string;
  icon: IconType;
  color: string;
}

const row1: Skill[] = [
  { id: "react", name: "React", category: "UI Engine", icon: SiReact, color: "#61DAFB" },
  { id: "nextjs", name: "Next.js", category: "Framework", icon: SiNextdotjs, color: "#FFFFFF" },
  { id: "typescript", name: "TypeScript", category: "Type System", icon: SiTypescript, color: "#3178C6" },
  { id: "javascript", name: "JavaScript", category: "Language", icon: SiJavascript, color: "#F7DF1E" },
  { id: "tailwind", name: "Tailwind CSS", category: "Styling", icon: SiTailwindcss, color: "#06B6D4" },
  { id: "framer", name: "Framer Motion", category: "Animation", icon: SiFramer, color: "#0055FF" },
  { id: "sass", name: "Sass", category: "Styling", icon: SiSass, color: "#CC6699" },
  { id: "redux", name: "Redux", category: "State Mgmt", icon: SiRedux, color: "#764ABC" },
  { id: "vite", name: "Vite", category: "Build Tool", icon: SiVite, color: "#646CFF" },
  { id: "nodejs", name: "Node.js", category: "Runtime", icon: SiNodedotjs, color: "#5FA04E" },
  { id: "figma", name: "Figma", category: "Design", icon: SiFigma, color: "#F24E1E" },
  { id: "vercel", name: "Vercel", category: "Deployment", icon: SiVercel, color: "#FFFFFF" },
];

const row2: Skill[] = [
  { id: "php", name: "Core PHP", category: "Backend Engine", icon: SiPhp, color: "#777BB4" },
  { id: "laravel", name: "Laravel", category: "Framework", icon: SiLaravel, color: "#FF2D20" },
  { id: "express", name: "Express", category: "Backend", icon: SiExpress, color: "#FFFFFF" },
  { id: "mysql", name: "MySQL", category: "Database", icon: SiMysql, color: "#4479A1" },
  { id: "redis", name: "Redis", category: "Cache Store", icon: SiRedis, color: "#FF4438" },
  { id: "apis", name: "REST APIs", category: "Architecture", icon: TbApi, color: "#10B981" },
  { id: "graphql", name: "GraphQL", category: "Query Language", icon: SiGraphql, color: "#E10098" },
  { id: "wordpress", name: "WordPress Core", category: "CMS", icon: SiWordpress, color: "#21759B" },
  { id: "git", name: "Git", category: "Version Control", icon: SiGit, color: "#F05032" },
  { id: "github", name: "GitHub", category: "Version Control", icon: SiGithub, color: "#FFFFFF" },
  { id: "docker", name: "Docker", category: "Containers", icon: SiDocker, color: "#2496ED" },
  { id: "postman", name: "Postman", category: "API Testing", icon: SiPostman, color: "#FF6C37" },
  { id: "npm", name: "npm", category: "Package Mgmt", icon: SiNpm, color: "#CB3837" },
];

// Categorized grouping specifically tailored for mobile displays
const mobileCategories = [
  {
    title: "Frontend & UI",
    items: [
      row1[0], // React
      row1[1], // Next.js
      row1[2], // TypeScript
      row1[3], // JavaScript
      row1[4], // Tailwind CSS
      row1[5], // Framer Motion
      row1[6], // Sass
      row1[7], // Redux
    ],
  },
  {
    title: "Backend & Databases",
    items: [
      row1[9], // Node.js
      row2[0], // Core PHP
      row2[1], // Laravel
      row2[2], // Express
      row2[3], // MySQL
      row2[4], // Redis
      row2[5], // REST APIs
      row2[6], // GraphQL
      row2[7], // WordPress
    ],
  },
  {
    title: "Tools & Infrastructure",
    items: [
      row1[8],  // Vite
      row1[10], // Figma
      row1[11], // Vercel
      row2[8],  // Git
      row2[9],  // GitHub
      row2[10], // Docker
      row2[11], // Postman
      row2[12], // npm
    ],
  },
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
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${groupIndex}-${item.id}`}
                  className="px-7 py-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex items-center gap-4"
                >
                  <Icon size={30} style={{ color: item.color }} className="shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-sm tracking-tight text-white font-medium">
                      {item.name}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
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

      {/* MOBILE DEDICATED LAYOUT (< md): Categorized Groups */}
      <div className="block md:hidden px-4 relative z-10 w-full space-y-4">
        {mobileCategories.map((group, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-lg"
          >
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-amber-500 mb-3 font-semibold">
              {group.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10"
                  >
                    <Icon size={18} style={{ color: item.color }} className="shrink-0" />
                    <span className="font-mono text-xs font-medium text-white">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
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