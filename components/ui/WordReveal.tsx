"use client";

import { motion, type Variants } from "framer-motion";
import { createElement, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Heading word-by-word reveal: each word rises from just below, blur → sharp, staggered.
// Recurses through children so nested styled spans (color/font) and whitespace are preserved ,
// only text is split into animated words; no heading styles are changed.

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: "0.45em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.39, bounce: 0.15 },
  },
};

// ponytail: recursive walk , string nodes become animated words, elements are cloned as
// motion.* so Framer's variant context keeps flowing to the words inside them.
function walk(node: ReactNode, ctr: { i: number }): ReactNode {
  if (node == null || typeof node === "boolean") return node;

  if (typeof node === "string" || typeof node === "number") {
    return String(node)
      .split(/(\s+)/) // keep whitespace chunks as plain text → spacing unchanged
      .map((part, k) =>
        /^\s*$/.test(part) ? (
          part
        ) : (
          <motion.span
            key={`w${ctr.i++}-${k}`}
            variants={wordVariant}
            className="inline-block"
          >
            {part}
          </motion.span>
        ),
      );
  }

  if (Array.isArray(node)) return node.map((n) => walk(n, ctr));

  if (isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: ReactNode }>;
    const type =
      typeof el.type === "string"
        ? ((motion as unknown as Record<string, React.ElementType>)[el.type] ??
          el.type)
        : el.type;
    return createElement(
      type,
      { ...el.props, key: el.key ?? `e${ctr.i++}` },
      walk(el.props.children, ctr),
    );
  }

  return node;
}

type Tag = "h1" | "h2" | "h3" | "p";

export default function WordReveal({
  children,
  className,
  as = "h2",
  amount = 0.6,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  amount?: number;
}) {
  const M = motion[as];
  return (
    <M
      className={cn(className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {walk(children, { i: 0 })}
    </M>
  );
}
