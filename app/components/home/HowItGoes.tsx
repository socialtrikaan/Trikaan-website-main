"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";

type Step = { n: string; icon: string; title: string; lines: string[] };

const STEPS: Step[] = [
  {
    n: "01",
    icon: "/images/how/msg.svg",
    title: "One day, your sales team asks for a small change.",
    lines: [
      "“It's just one extra approval.”",
      "We hear it directly , no ticket queue, no account manager relay.",
    ],
  },
  {
    n: "02",
    icon: "/images/how/puzzle.svg",
    title: "The software already bends this way.",
    lines: [
      "Anvaya is built module by module, not as one rigid block. Adding a workflow doesn't mean waiting for a platform-wide release , or breaking something else to get it.",
    ],
  },
  {
    n: "03",
    icon: "/images/how/users.svg",
    title: "A few weeks later, another department needs a change too.",
    lines: [
      "Production wants a different check.",
      "Finance wants a different workflow.",
      "Procurement has its own process.",
      "Each one gets built the same way , as a real requirement, not a support ticket.",
    ],
  },
  {
    n: "04",
    icon: "/images/how/refresh.svg",
    title: "Two Months later, it's live.",
    lines: [
      "Standard enhancements move from a signed-off requirement to production in as little as 2 months , not the multi-quarter change-request cycles typical of legacy ERP vendors.",
    ],
  },
  {
    n: "05",
    icon: "/images/how/note.svg",
    title: "Your teams keep asking for improvements.",
    lines: [
      "Because we keep shipping them.",
      "No spreadsheets on the side. No WhatsApp workarounds. If it's easier to ask us than to build a workaround, your teams will keep asking , and the software keeps getting better instead of getting patched around.",
    ],
  },
  {
    n: "06",
    icon: "/images/how/monitor.svg",
    title: "That's the moment",
    lines: [
      "The software starts running the way your business actually works.",
      "Not because we guessed right the first time. Because we kept building with you, not just for you at launch.",
    ],
  },
];

// Figma node 224:8840 , "Here how it goes with Trikaan." 6-step story.
export default function HowItGoes() {
  return (
    <section className="bg-surface-150 pb-[70px] pt-[70px]">
      <Container className="flex flex-col items-center gap-4 text-center">
        <WordReveal
          as="h2"
          className="text-[30px] font-bold leading-[1.15] text-ink sm:text-[48px] sm:leading-[60px]"
        >
          Here how it goes with{" "}
          <span className="font-heading text-brand">Trikaan.</span>
        </WordReveal>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brush-line.svg"
          alt=""
          aria-hidden
          className="h-[4px] w-[160px]"
        />
        <p className="max-w-[680px] text-[16px] font-light leading-[1.5] text-black">
          Your teams will still ask for changes. That&apos;s normal , a business
          that isn&apos;t asking for changes has stopped growing. What&apos;s
          different is what happens next.
        </p>
      </Container>

      <Container className="mt-14 max-w-[1080px]">
        <ol className="flex flex-col">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              className="relative flex items-start gap-4 pb-8 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.33,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05,
              }}
            >
              {/* icon circle */}
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-brand/10 bg-brand/[0.05] sm:size-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.icon}
                  alt=""
                  aria-hidden
                  className="size-8 sm:size-11"
                />
              </span>

              {/* rail + dot (desktop) */}
              <div className="relative hidden w-4 shrink-0 self-stretch lg:block">
                {i < STEPS.length - 1 && (
                  <span className="absolute left-1/2 top-9 h-[calc(100%+2rem)] w-px -translate-x-1/2 bg-brand/15" />
                )}
                <span className="absolute left-1/2 top-8 size-3 -translate-x-1/2 rounded-full bg-brand ring-4 ring-brand/15" />
              </div>

              {/* number + text */}
              <div className="flex flex-1 items-start gap-4 pt-3 sm:gap-6">
                <span className="flex size-[50px] shrink-0 items-center justify-center rounded-[10px] border border-brand/5 bg-brand/10 font-heading text-[20px] text-brand">
                  {s.n}
                </span>
                <div className="flex flex-1 flex-col gap-2 pb-8">
                  <h3 className="text-[19px] font-bold leading-tight text-brand sm:text-[24px]">
                    {s.title}
                  </h3>
                  <div className="text-[15px] leading-[1.6] text-brand-slate sm:text-[18px]">
                    {s.lines.map((l, k) => (
                      <p key={k}>{l}</p>
                    ))}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="mt-4 border-b border-dashed border-brand/25" />
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>

      <Container className="mt-8 text-center">
        <WordReveal
          as="p"
          className="font-heading text-[30px] leading-[1.2] text-brand sm:text-[50px]"
        >
          Your business leads. The software keeps up.
        </WordReveal>
      </Container>
    </section>
  );
}
