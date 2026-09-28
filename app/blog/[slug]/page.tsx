import type { Metadata } from "next";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import BlogCard from "@/components/cards/BlogCard";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import StructuredData from "../../components/StructuredData";
import { breadcrumbJsonLd, createMetadata } from "../../seo";
import { getAllPosts, getPostBySlug, type ContentBlock } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: [post.category, "Trikaan blog"],
  });
}

// Figma article body (node 1:3025): headings absorb the paragraph/list blocks that
// follow them into one group (gap-16); lead/quote/figure stand alone. Groups gap-40.
function groupBlocks(blocks: ContentBlock[]): ContentBlock[][] {
  const groups: ContentBlock[][] = [];
  for (const block of blocks) {
    if (block.type === "heading") groups.push([block]);
    else if (
      (block.type === "paragraph" || block.type === "list") &&
      groups.at(-1)?.[0].type === "heading"
    )
      groups.at(-1)!.push(block);
    else groups.push([block]);
  }
  return groups;
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "lead":
      return (
        <p className="font-geist text-[18px] font-medium leading-[28px] text-ink">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 className="font-geist text-[24px] font-extrabold text-ink">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="font-geist text-[16px] leading-[26px] text-ink-600">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <figure className="flex flex-col gap-4 border-l-4 border-brand bg-surface-150 p-8">
          <blockquote className="font-serif text-[22px] leading-[32px] text-ink">
            {block.text}
          </blockquote>
          <figcaption className="font-geist text-[14px] font-bold text-brand">
            {block.cite}
          </figcaption>
        </figure>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-3 pl-4">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                aria-hidden
              />
              <span className="font-geist text-[16px] text-ink-600">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    case "figure":
      return (
        <figure className="flex flex-col gap-3">
          <div className="relative h-[240px] w-full overflow-hidden rounded-[12px] md:h-[320px]">
            <ParallaxImage
              src={block.image}
              alt=""
              fill
              className="object-cover"
              sizes="800px"
            />
          </div>
          <figcaption className="text-center font-geist text-[13px] text-muted">
            {block.caption}
          </figcaption>
        </figure>
      );
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const groups = groupBlocks(post.content);

  return (
    <article>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      {/* Hero (node 1:3002) */}
      <div className="bg-surface-150 pb-16 pt-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <span className="rounded-[6px] bg-tint-blue px-2.5 py-1 font-geist text-[12px] font-bold text-brand">
            {post.category}
          </span>
          <h1 className="max-w-[900px] font-geist text-[36px] font-extrabold leading-tight text-ink md:text-[48px] md:leading-[56px]">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-3">
              <span
                className="size-12 shrink-0 rounded-full bg-border"
                aria-hidden
              />
              <div className="flex flex-col gap-0.5 text-left">
                <p className="font-geist text-[15px] font-bold text-ink">
                  {post.author.name}
                </p>
                <p className="font-geist text-[13px] text-ink-600">
                  {post.author.role} at Trikaan
                </p>
              </div>
            </div>
            <span className="hidden h-8 w-px bg-border sm:block" aria-hidden />
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-ink-600" aria-hidden />
              <span className="font-geist text-[14px] text-ink-600">
                {post.date}
              </span>
            </div>
            <span className="hidden h-8 w-px bg-border sm:block" aria-hidden />
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-ink-600" aria-hidden />
              <span className="font-geist text-[14px] text-ink-600">
                {post.readingTime}
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* Cover (node 1:3024) */}
      <div className="relative h-[280px] w-full md:h-[560px]">
        <ParallaxImage
          src={post.coverImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Body (node 1:3025) , each block group reveals on scroll */}
      <div className="px-6 py-20">
        <div className="mx-auto flex max-w-[800px] flex-col gap-10">
          {groups.map((group, i) => (
            <Reveal key={i} y={36} className="flex flex-col gap-4">
              {group.map((block, j) => (
                <Block key={j} block={block} />
              ))}
            </Reveal>
          ))}
        </div>
      </div>

      {/* Author bio (node 1:3056) */}
      <div className="border-y border-border bg-surface-150 py-16">
        <Container className="flex items-center gap-8">
          <span
            className="size-20 shrink-0 rounded-full bg-border"
            aria-hidden
          />
          <div className="flex flex-col gap-2">
            <p className="font-geist text-[18px] font-extrabold text-ink">
              {post.author.name}
            </p>
            <p className="font-geist text-[14px] font-semibold text-brand">
              {post.author.role}
            </p>
            <p className="font-geist text-[14px] leading-[22px] text-ink-600">
              {post.author.bio}
            </p>
          </div>
        </Container>
      </div>

      {/* Related articles (node 1:3063) */}
      <Reveal className="block py-20">
        <Container className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="font-geist text-[24px] font-extrabold text-ink">
              Related Articles
            </h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 font-geist text-[14px] font-semibold text-brand"
            >
              Explore All
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <StaggerItem key={p.slug}>
                <BlogCard
                  title={p.title}
                  excerpt={p.excerpt}
                  category={p.category}
                  date={p.date}
                  author={p.author.name}
                  href={`/blog/${p.slug}`}
                  image={p.coverImage}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Reveal>
    </article>
  );
}
