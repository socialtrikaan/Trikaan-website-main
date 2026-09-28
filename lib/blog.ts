// Blog content model. Titles, excerpts, categories, dates and authors are the
// exact strings shown in the Figma blog-listing design (node 1:2633). The single
// Figma article (node 1:2940) supplies the body , the representative post below
// carries it, and the other listing posts reuse the same `content`/bio (only their
// listing metadata differs). Cover photos were downloaded from the Figma assets.

export type Author = { name: string; role: string; bio: string };

export type ContentBlock =
  | { type: "lead"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; cite: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; image: string; caption: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  author: Author;
  coverImage: string;
  content: ContentBlock[];
};

// James Okafor's bio + the article body from the Figma article. Reused across posts.
const jamesBio =
  "James is passionate about developer experience, reproducible environments, and building hyper-scalable delivery systems for enterprise operational environments.";

const articleBody: ContentBlock[] = [
  {
    type: "lead",
    text: "At Trikaan, our software coordinates physical systems where downtime is measured in operational losses and delays. In modern logistics, a delay in deployment can cascade down to delayed dock arrivals and warehouse bottlenecks. Over the last quarter, we audited our internal engineering cycles and overhauled our pipeline to trim cold start latency and establish continuous integration loops.",
  },
  { type: "heading", text: "1. Unpacking the Bottlenecks: Our Legacy Setup" },
  {
    type: "paragraph",
    text: "Our legacy deployment process was constrained by centralized monolithic checks. Each merge triggered sequential, heavy-weight end-to-end tests that ran on monolithic runner nodes. A single syntax check or styling format validation cost teams upwards of 35 minutes of feedback time.",
  },
  {
    type: "heading",
    text: "2. The Migration to Ephemeral Preview Environments",
  },
  {
    type: "paragraph",
    text: "We transitioned our infrastructure to isolate pull requests onto stateless, ephemeral preview preview nodes. Rather than scheduling shared staging servers, each branch spins up a dedicated container instance running mock physical databases in less than 45 seconds.",
  },
  {
    type: "quote",
    text: "“By shifting staging complexity left and decoupling physical telemetry simulation, our engineers test operational interfaces against deterministic data pipelines in real time.”",
    cite: ", Rohit Kamalapur, VP of Engineering",
  },
  { type: "heading", text: "3. Smart Caching and Incremental Builds" },
  {
    type: "paragraph",
    text: "We structured our monorepo with Turborepo and remote caching. By hashing compile inputs and sharing artifact registries across isolated runners, we avoid compiling unchanged service layers entirely.",
  },
  {
    type: "list",
    items: [
      "Zero-rebuild caching for UI component dependencies.",
      "Decoupled end-to-end integration test suites run in parallel matrices.",
      "Instant local workspace compilation mirroring production caching registries.",
    ],
  },
  {
    type: "figure",
    image: "/images/blog-figure-1.png",
    caption:
      "Figure 1.1: Telemetry telemetry dashboards indicating parallel integration tests completing in under 3 minutes.",
  },
  { type: "heading", text: "4. The Tangible Outcome" },
  {
    type: "paragraph",
    text: "The quantitative results transformed how we operate: our median deployment time collapsed from 42 minutes down to just 8.4 minutes. Engineers merge pull requests with high confidence, supported by localized validation nodes, keeping Trikaan platforms dynamic and resilient.",
  },
];

export const posts: Post[] = [
  {
    slug: "reducing-deployment-time-by-80-percent",
    title: "How We Reduced Deployment Time by 80% on Enterprise Systems",
    excerpt:
      "A comprehensive case study detailing our migration to ephemeral preview environments, optimized remote caching, and progressive delivery pipelines.",
    category: "Engineering",
    date: "Oct 31, 2026",
    readingTime: "12 min read",
    author: {
      name: "James Okafor",
      role: "Lead DevOps Engineer",
      bio: jamesBio,
    },
    coverImage: "/images/blog-featured.png",
    content: articleBody,
  },
  {
    slug: "building-resilient-distributed-systems",
    title: "Building Resilient Distributed Systems for Physical Operations",
    excerpt:
      "Unpacking our architectural choices for maintaining zero-downtime synchronization across dynamic warehouse environments.",
    category: "Engineering",
    date: "Oct 24, 2026",
    readingTime: "9 min read",
    author: {
      name: "James Okafor",
      role: "Lead DevOps Engineer",
      bio: jamesBio,
    },
    coverImage: "/images/blog-card-1.png",
    content: articleBody,
  },
  {
    slug: "future-of-enterprise-automation",
    title: "The Future of Enterprise Automation and Operational UX",
    excerpt:
      "How Trikaan applies consumer-grade design patterns to industrial tools, minimizing training cycles and eliminating manual errors.",
    category: "Product",
    date: "Oct 18, 2026",
    readingTime: "7 min read",
    author: { name: "Ava Chen", role: "Product Lead", bio: jamesBio },
    coverImage: "/images/blog-card-2.png",
    content: articleBody,
  },
  {
    slug: "scaling-logistics-operations-across-3-continents",
    title: "Scaling Logistics Operations Across 3 Continents Seamlessly",
    excerpt:
      "A deep dive into geopolitical constraints, software localization, and multi-cloud latency optimization strategies.",
    category: "Industry",
    date: "Oct 12, 2026",
    readingTime: "10 min read",
    author: {
      name: "Priya Sharma",
      role: "Operations Architect",
      bio: jamesBio,
    },
    coverImage: "/images/blog-card-3.png",
    content: articleBody,
  },
  {
    slug: "event-driven-architecture-multi-warehouse-sync",
    title: "Why We Chose Event-Driven Architecture for Multi-Warehouse Sync",
    excerpt:
      "Understanding how real-time telemetry streams and decoupled event stores transformed our physical inventory reconciliation speed.",
    category: "Engineering",
    date: "Oct 05, 2026",
    readingTime: "11 min read",
    author: {
      name: "James Okafor",
      role: "Lead DevOps Engineer",
      bio: jamesBio,
    },
    coverImage: "/images/blog-card-4.png",
    content: articleBody,
  },
  {
    slug: "collaborative-product-development-process",
    title: "Inside Our Collaborative Product Development Process",
    excerpt:
      "Bridging the gap between the factory floor, software developers, and executive stakeholders to ship code with direct impact.",
    category: "Product",
    date: "Sep 28, 2026",
    readingTime: "8 min read",
    author: { name: "Sophie Laurent", role: "Product Designer", bio: jamesBio },
    coverImage: "/images/blog-card-5.png",
    content: articleBody,
  },
  {
    slug: "trikaan-named-core-leader-digital-logistics",
    title: "Trikaan Named Core Leader in Modern Digital Logistics Software",
    excerpt:
      "We are thrilled to be recognized globally for our commitment to scalable infrastructure and operational uptime.",
    category: "Company News",
    date: "Sep 15, 2026",
    readingTime: "5 min read",
    author: {
      name: "Elena Martinez",
      role: "Communications Lead",
      bio: jamesBio,
    },
    coverImage: "/images/blog-card-6.png",
    content: articleBody,
  },
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
