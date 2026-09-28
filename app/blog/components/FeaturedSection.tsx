import Link from "next/link";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import type { Post } from "@/lib/blog";

// Figma FeaturedSection (node 1:2700): horizontal card, image left / content right.
export default function FeaturedSection({ post }: { post: Post }) {
  return (
    <section className="py-20 pt-20">
      <Container className="flex flex-col gap-8">
        <h2 className="font-geist text-[24px] font-extrabold text-ink">Featured Article</h2>
        <Link
          href={`/blog/${post.slug}`}
          className="group flex flex-col overflow-hidden rounded-nav border border-border bg-white transition-shadow hover:shadow-card lg:flex-row"
        >
          <div className="relative h-[240px] w-full lg:h-[440px] lg:flex-1">
            <ParallaxImage
              src={post.coverImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center gap-6 p-8 lg:w-[600px] lg:p-12">
            <div>
              <span className="inline-block rounded-[6px] bg-tint-blue px-2.5 py-1 font-geist text-[12px] font-bold text-brand">
                {post.category}
              </span>
            </div>
            <h3 className="font-geist text-[28px] font-extrabold leading-tight text-ink lg:text-[36px] lg:leading-[44px]">
              {post.title}
            </h3>
            <p className="font-geist text-[16px] leading-[26px] text-ink-600">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="size-10 shrink-0 rounded-full bg-border" aria-hidden />
                <div className="flex flex-col gap-1">
                  <p className="font-geist text-[14px] font-bold text-ink">{post.author.name}</p>
                  <p className="font-geist text-[12px] text-muted">
                    {post.date} • {post.readingTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-geist text-[14px] font-bold text-brand">Read Case Study</span>
                <ArrowRight className="size-4 text-brand" aria-hidden />
              </div>
            </div>
          </div>
        </Link>
      </Container>
    </section>
  );
}
