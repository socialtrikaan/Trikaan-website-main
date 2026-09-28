import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";

// Figma HeroHeader (node 1:1638): surface-150 bg, bottom border, pt-80/pb-60, gap-16.
export default function HeroHeader() {
  return (
    <section className="border-b border-border bg-surface-150">
      <Container className="flex flex-col gap-4 pb-[60px] pt-20">
        <div className="flex items-center gap-2 text-[12px]">
          <p className="font-semibold uppercase text-brand">
            Legal Documentation
          </p>
          <p className="text-ink-600">/</p>
          <p className="uppercase text-ink-600">Corporate</p>
        </div>
        <WordReveal as="h1" className="font-heading text-[32px] text-ink sm:text-[48px]">
          Terms &amp; Conditions
        </WordReveal>
        <div className="flex items-center gap-[6px] text-[14px]">
          <p className="text-ink-600">Last Updated:</p>
          <p className="font-semibold text-ink">October 24, 2026</p>
        </div>
      </Container>
    </section>
  );
}
