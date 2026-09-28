"use client";

import { motion, type Variants } from "framer-motion";
import { VARIANTS, viewportOnce, type VariantName } from "@/lib/animations";
import { cn } from "@/lib/utils";

// Generic scroll-reveal wrapper: pick a preset by name (or pass custom variants),
// reveals once on scroll into view. GPU-friendly: presets animate opacity + transform only.
// Reduced-motion is handled globally by MotionConfig , do NOT branch the JSX on
// useReducedMotion() here (server=false / client=true diverges → hydration mismatch that
// freezes the section at its hidden SSR state).
export default function AnimatedSection({
  children,
  className,
  variant = "fadeUp",
  variants,
  delay = 0,
  as = "div",
  amount,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: VariantName;
  variants?: Variants; // override the preset entirely
  delay?: number;
  as?: keyof typeof motion;
  amount?: number; // viewport visibility threshold (0–1)
}) {
  const M = motion[as] as typeof motion.div;
  const v = variants ?? VARIANTS[variant];
  return (
    <M
      className={cn(className)}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={amount != null ? { once: true, amount } : viewportOnce}
      transition={{ delay }}
    >
      {children}
    </M>
  );
}
