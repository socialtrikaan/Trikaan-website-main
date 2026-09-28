"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleDot, type LucideIcon } from "lucide-react";

export interface ActiveModule {
  label: string;
  desc: string;
  color: string;
  Icon: LucideIcon;
}

// Static glassmorphism center card. Shows Anvaya by default; morphs to the
// hovered app's name + info, then reverts. Never rotates. Fixed size = no layout shift.
export default function CenterCard({ active }: { active: ActiveModule | null }) {
  return (
    <div className="absolute left-1/2 top-1/2 flex h-[132px] w-[26%] min-w-[92px] max-w-[164px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1.5 rounded-[18px] border border-white/70 bg-white/85 px-3 py-3 shadow-[0_28px_56px_-14px_rgba(3,66,253,0.35)] backdrop-blur-md sm:h-[172px] sm:min-w-[118px] sm:gap-2 sm:rounded-[22px] sm:px-4 sm:py-5">
      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key={active.label}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="flex size-7 items-center justify-center rounded-[10px] bg-tint-blue sm:size-9 sm:rounded-[12px]" style={{ color: active.color }}>
              <active.Icon size={16} />
            </span>
            <p className="text-center text-[12px] font-extrabold leading-tight text-ink sm:text-[15px]">{active.label}</p>
            <p className="max-w-[130px] text-center text-[9px] font-semibold leading-tight text-muted sm:text-[10px]">{active.desc}</p>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className="flex size-7 items-center justify-center rounded-[10px] bg-tint-blue text-brand sm:size-9 sm:rounded-[12px]">
                <CircleDot size={16} />
              </span>
              <p className="text-[13px] font-extrabold text-ink sm:text-[15px]">anvaya</p>
            </div>
            <div className="flex flex-col items-center text-center text-[9px] font-bold leading-tight">
              <p className="text-ink-600">One Platform.</p>
              <p className="text-muted">Infinite Possibilities.</p>
            </div>
            <div className="mt-1 hidden h-[40px] w-full items-end overflow-hidden rounded-[8px] border border-border-3 bg-surface-50 sm:flex">
              <div className="flex h-full w-full flex-col items-start gap-1 p-1.5">
                <div className="h-1 w-[60%] rounded-[1px] bg-brand opacity-40" />
                <div className="flex gap-1">
                  <div className="size-2 rounded-[1px] bg-success opacity-50" />
                  <div className="size-2 rounded-[1px] bg-brand opacity-50" />
                  <div className="size-2 rounded-[1px] bg-purple opacity-50" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
