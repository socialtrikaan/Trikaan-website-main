import { Phone, Calendar, HelpCircle, MapPin, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

const METHODS = [
  { Icon: Phone, title: "Talk to Sales", body: "Interested in a product walkthrough or custom enterprise plan? Talk directly to our technical experts.", cta: "+91 90362 22022" },
  { Icon: Calendar, title: "Book a Demo", body: "Schedule a 30-minute interactive operational run-through tailored exactly to your plant layout.", cta: "View Calendar" },
  { Icon: HelpCircle, title: "Get Support", body: "Already running Trikaan? Raise an ticket, check status, or call our 24/7 priority support line.", cta: "Open Support Center" },
  { Icon: MapPin, title: "Visit Our Hub", body: "Come see our main innovation and testing facility based in Bengaluru. Coffee is on us.", cta: "Get Directions" },
];

export default function ContactMethods() {
  return (
    <section className="bg-white">
      <Container className="pb-[60px] pt-[24px]">
        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {METHODS.map(({ Icon, title, body, cta }) => (
            <StaggerItem
              key={title}
              className="flex h-full flex-col gap-4 rounded-card border border-[rgba(2,45,168,0.3)] bg-surface-blue-2 p-8 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-card"
            >
              <span className="flex size-11 items-center justify-center rounded-[8px] border border-[rgba(2,45,168,0.3)] bg-white text-brand">
                <Icon size={20} />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] font-bold text-ink">{title}</h3>
                <p className="text-[14px] leading-[1.5] text-ink-600">{body}</p>
              </div>
              <div className="mt-auto flex items-center gap-1 text-[14px] font-semibold text-ink">
                {cta}
                <ArrowRight size={14} />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
