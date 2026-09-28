"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";

// Figma node 327:308 , "Vision" + three "Founder's Story" blocks. Handwritten labels
// (Segoe Print 40) on the left, Inter Regular 16/1.8 copy (max 641px) on the right,
// each story signed off; then a centered handwritten closing line.
type Block = {
  label: string;
  body: React.ReactNode;
  sign?: { name: string; role: string };
};

const BLOCKS: Block[] = [
  {
    label: "Vision",
    body: (
      <>
        <p>
          For years, businesses have been forced to change the way they work to
          fit software. We think it should be the other way around.
        </p>
        <p>
          At Trikaan, we&apos;re not trying to build more software. We&apos;re
          trying to remove unnecessary work, reduce manual effort, and help
          businesses make better decisions.
        </p>
        <p>
          Our long-term vision is simple: help manufacturing companies reach an
          AWAR (Active Workflow Automation Rate) of 90–99.9%,where most
          day-to-day workflows run automatically, with fewer errors, less manual
          work, and more time spent on what actually matters.
        </p>
      </>
    ),
  },
  {
    label: "Founder's Story",
    body: (
      <>
        <p>
          For over 14 years, Charan KRB worked on enterprise software
          across IBM India Software Labs, Dell, HP, and Altron. Those years
          taught him how world-class technology is built. But it was only after
          working closely with manufacturing companies that he discovered where
          enterprise software was consistently falling short.
        </p>
        <p>
          Every factory looked different, but the problems looked the same.
          Operators still filled production records on paper. Quality reports
          could be edited after the fact. Warehouse stock rarely matched the
          ERP. Managers spent hours reconciling numbers before making decisions
          they still couldn&apos;t fully trust.
        </p>
        <p>
          After years of seeing the same failures repeated across factories, he
          reached a simple conclusion.
          <br />
          <span className="font-heading text-ink">
            The problem wasn&apos;t implementation. It was architecture.
          </span>
        </p>
        <p>
          In 2025, he founded Trikaan to rethink enterprise software from the
          ground up. The first product was Anvaya,a manufacturing platform
          designed around real factory workflows instead of generic ERP
          assumptions.
        </p>
      </>
    ),
    sign: {
      name: "Charan KRB",
      role: "Founder, Head of Products & Business Management",
    },
  },
  {
    label: "Founder's Story",
    body: (
      <>
        <p>
          For over three decades, Dr. Rama Subba Reddy dedicated his career to
          understanding materials at the smallest scale—where microscopic
          variations determine whether an experiment succeeds or fails.
        </p>
        <p>
          In thin film research, an answer that is almost correct is still
          wrong.
          <br />
          Every observation has to be traced back to its source. Every
          conclusion has to withstand evidence. That discipline shaped his
          approach to research—and today, it shapes how Trikaan approaches
          product design.
        </p>
        <p>
          While the fields are different, the principle is the same. Complex
          systems cannot be improved by assumptions. They improve when problems
          are understood at their root.
        </p>
        <p>
          His contribution isn&apos;t reflected in a single feature. It&apos;s
          reflected in the thinking behind the platform—building systems that
          are measurable, dependable, and designed from first principles.
        </p>
      </>
    ),
    sign: { name: "Dr. B. Rama Subba Reddy", role: "Director & Advisory Board" },
  },
  // {
  //   label: "Founder's Story",
  //   body: (
  //     <>
  //       <p>
  //         For over 15 years, Amala B has worked in enterprise software quality
  //         assurance and automation across NetApp and HP, building systems where
  //         accuracy and reliability were essential. She believes automation is
  //         only as valuable as the quality of the data behind it.
  //       </p>
  //       <p>
  //         At Trikaan, she leads Quality Assurance and Automation, shaping
  //         Anvaya&apos;s quality framework with structured validation,
  //         tamper-proof audit trails, and reliable workflows that ensure
  //         manufacturing data is accurate, traceable, and trusted.
  //       </p>
  //       <p className="font-heading text-ink">
  //         &ldquo;Reliable software begins with reliable data.&rdquo;
  //       </p>
  //     </>
  //   ),
  //   sign: { name: "Amala B", role: "Head of Quality & Manufacturing solutions" },
  // },
];

const cardBase =
  "rounded-[20px] border border-brand/50 bg-white p-8 shadow-[0_30px_70px_-40px_rgba(3,66,253,0.35)] will-change-transform";

