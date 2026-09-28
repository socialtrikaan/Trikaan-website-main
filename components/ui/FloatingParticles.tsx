"use client";

import { motion } from "framer-motion";

// Subtle decorative drifting dots for section backgrounds. Absolute + pointer-events-none
// → zero layout impact. Deterministic positions (no Math.random → SSR-safe).
const DOTS = [
  { l: "6%", t: "20%", s: 6, d: 9, dl: 0 },
  { l: "18%", t: "72%", s: 4, d: 11, dl: 1.1 },
  { l: "34%", t: "40%", s: 5, d: 10, dl: 0.5 },
  { l: "52%", t: "82%", s: 3, d: 12, dl: 1.9 },
  { l: "64%", t: "24%", s: 7, d: 9.5, dl: 0.3 },
  { l: "78%", t: "58%", s: 4, d: 11.5, dl: 1.5 },
  { l: "88%", t: "34%", s: 5, d: 10.5, dl: 0.8 },
  { l: "94%", t: "76%", s: 3, d: 12.5, dl: 2.3 },
];

export default function FloatingParticles({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {DOTS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand/10"
          style={{ left: p.l, top: p.t, width: p.s, height: p.s }}
          animate={{ y: [0, -16, 0], x: [0, 8, 0], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: p.d, delay: p.dl, ease: "easeInOut", repeat: Infinity }}
        />
      ))}
    </div>
  );
}
