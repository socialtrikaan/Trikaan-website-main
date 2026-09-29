"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import PolicyToc from "./PolicyToc";

const revealV = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const clauseViewport = { once: true, amount: 0.25 } as const;

type SubItem = { n: string; text: string };
type Clause = {
  id: string;
  num: string;
  tocLabel: string;
  title: string;
  intro?: string;
  items?: SubItem[];
  address?: { name: string; role: string; location: string; email: string };
};

const intro =
  "At Trikaan Solutions Pvt. Ltd., we understand that your data privacy is foundational to building the trust required in modern industrial partnerships. This Privacy Policy describes how we collect, use, share, secure, and safeguard your corporate and personal information when you utilize our SaaS applications, platforms, websites, and associated consulting workflows.";

const clauses: Clause[] = [
  {
    id: "information-we-collect",
    num: "01",
    tocLabel: "1. Information We Collect",
    title: "Information We Collect",
    intro:
      "We collect information to deliver efficient, secure, and operational enterprise software to your organization. This includes information you provide directly, data generated during your platform usage, and metrics we gather during consulting and system integration phases:",
    items: [
      {
        n: "1.1",
        text: "Personal Data: Name, business email address, job title, corporate phone number, and employer details provided when creating administrator or operational user accounts.",
      },
      {
        n: "1.2",
        text: "Operational Data: Purchase logs, inventory transactions, supply chain records, vehicle weights, cargo manifests, and audit tracking timestamps required to operate our unified multi-app suite.",
      },
      {
        n: "1.3",
        text: "Technical Data: IP addresses, browser specifications, access logs, terminal device information, and diagnostic cookies needed to prevent unauthorized access and measure system stability.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    num: "02",
    tocLabel: "2. How We Use Information",
    title: "How We Use Your Information",
    intro:
      "Your data is processed strictly to maintain operational excellence, provide secure connections across supply chains, and power real-time updates across Trikaan applications:",
    items: [
      {
        n: "2.1",
        text: "To configure, run, and continuously optimize our SaaS platform and individual connected apps.",
      },
      {
        n: "2.2",
        text: "To facilitate seamless transaction coordination between commodity processors, manufacturers, and transport logistics partners.",
      },
      {
        n: "2.3",
        text: "To generate analytical business intelligence, system performance reports, and secure audit trails for system administrators.",
      },
      {
        n: "2.4",
        text: "To identify, investigate, and mitigate cybersecurity incidents, operational discrepancies, and general platform system abuse.",
      },
    ],
  },
  {
    id: "data-sharing-disclosure",
    num: "03",
    tocLabel: "3. Data Sharing & Disclosure",
    title: "Data Sharing & Disclosure",
    intro:
      "We do not sell, rent, or trade your operational or personal data. We only share information in the following limited circumstances:",
    items: [
      {
        n: "3.1",
        text: "With authorized Sub-Processors: Cloud hosting providers, database managers, and transactional email infrastructure partners working under strict non-disclosure agreements.",
      },
      {
        n: "3.2",
        text: "Operational Stakeholders: Sharing specific dispatch metrics with gate logs, weighbridges, and warehousing agents explicitly linked in your workflow parameters.",
      },
      {
        n: "3.3",
        text: "Legal Compliance: When mandated by applicable Indian laws, judicial orders, or to protect the safety and core security of our users and services.",
      },
    ],
  },
  {
    id: "data-security-protocols",
    num: "04",
    tocLabel: "4. Data Security Protocols",
    title: "Data Security & Storage",
    intro:
      "Our infrastructure is engineered around robust cybersecurity safeguards to preserve operational continuity. We utilize multi-layered encryption protocols at rest and in transit. All client database clusters are isolated securely, backed up automatically, and hosted on secure local servers within India unless configured otherwise in custom Enterprise SLAs.",
  },
  {
    id: "cookies",
    num: "05",
    tocLabel: "5. Cookies & Tracking",
    title: "Cookies & Tracking Technologies",
    intro:
      "We utilize essential technical cookies to manage user session states, verify identity tokens, and store configuration preferences across our browser dashboard portals. We do not run intrusive ad-targeting pixels or cross-site tracking scripts.",
  },
  {
    id: "your-rights-choices",
    num: "06",
    tocLabel: "6. Your Rights & Choices",
    title: "Your Rights & Choices",
    intro:
      "Depending on your location and specific corporate agreements, your users retain distinct control over their information:",
    items: [
      {
        n: "6.1",
        text: "Right to Access: Request a comprehensive export of all personal metadata stored under your operator profile.",
      },
      {
        n: "6.2",
        text: "Right to Correction: Instantly correct, update, or append outdated contact info and administrative access scopes.",
      },
      {
        n: "6.3",
        text: "Right to Erasure: Request permanent deletion of user profile details (subject to system logs required for legally binding tax and financial audits).",
      },
    ],
  },
  {
    id: "childrens-privacy",
    num: "07",
    tocLabel: "7. Children's Privacy",
    title: "Children's Privacy",
    intro:
      "Our software platforms, SaaS products, and technical consultation services are built exclusively for business-to-business enterprise applications and adult professionals. We do not knowingly compile, request, or retain data from individuals under 18 years of age.",
  },
  {
    id: "changes-to-policy",
    num: "08",
    tocLabel: "8. Changes to Policy",
    title: "Changes to This Policy",
    intro:
      "We update this policy periodically to reflect security upgrades, operational additions to our app ecosystems, and shifting regulatory frameworks. The updated effective date at the top of the document will indicate when modifications have taken place.",
  },
  {
    id: "contact-us",
    num: "09",
    tocLabel: "9. Contact Us",
    title: "Contact Us",
    intro:
      "For security compliance reports, data access requests, or regulatory privacy inquiries, you can reach our designated Privacy Officer at:",
    address: {
      name: "Trikaan Solutions Private Limited",
      role: "Compliance Officer , Legal & Privacy Division",
      location:
        "657/23, 13 Cross, Asha Township, Doddagubbi, Hennur Road, Bangalore 560077, India",
      email: "info@trikaan.com",
    },
  },
];

export default function PolicyContent() {
  return (
    <section>
      <Container className="flex flex-col gap-12 pt-[80px] pb-[100px] lg:flex-row lg:gap-20">
        <aside className="flex flex-col gap-6 lg:sticky lg:top-[100px] lg:w-[280px] lg:shrink-0 lg:self-start">
          <p className="text-[12px] font-bold uppercase text-ink">
            On This Page
          </p>
          <PolicyToc
            items={clauses.map((c) => ({ id: c.id, label: c.tocLabel }))}
          />
          <div className="flex flex-col gap-4 rounded-input border border-border bg-surface-150 p-6">
            <p className="text-[16px] font-bold text-ink">Have Questions?</p>
            <p className="text-[13px] leading-[1.5] text-ink-600">
              Our compliance &amp; legal teams are ready to help you understand
              your data footprint.
            </p>
            <p className="text-[14px] font-semibold text-brand">
              info@trikaan.com
            </p>
          </div>
        </aside>

        <div className="flex min-w-0 max-w-[800px] flex-1 flex-col gap-12">
          <motion.p
            className="text-[16px] leading-[1.8] text-ink-600"
            variants={revealV}
            initial="hidden"
            whileInView="show"
            viewport={clauseViewport}
          >
            {intro}
          </motion.p>
          {clauses.map((c) => (
            <motion.section
              key={c.id}
              id={c.id}
              className="flex scroll-mt-[100px] flex-col gap-4"
              variants={revealV}
              initial="hidden"
              whileInView="show"
              viewport={clauseViewport}
            >
              <div className="flex items-baseline gap-3 text-[22px]">
                <span className="font-heading text-brand">{c.num}</span>
                <h2 className="flex-1 font-bold text-ink">{c.title}</h2>
              </div>
              <div className="flex flex-col gap-3 pl-8 text-[15px]">
                {c.intro && (
                  <p className="leading-[1.8] text-ink-600">{c.intro}</p>
                )}
                {c.items && (
                  <div className="flex flex-col gap-3">
                    {c.items.map((it) => (
                      <div key={it.n} className="flex gap-3">
                        <span className="font-semibold text-ink">{it.n}</span>
                        <p className="flex-1 leading-[1.8] text-ink-600">
                          {it.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {c.address && (
                  <div className="flex flex-col gap-2 rounded-[8px] bg-surface-150 p-5">
                    <p className="text-[15px] font-bold text-ink">
                      {c.address.name}
                    </p>
                    <p className="text-[14px] text-ink-600">{c.address.role}</p>
                    <p className="text-[14px] text-ink-600">
                      {c.address.location}
                    </p>
                    <p className="text-[14px] font-semibold text-brand">
                      {c.address.email}
                    </p>
                  </div>
                )}
              </div>
            </motion.section>
          ))}
        </div>
      </Container>
    </section>
  );
}
