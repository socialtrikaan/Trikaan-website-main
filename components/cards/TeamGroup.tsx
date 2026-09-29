"use client";

import { motion } from "framer-motion";
import type { Member } from "./TeamCard";

// Hand-placed hotspots over the group photo (percent of the image box). Adjust to match
// the real photo once it's dropped in. Order matches the TEAM array.
const SPOTS = [
  { x: 20, y: 40 },
  { x: 37, y: 34 },
  { x: 52, y: 37 },
  { x: 67, y: 33 },
  { x: 82, y: 40 },
  { x: 50, y: 62 },
];

// One cinematic group image with a floating, clickable name badge over each member.
// Click a badge → opens that member's fullscreen profile modal. Mobile falls back to a
// tappable name list (small badges are hard to hit on phones).
export default function TeamGroup({
  members,
  image,
  onOpen,
}: {
  members: Member[];
  image: string;
  onOpen: (i: number) => void;
}) {
  return (
    <div className="w-full">
      {/* group image + hotspots (tablet/desktop) */}
      <motion.div
        className="relative mx-auto hidden aspect-[1672/941] w-full max-w-[1000px] overflow-hidden rounded-[28px] bg-white shadow-[0_50px_120px_-50px_rgba(3,66,253,0.5)] sm:block"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt="Trikaan leadership team"
          className="absolute inset-0 h-full w-full object-contain"
        />

        {members.map((m, i) => {
          const s = SPOTS[i % SPOTS.length];
          return (
            <motion.button
              key={m.name}
              onClick={() => onOpen(i)}
              aria-label={`Open profile: ${m.name}, ${m.role}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 5 + i * 0.4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              {/* name badge , hidden, floats up on hover */}
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 scale-90 whitespace-nowrap rounded-full bg-brand px-3.5 py-1.5 text-[13px] font-bold text-white opacity-0 shadow-[0_8px_20px_-6px_rgba(3,66,253,0.6)] transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                {m.name}
              </span>
              {/* pulsing dot */}
              <span className="relative flex size-4 items-center justify-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/40" />
                <span className="relative inline-flex size-4 rounded-full bg-brand ring-[3px] ring-white/70 transition-transform duration-200 group-hover:scale-125" />
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* mobile: tappable name list */}
      <div className="mx-auto flex max-w-[420px] flex-col gap-3 sm:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt="Trikaan leadership team"
          className="mb-2 w-full rounded-[22px] object-cover shadow-lg"
        />
        {members.map((m, i) => (
          <button
            key={m.name}
            onClick={() => onOpen(i)}
            className="flex w-full flex-col items-start rounded-2xl border border-border bg-white/80 px-5 py-4 text-left backdrop-blur transition-colors hover:border-brand/40"
          >
            <span className="text-[16px] font-bold text-ink">{m.name}</span>
            <span className="text-[12px] font-semibold text-brand-electric">
              {m.role}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
