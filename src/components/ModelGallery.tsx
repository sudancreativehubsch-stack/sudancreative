"use client";

import Link from "next/link";
import { GrowthArrow, WhatsAppIcon } from "./Shapes";
import { waLink } from "@/lib/utils";
import { SpotlightCard } from "./SpotlightEffect";

interface ModelItem {
  id: string;
  name: string;
  categoryLabel: string;
  photo: string;
  specs: string;
}

// Curated 4 Featured Spotlight Talent for the Home Page
const SPOTLIGHT_MODELS: ModelItem[] = [
  {
    id: "mg-1",
    name: "Vanessa Noble",
    categoryLabel: "Editorial & Runway",
    photo: "/models/model-1.jpg",
    specs: "Height 178cm · Fashion",
  },
  {
    id: "mg-2",
    name: "Tariq Malik",
    categoryLabel: "Editorial & Film",
    photo: "/models/model-3.jpg",
    specs: "Height 185cm · Commercial",
  },
  {
    id: "mg-3",
    name: "Minerva Bridges",
    categoryLabel: "Runway & Vogue",
    photo: "/models/model-4.jpg",
    specs: "Height 180cm · Editorial",
  },
  {
    id: "mg-4",
    name: "Karim Mansoor",
    categoryLabel: "Commercial & Ads",
    photo: "/models/model-6.jpg",
    specs: "Height 183cm · Fitness",
  },
];

export function ModelGallery({ whatsapp }: { whatsapp?: string }) {
  const wa = whatsapp || "249963565781";

  return (
    <section className="section model-spotlight-section" aria-labelledby="model-spotlight-title">
      <div className="wrap">
        <div className="model-spotlight__head">
          <div className="section-head-glass__title-row">
            <span className="section-accent-dash" aria-hidden="true" />
            <h2 id="model-spotlight-title" className="t-h2 section-head-glass__title">
              Models &amp; Talent Casting
            </h2>
          </div>
          <p className="lead section-head-glass__sub">
            Curated commercial, runway and on-camera talent across Sudan, Egypt, India and the Arab Gulf.
          </p>
        </div>

        {/* Compact 4-Card Talent Grid with Cursor Spotlight Effect */}
        <div className="model-spotlight__grid">
          {SPOTLIGHT_MODELS.map((m) => (
            <SpotlightCard
              key={m.id}
              className="model-spotlight__card"
              spotlightColor="rgba(251, 199, 1, 0.18)"
            >
              <div className="model-spotlight__photo-wrap">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="model-spotlight__img"
                  loading="lazy"
                />
                <div className="model-spotlight__overlay">
                  <a
                    href={waLink(wa, `Hello Sudan Creative Hub, I would like to book model ${m.name} for a project.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="model-spotlight__book-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <WhatsAppIcon /> Book via WhatsApp
                  </a>
                </div>
              </div>

              <div className="model-spotlight__info">
                <h3 className="model-spotlight__name">{m.name}</h3>
                <span className="model-spotlight__category">{m.categoryLabel}</span>
                <span className="model-spotlight__specs">{m.specs}</span>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* View All Separate Page CTA Button */}
        <div className="model-spotlight__action">
          <Link href="/models" className="btn btn--primary-glow model-spotlight__cta-btn">
            Explore All Models &amp; Talent Roster (12+ Profiles) <GrowthArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
