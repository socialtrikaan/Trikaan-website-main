"use client";

import { useEffect, useState } from "react";

// Interactive ToC: anchor links + scroll-spy active highlight. Figma nodes 1:1648–1:1664.
export default function TableOfContents({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <aside className="flex w-full flex-col gap-6 lg:sticky lg:top-24 lg:w-[280px] lg:shrink-0">
      <p className="text-[12px] font-bold uppercase text-ink">Terms Sections</p>
      <nav aria-label="Terms sections">
        <ul className="flex flex-col gap-3 text-[14px]">
          {items.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                aria-current={active === id ? "true" : undefined}
                className={
                  active === id
                    ? "font-semibold text-brand"
                    : "font-normal text-ink-600 hover:text-brand"
                }
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col gap-4 rounded-input border border-border bg-surface-150 p-6">
        <p className="text-[16px] font-bold text-ink">Corporate SLA</p>
        <p className="text-[13px] leading-[1.5] text-ink-600">
          Are you an Enterprise customer? Your custom Master Services Agreement
          overrides standard web terms.
        </p>
        <p className="text-[14px] font-semibold text-brand">
          Review MSA Templates
        </p>
      </div>
    </aside>
  );
}
