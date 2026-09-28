import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";
import Button from "@/components/ui/Button";

export default function CtaBanner() {
  return (
    <section className="border-y border-border bg-white">
      <Container className="flex flex-col items-center gap-6 py-20 text-center">
        <p className="text-[13px] font-bold uppercase text-ink-600">
          Ready to see Anvaya in action?
        </p>
        <WordReveal as="h2" className="text-[28px] font-extrabold text-ink md:text-[32px]">
          Experience the e-commerce feel in industrial buying.
        </WordReveal>
        <Button href="#inquiry" className="font-sans font-semibold">
          Book a Demo
        </Button>
      </Container>
    </section>
  );
}
