import Link from "next/link";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";
import Container from "@/components/ui/Container";

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-b from-[rgba(235,241,255,0.4)] to-white">
      <Container className="flex flex-col items-center gap-10 pt-[120px] pb-[100px]">
        <div className="flex w-full max-w-[1000px] flex-col items-center gap-6">
          <span className="rounded-pill bg-tint-blue px-3 py-1.5 font-geist text-[11px] font-bold uppercase text-brand">
            Systems Engineering Services
          </span>
          <WordReveal as="h1" className="text-center font-geist text-[40px] font-bold leading-[1.05] text-ink sm:text-[60px] sm:leading-[76px]">
            From Pain Points to{" "}
            <span className="font-heading text-brand">Market-Ready Products</span>
          </WordReveal>
          <LineReveal as="p" className="w-full max-w-[760px] text-center text-[18px] leading-[28px] text-ink-600">
            {`We don't just write software. We diagnose the operational problem, design the product that solves it, and own the outcome through launch and beyond.`}
          </LineReveal>
          <LineReveal as="p" className="w-full max-w-[760px] text-center text-[15px] leading-[24px] text-muted-4">
            {`Whether you're launching a new SaaS product, modernising a critical enterprise system, or escaping a tangle of spreadsheets, Trikaan brings years of systems engineering to the job.`}
          </LineReveal>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-[26px] bg-brand px-8 py-3.5 font-geist text-[16px] font-semibold text-white transition-colors hover:bg-brand-bright"
          >
            Start a Project
          </Link>
          <Link
            href="#process"
            className="rounded-[26px] border border-ink px-8 py-3.5 font-geist text-[16px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            See Our Process
          </Link>
        </div>
      </Container>
    </section>
  );
}
