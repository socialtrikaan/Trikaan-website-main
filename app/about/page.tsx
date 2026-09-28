import type { Metadata } from "next";
import Image from "next/image";
import StructuredData from "../components/StructuredData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { breadcrumbJsonLd, createMetadata } from "../seo";
import HeroSection from "./components/HeroSection";
import VisionFounder from "./components/VisionFounder";
import OriginStorySection from "./components/OriginStorySection";
import JourneySection from "./components/JourneySection";
import ValuesSection from "./components/ValuesSection";
import LeadershipSection from "./components/LeadershipSection";
import CtaSection from "./components/CtaSection";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Trikaan builds intelligent technology modeled on operational truth , unifying boots-on-the-ground reality with clean, autonomous enterprise software.",
  path: "/about",
  keywords: [
    "about Trikaan", "Trikaan founders", "Trikaan founder", "Trikaan leadership team", "Trikaan team",
    "Trikaan management", "product studio team", "software company culture", "enterprise software company story",
    "manufacturing technology company", "why Trikaan", "company mission vision", "company values",
    "our story", "Trikaan vision", "Trikaan mission", "Charan Basireddy", "Trikaan CEO",
    "software company founders India", "startup story", "manufacturing software startup",
    "enterprise software startup", "Bengaluru startup", "Bangalore software startup",
    "technology company India", "about our company", "meet the team", "leadership team software",
    "company overview", "who we are", "what we do", "our approach", "our philosophy",
    "engineering culture", "software craftsmanship", "customer first company",
    "problem solving company", "innovation company", "deep tech company", "B2B SaaS founders",
    "industrial technology company", "Trikaan history", "Trikaan story", "company background",
    "software consultancy team", "product engineering team", "founding team", "advisory board",
    "company leadership", "Trikaan about us",
  ],
});

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <HeroSection />
      <AnimatedSection variant="fadeUp">
        <VisionFounder />
      </AnimatedSection>
      <AnimatedSection variant="fadeUp">
        <OriginStorySection />
      </AnimatedSection>
      <AnimatedSection variant="fadeUp">
        <ValuesSection />
      </AnimatedSection>
      <Image
        src="/images/about-divider.svg"
        alt=""
        aria-hidden
        width={1440}
        height={162}
        className="h-auto w-full"
      />
      <AnimatedSection variant="scaleIn">
        <JourneySection />
      </AnimatedSection>
      <LeadershipSection />
      <AnimatedSection variant="zoomIn">
        <CtaSection />
      </AnimatedSection>
    </>
  );
}
