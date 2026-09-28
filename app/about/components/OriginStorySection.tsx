"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import WordReveal from "@/components/ui/WordReveal";

// Figma node 234:177 , "We didn't discover a software problem." heading + a zig-zag of
// hand-drawn sketch cards with short captions, closing on the founding question.
type Row = {
  img: string;
  side: "left" | "right"; // which side the image sits on (desktop)
  ratio: string; // aspect ratio of the sketch
  wide?: boolean;
  overlay?: string; // small caption baked onto the image (card 03)
  caption: React.ReactNode;
};

const ROWS: Row[] = [
  {
    img: "origin-01",
    side: "left",
    ratio: "400/267",
    caption: (
      <>
        We walked into
        <br />
        factories expecting
        <br />
        to <span className="text-brand">study operations.</span>
      </>
    ),
  },
  {
    img: "origin-02",
    side: "right",
    ratio: "400/267",
    caption: (
      <>
        Instead, we found
        <br />
        brilliant people spending
        <br />
        their days filing the gaps
        <br />
        left by <span className="text-brand">disconnected systems.</span>
      </>
    ),
  },
  {
    img: "origin-03",
    side: "left",
    ratio: "400/267",
    overlay: "Procurement unaware.",
    caption: (
      <>
        <span className="text-brand">Production</span> knew
        <br />
        something
        <br />
        procurement didn&apos;t.
      </>
    ),
  },
  {
    img: "origin-04",
    side: "right",
    ratio: "400/220",
    caption: (
      <>
        <span className="text-brand">Warehouse</span> solved
        <br />
        problems finance
        <br />
        couldn&apos;t see.
      </>
    ),
  },
  {
    img: "origin-10",
    side: "left",
    ratio: "400/234",
    caption: (
      <>
        <span className="text-brand">Management</span> made
        <br />
        decisions without
        <br />
        seeing what was
        <br />
        actually happening
        <br />
        on the shop floor.
      </>
    ),
  },
  {
    img: "origin-06",
    side: "right",
    ratio: "400/212",
    caption: (
      <>
        Everyone were working.
        <br />
        <br />
        No one was <span className="text-brand">working together.</span>
      </>
    ),
  },
  {
    img: "origin-07",
    side: "right",
    ratio: "749/249",
    wide: true,
    caption: (
      <>
        That was the moment
        <br />
        <span className="text-brand">everything changed.</span>
      </>
    ),
  },
  {
    img: "origin-08",
    side: "left",
    ratio: "353/228",
    caption: (
      <>
        We realized businesses didn&apos;t need
        <br />
        another ERP, another dashboard,
        <br />
        or another software company.
      </>
    ),
  },
  {
    img: "origin-09",
    side: "right",
    ratio: "345/251",
    caption: (
      <>
        They needed someone willing
        <br />
        to <span className="text-brand">understand</span> how an industry
        <br />
        truly breaths,then build
        <br />
        technology around <span className="text-brand">that reality.</span>
      </>
    ),
  },
];

function StoryRow({ r }: { r: Row }) {
  const img = (
    <motion.div
      className={`relative w-full shrink-0 overflow-hidden rounded-[16px] ${r.wide ? "max-w-[749px] lg:w-[749px]" : "max-w-[400px] lg:w-[400px]"}`}
      style={{ aspectRatio: r.ratio }}
      initial={{ opacity: 0, x: r.side === "left" ? -48 : 48, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={`/images/about/${r.img}.png`}
        alt=""
        aria-hidden
        fill
        sizes="(max-width:1000px) 100vw, 500px"
        className="object-cover"
      />
      {r.overlay && (
        <span className="absolute bottom-4 right-4 text-[13px] leading-tight text-black">
          {r.overlay}
        </span>
      )}
    </motion.div>
  );
  const cap = (
    <motion.p
      className="shrink-0 text-center text-[17px] font-semibold leading-[1.8] text-black lg:text-left lg:text-[18px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      {r.caption}
    </motion.p>
  );
  // compact image+text group, pushed to the left or right side of the row (zig-zag).
  // Mobile: always image-first (flex-col / flex-col-reverse) + centered.
  return (
    <div
      className={`flex justify-center ${r.side === "right" ? "lg:justify-end" : "lg:justify-start"}`}
    >
      <div
        className={`flex items-center gap-8 lg:flex-row lg:items-center lg:gap-12 ${r.side === "right" ? "flex-col-reverse" : "flex-col"}`}
      >
        {r.side === "left" ? (
          <>
            {img}
            {cap}
          </>
        ) : (
          <>
            {cap}
            {img}
          </>
        )}
      </div>
    </div>
  );
}

export default function OriginStorySection() {
  return (
    <section id="story" className="bg-white py-20 md:py-28">
      <Container className="flex flex-col gap-20">
        <WordReveal
          as="h2"
          className="mx-auto max-w-[1238px] text-center text-[28px] font-bold leading-[1.5] text-black md:text-[48px] md:leading-[1.8]"
        >
          We didn&apos;t discover a{" "}
          <span className="font-heading text-brand">software problem.</span> We
          discovered an industry waiting to be understood.
        </WordReveal>

        <div className="flex flex-col gap-20 md:gap-24">
          {ROWS.map((r) => (
            <StoryRow key={r.img} r={r} />
          ))}
        </div>

        {/* divider , "That belief became Trikaan." */}
        <div className="flex items-center justify-center gap-5">
          <span className="hidden h-px w-[111px] bg-brand/50 sm:block" />
          <WordReveal as="p" className="font-heading text-[24px] text-brand">
            That belief became Trikaan.
          </WordReveal>
          <span className="hidden h-px w-[111px] bg-brand/50 sm:block" />
        </div>

        {/* closing , [text + image] group on the left, big question on the right */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
            <p className="max-w-[240px] shrink-0 text-center text-[17px] font-semibold leading-[1.8] text-black lg:text-left lg:text-[18px]">
              Today, every platform we build starts with{" "}
              <span className="text-brand">one question:</span>
            </p>
            <motion.div
              className="relative w-full shrink-0 overflow-hidden rounded-[16px] lg:w-[400px]"
              style={{ aspectRatio: "400/211" }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/about/origin-12.png"
                alt=""
                aria-hidden
                fill
                sizes="(max-width:1000px) 100vw, 400px"
                className="object-cover"
              />
            </motion.div>
          </div>
          <WordReveal
            as="p"
            className="max-w-[529px] text-center font-heading text-[24px] leading-[1.7] text-brand lg:text-left md:text-[32px]"
          >
            How should this industry work if technology had no limitations?
          </WordReveal>
        </div>
      </Container>
    </section>
  );
}
