"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";

type Card = { n: string; title: string; body: string };

const CARDS: Card[] = [
  {
    n: "01",
    title: "You Own Everything",
    body: "Your business, your data, your processes, and your decisions remain yours. We never build systems that make you dependent on us. Trikaan powers your operations , you remain in complete control.",
  },
  {
    n: "02",
    title: "Security by Design",
    body: "Every product is engineered with enterprise-grade security from the ground up. Access controls, encryption, role-based permissions, and continuous protection are built into every layer , not added later.",
  },
  {
    n: "03",
    title: "Built for Your Business",
    body: "No two organizations operate the same way. Our platforms are designed to adapt to your workflows, evolve with your processes, and support change without forcing your business into rigid software.",
  },
  {
    n: "04",
    title: "Complete Transparency",
    body: "Every action leaves a trace. Every decision can be verified. With comprehensive audit trails, version history, and operational visibility, your business always knows what happened, when, and why.",
  },
];

const SPRING = {
  type: "spring" as const,
  stiffness: 140,
  damping: 24,
  mass: 0.8,
};
const CARD_W = 380;
const GAP = 32;
const STEP = CARD_W + GAP;

function TrikaanCard({ c, active }: { c: Card; active: boolean }) {
  return (
    <motion.div
      className="flex h-[440px] w-[380px] shrink-0 flex-col rounded-[24px] border bg-white p-9"
      animate={{
        opacity: active ? 1 : 0.4,
        scale: active ? 1 : 0.92,
        borderColor: active ? "rgba(2,45,168,0.9)" : "rgba(2,45,168,0.1)",
        boxShadow: active
          ? "0 40px 90px -30px rgba(3,66,253,0.45)"
          : "0 10px 30px -20px rgba(3,66,253,0.15)",
      }}
      whileHover={active ? { y: -10 } : {}}
      transition={SPRING}
    >
      <motion.p
        className="text-right font-heading text-[76px] leading-none text-brand"
        animate={{ scale: active ? 1 : 0.9 }}
        transition={SPRING}
      >
        {c.n}
      </motion.p>
      <h3 className="mt-4 font-heading text-[24px] text-brand">{c.title}</h3>
      <p className="mt-4 text-[16px] leading-[1.6] text-black">{c.body}</p>
    </motion.div>
  );
}

export default function TrikaanWay() {
  const [active, setActive] = useState(0);

  return (
    <section className="overflow-hidden bg-surface-150">
      {/* header */}
      <Container className="flex flex-col items-center gap-5 pt-[70px] text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
          The Trikaan Way
        </p>
        <p className="max-w-[920px] text-[18px] leading-[30px] text-black sm:text-[20px]">
          Technology should empower your business , not own it. Every system we
          build is designed around one principle: you stay in control while we
          provide the intelligence, engineering, and platform that powers it.
        </p>
      </Container>

      {/* card experience */}
      <Container className="relative mt-14">
        {/* faint wordmark behind */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none font-heading text-[260px] leading-none text-brand/[0.04] lg:block"
        >
          TRIKAAN
        </span>

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
          {/* left: heading + pager */}
          <div className="shrink-0 lg:w-[320px]">
            <WordReveal
              as="p"
              className="font-heading text-[34px] leading-[1.3] text-brand sm:text-[40px]"
            >
              Your Business. Your Data. Your Control.
            </WordReveal>
            <div className="mt-8 flex gap-3">
              {CARDS.map((c, i) => (
                <button
                  key={c.n}
                  onClick={() => setActive(i)}
                  aria-label={c.title}
                  className={`flex size-[50px] items-center justify-center rounded-full font-heading text-[18px] transition-colors ${
                    i === active
                      ? "bg-brand text-white ring-2 ring-brand ring-offset-2 ring-offset-surface-150"
                      : "bg-[#e3ebfd] text-brand hover:bg-[#d5e1fd]"
                  }`}
                >
                  {c.n}
                </button>
              ))}
            </div>
          </div>

          {/* mobile: single active card, full width */}
          <motion.div
            key={active}
            className="flex w-full flex-col rounded-[24px] border-2 border-brand bg-white p-8 shadow-[0_30px_70px_-30px_rgba(3,66,253,0.4)] lg:hidden"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-right font-heading text-[64px] leading-none text-brand">
              {CARDS[active].n}
            </p>
            <h3 className="mt-3 font-heading text-[22px] text-brand">
              {CARDS[active].title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-black">
              {CARDS[active].body}
            </p>
          </motion.div>

          {/* desktop: sliding card track */}
          <div className="relative hidden h-[470px] flex-1 overflow-hidden lg:block">
            <motion.div
              className="absolute left-0 top-[15px] flex"
              style={{ gap: GAP }}
              animate={{ x: -active * STEP }}
              transition={SPRING}
            >
              {CARDS.map((c, i) => (
                <TrikaanCard key={c.n} c={c} active={i === active} />
              ))}
            </motion.div>
          </div>
        </div>
      </Container>

      {/* closing belief */}
      <Container className="flex flex-col items-center gap-5 pb-[70px] pt-16 text-center">
        <WordReveal
          as="p"
          className="max-w-[1090px] font-heading text-[28px] leading-[1.45] text-brand sm:text-[40px] sm:leading-[58px]"
        >
          &ldquo;We don&apos;t believe software should own your business. We
          believe it should strengthen it.&rdquo;
        </WordReveal>
        <LineReveal
          as="p"
          className="max-w-[920px] text-[18px] leading-[30px] text-black sm:text-[20px]"
        >
          Think of Trikaan as the intelligence layer behind your organization.
          We provide the platform, engineering, and innovation that power your
          operations, while your data, decisions, and business remain entirely
          yours.
        </LineReveal>
        <p className="font-heading text-[20px] text-brand">
          You operate. You own. We power.
        </p>
      </Container>
    </section>
  );
}
