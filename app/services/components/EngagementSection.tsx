import Image from "next/image";
import WordReveal from "@/components/ui/WordReveal";
import Link from "next/link";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";

const customHighlights = [
  "Pre-defined milestones and budgets",
  "Dedicated core product engineering team",
  "Flexible post-launch maintenance scope",
  "Full direct IP and code ownership",
];

const anvayaHighlights = [
  "License existing modular applications",
  "Significantly reduced development time",
  "Custom connector development",
  "Continuous framework updates",
];

export default function EngagementSection() {
  return (
    <section className="w-full bg-surface-150 py-[100px]">
      <Container className="flex flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[13px] font-semibold uppercase text-brand">Commercial Models</p>
          <WordReveal as="h2" className="text-center text-[32px] font-bold leading-[1.2] text-ink sm:text-[44px] sm:leading-[56px]">
            Engage the Way That Suits <span className="font-heading text-brand">You.</span>
          </WordReveal>
          <p className="w-full max-w-[720px] text-center text-[16px] leading-[26px] text-ink-600">
            Project-based custom builds, or the flexible commercial models behind Anvaya.
          </p>
        </div>

        <div className="flex w-full flex-col gap-8 md:flex-row md:items-stretch">
          {/* Scoped Custom Build */}
          <div className="relative flex flex-1 flex-col gap-8 overflow-clip rounded-nav border border-border bg-white p-10">
            <Image
              src="/images/service-engagement-character.png"
              alt=""
              aria-hidden
              width={215}
              height={215}
              className="pointer-events-none absolute -bottom-6 -right-6 size-[215px] rotate-180 -scale-y-100 object-cover opacity-90"
            />
            <div className="relative flex flex-col gap-2">
              <p className="text-[22px] font-bold text-ink">Scoped Custom Build</p>
              <p className="text-[14px] text-muted-4">Best for unique, greenfield projects</p>
            </div>
            <p className="relative text-[15px] leading-[24px] text-ink-600">
              Most service engagements run as a scoped Custom Build. We model the timeline and lock in deliverables and commercial steps.
            </p>
            <div className="relative h-px w-full bg-border" />
            <ul className="relative flex flex-col gap-4">
              {customHighlights.map((h) => (
                <li key={h} className="flex items-center gap-3">
                  <Check className="size-4 shrink-0 text-brand" />
                  <span className="text-[14px] text-ink-600">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Anvaya-Leveraged Build */}
          <div className="flex flex-1 flex-col gap-8 rounded-nav bg-brand p-10">
            <div className="flex flex-col gap-2">
              <p className="text-[22px] font-bold text-white">Anvaya-Leveraged Build</p>
              <p className="text-[14px] text-tint-blue">Accelerated platform deployment</p>
            </div>
            <p className="text-[15px] leading-[24px] text-white">
              {`If your operational needs overlap with Anvaya's existing capabilities, leveraging our pre-built suite gets you live faster and cheaper.`}
            </p>
            <div className="h-px w-full bg-white/[0.13]" />
            <ul className="flex flex-col gap-4">
              {anvayaHighlights.map((h) => (
                <li key={h} className="flex items-center gap-3">
                  <Check className="size-4 shrink-0 text-white" />
                  <span className="text-[14px] text-white">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/contact"
            className="rounded-[26px] border border-brand px-8 py-3.5 text-[16px] font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            See Engagement &amp; Pricing
          </Link>
        </div>
      </Container>
    </section>
  );
}
