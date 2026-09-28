"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import WordReveal from "@/components/ui/WordReveal";
import Container from "@/components/ui/Container";

type Pillar = {
  number: string;
  title: string;
  desc: string;
  bullets: string[];
  cta: string;
};

const pillars: Pillar[] = [
  {
    number: "01",
    title: "SaaS Product Development",
    desc: "We design and build multi-tenant platforms that are secure, billable, and ready to scale - without the costly re-platforming most products hit at growth stage.",
    bullets: [
      "Multi-tenant architecture & data isolation",
      "Subscription & usage billing integrations",
      "Authentication, granular roles & permissions",
      "Sophisticated analytics and custom admin tooling",
      "Modern cloud infrastructure built to scale elastically",
    ],
    cta: "Talk to us about SaaS",
  },
  {
    number: "02",
    title: "Enterprise Solutions",
    desc: "Mission-critical software for complex, multi-location businesses - engineered for compliance, auditability and uptime.",
    bullets: [
      "GST, e-way bill & statutory compliance engineered-in",
      "Multi-entity, multi-location support built-in",
      "Comprehensive system audit trails & secure access controls",
      "Bridges and connectors with legacy third-party ERP systems",
      "Strict enterprise security policies & robust data governance",
    ],
    cta: "Talk to us about Enterprise",
  },
  {
    number: "03",
    title: "Product Strategy",
    desc: "We map your processes, prioritise what to build, and model the business case - so you invest with confidence, not on a hunch.",
    bullets: [
      "Process mapping workshops and deep workflow discovery",
      "Clear, phased product implementation roadmaps",
      "Realistic ROI projections and financial business-case models",
      "Strict technical feasibility and cloud architecture assessments",
      "Executive alignment workshops and goal setting",
    ],
    cta: "Talk to us about Strategy",
  },
  {
    number: "04",
    title: "Digital Transformation",
    desc: "We move you off Tally, Busy or Excel onto a modern, integrated platform - phased, validated, and with your team trained and confident.",
    bullets: [
      "Carefully phased roadmap with zero 'big-bang' system downtime risk",
      "Legacy data extraction, cleaning, mapping and validation",
      "Fail-safe parallel-run periods for safe transition",
      "Hands-on team training sessions & direct adoption support",
      "Legacy server/system secure decommissioning",
    ],
    cta: "Talk to us about Migration",
  },
];

const D = 0.7;
const numberV: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 0.06, scale: 1, transition: { duration: D, ease: "easeOut" } },
};
const contentV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const titleV: Variants = {
  hidden: { opacity: 0, x: 30, filter: "blur(6px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: D, ease: "easeOut" } },
};
const descV: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: D, ease: "easeOut" } },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function PillarRow({ p, cardRight }: { p: Pillar; cardRight: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={`relative flex w-full items-center py-4 ${
        cardRight ? "justify-center xl:justify-end" : "justify-center xl:justify-start"
      }`}
    >
      <motion.span
        aria-hidden
        variants={numberV}
        className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 select-none font-heading text-[320px] leading-[0.9] text-brand xl:block ${
          cardRight ? "left-[-30px]" : "right-[-30px]"
        }`}
      >
        {p.number}
      </motion.span>

      <motion.div
        variants={contentV}
        className="relative flex w-full max-w-[640px] flex-col gap-4 rounded-nav p-6 sm:p-8"
      >
        <div className="flex flex-col gap-2">
          <span className="font-heading text-[20px] text-brand/50 xl:hidden">{p.number}</span>
          <motion.h3 variants={titleV} className="font-heading text-[28px] leading-[1.2] text-brand sm:text-[32px]">
            {p.title}
          </motion.h3>
          <motion.p variants={descV} className="text-[15px] leading-[26px] text-ink-600 sm:text-[16px]">
            {p.desc}
          </motion.p>
        </div>
        <motion.div variants={itemV} className="h-px w-full bg-border" />
        <ul className="flex flex-col gap-3">
          {p.bullets.map((b) => (
            <motion.li key={b} variants={itemV} className="flex items-center gap-3">
              <span className="flex size-[18px] shrink-0 items-center justify-center rounded-[9px] bg-tint-blue">
                <Check className="size-3 text-brand" strokeWidth={3} />
              </span>
              <span className="text-[14px] leading-[20px] text-ink-600">{b}</span>
            </motion.li>
          ))}
        </ul>
        <motion.div variants={itemV}>
          <Link href="/contact" className="flex items-center gap-2 text-[15px] font-semibold text-brand">
            {p.cta}
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function PillarsSection() {
  return (
    <section className="w-full overflow-clip bg-white pb-24 pt-20">
      <Container className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-4">
          <p className="font-geist text-[13px] font-semibold uppercase text-brand [text-shadow:0px_2px_6px_rgba(2,45,168,0.2)]">
            Our Practices
          </p>
          <WordReveal as="h2" className="text-center font-geist text-[32px] font-bold leading-[1.2] text-ink sm:text-[44px] sm:leading-[56px]">
            Four Practices. One Standard of{" "}
            <span className="font-heading text-brand">Ownership.</span>
          </WordReveal>
          <p className="w-full max-w-[720px] text-center text-[16px] leading-[26px] text-ink-600 opacity-90">
            Each engagement is scoped to your reality and delivered in phases you can see and steer.
          </p>
        </div>

        <div className="flex w-full flex-col gap-10 lg:gap-16">
          {pillars.map((p, i) => (
            <PillarRow key={p.number} p={p} cardRight={i % 2 === 0} />
          ))}
        </div>
      </Container>
    </section>
  );
}
