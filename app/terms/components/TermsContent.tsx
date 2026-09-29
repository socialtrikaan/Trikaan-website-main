"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import TableOfContents from "./TableOfContents";

const revealV = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const clauseViewport = { once: true, amount: 0.25 } as const;

// Clause data extracted verbatim from Figma (node 1:1647). ToC labels differ from
// clause titles in a few places , both preserved exactly as designed.
type Section = {
  id: string;
  toc: string;
  num: string;
  title: string;
  intro?: string;
  body?: string;
  subs?: { n: string; text: string }[];
};

const sections: Section[] = [
  {
    id: "acceptance-of-terms",
    toc: "1. Acceptance of Terms",
    num: "01",
    title: "Acceptance of Terms",
    body: "By accessing our web platforms, logging into your administrative dashboard, initiating API connections, or executing an associated Order Form with Trikaan, you acknowledge that you have read, understood, and agreed to be bound completely by these Terms. If you do not accept these conditions, you must immediately suspend all access and use of our platform.",
  },
  {
    id: "use-of-services",
    toc: "2. Use of Services",
    num: "02",
    title: "Use of Services",
    intro:
      "Trikaan grants you a non-exclusive, non-transferable, revocable license to access our platform applications strictly in accordance with your registered tier or agreed corporate SLAs:",
    subs: [
      {
        n: "2.1",
        text: "Prohibited Exploits: You agree not to reverse-engineer, scan vulnerability thresholds, decompile, or scrape database systems supporting our software applications.",
      },
      {
        n: "2.2",
        text: "Operational Responsibility: You assume complete liability for all logistics data, weight manifests, purchasing approvals, and transactional contracts executed through your user seats.",
      },
      {
        n: "2.3",
        text: "API Usage: Automated system requests via our integrations must respect our standard rate limits. Abuse of API endpoints may result in immediate rate-throttling or account suspension.",
      },
    ],
  },
  {
    id: "user-accounts",
    toc: "3. User Accounts & Control",
    num: "03",
    title: "User Accounts & Security Controls",
    intro:
      "To operate within our multi-app ecosystems, administrators and operators must maintain verified credential parameters:",
    subs: [
      {
        n: "3.1",
        text: "Credential Guarding: You are solely responsible for protecting password tokens and enforcing Multi-Factor Authentication (MFA) across your operator group.",
      },
      {
        n: "3.2",
        text: "Operational Accuracy: You guarantee that all registration data, corporate credentials, tax identifiers, and phone numbers remain accurate and continuously updated.",
      },
    ],
  },
  {
    id: "intellectual-property",
    toc: "4. Intellectual Property Rights",
    num: "04",
    title: "Intellectual Property Rights",
    intro:
      "All proprietary algorithms, platform architecture, database designs, branding elements, graphics, and underlying source code compiled by Trikaan remain the exclusive property of Trikaan Solutions Pvt. Ltd.:",
    subs: [
      {
        n: "4.1",
        text: "User Material ownership: You retain full, exclusive ownership of any raw logs, transaction files, supply chain data, or trade info uploaded to your database instances.",
      },
      {
        n: "4.2",
        text: "Platform Modifications: Any feedback, consulting recommendations, or operational customizations integrated based on your request become part of Trikaan’s global intellectual property unless explicitly protected in a signed Master Services Agreement (MSA).",
      },
    ],
  },
  {
    id: "limitation-of-liability",
    toc: "5. Limitation of Liability",
    num: "05",
    title: "Limitation of Liability",
    body: "To the maximum extent permitted by applicable laws, Trikaan Solutions Pvt. Ltd. shall not be held liable for any indirect, incidental, punitive, or consequential damages. This includes, without limitation, lost factory revenue, cargo delays, transport operational halts, data corruption, or weighbridge tracking errors resulting from your reliance on our platform workflows. Our cumulative aggregate liability for any direct service claim shall not exceed the total fees paid by you to Trikaan during the preceding twelve (12) month cycle.",
  },
  {
    id: "indemnification",
    toc: "6. Indemnification Agreements",
    num: "06",
    title: "Indemnification",
    body: "You agree to defend, indemnify, and hold harmless Trikaan, its directors, systems engineers, and parent corporate affiliates from and against any legal claims, regulatory fines, operational expenses, or damages arising out of your misuse of our applications, supply chain transaction failures, or violations of applicable regulatory compliance codes.",
  },
  {
    id: "service-termination",
    toc: "7. Service Termination",
    num: "07",
    title: "Service Termination",
    body: "We reserve the right to suspend or permanently terminate your administrative dashboard access immediately and without prior warning if you violate material clauses of these terms, breach financial payment cycles, or perform actions that threaten our platform's cloud security matrix.",
  },
  {
    id: "governing-law",
    toc: "8. Governing Law",
    num: "08",
    title: "Governing Law",
    body: "These Terms and Conditions shall be governed by, interpreted, and construed strictly in accordance with the laws of the Republic of India. Any litigation, dispute, or operational arbitration arising out of your relationship with Trikaan shall be subject to the exclusive jurisdiction of the competent courts located in Bengaluru, Karnataka, India.",
  },
  {
    id: "changes-to-terms",
    toc: "9. Changes to Terms",
    num: "09",
    title: "Changes to Terms",
    body: "We reserve the exclusive right to modify or replace these corporate terms at any time. If a revision is deemed material, we will utilize reasonable operational avenues to provide at least thirty (30) days notice prior to the execution of updated conditions.",
  },
  {
    id: "contact-information",
    toc: "10. Contact Information",
    num: "10",
    title: "Contact Information",
    intro:
      "For any clarification, SLA inquiries, contract reviews, or general terms updates, you are encouraged to contact our legal division directly:",
  },
];

