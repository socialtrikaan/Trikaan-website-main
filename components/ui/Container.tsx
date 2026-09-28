import { cn } from "@/lib/utils";

/**
 * Page container. Figma content frame = 1440px wide with 80px side gutters.
 * Gutters scale down on smaller viewports; max width stays at the Figma canvas.
 */
export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-20",
        className
      )}
    >
      {children}
    </div>
  );
}
