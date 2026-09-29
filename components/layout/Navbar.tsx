"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Users,
  Layers,
  Mail,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// magnetic wrapper , element is pulled toward the cursor, springs back on leave
function Magnetic({
  children,
  strength = 0.4,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// per-letter roll , each char rolls up, a blue copy rolls in from below with a stagger
const ROLL_EASE = "cubic-bezier(0.22,1,0.36,1)";
function RollText({ text }: { text: string }) {
  return (
    <span className="flex">
      {[...text].map((ch, i) => (
        <span key={i} className="relative inline-block overflow-hidden">
          <span
            className="block transition-transform duration-[400ms] group-hover:-translate-y-full"
            style={{
              transitionTimingFunction: ROLL_EASE,
              transitionDelay: `${i * 22}ms`,
            }}
          >
            {ch === " " ? " " : ch}
          </span>
          <span
            className="absolute inset-0 block translate-y-full font-medium text-brand transition-transform duration-[400ms] group-hover:translate-y-0"
            style={{
              transitionTimingFunction: ROLL_EASE,
              transitionDelay: `${i * 22}ms`,
            }}
          >
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
    </span>
  );
}

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

// mobile bottom tab bar , 2 tabs each side, raised Anvaya FAB in the center
const LEFT_TABS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "About", href: "/about", Icon: Users },
  { label: "Services", href: "/services", Icon: Layers },
];
const RIGHT_TABS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "Contact", href: "/contact", Icon: Mail },
  { label: "Careers", href: "/careers", Icon: Briefcase },
];

function Tab({
  label,
  href,
  Icon,
  active,
}: {
  label: string;
  href: string;
  Icon: LucideIcon;
  active: boolean;
}) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 py-2.5">
      <Icon
        size={20}
        className={active ? "text-brand" : "text-ink-600"}
        strokeWidth={active ? 2.4 : 2}
      />
      <span
        className={cn(
          "text-[10px]",
          active ? "font-semibold text-brand" : "text-ink-600",
        )}
      >
        {label}
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.39, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex h-[60px] w-full max-w-[1420px] items-center justify-between rounded-nav border px-5 transition-all duration-300 sm:h-[84px]",
            scrolled
              ? "border-border bg-white shadow-header"
              : "border-border bg-white shadow-header",
          )}
        >
          <Link
            href="/"
            aria-label="Trikaan home"
            className="shrink-0 transition-transform duration-300 hover:scale-[1.04]"
          >
            <Image
              src="/images/trikaan-logo.svg"
              alt="Trikaan"
              width={240}
              height={31}
              priority
              className="h-[22px] w-auto sm:h-[30px]"
            />
          </Link>

          {/* Desktop links */}
          <div
            className="hidden items-center gap-3 lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((l) => (
              <Magnetic key={l.href} strength={0.5}>
                <Link
                  href={l.href}
                  onMouseEnter={() => setHovered(l.href)}
                  className={cn(
                    "group relative block rounded-full px-4 py-2 text-[14px]",
                    isActive(l.href) ? "font-medium text-ink" : "text-ink-600",
                  )}
                >
                  {/* gliding hover pill */}
                  {hovered === l.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 -z-10 rounded-full bg-brand/[0.08]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                  <span className="relative block overflow-hidden">
                    <RollText text={l.label} />
                  </span>
                  {isActive(l.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </Magnetic>
            ))}
            <Magnetic strength={0.35}>
              <a
                href="https://www.theanvaya.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Anvaya"
                className="group relative flex items-center overflow-hidden rounded-pill bg-[rgba(1,40,151,0.22)] px-4 py-2 transition-all duration-300 hover:bg-[rgba(1,40,151,0.32)] hover:shadow-[0_10px_26px_-8px_rgba(3,66,253,0.65)]"
              >
                <Image
                  src="/images/anvaya-wordmark.svg"
                  alt="Anvaya"
                  width={108}
                  height={14}
                  className="relative z-10 h-[14px] w-auto transition-transform duration-300 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/40 transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
              </a>
            </Magnetic>
          </div>

          {/* Let's Talk , magnetic + brighten + shine sweep + arrow slide */}
          <Magnetic strength={0.35}>
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-button bg-brand px-4 py-2 font-heading text-[13px] text-white shadow-[0_6px_18px_-8px_rgba(3,66,253,0.6)] transition-all duration-300 hover:bg-brand-bright hover:shadow-[0_12px_28px_-10px_rgba(3,66,253,0.75)] sm:px-5 sm:py-2.5 sm:text-[14px]"
            >
              <span className="relative z-10">Let&apos;s Talk</span>
              <span className="relative z-10 inline-block max-w-0 -translate-x-1 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-w-[1em] group-hover:translate-x-0 group-hover:opacity-100">
                →
              </span>
              {/* soft diagonal shine sweep */}
              <span className="pointer-events-none absolute inset-0 z-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 ease-out group-hover:translate-x-[220%]" />
            </Link>
          </Magnetic>
        </nav>
      </motion.header>

      {/* spacer for the fixed navbar */}
      <div aria-hidden className="h-[72px] sm:h-[100px]" />

      {/* Mobile bottom tab bar , flanks a raised center Anvaya FAB */}
      <nav
        aria-label="Sections"
        className="fixed inset-x-0 bottom-0 z-50 rounded-t-[16px] border-t border-border bg-white/95 shadow-[0_-6px_20px_-8px_rgba(0,0,0,0.15)] backdrop-blur-md lg:hidden"
      >
        <div className="relative mx-auto flex max-w-[520px] items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
          <div className="flex flex-1 justify-around">
            {LEFT_TABS.map((t) => (
              <Tab key={t.href} {...t} active={isActive(t.href)} />
            ))}
          </div>
          <div className="w-16 shrink-0" aria-hidden />
          <div className="flex flex-1 justify-around">
            {RIGHT_TABS.map((t) => (
              <Tab key={t.href} {...t} active={isActive(t.href)} />
            ))}
          </div>

          {/* raised Anvaya FAB */}
          <a
            href="https://www.theanvaya.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Anvaya"
            className={cn(
              "absolute -top-6 left-1/2 flex size-14 -translate-x-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-bright text-white shadow-[0_8px_20px_-4px_rgba(3,66,253,0.5)] ring-4 ring-white transition-transform active:scale-95",
            )}
          >
            {/* Trikaan "A" triangle mark */}
            <svg
              viewBox="116 0 42 32"
              className="h-6 w-6"
              fill="none"
              aria-hidden
            >
              <path
                d="M154.595 28.0066L150.175 21.1597M150.175 21.1597L140.941 6.30305C138.517 1.91051 134.306 1.78136 131.498 6.30305C128.302 11.45 123.076 19.2219 121.034 22.5808C118.354 26.4563 118.176 27.8775 122.055 27.8775C125.934 27.8775 132.179 27.8775 134.816 27.8775C141.834 28.1359 146.945 24.8803 150.175 21.1597Z"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <span className="pointer-events-none absolute left-1/2 top-[42px] -translate-x-1/2 text-[10px] font-semibold text-brand">
            Anvaya
          </span>
        </div>
      </nav>
    </>
  );
}
