"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Code2, Palette, Sparkles, Rocket, Layers, Braces } from "lucide-react";
import { Terminal } from "lucide-react";

const roles = ["Frontend Developer", "UI/UX Enthusiast", "Problem Solver", "Creative Coder"];

const orbitIcons = [
  { Icon: Code2, style: "top-[-8%] left-1/2 -translate-x-1/2" },
  { Icon: Palette, style: "top-[20%] right-[-12%]" },
  { Icon: Sparkles, style: "bottom-[15%] right-[-8%]" },
  { Icon: Rocket, style: "bottom-[-8%] left-1/2 -translate-x-1/2" },
  { Icon: Layers, style: "bottom-[15%] left-[-10%]" },
  { Icon: Braces, style: "top-[20%] left-[-12%]" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);

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
    setTilt({ rx: (0.5 - py) * 16, ry: (px - 0.5) * 16 });
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
      className="relative min-h-screen overflow-hidden flex items-center px-6"
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
            "radial-gradient(ellipse 75% 55% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 55% at 50% 40%, black 30%, transparent 100%)",
        }}
      />

      {/* Floating orbs (parallax) */}
      <div
        className="absolute top-1/4 left-[8%] w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-accent/20 blur-3xl animate-[float_6s_ease-in-out_infinite] pointer-events-none"
        style={{ transform: `translate(${center.x}px, ${center.y}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-[10%] w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-hover/10 blur-3xl animate-[float-slow_8s_ease-in-out_infinite] pointer-events-none"
        style={{ transform: `translate(${-center.x}px, ${-center.y}px)` }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT: Text content */}
        <div className="text-center md:text-left order-2 md:order-1">
          <div className="inline-flex items-center gap-2 bg-card border border-white/10 rounded-full px-4 py-1.5 mb-6 opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.1s]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-[pulse-dot_2s_infinite]" />
            <span className="text-xs text-muted tracking-wide">Available for work</span>
          </div>

          <p className="text-muted text-lg mb-2 opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.2s]">
            Hi, I&apos;m
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.3s]">
            <span
              className="bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]"
              style={{ backgroundImage: "linear-gradient(90deg, #FF7A00, #FFA733, #FF7A00)" }}
            >
              Ahmed
            </span>
          </h1>

          <div className="h-9 mb-6 opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.4s]">
            <span className="text-xl sm:text-2xl text-text font-medium">{displayText}</span>
            <span className="inline-block w-[2px] h-6 bg-accent ml-1 align-middle animate-[blink-caret_0.8s_steps(1)_infinite]" />
          </div>

          <p className="text-muted max-w-md mx-auto md:mx-0 mb-8 leading-relaxed opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.5s]">
            I build fast, accessible, and visually engaging web experiences —
            turning ideas into interfaces people enjoy using.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.6s]">
            <Link
              href="#work"
              className="group relative overflow-hidden bg-accent hover:bg-hover text-background font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,122,0,0.35)] hover:shadow-[0_0_30px_rgba(255,167,51,0.55)] w-full sm:w-auto text-center"
            >
              View My Work
            </Link>
            <Link
              href="/resume.pdf"
              className="border border-white/15 hover:border-accent text-text hover:text-accent font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center"
            >
              Download CV
            </Link>
          </div>

          <div className="flex items-center gap-5 justify-center md:justify-start mt-8 opacity-0 animate-[fade-in-down_0.6s_ease_forwards_0.7s]">
            {[
              { label: "GitHub", href: "https://github.com" },
              { label: "LinkedIn", href: "https://linkedin.com" },
              { label: "Twitter", href: "https://twitter.com" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent text-sm border-b border-transparent hover:border-accent transition-all duration-300 pb-0.5"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT: Interactive 3D tilt card */}
        {/* RIGHT: Self-typing code editor */}
        <div
          className="order-1 md:order-2 opacity-0 animate-[fade-in-down_0.8s_ease_forwards_0.3s] w-full max-w-md mx-auto"
          style={{ perspective: "1200px" }}
        >
          <div className="relative">
            {/* Glow behind editor */}
            <div className="absolute -inset-6 rounded-3xl bg-accent/15 blur-3xl -z-10 animate-[glow-pulse_4s_ease-in-out_infinite]" />

            <div
              ref={cardRef}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              className="relative rounded-2xl bg-[#0F0F11] border border-white/10 overflow-hidden transition-transform duration-200 ease-out will-change-transform"
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transformStyle: "preserve-3d",
                boxShadow: "0 25px 60px rgba(0,0,0,0.55)",
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
              <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-1.5 text-muted text-[11px]">
                  <Terminal size={12} />
                  <span>ahmed.ts</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex text-xs bg-white/[0.02] border-b border-white/10">
                <span className="px-4 py-2 text-text border-r border-white/10 border-t-2 border-t-accent bg-white/[0.04]">
                  ahmed.ts
                </span>
                <span className="px-4 py-2 text-muted border-r border-white/10">about.ts</span>
                <span className="px-4 py-2 text-muted">skills.ts</span>
              </div>

              {/* Code body */}
              <div className="p-5 font-mono text-[13px] sm:text-sm leading-relaxed">
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
                  const speed = 0.045; // seconds per character

                  return (
                    <>
                      {lines.map((line, i) => {
                        const delay = cumulativeDelay;
                        const duration = Math.max(line.text.length * speed, 0.3);
                        cumulativeDelay += duration + 0.08;

                        return (
                          <div key={i} className="flex">
                            <span className="text-muted/40 select-none w-6 shrink-0 text-right pr-3">
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
                      {/* Blinking cursor after typing completes */}
                      <div className="flex">
                        <span className="w-6 shrink-0" />
                        <span
                          className="inline-block w-[7px] h-[15px] bg-accent opacity-0"
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
              <div className="border-t border-white/10 bg-black/40 px-4 py-3 flex items-center justify-between opacity-0 animate-[fade-in-down_0.5s_ease_forwards_3.1s]">
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse-dot_2s_infinite]" />
                  <span className="text-muted">
                    status: <span className="text-green-400">online</span>
                  </span>
                </div>
                <span className="text-[11px] text-muted font-mono">v2.0.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <Link
        href="#about"
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted hover:text-accent transition-colors duration-300"
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <div className="w-5 h-8 rounded-full border border-current flex justify-center pt-1.5">
          <span className="w-1 h-1.5 rounded-full bg-current animate-[bounce-down_1.5s_ease-in-out_infinite]" />
        </div>
      </Link>
    </section>
  );
}