"use client";

import { motion } from "framer-motion";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "./SectionHeader";

const POINTS = [
  {
    title: "High Trust Environment",
    body: "We evaluate output and responsibility, not desk-time or rigid hours.",
  },
  {
    title: "Continuous Learning",
    body: "Regular tech talks, workshop budgets, and peer code reviews.",
  },
];

export default function LifeAtTrikaan() {
  return (
    <section className="bg-white">
      <Container className="flex flex-col items-center gap-16 py-20 md:py-30">
        <SectionHeader
          eyebrow="Life At Trikaan"
          title={
            <>
              Where technical mastery meets mutual{" "}
              <span className="font-heading text-brand">respect.</span>
            </>
          }
          subtitle="Get a glimpse into our modern workspace, high-trust team sessions, and outdoor offsites."
        />
        <div className="flex w-full flex-col items-center gap-12 lg:flex-row">
          <motion.div
            className="grid w-full flex-1 grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.39, ease: [0.22, 1, 0.36, 1] }}
          >
            {["careers-life-1", "careers-life-2", "careers-life-3", "careers-life-4"].map((img) => (
              <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-card">
                <ParallaxImage src={`/images/${img}.png`} alt="" aria-hidden fill sizes="(max-width: 1024px) 45vw, 260px" className="object-cover" />
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-col gap-8 lg:w-[540px] lg:shrink-0"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.39, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-4">
              <p className="font-heading text-[32px] leading-[42px] text-brand">
                &ldquo;We encourage autonomy, emphasize quality, and ensure
                every voice has space in defining how our platforms evolve.&rdquo;
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-[16px] font-bold text-ink">Rohit</p>
                <p className="text-[14px] text-muted">VP of Engineering, Trikaan</p>
              </div>
            </div>
            <hr className="border-t border-border" />
            <div className="flex flex-col gap-5">
              {POINTS.map(({ title, body }) => (
                <div key={title} className="flex gap-4">
                  <Check className="size-5 shrink-0 text-brand" />
                  <div className="flex flex-col gap-1">
                    <p className="text-[16px] font-bold text-ink">{title}</p>
                    <p className="text-[14px] leading-[22px] text-ink-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
