import type { Metadata } from "next";
import StructuredData from "../components/StructuredData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { breadcrumbJsonLd, createMetadata } from "../seo";
import HeroHeader from "./components/HeroHeader";
import TermsContent from "./components/TermsContent";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description:
    "The Terms and Conditions governing your use of Trikaan's enterprise logistics, purchase, and manufacturing software platforms.",
  path: "/terms",
  keywords: [
    "Trikaan terms of service", "terms of service", "software terms and conditions", "terms and conditions",
    "SaaS agreement", "SaaS terms", "terms of use", "service agreement", "software license terms",
    "software license agreement", "user agreement", "end user license agreement", "EULA",
    "subscription terms", "usage terms", "acceptable use policy", "service level agreement", "SLA",
    "master service agreement", "MSA", "software contract", "platform terms", "enterprise software terms",
    "API terms of use", "billing terms", "payment terms", "cancellation policy", "refund policy",
    "liability terms", "warranty terms", "intellectual property terms", "data ownership terms",
    "termination clause", "governing law", "dispute resolution", "legal terms software",
    "conditions of use", "customer agreement", "vendor agreement", "software usage agreement",
    "Trikaan legal", "Trikaan terms", "Anvaya terms", "manufacturing software terms",
    "logistics software terms", "enterprise agreement", "commercial terms", "compliance terms",
    "terms India software", "software agreement India",
  ],
});

export default function TermsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <AnimatedSection variant="fadeDown"><HeroHeader /></AnimatedSection>
      <AnimatedSection variant="fadeUp"><TermsContent /></AnimatedSection>
    </>
  );
}
