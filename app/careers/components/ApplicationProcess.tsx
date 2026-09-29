"use client";

import { motion, type Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { EASE_OUT } from "@/lib/animations";
import SectionHeader from "./SectionHeader";

// Connector line grows left→right; inherits its StaggerItem's reveal so it draws right
// after each card's number badge, one step after another.
const lineV: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.33, ease: EASE_OUT, delay: 0.13 } },
};

const STEPS = [
  { title: "Online Application", body: "Submit your portfolio/resume. We focus on past project complexity and your design/architectural philosophy." },
  { title: "Technical Screen", body: "A 45-minute conversational call with a senior lead covering system architecture, clean coding, or design principles." },
  { title: "Practical Interview", body: "Collaborate in a real-time pair coding or system design workshop. No standalone algorithmic puzzles." },
  { title: "Decision & Offer", body: "A quick feedback alignment call followed by a formal ESOP and salary proposal. Transparent and fair." },
];

export default function ApplicationProcess() {
  return (
    <section className="bg-surface-150">
      <Container className="flex flex-col items-center gap-16 py-20 md:py-30">
        <SectionHeader
          eyebrow="The Journey"
          title={
            <>
              Our hiring process is transparent and{" "}
              <span className="font-heading text-brand">straight forward.</span>
            </>
          }
          subtitle="No trick questions or unnecessary rounds. We value your time and aim to make decisions within 14 business days."
        />
        <Stagger className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <StaggerItem key={step.title} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-[18px] bg-brand text-[14px] font-bold text-white">
                  {i + 1}
                </div>
                <motion.div variants={lineV} className="h-px flex-1 origin-left border-t border-border" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] font-bold text-ink">{step.title}</h3>
                <p className="text-[14px] leading-[22px] text-ink-600">{step.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
