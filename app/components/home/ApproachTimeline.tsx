"use client";

import { useLayoutEffect, useRef, useState } from "react";
import ParallaxImage from "@/components/ui/ParallaxImage";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  type Variants,
} from "framer-motion";
import Container from "@/components/ui/Container";
import { EASE_OUT } from "@/lib/animations";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";

// Figma node 1:489 / 1:494 , "our approach" header + 4 alternating photo/text step cards.
// Premium scroll-story reveal: alternating slide-in, image white-wipe + blur→sharp,
// staggered text, animated border + blue glow. Once-only per card.
const steps = [
  {
    step: "Step 01",
    title: "Understand Before We Build",
    body: "Every challenge has a story behind it. When you come to us with a problem, we don't immediately jump into development. We spend time with your teams, observe your operations, map your workflows, and uncover the real bottlenecks. Sometimes the problem you describe isn't the one holding your business back , our job is to find the root cause, not just treat the symptoms.",
    photo: "/images/home-approach-1.png",
  },
  {
    step: "Step 02",
    title: "Challenge Assumptions, Not Just Requirements",
    body: "We don't believe every requested feature should be built. Instead, we ask why. Why does this process exist? Why is this done manually? What outcome are you actually trying to achieve? By questioning assumptions and rethinking workflows, we often discover simpler, more effective solutions than the ones originally requested. We're here to help you make the right decisions.",
    photo: "/images/home-approach-2.png",
  },
  {
    step: "Step 03",
    title: "Engineer Around Your Business",
    body: "No two organizations operate the same way. Once we understand your business, we design systems that fit your people, your processes, and your goals , not generic templates copied from another company. Whether it's manufacturing, logistics, trading, or finance, every solution is engineered around the way your business works today while remaining ready for tomorrow.",
    photo: "/images/home-approach-3.png",
  },
  {
    step: "Step 04",
    title: "Grow Together, Not Goodbye",
    body: "Our work doesn't end after deployment. Businesses evolve. Teams expand. Markets shift. Your technology should evolve with them. We continuously improve, refine, and expand the systems we build so they keep creating value long after launch , because lasting partnerships create better businesses than one-time projects ever can.",
    photo: "/images/home-approach-4.png",
  },
];

const viewport = { once: true, amount: 0.3 } as const;

type Seg = { d: string; a: [number, number]; b: [number, number] };

// one measured connector: a [ or ] bracket from card A's middle to card B's middle.
function ConnPath({ seg, idx }: { seg: Seg; idx: number }) {
  const gid = `ac-g${idx}`;
  const fid = `ac-f${idx}`;
  const delay = idx * 0.15;
  return (
    <g>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2F6BFF" />
          <stop offset="1" stopColor="#7DB8FF" />
        </linearGradient>
        <filter id={fid} x="-120%" y="-60%" width="340%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={seg.d}
        stroke="#1B3A5C"
        strokeOpacity={0.16}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d={seg.d}
        stroke={`url(#${gid})`}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${fid})`}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewport}
        transition={{ duration: 1, ease: EASE_OUT, delay }}
      />
      {[seg.a, seg.b].map(([x, y], k) => (
        <motion.g
          key={k}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{
            duration: 0.4,
            ease: EASE_OUT,
            delay: delay + 0.35 + k * 0.1,
          }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle
            cx={x}
            cy={y}
            r={8}
            fill="#3B6BFF"
            opacity={0.22}
            filter={`url(#${fid})`}
          />
          <circle
            cx={x}
            cy={y}
            r={4.5}
            fill="white"
            stroke="#3B6BFF"
            strokeWidth={2}
          />
        </motion.g>
      ))}
    </g>
  );
}

const textGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};
const textItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

