"use client";

import { useEffect, useState } from "react";

const KEY = "sch-consent";
const GA = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadAnalytics() {
  if (!GA || document.getElementById("ga-script")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  // Google Consent Mode v2: everything denied except analytics, which the visitor just allowed.
  window.gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA, { anonymize_ip: true });
  const s = document.createElement("script");
  s.id = "ga-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA}`;
  document.head.appendChild(s);
}

/** Cookie banner. Analytics only loads after the visitor accepts. */
export function Consent() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(KEY); } catch { /* storage blocked */ }
    if (stored === "granted") loadAnalytics();
    else if (stored === null && GA) setShown(true);
    const reopen = () => setShown(true);
    window.addEventListener("sch-consent-open", reopen);
    return () => window.removeEventListener("sch-consent-open", reopen);
  }, []);

  const choose = (v: "granted" | "denied") => {
    try { localStorage.setItem(KEY, v); } catch { /* ignore */ }
    if (v === "granted") loadAnalytics();
    setShown(false);
  };

  if (!shown) return null;
  return (
    <div className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title">
      <p id="consent-title">
        We use one analytics cookie to see which pages help visitors. Nothing is loaded unless you accept. <a href="/cookies">Read more</a>
      </p>
      <div className="btn-row">
        <button type="button" className="btn btn--black" onClick={() => choose("granted")}>Accept analytics</button>
        <button type="button" className="btn btn--ghost-dark" onClick={() => choose("denied")}>No thanks</button>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  if (!GA) return null;
  return (
    <button type="button" className="linklike" onClick={() => window.dispatchEvent(new Event("sch-consent-open"))}>
      Cookie settings
    </button>
  );
}
