import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Resend } from "resend";

// Contact submissions append to data/contacts.json (existing store). Emails sent via
// Resend; missing RESEND_API_KEY or a failed company notification returns 502.
// ponytail: JSON store is the "DB" , swap for a real one if volume grows.
export const runtime = "nodejs";

const STORE = path.join(process.cwd(), "data", "contacts.json");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEDUP_MS = 5 * 60 * 1000; // same email+message within 5 min = duplicate

type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  company?: string;
  role?: string;
  interests?: string[];
  preferredTime?: string;
  date: string;
};

const esc = (s: string) =>
  s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!);

function companyEmail(c: Contact) {
  const row = (k: string, v?: string) =>
    v
      ? `<tr><td style="padding:4px 12px 4px 0;color:#6b7280">${k}</td><td style="padding:4px 0;color:#0f1117"><b>${esc(v)}</b></td></tr>`
      : "";
  return `<div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <div style="background:#022da8;color:#fff;padding:20px 24px;font-size:18px;font-weight:700">New Inquiry , Trikaan</div>
    <div style="padding:24px"><table style="border-collapse:collapse;font-size:14px">
      ${row("Name", c.name)}${row("Email", c.email)}${row("Phone", c.phone)}${row("Company", c.company)}${row("Role", c.role)}${row("Interests", c.interests?.join(", "))}${row("Preferred demo", c.preferredTime)}
    </table>
    <p style="margin:16px 0 4px;color:#6b7280;font-size:13px">Message</p>
    <p style="margin:0;color:#0f1117;font-size:15px;line-height:1.6">${esc(c.message)}</p>
    </div></div>`;
}

function userEmail(c: Contact) {
  return `<div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <div style="background:#022da8;color:#fff;padding:20px 24px;font-size:18px;font-weight:700">Thanks, ${esc(c.name)} 👋</div>
    <div style="padding:24px;color:#0f1117;font-size:15px;line-height:1.7">
      <p style="margin:0 0 12px">We received your inquiry and our team will reply within one business day.</p>
      <p style="margin:0 0 12px;color:#6b7280;font-size:13px">Your message:</p>
      <p style="margin:0 0 20px;padding:12px 16px;background:#f5f8ff;border-radius:8px">${esc(c.message)}</p>
      <p style="margin:0">, The Trikaan Team</p>
    </div></div>`;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Name, a valid email, and a message are required." },
      { status: 422 },
    );
  }

  const entry: Contact = {
    id: Date.now(),
    name,
    phone,
    email,
    message,
    company: body.company ? String(body.company).trim() : undefined,
    role: body.role ? String(body.role).trim() : undefined,
    interests: Array.isArray(body.interests)
      ? body.interests.map(String)
      : undefined,
    preferredTime: body.preferredTime
      ? String(body.preferredTime).trim()
      : undefined,
    date: new Date().toISOString(),
  };

  // ponytail: local JSON store is a dev convenience. Production (serverless) has a
  // read-only filesystem, so read + write are best-effort , a FS failure must never
  // 500 the request or lose the lead (email below is the real delivery path).
  let list: Contact[] = [];
  try {
    list = JSON.parse(await fs.readFile(STORE, "utf8"));
    if (!Array.isArray(list)) list = [];
  } catch {
    list = [];
  }

  // prevent duplicate submissions (same email + message within window)
  const dup = list.some(
    (c) =>
      c.email === email && c.message === message && entry.id - c.id < DEDUP_MS,
  );
  if (dup)
    return NextResponse.json(
      { error: "Looks like you already sent this , we're on it." },
      { status: 409 },
    );

  list.push(entry);
  try {
    await fs.writeFile(STORE, JSON.stringify(list, null, 2));
  } catch (e) {
    console.error("Contact store write skipped (read-only FS?):", e);
  }

  // Email is the real delivery path in production (read-only FS), so a failed
  // company notification must not report success. resend.emails.send() does NOT
  // throw on API errors , it returns { data, error }, so check error explicitly.
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "Trikaan <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO || email;
  console.log("[contact] env", {
    hasResendKey: Boolean(key), // never log the key itself
    hasResendFrom: Boolean(process.env.RESEND_FROM),
    hasContactTo: Boolean(process.env.CONTACT_TO),
    from,
    to,
  });

  const fail = () =>
    NextResponse.json(
      { error: "We couldn't send your message right now. Please try again or email us directly." },
      { status: 502 },
    );

  if (!key) {
    console.error("[contact] RESEND_API_KEY is not set , no email sent");
    return fail();
  }

  try {
    const resend = new Resend(key);
    const [company, user] = await Promise.all([
      resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `New inquiry from ${name}`,
        html: companyEmail(entry),
      }),
      resend.emails.send({
        from,
        to: email,
        subject: "We got your inquiry , Trikaan",
        html: userEmail(entry),
      }),
    ]);
    console.log("[contact] resend company", { id: company.data?.id, error: company.error });
    console.log("[contact] resend confirmation", { id: user.data?.id, error: user.error });
    // ponytail: only the company notification is fatal , a failed confirmation to the
    // visitor (e.g. unverified sender domain) is logged but the lead still reached us.
    if (company.error) return fail();
  } catch (e) {
    console.error("[contact] resend threw:", e instanceof Error ? e.message : e);
    return fail();
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
