"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { SPRING } from "@/lib/animations";

/**
 * useScrollProgress , 0→1 spring-smoothed progress as `ref` travels through the
 * viewport. Reduced-motion → returns raw (unsmoothed) progress.
 */
export function useScrollProgress(
  offset: [string, string] = ["start end", "end start"],
) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // ponytail: offset cast , framer types it as a template-literal union, string[] is fine at runtime
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as never,
  });
  const smooth = useSpring(scrollYProgress, SPRING.soft);
  return { ref, progress: reduce ? scrollYProgress : smooth };
}

/**
 * useParallax , maps scroll progress of `ref` to a vertical shift in px.
 * Reduced-motion → static 0 (no movement).
 */
export function useParallax(distance = 80): {
  ref: React.RefObject<HTMLElement | null>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] as never,
  });
  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [distance, -distance],
  );
  const y = useSpring(raw, SPRING.soft);
  return { ref, y };
}
