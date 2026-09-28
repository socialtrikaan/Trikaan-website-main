import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";

export default function HeroHeader() {
  return (
    <section className="border-b border-border bg-surface-150">
      <Container className="pt-[56px] pb-[60px]">
        <div className="flex items-center gap-2 text-[12px]">
          <span className="font-semibold uppercase text-brand">
            Legal Documentation
          </span>
          <span className="text-ink-600">/</span>
          <span className="uppercase text-ink-600">Corporate</span>
        </div>
        <WordReveal as="h1" className="mt-[40px] font-heading text-[32px] text-ink sm:text-[48px]">
          Privacy Policy
        </WordReveal>
        <div className="mt-[24px] flex items-center gap-2 text-[14px]">
          <span className="text-ink-600">Last Updated:</span>
          <span className="font-semibold text-ink">October 24, 2026</span>
        </div>
      </Container>
    </section>
  );
}
