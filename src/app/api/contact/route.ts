import { NextResponse } from "next/server";
import { SERVICE_OPTIONS } from "@/lib/defaults";
import { hasDb, serviceClient } from "@/lib/supabase/server";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s\-()]{7,20}$/;

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot and minimum fill time: bots fill hidden fields and submit instantly.
  if (data.website) return NextResponse.json({ ok: true });
  const started = Number(data.startedAt) || 0;
  if (started && Date.now() - started < 2500) return NextResponse.json({ error: "Please try again." }, { status: 429 });

  const name = String(data.name ?? "").trim();
  const contact = String(data.contact ?? "").trim();
  const service = String(data.service ?? "").trim();
  const details = String(data.details ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 100) errors.name = "Enter your full name.";
  if (!(EMAIL.test(contact) || PHONE.test(contact)) || contact.length > 120) errors.contact = "Enter a valid email or WhatsApp number.";
  if (!SERVICE_OPTIONS.includes(service)) errors.service = "Choose a service.";
  if (details.length < 10 || details.length > 3000) errors.details = "Tell us a little about the project (at least 10 characters).";
  if (Object.keys(errors).length) return NextResponse.json({ error: "Please fix the highlighted fields.", errors }, { status: 400 });

  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Cloudflare Turnstile
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const token = String(data.turnstileToken ?? "");
    if (!token) return NextResponse.json({ error: "Please complete the spam check." }, { status: 400 });
    const form = new URLSearchParams({ secret, response: token, remoteip: ip });
    const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
    const result = (await check.json()) as { success?: boolean };
    if (!result.success) return NextResponse.json({ error: "Spam check failed. Reload the page and try again." }, { status: 400 });
  }

  if (!hasDb() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "The inquiry system is not connected yet. Please use WhatsApp or email." }, { status: 503 });
  }

  const db = serviceClient();
  const ipHash = await sha256(`${process.env.IP_HASH_SALT || "sch"}:${ip}`);

  // Rate limit: 5 inquiries per 10 minutes per visitor.
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await db.from("inquiries").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", since);
  if ((count ?? 0) >= 5) return NextResponse.json({ error: "Too many messages. Please wait a few minutes." }, { status: 429 });

  const { error } = await db.from("inquiries").insert({ name, contact, service, details, ip_hash: ipHash });
  if (error) {
    console.error("[contact] insert failed", error);
    return NextResponse.json({ error: "We could not save your message. Please use WhatsApp or email." }, { status: 500 });
  }

  // Email to the company inbox (inquiry is already safely stored above).
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const to = process.env.CONTACT_TO_EMAIL || "sudancreativehubsch@gmail.com";
    const from = process.env.RESEND_FROM || "Sudan Creative Hub <onboarding@resend.dev>";
    const html = `<h2>New website inquiry</h2><p><b>Name:</b> ${esc(name)}</p><p><b>Contact:</b> ${esc(contact)}</p><p><b>Service:</b> ${esc(service)}</p><p><b>Details:</b></p><p>${esc(details).replace(/\n/g, "<br>")}</p>`;
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from, to: [to], subject: `New inquiry: ${service} (${name})`, html,
          ...(EMAIL.test(contact) ? { reply_to: contact } : {}),
        }),
      });
      if (!r.ok) console.error("[contact] email failed", r.status, await r.text());
    } catch (e) {
      console.error("[contact] email error", e);
    }
  }

  return NextResponse.json({ ok: true });
}
