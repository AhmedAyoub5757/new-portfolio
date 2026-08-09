"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Code2, Palette, Sparkles, Rocket, Layers, Braces, Terminal } from "lucide-react";
import { useLenisScroll } from "./LenisProvider";

const roles = ["Frontend Developer", "UI/UX Enthusiast", "Problem Solver", "Creative Coder"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lenisScroll = useLenisScroll();

  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);
  const _ringR = 8;
  const _ringC = Math.PI * 2 * _ringR;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
    setCenter({
      x: (e.clientX - rect.left - rect.width / 2) / 25,
      y: (e.clientY - rect.top - rect.height / 2) / 25,
    });
  };

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * 14, ry: (px - 0.5) * 14 });
    setGlare({ x: px * 100, y: py * 100, opacity: 0.5 });
  };

  const handleCardLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 40 : 90;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(current.slice(0, displayText.length - 1));
        } else {
          setDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayText, deleting, roleIndex]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="home"
      className="relative w-full max-w-full overflow-x-hidden min-h-[40vh] md:min-h-[70vh] lg:min-h-[75vh] xl:min-h-[40vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-12 sm:pt-32 lg:pt-28 lg:pb-8"
      style={{
        background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(255,122,0,0.12), transparent 70%), #0B0B0C`,
      }}
    >
      {/* Fading dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 30%, black 40%, transparent 100%)",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 left-[5%] w-36 h-36 sm:w-56 sm:h-56 rounded-full bg-accent/20 blur-3xl animate-[float_6s_ease-in-out_infinite] pointer-events-none"
        style={{ transform: `translate(${center.x}px, ${center.y}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-[5%] w-40 h-40 sm:w-72 sm:h-72 rounded-full bg-hover/10 blur-3xl animate-[float-slow_8s_ease-in-out_infinite] pointer-events-none"
        style={{ transform: `translate(${-center.x}px, ${-center.y}px)` }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* LEFT: Text content (Order 1 for mobile top position) */}
        <div className="text-center md:text-left order-1 flex flex-col items-center md:items-start">
          <div className="inline-flex items-center gap-2 bg-card border border-white/10 rounded-full px-3.5 py-1 mb-4 lg:mb-3 opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.1s]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-[pulse-dot_2s_infinite]" />
            <span className="text-xs text-muted tracking-wide">Available for work</span>
          </div>

          <p className="text-muted text-base sm:text-lg mb-1 opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.2s]">
            Hi, I&apos;m
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-3 lg:mb-2 opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.3s]">
            <span
              className="bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]"
              style={{ backgroundImage: "linear-gradient(90deg, #FF7A00, #FFA733, #FF7A00)" }}
            >
              Ahmed
            </span>
          </h1>

          <div className="hidden md:block min-h-[2rem] sm:min-h-[2.25rem] mb-4 lg:mb-3 flex items-center justify-center md:justify-start opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.4s]">
            <span className="text-lg sm:text-2xl text-text font-medium inline-block">
              {displayText || "\u00A0"}
            </span>
            <span className="inline-block w-[2px] h-5 sm:h-6 bg-accent ml-1 align-middle animate-[blink-caret_0.8s_steps(1)_infinite]" />
          </div>

          <p className="text-muted text-sm sm:text-base max-w-md mx-auto md:mx-0 mb-6 lg:mb-5 leading-relaxed opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.5s]">
            I build fast, accessible, and visually engaging web experiences —
            turning ideas into interfaces people enjoy using.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center md:justify-start w-full sm:w-auto opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.6s]">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById("work");
                if (target) {
                  lenisScroll?.scrollToTarget(target);
                }
              }}
              className="group relative overflow-hidden bg-accent hover:bg-hover text-background font-semibold px-6 py-2.5 sm:px-7 sm:py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,122,0,0.35)] hover:shadow-[0_0_30px_rgba(255,167,51,0.55)] w-full sm:w-auto text-center text-sm sm:text-base"
            >
              View My Work
            </a>
            <a
              href="/AhmedResume.pdf"
              download
              onClick={() => {
                setIsDownloading(true);
                setDownloadDone(false);
                setTimeout(() => {
                  setIsDownloading(false);
                  setDownloadDone(true);
                  setTimeout(() => setDownloadDone(false), 1400);
                }, 1200);
              }}
              className="relative flex items-center justify-center gap-2.5 border border-white/15 hover:border-accent text-text hover:text-accent font-semibold px-6 py-2.5 sm:px-7 sm:py-3 rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
            >
              <span className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6">
                <svg width="24" height="24" viewBox="0 0 24 24" className="absolute inset-0 w-full h-full">
                  <circle cx="12" cy="12" r={_ringR} stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="transparent" />
                  <circle
                    cx="12"
                    cy="12"
                    r={_ringR}
                    stroke="#FFA733"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    fill="transparent"
                    style={{
                      strokeDasharray: _ringC,
                      strokeDashoffset: isDownloading ? 0 : _ringC,
                      transition: "stroke-dashoffset 1.2s linear",
                      transform: "rotate(-90deg)",
                      transformOrigin: "50% 50%",
                      filter: isDownloading ? "drop-shadow(0 4px 8px rgba(255,167,51,0.14))" : undefined,
                    }}
                  />
                </svg>

                <svg width="18" height="18" viewBox="0 0 24 24" className="relative z-10 w-4 h-4 sm:w-4.5 sm:h-4.5">
                  <g
                    style={{
                      transition: "transform 300ms cubic-bezier(.2,.9,.2,1), opacity 200ms",
                      transform: isDownloading ? "translateY(3px) scale(0.95)" : downloadDone ? "translateY(-2px) scale(0)" : "translateY(0) scale(1)",
                      opacity: downloadDone ? 0 : 1,
                    }}
                  >
                    <path d="M12 3v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="4" y="15.5" width="16" height="3" rx="1" fill="currentColor" opacity="0.06" />
                  </g>

                  <g
                    style={{
                      transition: "transform 300ms cubic-bezier(.2,.9,.2,1), opacity 200ms",
                      transform: downloadDone ? "scale(1)" : "scale(0.6)",
                      opacity: downloadDone ? 1 : 0,
                      transformOrigin: "50% 50%",
                    }}
                  >
                    <path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>
                </svg>
              </span>
              <span>
                {isDownloading ? "Downloading..." : downloadDone ? "Downloaded" : "Download CV"}
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start mt-6 lg:mt-5 opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.7s]">
            <a href="https://github.com/AhmedAyoub5757" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>

            <a href="https://www.linkedin.com/in/ahmed-ayoub-3a262b279/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
              </svg>
            </a>

            <a href="https://medium.com/@kkahmed5757" target="_blank" rel="noopener noreferrer" aria-label="Medium" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M2 6.5v11h5.5L12 13l4.5 4.5H22v-11h-3.5L12 16 5.5 6.5H2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT: Code Editor Container (Order 2 for mobile bottom position) */}
        <div
          className="order-2 opacity-0 animate-[fade-in-down_0.8s_ease_forwards_0.3s] w-full max-w-md mx-auto"
          style={{ perspective: "1200px" }}
        >
          <div className="relative w-full">
            {/* Glow behind editor */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-accent/15 blur-2xl sm:blur-3xl -z-10 animate-[glow-pulse_4s_ease-in-out_infinite]" />

            <div
              ref={cardRef}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              className="relative rounded-xl sm:rounded-2xl bg-[#0F0F11] border border-white/10 overflow-hidden transition-transform duration-200 ease-out will-change-transform max-w-full"
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transformStyle: "preserve-3d",
                boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
              }}
            >
              {/* Glare */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200 z-10"
                style={{
                  background: `radial-gradient(280px circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.12), transparent 60%)`,
                  opacity: glare.opacity,
                }}
              />

              {/* Title bar */}
              <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white/[0.03] border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-1.5 text-muted text-[10px] sm:text-[11px]">
                  <Terminal size={12} />
                  <span>ahmed.ts</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex text-[11px] sm:text-xs bg-white/[0.02] border-b border-white/10 overflow-x-auto no-scrollbar">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-text border-r border-white/10 border-t-2 border-t-accent bg-white/[0.04] shrink-0">
                  ahmed.ts
                </span>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-muted border-r border-white/10 shrink-0">about.ts</span>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-muted shrink-0">skills.ts</span>
              </div>

              {/* Code body */}
              <div className="p-3 sm:p-5 font-mono text-[12px] sm:text-[13px] leading-relaxed overflow-x-auto">
                {(() => {
                  const lines: { text: string; render: React.ReactNode }[] = [
                    {
                      text: "const ahmed = {",
                      render: (
                        <>
                          <span className="text-[#FF7A00]">const</span>{" "}
                          <span className="text-text">ahmed</span> = {"{"}
                        </>
                      ),
                    },
                    {
                      text: '  role: "Frontend Developer",',
                      render: (
                        <>
                          {"  "}
                          <span className="text-[#c792ea]">role</span>:{" "}
                          <span className="text-[#FFA733]">&quot;Frontend Developer&quot;</span>,
                        </>
                      ),
                    },
                    {
                      text: '  stack: ["React", "Next.js", "TypeScript"],',
                      render: (
                        <>
                          {"  "}
                          <span className="text-[#c792ea]">stack</span>: [
                          <span className="text-[#FFA733]">&quot;React&quot;</span>,{" "}
                          <span className="text-[#FFA733]">&quot;Next.js&quot;</span>,{" "}
                          <span className="text-[#FFA733]">&quot;TypeScript&quot;</span>],
                        </>
                      ),
                    },
                    {
                      text: '  passion: "Crafting delightful UI",',
                      render: (
                        <>
                          {"  "}
                          <span className="text-[#c792ea]">passion</span>:{" "}
                          <span className="text-[#FFA733]">&quot;Crafting delightful UI&quot;</span>,
                        </>
                      ),
                    },
                    {
                      text: '  status: "Building cool stuff 🚀"',
                      render: (
                        <>
                          {"  "}
                          <span className="text-[#c792ea]">status</span>:{" "}
                          <span className="text-[#FFA733]">&quot;Building cool stuff 🚀&quot;</span>
                        </>
                      ),
                    },
                    {
                      text: "};",
                      render: <>{"}"};</>,
                    },
                  ];

                  let cumulativeDelay = 0.3;
                  const speed = 0.045;

                  return (
                    <>
                      {lines.map((line, i) => {
                        const delay = cumulativeDelay;
                        const duration = Math.max(line.text.length * speed, 0.3);
                        cumulativeDelay += duration + 0.08;

                        return (
                          <div key={i} className="flex min-w-max">
                            <span className="text-muted/40 select-none w-5 sm:w-6 shrink-0 text-right pr-2 sm:pr-3">
                              {i + 1}
                            </span>
                            <span
                              className="whitespace-nowrap overflow-hidden inline-block"
                              style={{
                                width: 0,
                                animation: `typing ${duration}s steps(${line.text.length}) forwards ${delay}s`,
                              }}
                            >
                              {line.render}
                            </span>
                          </div>
                        );
                      })}
                      {/* Blinking cursor */}
                      <div className="flex">
                        <span className="w-5 sm:w-6 shrink-0" />
                        <span
                          className="inline-block w-[6px] sm:w-[7px] h-[13px] sm:h-[15px] bg-accent opacity-0"
                          style={{
                            animation: `appear 0.01s forwards ${cumulativeDelay}s, blink-caret 0.8s steps(1) infinite ${cumulativeDelay}s`,
                          }}
                        />
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Terminal footer */}
              <div className="border-t border-white/10 bg-black/40 px-3.5 sm:px-4 py-2.5 flex items-center justify-between opacity-0 animate-[fade-in-down_0.5s_ease_forwards_3.1s]">
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse-dot_2s_infinite]" />
                  <span className="text-muted">
                    status: <span className="text-green-400">online</span>
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-muted font-mono">v2.0.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <Link
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById("about");
          if (target) {
            lenisScroll?.scrollToTarget(target);
          }
        }}
        className="hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-muted hover:text-accent transition-colors duration-300"
      >
        <span className="text-[10px] tracking-widest">SCROLL</span>
        <div className="w-4 h-7 rounded-full border border-current flex justify-center pt-1">
          <span className="w-1 h-1.5 rounded-full bg-current animate-[bounce-down_1.5s_ease-in-out_infinite]" />
        </div>
      </Link>
    </section>
  );
}