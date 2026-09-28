"use client";

// Radial spokes center → each fixed module slot + a dot at every ring intersection.
// viewBox 1000×1000 (center 500), module radius = outermost ring (400). Angle 0 = top,
// clockwise. Lives inside the slowly-rotating decorative circle. Lines draw in; dots pulse.
import { motion } from "framer-motion";
import { RING_RADII } from "./Rings";

const C = 500;
const R = 400;

export default function ConnectorLines({ count, activeIndex = -1 }: { count: number; activeIndex?: number }) {
  const spokes = Array.from({ length: count }, (_, i) => {
    const a = (i * (360 / count) - 90) * (Math.PI / 180); // 0 = top, clockwise
    return { i, cos: Math.cos(a), sin: Math.sin(a) };
  });

  return (
    <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {spokes.map(({ i, cos, sin }) => {
        const on = i === activeIndex; // connecting line to the selected app glows
        return (
          <motion.line
            key={`l${i}`}
            x1={C}
            y1={C}
            x2={C + cos * R}
            y2={C + sin * R}
            stroke={on ? "#2f6bff" : "#6b7280"}
            strokeDasharray="2 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: on ? 0.95 : 0.16,
              strokeWidth: on ? 2.5 : 1,
            }}
            transition={{ duration: on ? 0.35 : 0.8, ease: "easeOut", delay: on ? 0 : 0.2 + i * 0.03 }}
          />
        );
      })}
      {spokes.map(({ i, cos, sin }) =>
        RING_RADII.map((r, j) => (
          <motion.circle
            key={`d${i}-${j}`}
            cx={C + cos * r}
            cy={C + sin * r}
            r={3}
            fill="#1b35e0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.85, 0.3] }}
            transition={{
              duration: 2.4,
              ease: "easeInOut",
              repeat: Infinity,
              delay: (i * RING_RADII.length + j) * 0.05,
            }}
          />
        )),
      )}
    </svg>
  );
}
