import ParallaxImage from "@/components/ui/ParallaxImage";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";
import Container from "@/components/ui/Container";

export default function HeroSection() {
  return (
    <section className="bg-white">
      <Container className="flex flex-col items-center gap-10 py-16 lg:flex-row lg:gap-12 lg:py-0">
        <div className="flex flex-1 flex-col items-start gap-6">
          <div className="rounded-pill bg-tint-blue px-3 py-1.5">
            <p className="text-[11px] font-bold uppercase text-brand">
              We&apos;re Hiring
            </p>
          </div>
          <WordReveal as="h1" className="text-[36px] font-extrabold tracking-[-0.75px] text-ink md:text-[50px] md:leading-[72px]">
            Join the Team Building the Future of{" "}
            <span className="font-heading text-brand">Enterprise Tech</span>
          </WordReveal>
          <LineReveal as="p" className="text-[18px] leading-[30px] text-ink-600">
            Trikaan creates the operating systems and digital infrastructure
            that move physical goods. Join a collaborative culture driven by
            real impact, continuous learning, and scalable engineering.
          </LineReveal>
        </div>
        <div className="relative aspect-[924/738] w-full lg:w-[56%] lg:shrink-0">
          <ParallaxImage
            src="/images/careers-hero.png"
            alt=""
            aria-hidden
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
