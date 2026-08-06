"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ProjectImage {
  id: string;
  name: string;
  url: string;
  imageSrc: string;
}

const projects: ProjectImage[] = [
  {
    id: "redbox",
    name: "Redbox Technologies",
    url: "https://redboxtechnologies.co",
    imageSrc: "/redbox.png",
  },
  {
    id: "burnedout",
    name: "Burned Out",
    url: "https://burnedout.info",
    imageSrc: "/burnedout.png",
  },
  {
    id: "headoverwheels",
    name: "Head Over Wheels",
    url: "https://headoverwheels.co",
    imageSrc: "/how.png",
  },
  {
    id: "launchphase",
    name: "Launch Phase",
    url: "https://launchphase.io",
    imageSrc: "/launchphase.png",
  },
  {
    id: "mof",
    name: "Master of Flavor",
    url: "https://masterofflavor.com",
    imageSrc: "/mof.png",
  },
  {
    id: "souldna",
    name: "SoulDNA",
    url: "https://souldna.co",
    imageSrc: "/souldna.png",
  },
  {
    id: "tui",
    name: "The Umbrella Insurance",
    url: "https://theumbrellainsurance.net",
    imageSrc: "/tui.png",
  },
];

function ImageCard({
  project,
  index,
  total,
  progress,
}: {
  project: ProjectImage;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const startRange = index / total;
  const endRange = (index + 1) / total;

  // Progressive scaling down for stacked cards underneath
  const targetScale = 1 - (total - index) * 0.035;
  const scale = useTransform(progress, [startRange, 1], [1, targetScale]);

  // Smooth brightness dimming for lower cards as new cards stack on top
  const brightness = useTransform(progress, [endRange, 1], [1, 0.4]);

  return (
    <div className="sticky top-0 h-screen flex items-center justify-center">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}
        style={{
          scale,
          filter: `brightness(${brightness.get()})`,
          top: `calc(16% + ${index * 16}px)`,
        }}
        className="relative w-full max-w-5xl h-[68vh] rounded-2xl sm:rounded-3xl border border-white/20 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] cursor-pointer group bg-neutral-950 transition-all duration-300 ease-out z-10"
      >
        <img
          src={project.imageSrc}
          alt={project.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Floating Hover Pill */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
            className="px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 border border-white"
          >
            <span>Visit Site</span>
            <span className="text-sm">↗</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
import SectionHeader from "./SectionHeader";

export default function StackedImageGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative bg-background pb-16 px-4 sm:px-8 select-none"
    >
      {/* Sticky Section Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md pt-6 pb-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <SectionHeader num="05" tag="Portfolio Showcase" title="Selected Works" />
          </div>
          <span className="font-mono text-xs text-muted tracking-wider">
            [ SCROLL TO STACK ]
          </span>
        </div>
      </div>

      {/* Stacked Cards Track */}
      <div className="relative">
        {projects.map((project, idx) => (
          <ImageCard
            key={project.id}
            project={project}
            index={idx}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}