"use client";

import { useState } from "react";
import Link from "next/link";
import { GrowthArrow, WhatsAppIcon } from "./Shapes";
import { waLink } from "@/lib/utils";

interface ModelItem {
  id: string;
  name: string;
  category: "women" | "men" | "editorial" | "commercial";
  categoryLabel: string;
  photo: string;
  specs: string;
}

const GALLERY_MODELS: ModelItem[] = [
  {
    id: "mg-1",
    name: "Vanessa Noble",
    category: "women",
    categoryLabel: "Editorial & Runway",
    photo: "/models/model-1.jpg",
    specs: "Height 178cm · Fashion",
  },
  {
    id: "mg-2",
    name: "Gloria Mckinney",
    category: "women",
    categoryLabel: "High Fashion",
    photo: "/models/model-2.jpg",
    specs: "Height 175cm · Beauty",
  },
  {
    id: "mg-3",
    name: "Tariq Malik",
    category: "men",
    categoryLabel: "Editorial & Film",
    photo: "/models/model-3.jpg",
    specs: "Height 185cm · Commercial",
  },
  {
    id: "mg-4",
    name: "Minerva Bridges",
    category: "editorial",
    categoryLabel: "Runway & Vogue",
    photo: "/models/model-4.jpg",
    specs: "Height 180cm · Editorial",
  },
  {
    id: "mg-5",
    name: "Agnes Keller",
    category: "women",
    categoryLabel: "Commercial & Print",
    photo: "/models/model-5.jpg",
    specs: "Height 176cm · Lifestyle",
  },
  {
    id: "mg-6",
    name: "Karim Mansoor",
    category: "men",
    categoryLabel: "Commercial & Ads",
    photo: "/models/model-6.jpg",
    specs: "Height 183cm · Fitness",
  },
  {
    id: "mg-7",
    name: "Susan Reese",
    category: "editorial",
    categoryLabel: "High Fashion",
    photo: "/models/model-7.jpg",
    specs: "Height 179cm · Haute Couture",
  },
  {
    id: "mg-8",
    name: "Hattie Torres",
    category: "commercial",
    categoryLabel: "Brand & TVC",
    photo: "/models/model-8.jpg",
    specs: "Height 174cm · On-Camera",
  },
  {
    id: "mg-9",
    name: "Jenny Cooper",
    category: "women",
    categoryLabel: "Editorial & Beauty",
    photo: "/models/model-9.jpg",
    specs: "Height 177cm · Studio",
  },
  {
    id: "mg-10",
    name: "Zaid Osman",
    category: "men",
    categoryLabel: "Fashion & Motion",
    photo: "/models/model-10.jpg",
    specs: "Height 186cm · Acting",
  },
  {
    id: "mg-11",
    name: "Angel Russell",
    category: "editorial",
    categoryLabel: "Art & Motion",
    photo: "/models/model-11.jpg",
    specs: "Height 181cm · Editorial",
  },
  {
    id: "mg-12",
    name: "Evon Williamson",
    category: "commercial",
    categoryLabel: "Lifestyle & Digital",
    photo: "/models/model-12.jpg",
    specs: "Height 175cm · Social Media",
  },
];

type CategoryFilter = "all" | "women" | "men" | "editorial" | "commercial";

const FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "ALL TALENT" },
  { id: "women", label: "WOMEN" },
  { id: "men", label: "MEN" },
  { id: "editorial", label: "EDITORIAL" },
  { id: "commercial", label: "COMMERCIAL" },
];

export function ModelGallery({ whatsapp }: { whatsapp?: string | null }) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filteredModels =
    activeFilter === "all"
      ? GALLERY_MODELS
      : GALLERY_MODELS.filter((m) => m.category === activeFilter);

  return (
    <section className="section model-gallery-section" aria-labelledby="gallery-title">
      <div className="wrap">
        {/* Section Heading & Category Filter Nav (Matching reference) */}
        <div className="model-gallery__header">
          <div className="model-gallery__titles">
            <span className="model-gallery__badge">CASTING &amp; TALENT ROSTER</span>
            <h2 id="gallery-title" className="model-gallery__title">
              Models &amp; Talent
            </h2>
            <p className="model-gallery__sub">
              Professional campaign faces, commercial talent &amp; editorial models across Sudan, Egypt and the Gulf.
            </p>
          </div>

          {/* Category Filter Pills */}
          <nav className="model-gallery__filter-bar" aria-label="Filter models">
            {FILTERS.map((f) => {
              const isSelected = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`model-gallery__filter-btn ${
                    isSelected ? "model-gallery__filter-btn--active" : ""
                  }`}
                  aria-pressed={isSelected}
                >
                  {f.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 4-column desktop / 3-column tablet / 2-column mobile photo frame grid */}
        <div className="model-gallery__grid">
          {filteredModels.map((m) => {
            const waBookingUrl = waLink(
              whatsapp || "+249963565781",
              `Hello Sudan Creative Hub, I would like to book model ${m.name} (${m.categoryLabel}) for an upcoming shoot.`
            );

            return (
              <article key={m.id} className="model-frame-card">
                <a
                  href={waBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="model-frame__link"
                  aria-label={`Book ${m.name}`}
                >
                  {/* Outer Framed Photo Container */}
                  <div className="model-frame__photo-wrap">
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      decoding="async"
                      className="model-frame__img"
                    />
                    <div className="model-frame__overlay">
                      <span className="model-frame__book-badge">
                        <WhatsAppIcon />
                        <span>Book Talent</span>
                      </span>
                    </div>
                  </div>

                  {/* Centered Name & Category (Clean High-Fashion Typography) */}
                  <div className="model-frame__info">
                    <h3 className="model-frame__name">{m.name}</h3>
                    <p className="model-frame__role">{m.categoryLabel}</p>
                    <span className="model-frame__specs">{m.specs}</span>
                  </div>
                </a>
              </article>
            );
          })}
        </div>

        {/* Centered Bottom CTA Button */}
        <div className="model-gallery__bottom">
          <Link href="/models" className="btn btn--yellow model-gallery__cta-btn">
            <span>Explore Full Agency Roster</span>
            <GrowthArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
