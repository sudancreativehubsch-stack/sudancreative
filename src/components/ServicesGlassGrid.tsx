import Link from "next/link";
import { slugify } from "@/lib/utils";

interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  icon: React.ReactNode;
}

const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: "marketing-strategy",
    title: "Marketing Strategy & Consulting",
    summary: "A clear plan before any money is spent.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: "video-production",
    title: "Video Production",
    summary: "Films and reels that hold attention to the last second.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="14" height="16" rx="3" />
        <polygon points="22 7 16 12 22 17 22 7" fill="currentColor" opacity="0.3" />
        <polygon points="22 7 16 12 22 17 22 7" />
      </svg>
    ),
  },
  {
    id: "branding-visual-identity",
    title: "Branding & Visual Identity",
    summary: "An identity people recognise before they read the name.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 12 12 17 22 12" />
        <polyline points="2 17 12 22 22 17" />
      </svg>
    ),
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    summary: "Design that is built for the feed, the shelf and the street.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    id: "models-talent-casting",
    title: "Models & Talent Casting",
    summary: "Male and female talent for commercials, films and brand campaigns.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "photography-commercial",
    title: "Photography & Commercial Production",
    summary: "High-quality shoots for products, brands and campaigns.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    id: "creative-content",
    title: "Creative Content & Scriptwriting",
    summary: "Ideas, scripts and storylines that connect and convert.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: "social-media",
    title: "Social Media Management",
    summary: "From content to community and real results.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    ),
  },
  {
    id: "digital-advertising",
    title: "Digital Advertising & Campaign Management",
    summary: "Targeted campaigns that drive visibility, leads and growth.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export function ServicesGlassGrid() {
  return (
    <section className="section services-glass-section" aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-head-glass">
          <div className="section-head-glass__title-row">
            <span className="section-accent-dash" aria-hidden="true" />
            <h2 id="services-title" className="t-h2 section-head-glass__title">
              What we do
            </h2>
          </div>
          <p className="lead section-head-glass__sub">
            Nine services, one team. Use one or combine them.
          </p>
        </div>

        {/* 3x3 Luxury Frosted Glass Grid */}
        <div className="services-glass-grid">
          {SERVICE_ITEMS.map((s) => (
            <Link
              key={s.id}
              href={`/services#${slugify(s.title)}`}
              className="service-glass-card"
            >
              <div className="service-glass-card__icon-box">
                {s.icon}
              </div>
              <div className="service-glass-card__content">
                <h3 className="service-glass-card__title">{s.title}</h3>
                <p className="service-glass-card__summary">{s.summary}</p>
              </div>
              <div className="service-glass-card__arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
