import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Tell Sudan Creative Hub about your project. Email, WhatsApp or the inquiry form. Branches in Egypt and India.",
  alternates: { canonical: "/contact" },
};

export default async function Contact() {
  const s = await getSettings();
  return (
    <section className="section--tight" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,9vw,8rem)" }}>
      <div className="wrap">
        <h1 className="t-h1">Let&rsquo;s talk about your project</h1>
        <div className="contact-grid" style={{ marginTop: "3rem" }}>
          <div>
            <dl className="contact-list" style={{ margin: 0 }}>
              <dt style={{ marginTop: 0 }}>Email</dt>
              <dd><a href={`mailto:${s.email}`}>{s.email}</a></dd>
              <dt>WhatsApp</dt>
              <dd><a href={`https://wa.me/${s.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">+{s.whatsapp}</a></dd>
              <dt>Egypt branch</dt>
              <dd className="muted">{s.branch_egypt}</dd>
              <dt>India branch</dt>
              <dd className="muted">{s.branch_india}</dd>
              <dt>Follow</dt>
              <dd style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                <a href={s.social_facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href={s.social_instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href={s.social_tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
              </dd>
            </dl>
          </div>
          <ContactForm whatsapp={s.whatsapp} />
        </div>
      </div>
    </section>
  );
}
