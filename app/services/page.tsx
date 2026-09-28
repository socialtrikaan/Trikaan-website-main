import StructuredData from "../components/StructuredData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { breadcrumbJsonLd, createMetadata } from "../seo";
import HeroSection from "./components/HeroSection";
import PillarsSection from "./components/PillarsSection";
import ExpertiseSection from "./components/ExpertiseSection";
import ProcessSection from "./components/ProcessSection";
import EngagementSection from "./components/EngagementSection";
import ClosingCTASection from "./components/ClosingCTASection";

export const metadata = createMetadata({
  title: "Services",
  description:
    "From SaaS product development to enterprise solutions, product strategy, and digital transformation - Trikaan diagnoses the problem, builds the product, and owns the outcome.",
  path: "/services",
  keywords: [
    "SaaS development services", "enterprise software company", "custom product engineering", "digital transformation",
    "product strategy consulting", "MVP development", "software development services", "cloud application development",
    "AI integration services", "system integration services", "API development", "UX UI design services",
    "web application development", "mobile app development", "full stack development", "frontend development services",
    "backend development services", "database design services", "DevOps services", "cloud migration services",
    "software modernization", "legacy system migration", "software re-engineering", "software architecture consulting",
    "technical consulting", "CTO as a service", "dedicated development team", "staff augmentation",
    "offshore software development", "software outsourcing", "product design services", "UI design agency",
    "UX research", "design system development", "AI consulting", "machine learning development",
    "data engineering services", "analytics dashboard development", "ERP development", "CRM development",
    "SaaS MVP", "startup software development", "enterprise app modernization", "microservices development",
    "cloud infrastructure setup", "scalable software architecture", "software maintenance services",
    "QA and testing services", "automation testing", "Trikaan services",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <HeroSection />
      <PillarsSection />
      <AnimatedSection variant="fadeUp"><ExpertiseSection /></AnimatedSection>
      <AnimatedSection variant="fadeIn"><ProcessSection /></AnimatedSection>
      <AnimatedSection variant="scaleIn"><EngagementSection /></AnimatedSection>
      <AnimatedSection variant="zoomIn"><ClosingCTASection /></AnimatedSection>
    </>
  );
}
