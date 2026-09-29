"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Loader2 } from "lucide-react";
import { hoverButton, tapButton } from "@/lib/animations";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

// Figma: primary = brand fill + white; secondary = ink outline. Radius 10, Outfit bold 14.
// Interactions (design unchanged): magnetic hover, ripple on click, soft shadow expansion.
const base =
  "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-button font-display font-bold text-[14px] whitespace-nowrap transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-bright",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3",
  sm: "px-5 py-2.5",
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
};

const entrance = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.6 },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

type Ripple = { id: number; x: number; y: number; size: number };

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  onClick,
  type = "button",
  loading = false,
  disabled = false,
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);

  // magnetic pull toward cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 18 });
  const y = useSpring(my, { stiffness: 250, damping: 18 });

  // ripples
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }
  function onClickR(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const id = idRef.current++;
    const size = Math.max(r.width, r.height) * 2;
    setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top, size }]);
    setTimeout(() => setRipples((p) => p.filter((rp) => rp.id !== id)), 600);
    onClick?.();
  }

  const interaction = {
    className: classes,
    style: { x, y },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    whileHover: { ...hoverButton, boxShadow: "0 14px 30px -8px rgba(3,66,253,0.45)" },
    whileTap: tapButton,
    ...entrance,
  };

  const content = (
    <>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-current opacity-25"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size, x: "-50%", y: "-50%" }}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.39, ease: "easeOut" }}
        />
      ))}
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {children}
    </>
  );

  if (href) {
    return (
      <MotionLink href={href} onClick={onClickR} {...interaction}>
        {content}
      </MotionLink>
    );
  }
  return (
    <motion.button
      type={type}
      onClick={onClickR}
      disabled={disabled || loading}
      {...interaction}
    >
      {content}
    </motion.button>
  );
}
