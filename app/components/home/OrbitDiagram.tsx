"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  CircleDot,
  UsersRound,
  TrendingUp,
  ShoppingCart,
  Package,
  Warehouse,
  Cpu,
  ShieldCheck,
  Wrench,
  HardDrive,
  Folder,
  BarChart2,
  Headphones,
  Truck,
  Store,
  Landmark,
  FileText,
  Users,
  type LucideIcon,
} from "lucide-react";

// Exact Figma coords inside the 780×780 box, per-node tint.
const NODES: {
  label: string;
  left: number;
  top: number;
  tint: string;
  Icon: LucideIcon;
}[] = [
  {
    label: "CRM",
    left: 354,
    top: 76,
    tint: "bg-tint-purple",
    Icon: UsersRound,
  },
  {
    label: "Sales",
    left: 457,
    top: 97,
    tint: "bg-tint-green",
    Icon: TrendingUp,
  },
  {
    label: "Purchase",
    left: 545,
    top: 155,
    tint: "bg-tint-blue",
    Icon: ShoppingCart,
  },
  {
    label: "Inventory",
    left: 603,
    top: 243,
    tint: "bg-tint-amber",
    Icon: Package,
  },
  {
    label: "Warehouse",
    left: 624,
    top: 346,
    tint: "bg-tint-blue",
    Icon: Warehouse,
  },
  { label: "Production", left: 603, top: 449, tint: "bg-tint-blue", Icon: Cpu },
  {
    label: "Quality",
    left: 545,
    top: 537,
    tint: "bg-tint-green",
    Icon: ShieldCheck,
  },
  {
    label: "Maintenance",
    left: 457,
    top: 595,
    tint: "bg-tint-blue",
    Icon: Wrench,
  },
  {
    label: "Assets",
    left: 354,
    top: 616,
    tint: "bg-tint-blue",
    Icon: HardDrive,
  },
  {
    label: "Documents",
    left: 251,
    top: 595,
    tint: "bg-tint-green",
    Icon: Folder,
  },
  {
    label: "Reports & BI",
    left: 163,
    top: 537,
    tint: "bg-tint-blue",
    Icon: BarChart2,
  },
  {
    label: "Helpdesk",
    left: 105,
    top: 449,
    tint: "bg-tint-blue",
    Icon: Headphones,
  },
  {
    label: "Logistics",
    left: 84,
    top: 346,
    tint: "bg-tint-green",
    Icon: Truck,
  },
  {
    label: "E-Commerce",
    left: 105,
    top: 243,
    tint: "bg-tint-purple",
    Icon: Store,
  },
  {
    label: "Finance",
    left: 163,
    top: 155,
    tint: "bg-tint-teal",
    Icon: Landmark,
  },
  {
    label: "Accounting",
    left: 251,
    top: 97,
    tint: "bg-tint-blue",
    Icon: FileText,
  },
  { label: "HRMS", left: 251, top: 97, tint: "bg-tint-blue", Icon: Users },
];

const ROTATE_DELAY = 1.6; // start ring spin after the intro reveal settles

