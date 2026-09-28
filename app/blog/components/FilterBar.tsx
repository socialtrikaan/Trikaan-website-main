"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import GridSection from "./GridSection";
import type { Post } from "@/lib/blog";

// Figma FilterBar (node 1:2721): category pills. Owns the active-filter state and
// renders the grid below it (the two are separate visual bands but share state).
const CATEGORIES = ["All Articles", "Engineering", "Product", "Industry", "Company News"] as const;

export default function FilterBar({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All Articles");
  const filtered = active === "All Articles" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="border-y border-border bg-surface-150 py-6">
        <Container>
          <div role="tablist" aria-label="Filter articles by category" className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = cat === active;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={
                    isActive
                      ? "rounded-pill bg-brand px-4 py-2 font-geist text-[14px] font-semibold text-white"
                      : "rounded-pill border border-border bg-white px-4 py-2 font-geist text-[14px] font-medium text-ink-600 transition-colors hover:border-brand hover:text-brand"
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Container>
      </div>
      <GridSection posts={filtered} />
    </>
  );
}
