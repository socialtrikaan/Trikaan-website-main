"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin blue page-scroll progress bar, fixed at the very top. scaleX driven by page
// scroll, spring-smoothed. Fixed + transform → no layout shift.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-brand"
    />
  );
}