function StepCard({
  s,
  photoFirst,
}: {
  s: (typeof steps)[number];
  photoFirst: boolean;
}) {
  // mouse tracking: subtle parallax on the image only (card itself unchanged)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 150, damping: 20 });
  const smy = useSpring(my, { stiffness: 150, damping: 20 });
  const imgX = useTransform(smx, (v) => v * 12);
  const imgY = useTransform(smy, (v) => v * 10);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const photo = (
    <div className="relative min-h-[220px] w-full overflow-hidden rounded-[16px] p-1.5 lg:min-h-0 lg:w-1/2">
      {/* image entrance (unchanged) + mouse parallax on hover (image only) */}
      <motion.div
        className="absolute inset-1.5 overflow-hidden rounded-[12px]"
        style={{ x: imgX, y: imgY }}
        initial={{ scale: 1.08, filter: "blur(14px)" }}
        whileInView={{ scale: 1, filter: "blur(0px)" }}
        viewport={viewport}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      >
        <ParallaxImage
          src={s.photo}
          alt=""
          aria-hidden
          fill
          sizes="(max-width:1000px) 100vw, 500px"
          className="object-cover"
        />
      </motion.div>
      {/* white gradient wipe */}
      <motion.div
        aria-hidden
        className="absolute inset-1.5 rounded-[12px] bg-gradient-to-r from-white via-white to-white/80"
        style={{ originX: 0 }}
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={viewport}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1], delay: 0.1 }}
      />
    </div>
  );

  const text = (
    <motion.div
      className="flex w-full flex-col justify-center gap-[16px] p-6 sm:p-[48px] lg:w-[460px]"
      variants={textGroup}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <motion.p
        variants={textItem}
        className="font-display text-[14px] font-semibold uppercase text-muted-4"
      >
        {s.step}
      </motion.p>
      <motion.p
        variants={textItem}
        className="font-display text-[24px] font-bold text-brand-navy"
      >
        {s.title}
      </motion.p>
      <motion.p
        variants={textItem}
        className="font-geist text-[15px] leading-[1.6] text-brand-slate"
      >
        {s.body}
      </motion.p>
    </motion.div>
  );

  return (
    <div className="relative">
      {/* soft blue glow behind the card */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] bg-brand/10 blur-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }}
      />
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`group relative z-10 flex flex-col overflow-hidden rounded-[20px] border bg-white lg:min-h-[356px] ${
          photoFirst ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
        initial={{
          opacity: 0,
          x: photoFirst ? -64 : 64,
          borderColor: "rgba(2,45,168,0)",
          boxShadow: "0px 12px 32px 0px rgba(27,58,92,0.04)",
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          borderColor: "rgba(2,45,168,0.16)",
          boxShadow: "0px 24px 48px -12px rgba(3,66,253,0.18)",
        }}
        whileHover={{
          y: -6,
          boxShadow: "0px 32px 64px -12px rgba(3,66,253,0.28)",
        }}
        viewport={viewport}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        {photo}
        {text}
      </motion.div>
    </div>
  );
}

export default function ApproachTimeline() {
  const colRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [segs, setSegs] = useState<Seg[]>([]);

  // measure each card's real vertical middle, then draw brackets from one card's
  // middle to the next card's middle (alternating left / right). Robust to any height.
  useLayoutEffect(() => {
    const col = colRef.current;
    if (!col) return;
    const EXT = 44;
    const measure = () => {
      const cr = col.getBoundingClientRect();
      const mids = cardRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.top - cr.top + r.height / 2;
      });
      const W = cr.width;
      const out: Seg[] = [];
      for (let i = 0; i < mids.length - 1; i++) {
        const a = mids[i];
        const b = mids[i + 1];
        if (a == null || b == null) continue;
        if (i % 2 === 0) {
          out.push({
            d: `M 0 ${a} L ${-EXT} ${a} L ${-EXT} ${b} L 0 ${b}`,
            a: [0, a],
            b: [0, b],
          });
        } else {
          out.push({
            d: `M ${W} ${a} L ${W + EXT} ${a} L ${W + EXT} ${b} L ${W} ${b}`,
            a: [W, a],
            b: [W, b],
          });
        }
      }
      setBox({ w: W, h: cr.height });
      setSegs(out);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(col);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="bg-white pt-[48px]">
      <Container className="flex flex-col items-center text-center">
        <p className="text-[13px] font-semibold uppercase text-muted-6">
          Our approach
        </p>
        <WordReveal
          as="h2"
          className="mt-[20px] max-w-[820px] text-[36px] font-bold leading-[1.2] text-ink sm:text-[48px] sm:leading-[60px]"
        >
          {"We Don't Just Build "}
          <span className="font-heading text-brand">Software.</span> We Learn
          Your <span className="font-heading text-brand">Business First.</span>
        </WordReveal>
        <LineReveal
          as="p"
          className="mt-[20px] max-w-[640px] text-[17px] leading-[1.7] text-muted"
        >
          Most software projects start with a feature list and end with a
          quotation. We take a different path , before we build a single
          feature, we invest time in understanding how your business actually
          works. Because solving the wrong problem perfectly is still the wrong
          solution.
        </LineReveal>
      </Container>

      <div className="mt-[64px] bg-surface-200 pt-[80px]">
        <div className="mx-auto w-full max-w-[1000px] px-6">
          <div
            ref={colRef}
            className="relative flex flex-col gap-[48px] lg:gap-[120px]"
          >
            {/* measured middle-to-middle connectors (desktop) */}
            {box.w > 0 && (
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
                viewBox={`0 0 ${box.w} ${box.h}`}
                preserveAspectRatio="none"
                fill="none"
              >
                {segs.map((seg, i) => (
                  <ConnPath key={i} seg={seg} idx={i} />
                ))}
              </svg>
            )}

            {steps.map((s, i) => (
              <div
                key={s.step}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <StepCard s={s} photoFirst={i % 2 === 0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
