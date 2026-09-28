"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

// Reusable card interaction: subtle 3D tilt toward the cursor, a shadow that shifts with it,
// and a slow perpetual float. Rest state is unchanged (tilt/shadow only engage on hover).
export default function Tilt({
  children,
  className,
  max = 7,
  float = true,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  float?: boolean;
}) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 18 };
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), spring);
  const shX = useSpring(useTransform(mx, [0, 1], [18, -18]), spring);
  const shY = useSpring(useTransform(my, [0, 1], [-6, 30]), spring);
  const shadow = useMotionTemplate`${shX}px ${shY}px 40px -16px rgba(3,66,253,0.28)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, boxShadow: shadow, transformPerspective: 900 }}
      animate={float ? { y: [0, -6, 0] } : undefined}
      transition={float ? { duration: 6, ease: "easeInOut", repeat: Infinity } : undefined}
    >
      {children}
    </motion.div>
  );
}
