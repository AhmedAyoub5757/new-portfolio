"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  };

  return (
    <section id="blogs" className="relative py-28 px-6 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <div className="flex items-end gap-4 mb-10">
          <span className="text-6xl sm:text-7xl font-bold text-white/5 leading-none select-none">05</span>
          <div className="pb-1">
            <p className="text-accent text-sm font-mono tracking-widest mb-1">// WRITTEN WORK</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text">The Card Catalog</h2>
          </div>
        </div>

        {/* Tag filter chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => selectTag(tag)}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors duration-300 ${
                activeTag === tag
                  ? "bg-accent text-background border-accent"
                  : "border-white/10 text-muted hover:border-accent/50 hover:text-text"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Catalog drawer */}
        <div className="rounded-2xl border border-white/10 bg-[#0F0F11] p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">
          <div style={{ perspective: "1400px" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={post?.id}
                custom={direction}
                initial={{ rotateX: direction === 1 ? 90 : -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: direction === 1 ? -90 : 90, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ transformOrigin: "top center" }}
                className="relative rounded-xl bg-card border border-white/10 p-6 sm:p-8"
              >
                {/* Punch holes */}
                <div className="absolute -top-3 left-8 w-2.5 h-2.5 rounded-full bg-background border border-white/15" />
                <div className="absolute -top-3 right-8 w-2.5 h-2.5 rounded-full bg-background border border-white/15" />

                {/* Card header row */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-dashed border-white/15">
                  <span className="text-[11px] font-mono text-accent tracking-widest">
                    VOL. {String(posts.findIndex((p) => p.id === post?.id) + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-mono text-muted">{post?.date}</span>
                </div>

                <p className="text-[11px] text-muted tracking-widest mb-2">SUBJECT: {post?.tag.toUpperCase()}</p>
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
              className="w-9 h-9 rounded-full border border-white/10 hover:border-accent flex items-center justify-center text-muted hover:text-accent transition-colors duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-xs font-mono text-muted tracking-wide">
              {String(index + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
            </span>

            <button
              onClick={() => go(1)}
              className="w-9 h-9 rounded-full border border-white/10 hover:border-accent flex items-center justify-center text-muted hover:text-accent transition-colors duration-300"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}