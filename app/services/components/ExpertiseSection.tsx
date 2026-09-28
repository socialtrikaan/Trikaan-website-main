import { Settings, Cloud, Cpu, ShieldCheck, Share2, BarChart2 } from "lucide-react";
import WordReveal from "@/components/ui/WordReveal";
import Container from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

const items = [
  {
    Icon: Settings,
    title: "Manufacturing ERP & Operations",
    desc: "Inventory, production schedules, yard tracking, and weighbridge connections modeled to map the real physical flow.",
  },
  {
    Icon: Cloud,
    title: "Multi-Tenant SaaS Architecture",
    desc: "High-security database tenant-isolation schemas, enterprise Single Sign-On, and subscription-tier billing.",
  },
  {
    Icon: Cpu,
    title: "AI-Powered Products",
    desc: "Integrating Large Language Models and prediction pipelines directly into production workflows.",
  },
  {
    Icon: ShieldCheck,
    title: "Compliance & Finance",
    desc: "Automated statutory reporting, tax calculation engines, and precise financial audit records.",
  },
  {
    Icon: Share2,
    title: "Legacy Migration",
    desc: "Extracting business logic from closed legacy databases and bridging them with modern modern platforms.",
  },
  {
    Icon: BarChart2,
    title: "Distributed Systems & Scale",
    desc: "Ensuring zero-downtime, continuous data pipelines, and database replication for heavy enterprise use.",
  },
];

export default function ExpertiseSection() {
  return (
    <section className="w-full bg-surface-150 py-[100px]">
      <Container className="flex flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-4">
          <p className="font-geist text-[13px] font-semibold uppercase text-brand">Specialization</p>
          <WordReveal as="h2" className="text-center font-geist text-[32px] font-bold leading-[1.2] text-ink sm:text-[44px] sm:leading-[56px]">
            Depth Where It <span className="font-heading text-brand">Counts.</span>
          </WordReveal>
          <p className="w-full max-w-[720px] text-center text-[16px] leading-[26px] text-ink-600">
            Behind every Trikaan project is decades of building large-scale, real-world systems.
          </p>
        </div>
        <Stagger className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {items.map(({ Icon, title, desc }) => (
            <StaggerItem
              key={title}
              className="flex h-full flex-col items-start gap-4 rounded-card border border-border bg-white p-8 transition-all duration-200 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-card"
            >
              <span className="flex size-10 items-center justify-center rounded-[8px] bg-tint-blue">
                <Icon className="size-5 text-brand" />
              </span>
              <h3 className="text-[18px] font-bold text-ink">{title}</h3>
              <p className="text-[14px] leading-[22px] text-ink-600">{desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
