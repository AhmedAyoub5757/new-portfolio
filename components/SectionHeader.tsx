"use client";

import { useEffect, useState } from "react";

export default function SectionHeader({
  num,
  tag,
  title,
}: {
  num: string;
  tag: string;
  title: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-start sm:items-end gap-3 sm:gap-6 mb-6 sm:mb-10 max-w-full text-left relative z-10 opacity-100">
      {/* Step Number */}
      <span className="text-4xl sm:text-7xl font-bold text-amber-500/50 sm:text-white/20 leading-none select-none shrink-0 pt-0.5 sm:pt-0 font-mono">
        {num}
      </span>

      <div className="pb-0.5 sm:pb-1 min-w-0 flex-1">
        {/* Tag line with animated indicator */}
        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF7A00] animate-ping shrink-0" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-amber-500 sm:text-neutral-400 font-mono font-semibold truncate">
            {tag}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight break-words text-white">
          <span className="text-[#FF7A00] sm:text-transparent sm:bg-clip-text sm:bg-[length:200%_auto] sm:animate-[gradient-shift_4s_ease_infinite] sm:bg-gradient-to-r sm:from-[#FF7A00] sm:via-[#FFA733] sm:to-[#FF7A00]">
            {title}
          </span>
        </h2>
      </div>
    </div>
  );
}
