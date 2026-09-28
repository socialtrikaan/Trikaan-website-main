"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import WordReveal from "@/components/ui/WordReveal";

// Figma node 327:318 , "The Team Behind the Glory". Header + team sketch with the
// name-flag badges baked in at their exact positions. Image is full-bleed so its
// baked background blends into the section (no visible border/seam).
export default function LeadershipSection() {
  return (
    <section className="bg-gradient-to-b from-[#f6f9ff] to-white">
      <Container className="flex flex-col items-center gap-4 pt-[70px] text-center text-brand">
        <Eyebrow>Leadership</Eyebrow>
        <WordReveal as="h2" className="font-heading text-[40px] md:text-[48px]">
          The Team Behind the Glory
        </WordReveal>
      </Container>

      {/* full-bleed team image , baked bg matches the section gradient */}
      <motion.div
        className="relative mt-10 w-full"
        style={{ aspectRatio: "1440 / 920" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/leadership-labeled.png"
          alt="Trikaan leadership team , Charan, Rohit, Ajay, Amala, Pradeep, Vinod, Sneha and Ram Subba Reddy"
          fill
          sizes="(max-width: 1500px) 100vw, 1500px"
          className="object-contain"
        />
      </motion.div>
    </section>
  );
}
