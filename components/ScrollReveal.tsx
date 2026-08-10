"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

type Preset = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleUp" | "stagger";

const presets: Record<Preset, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  stagger: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

interface ScrollRevealProps {
  children: ReactNode;
  preset?: Preset;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  preset = "fadeUp",
  delay = 0,
  duration = 0.5,
  className,
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={presets[preset]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
