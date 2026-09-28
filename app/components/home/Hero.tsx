"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Container from "@/components/ui/Container";
import { EASE_OUT, hoverButton, tapButton } from "@/lib/animations";
import HeroWave from "./HeroWave";

// Figma hero (node 1:476) , UI unchanged. Choreographed entrance:
// nav (Navbar) → particle mountain forms → headline reveal → blue words rise in
// → subtitle blur-fade → buttons spring. Plus mouse-parallax depth and, on scroll,
// content scales, headline drifts up, mountain recedes slower (cinematic depth).

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // scroll depth (hero pinned-feel via transforms only , no layout change)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 1.06]),
    { stiffness: 80, damping: 20 },
  );
  const headlineY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -70]), {
    stiffness: 80,
    damping: 20,
  });
  const waveY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 70]), {
    stiffness: 80,
    damping: 20,
  });
  const waveScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.9]), {
    stiffness: 80,
    damping: 20,
  });

  // mouse-parallax depth: content drifts a little, mountain drifts more (further layer)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 18 });
  const smy = useSpring(my, { stiffness: 50, damping: 18 });
  const contentPX = useTransform(smx, (v) => v * 8);
  const contentPY = useTransform(smy, (v) => v * 6);
  const wavePX = useTransform(smx, (v) => v * 24);
  const wavePY = useTransform(smy, (v) => v * 16);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }
  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden bg-white pt-[100px]"
    >
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          className="flex flex-col items-center"
          style={{ scale: contentScale, x: contentPX, y: contentPY }}
        >
          {/* headline , reveal via opacity+scale (y is used by scroll parallax); blue Caveat
              words rise in after. No clip-path → descenders (g/y) never get cut. */}
          <motion.h1
            className="max-w-[1280px] text-[40px] font-bold leading-[1.15] text-ink sm:text-[64px] sm:leading-[76px]"
            style={{ y: headlineY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.6 }}
          >
            We{" "}
            <motion.span
              className="inline-block font-heading font-bold text-brand"
              initial={{ opacity: 0, y: "0.25em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: 1.25 }}
            >
              See Solutions
            </motion.span>{" "}
            Where Others
            <br className="hidden sm:block" />{" "}
            <motion.span
              className="inline-block font-heading font-bold text-brand"
              initial={{ opacity: 0, y: "0.25em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: 1.45 }}
            >
              See Complexity
            </motion.span>
          </motion.h1>

          {/* subtitle , fade with blur reduction */}
          <motion.div
            className="mt-[28px] flex max-w-[1100px] flex-col gap-3"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 1.65 }}
          >
            <p className="text-[18px] leading-[1.7] text-muted">
              Most software forces businesses to change the way they work.{" "}
              <span className="font-semibold text-brand">
                We do the opposite.
              </span>
            </p>
            <p className="text-[18px] leading-[1.7] text-muted">
              Trikaan designs intelligent business platforms that understand
              your operations, connect every moving part, and transform
              complexity into a competitive advantage.
            </p>
          </motion.div>

          {/* buttons , rise with spring */}
          <motion.div
            className="mt-[40px] flex flex-wrap items-center justify-center gap-[16px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 1.9,
            }}
          >
            <motion.div whileHover={hoverButton} whileTap={tapButton}>
              <Link
                href="/contact"
                className="inline-flex rounded-[26px] bg-brand px-[32px] py-[14px] font-heading text-[16px] text-white transition-colors hover:bg-brand-bright"
              >
                Book a Demo
              </Link>
            </motion.div>
            <motion.div whileHover={hoverButton} whileTap={tapButton}>
              <a
                href="https://www.theanvaya.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-[26px] border border-ink px-[32px] py-[14px] text-[16px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                See it live
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* particle mountain , slowly forms in, then recedes slower than content on scroll */}
      <motion.div
        className="relative -mt-[150px] mb-[-40px] h-[360px] w-full sm:-mt-[160px] sm:mb-0 sm:h-[420px] lg:-mt-[300px] lg:h-[600px]"
        style={{ x: wavePX, y: wavePY }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.3 }}
      >
        <motion.div
          className="h-full w-full"
          style={{ y: waveY, scale: waveScale }}
        >
          <HeroWave />
        </motion.div>
      </motion.div>
    </section>
  );
}
