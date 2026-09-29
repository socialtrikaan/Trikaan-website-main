"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, CheckCircle2, X } from "lucide-react";
import Container from "@/components/ui/Container";
import {
  hoverButton,
  tapButton,
  staggerContainer,
  fadeUp,
  viewportOnce,
} from "@/lib/animations";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";
import { SOCIALS } from "@/lib/socials";

// Figma home "Get in touch" section (node 1:417): centered header + two columns
// (contact form / contact details). Form posts to the shared /api/contact endpoint.
const label = "text-[13px] font-semibold text-ink";
const field =
  "w-full rounded-[10px] border border-border bg-white px-4 py-[14px] text-[15px] text-ink placeholder:text-muted-7 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";

type Status = "idle" | "submitting" | "success" | "error";

const NAME_RE = /^[A-Za-z][A-Za-z\s.'-]*$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(name: string, raw: string): string {
  const v = raw.trim();
  switch (name) {
    case "name":
      if (!v) return "Name is required.";
      if (!NAME_RE.test(v)) return "Letters only , no numbers or symbols.";
      if (v.replace(/[^A-Za-z]/g, "").length < 2)
        return "Enter your full name.";
      return "";
    case "email":
      if (!v) return "Work email is required.";
      if (!EMAIL_RE.test(v)) return "Enter a valid email address.";
      return "";
    case "message":
      if (!v) return "Please write a short message.";
      if (v.length < 10) return "Please add a little more detail.";
      return "";
    default:
      return "";
  }
}

const sanitizeName = (e: React.FormEvent<HTMLInputElement>) => {
  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s.'-]/g, "");
};

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg ? (
        <motion.span
          key="err"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-[12px] font-medium text-red-600"
        >
          {msg}
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
}

export default function GetInTouch() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
  };
  const clearError = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.currentTarget;
    setErrors((p) => (p[name] ? { ...p, [name]: "" } : p));
  };
  const errCls = (n: string) =>
    `${field} ${errors[n] ? "!border-red-500 focus:!border-red-500 focus:!ring-red-500" : ""}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const fields = ["name", "email", "message"] as const;
    const nextErrors: Record<string, string> = {};
    for (const f of fields)
      nextErrors[f] = validateField(f, String(fd.get(f) ?? ""));
    setErrors(nextErrors);
    const firstBad = fields.find((f) => nextErrors[f]);
    if (firstBad) {
      (form.elements.namedItem(firstBad) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("submitting");
    setError("");
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error ?? "Something went wrong. Please try again.",
        );
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section className="bg-white">
      <Container className="flex flex-col items-center gap-14 py-25">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-[13px] font-semibold uppercase text-muted-6">
            Get in touch
          </p>
          <WordReveal
            as="h2"
            className="max-w-[1022px] text-[32px] font-semibold leading-[1.1] text-ink-800 md:text-[44px] md:leading-[56px]"
          >
            Let&apos;s talk about{" "}
            <span className="font-bold">your operations.</span>
            <br />
            <span className="font-heading text-brand">
              We Love Talking Tech and Business.
            </span>
          </WordReveal>
          <LineReveal
            as="p"
            className="max-w-[560px] text-[17px] leading-[1.7] text-ink-600"
          >
            Whether you&apos;re ready to onboard or just exploring , drop us a
            message. We respond within one business day.
          </LineReveal>
        </div>

        {/* Two columns */}
        <div className="flex w-full max-w-[960px] flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            className="flex flex-col gap-5 lg:w-[460px]"
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.label variants={fadeUp} className="flex flex-col gap-2">
              <span className={label}>Name</span>
              <input
                suppressHydrationWarning
                name="name"
                required
                minLength={2}
                maxLength={60}
                autoComplete="name"
                placeholder="Your full name"
                aria-invalid={!!errors.name}
                onInput={sanitizeName}
                onChange={clearError}
                onBlur={onBlur}
                className={`h-[52px] ${errCls("name")}`}
              />
              <FieldError msg={errors.name} />
            </motion.label>
            <motion.label variants={fadeUp} className="flex flex-col gap-2">
              <span className={label}>Work email</span>
              <input
                suppressHydrationWarning
                name="email"
                type="email"
                required
                maxLength={120}
                autoComplete="email"
                placeholder="you@company.com"
                aria-invalid={!!errors.email}
                onChange={clearError}
                onBlur={onBlur}
                className={`h-[52px] ${errCls("email")}`}
              />
              <FieldError msg={errors.email} />
            </motion.label>
            <motion.label variants={fadeUp} className="flex flex-col gap-2">
              <span className={label}>Message</span>
              <textarea
                suppressHydrationWarning
                name="message"
                required
                minLength={10}
                maxLength={1000}
                placeholder="Tell us about your procurement challenges..."
                aria-invalid={!!errors.message}
                onChange={clearError}
                onBlur={onBlur}
                className={`h-[130px] resize-none ${errCls("message")} !py-4`}
              />
              <FieldError msg={errors.message} />
            </motion.label>

            <AnimatePresence mode="wait">
              {status === "error" && (
                <motion.p
                  key="err"
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden rounded-[10px] bg-tint-amber p-3 text-[14px] text-ink"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              suppressHydrationWarning
              type="submit"
              disabled={status === "submitting"}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              whileHover={hoverButton}
              whileTap={tapButton}
              className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-brand text-[15px] font-semibold text-white transition-colors hover:bg-brand-bright disabled:opacity-60"
            >
              {status === "submitting" && (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              )}
              {status === "submitting" ? "Sending…" : "Send message"}
            </motion.button>
          </motion.form>

          {/* Details */}
          <motion.div
            className="flex flex-col gap-9 pt-2 lg:w-[340px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.13 }}
          >
            <div className="flex flex-col gap-2">
              <p className={label}>Email</p>
              <p className="text-[16px] text-ink-600">info@trikaan.com</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className={label}>Phone</p>
              <p className="text-[16px] text-ink-600">+91 90362 22022</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className={label}>Office</p>
              <p className="text-[16px] leading-[1.6] text-ink-600">
                657/23, 13 Cross, Asha Township, Doddagubbi,
                <br />
                Hennur Road, Bangalore 560077, India
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-3">
              <p className={label}>Follow us</p>
              <div className="flex gap-3">
                {SOCIALS.map(({ label: l, href, Icon }) => (
                  <a
                    key={l}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={l}
                    className="flex size-10 items-center justify-center rounded-[20px] bg-surface-gray text-ink-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-tint-blue hover:text-brand"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* success modal */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
              onClick={() => setStatus("idle")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10 flex w-full max-w-[420px] flex-col items-center gap-4 rounded-[20px] bg-white p-8 text-center shadow-[0_40px_100px_-20px_rgba(3,66,253,0.4)]"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
            >
              <button
                type="button"
                onClick={() => setStatus("idle")}
                aria-label="Close"
                className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-surface-150 hover:text-ink"
              >
                <X size={18} />
              </button>
              <motion.span
                className="flex size-16 items-center justify-center rounded-full bg-tint-green text-success-dark"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 18,
                  delay: 0.07,
                }}
              >
                <CheckCircle2 size={36} strokeWidth={2.2} />
              </motion.span>
              <h3 className="font-heading text-[26px] text-brand">
                Message sent!
              </h3>
              <p className="text-[15px] leading-[1.6] text-ink-600">
                Thanks for reaching out. We&apos;ll reply within one business
                day.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-2 rounded-[8px] bg-brand px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-brand-bright"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
