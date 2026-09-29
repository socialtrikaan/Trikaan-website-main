"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type LoaderProps = { visible: boolean };

// Premium route loader: Trikaan wordmark reveal over a soft brand glow, with a
// slim indeterminate progress bar. Framer Motion only (GPU transform/opacity).
export default function Loader({ visible }: LoaderProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          aria-hidden={!visible}
          role="status"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Trikaan logo only , soft reveal + gentle breathing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: [0, 1, 1], scale: [0.92, 1, 1.03, 1] }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 2.2, ease: "easeInOut", repeat: Infinity },
            }}
          >
            <Image
              src="/images/trikaan-logo.svg"
              alt="Trikaan"
              width={240}
              height={30}
              priority
              className="h-[34px] w-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
