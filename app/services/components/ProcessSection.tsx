"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";
import { EASE_OUT } from "@/lib/animations";

const stages = [
  {
    num: "01",
    title: "Discovery",
    tag: "Shared Understanding Doc",
    desc: "We conduct a deep-dive analysis of your active business operations, workflows, physical constraints, and long-term targets.",
    top: 0,
    indicatorLeft: 0,
    contentLeft: 150,
  },
  {
    num: "02",
    title: "Strategy",
    tag: "Phased Project Plan",
    desc: "We define project scope, construct an engineering roadmap, establish clear success metrics, and detail financial return models.",
    top: 268,
    indicatorLeft: 900,
    contentLeft: 0,
  },
  {
    num: "03",
    title: "Design",
    tag: "Clickable Prototypes",
    desc: "Our designers create clear interactive workflows and layout structures that are thoroughly validated against real user cases.",
    top: 536,
    indicatorLeft: 0,
    contentLeft: 150,
  },
  {
    num: "04",
    title: "Development",
    tag: "Working Milestone Build",
    desc: "We assemble your software in tight fortnightly sprints. You receive complete working live demos at each major milestone.",
    top: 804,
    indicatorLeft: 900,
    contentLeft: 0,
  },
  {
    num: "05",
    title: "Launch & Scale",
    tag: "Live Platform & SLA",
    desc: "Our engineers handle server configuration, data migration, user onboarding training, and initiate a direct support plan.",
    top: 1072,
    indicatorLeft: 0,
    contentLeft: 150,
  },
];

// Exact Figma dashed connector curves (paths lifted from service-timeline-curve-*.svg),
// now drawn inline so they can animate on scroll. Each segment fills over its scroll range.
const segments = [
  {
    id: "tl1",
    d: "M1.90398 0.612259C6.40593 14.6123 94.1829 182.325 322.406 73.6123C470.408 3.11226 712.604 23.6123 713.404 165.612",
    vb: "0 0 715.404 165.624",
    left: 51.9, top: 72, w: 889.4, h: 165.624, flip: false, reverse: false, range: [0, 0.25],
  },
  {
    id: "tl2",
    d: "M729.919 4.79578C732.252 60.4624 670.719 158.997 423.919 131.797C371.919 124.797 367.419 30.7969 458.419 2.29578C506.919 -5.20359 454.319 132.496 217.919 121.296C130.419 110.796 23.9187 79.4969 1.91873 154.297",
    vb: "0 0 731.982 154.861",
    left: 39.4, top: 354.7, w: 910.1, h: 152.297, flip: false, reverse: false, range: [0.25, 0.5],
  },
  {
    id: "tl3",
    d: "M732.919 5.80687C732.919 91.8069 581.919 166.355 496.919 166.355C341.919 166.355 108.919 106.807 192.419 5.8595C260.419 -30.6931 325.419 188.869 137.919 166.369C50.4187 155.869 23.9187 102.555 1.91873 177.355",
    vb: "0 0 734.919 177.92",
    left: 31.3, top: 629.95, w: 913.8, h: 175.611, flip: true, reverse: true, range: [0.5, 0.75],
  },
  {
    id: "tl4",
    d: "M1.90398 0.612259C6.40593 14.6123 94.1829 182.325 322.406 73.6123C470.408 3.11226 717.604 37.1123 718.404 179.112",
    vb: "0 0 720.404 179.124",
    left: 51.3, top: 877.5, w: 895.6, h: 178.5, flip: true, reverse: true, range: [0.75, 1],
  },
] as const;

