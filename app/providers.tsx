"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Loader from "./components/Loader";
import SmoothScroll from "./components/SmoothScroll";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const timeout = setTimeout(() => {
      if (!cancelled) {
        setLoading(false);
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="never">
      <SmoothScroll />
      <Loader visible={loading} />
      {children}
    </MotionConfig>
  );
}
