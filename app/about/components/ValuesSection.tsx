import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import ValueCard from "@/components/cards/ValueCard";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

// Figma node 234:276 , "Core Values" 2×2 grid.
const VALUES = [
  {
    number: "01",
    title: "Businesses Should Never Bend to Software.",
    body: "For decades, businesses have changed their operations to match software limitations. We believe software should continuously adapt to the business,not the other way around. That belief is the foundation of everything we build.",
  },
  {
    number: "02",
    title: "An Industry Is One Living System.",
    body: "Production doesn't work without procurement. Warehouse doesn't work without logistics. Quality doesn't work without production. Finance doesn't work without operations. We don't build isolated applications. We build systems that understand how every decision affects the next.",
  },
  {
    number: "03",
    title: "Technology Should Think, Not Just Record.",
    body: "Software shouldn't exist just to store transactions. It should explain delays. Predict risks. Reveal hidden costs. Recommend better decisions. We believe intelligence begins where reporting ends.",
  },
  {
    number: "04",
    title: "We Measure Success on the Shop Floor.",
    body: "Dashboards don't create value. Better production does. Fewer delays do. Lower waste does. Faster decisions do. If it doesn't improve how the business operates, it isn't finished.",
  },
];

export default function ValuesSection() {
  return (
    <section id="values" className="bg-white">
      <Container className="flex flex-col items-center gap-16 py-20 md:py-28">
        <div className="flex w-full max-w-[1074px] flex-col items-center gap-4 text-center">
          <Eyebrow>Core Values</Eyebrow>
          <WordReveal
            as="h2"
            className="text-[32px] font-bold leading-[1.2] text-ink md:text-[48px]"
          >
            The Principles That Drive Everything We Build
          </WordReveal>
        </div>
        <Stagger className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {VALUES.map((v) => (
            <StaggerItem key={v.number}>
              <ValueCard {...v} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
