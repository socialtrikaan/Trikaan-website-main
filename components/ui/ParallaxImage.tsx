"use client";

import Image, { type ImageProps } from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SPRING } from "@/lib/animations";

// ponytail: cast , motion.create(Image)'s prop types clash with ImageProps (onDrag);
// the public API (ParallaxImage(props: ImageProps)) stays fully typed for callers.
const MotionImage = motion.create(Image) as React.ComponentType<
  Record<string, unknown>
>;

// Scroll-driven Ken Burns: very slow scale + slight vertical parallax as the image
// travels through the viewport. Transform only → no layout change, no size change, no
// added cropping. Reduced motion is handled globally by MotionConfig , do NOT branch the
// render on useReducedMotion() (server/client divergence → hydration mismatch).
export default function ParallaxImage(props: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] as never,
  });
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 1.05]),
    SPRING.soft,
  );
  // image drifts slower than the page (±40px, within the ±80 cap)
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [40, -40]),
    SPRING.soft,
  );

  return (
    <MotionImage ref={ref} {...props} style={{ ...props.style, scale, y }} />
  );
}
