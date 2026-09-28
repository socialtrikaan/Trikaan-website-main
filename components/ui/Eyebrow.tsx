import { cn } from "@/lib/utils";

/** Small uppercase section label. Figma: Inter Bold 14, uppercase, brand color. */
export default function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-[14px] font-bold uppercase text-brand", className)}>
      {children}
    </p>
  );
}
