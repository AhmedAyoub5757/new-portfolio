"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  num,
  tag,
  title,
}: {
  num: string;
  tag: string;
  title: string;
}) {
  return (
    <motion.div
      className="flex items-end gap-6 mb-10"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-6xl sm:text-7xl font-bold text-white/6 leading-none select-none">
        {num}
      </span>

      <div className="pb-1">
        <motion.div
          className="flex items-center gap-3 mb-2"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted font-mono">{tag}</span>
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-text leading-tight"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]"
            style={{ backgroundImage: "linear-gradient(90deg, #FF7A00, #FFA733, #FF7A00)" }}
          >
            {title}
          </span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
