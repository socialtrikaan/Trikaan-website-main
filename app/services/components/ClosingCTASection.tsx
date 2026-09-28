import Link from "next/link";
import WordReveal from "@/components/ui/WordReveal";
import Container from "@/components/ui/Container";

export default function ClosingCTASection() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-[rgba(235,241,255,0.27)]">
      <Container className="flex flex-col items-center gap-8 pt-20 pb-[120px]">
        <div className="flex w-full max-w-[800px] flex-col items-center gap-4 text-center">
          <WordReveal as="h2" className="text-[32px] font-bold leading-[1.2] text-ink sm:text-[44px]">
            Track Record You Can <span className="font-heading text-brand">Lean On</span>
          </WordReveal>
          <p className="w-full max-w-[640px] text-[16px] leading-[26px] text-ink-600">
            Whether you need to secure legacy architecture or build a brand-new cloud product from scratch, our engineers are ready.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-[26px] bg-brand px-8 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-brand-bright"
          >
            Start a Project
          </Link>
          <Link
            href="/contact"
            className="rounded-[26px] border border-ink px-8 py-3.5 text-[16px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Request a Demo
          </Link>
        </div>
      </Container>
    </section>
  );
}
