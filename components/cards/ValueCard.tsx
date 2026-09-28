import Tilt from "@/components/ui/Tilt";

// Figma "Core Values" card (about us / careers). White, ink border, radius 16, p-40.
export default function ValueCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <Tilt className="flex h-full flex-1 flex-col gap-5 rounded-card border border-border bg-white p-10 transition-colors duration-200 hover:border-brand/30">
      <p className="font-heading text-[40px] leading-none text-brand">{number}</p>
      <h3 className="text-[22px] font-bold text-ink md:text-[24px]">{title}</h3>
      <p className="text-[15px] leading-[1.7] text-ink-600">{body}</p>
    </Tilt>
  );
}
