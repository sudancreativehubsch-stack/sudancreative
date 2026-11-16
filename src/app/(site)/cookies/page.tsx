import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/Consent";

export const metadata: Metadata = { title: "Cookie Notice", description: "Which cookies Sudan Creative Hub uses and how to control them.", alternates: { canonical: "/cookies" } };

export default function Cookies() {
  return (
    <section className="section">
      <div className="wrap prose">
        <h1 className="t-h1" style={{ fontSize: "clamp(2.6rem,7vw,5.5rem)" }}>Cookie notice</h1>

        <h2>Essential</h2>
        <p>The public site does not need cookies to work. Staff who sign in to the admin dashboard receive a secure session cookie. It is only set after login.</p>

        <h2>Analytics (optional)</h2>
        <p>If you accept, we load Google Analytics 4 to count visits and see which pages are useful. IP addresses are anonymised and advertising features are switched off. If you decline, Google&rsquo;s analytics script is never loaded.</p>

        <h2>Your choice</h2>
        <p>Your choice is stored in your browser. You can change it any time: <CookieSettingsButton /></p>
      </div>
    </section>
  );
}
