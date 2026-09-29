"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  type AnimationPlaybackControls,
} from "framer-motion";
import {
  UsersRound,
  TrendingUp,
  ShoppingCart,
  Package,
  Warehouse,
  Cpu,
  ShieldCheck,
  Wrench,
  HardDrive,
  Folder,
  BarChart2,
  Headphones,
  Truck,
  Store,
  Landmark,
  Users,
} from "lucide-react";
import Rings from "./Rings";
import ConnectorLines from "./ConnectorLines";
import Glow from "./Glow";
import CenterCard, { type ActiveModule } from "./CenterCard";
import OrbitItem, { type OrbitModule } from "./OrbitItem";

// Clockwise from top (matches the Figma recording). color = icon glyph color.
const MODULES: OrbitModule[] = [
  {
    label: "CRM",
    Icon: UsersRound,
    color: "#7c3aed",
    desc: "Customer relationships",
  },
  {
    label: "Sales",
    Icon: TrendingUp,
    color: "#16a34a",
    desc: "Pipeline & deals",
  },
  {
    label: "Purchase",
    Icon: ShoppingCart,
    color: "#0342fd",
    desc: "Procurement & vendors",
  },
  {
    label: "Inventory",
    Icon: Package,
    color: "#d97706",
    desc: "Stock control",
  },
  {
    label: "Warehouse",
    Icon: Warehouse,
    color: "#0342fd",
    desc: "Storage & bins",
  },
  { label: "Production", Icon: Cpu, color: "#0342fd", desc: "Manufacturing" },
  {
    label: "Quality",
    Icon: ShieldCheck,
    color: "#16a34a",
    desc: "QA & compliance",
  },
  {
    label: "Maintenance",
    Icon: Wrench,
    color: "#0342fd",
    desc: "Asset upkeep",
  },
  {
    label: "Assets",
    Icon: HardDrive,
    color: "#0342fd",
    desc: "Asset tracking",
  },
  {
    label: "Documents",
    Icon: Folder,
    color: "#16a34a",
    desc: "Files & records",
  },
  {
    label: "Reports & BI",
    Icon: BarChart2,
    color: "#0342fd",
    desc: "Analytics & insights",
  },
  {
    label: "Helpdesk",
    Icon: Headphones,
    color: "#0342fd",
    desc: "Support tickets",
  },
  {
    label: "Logistics",
    Icon: Truck,
    color: "#16a34a",
    desc: "Shipping & fleet",
  },
  { label: "E-Commerce", Icon: Store, color: "#7c3aed", desc: "Online store" },
  {
    label: "Finance",
    Icon: Landmark,
    color: "#0d9488",
    desc: "Accounting & books",
  },
  { label: "HRMS", Icon: Users, color: "#0342fd", desc: "People & payroll" },
];

const N = MODULES.length;
const SALES_IDX = 1; // reveal starts at Sales, ends at CRM
const R_FRAC = 0.4; // orbit radius as fraction of container size
const SPIN_SEC = 45; // one slow revolution

export default function Orbit() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const play = inView;

  // camera: gentle zoom as the ecosystem scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const camScale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.06]),
    {
      stiffness: 300,
      damping: 40,
    },
  );

  const rot = useMotionValue(0);
  const counter = useTransform(rot, (v) => -v); // keeps cards upright while the group spins

  // center card auto-cycles through every app (3s each); hover overrides + pauses
  const [active, setActive] = useState<ActiveModule | null>(null);
  const idx = useRef(0);
  const paused = useRef(false);
  useEffect(() => {
    const id = setInterval(() => {
      if (paused.current) return;
      const m = MODULES[idx.current % N];
      idx.current += 1;
      setActive({ label: m.label, Icon: m.Icon, color: m.color, desc: m.desc });
    }, 3000);
    return () => clearInterval(id);
  }, []);
  const onEnter = useCallback((m: ActiveModule) => {
    paused.current = true;
    setActive(m);
  }, []);
  const onLeave = useCallback(() => {
    paused.current = false;
  }, []);

  // start the slow rotation once the empty circle is in view (runs regardless of
  // prefers-reduced-motion , this hero animation is explicitly wanted)
  useEffect(() => {
    if (!inView) return;
    const c: AnimationPlaybackControls = animate(rot, 360, {
      duration: SPIN_SEC,
      ease: "linear",
      repeat: Infinity,
      delay: 0.2,
    });
    return () => c.stop();
  }, [inView, rot]);

  const items = useMemo(
    () =>
      MODULES.map((m, i) => ({
        ...m,
        angle: i * (360 / N), // fixed slot: CRM top, clockwise
        order: (i - SALES_IDX + N) % N, // reveal one by one, Sales first
      })),
    [],
  );

  const activeIndex = active
    ? MODULES.findIndex((m) => m.label === active.label)
    : -1;

  return (
    <motion.div
      ref={ref}
      className="relative aspect-square w-[min(88vw,600px)] shrink-0"
      style={{
        scale: camScale,
        ...({ "--sz": "min(88vw, 600px)" } as CSSProperties),
      }}
    >
      <Glow />

      {/* background particles orbiting slowly (decorative, behind the rings) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity }}
      >
        {[
          { l: "16%", t: "22%", s: 5 },
          { l: "82%", t: "30%", s: 4 },
          { l: "72%", t: "82%", s: 6 },
          { l: "22%", t: "78%", s: 4 },
          { l: "50%", t: "10%", s: 3 },
          { l: "90%", t: "60%", s: 3 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-brand/25"
            style={{ left: p.l, top: p.t, width: p.s, height: p.s }}
          />
        ))}
      </motion.div>

      {/* top badge (static) */}
      <div className="absolute left-1/2 top-[3%] z-10 -translate-x-1/2 rounded-pill border border-border bg-white px-3 py-1 shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
        <p className="whitespace-nowrap text-[10px] font-extrabold text-brand">
          20+ APPS. 1 PLATFORM.
        </p>
      </div>

      {/* whole circle rotates: rings + spokes + dots + apps together (apps stay upright) */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ rotate: rot }}
      >
        <Rings />
        <ConnectorLines count={N} activeIndex={activeIndex} />
        {items.map(({ label, Icon, color, desc, angle, order }) => (
          <div
            key={label}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{
              transform: `rotate(${angle}deg) translateY(calc(var(--sz) * ${-R_FRAC}))`,
            }}
          >
            <div className="absolute -translate-x-1/2 -translate-y-1/2">
              <OrbitItem
                label={label}
                Icon={Icon}
                color={color}
                desc={desc}
                angle={angle}
                order={order}
                counter={counter}
                play={play}
                isActive={active?.label === label}
                onEnter={() => onEnter({ label, Icon, color, desc })}
                onLeave={onLeave}
              />
            </div>
          </div>
        ))}
      </motion.div>

      <CenterCard active={active} />
    </motion.div>
  );
}
