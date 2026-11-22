"use client";

import Link from "next/link";
import { GrowthArrow, WhatsAppIcon, PlayIcon } from "./Shapes";
import { waLink } from "@/lib/utils";

export function AmbientOrbCta({
  whatsapp = "249963565781",
  email = "sudancreativehubsch@gmail.com",
}: {
  whatsapp?: string;
  email?: string;
}) {
  return (
    <section className="ambient-orb-section" aria-labelledby="orb-cta-heading">
      <div className="ambient-orb-canvas" aria-hidden="true">
        {/* Giant Glowing Liquid Gradient Orb */}
        <div className="ambient-orb-sphere" />
        <div className="ambient-orb-ring" />
        <div className="ambient-orb-stars" />
      </div>

      <div className="wrap ambient-orb-content">
        <span className="ambient-orb-pill">Initiate Collaboration</span>

        <h2 id="orb-cta-heading" className="ambient-orb-headline">
          HAVE SOMETHING<br />
          <span className="ambient-orb-headline-accent">WORTH CREATING?</span>
        </h2>

        <p className="ambient-orb-lead">
          Let&apos;s engineer your next commercial film, 9:16 viral campaign, or iconic brand identity. Serving clients across Sudan, Egypt, India, and the Gulf.
        </p>

        <div className="ambient-orb-actions">
          <Link href="/contact" className="btn btn--primary-glow btn--orb-cta">
            Start a Project <GrowthArrow />
          </Link>

          <a
            href={waLink(whatsapp, "Hello Sudan Creative Hub, I would like to discuss a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--glass-pill btn--orb-wa"
          >
            <WhatsAppIcon /> WhatsApp us
          </a>
        </div>

        <div className="ambient-orb-contact-strip">
          <div className="orb-contact-item">
            <span className="orb-contact-label">Direct Inquiries</span>
            <a href={`mailto:${email}`} className="orb-contact-value">
              {email}
            </a>
          </div>
          <div className="orb-contact-item">
            <span className="orb-contact-label">Direct Phone / WhatsApp</span>
            <a href={`tel:+${whatsapp}`} className="orb-contact-value">
              +{whatsapp}
            </a>
          </div>
          <div className="orb-contact-item">
            <span className="orb-contact-label">Regional Hubs</span>
            <span className="orb-contact-value">Sudan · Egypt · India · Gulf</span>
          </div>
        </div>
      </div>
    </section>
  );
}
