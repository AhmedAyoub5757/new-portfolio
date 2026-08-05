"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";

interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  impact: string;
  gradient: string;
}

const services: Service[] = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend & UI Engineering",
    subtitle: "Pixel-perfect, high-performance web applications",
    description:
      "Transforming wireframes and designs into fluid, interactive, and responsive user interfaces using Next.js and Tailwind CSS architectures.",
    deliverables: [
      "Responsive React / Next.js Interfaces",
      "Tailwind CSS & Utility Architecture",
      "Framer Motion Animations",
      "Core Web Vitals Optimization",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    impact: "Sub-second load times & 95+ Lighthouse scores",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    id: "backend",
    number: "02",
    title: "Backend & API Systems",
    subtitle: "Scalable backend architecture & clean databases",
    description:
      "Engineered APIs and database architectures optimized for data integrity, low latency queries, and resilient server-side business logic.",
    deliverables: [
      "RESTful API & Endpoint Design",
      "Custom PHP & Node.js Backend Logic",
      "Database Schema & Query Optimization",
      "Authentication & Security Controls",
    ],
    techStack: ["PHP", "Node.js", "MySQL", "REST APIs", "JWT"],
    impact: "Secure, performant, and clean backend logic",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    id: "fullstack",
    number: "03",
    title: "End-to-End Applications",
    subtitle: "Complete MVP & SaaS production setup",
    description:
      "From zero setup to production deployment — delivering fully connected frontend and backend web applications built to scale.",
    deliverables: [
      "Full-Stack Web App Development",
      "Custom Dashboards & Control Panels",
      "Third-Party Service Integration",
      "Deployment & CI/CD Setup",
    ],
    techStack: ["Next.js", "PHP", "Tailwind", "Git", "Vercel"],
    impact: "Rapid launch cycle with production-grade code",
    gradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: "wordpress",
    number: "04",
    title: "Custom WordPress Solutions",
    subtitle: "Bespoke themes built without bloatware",
    description:
      "Custom WordPress architectures built from scratch with clean PHP themes. Completely tailored for fast performance and intuitive editing.",
    deliverables: [
      "Custom PHP Theme Development",
      "Plugin Customization & Integration",
      "Headless WordPress Architecture",
      "Speed Hardening & Security Optimization",
    ],
    techStack: ["PHP", "WordPress API", "JavaScript", "Tailwind CSS"],
    impact: "Clean control without heavy page builders",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
];

export default function ServicesScrollPinned() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 1. Tracks vertical scroll inside the container height (300vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Map scroll progress (0 to 1) to individual active indices (0, 1, 2, 3)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = 1 / services.length;
    const index = Math.min(
      Math.floor(latest / step),
      services.length - 1
    );
    setActiveIndex(index);
  });

  const activeService = services[activeIndex];

  // 3. Overall section progress rail height animation
  const activeRailHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    // Height set to 300vh to give the user natural vertical scroll runway
    <section ref={containerRef} className="relative bg-background h-[300vh]">
      {/* Sticky viewport frame locks both sides while user scrolls vertical runway */}
      <div className="sticky top-0 h-screen flex flex-col justify-center px-6 overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[550px] h-[550px] bg-accent/5 blur-[170px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-10">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted font-mono">
              Capabilities — 02
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Services List with vertical progress rail */}
            <div className="lg:col-span-6 relative flex gap-6">
              
              {/* Vertical Progress Rail */}
              <div className="w-[2px] bg-white/10 relative rounded-full overflow-hidden self-stretch">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-accent"
                  style={{ height: activeRailHeight }}
                />
              </div>

              {/* List Items */}
              <div className="flex flex-col gap-4 flex-1">
                {services.map((service, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={service.id}
                      className={`p-5 rounded-2xl transition-all duration-300 relative border ${
                        isActive
                          ? "bg-white/[0.04] border-accent/40 shadow-xl translate-x-2"
                          : "bg-transparent border-transparent opacity-40 hover:opacity-75"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`font-mono text-xs ${
                            isActive ? "text-accent" : "text-muted"
                          }`}
                        >
                          {service.number} // CAPABILITY
                        </span>
                        {isActive && (
                          <span className="text-xs font-mono text-accent">
                            [ ACTIVE ]
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-xl font-medium transition-colors ${
                          isActive ? "text-accent" : "text-text"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="text-xs text-muted mt-1">{service.subtitle}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Dynamic Spec Card updates cleanly on vertical scroll */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 p-8 backdrop-blur-md overflow-hidden min-h-[440px] flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative z-10"
                  >
                    {/* Dynamic Ambient Background Flare */}
                    <div
                      className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${activeService.gradient} blur-3xl rounded-full pointer-events-none`}
                    />

                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <span className="font-mono text-xs text-accent uppercase tracking-widest">
                        SPEC SPECIFICATION // {activeService.number}
                      </span>
                      <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent">
                        System Active
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-text/90 leading-relaxed mb-6">
                      {activeService.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="mb-6">
                      <h4 className="text-xs font-mono uppercase text-muted tracking-wider mb-3">
                        Deliverables
                      </h4>
                      <div className="space-y-2">
                        {activeService.deliverables.map((item, idx) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-3 text-sm text-text"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Stack Badges */}
                    <div className="mb-6">
                      <h4 className="text-xs font-mono uppercase text-muted tracking-wider mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeService.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Target Metric */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-mono text-muted">Impact:</span>
                      <span className="text-xs font-medium text-accent">
                        {activeService.impact}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}