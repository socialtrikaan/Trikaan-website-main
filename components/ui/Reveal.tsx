"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Site-wide entrance animation: fade + rise + subtle scale when scrolled into view (once).
// Respects prefers-reduced-motion via the MotionConfig in app/providers.tsx.
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 60,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", duration: 0.52, bounce: 0.15, delay }}
    >
      {children}
    </motion.div>
  );
}
