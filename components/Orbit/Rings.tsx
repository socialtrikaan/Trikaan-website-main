"use client";

// Four concentric rings, viewBox 1000×1000 (center 500). Faint dashed stroke so
// the parent's slow rotation reads as a subtle premium shimmer. Draws in on load.
import { motion } from "framer-motion";

export const RING_RADII = [210, 275, 340, 400] as const;

export default function Rings() {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className="absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden
    >
      {RING_RADII.map((r, i) => (
        <motion.circle
          key={r}
          cx={500}
          cy={500}
          r={r}
          stroke="#1b35e0"
          strokeOpacity={0.22}
          strokeWidth={1.4}
          strokeDasharray="1 8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 + i * 0.12 }}
        />
      ))}
    </svg>
  );
}
