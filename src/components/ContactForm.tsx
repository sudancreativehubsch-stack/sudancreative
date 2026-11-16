"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICE_OPTIONS } from "@/lib/defaults";
import { waLink } from "@/lib/utils";
import { WhatsAppIcon } from "./Shapes";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

type Errors = Partial<Record<"name" | "contact" | "service" | "details", string>>;

export function ContactForm({ whatsapp }: { whatsapp: string }) {
  const [vals, setVals] = useState({ name: "", contact: "", service: "", details: "", website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const started = useRef(Date.now());
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>("");

  useEffect(() => {
    if (!SITE_KEY) return;
    const mount = () => {
      if (widget.current && window.turnstile && !widgetId.current) {
        widgetId.current = window.turnstile.render(widget.current, {
          sitekey: SITE_KEY, theme: "dark", callback: (t: string) => setToken(t), "expired-callback": () => setToken(""),
        });
      }
    };
    if (window.turnstile) return mount();
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = mount;
    document.head.appendChild(s);
  }, []);

  const set = (k: keyof typeof vals) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setVals((v) => ({ ...v, [k]: e.target.value }));

  const waText = `Hello Sudan Creative Hub, my name is ${vals.name || "..."}. I am interested in: ${vals.service || "your services"}.${vals.details ? `\n\n${vals.details}` : ""}`;

  function validate(): Errors {
    const e: Errors = {};
    if (vals.name.trim().length < 2) e.name = "Enter your full name.";
    const c = vals.contact.trim();
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c) || /^\+?[0-9\s\-()]{7,20}$/.test(c))) e.contact = "Enter a valid email or WhatsApp number.";
    if (!vals.service) e.service = "Choose a service.";
    if (vals.details.trim().length < 10) e.details = "Tell us a little about the project (at least 10 characters).";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    if (SITE_KEY && !token) {
      setState("error");
      setMessage("Please complete the spam check before sending.");
      return;
    }
    setState("sending");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...vals, startedAt: started.current, turnstileToken: token }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(json.errors ?? {});
        setState("error");
        setMessage(json.error ?? "Something went wrong. Please try WhatsApp or email.");
        window.turnstile?.reset(widgetId.current);
        setToken("");
        return;
      }
      setState("sent");
    } catch {
      setState("error");
      setMessage("Network problem. Please try again, or use WhatsApp.");
    }
  }

  if (state === "sent") {
    return (
      <div className="notice notice--ok" role="status">
        <p style={{ margin: 0, fontSize: "1.25rem" }}><b>Thank you, {vals.name.split(" ")[0]}.</b> Your inquiry is with our team and we will reply soon.</p>
        <p style={{ margin: "1rem 0 1.25rem" }}>Want a faster answer? Continue on WhatsApp with your details already filled in.</p>
        <a className="btn btn--black" href={waLink(whatsapp, waText)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  const err = (k: keyof Errors) => (errors[k] ? <span className="err" id={`${k}-err`} role="alert">{errors[k]}</span> : null);
  const inv = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="f-name">Full name</label>
        <input id="f-name" name="name" autoComplete="name" value={vals.name} onChange={set("name")} maxLength={100} required {...inv("name")} />
        {err("name")}
      </div>
      <div className="field">
        <label htmlFor="f-contact">Email or WhatsApp number</label>
        <input id="f-contact" name="contact" autoComplete="email" value={vals.contact} onChange={set("contact")} maxLength={120} required {...inv("contact")} />
        {err("contact")}
      </div>
      <div className="field">
        <label htmlFor="f-service">Service required</label>
        <select id="f-service" name="service" value={vals.service} onChange={set("service")} required {...inv("service")}>
          <option value="">Choose a service</option>
          {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {err("service")}
      </div>
      <div className="field">
        <label htmlFor="f-details">Project details</label>
        <textarea id="f-details" name="details" value={vals.details} onChange={set("details")} maxLength={3000} required {...inv("details")} />
        {err("details")}
      </div>

      {/* Honeypot: hidden from people, filled in by bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Leave this field empty</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={vals.website} onChange={set("website")} />
      </div>

      {SITE_KEY ? <div ref={widget} /> : null}

      {state === "error" && message ? <p className="notice notice--err" role="alert" style={{ margin: 0 }}>{message}</p> : null}

      <div className="btn-row">
        <button className="btn btn--yellow" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending..." : "Send inquiry"}
        </button>
        <a className="btn" href={waLink(whatsapp, waText)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> Message on WhatsApp
        </a>
      </div>
    </form>
  );
}
