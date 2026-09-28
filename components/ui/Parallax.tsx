"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SPRING } from "@/lib/animations";

// Subtle scroll parallax for background decorations: the element drifts slower than the
// page as it crosses the viewport. Transform only → no layout change. Movement capped ±80px.
// Reduced-motion → static.
type Props = {
  children?: React.ReactNode;
  className?: string;
  as?: "div" | "span";
  distance?: number; // ± px of drift (clamped to 80)
} & Record<string, unknown>;

export default function Parallax({ children, className, as = "div", distance = 60, ...rest }: Props) {
  const d = Math.min(Math.abs(distance), 80);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] as never,
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [d, -d]), SPRING.soft);
  const M = (motion[as] as typeof motion.div);
  return <M ref={ref} className={className} style={{ y }} {...rest}>{children}</M>;
}
