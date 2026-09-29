"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// One site-wide ambient background. Fixed, pointer-events-none, sits behind all content
// (-z-10 → above the body's flat fill, below every opaque section). Transform/opacity +
// backgroundPosition only, very slow + very low opacity → continuous but never distracting.

// tiny floating blue dots (deterministic → SSR-safe)
const DOTS = [
  { l: "8%", t: "16%", s: 3, d: 26, dl: 0 },
  { l: "24%", t: "62%", s: 2, d: 32, dl: 4 },
  { l: "40%", t: "28%", s: 3, d: 29, dl: 2 },
  { l: "56%", t: "78%", s: 2, d: 34, dl: 6 },
  { l: "68%", t: "20%", s: 3, d: 28, dl: 1 },
  { l: "80%", t: "56%", s: 2, d: 31, dl: 5 },
  { l: "90%", t: "34%", s: 3, d: 30, dl: 3 },
  { l: "16%", t: "88%", s: 2, d: 33, dl: 7 },
  { l: "48%", t: "48%", s: 2, d: 27, dl: 2.5 },
  { l: "72%", t: "84%", s: 3, d: 35, dl: 4.5 },
];

// occasional glowing particles , pulse in/out on long cycles
const GLOW = [
  { l: "20%", t: "30%", s: 6, d: 9, dl: 0 },
  { l: "62%", t: "66%", s: 7, d: 11, dl: 3.5 },
  { l: "84%", t: "24%", s: 5, d: 10, dl: 6 },
];

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function GlobalBackground() {
  // Phones: keep the background static. 15 never-ending JS-driven loops on a fixed full-screen
  // layer kept the main thread busy on every page → touch scroll lagged right after load.
  // Starts static (SSR + first paint), desktop switches the drift on after mount.
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: coarse)").matches) setLive(true);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* radial ambient lighting , soft blue glow from the top, gently breathing */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 50% -10%, rgba(3,66,253,0.06), transparent 60%)",
        }}
        animate={live && { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
      />

      {/* blueprint grid , very faint, adds enterprise depth without distraction */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(3,66,253,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(3,66,253,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%, black, transparent 75%)",
        }}
      />

      {/* subtle mesh gradient , two large blurred blobs drifting very slowly.
          transform-only (no scale) + will-change so the heavy blur is rasterized once
          and just composited , keeps scrolling smooth. */}
      <motion.div
        className="absolute -left-[10%] top-[8%] h-[60vh] w-[60vh] rounded-full bg-brand/[0.05] blur-[110px] will-change-transform"
        animate={live && { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 48, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-[8%] bottom-[8%] h-[55vh] w-[55vh] rounded-full bg-[#7DB8FF]/[0.05] blur-[120px] will-change-transform"
        animate={live && { x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 60, ease: "easeInOut", repeat: Infinity }}
      />

      {/* tiny floating blue dots (very slow) */}
      {DOTS.map((p, i) => (
        <motion.span
          key={`d${i}`}
          className="absolute rounded-full bg-brand/20"
          style={{ left: p.l, top: p.t, width: p.s, height: p.s }}
          animate={live && { y: [0, -30, 0], x: [0, 12, 0] }}
          transition={{
            duration: p.d,
            delay: p.dl,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}

      {/* occasional glowing particles */}
      {live && GLOW.map((p, i) => (
        <motion.span
          key={`g${i}`}
          className="absolute rounded-full bg-brand/30 blur-[2px]"
          style={{ left: p.l, top: p.t, width: p.s, height: p.s }}
          animate={live && { opacity: [0, 0.7, 0], scale: [0.6, 1.4, 0.6] }}
          transition={{
            duration: p.d,
            delay: p.dl,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 4,
          }}
        />
      ))}

      {/* static noise texture , animating backgroundPosition + blend mode repainted the
          whole fixed layer on every frame and janked scrolling, so it's static now. */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: NOISE, backgroundSize: "180px 180px" }}
      />
    </div>
  );
}
