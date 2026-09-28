"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";
import Orbit from "@/components/Orbit/Orbit";

const WHY = [
  "Why production slowed?",
  "Why costs increased?",
  "Why deliveries slipped?",
  "Why machines waited?",
  "Why inventory wasn't available?",
];

export default function PlatformOrbit() {
  return (
    <section className="bg-gradient-to-b from-[#f9fbfe] to-white">
      {/* lead-in (Figma node 224:8641) */}
      <Container className="flex flex-col items-center gap-6 pt-[70px] text-center">
        {[
          <>
            <span className="text-black">
              Want to know how we actually Reinvent it{" "}
            </span>
            <span className="font-heading text-brand">The Trikaan way ?</span>
          </>,
          <>
            <span className="font-heading text-ink">
              Your business should lead.{" "}
            </span>
            <span className="font-heading text-brand">Not the software.</span>
          </>,
        ].map((line, i) => (
          <motion.p
            key={i}
            className={
              i === 0
                ? "max-w-[900px] text-[26px] leading-[1.4] sm:text-[48px] sm:leading-[72px]"
                : "max-w-[1065px] text-[26px] leading-[1.3] sm:text-[48px] sm:leading-[60px]"
            }
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.12,
            }}
          >
            {line}
          </motion.p>
        ))}
      </Container>

      {/* Introducing Anvaya , section header */}
      <Container className="flex flex-col items-center gap-3 pt-[64px] text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-muted">
          Introducing Anvaya
        </p>
        <WordReveal
          as="h2"
          className="max-w-[820px] text-[28px] font-bold leading-[1.25] text-ink sm:text-[38px]"
        >
          The Business Platform That Finally{" "}
          <span className="font-heading text-brand">Adapts to You.</span>
        </WordReveal>
      </Container>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-6 pb-[60px] pt-[64px] sm:px-10 lg:flex-row lg:justify-between lg:gap-6 lg:pl-20 lg:pr-8">
        {/* Left content */}
        <motion.div
          className="flex w-full flex-col gap-8 lg:w-[500px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-[36px] font-extrabold leading-[1.1] text-ink md:text-[44px]">
              <span className="font-heading font-bold text-brand">
                20+ Apps.
              </span>
              <br />
              One Connected Platform.
            </h3>
            <p className="font-heading text-[30px] text-brand">
              Every problem, a solution.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-[16px] leading-[1.7] text-ink-600">
            <LineReveal as="p">
              After working with businesses across industries, one thing became
              clear.
            </LineReveal>
            <LineReveal as="p">
              The problem wasn&apos;t the lack of software. It was the lack of
              software that worked together.
            </LineReveal>
            <LineReveal as="p">
              That&apos;s why we built Anvaya , one connected platform with 20+
              integrated applications, built around businesses, not around
              software.
            </LineReveal>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-heading text-[26px] text-brand">
              This Isn&apos;t Digital Transformation.
            </p>
            <p className="text-[16px] leading-[1.6] text-ink-600">
              It&apos;s Manufacturing Intelligence. We believe software
              shouldn&apos;t simply record what happened.
            </p>
            <p className="text-[16px] font-semibold text-ink">
              It should understand why it happened.
            </p>
            <ul className="mt-1 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {WHY.map((q) => (
                <li
                  key={q}
                  className="flex items-center gap-2 text-[15px] text-ink-600"
                >
                  <X
                    size={15}
                    className="shrink-0 text-brand"
                    strokeWidth={3}
                  />
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* enterprise radial orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Orbit />
        </motion.div>
      </div>

      {/* closing statement */}
      <Container className="flex flex-col items-center gap-5 pb-[100px] text-center">
        <LineReveal
          as="p"
          className="max-w-[860px] font-heading text-[22px] leading-[1.5] text-ink-600 sm:text-[26px]"
        >
          Anvaya connects every operation inside your factory into one
          intelligent platform, exposing relationships traditional software
          never sees. Because solving symptoms isn&apos;t enough , we solve
          where they begin.
        </LineReveal>
        <div className="flex flex-col gap-2">
          <p className="font-heading text-[24px] text-brand sm:text-[30px]">
            We don&apos;t make software smarter. We make manufacturing smarter.
          </p>
          <p className="mx-auto max-w-[720px] text-[16px] leading-[1.6] text-ink-600">
            By connecting every process, every person, every machine, and every
            decision into one intelligent operating system.
          </p>
        </div>
      </Container>
    </section>
  );
}
