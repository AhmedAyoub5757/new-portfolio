"use client";

import { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { ChevronLeft, ChevronRight, ExternalLink, BookOpen } from "lucide-react";

type Post = {
  id: string;
  title: string;
  date: string;
  readTime: string;
  tag: string;
  blurb: string;
  href: string;
};

const posts: Post[] = [
  {
    id: "7c8bc5dac8a1",
    title: "Building the Future of Web Development: A Complete Journey Through Frontend Mastery",
    date: "Sep 14, 2024",
    readTime: "14 min read",
    tag: "Web Development",
    blurb: "A complete walkthrough of the frontend journey — from HTML and CSS fundamentals through Bootstrap, Tailwind, JavaScript, jQuery, and React.",
    href: "https://medium.com/@kkahmed5757/building-the-future-of-web-development-a-complete-journey-through-frontend-mastery-7c8bc5dac8a1",
  },
  {
    id: "99dccc72cacc",
    title: "Building Dynamic UIs: Exploring React's Essentials and Beyond",
    date: "Aug 27, 2024",
    readTime: "4 min read",
    tag: "React",
    blurb: "A practical tour of React fundamentals — components, hooks, routing, and state — for building dynamic interfaces.",
    href: "https://medium.com/@kkahmed5757/building-dynamic-uis-exploring-reacts-essentials-and-beyond-99dccc72cacc",
  },
  {
    id: "8484f0b7b7fd",
    title: "jQuery: The Unsung Hero of Web Development — A Retrospective",
    date: "Aug 10, 2024",
    readTime: "4 min read",
    tag: "jQuery",
    blurb: "A look back at jQuery's role in web development and why it still holds up alongside modern frameworks.",
    href: "https://medium.com/@kkahmed5757/jquery-the-unsung-hero-of-web-development-a-retrospective-8484f0b7b7fd",
  },
  {
    id: "e4051a81cda4",
    title: "JavaScript Unleashed: From Fundamentals to Building a Cutting-Edge Weather App",
    date: "Aug 4, 2024",
    readTime: "4 min read",
    tag: "JavaScript",
    blurb: "JavaScript fundamentals through DOM manipulation and async programming, capped off with a real weather app build.",
    href: "https://medium.com/@kkahmed5757/javascript-unleashed-from-fundamentals-to-building-a-cutting-edge-weather-app-e4051a81cda4",
  },
  {
    id: "854d6cca1e7e",
    title: "Tailwind CSS Magic: Pro Tips and Parallax Perfection",
    date: "Jul 25, 2024",
    readTime: "4 min read",
    tag: "Tailwind CSS",
    blurb: "Practical Tailwind CSS tips paired with a step-by-step guide to building a parallax scrolling website.",
    href: "https://medium.com/@kkahmed5757/tailwind-css-magic-pro-tips-and-parallax-perfection-854d6cca1e7e",
  },
  {
    id: "2e7d3f175cef",
    title: "The Ultimate Guide to Bootstrap for Beginners",
    date: "Jul 13, 2024",
    readTime: "3 min read",
    tag: "Bootstrap",
    blurb: "An essentials-first walkthrough of Bootstrap's grid, components, and utilities for shipping responsive sites fast.",
    href: "https://medium.com/@kkahmed5757/the-ultimate-guide-to-bootstrap-for-beginners-2e7d3f175cef",
  },
  {
    id: "c7e47a46cb08",
    title: "Transforming Your Web Designs: Essential CSS Skills for 2024",
    date: "Jun 29, 2024",
    readTime: "4 min read",
    tag: "CSS",
    blurb: "A guide to modern CSS — selectors, Flexbox, transforms, and animation — for building polished, responsive layouts.",
    href: "https://medium.com/@kkahmed5757/transforming-your-web-designs-essential-css-skills-for-2024-c7e47a46cb08",
  },
];

const tags = ["All", ...Array.from(new Set(posts.map((p) => p.tag)))];

export default function Blogs() {
  const [activeTag, setActiveTag] = useState("All");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (activeTag === "All" ? posts : posts.filter((p) => p.tag === activeTag)),
    [activeTag]
  );

  const post = filtered[index] ?? filtered[0];

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + filtered.length) % filtered.length);
  };

  const selectTag = (tag: string) => {
    setActiveTag(tag);
    setIndex(0);
    setDirection(1);
    if (mobileCarouselRef.current) {
      mobileCarouselRef.current.scrollLeft = 0;
    }
  };

  return (
    <section id="blogs" className="relative py-20 md:py-28 px-4 sm:px-6 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader num="06" tag="Articles & Insights" title="Technical Writing & Articles" />

        {/* Tag filter chips (Desktop only) */}
        <div className="hidden md:flex flex-wrap gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => selectTag(tag)}
              className={`text-xs px-3.5 py-2 rounded-full border transition-all duration-200 cursor-pointer active:scale-95 touch-manipulation ${
                activeTag === tag
                  ? "bg-accent text-background border-accent font-bold shadow-[0_0_15px_rgba(255,122,0,0.3)]"
                  : "border-white/10 text-muted hover:border-accent/50 hover:text-text bg-white/[0.03]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* MOBILE VIEW (< 768px) CAROUSEL */}
        <div className="md:hidden">
          <div
            ref={mobileCarouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 -mx-4 px-4"
          >
            {filtered.map((item) => (
              <article
                key={item.id}
                className="snap-center shrink-0 w-[86vw] sm:w-[340px] rounded-xl bg-card p-5 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-dashed border-white/10">
                    <span className="text-[10px] font-mono text-accent tracking-widest font-bold">
                      ARTICLE {String(posts.findIndex((p) => p.id === item.id) + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-mono text-muted">{item.date}</span>
                  </div>

                  <p className="text-[10px] text-muted tracking-widest mb-1.5 uppercase font-mono">
                    TOPIC: {item.tag}
                  </p>

                  <h3 className="text-base font-semibold text-text leading-snug mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-muted leading-relaxed mb-4">{item.blurb}</p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
                  <span className="flex items-center gap-1 text-[11px] text-muted">
                    <BookOpen size={12} className="text-accent" />
                    {item.readTime}
                  </span>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent hover:text-hover font-medium transition-colors"
                  >
                    Read on Medium
                    <ExternalLink size={12} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* DESKTOP VIEW (>= 768px) */}
        <motion.div
          className="hidden md:block rounded-2xl border border-white/10 bg-[#0F0F11] p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ perspective: "1000px" }} className="w-full min-h-[360px] sm:min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={post?.id}
                custom={direction}
                initial={{ rotateX: direction === 1 ? 90 : -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: direction === 1 ? -90 : 90, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ transformOrigin: "top center", backfaceVisibility: "hidden" }}
                className="relative rounded-xl bg-card border border-white/10 p-6 sm:p-8 w-full"
              >
                {/* Punch holes */}
                <div className="absolute -top-3 left-8 w-2.5 h-2.5 rounded-full bg-background border border-white/15 z-10" />
                <div className="absolute -top-3 right-8 w-2.5 h-2.5 rounded-full bg-background border border-white/15 z-10" />

                {/* Card header row */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-dashed border-white/15">
                  <span className="text-[11px] font-mono text-accent tracking-widest">
                    ARTICLE {String(posts.findIndex((p) => p.id === post?.id) + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-mono text-muted">{post?.date}</span>
                </div>

                <p className="text-[11px] text-muted tracking-widest mb-2">
                  TOPIC: {post?.tag?.toUpperCase()}
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-text leading-snug mb-4">
                  {post?.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">{post?.blurb}</p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <BookOpen size={13} className="text-accent" />
                    {post?.readTime}
                  </span>
                  <a
                    href={post?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-hover transition-colors duration-300"
                  >
                    Read on Medium
                    <ExternalLink size={13} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Drawer controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => go(-1)}
              className="w-9 h-9 rounded-full border border-white/10 hover:border-accent flex items-center justify-center text-muted hover:text-accent transition-colors duration-300 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-xs font-mono text-muted tracking-wide">
              {String(index + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
            </span>

            <button
              onClick={() => go(1)}
              className="w-9 h-9 rounded-full border border-white/10 hover:border-accent flex items-center justify-center text-muted hover:text-accent transition-colors duration-300 cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}