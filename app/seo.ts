import type { Metadata } from "next";

export const siteConfig = {
  name: "Trikaan",
  legalName: "Trikaan Solutions Private Limited",
  url: "https://trikaan.com",
  description:
    "Trikaan is a product development studio building scalable SaaS, enterprise platforms, and AI-driven digital products for modern businesses.",
  tagline:
    "We design, build, and scale SaaS platforms, enterprise systems, and AI-powered digital products for ambitious teams.",
  locale: "en_US",
  email: "info@trikaan.com",
  phone: "+91 9036222022",
  street: "657/23, 13 Cross, Asha Township, Doddagubbi, Hennur Road",
  city: "Bengaluru",
  region: "Karnataka",
  postalCode: "560077",
  country: "IN",
  logo: "/logo.png",
  socialLinks: [
    "https://www.linkedin.com/company/trikaan-solutions-private-limited/",
  ],
  keywords: [
    "Trikaan", "Trikaan Solutions", "Trikaan Solutions Private Limited", "Trikaan product studio",
    "Trikaan software", "Trikaan technology", "Anvaya", "Anvaya platform", "Anvaya Trikaan",
    "product development studio", "product development company", "SaaS development company",
    "SaaS product development", "SaaS platform development", "enterprise software development",
    "enterprise software company", "enterprise software solutions", "enterprise application development",
    "AI product development", "AI software development", "AI software company", "artificial intelligence software",
    "machine learning solutions", "custom software development", "custom software company",
    "bespoke software development", "digital transformation services", "digital transformation company",
    "manufacturing software", "manufacturing ERP", "manufacturing software company", "smart manufacturing",
    "industry 4.0 software", "industrial software solutions", "industrial automation software",
    "workflow automation software", "business process automation", "process automation solutions",
    "cloud software development", "cloud application development", "cloud native software",
    "product engineering services", "software product engineering", "software consulting",
    "software development company", "software company Bengaluru", "software company Bangalore",
    "software company India", "top software company India", "B2B software company",
    "technology partner", "operations software", "business platform",
  ],
  quickLinks: [
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: MetadataOptions): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/twitter-image")],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl("/opengraph-image"),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.street,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.country,
    },
    sameAs: siteConfig.socialLinks,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.tagline,
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.logo),
      },
    },
  };
}

export function navigationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: siteConfig.quickLinks.map((link, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: link.name,
      url: absoluteUrl(link.path),
    })),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