export default function OrbitDiagram() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 120,
    damping: 20,
  });

  function onMove(e: React.MouseEvent) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="w-full overflow-x-auto lg:w-auto">
      <motion.div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="relative mx-auto size-[780px] [transform-style:preserve-3d]"
      >
        {/* concentric rings */}
        <span className="absolute left-[240px] top-[240px] size-[300px] rounded-full border border-border-3" />
        <span className="absolute left-[180px] top-[180px] size-[420px] rounded-full border border-border-3" />
        <span className="absolute left-[120px] top-[120px] size-[540px] rounded-full border border-border-3" />

        {/* soft brand glow */}
        <motion.span
          aria-hidden
          className="absolute left-[240px] top-[240px] size-[300px] rounded-full bg-brand/10 blur-3xl"
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        />

        {/* podium */}
        <Image
          src="/images/home-podium-base.svg"
          alt=""
          aria-hidden
          width={200}
          height={120}
          className="absolute left-[290px] top-[400px]"
        />
        <Image
          src="/images/home-podium-surface.svg"
          alt=""
          aria-hidden
          width={180}
          height={100}
          className="absolute left-[300px] top-[395px]"
        />

        {/* top badge */}
        <div className="absolute left-[316px] top-[33px] flex h-8 w-[148px] items-center justify-center rounded-pill border border-border bg-white px-4 shadow-[0px_4px_6px_rgba(0,0,0,0.05)]">
          <p className="text-[10px] font-extrabold text-brand">
            20+ APPS. 1 PLATFORM.
          </p>
        </div>

        {/* central Anvaya hub , floating */}
        <motion.div
          className="absolute left-[315px] top-[270px] flex h-[180px] w-[150px] flex-col items-center gap-3 rounded-nav border border-border-3 bg-white px-4 pb-4 pt-5 shadow-[0px_24px_48px_-12px_rgba(3,66,253,0.28)] will-change-transform"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span className="flex size-[34px] items-center justify-center rounded-[17px] bg-tint-blue text-brand">
              <CircleDot size={18} />
            </span>
            <p className="text-[14px] font-extrabold text-ink">anvaya</p>
          </div>
          <div className="flex w-full flex-col items-center text-center text-[9px] font-bold leading-tight">
            <p className="text-ink-600">One Platform.</p>
            <p className="text-muted">Infinite Possibilities.</p>
          </div>
          <div className="flex h-[46px] w-full items-end justify-center overflow-hidden rounded-[8px] border border-border-3 bg-surface-50">
            <div className="flex h-full w-full flex-col items-start gap-0.5 p-1">
              <div className="h-1 w-[30px] rounded-[1px] bg-brand opacity-30" />
              <div className="flex gap-0.5">
                <div className="size-2 rounded-[1px] bg-success opacity-40" />
                <div className="size-2 rounded-[1px] bg-brand opacity-40" />
                <div className="size-2 rounded-[1px] bg-purple opacity-40" />
              </div>
              <div className="h-2.5 w-full rounded-[1px] bg-border-3 opacity-50" />
            </div>
          </div>
        </motion.div>

        {/* rotating ring of module nodes + radial spokes (icons stay upright).
            Ring rotation starts after the intro reveal finishes. */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          animate={{ rotate: 360 }}
          transition={{
            duration: 24,
            ease: "linear",
            repeat: Infinity,
            delay: ROTATE_DELAY,
          }}
        >
          {/* spoke lines + dots to each node (Figma spoke-groups) , draw in */}
          <motion.svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 780 780"
            fill="none"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.39, delay: 0.13 }}
          >
            {NODES.map(({ label, left, top }) => {
              const cx = left + 36;
              const cy = top + 21;
              const dx = cx - 390;
              const dy = cy - 390;
              const dist = Math.hypot(dx, dy) || 1;
              const dotX = 390 + (dx / dist) * 202;
              const dotY = 390 + (dy / dist) * 202;
              return (
                <g key={"spoke-" + label + left + top}>
                  <line
                    x1={390}
                    y1={390}
                    x2={cx}
                    y2={cy}
                    stroke="#6b7280"
                    strokeOpacity={0.12}
                    strokeWidth={1}
                  />
                  <circle
                    cx={dotX}
                    cy={dotY}
                    r={3}
                    fill="#1b35e0"
                    fillOpacity={0.5}
                  />
                </g>
              );
            })}
          </motion.svg>
          {NODES.map(({ label, left, top, tint, Icon }, i) => (
            <motion.div
              key={label + left + top}
              style={{ left, top }}
              className="absolute w-[72px]"
              // intro: fly out from centre + scale/fade in, staggered
              initial={{
                opacity: 0,
                scale: 0,
                x: 390 - (left + 36),
                y: 390 - (top + 21),
              }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <motion.div
                className="flex flex-col items-center gap-1"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 24,
                  ease: "linear",
                  repeat: Infinity,
                  delay: ROTATE_DELAY,
                }}
                whileHover={{ scale: 1.14, zIndex: 20 }}
              >
                <span className="flex size-[42px] items-center justify-center rounded-[12px] border border-border-3 bg-white shadow-[0px_4px_5px_rgba(3,66,253,0.06)] transition-shadow hover:shadow-[0px_10px_20px_rgba(3,66,253,0.2)]">
                  <span
                    className={`flex size-[28px] items-center justify-center rounded-[6px] ${tint} text-ink`}
                  >
                    <Icon size={16} />
                  </span>
                </span>
                <p className="w-full truncate text-center text-[11px] font-semibold text-ink">
                  {label}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
