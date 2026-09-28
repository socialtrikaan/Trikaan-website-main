import type { Metadata } from "next";
import StructuredData from "./components/StructuredData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { breadcrumbJsonLd, createMetadata } from "./seo";
import Hero from "./components/home/Hero";
import IntroStatement from "./components/home/IntroStatement";
import ProblemSolution from "./components/home/ProblemSolution";
import SilentCofounder from "./components/home/SilentCofounder";
import HowItGoes from "./components/home/HowItGoes";
import TrikaanWay from "./components/home/TrikaanWay";
import ApproachTimeline from "./components/home/ApproachTimeline";
import PlatformOrbit from "./components/home/PlatformOrbit";
import Faq from "./components/home/Faq";
import GetInTouch from "./components/home/GetInTouch";

export const metadata: Metadata = createMetadata({
  title: "Building Intelligent Technology for Every Industry",
  description:
    "Trikaan builds intelligent software, SaaS platforms, and digital products that power the next generation of businesses , unified in the Anvaya platform.",
  path: "/",
  keywords: [
    "scalable digital platforms", "industrial software", "Anvaya platform", "intelligent business platforms",
    "operations software", "unified business platform", "smart manufacturing software", "technology partner for business",
    "software that adapts to business", "business operating system", "connected operations platform",
    "end to end business platform", "enterprise operations software", "factory operations software",
    "production operations software", "supply chain software", "logistics software", "inventory software",
    "procurement software", "warehouse management software", "quality management software",
    "maintenance management software", "asset management software", "manufacturing execution system",
    "MES software", "ERP software", "ERP alternative", "modular ERP", "next generation ERP",
    "AI for manufacturing", "AI operations", "data driven operations", "real time operations",
    "operational intelligence", "process digitization", "paperless factory", "shop floor digitization",
    "digital factory", "connected factory", "smart factory platform", "industrial IoT software",
    "business automation platform", "no code workflow", "custom enterprise platform",
    "software for manufacturers", "software for factories", "software for industry", "Trikaan home",
    "Trikaan platform",
  ],
});

export default function Home() {
  return (
    <>
      <StructuredData data={breadcrumbJsonLd([{ name: "Home", path: "/" }])} />
      <Hero />
      <IntroStatement />
      <AnimatedSection variant="scaleIn">
        <ProblemSolution />
      </AnimatedSection>
      <AnimatedSection variant="fadeUp">
        <SilentCofounder />
      </AnimatedSection>
      <AnimatedSection variant="fadeIn">
        <HowItGoes />
      </AnimatedSection>
      <AnimatedSection variant="fadeUp">
        <PlatformOrbit />
      </AnimatedSection>
      <TrikaanWay />
      <AnimatedSection variant="fadeUp">
        <ApproachTimeline />
      </AnimatedSection>
      <AnimatedSection variant="scaleIn">
        <Faq />
      </AnimatedSection>
      <AnimatedSection variant="fadeUp">
        <GetInTouch />
      </AnimatedSection>

      {/* Anvaya support chat widget (external integration) */}
      <script
        src="https://www.theanvaya.in/widget/v1.js"
        data-anvaya-key="pk_live_c76df2b77ce901379380b6ff94c79f9e"
        async
      />
      <div
        id="anvaya-support"
        data-title="Chat with us"
        data-color="#004e79"
        data-position="right"
      />
    </>
  );
}
