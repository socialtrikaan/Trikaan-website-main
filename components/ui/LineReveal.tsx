"use client";

import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Paragraph reveal, line by line: words fade upward, every word on the same rendered
// line shares one stagger delay. Lines are detected from measured offsetTop (recomputed
// on resize), so wrapping/typography is unchanged , text is only split into words + spaces.

const wordV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.33, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function LineReveal({
  children,
  className,
  as = "p",
  stagger = 0.09,
}: {
  children: string; // plain text only
  className?: string;
  as?: "p" | "span";
  stagger?: number;
}) {
  const words = children.split(/\s+/).filter(Boolean);
  const ref = useRef<HTMLParagraphElement>(null);
  const [delays, setDelays] = useState<number[]>(() => words.map(() => 0));

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const compute = () => {
      const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
      let line = -1;
      let lastTop = Number.NaN;
      const d = spans.map((s) => {
        const top = s.offsetTop; // transform (y) doesn't affect offsetTop → stable while hidden
        if (Number.isNaN(lastTop) || Math.abs(top - lastTop) > 4) {
          line++;
          lastTop = top;
        }
        return line * stagger;
      });
      // skip the state update (and re-render) when line grouping is unchanged
      setDelays((prev) =>
        prev.length === d.length && prev.every((v, k) => v === d[k]) ? prev : d,
      );
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children, stagger]);

  const M = motion[as] as typeof motion.p;
  return (
    <M
      ref={ref}
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span
            data-word
            variants={wordV}
            custom={delays[i]}
            className="inline-block"
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </M>
  );
}
