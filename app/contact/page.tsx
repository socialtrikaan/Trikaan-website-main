import type { Metadata } from "next";
import StructuredData from "../components/StructuredData";
import { breadcrumbJsonLd, createMetadata } from "../seo";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingParticles from "@/components/ui/FloatingParticles";
import HeroSection from "./components/HeroSection";
import ContactMethods from "./components/ContactMethods";
import InquiryForm from "./components/InquiryForm";
import ContactSidebar from "./components/ContactSidebar";
// import MapSection from "./components/MapSection"; // hidden for now , keep for restore
import CtaBanner from "./components/CtaBanner";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Trikaan to discuss deployment timelines, system customizations, and pricing , or book a demo of the Anvaya platform.",
  path: "/contact",
  keywords: [
    "contact Trikaan", "Trikaan contact", "Trikaan email", "Trikaan phone", "Trikaan address",
    "software consultation", "book a demo", "request a demo", "schedule a demo", "free demo",
    "enterprise software quote", "software development quote", "get a quote software", "Trikaan Bengaluru address",
    "Trikaan Bangalore", "get in touch Trikaan", "software development enquiry", "contact software company",
    "talk to sales", "sales enquiry software", "project enquiry", "software project consultation",
    "hire software company", "connect with Trikaan", "reach Trikaan", "Trikaan support",
    "customer support software", "software demo request", "Anvaya demo", "book Anvaya demo",
    "manufacturing software demo", "ERP demo request", "consultation call", "discovery call",
    "software company contact India", "contact enterprise software company", "Trikaan office",
    "Trikaan Doddagubbi", "Hennur Road software company", "software vendor contact", "request pricing",
    "software pricing enquiry", "partnership enquiry", "business enquiry software", "Trikaan get in touch",
    "contact us software", "software company Bengaluru contact", "message Trikaan", "enquire now",
  ],
});

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <HeroSection />
      <AnimatedSection variant="fadeUp">
        <ContactMethods />
      </AnimatedSection>
      <AnimatedSection variant="fadeUp" amount={0} className="block">
        <section id="inquiry" className="relative overflow-hidden bg-white">
          <FloatingParticles />
          <Container className="relative z-10 flex flex-col gap-[60px] pb-[100px] pt-[40px] lg:flex-row">
            <InquiryForm />
            <ContactSidebar />
          </Container>
        </section>
      </AnimatedSection>
      {/* Map hidden for now , keep code, restore when needed */}
      {/* <AnimatedSection variant="fadeIn"><MapSection /></AnimatedSection> */}
      <AnimatedSection variant="zoomIn">
        <CtaBanner />
      </AnimatedSection>
    </>
  );
}
