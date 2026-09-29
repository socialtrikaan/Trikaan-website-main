"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";
import MilestoneCard from "@/components/cards/MilestoneCard";

type M = {
  year: string;
  title: string;
  desc: string;
  left: number;
  top: number;
  side: "left" | "right";
};
// coords in the 1497×956 Figma overlay (node 234:236). Map has flags baked in.
const MILESTONES: M[] = [
  {
    year: "2025",
    title: "First Enterprise Client",
    desc: "Deployed prototype with a major enterprise, cutting intake friction by 40%.",
    left: 320,
    top: 728,
    side: "left",
  },
  {
    year: "2026",
    title: "Anvaya Platform Launch",
    desc: "Unified modular industrial tool into a single, cohesive platform",
    left: 1140,
    top: 658,
    side: "left",
  },
  {
    year: "2027",
    title: "AI-Powered Operations",
    desc: "Climbing toward full autonomy with intelligent, localized model optimization.",
    left: 481,
    top: 491,
    side: "right",
  },
  {
    year: "2028",
    title: "Multi-Industry Expansion",
    desc: "Delivering tailored digital solutions across every industry with Trikaan serving as the intelligent backbone behind every operation",
    left: 1224,
    top: 363,
    side: "left",
  },
  {
    year: "2029",
    title: "1000+ Enterprise Users",
    desc: "Accelerating global software footprint across heavy physical operations",
    left: 624,
    top: 241,
    side: "right",
  },
  {
    year: "2030",
    title: "Global Industry Standard",
    desc: "Positioning Trikaan as a default operating system for any industry.",
    left: 824,
    top: 36,
    side: "right",
  },
];

// thin blue connectors from each flag to its card (Figma 234:257–262, 76px each)
const LINES: { left: number; top: number }[] = [
  { left: 244, top: 754 }, // 2025
  { left: 1064, top: 687 }, // 2026
  { left: 636, top: 515 }, // 2027
  { left: 1148, top: 389 }, // 2028
  { left: 779, top: 265 }, // 2029
  { left: 984, top: 53 }, // 2030
];

// 2026 is a special multi-entry card (Figma 234:263) , year + vertical timeline + 3 entries
const ENTRIES_2026 = [
  {
    title: "Anvaya Platform Launch",
    desc: "Unified modular industrial tool into a single, cohesive platform",
  },
  {
    title: "AI-Powered Operations",
    desc: "Climbing toward full autonomy with intelligent, localized model optimization.",
  },
  {
    title: "First 4 Enterprise Customers",
    desc: "Successfully deploy Anvaya for the first four enterprise customers.",
  },
];

function Card2026() {
  return (
    <div className="w-[220px] overflow-hidden rounded-[6px] border-l-[2.5px] border-brand bg-white px-2.5 py-2.5 shadow-milestone">
      <p className="mb-2 font-heading text-[10px] text-brand-electric">2026</p>
      <ol className="relative ml-1 flex flex-col gap-3.5 border-l border-brand/40 pl-4">
        {ENTRIES_2026.map((e, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[19px] top-1 size-[7px] rounded-full border-2 border-brand bg-white" />
            <p className="font-heading text-[11px] leading-tight text-ink">
              {e.title}
            </p>
            <p className="mt-0.5 w-[135px] text-[9px] leading-[1.4] text-muted-5">
              {e.desc}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Milestone({ m }: { m: M }) {
  // map already has the flags baked in , only reveal the info card near each flag
  return (
    <motion.div
      className="absolute"
      style={{ left: m.left, top: m.top }}
      initial={{ opacity: 0, y: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.33, ease: [0.22, 1, 0.36, 1] }}
    >
      {m.year === "2026" ? (
        <Card2026 />
      ) : (
        <MilestoneCard
          year={m.year}
          title={m.title}
          desc={m.desc}
          side={m.side}
        />
      )}
    </motion.div>
  );
}

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const started = useRef(false);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      for (let i = 0; i < MILESTONES.length; i++) {
        setRevealed(i + 1);
        await sleep(1000);
        if (!alive) return;
      }
    })();
    return () => {
      alive = false;
    };
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#eaf2fc] to-white"
    >
      <Container className="pt-16 text-center">
        <div className="mx-auto flex max-w-[684px] flex-col items-center gap-3">
          <WordReveal
            as="h2"
            className="font-heading text-[40px] leading-tight text-ink md:text-[52px]"
          >
            Our Journey , Every Mountain, Every Milestone
          </WordReveal>
          <p className="text-[18px] leading-[1.5] text-ink-600">
            Anvaya began inside Bengaluru&apos;s heavy-manufacturing ecosystem.
            Take a walk through our key historical ascents and our upcoming
            technological horizons.
          </p>
        </div>
      </Container>

      {/* Desktop / tablet: full animated mountain map */}
      <div className="hidden overflow-x-auto pb-6 lg:block">
        <div className="relative mx-auto h-[956px] w-[1497px]">
          <Image
            src="/images/journey-map-figma.png"
            alt="Trikaan journey timeline across mountains"
            fill
            sizes="1497px"
            className="object-contain"
            priority
          />
          {LINES.map((l, i) =>
            revealed > i ? (
              <motion.span
                key={i}
                aria-hidden
                className="absolute h-[2px] rounded-full bg-brand"
                style={{ left: l.left, top: l.top, width: 76 }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : null,
          )}
          {MILESTONES.map((m, i) =>
            revealed > i ? <Milestone key={m.year} m={m} /> : null,
          )}
        </div>
      </div>

      {/* Mobile / tablet: premium vertical timeline */}
      <div className="mx-auto w-full max-w-[440px] px-5 pb-16 pt-4 sm:max-w-[600px] sm:px-8 lg:hidden">
        <ol className="relative flex flex-col gap-6 pl-10">
          <motion.span
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-[2px] origin-top rounded-full bg-gradient-to-b from-brand via-brand/50 to-brand/10"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: MILESTONES.length * 0.22,
              ease: "easeInOut",
            }}
          />
          {MILESTONES.map((m, i) => (
            <motion.li
              key={m.year}
              className="relative"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.33,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.18,
              }}
            >
              <motion.span
                className="absolute -left-[34px] top-3 flex size-7 items-center justify-center rounded-full bg-brand shadow-[0_4px_10px_rgba(3,66,253,0.35)]"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 18,
                  delay: i * 0.18 + 0.1,
                }}
              >
                <span className="size-2 rounded-full bg-white" />
              </motion.span>
              <div className="flex flex-col gap-1.5 rounded-[14px] border border-border border-l-[3px] border-l-brand-bright bg-white p-4 shadow-milestone">
                <span className="w-fit rounded-full bg-tint-blue px-2.5 py-0.5 font-heading text-[13px] text-brand">
                  {m.year}
                </span>
                <p className="font-heading text-[17px] leading-tight text-ink">
                  {m.title}
                </p>
                <p className="text-[13px] leading-[1.5] text-muted-5">
                  {m.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
