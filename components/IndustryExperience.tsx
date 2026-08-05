"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  name: string;
  url: string;
  tagline: string;
  scope: string;
  tech: string[];
}

interface SectorVault {
  id: string;
  sectorNum: string;
  category: string;
  tagline: string;
  accentGlow: string;
  projects: Project[];
}

const sectors: SectorVault[] = [
  {
    id: "insurtech",
    sectorNum: "01",
    category: "HEALTHCARE & INSURTECH",
    tagline: "High-trust lead conversion engines & HIPAA-conscious client onboarding",
    accentGlow: "group-hover:border-cyan-500/50 bg-cyan-950/20",
    projects: [
      {
        name: "The Umbrella Insurance",
        url: "theumbrellainsurance.net",
        tagline: "Insurance Lead Funnel",
        scope: "Engineered rapid policy acquisition forms & responsive layout",
        tech: ["React", "Tailwind CSS", "REST APIs"],
      },
      {
        name: "SoulDNA",
        url: "souldna.co",
        tagline: "Therapy Booking Engine",
        scope: "Built client acquisition system for direct therapy session booking",
        tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
      },
    ],
  },
  {
    id: "ecommerce",
    sectorNum: "02",
    category: "NICHE E-COMMERCE & RETAIL",
    tagline: "Custom catalog architectures, specialized checkout, & author distribution",
    accentGlow: "group-hover:border-amber-500/50 bg-amber-950/20",
    projects: [
      {
        name: "Head Over Wheels",
        url: "headoverwheels.co",
        tagline: "Medical Equipment Storefront",
        scope: "E-Commerce catalog for wheelchair parts & accessibility gear",
        tech: ["Core PHP", "MySQL", "Tailwind CSS"],
      },
      {
        name: "Master of Flavor",
        url: "masterofflavor.com",
        tagline: "Barbecue Retail Hub",
        scope: "Custom showcase & direct storefront for premium barbecue products",
        tech: ["WordPress Core", "PHP", "CSS3"],
      },
      {
        name: "Burned Out",
        url: "burnedout.info",
        tagline: "Digital Book Platform",
        scope: "Direct author-to-consumer publishing marketplace",
        tech: ["React", "REST APIs", "Tailwind CSS"],
      },
    ],
  },
  {
    id: "corporate",
    sectorNum: "03",
    category: "CORPORATE & TECH AGENCIES",
    tagline: "High-end corporate presence & agency service showcases",
    accentGlow: "group-hover:border-purple-500/50 bg-purple-950/20",
    projects: [
      {
        name: "Redbox Technologies",
        url: "redboxtechnologies.co",
        tagline: "Software Agency Hub",
        scope: "Enterprise presence showcasing software engineering solutions",
        tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
    ],
  },
  {
    id: "legal",
    sectorNum: "04",
    category: "IP, LEGAL & CONVERSION FUNNELS",
    tagline: "Sub-second landing architectures engineered for trademark acquisition",
    accentGlow: "group-hover:border-emerald-500/50 bg-emerald-950/20",
    projects: [
      {
        name: "Trademark Fortify Platform",
        url: "trademarkfortify.com / lp",
        tagline: "IP Legal Landing Funnel",
        scope: "High-conversion landing page engine for US trademark filings",
        tech: ["HTML5", "Tailwind CSS", "JavaScript"],
      },
      {
        name: "US Trademark Support",
        url: "ustrademarksupport.com",
        tagline: "Legal Service Intake Portal",
        scope: "Client support intake hub for trademark registration cases",
        tech: ["Core PHP", "MySQL", "REST APIs"],
      },
      {
        name: "Launch Phase",
        url: "launchphase.io",
        tagline: "Startup Launch Funnel",
        scope: "Performance-tuned launch funnel for early-stage ventures",
        tech: ["React", "Framer Motion", "Tailwind CSS"],
      },
    ],
  },
];

export default function IndustryVault() {
  const [expandedId, setExpandedId] = useState<string | null>("insurtech");

  return (
    <section
      id="experience"
      className="relative bg-background py-32 px-4 sm:px-12 overflow-hidden min-h-screen flex flex-col justify-center select-none"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Kinetic Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted font-mono">
                INDUSTRY VAULT // 05
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-text tracking-tight">
              Production Footprint
            </h2>
          </div>

          <span className="font-mono text-xs text-muted">
            [ HOVER OR TAP TO EXPAND SECTOR ]
          </span>
        </div>

        {/* FULL-WIDTH ACCORDION STACK */}
        <div className="flex flex-col gap-4">
          {sectors.map((sector) => {
            const isExpanded = expandedId === sector.id;

            return (
              <motion.div
                key={sector.id}
                onClick={() => setExpandedId(isExpanded ? null : sector.id)}
                layout
                className={`group rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer ${
                  isExpanded
                    ? "border-accent bg-white/[0.03] shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                    : "border-white/10 bg-white/[0.005] hover:border-white/30 hover:bg-white/[0.015]"
                }`}
              >
                {/* ALWAYS-VISIBLE SECTOR HEADER BAND */}
                <div className="p-6 sm:p-8 flex items-center justify-between gap-6 relative">
                  
                  {/* Left Metadata */}
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span className="font-mono text-2xl sm:text-4xl text-muted/40 font-light group-hover:text-accent transition-colors">
                      {sector.sectorNum}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-2xl font-medium text-text group-hover:translate-x-1 transition-transform duration-300">
                        {sector.category}
                      </h3>
                      <p className="text-xs font-mono text-muted hidden sm:block mt-1">
                        {sector.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Right Status Pill */}
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted hidden md:inline-block">
                      {sector.projects.length} {sector.projects.length === 1 ? "DEPLOYMENT" : "DEPLOYMENTS"}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center font-mono text-sm transition-transform duration-500 ${
                        isExpanded ? "rotate-45 border-accent text-accent" : "text-muted"
                      }`}
                    >
                      +
                    </span>
                  </div>
                </div>

                {/* EXPANDABLE HORIZONTAL FILMSTRIP OF PROJECTS */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-white/10 bg-black/40"
                    >
                      {/* Horizontal Scrolling Track for Mobile / Grid for Desktop */}
                      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sector.projects.map((proj, idx) => (
                          <div
                            key={idx}
                            className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col justify-between gap-6 group/card"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2 mb-3">
                                <h4 className="text-lg font-medium text-text group-hover/card:text-accent transition-colors">
                                  {proj.name}
                                </h4>
                                <span className="font-mono text-[11px] text-accent bg-accent/10 px-2.5 py-1 rounded border border-accent/20 shrink-0">
                                  {proj.url}
                                </span>
                              </div>

                              <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
                                // {proj.tagline}
                              </p>

                              <p className="text-xs text-muted leading-relaxed">
                                {proj.scope}
                              </p>
                            </div>

                            {/* Tech Badges */}
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                              {proj.tech.map((t, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-muted"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}