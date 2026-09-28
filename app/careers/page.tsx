import type { Metadata } from "next";
import StructuredData from "../components/StructuredData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { breadcrumbJsonLd, createMetadata } from "../seo";
import HeroSection from "./components/HeroSection";
import ValuesSection from "./components/ValuesSection";
import LifeAtTrikaan from "./components/LifeAtTrikaan";
import Benefits from "./components/Benefits";
import ApplicationProcess from "./components/ApplicationProcess";
import FinalCTA from "./components/FinalCTA";

export const metadata: Metadata = createMetadata({
  title: "Careers",
  description:
    "Join the team building the future of enterprise tech. Explore open roles, benefits, and life at Trikaan , a product studio for businesses that move physical goods.",
  path: "/careers",
  keywords: [
    "Trikaan careers", "Trikaan jobs", "Trikaan hiring", "software jobs Bengaluru", "software jobs Bangalore",
    "engineering jobs", "product design jobs", "software developer jobs India", "frontend developer jobs",
    "backend developer jobs", "full stack developer jobs", "SaaS company jobs", "tech jobs Bengaluru",
    "remote software jobs", "React developer jobs", "Next.js developer jobs", "TypeScript jobs",
    "Node.js developer jobs", "UI UX designer jobs", "product manager jobs", "QA engineer jobs",
    "DevOps engineer jobs", "cloud engineer jobs", "AI engineer jobs", "machine learning jobs",
    "data engineer jobs", "startup jobs India", "tech startup jobs", "software internship",
    "engineering internship", "graduate software jobs", "entry level developer jobs", "senior developer jobs",
    "lead engineer jobs", "software architect jobs", "IT jobs Bengaluru", "developer careers India",
    "join Trikaan", "work at Trikaan", "life at Trikaan", "software company hiring", "manufacturing tech jobs",
    "B2B SaaS jobs", "product engineering jobs", "hybrid work software jobs", "software jobs Karnataka",
    "developer openings", "current openings Trikaan", "apply software jobs", "tech careers India",
  ],
});

export default function CareersPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <HeroSection />
      <AnimatedSection variant="fadeUp">
        <ValuesSection />
      </AnimatedSection>
      <AnimatedSection variant="fadeIn">
        <LifeAtTrikaan />
      </AnimatedSection>
      <AnimatedSection variant="scaleIn">
        <Benefits />
      </AnimatedSection>
      <AnimatedSection variant="fadeUp">
        <ApplicationProcess />
      </AnimatedSection>
      <AnimatedSection variant="zoomIn">
        <FinalCTA />
      </AnimatedSection>
    </>
  );
}
