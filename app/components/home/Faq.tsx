"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";

type Faq = {
  q: string;
  a?: string;
  paras?: { label?: string; text: string }[];
};

const FAQS: Faq[] = [
  {
    q: "Is Trikaan only for large enterprises?",
    a: "Not at all. We work with businesses of all sizes - from 20-person trading firms to multi-plant manufacturers. Our starter plan is free, and we scale with you.",
  },
  {
    q: "How long does onboarding take?",
    paras: [
      {
        text: "We don't just implement software,we understand your business, solve the right problems, and build systems that grow with you. Every implementation is carried out in four carefully planned phases over 2–3 months.",
      },
      {
        label: "Phase 1 , Discover & Define",
        text: "We work closely with your team to understand your business, identify operational challenges, and map existing workflows. The outcome is a detailed findings report, clearly defined problem statements, and a finalized set of requirements before development begins.",
      },
      {
        label: "Phase 2 , Prototype & Validate",
        text: "Every workflow is designed and visualized before it's built. Through interactive prototypes, we refine the experience with your feedback until every feature aligns with your expectations.",
      },
      {
        label: "Phase 3 , Build & Deliver",
        text: "With validated designs and approved requirements, our engineering team transforms the solution into a production-ready platform. Every requirement is implemented with performance, scalability, and long-term reliability in mind.",
      },
      {
        label: "Phase 4 , Deploy, Train & Optimize",
        text: "We deploy the solution, onboard your team, conduct training sessions, and provide a dedicated testing and support period. This ensures your organization is comfortable with the platform and fully prepared to leverage its capabilities from day one.",
      },
      {
        text: "The complete implementation typically takes 2–3 months, depending on the scope and complexity of your business. As your business evolves, we continue improving and expanding the platform,ensuring your technology grows alongside your operations.",
      },
    ],
  },
  {
    q: "Does it connect with our existing ERP?",
    a: "Yes. Trikaan has out-of-the-box connectors for SAP, Tally, and most major ERPs. Custom integrations are available on the Growth and Enterprise plans.",
  },
  {
    q: "What about vendors who aren't tech-savvy?",
    a: "The vendor portal is designed for anyone - mobile-first, multilingual, and as simple as placing a WhatsApp order. If they can use a smartphone, they can use Trikaan.",
  },
  {
    q: "Is our data secure?",
    a: "Completely. All data is encrypted at rest and in transit. We're SOC 2 compliant, and your data never leaves Indian servers unless you opt in to global infrastructure.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white">
      <Container className="flex flex-col items-center py-25">
        <div className="flex flex-col items-center gap-5 pb-16 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.26px] text-muted">
            FAQ
          </p>
          <WordReveal
            as="h2"
            className="max-w-[720px] text-[40px] font-bold leading-tight text-ink md:text-[48px]"
          >
            Questions we get a lot.
          </WordReveal>
          <LineReveal
            as="p"
            className="max-w-[720px] text-[17px] leading-[1.7] text-muted"
          >
            Everything you want to know about Trikaan - answered honestly.
          </LineReveal>
        </div>

        <dl className="w-full max-w-[720px]">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.33,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.08,
                }}
              >
                {i > 0 && (
                  <motion.div
                    aria-hidden
                    className="h-px w-full origin-left bg-brand/30"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.39,
                      ease: [0.22, 1, 0.36, 1],
                      delay: i * 0.08,
                    }}
                  />
                )}
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-brand"
                  >
                    <span
                      className={`text-[16px] font-bold transition-colors ${isOpen ? "text-brand" : "text-ink"}`}
                    >
                      {item.q}
                    </span>
                    <motion.span
                      aria-hidden
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-brand text-white" : "bg-surface-150 text-ink-600"}`}
                    >
                      <Plus size={16} strokeWidth={2.4} />
                    </motion.span>
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      {item.paras ? (
                        <div className="flex flex-col gap-3 pb-6 pr-4 text-[15px] leading-[1.7] text-muted sm:pr-12">
                          {item.paras.map((p, k) => (
                            <p key={k}>
                              {p.label && (
                                <span className="font-bold text-ink">
                                  {p.label}
                                  <br />
                                </span>
                              )}
                              {p.text}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <motion.p
                          className="pb-6 pr-12 text-[15px] leading-[1.7] text-muted"
                          initial="hidden"
                          animate="show"
                          variants={{
                            hidden: {},
                            show: {
                              transition: {
                                staggerChildren: 0.02,
                                delayChildren: 0.08,
                              },
                            },
                          }}
                        >
                          {(item.a ?? "").split(" ").map((w, k) => (
                            <motion.span
                              key={k}
                              className="inline-block"
                              variants={{
                                hidden: { opacity: 0, y: 8 },
                                show: { opacity: 1, y: 0 },
                              }}
                            >
                              {w}&nbsp;
                            </motion.span>
                          ))}
                        </motion.p>
                      )}
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
