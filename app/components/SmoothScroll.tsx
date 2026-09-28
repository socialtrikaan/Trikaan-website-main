"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Lenis buttery smooth scroll, driven by a single requestAnimationFrame loop.
// Desktop: smooth wheel. Touch: native scroll (syncTouch off) → stays 60fps on mobile,
// no touch hijack. Framer Motion reads the resulting scroll position as usual, so all
// existing whileInView / useScroll animations keep working , Lenis just makes them flow.
let lenisSingleton: Lenis | null = null;

// pause/resume smooth scroll (used by fullscreen modals to lock the page behind them)
export function lockScroll() {
  lenisSingleton?.stop();
}
export function unlockScroll() {
  lenisSingleton?.start();
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // touch devices: native scroll only. Lenis' rAF hijack stutters on mobile → skip it.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // easeOutExpo , long, weighted glide (Apple/Stripe feel)
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // native momentum on touch devices
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisSingleton = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisSingleton = null;
    };
  }, []);

  // jump to top instantly on route change (matches Next's default scroll reset)
  useEffect(() => {
    lenisSingleton?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
