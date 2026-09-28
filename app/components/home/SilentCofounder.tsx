"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Handshake, Settings, Rocket, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";

type Point = { Icon: LucideIcon; lines: string[]; divider: boolean };

const POINTS: Point[] = [
  {
    Icon: Handshake,
    lines: [
      "We become the silent co-founder behind your operations.",
      "Not by making decisions for your business.",
    ],
    divider: true,
  },
  {
    Icon: Settings,
    lines: [
      "By building the systems, processes, and technology that quietly help every decision, every workflow, and every team perform better.",
    ],
    divider: true,
  },
  {
    Icon: Rocket,
    lines: [
      "While you focus on growing your business, we focus on making the business behind it stronger.",
    ],
    divider: false,
  },
];

// Figma node 224:8532 , "When you work with Trikaan, you don't hire a software company."
export default function SilentCofounder() {
  return (
    <section className="bg-white pb-[90px] pt-[70px]">
      <Container className="flex flex-col items-center gap-5 text-center">
        <WordReveal
          as="h2"
          className="max-w-[720px] text-[28px] font-bold leading-[1.2] text-ink sm:text-[40px] sm:leading-[54px]"
        >
          When you work with{" "}
          <span className="font-heading text-brand">Trikaan,</span>
          <br className="hidden sm:block" /> you don&apos;t hire a software
          company.
        </WordReveal>
        <LineReveal
          as="p"
          className="max-w-[760px] text-[16px] leading-[30px] text-ink-600"
        >
          You gain a long-term technology partner invested in how your business
          grows, adapts, and succeeds.
        </LineReveal>
      </Container>

      <Container className="mt-12 flex flex-col items-center gap-12 lg:mt-16 lg:flex-row lg:items-center lg:gap-20">
        {/* hand-drawn illustration */}
        <motion.div
          className="w-full max-w-[640px] lg:w-1/2 lg:shrink-0"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/silent-cofounder.png"
            alt="Trikaan working alongside your business"
            width={640}
            height={424}
            className="h-auto w-full"
          />
        </motion.div>

        {/* points */}
        <motion.div
          className="flex w-full flex-col gap-6 lg:w-1/2 lg:max-w-[520px]"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {POINTS.map(({ Icon, lines, divider }, i) => (
            <div key={i} className="flex flex-col gap-6">
              <div className="flex items-start gap-5">
                <Icon
                  size={34}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-brand"
                />
                <p className="text-[16px] leading-[30px] text-black">
                  {lines.map((l, k) => (
                    <span key={k} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              </div>
              {divider && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/images/brush-line.svg"
                  alt=""
                  aria-hidden
                  className="ml-[54px] block h-[4px] w-full max-w-[441px]"
                />
              )}
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
