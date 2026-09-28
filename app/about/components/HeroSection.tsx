import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";

// Figma node 234:92 , handwritten headline + handwritten supporting paragraph, centered.
export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-[rgba(235,241,255,0.5)] to-white">
      <Container className="flex flex-col items-center gap-10 py-24 text-center md:py-32">
        <WordReveal
          as="h1"
          className="max-w-[1264px] font-heading text-[44px] leading-[1.1] text-brand md:text-[72px]"
        >
          We Didn&apos;t Start a Software Company.
        </WordReveal>
        <LineReveal
          as="p"
          className="max-w-[1012px] font-heading text-[20px] leading-[1.7] text-ink md:text-[26px]"
        >
          We Built a Better Way to Run Industry. Software was never our goal.
          Solving real operational problems was. That&apos;s why we don&apos;t
          begin with features, modules, or products. We begin with understanding
          how industries actually work,how materials move, how decisions are
          made, where time is lost, and where growth gets blocked. Technology is
          simply the tool. The solution is what matters. Every product we build
          exists to help industries operate smarter, faster, and with greater
          confidence. We&apos;re not building software. We&apos;re engineering
          the future of industrial operations.
        </LineReveal>
      </Container>
    </section>
  );
}
