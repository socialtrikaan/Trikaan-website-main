import { MapPin, Phone, Mail, Map } from "lucide-react";

export default function ContactSidebar() {
  return (
    <div className="flex w-full flex-col gap-6 lg:w-[480px]">
      {/* Address card */}
      <div className="flex flex-col gap-7 rounded-nav border border-border bg-surface-100 p-10">
        <p className="font-heading text-[28px] text-brand">Trikaan Bengaluru</p>
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <MapPin size={18} className="mt-0.5 shrink-0 text-brand" />
            <p className="text-[14px] leading-[1.6] text-ink">
              657/23, 13 Cross, Asha Township, Doddagubbi, Hennur Road, Bangalore 560077, India
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Phone size={18} className="shrink-0 text-brand" />
            <p className="text-[14px] text-ink">+91 90362 22022</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail size={18} className="shrink-0 text-brand" />
            <p className="text-[14px] text-ink">info@trikaan.com</p>
          </div>
        </div>
      </div>

      {/* Map placeholder card */}
      <div className="flex h-[360px] flex-col items-center justify-center gap-5 rounded-nav border border-border bg-surface-100 p-10 text-center">
        <Map size={36} className="text-brand" />
        <div className="flex flex-col gap-2">
          <p className="text-[16px] font-bold text-ink">
            INTERACTIVE MAP PLACEHOLDER
          </p>
          <p className="font-heading text-[14px] text-brand">
            Bengaluru Operational Hub
          </p>
        </div>
        <a
          href="https://maps.google.com/?q=Trikaan+Solutions+Doddagubbi+Hennur+Road+Bangalore+560077"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[6px] border border-ink px-5 py-2.5 text-[12px] font-bold uppercase text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Open External Map
        </a>
      </div>
    </div>
  );
}
