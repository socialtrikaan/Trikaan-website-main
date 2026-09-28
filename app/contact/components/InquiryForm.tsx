"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Loader2, CheckCircle2, X } from "lucide-react";
import { hoverButton, tapButton } from "@/lib/animations";

// fields reveal one after another (the whole section's rise is handled by the page wrapper)
const formV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
const gridV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fieldLabel = "text-[12px] font-bold uppercase text-ink";
const fieldInput =
  "h-11 w-full rounded-[8px] border border-border bg-white px-3.5 text-[14px] text-ink placeholder:text-muted-7 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";

type Status = "idle" | "submitting" | "success" | "error";

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

const NAME_RE = /^[A-Za-z][A-Za-z\s.'-]*$/;
const PHONE_RE = /^\+?[\d\s-]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// real-world validation per field , returns error message or "" if valid
function validateField(name: string, raw: string): string {
  const v = raw.trim();
  switch (name) {
    case "fullName":
      if (!v) return "Full name is required.";
      if (!NAME_RE.test(v)) return "Letters only , no numbers or symbols.";
      if (v.replace(/[^A-Za-z]/g, "").length < 2)
        return "Enter your full name.";
      return "";
    case "company":
      if (v && v.length < 2) return "Enter a valid company name.";
      return "";
    case "phone": {
      if (!v) return "";
      if (!PHONE_RE.test(v)) return "Digits only (optional leading +).";
      const digits = v.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 15)
        return "Enter a valid phone number.";
      return "";
    }
    case "email":
      if (!v) return "Email address is required.";
      if (!EMAIL_RE.test(v)) return "Enter a valid email address.";
      return "";
    default:
      return "";
  }
}

// live input restriction as the user types
const sanitizeName = (e: React.FormEvent<HTMLInputElement>) => {
  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s.'-]/g, "");
};
const sanitizePhone = (e: React.FormEvent<HTMLInputElement>) => {
  e.currentTarget.value = e.currentTarget.value.replace(/[^\d+\s-]/g, "");
};

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };
  const clearError = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.currentTarget;
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };
  const errCls = (n: string) =>
    `${fieldInput} ${errors[n] ? "!border-red-500 focus:!border-red-500 focus:!ring-red-500" : ""}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // validate all fields up front , abort + focus first invalid one
    const fields = ["fullName", "company", "phone", "email"] as const;
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
    const name = String(fd.get("fullName") ?? "");
    const company = String(fd.get("company") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const email = String(fd.get("email") ?? "");
    const payload = {
      name,
      company,
      phone,
      email,
      // server requires a non-empty message , synthesize one from the inquiry details
      message: `Demo / inquiry request${company ? ` from ${company}` : ""}${phone ? ` · Phone: ${phone}` : ""}.`,
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
    <>
      <motion.form
        onSubmit={onSubmit}
        className="relative flex flex-1 flex-col gap-6 self-start rounded-[24px] border border-border bg-white p-8 md:p-10"
        variants={formV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.h2
          variants={itemV}
          className="font-heading text-[36px] text-brand"
        >
          Inquiry Form
        </motion.h2>

        {/* 2 rows × 2 fields */}
        <motion.div
          variants={gridV}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          <motion.label variants={itemV} className="flex flex-col gap-1.5">
            <span className={fieldLabel}>Full Name</span>
            <input
              suppressHydrationWarning
              name="fullName"
              required
              minLength={2}
              maxLength={60}
              inputMode="text"
              autoComplete="name"
              placeholder="John Doe"
              aria-invalid={!!errors.fullName}
              onInput={sanitizeName}
              onChange={clearError}
              onBlur={onBlur}
              className={errCls("fullName")}
            />
            <FieldError msg={errors.fullName} />
          </motion.label>
          <motion.label variants={itemV} className="flex flex-col gap-1.5">
            <span className={fieldLabel}>Company</span>
            <input
              suppressHydrationWarning
              name="company"
              maxLength={80}
              autoComplete="organization"
              placeholder="Manufacturing Corp"
              aria-invalid={!!errors.company}
              onChange={clearError}
              onBlur={onBlur}
              className={errCls("company")}
            />
            <FieldError msg={errors.company} />
          </motion.label>
          <motion.label variants={itemV} className="flex flex-col gap-1.5">
            <span className={fieldLabel}>Work Phone</span>
            <input
              suppressHydrationWarning
              name="phone"
              type="tel"
              inputMode="tel"
              maxLength={17}
              autoComplete="tel"
              placeholder="+91 XXXXX XXXXX"
              aria-invalid={!!errors.phone}
              onInput={sanitizePhone}
              onChange={clearError}
              onBlur={onBlur}
              className={errCls("phone")}
            />
            <FieldError msg={errors.phone} />
          </motion.label>
          <motion.label variants={itemV} className="flex flex-col gap-1.5">
            <span className={fieldLabel}>Email Address</span>
            <input
              suppressHydrationWarning
              name="email"
              type="email"
              required
              maxLength={120}
              autoComplete="email"
              placeholder="john@manufacturing.com"
              aria-invalid={!!errors.email}
              onChange={clearError}
              onBlur={onBlur}
              className={errCls("email")}
            />
            <FieldError msg={errors.email} />
          </motion.label>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "error" && (
            <motion.p
              key="err"
              role="alert"
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden rounded-[8px] bg-tint-amber p-4 text-[14px] text-ink"
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
          className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-brand py-3 text-[15px] font-bold text-white transition-colors hover:bg-brand-bright disabled:opacity-60"
        >
          {status === "submitting" && (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          )}
          {status === "submitting" ? "Submitting…" : "Submit Inquiry"}
        </motion.button>
      </motion.form>

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
                  delay: 0.1,
                }}
              >
                <CheckCircle2 size={36} strokeWidth={2.2} />
              </motion.span>
              <h3 className="font-heading text-[26px] text-brand">
                Inquiry received!
              </h3>
              <p className="text-[15px] leading-[1.6] text-ink-600">
                Thanks for reaching out. Our team will be in touch within one
                business day.
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
    </>
  );
}
