import { Navigation } from "lucide-react";

const ADDRESS =
  "657/23, 13 Cross, Asha Township, Doddagubbi, Hennur Road, Bangalore 560077, India";
const QUERY = "Trikaan+Solutions+Doddagubbi+Hennur+Road+Bangalore+560077";
const COORDS = "13.0796,77.6653"; // Doddagubbi / Hennur Road , pin only, no Google place panel

// Live Google Maps embed of the real office. Keyless embed via output=embed.
export default function MapSection() {
  return (
    <section
      aria-label="Trikaan Bengaluru location"
      className="relative h-[480px] w-full overflow-hidden bg-surface-gray"
    >
      <iframe
        title="Trikaan office location"
        src={`https://www.google.com/maps?q=${COORDS}&z=15&output=embed`}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Floating place card */}
      <div className="pointer-events-none absolute left-4 top-4 flex w-[380px] max-w-[calc(100%-2rem)] flex-col gap-4 rounded-[12px] bg-white p-5 shadow-[0px_8px_12px_rgba(0,0,0,0.13)] md:left-8 md:top-8">
        <div className="flex flex-col gap-1.5">
          <p className="text-[18px] font-bold text-brand-ink">
            Trikaan Solutions Private Limited
          </p>
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-semibold text-amber">4.9 ★★★★★</p>
            <p className="text-[13px] text-ink-600">(128 reviews)</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[13px] leading-[1.4] text-ink-600">{ADDRESS}</p>
          <p className="text-[12px] font-medium text-success-dark">
            Open • Closes 6:00 PM
          </p>
        </div>
        <div className="h-px w-full bg-border" />
        <a
          href={`https://maps.google.com/?q=${QUERY}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex w-fit items-center justify-center gap-2 rounded-[8px] bg-brand px-4 py-2.5 text-[13px] font-semibold text-white"
        >
          <Navigation size={16} />
          Directions
        </a>
      </div>
    </section>
  );
}
