"use client";

import { usePathname } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import Footer from "@/components/layout/Footer";

// Footer lives in the persistent layout, so its once-only entrance would only ever play on
// the first page. Keying by pathname remounts it per route → the reveal replays everywhere.
export default function AnimatedFooter() {
  const pathname = usePathname();
  return (
    <Reveal key={pathname}>
      <Footer />
    </Reveal>
  );
}
