import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

export default function CtaSection() {
  return (
    <section className="bg-white">
      {/* ponytail: Figma CTASection has no vertical padding of its own; adding py so it
          doesn't collide with the footer. Horizontal + gap values are exact. */}
      <Container className="flex flex-col items-center gap-8 py-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>Join the Mission</Eyebrow>
          <p className="max-w-[1248px] font-heading text-[30px] leading-[1.3] text-ink md:text-[46px]">
            &ldquo;At Trikaan, no solution is considered final. Every answer is an invitation to
            ask a better question.&rdquo;
          </p>
          <p className="max-w-[900px] text-[17px] leading-[1.6] text-ink-600 md:text-[18px]">
            We are constantly looking for engineers, designers, and operational visionaries who
            believe technology should serve real, physical business workflows.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/careers">View Open Positions</Button>
          <Button variant="secondary" href="/contact">
            Contact Our Team
          </Button>
        </div>
      </Container>
    </section>
  );
}
