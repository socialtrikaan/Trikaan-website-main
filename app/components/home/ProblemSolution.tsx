"use client";

import { useId } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Network,
  Share2,
  Handshake,
  Database,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";

// Figma node 161:416 , heading left, 3D chain center, 5 cards around it linked by
// right-angle dotted connectors (dot at chain edge + dot at card). On scroll each
// connector draws from the chain, then its card reveals (staggered). Stacks on mobile.
type Card = {
  title: string;
  body: string;
  Icon: LucideIcon;
  pos: string; // card placement in the box
  points: string; // dotted elbow polyline (viewBox 780x560, uniform)
  dotC: [number, number]; // chain-edge node
  dotA: [number, number]; // card-side node
};

// viewBox 780 x 560 (== container aspect → uniform scale → round dots, exact alignment)
const CARDS: Card[] = [
  {
    title: "Business Process Engineering",
    body: "We study how your business truly operates, identify friction, and design systems around your real-world workflows and assumptions.",
    Icon: Network,
    pos: "left-[6%] top-0",
    points: "300,205 300,110 150,110",
    dotC: [300, 205],
    dotA: [150, 110],
  },
  {
    title: "Connected Digital Ecosystems",
    body: "From ERP and production to finance, logistics, CRM, AI, and custom applications, we connect every moving part into one intelligent ecosystem.",
    Icon: Share2,
    pos: "right-0 top-[32%]",
    points: "512,206 512,232 720,232",
    dotC: [512, 206],
    dotA: [720, 232],
  },
  {
    title: "Strategic Technology Partnership",
    body: "We're not another vendor. We work alongside your leadership team to solve problems, improve operations, and help your business grow through technology.",
    Icon: Handshake,
    pos: "right-0 bottom-[12%]",
    points: "500,360 500,430 546,430",
    dotC: [500, 360],
    dotA: [546, 430],
  },
  {
    title: "Operational Intelligence",
    body: "We centralize your data to improve accuracy, strengthen security, and restore visibility.",
    Icon: Database,
    pos: "left-[26%] bottom-0",
    points: "390,375 390,435 320,435",
    dotC: [390, 375],
    dotA: [320, 435],
  },
  {
    title: "Continuous Evolution",
    body: "Businesses change. Your technology should too. We continuously refine and extend your systems as your operations evolve.",
    Icon: TrendingUp,
    pos: "left-0 bottom-[20%]",
    points: "290,360 290,385 234,385",
    dotC: [290, 360],
    dotA: [234, 385],
  },
];

function CardBox({ title, body, Icon }: Card) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        rotate: 1.5,
        boxShadow: "0 22px 44px -16px rgba(3,66,253,0.42)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex w-[210px] items-start gap-3 overflow-hidden rounded-[12px] border border-[#eaf0fc] bg-white px-3.5 py-3 drop-shadow-[1px_2px_8px_rgba(221,229,250,0.7)]"
    >
      {/* hover gradient wash */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-tint-blue to-white opacity-0 transition-opacity duration-300 group-hover:opacity-60"
      />
      <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8effe] text-brand transition-transform duration-300 group-hover:rotate-[14deg] group-hover:scale-110">
        <Icon size={18} />
      </span>
      <div className="relative flex flex-col gap-1">
        <p className="text-[12px] font-bold leading-tight text-ink">{title}</p>
        <p className="text-[10px] leading-[1.5] text-muted">{body}</p>
      </div>
    </motion.div>
  );
}

const viewport = { once: true, amount: 0.4 } as const;

// SVG connector timing , one pipe draws at a time, each starting as the previous almost finishes.
const CHAIN_DONE = 0.5; // chain node settles first
const DRAW = 1.9; // seconds for one pipe to draw
const CONN_STEP = 1.5; // gap between pipe starts (< DRAW → slight overlap)
const connDelay = (i: number) => CHAIN_DONE + i * CONN_STEP;
const cardDelay = (i: number) => connDelay(i) + DRAW - 0.15; // card wave as the pipe arrives

