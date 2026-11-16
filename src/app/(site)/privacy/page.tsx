import type { Metadata } from "next";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Sudan Creative Hub collects, uses and protects personal data.", alternates: { canonical: "/privacy" } };

export default async function Privacy() {
  const s = await getSettings();
  return (
    <section className="section">
      <div className="wrap prose">
        <h1 className="t-h1" style={{ fontSize: "clamp(2.6rem,7vw,5.5rem)" }}>Privacy policy</h1>
        <p className="muted" style={{ marginTop: "1rem" }}>Last updated: November 2026</p>

        <h2>Who we are</h2>
        <p>Sudan Creative Hub (&ldquo;we&rdquo;) is a marketing and creative production agency with branches in Egypt and India. You can reach us at <a href={`mailto:${s.email}`}>{s.email}</a>. We are the controller of the personal data described below.</p>

        <h2>What we collect</h2>
        <ul>
          <li><b>Inquiry form:</b> your name, email or WhatsApp number, the service you choose and the project details you write.</li>
          <li><b>Spam protection:</b> a one-way hash of your IP address (not the address itself) to limit repeated submissions, and Cloudflare Turnstile, which checks that you are a person.</li>
          <li><b>Analytics (only if you accept):</b> anonymised page-view statistics through Google Analytics 4.</li>
          <li><b>WhatsApp:</b> if you choose to message us there, WhatsApp processes your message under its own policy.</li>
        </ul>

        <h2>Why we use it</h2>
        <ul>
          <li>To reply to your inquiry and discuss your project (legitimate interest and steps before a contract).</li>
          <li>To protect the site from spam and abuse (legitimate interest).</li>
          <li>To understand which pages are useful (consent).</li>
        </ul>

        <h2>Who processes it for us</h2>
        <p>Cloudflare (hosting, media storage and spam protection), Supabase (database), Resend (email delivery), and Google (analytics, only with your consent). These providers may process data outside your country. We use them under their standard data-protection terms.</p>

        <h2>How long we keep it</h2>
        <p>Inquiries are kept for up to 24 months so we can follow up and handle disputes, then deleted. Analytics data follows Google&rsquo;s retention settings.</p>

        <h2>Your rights</h2>
        <p>Depending on where you live, including under the EU and UK GDPR and India&rsquo;s Digital Personal Data Protection Act, 2023, you can ask us to access, correct or delete your data, withdraw consent at any time, and complain to your local data-protection authority. Email us and we will respond within 30 days.</p>

        <h2>Security</h2>
        <p>The site is served over HTTPS. Staff access is limited by role and protected by login. No system is perfectly secure, but we take reasonable steps to protect your information.</p>

        <h2>Children</h2>
        <p>This site is for businesses and adults. We do not knowingly collect data from children.</p>

        <h2>Changes</h2>
        <p>If we change this policy we will update the date above.</p>
      </div>
    </section>
  );
}
