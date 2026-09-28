import type { Metadata } from "next";
import StructuredData from "../components/StructuredData";
import { breadcrumbJsonLd, createMetadata } from "../seo";
import { getAllPosts } from "@/lib/blog";
import AnimatedSection from "@/components/ui/AnimatedSection";
import HeroSection from "./components/HeroSection";
import FeaturedSection from "./components/FeaturedSection";
import FilterBar from "./components/FilterBar";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Deep technical dives, architecture breakdowns, and product insights from the team building the digital operating systems of physical commerce.",
  path: "/blog",
  keywords: [
    "Trikaan blog", "engineering blog", "product insights", "logistics software", "manufacturing technology blog",
    "SaaS engineering articles", "software architecture blog", "AI in manufacturing", "digital transformation blog",
    "enterprise software insights", "tech blog India", "software development blog", "product management blog",
    "startup engineering blog", "cloud computing articles", "DevOps articles", "system design blog",
    "software best practices", "coding tutorials", "web development articles", "scalability articles",
    "microservices blog", "API design articles", "database articles", "machine learning articles",
    "data engineering blog", "manufacturing 4.0 blog", "industrial automation articles", "ERP insights",
    "supply chain technology", "operations technology blog", "smart factory articles", "IoT articles",
    "enterprise architecture blog", "product design articles", "UX articles", "frontend articles",
    "backend articles", "TypeScript articles", "React articles", "Next.js articles",
    "software engineering insights", "technology trends", "digital product blog", "SaaS growth",
    "B2B software blog", "case studies software", "Trikaan articles", "Trikaan insights", "Trikaan news",
  ],
});

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <HeroSection />
      <AnimatedSection variant="scaleIn"><FeaturedSection post={featured} /></AnimatedSection>
      <AnimatedSection variant="fadeUp"><FilterBar posts={rest} /></AnimatedSection>
    </>
  );
}
