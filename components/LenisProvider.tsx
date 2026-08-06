"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";

type LenisScrollApi = {
  scrollToTarget: (target: string | HTMLElement, offset?: number) => void;
};

const LenisScrollContext = createContext<LenisScrollApi | null>(null);

export function useLenisScroll() {
  return useContext(LenisScrollContext);
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  const scrollToTarget = useCallback((target: string | HTMLElement, offset = -88) => {
    lenisRef.current?.scrollTo(target, {
      offset,
      duration: 1.1,
      lerp: 0.08,
    });
  }, []);

  const value = useMemo(() => ({ scrollToTarget }), [scrollToTarget]);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      anchors: true,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const id = hash.slice(1);
      const element = document.getElementById(id);
      if (!element) return;

      event.preventDefault();
      lenis.scrollTo(element, {
        offset: -88,
        duration: 1.1,
        lerp: 0.08,
      });
    };

    frameId = window.requestAnimationFrame(raf);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.cancelAnimationFrame(frameId);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return <LenisScrollContext.Provider value={value}>{children}</LenisScrollContext.Provider>;
}