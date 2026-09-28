import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

// Figma blog grid card (node 1:2735). Vertical: 200px cover, body with category
// badge + 2-line title + 2-line excerpt, footer with author + "Read More".
export default function BlogCard({
  title,
  excerpt,
  category,
  date,
  author,
  href,
  image,
}: {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author?: string;
  href: string;
  image?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between overflow-hidden rounded-card border border-border bg-white transition-all duration-200 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-card"
    >
      <div className="flex flex-col">
        <div className="relative h-[200px] w-full">
          {image && (
            <Image src={image} alt="" fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
          )}
        </div>
        <div className="flex flex-col gap-3 p-6">
          <div>
            <span className="inline-block rounded-[6px] bg-tint-blue px-2.5 py-1 font-geist text-[12px] font-bold text-brand">
              {category}
            </span>
          </div>
          <h3 className="line-clamp-2 h-[50px] font-geist text-[18px] font-bold text-ink">
            {title}
          </h3>
          <p className="line-clamp-2 h-[44px] font-geist text-[14px] leading-[1.5] text-ink-600">
            {excerpt}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="h-px w-full bg-border" />
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-2">
            <span className="size-7 shrink-0 rounded-full bg-border" aria-hidden />
            <div className="flex flex-col gap-0.5">
              <p className="font-geist text-[12px] font-semibold text-ink">{author}</p>
              <p className="font-geist text-[11px] text-muted">{date}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-geist text-[13px] font-semibold text-brand">Read More</span>
            <ChevronRight className="size-3.5 text-brand" aria-hidden />
          </div>
        </div>
      </div>
    </Link>
  );
}
