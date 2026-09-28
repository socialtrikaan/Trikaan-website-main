import { cn } from "@/lib/utils";

// Figma journey card. White, 2.5px brand-bright accent border (left or right),
// radius 6, milestone shadow. Positioned absolutely along the journey map.
export default function MilestoneCard({
  year,
  title,
  desc,
  side,
  className,
  style,
}: {
  year: string;
  title: string;
  desc: string;
  side: "left" | "right";
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "flex flex-col gap-0.5 overflow-hidden rounded-[6px] bg-white px-2.5 py-2 shadow-milestone",
        side === "left"
          ? "border-l-[2.5px] border-brand-bright"
          : "border-r-[2.5px] border-brand-bright",
        className
      )}
    >
      <p className="font-heading text-[10px] text-brand-electric">{year}</p>
      <p className="font-heading text-[11px] text-ink">{title}</p>
      <p className="w-[135px] text-[9px] leading-[1.4] text-muted-5">{desc}</p>
    </div>
  );
}
