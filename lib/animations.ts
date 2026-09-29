import type { Variants, Transition } from "framer-motion";

// Reusable Framer Motion variants , used across the site instead of repeating
// inline animation objects. GPU-friendly (transform + opacity only).

export const EASE_OUT: Transition["ease"] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: Transition["ease"] = [0.65, 0, 0.35, 1];
export const EASE_SPRING: Transition["ease"] = [0.34, 1.56, 0.64, 1]; // gentle overshoot

// Tunable constants , one source of truth for timing/distance/spring across the site.
export const DURATION = { fast: 0.25, base: 0.4, slow: 0.6 } as const;
export const DISTANCE = { sm: 16, md: 40, lg: 80 } as const;
export const SPRING = {
  soft: { stiffness: 300, damping: 40, restDelta: 0.001 },
  snappy: { stiffness: 220, damping: 28, restDelta: 0.001 },
} as const;

const base = (from: Record<string, number>, duration = 0.45): Variants => ({
  hidden: { opacity: 0, ...from },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration, ease: EASE_OUT },
  },
});

export const fadeIn: Variants = base({}, 0.4);
export const fadeUp: Variants = base({ y: 40 });
export const fadeDown: Variants = base({ y: -40 });
export const fadeLeft: Variants = base({ x: 40 });
export const fadeRight: Variants = base({ x: -40 });
export const scaleIn: Variants = base({ scale: 0.96 }, 0.4);
export const zoomIn: Variants = base({ scale: 0.85 }, 0.45);

// Parent that staggers its children.
export const staggerContainer = (
  stagger = 0.1,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// Child of a staggerContainer , cards fade up + translate + settle from a slight scale.
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.39, ease: EASE_OUT },
  },
};

// Route-change transition (used by app/template.tsx).
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.33, ease: EASE_IN_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: EASE_IN_OUT } },
};

// Interaction presets (whileHover / whileTap).
export const hoverButton = { scale: 1.03 };
export const tapButton = { scale: 0.97 };

// Slow floating loop for decorative elements.
export const floating: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 6, ease: "easeInOut", repeat: Infinity },
  },
};

export const viewportOnce = { once: true, margin: "-40px" } as const;

// Named variant registry , lets <AnimatedSection variant="fadeUp" /> pick a preset by string.
export const VARIANTS = {
  fadeIn,
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  scaleIn,
  zoomIn,
} as const;
export type VariantName = keyof typeof VARIANTS;
