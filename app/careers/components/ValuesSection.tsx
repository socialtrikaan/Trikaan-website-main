import { Zap, Activity, TrendingUp, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import SectionHeader from "./SectionHeader";

const VALUES = [
  {
    Icon: Zap,
    title: "Constant Innovation",
    body: "We do not build generic templates. We study real industrial workflows and construct elegant software architectures designed for complex operations.",
  },
  {
    Icon: Activity,
    title: "Real-World Impact",
    body: "Every system we build directly optimizes warehouse, logistic, and procurement operations. We measure success in uptime, efficiency, and human convenience.",
  },
  {
    Icon: TrendingUp,
    title: "Personal Growth",
    body: "We are committed to continuous mentorship, code excellence, and constructive feedback. Your capabilities expand inline with the scale of our systems.",
  },
  {
    Icon: Users,
    title: "Radical Collaboration",
    body: "We collaborate across design, engineering, and factory floor reality. No technical silos; everyone understands the business problems we resolve.",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-surface-150">
      <Container className="flex flex-col items-center gap-16 py-20 md:py-30">
        <SectionHeader
          eyebrow="Our Core Values"
          title={
            <>
              The principles that guide how we{" "}
              <span className="font-heading text-brand">build.</span>
            </>
          }
          subtitle="We build tools that solve complex, real-world problems. We value deep problem understanding over surface-level complexity."
        />
        <Stagger className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ Icon, title, body }) => (
            <StaggerItem
              key={title}
              className="flex h-full flex-col items-start gap-5 rounded-card border border-border bg-white p-8 shadow-[0px_12px_16px_rgba(27,58,92,0.04)] transition-all duration-200 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-card"
            >
              <div className="flex size-12 items-center justify-center rounded-[24px] bg-tint-blue">
                <Icon className="size-5 text-brand" />
              </div>
              <h3 className="text-[20px] font-bold text-ink">{title}</h3>
              <p className="text-[15px] leading-[24px] text-ink-600">{body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
