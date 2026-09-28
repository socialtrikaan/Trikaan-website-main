import { ShieldCheck, Activity, BookOpen, TrendingUp, Users, Smile } from "lucide-react";
import Container from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import SectionHeader from "./SectionHeader";

const BENEFITS = [
  { Icon: ShieldCheck, title: "Comprehensive Health Insurance", body: "Premium medical cover for you, your dependents, and parents, with zero hassle claims." },
  { Icon: Activity, title: "Flexible Working Hours", body: "Design your workday around your family's needs and natural peak productivity hours." },
  { Icon: BookOpen, title: "Annual Learning Budget", body: "Generous stipend for courses, technical books, certificates, and international conferences." },
  { Icon: TrendingUp, title: "ESOP / Stock Options", body: "Participate directly in our corporate growth through equity grants at early stage valuations." },
  { Icon: Users, title: "Annual Team Offsites", body: "We take a break twice a year to travel, hike, play sports, and align on future product visions." },
  { Icon: Smile, title: "Wellness Programs", body: "Free gym memberships, mental health counseling support, and physical wellness allowances." },
];

export default function Benefits() {
  return (
    <section className="bg-white">
      <Container className="flex flex-col items-center gap-14 py-20 md:py-30">
        <SectionHeader
          eyebrow="Benefits & Perks"
          title={
            <>
              Everything to support your physical and mental{" "}
              <span className="font-heading text-brand">wellness.</span>
            </>
          }
          subtitle="We ensure you have the resources, coverage, and flexibility to do your absolute best work."
        />
        <Stagger className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ Icon, title, body }) => (
            <StaggerItem
              key={title}
              className="flex h-full flex-col gap-3 rounded-input bg-surface-150 p-6 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-card"
            >
              <div className="flex size-9 items-center justify-center rounded-[18px] bg-white">
                <Icon className="size-[18px] text-brand" />
              </div>
              <h3 className="text-[16px] font-bold text-ink">{title}</h3>
              <p className="text-[14px] leading-[22px] text-ink-600">{body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
