"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";

// App Router re-mounts template.tsx on every navigation → route transition.
// Fade + slight rise. After the entrance settles we strip the residual transform
// so it doesn't create a containing block that would break `position: sticky`
// (used by the privacy/terms table of contents).
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="page-tx"
      variants={pageTransition}
      initial="hidden"
      animate="show"
      onAnimationComplete={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </motion.div>
  );
}
