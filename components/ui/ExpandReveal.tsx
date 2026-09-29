"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { X } from "lucide-react";
import { EASE_OUT } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Premium fullscreen circle-expand reveal (Apple/Linear style).
 * Click the ball → a #004E79 circle springs open from the ball's exact centre,
 * covers the viewport, then the panel content fades up. Reverses on close.
 * GPU transforms only (scale/opacity), scroll-locked while open.
 */
export default function ExpandReveal({
  ball,
  ballClassName,
  children,
}: {
  ball: React.ReactNode;
  ballClassName?: string;
  children: React.ReactNode;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0, d: 0 });
  const bounce = useAnimationControls();
  const pathname = usePathname();

  // close the reveal after any navigation (e.g. clicking "Book a Demo" → /contact)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function handleClick() {
    // spring bounce in place, then open the reveal
    bounce.start({
      scale: [1, 0.82, 1.18, 0.94, 1],
      transition: { duration: 0.33, ease: "easeOut" },
    });
    openReveal();
  }

  function openReveal() {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    // farthest viewport corner → circle diameter that guarantees full cover
    const far = Math.max(
      Math.hypot(cx, cy),
      Math.hypot(window.innerWidth - cx, cy),
      Math.hypot(cx, window.innerHeight - cy),
      Math.hypot(window.innerWidth - cx, window.innerHeight - cy),
    );
    setOrigin({ x: cx, y: cy, d: far * 2 });
    setOpen(true);
  }

  // lock scroll (preserves position , body just stops scrolling)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <motion.button
        ref={btnRef}
        type="button"
        onClick={handleClick}
        aria-label="Open"
        aria-expanded={open}
        animate={bounce}
        whileHover={{ scale: 1.08 }}
        className={cn(
          "flex items-center justify-center rounded-full bg-brand text-white shadow-brand",
          ballClassName,
        )}
      >
        {ball}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100]"
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {/* blurred backdrop */}
            <motion.div
              className="absolute inset-0 backdrop-blur-md"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.26 }}
            />
            {/* expanding circle */}
            <motion.div
              className="absolute rounded-full will-change-transform"
              style={{
                left: origin.x,
                top: origin.y,
                width: origin.d,
                height: origin.d,
                marginLeft: -origin.d / 2,
                marginTop: -origin.d / 2,
                backgroundColor: "#004E79",
              }}
              variants={{
                hidden: { scale: 0, opacity: 0.6 },
                show: { scale: 1, opacity: 1 },
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.9,
              }}
            />
            {/* panel content (fade-up after fill) */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) setOpen(false);
              }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.33, ease: EASE_OUT, delay: 0.23 }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
              >
                <X size={22} />
              </button>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
