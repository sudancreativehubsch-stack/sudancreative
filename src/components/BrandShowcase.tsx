import Link from "next/link";
import { GrowthArrow } from "./Shapes";

interface Brand {
  name: string;
  svg: React.ReactNode;
}

const BRANDS_ROW_1: Brand[] = [
  {
    name: "STIHL",
    svg: (
      <svg viewBox="0 0 120 32" fill="currentColor" className="brand-logo__svg" aria-label="STIHL">
        <text
          x="50%"
          y="23"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="24"
          letterSpacing="1px"
        >
          STIHL
        </text>
      </svg>
    ),
  },
  {
    name: "PORSCHE",
    svg: (
      <svg viewBox="0 0 160 32" fill="currentColor" className="brand-logo__svg" aria-label="PORSCHE">
        <text
          x="50%"
          y="21"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="15"
          letterSpacing="7px"
        >
          PORSCHE
        </text>
      </svg>
    ),
  },
  {
    name: "adidas",
    svg: (
      <svg viewBox="0 0 110 36" fill="currentColor" className="brand-logo__svg" aria-label="adidas">
        <polygon points="18,22 26,22 17,6 9,6" />
        <polygon points="31,22 39,22 26,0 18,0" />
        <polygon points="44,22 52,22 35,-6 27,-6" opacity="0.9" />
        <text
          x="56"
          y="23"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="17"
          letterSpacing="-0.5px"
        >
          adidas
        </text>
      </svg>
    ),
  },
  {
    name: "LBBW",
    svg: (
      <svg viewBox="0 0 120 32" fill="currentColor" className="brand-logo__svg" aria-label="LBBW">
        <text
          x="50%"
          y="22"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="19"
          letterSpacing="3px"
        >
          LB≡BW
        </text>
      </svg>
    ),
  },
  {
    name: "BMW",
    svg: (
      <svg viewBox="0 0 90 36" fill="currentColor" className="brand-logo__svg" aria-label="BMW">
        <g transform="translate(18, 18)">
          <circle cx="0" cy="0" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="0" cy="0" r="11" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 0,-11 A 11 11 0 0 1 11,0 L 0,0 Z" fill="currentColor" />
          <path d="M 0,11 A 11 11 0 0 1 -11,0 L 0,0 Z" fill="currentColor" />
        </g>
        <text
          x="44"
          y="24"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="17"
          letterSpacing="1px"
        >
          BMW
        </text>
      </svg>
    ),
  },
];

const BRANDS_ROW_2: Brand[] = [
  {
    name: "BOSCH",
    svg: (
      <svg viewBox="0 0 130 36" fill="currentColor" className="brand-logo__svg" aria-label="BOSCH">
        <g transform="translate(18, 18)">
          <circle cx="0" cy="0" r="13" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <rect x="-6" y="-3.5" width="12" height="7" fill="none" stroke="currentColor" strokeWidth="2" rx="1" />
        </g>
        <text
          x="42"
          y="24"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="18"
          letterSpacing="2.5px"
        >
          BOSCH
        </text>
      </svg>
    ),
  },
  {
    name: "Mercedes-Benz",
    svg: (
      <svg viewBox="0 0 180 36" fill="currentColor" className="brand-logo__svg" aria-label="Mercedes-Benz">
        <g transform="translate(18, 18)">
          <circle cx="0" cy="0" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
          <polygon points="0,-12 3,2 0,-1 -3,2" fill="currentColor" />
          <polygon points="-10,6 2,0 -1,0 0,3" fill="currentColor" />
          <polygon points="10,6 -2,0 1,0 0,3" fill="currentColor" />
        </g>
        <text
          x="42"
          y="23"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="15"
          letterSpacing="0.8px"
        >
          Mercedes-Benz
        </text>
      </svg>
    ),
  },
  {
    name: "NOVARTIS",
    svg: (
      <svg viewBox="0 0 150 36" fill="currentColor" className="brand-logo__svg" aria-label="NOVARTIS">
        <g transform="translate(16, 18)">
          <path
            d="M -6,10 C -12,2 -4,-12 4,-10 C 6,-3 2,6 -2,10 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <circle cx="6" cy="-6" r="3" fill="currentColor" />
        </g>
        <text
          x="36"
          y="24"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="17"
          letterSpacing="2px"
        >
          NOVARTIS
        </text>
      </svg>
    ),
  },
  {
    name: "Wolters Kluwer",
    svg: (
      <svg viewBox="0 0 170 36" fill="currentColor" className="brand-logo__svg" aria-label="Wolters Kluwer">
        <g transform="translate(16, 18)">
          <circle cx="0" cy="0" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="-5" cy="-5" r="2.5" fill="currentColor" />
          <circle cx="5" cy="-5" r="2.5" fill="currentColor" />
          <circle cx="-5" cy="5" r="2.5" fill="currentColor" />
          <circle cx="5" cy="5" r="2.5" fill="currentColor" />
          <line x1="-5" y1="-5" x2="5" y2="5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="-5" y1="5" x2="5" y2="-5" stroke="currentColor" strokeWidth="1.5" />
        </g>
        <text
          x="38"
          y="22"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="14"
          letterSpacing="0.5px"
        >
          Wolters Kluwer
        </text>
      </svg>
    ),
  },
];

export function BrandShowcase() {
  return (
    <section className="section brands-section" aria-labelledby="brands-title">
      <div className="wrap">
        <div className="section-head-glass">
          <div className="section-head-glass__title-row">
            <span className="section-accent-dash" aria-hidden="true" />
            <h2 id="brands-title" className="t-h2 section-head-glass__title">
              Trusted by the best
            </h2>
          </div>
          <p className="lead section-head-glass__sub">
            Partnering with global industry leaders and forward-thinking brands across regions.
          </p>
        </div>

        {/* Large Rounded Frosted Glass Container */}
        <div className="brands-glass-card">
          {/* Row 1 */}
          <div className="brands-glass-row">
            {BRANDS_ROW_1.map((b, i) => (
              <div key={b.name} className="brands-glass-item" title={b.name}>
                {b.svg}
                {i < BRANDS_ROW_1.length - 1 && (
                  <span className="brands-glass-divider" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <div className="brands-glass-row-divider" aria-hidden="true" />

          {/* Row 2 */}
          <div className="brands-glass-row">
            {BRANDS_ROW_2.map((b, i) => (
              <div key={b.name} className="brands-glass-item" title={b.name}>
                {b.svg}
                {i < BRANDS_ROW_2.length - 1 && (
                  <span className="brands-glass-divider" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Centered Frosted Glass Pill CTA */}
        <div className="brands-section__action">
          <Link href="/clients" className="brands-pill-cta">
            <span>Our References</span>
            <GrowthArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
