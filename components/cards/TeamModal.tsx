"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { lockScroll, unlockScroll } from "@/app/components/SmoothScroll";
import { initials, type Member } from "./TeamCard";

// modal-level spring (panel entrance)
const SPRING = { type: "spring" as const, stiffness: 260, damping: 30 };
const CURVE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const SLIDE = { duration: 0.9, ease: CURVE };

// whole card cross-slide (matches reference): on "next" the current card exits right while
// the next enters from the left , traveling simultaneously so the group backdrop shows
// briefly between them. Mirrored for "prev".
const cardV = {
  enter: (d: number) => ({
    x: d > 0 ? "55%" : "-55%",
    opacity: 0,
    scale: 0.96,
  }),
  center: { x: "0%", opacity: 1, scale: 1, transition: SLIDE },
  exit: (d: number) => ({
    x: d > 0 ? "-55%" : "55%",
    opacity: 0,
    scale: 0.96,
    transition: SLIDE,
  }),
};

function Portrait({
  member,
  className,
}: {
  member: Member;
  className?: string;
}) {
  return member.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={member.image}
      alt={member.name}
      className={`h-full w-full object-cover ${className ?? ""}`}
    />
  ) : (
    <span
      aria-hidden
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-brand to-brand-bright font-heading text-[110px] text-white/90 ${className ?? ""}`}
    >
      {initials(member.name)}
    </span>
  );
}

// Fullscreen cinematic profile , Agence-Foudre-style layout in Trikaan's blue theme.
export default function TeamModal({
  members,
  index,
  direction,
  onClose,
  onNav,
}: {
  members: Member[];
  index: number;
  direction: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const member = members[index];
  const n = members.length;
  const prev = members[(index - 1 + n) % n];
  const next = members[(index + 1) % n];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lockScroll();
    document.body.style.overflow = "hidden";
    const restore = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNav(1);
      else if (e.key === "ArrowLeft") onNav(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      document.body.style.overflow = "";
      restore?.focus?.();
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} , ${member.role}`}
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto p-4 py-10 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* blurred brand-tinted backdrop (click to close) */}
      <motion.button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#0a1a4a]/45 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <FloatingBackground />

      {/* prev / next member avatars at the screen edges (desktop) */}
      <NavAvatar side="left" member={prev} onClick={() => onNav(-1)} />
      <NavAvatar side="right" member={next} onClick={() => onNav(1)} />

      {/* stage */}
      <motion.div
        className="relative flex w-full max-w-[1320px] flex-col items-stretch lg:flex-row lg:items-center lg:justify-center"
        initial={{ scale: 0.94, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 20, opacity: 0 }}
        transition={SPRING}
      >
        {/* close */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close profile"
          className="absolute -top-5 left-1/2 z-30 flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg transition-transform hover:rotate-90 hover:text-brand"
        >
          <X size={18} />
        </button>

        {/* whole card cross-slides on member change */}
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={member.name}
            custom={direction}
            variants={cardV}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
            className="flex w-full flex-col items-stretch lg:flex-row lg:items-center lg:justify-center"
          >
            {/* PORTRAIT (leans left, like the reference) */}
            <div className="relative z-20 mx-auto w-full max-w-[440px] lg:mx-0 lg:w-[440px] lg:shrink-0 lg:max-w-none">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-[#eaf0ff] to-white shadow-[0_50px_120px_-40px_rgba(3,66,253,0.6)] lg:aspect-auto lg:h-[86vh] lg:rotate-[-4deg]">
                <Portrait member={member} />
              </div>
            </div>

            {/* DETAILS PANEL (brand blue, leans right) */}
            <div className="relative z-10 mx-auto -mt-6 flex w-full max-w-[600px] flex-col items-center justify-center rounded-[32px] bg-brand p-8 text-center text-white shadow-[0_50px_120px_-40px_rgba(3,66,253,0.6)] sm:p-12 lg:-ml-10 lg:mr-0 lg:mt-0 lg:min-h-[72vh] lg:w-[560px] lg:shrink-0 lg:max-w-none lg:rotate-[3deg]">
              <div className="flex flex-col items-center gap-5">
                <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-white/80">
                  {member.role}
                </p>
                <h2 className="font-heading text-[52px] uppercase leading-[0.95] sm:text-[76px]">
                  {member.name}
                </h2>
                <p className="max-w-[42ch] text-[15px] font-semibold leading-[1.9] text-white/95">
                  {member.bio}
                </p>
              </div>

              {/* pagination dots */}
              <div className="mt-10 flex items-center gap-2">
                {members.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-7 bg-white" : "w-1.5 bg-white/40"}`}
                  />
                ))}
              </div>

              {/* mobile prev/next (avatars are desktop-only) */}
              <div className="mt-6 flex items-center gap-4 lg:hidden">
                <button
                  onClick={() => onNav(-1)}
                  aria-label="Previous member"
                  className="flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={() => onNav(1)}
                  aria-label="Next member"
                  className="flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// circular member avatar at the screen edge with a directional arrow
function NavAvatar({
  side,
  member,
  onClick,
}: {
  side: "left" | "right";
  member: Member;
  onClick: () => void;
}) {
  const Arrow = side === "left" ? ArrowLeft : ArrowRight;
  return (
    <button
      onClick={onClick}
      aria-label={`${side === "left" ? "Previous" : "Next"} member: ${member.name}`}
      className={`group absolute top-1/2 hidden -translate-y-1/2 lg:block ${side === "left" ? "left-6" : "right-6"}`}
    >
      <span className="relative flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-brand to-brand-bright shadow-xl transition-transform duration-300 group-hover:scale-105">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={member.name}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={SPRING}
            className="h-full w-full"
          >
            <Portrait member={member} />
          </motion.div>
        </AnimatePresence>
        <span className="absolute inset-0 z-10 flex items-center justify-center bg-ink/30 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Arrow size={22} />
        </span>
      </span>
    </button>
  );
}

function FloatingBackground() {
  const dots = [
    { l: "12%", t: "22%", s: 6, d: 10, dl: 0 },
    { l: "84%", t: "28%", s: 5, d: 12, dl: 2 },
    { l: "72%", t: "80%", s: 7, d: 11, dl: 1 },
    { l: "22%", t: "74%", s: 4, d: 13, dl: 3 },
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute left-[10%] top-[12%] h-[40vh] w-[40vh] rounded-full bg-brand/15 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] h-[38vh] w-[38vh] rounded-full bg-[#7DB8FF]/15 blur-[120px]"
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 38, ease: "easeInOut", repeat: Infinity }}
      />
      {dots.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/40"
          style={{ left: p.l, top: p.t, width: p.s, height: p.s }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: p.d,
            delay: p.dl,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
