import Link from "next/link";
import WordReveal from "@/components/ui/WordReveal";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

export default function FinalCTA() {
  return (
    <section className="bg-white">
      <Container className="flex flex-col items-center gap-10 py-20 md:py-30">
        <div className="flex flex-col items-center gap-5 text-center">
          <WordReveal as="h2" className="max-w-[1066px] text-[32px] font-bold leading-[1.2] text-black md:text-[44px] md:leading-[54px]">
            Ready to build technology that{" "}
            <span className="font-heading text-brand">moves industries?</span>
          </WordReveal>
          <p className="max-w-[640px] text-[17px] leading-[28px] text-ink-600">
            Even if your perfect role isn&apos;t listed, we are always on the
            lookup for great engineers, designers, and operators. Reach out to
            us.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-[26px] bg-brand px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-bright"
          >
            Get in Touch
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center rounded-[26px] border-[1.5px] border-black px-7 py-3.5 text-[15px] font-semibold text-black transition-colors hover:bg-black hover:text-white"
          >
            Send Speculative Application
          </Link>
        </div>
      </Container>
    </section>
  );
}
