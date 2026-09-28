import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";

export default function HeroSection() {
  return (
    <section className="bg-surface-blue-2">
      <Container className="flex flex-col items-center gap-8 pb-[48px] pt-[80px] text-center md:pb-[56px] md:pt-[110px]">
        <p className="text-[13px] font-bold uppercase text-ink-600">
          Connect With Our Teams
        </p>
        <WordReveal as="h1" className="max-w-[918px] text-[40px] font-bold leading-[1.1] text-ink md:text-[56px]">
          Let&apos;s bring{" "}
          <span className="font-heading font-normal text-brand">your Idea</span>{" "}
          into Action.
        </WordReveal>
        <LineReveal as="p" className="max-w-[720px] text-[18px] leading-[1.6] text-ink-600">
          Have questions about deployment timelines, system customizations, or
          pricing tiers? Drop us a line. We are here to keep your production
          moving.
        </LineReveal>
      </Container>

      {/* exact Figma curve (Vector 60) into the next section */}
      <svg aria-hidden viewBox="0 0 1440 151" preserveAspectRatio="none" className="block h-[70px] w-full sm:h-[110px] lg:h-[151px]">
        <defs>
          <linearGradient id="contact-hero-curve" x1="720" y1="0" x2="720" y2="151" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F9FAFB" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <path
          d="M636.384 26.3391C388.637 -3.5043 127.207 -6.11539 0 9.14499V151H1440V9.14499C1220.38 34.6288 921.78 60.7177 636.384 26.3391Z"
          fill="url(#contact-hero-curve)"
        />
      </svg>
    </section>
  );
}