type Pt = [number, number];
// rounded-corner path from an elbow polyline (viewBox 780×560 user units)
function roundedPath(pts: Pt[], r = 11) {
  if (pts.length < 3)
    return `M ${pts[0][0]} ${pts[0][1]} L ${pts[pts.length - 1][0]} ${pts[pts.length - 1][1]}`;
  const unit = (a: Pt, b: Pt): Pt => {
    const dx = b[0] - a[0],
      dy = b[1] - a[1];
    const l = Math.hypot(dx, dy) || 1;
    return [dx / l, dy / l];
  };
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1],
      p1 = pts[i],
      p2 = pts[i + 1];
    const rr = Math.min(
      r,
      Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) / 2,
      Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / 2,
    );
    const u1 = unit(p1, p0),
      u2 = unit(p1, p2);
    d += ` L ${p1[0] + u1[0] * rr} ${p1[1] + u1[1] * rr} Q ${p1[0]} ${p1[1]} ${p1[0] + u2[0] * rr} ${p1[1] + u2[1] * rr}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

// SVG "liquid in a pipe": a leading particle rides the head while the stroke draws behind it
// (pathLength). Corners are rounded (Q) so the particle curves. After it arrives, faint
// packets keep flowing along the built pipe forever.
function SvgConnector({ points, delay }: { points: string; delay: number }) {
  const pts = points.split(" ").map((p) => p.split(",").map(Number) as Pt);
  const d = roundedPath(pts);
  const uid = useId().replace(/:/g, "");
  const gid = `g${uid}`;
  const fid = `f${uid}`;
  const offset = {
    offsetPath: `path("${d}")`,
    offsetRotate: "0deg",
  } as React.CSSProperties;
  return (
    <svg
      viewBox="0 0 780 560"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full overflow-visible"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#022DA8" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
        <filter id={fid} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* the pipe , grows behind the particle via pathLength (not width) */}
      <motion.path
        d={d}
        stroke={`url(#${gid})`}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${fid})`}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewport}
        transition={{ duration: DRAW, ease: [0.45, 0.05, 0.3, 1], delay }}
      />

      {/* leading glow particle riding the head */}
      <motion.circle
        r={3.6}
        fill="#ffffff"
        filter={`url(#${fid})`}
        style={offset}
        initial={{ offsetDistance: "0%", opacity: 0 }}
        whileInView={{ offsetDistance: "100%", opacity: [0, 1, 1, 0.9] }}
        viewport={viewport}
        transition={{ duration: DRAW, ease: [0.45, 0.05, 0.3, 1], delay }}
      />

      {/* continuous packets after the pipe is built , varied speeds/starts */}
      {[0, 1].map((k) => (
        <motion.circle
          key={k}
          r={2.4}
          fill="#7DB8FF"
          filter={`url(#${fid})`}
          style={offset}
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 0.5, 1, 0] }}
          transition={{
            duration: 2.1 + k * 0.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1.2 + k * 0.9,
            delay: delay + DRAW + k * 0.7,
          }}
        />
      ))}
    </svg>
  );
}

export default function ProblemSolution() {
  // cursor parallax for the whole illustration (subtle, keeps connectors attached)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const parX = useTransform(smx, (v) => v * 22);
  const parY = useTransform(smy, (v) => v * 22);
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className="bg-surface-150 py-[80px] lg:py-[100px]">
      <Container className="flex flex-col items-center gap-12 lg:flex-row lg:gap-6">
        <div className="w-full max-w-[560px] lg:w-[36%]">
          <WordReveal
            as="h2"
            className="text-[28px] font-bold leading-[1.3] text-ink sm:text-[37px] sm:leading-[1.25]"
          >
            We Solve Business{" "}
            <span className="font-heading text-brand">Complexity.</span>
            <span className="block">
              You Focus on Building the{" "}
              <span className="font-heading text-brand">Business.</span>
            </span>
          </WordReveal>
          <LineReveal
            as="p"
            className="mt-[24px] text-[17px] leading-[1.7] text-muted"
          >
            Businesses don&apos;t stand still. Markets change, teams grow,
            processes evolve. That&apos;s why we don&apos;t deliver software and
            walk away , we become the technology partner behind your operations,
            continuously shaping technology around the way your business
            evolves.
          </LineReveal>
        </div>

        {/* Desktop: chain + HTML/CSS elbow connectors + cards */}
        <div
          className="relative hidden aspect-[780/560] w-full lg:block lg:w-[64%]"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <motion.div className="absolute inset-0" style={{ x: parX, y: parY }}>
            {CARDS.map((c, i) => (
              <SvgConnector
                key={c.title}
                points={c.points}
                delay={connDelay(i)}
              />
            ))}

            {/* soft glow behind chain , breathing */}
            <div className="absolute left-1/2 top-1/2 size-[32%] -translate-x-1/2 -translate-y-1/2">
              <motion.span
                aria-hidden
                className="block size-full rounded-full bg-brand/15 blur-3xl"
                animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.14, 1] }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>
            {/* center node appears first , springs in, then breathes */}
            <motion.img
              src="/images/problem-chain-3d.png"
              alt="Connected business systems illustrated as a glowing chain"
              className="absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(ellipse_at_center,black_74%,transparent_95%)]"
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            />

            {CARDS.map((c, i) => {
              const dl = cardDelay(i);
              const rot = i % 2 === 0 ? -7 : 7;
              return (
                <motion.div
                  key={c.title}
                  className={`absolute ${c.pos}`}
                  initial={{ opacity: 0, scale: 0.55, y: 50, rotate: rot }}
                  whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  viewport={viewport}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 16,
                    delay: dl,
                  }}
                >
                  {/* gentle perpetual float after arrival */}
                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                      rotate: [0, i % 2 === 0 ? -1 : 1, 0],
                    }}
                    transition={{
                      duration: 5 + i * 0.4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: dl + 1,
                    }}
                  >
                    <div className="relative">
                      {/* soft blue wave through the card border when the pipe arrives */}
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute -inset-1 rounded-[14px] ring-2 ring-brand/60"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{
                          opacity: [0, 0.9, 0],
                          scale: [0.9, 1.06, 1.14],
                        }}
                        viewport={viewport}
                        transition={{
                          duration: 0.9,
                          ease: "easeOut",
                          delay: dl,
                        }}
                      />
                      <CardBox {...c} />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile / tablet: chain then stacked cards */}
        <div className="flex w-full flex-col items-center gap-8 lg:hidden">
          <img
            src="/images/problem-chain-3d.png"
            alt="Connected business systems illustrated as a glowing chain"
            className="w-[72%] max-w-[340px] [mask-image:radial-gradient(circle,black_60%,transparent_84%)]"
          />
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                className="[&>div]:w-full"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 24,
                  rotate: i % 2 === 0 ? -4 : 4,
                }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                viewport={viewport}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                  delay: i * 0.08,
                }}
              >
                <CardBox {...c} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
