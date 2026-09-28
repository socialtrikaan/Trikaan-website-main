"use client";

import { motion } from "framer-motion";

export type Member = { name: string; role: string; bio: string; image?: string };

export function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Premium team card: glass surface, portrait (or monogram fallback), hover lift + glow +
// zoom. Whole card is a button → opens the fullscreen profile modal.
export default function TeamCard({ member, onOpen }: { member: Member; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open profile: ${member.name}, ${member.role}`}
      className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-white/60 bg-white/70 p-5 text-left shadow-[0_10px_40px_-24px_rgba(3,66,253,0.35)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_28px_60px_-24px_rgba(3,66,253,0.45)]"
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 ring-1 ring-brand/40 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-gradient-to-br from-brand to-brand-bright">
        {member.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-heading text-[64px] text-white/90 transition-transform duration-500 ease-out group-hover:scale-110"
          >
            {initials(member.name)}
          </span>
        )}
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
      </div>

      <h3 className="text-[18px] font-bold text-ink">{member.name}</h3>
      <p className="mt-1 text-[13px] font-semibold leading-snug text-brand-electric">{member.role}</p>
    </motion.button>
  );
}
