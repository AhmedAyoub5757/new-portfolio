"use client";

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
    <div className="flex items-end gap-6 mb-10">
      <span className="text-6xl sm:text-7xl font-bold text-white/6 leading-none select-none">{num}</span>

      <div className="pb-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted font-mono">{tag}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-text leading-tight">
          <span className="bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]" style={{ backgroundImage: "linear-gradient(90deg, #FF7A00, #FFA733, #FF7A00)" }}>
            {title}
          </span>
        </h2>
      </div>
    </div>
  );
}
