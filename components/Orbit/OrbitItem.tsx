"use client";

import { memo } from "react";
import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface OrbitModule {
  label: string;
  Icon: LucideIcon;
  color: string;
  desc: string;
}

interface Props extends OrbitModule {
  angle: number; // fixed slot angle (deg) inside the rotating group
  order: number; // reveal order (Sales first → CRM last)
  counter: MotionValue<number>; // -groupRotation → keeps the card upright while orbiting
  play: boolean; // true once the orbit scrolls into view
  isActive: boolean; // currently selected app → enlarges + glows
  onEnter: () => void;
  onLeave: () => void;
}

// App card that orbits with the group but stays upright, pops in one by one, enlarges when
// selected, and pulls toward the cursor on hover (magnetic).
function OrbitItem({ label, Icon, color, angle, order, counter, play, isActive, onEnter, onLeave }: Props) {
  const mxv = useMotionValue(0);
  const myv = useMotionValue(0);
  const x = useSpring(mxv, { stiffness: 220, damping: 14 });
  const y = useSpring(myv, { stiffness: 220, damping: 14 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mxv.set((e.clientX - (r.left + r.width / 2)) * 0.45);
    myv.set((e.clientY - (r.top + r.height / 2)) * 0.45);
  }
  function onLeaveLocal() {
    mxv.set(0);
    myv.set(0);
    onLeave();
  }

  return (
    // cancel the group spin so the card + label stay upright
    <motion.div style={{ rotate: counter }} className="will-change-transform">
      {/* cancel the placement rotation */}
      <div style={{ transform: `rotate(${-angle}deg)` }}>
        {/* pop in: scale 0→1, fade, backOut */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={play ? { opacity: 1, scale: 1 } : undefined}
          transition={{ delay: 0.5 + order * 0.16, duration: 0.29, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* magnetic pull (x/y) + selected enlarge (scale) */}
          <motion.div
            style={{ x, y }}
            animate={{ scale: isActive ? 1.18 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={onEnter}
            onMouseMove={onMove}
            onMouseLeave={onLeaveLocal}
            className="group flex w-[clamp(38px,6vw,56px)] cursor-pointer flex-col items-center gap-1"
          >
            <span
              className={`flex aspect-square w-full items-center justify-center rounded-[14px] border bg-white transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.08] group-hover:shadow-[0_16px_32px_-6px_rgba(3,66,253,0.4)] ${
                isActive
                  ? "border-brand shadow-[0_12px_28px_-6px_rgba(3,66,253,0.5)]"
                  : "border-border-3 shadow-[0_4px_10px_rgba(3,66,253,0.06)]"
              }`}
            >
              <span
                className="flex items-center justify-center transition-transform duration-300 group-hover:rotate-[12deg]"
                style={{ color }}
              >
                <Icon size={18} strokeWidth={1.8} />
              </span>
            </span>
            <p className="w-full truncate text-center text-[11px] font-semibold text-ink transition-colors duration-300 group-hover:text-brand">
              {label}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default memo(OrbitItem);
