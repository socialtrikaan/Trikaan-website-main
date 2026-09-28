import WordReveal from "@/components/ui/WordReveal";

// Shared header for careers sections: muted eyebrow + 44px title (with brand
// highlight span passed in as children) + 720px subtitle. Used by 5 sections.
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: string;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      {eyebrow && <p className="text-[13px] font-semibold uppercase text-muted">{eyebrow}</p>}
      <WordReveal as="h2" className="text-[32px] font-bold leading-[1.18] text-ink md:text-[44px] md:leading-[52px]">
        {title}
      </WordReveal>
      <p className="max-w-[720px] text-[17px] leading-[28px] text-ink-600">
        {subtitle}
      </p>
    </div>
  );
}