function Segment({
  seg,
  progress,
}: {
  seg: (typeof segments)[number];
  progress: MotionValue<number>;
}) {
  const drawn = useSpring(useTransform(progress, [seg.range[0], seg.range[1]], [0, 1]), {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
  });
  const dotOpacity = useTransform(drawn, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);
  // reversed segments draw from the far end so flow reads 3→4 and 4→5
  const pathOffset = useTransform(drawn, (v) => (seg.reverse ? 1 - v : 0));
  const dotDist = useTransform(drawn, [0, 1], seg.reverse ? ["100%", "0%"] : ["0%", "100%"]);

  return (
    <div
      aria-hidden
      className={`absolute ${seg.flip ? "-scale-y-100" : ""}`}
      style={{ left: seg.left, top: seg.top, width: seg.w, height: seg.h }}
    >
      <svg viewBox={seg.vb} preserveAspectRatio="none" className="size-full overflow-visible" fill="none">
        <defs>
          {/* solid thick stroke reveals the dashed path along the exact curve */}
          <mask id={seg.id}>
            <motion.path
              d={seg.d}
              stroke="white"
              strokeWidth={26}
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: drawn, pathOffset }}
            />
          </mask>
        </defs>
        <path
          d={seg.d}
          stroke="#022da8"
          strokeWidth={2.5}
          strokeDasharray="9 9"
          strokeLinecap="round"
          fill="none"
          mask={`url(#${seg.id})`}
        />
        {/* glowing blue dot traveling along the path while drawing */}
        <motion.circle
          r={5}
          fill="#3b6bff"
          style={{
            offsetPath: `path("${seg.d}")`,
            offsetDistance: dotDist,
            opacity: dotOpacity,
            filter: "drop-shadow(0 0 6px rgba(59,107,255,0.9))",
          }}
        />
      </svg>
    </div>
  );
}

const group: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const numV: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 16 } },
};
const titleV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.33, ease: EASE_OUT } },
};
const descV: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.39, delay: 0.07 } },
};
const badgeV: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.1 } },
};

const reveal = { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.6 } } as const;

function Indicator({ num }: { num: string }) {
  return (
    <motion.div className="flex flex-col items-center gap-1" variants={group} {...reveal}>
      <motion.p variants={numV} className="font-heading text-[32px] text-brand">{num}</motion.p>
      <motion.p variants={titleV} className="text-[11px] font-semibold uppercase text-muted-4">Stage</motion.p>
    </motion.div>
  );
}

function StageContent({ title, tag, desc }: { title: string; tag: string; desc: string }) {
  return (
    <motion.div className="flex flex-col gap-3" variants={group} {...reveal}>
      <div className="flex items-center justify-between">
        <motion.p variants={titleV} className="text-[20px] font-bold text-ink">{title}</motion.p>
        <motion.span variants={badgeV} className="rounded-pill bg-tint-blue px-3 py-1 text-[11px] font-semibold text-brand whitespace-nowrap">
          {tag}
        </motion.span>
      </div>
      <motion.p variants={descV} className="text-[15px] leading-[24px] text-ink-600">{desc}</motion.p>
    </motion.div>
  );
}

export default function ProcessSection() {
  const boxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: boxRef,
    offset: ["start 75%", "end 65%"],
  });

  return (
    <section id="process" className="w-full bg-white py-[100px]">
      <Container className="flex flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-4">
          <p className="font-geist text-[13px] font-semibold uppercase text-brand">Our Process</p>
          <WordReveal as="h2" className="text-center text-[32px] font-bold leading-[1.2] text-ink sm:text-[44px] sm:leading-[56px]">
            You&apos;ll Always Know What&apos;s Happening, and{" "}
            <span className="font-heading text-brand">Why.</span>
          </WordReveal>
          <p className="w-full max-w-[720px] text-center text-[16px] leading-[26px] text-ink-600">
            Our five-stage process keeps you in control from first conversation to long-term scale.
          </p>
        </div>

        {/* Desktop: exact Figma zigzag with scroll-drawn dashed connectors */}
        <div className="hidden w-full justify-center lg:flex">
          <div ref={boxRef} className="relative h-[1158px] w-[1000px]">
            {segments.map((seg) => (
              <Segment key={seg.id} seg={seg} progress={scrollYProgress} />
            ))}
            {stages.map((s) => (
              <div key={s.num} className="contents">
                <div className="absolute w-[80px]" style={{ left: s.indicatorLeft, top: s.top }}>
                  <Indicator num={s.num} />
                </div>
                <div className="absolute w-[850px]" style={{ left: s.contentLeft, top: s.top }}>
                  <StageContent title={s.title} tag={s.tag} desc={s.desc} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: stacked list */}
        <ol className="flex w-full max-w-[680px] flex-col gap-10 border-l-2 border-dashed border-brand/30 pl-6 lg:hidden">
          {stages.map((s) => (
            <li key={s.num} className="flex flex-col gap-3">
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-[28px] text-brand">{s.num}</span>
                <span className="text-[11px] font-semibold uppercase text-muted-4">Stage</span>
              </div>
              <StageContent title={s.title} tag={s.tag} desc={s.desc} />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
