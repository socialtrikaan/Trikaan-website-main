"use client";

import { motion } from "framer-motion";

// Slow-pulsing blue light under the center card.
export default function Glow() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-3xl will-change-transform"
      animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
    />
  );
}