// Figma 353:427 — founder as two tilted cards: name card (−6°) + story card (+6°).
// Straighten + lift on hover; enter from the tilt.
function FounderCards({ b, onPause, onResume }: { b: Block; onPause?: () => void; onResume?: () => void }) {
  const spring = { type: "spring" as const, stiffness: 140, damping: 18 };
  return (
    <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-0">
      {/* name card — in front, tilted −6°, overlaps the story card. Figma 398×405 */}
      <motion.div
        className={`${cardBase} relative z-20 flex min-h-[300px] flex-col justify-center lg:h-[405px] lg:w-[398px]`}
        initial={{ opacity: 0, rotate: -6, y: 30 }}
        whileInView={{ opacity: 1, rotate: -6, y: 0 }}
        whileHover={{ rotate: 0, y: -8, zIndex: 30 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={spring}
      >
        <div className="lg:w-[291px]">
          <p className="font-heading text-[28px] text-brand md:text-[32px]">{b.sign!.name}</p>
          {b.sign!.role && <p className="mt-1 text-[16px] leading-[1.8] text-black md:text-[18px]">{b.sign!.role}</p>}
        </div>
      </motion.div>
      {/* story card — behind, tilted +6°. Figma 856×405, text inset 39/59 */}
      <motion.div
        onMouseEnter={onPause}
        onMouseLeave={onResume}
        className={`${cardBase} relative z-10 flex flex-col justify-center gap-[1.8em] text-[14px] leading-[1.8] text-black [&_p]:leading-[1.8] lg:-ml-4 lg:h-[405px] lg:w-[856px] lg:px-[59px] lg:py-[39px]`}
        initial={{ opacity: 0, rotate: 6, y: 30 }}
        whileInView={{ opacity: 1, rotate: 6, y: 0 }}
        whileHover={{ rotate: 0, y: -8, zIndex: 30 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={spring}
      >
        {b.body}
      </motion.div>
    </div>
  );
}

const VISION = BLOCKS.find((b) => !b.sign)!;
const FOUNDERS = BLOCKS.filter((b) => b.sign);

export default function VisionFounder() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(0);
  const go = (d: number) => {
    setDir(d);
    setI((p) => (p + d + FOUNDERS.length) % FOUNDERS.length);
  };

  const [paused, setPaused] = useState(false);
  // autoplay every 5s; pauses on hover, resets when index changes (manual nav)
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir(1);
      setI((p) => (p + 1) % FOUNDERS.length);
    }, 5000);
    return () => clearInterval(t);
  }, [i, paused]);

  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <Container className="flex flex-col gap-16 md:gap-24">
        {/* Vision */}
        <div className="grid grid-cols-1 items-center gap-y-6 lg:grid-cols-[1fr_641px] lg:gap-x-20">
          <WordReveal as="p" className="order-first font-heading text-[32px] text-brand lg:text-center lg:text-[40px]">
            {VISION.label}
          </WordReveal>
          <motion.div
            className="flex max-w-[641px] flex-col gap-[1.8em] text-[16px] leading-[1.8] text-black [&_p]:leading-[1.8]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {VISION.body}
          </motion.div>
        </div>

        {/* Founder's Story — carousel over the 3 founders (pauses only on story-card hover) */}
        <div className="flex flex-col items-center gap-8">
          <WordReveal as="p" className="font-heading text-[32px] text-brand md:text-[40px]">
            Founder&apos;s Story
          </WordReveal>
          {/* padding gives the tilted cards breathing room; perspective drives the 3D swing */}
          <div className="relative w-full px-2 py-8 [perspective:1600px] sm:px-6 md:py-12">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                className="[transform-style:preserve-3d]"
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 160 : -160, rotateY: d >= 0 ? -35 : 35, scale: 0.9 }),
                  center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -160 : 160, rotateY: d >= 0 ? 35 : -35, scale: 0.9 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
              >
                <FounderCards b={FOUNDERS[i]} onPause={() => setPaused(true)} onResume={() => setPaused(false)} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => go(-1)} aria-label="Previous founder" className="flex size-11 items-center justify-center rounded-full border border-brand/30 text-brand transition-colors hover:bg-brand hover:text-white">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2.5">
              {FOUNDERS.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => { setDir(k > i ? 1 : -1); setI(k); }}
                  aria-label={`Founder ${k + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-brand" : "w-2 bg-brand/25 hover:bg-brand/50"}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Next founder" className="flex size-11 items-center justify-center rounded-full border border-brand/30 text-brand transition-colors hover:bg-brand hover:text-white">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* autoplay progress (fills over 5s, hidden while paused) */}
          <div className="h-[3px] w-40 overflow-hidden rounded-full bg-brand/15">
            {!paused && (
              <motion.div
                key={i}
                className="h-full origin-left rounded-full bg-brand"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
              />
            )}
          </div>
        </div>

        <WordReveal
          as="p"
          className="text-center font-heading text-[20px] leading-[1.8] text-brand"
        >
          We don&apos;t define ourselves by the software we create.
          <br />
          We define ourselves by the industries we help transform.
        </WordReveal>
      </Container>
    </section>
  );
}