export default function TermsContent() {
  return (
    <section>
      <Container className="flex flex-col gap-12 pb-[100px] pt-20 lg:flex-row lg:gap-20">
        <TableOfContents
          items={sections.map((s) => ({ id: s.id, label: s.toc }))}
        />

        <div className="flex min-w-0 max-w-[800px] flex-1 flex-col gap-12">
          <motion.p
            className="text-[16px] leading-[1.8] text-ink-600"
            variants={revealV}
            initial="hidden"
            whileInView="show"
            viewport={clauseViewport}
          >
            Please read these Terms and Conditions carefully. These terms
            constitute a legally binding agreement between you (whether acting
            individually or representing an corporate entity) and Trikaan
            Solutions Pvt. Ltd., governing your usage, administration, API
            access, and operational deployment of our enterprise logistics,
            purchase, and manufacturing software platforms.
          </motion.p>

          {sections.map((s) => (
            <motion.div
              key={s.id}
              id={s.id}
              className="flex scroll-mt-24 flex-col gap-4"
              variants={revealV}
              initial="hidden"
              whileInView="show"
              viewport={clauseViewport}
            >
              <div className="flex items-baseline gap-3 text-[22px]">
                <span className="font-heading text-brand">{s.num}</span>
                <h2 className="min-w-0 flex-1 font-bold text-ink">{s.title}</h2>
              </div>

              <div className="flex flex-col gap-3 pl-8">
                {s.intro && (
                  <p className="text-[15px] leading-[1.8] text-ink-600">
                    {s.intro}
                  </p>
                )}

                {s.body && (
                  <p className="text-[15px] leading-[1.8] text-ink-600">
                    {s.body}
                  </p>
                )}

                {s.subs?.map((sub) => (
                  <div key={sub.n} className="flex items-start gap-3">
                    <span className="text-[15px] font-semibold text-ink">
                      {sub.n}
                    </span>
                    <p className="min-w-0 flex-1 text-[15px] leading-[1.8] text-ink-600">
                      {sub.text}
                    </p>
                  </div>
                ))}

                {s.id === "contact-information" && (
                  <div className="flex flex-col gap-2 rounded-[8px] bg-surface-150 p-5">
                    <p className="text-[15px] font-bold text-ink">
                      Trikaan Solutions Pvt. Ltd.
                    </p>
                    <p className="text-[14px] text-ink-600">
                      Attention: Legal &amp; Corporate Advisory Team
                    </p>
                    <p className="text-[14px] text-ink-600">
                      657/23, 13 Cross, Asha Township, Doddagubbi, Hennur Road,
                      Bangalore 560077, India
                    </p>
                    <p className="text-[14px] font-semibold text-brand">
                      info@trikaan.com
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
