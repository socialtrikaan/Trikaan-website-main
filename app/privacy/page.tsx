import type { Metadata } from "next";
import StructuredData from "../components/StructuredData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { breadcrumbJsonLd, createMetadata } from "../seo";
import HeroHeader from "./components/HeroHeader";
import PolicyContent from "./components/PolicyContent";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "How Trikaan collects, uses, shares, secures, and safeguards your corporate and personal information across our SaaS platforms and consulting workflows.",
  path: "/privacy",
  keywords: [
    "Trikaan privacy policy", "privacy policy", "data protection", "data security", "SOC 2 compliance",
    "SOC 2", "GDPR", "GDPR compliance", "personal data policy", "information security", "data privacy",
    "data handling policy", "user data protection", "customer data security", "data processing policy",
    "data retention policy", "cookie policy", "data collection policy", "privacy statement",
    "data confidentiality", "enterprise data security", "cloud data protection", "encryption at rest",
    "encryption in transit", "data breach policy", "sub-processors", "data sharing policy",
    "personal information protection", "PII protection", "compliance policy", "security compliance",
    "data governance", "privacy rights", "user privacy", "data subject rights", "opt out policy",
    "data storage policy", "Indian data servers", "data localization", "audit trail privacy",
    "corporate data privacy", "SaaS data privacy", "platform privacy", "Trikaan data policy",
    "legal privacy", "privacy compliance India", "DPDP compliance", "data safeguards",
    "secure software policy", "Trikaan security",
  ],
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <AnimatedSection variant="fadeDown"><HeroHeader /></AnimatedSection>
      <AnimatedSection variant="fadeUp"><PolicyContent /></AnimatedSection>
    </>
  );
}
