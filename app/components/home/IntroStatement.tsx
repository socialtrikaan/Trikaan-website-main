"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Container from "@/components/ui/Container";
import LineReveal from "@/components/ui/LineReveal";

// Figma node 1:461 , two-column intro: handwritten statement + "We are Trikaan" copy.
// Animation only (layout unchanged): heading text-mask, line-by-line paragraphs, button
// spring-scale, drifting particle backdrop, whole section drifts slower than the page.

// deterministic drift dots (no layout impact: absolute, aria-hidden, behind content)
const DOTS = [
  { l: "8%", t: "18%", s: 6, d: 9, dl: 0 },
  { l: "22%", t: "68%", s: 4, d: 11, dl: 1.2 },
  { l: "38%", t: "30%", s: 5, d: 10, dl: 0.6 },
  { l: "48%", t: "80%", s: 3, d: 12, dl: 2 },
  { l: "60%", t: "22%", s: 7, d: 9.5, dl: 0.3 },
  { l: "72%", t: "60%", s: 4, d: 11.5, dl: 1.6 },
  { l: "84%", t: "34%", s: 5, d: 10.5, dl: 0.9 },
  { l: "92%", t: "72%", s: 3, d: 12.5, dl: 2.4 },
  { l: "15%", t: "45%", s: 4, d: 10, dl: 1.8 },
  { l: "66%", t: "84%", s: 6, d: 9, dl: 0.5 },
];

export default function IntroStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // section drifts slower than the page → depth
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), {
    stiffness: 300,
    damping: 40,
  });

  const enter = { once: true, amount: 0 } as const; // trigger as it enters (Hero still leaving)

  return (
    <section className="relative overflow-hidden bg-white pb-[100px] pt-[60px]">
      {/* drifting particle backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {DOTS.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-brand/10"
            style={{ left: p.l, top: p.t, width: p.s, height: p.s }}
            animate={{ y: [0, -16, 0], x: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{
              duration: p.d,
              delay: p.dl,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <motion.div
          className="flex flex-col gap-[40px] lg:flex-row lg:items-start lg:gap-0"
          style={{ y }}
        >
          <div className="lg:w-1/2 lg:pr-[60px]">
            {/* heading , text mask reveal */}
            <motion.p
              className="max-w-[520px] font-heading text-[52px] leading-[1.3] text-brand sm:text-[52px] sm:leading-[68px]"
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={enter}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            >
              We build systems that grow with the way your business evolves.
            </motion.p>
          </div>
          <div className="flex flex-col gap-[24px] lg:w-1/2 lg:border-l lg:border-border lg:pl-[60px]">
            <p className="text-[18px] font-semibold text-ink">
              We are Trikaan.
            </p>
            <div className="flex flex-col gap-[24px] text-[16px] leading-[1.8] text-ink-600">
              <LineReveal as="p">
                We started with a simple observation: businesses constantly
                adapt, but most software doesn&apos;t.
              </LineReveal>
              <LineReveal as="p">
                We&apos;ve walked through factories where production relied on
                whiteboards. Warehouses tracked inventory in spreadsheets.
                Approvals happened over phone calls. Not because businesses
                didn&apos;t invest in software, but because somewhere along the
                way the software stopped reflecting how the business actually
                worked. The business kept evolving. The software didn&apos;t.
                People filled the gaps. We saw that story again and again.
              </LineReveal>
              <p className="font-semibold text-ink">
                What if software never became outdated because it evolved with
                the business?
              </p>
              <LineReveal as="p">
                That question became Trikaan. Today, we don&apos;t just build
                software. We build systems that continue to grow, adapt, and
                improve alongside the businesses they power.
              </LineReveal>
            </div>
            <div className="pt-[14px]">
              {/* button , scale 0.9 → 1, spring */}
              <motion.div
                className="inline-flex"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <Link
                  href="/about"
                  className="inline-flex rounded-[26px] border border-brand bg-brand px-[24px] py-[12px] font-heading text-[14px] text-white transition-colors hover:bg-brand-bright"
                >
                  Learn more about us
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
