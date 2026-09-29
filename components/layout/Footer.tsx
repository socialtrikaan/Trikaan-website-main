"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SOCIALS } from "@/lib/socials";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

// Figma footer nav. Routes wired to real pages where they exist; the ones marked
// TODO have no destination in the Figma design , confirm targets with the client.
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "Who we are", href: "/about" },
      { label: "Our approach", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-surface-blue">
      {/* calm, slowly shifting gradient wash (behind content) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(3,66,253,0.05), rgba(125,184,255,0.10), rgba(3,66,253,0.05))",
          backgroundSize: "220% 220%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />
      {/* Wave transition band (Figma) */}
      <svg
        aria-hidden
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[70px] w-full sm:h-[110px]"
      >
        <defs>
          <linearGradient id="footer-wave" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#f4f8fb" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C400,72 800,66 1440,26 L1440,120 L0,120 Z"
          fill="url(#footer-wave)"
        />
      </svg>

      {/* Brand wordmark watermark (Figma) , full TRIKAAN, full-bleed */}
      <motion.div
        className="origin-center"
        initial={{ opacity: 0, scale: 1.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.04, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/footer-brand.png"
          alt="Trikaan"
          width={1440}
          height={180}
          className="block h-auto w-full"
        />
      </motion.div>

      <div className="px-6 pb-10 sm:px-10 lg:px-30">
        {/* Columns */}
        <motion.div
          className="flex flex-col gap-10 py-16 md:flex-row md:justify-between"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* Brand */}
          <motion.div
            variants={staggerItem}
            className="flex w-full max-w-[300px] flex-col gap-4"
          >
            <p className="font-sans text-[24px] font-extrabold text-ink-900">
              Trikaan
            </p>
            <p className="text-[14px] leading-[1.7] text-ink-700">
              Operational software for businesses that move physical goods.
            </p>
            <motion.div
              className="flex gap-3 pt-2"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.23 },
                },
              }}
            >
              {SOCIALS.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  variants={{
                    hidden: { opacity: 0, scale: 0.6, y: 10 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 380,
                        damping: 15,
                      },
                    },
                  }}
                  className="flex size-9 items-center justify-center rounded-[18px] border border-border bg-white text-ink shadow-icon transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:border-brand hover:text-brand"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <motion.nav
              variants={staggerItem}
              key={col.title}
              aria-label={col.title}
              className="flex flex-col gap-4"
            >
              <p className="text-[12px] font-bold uppercase text-muted">
                {col.title}
              </p>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="ul-anim w-fit text-[14px] text-ink-700 hover:text-brand"
                >
                  {l.label}
                </Link>
              ))}
            </motion.nav>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-border" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 py-6 text-[13px] text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Trikaan Solutions Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-brand"
            >
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-brand">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
