import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";

// Figma HeroSection (node 1:2695): surface-150 band, centered badge + title + subtitle.
export default function HeroSection() {
  return (
    <section className="bg-surface-150 pb-[40px] pt-[100px]">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="rounded-pill bg-tint-blue px-3 py-1.5 font-geist text-[11px] font-bold uppercase text-brand">
          Insights &amp; Resources
        </span>
        <WordReveal as="h1" className="max-w-[1000px] font-geist text-[36px] font-extrabold leading-[1.1] tracking-[-0.9px] text-ink sm:text-[60px] sm:leading-[72px]">
          Trikaan{" "}
          <span className="font-heading text-brand">Engineering &amp; Operations</span>{" "}
          Blog
        </WordReveal>
        <LineReveal as="p" className="max-w-[720px] font-geist text-[18px] leading-[30px] text-ink-600">
          Deep technical dives, architecture breakdowns, and product insights from the team
          building the digital operating systems of physical commerce.
        </LineReveal>
      </Container>

      {/* exact Figma curve (Vector 60) into the next section */}
      <svg aria-hidden viewBox="0 0 1440 151" preserveAspectRatio="none" className="mt-10 block h-[70px] w-full sm:h-[110px] lg:h-[151px]">
        <defs>
          <linearGradient id="blog-hero-curve" x1="720" y1="0" x2="720" y2="151" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F9FAFB" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <path
          d="M636.384 26.3391C388.637 -3.5043 127.207 -6.11539 0 9.14499V151H1440V9.14499C1220.38 34.6288 921.78 60.7177 636.384 26.3391Z"
          fill="url(#blog-hero-curve)"
        />
      </svg>
    </section>
  );
}
