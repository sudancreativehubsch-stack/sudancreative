import Link from "next/link";
import { GrowthArrow } from "./Shapes";

interface Brand {
  name: string;
  svg: React.ReactNode;
}

const BRANDS: Brand[] = [
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
        {/* Adidas 3 stripes angle */}
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
          letterSpacing="2px"
        >
          BMW
        </text>
      </svg>
    ),
  },
  {
    name: "BOSCH",
    svg: (
      <svg viewBox="0 0 125 36" fill="currentColor" className="brand-logo__svg" aria-label="BOSCH">
        <g transform="translate(16, 18)">
          <circle cx="0" cy="0" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <rect x="-8" y="-4" width="16" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="0" y1="-12" x2="0" y2="-4" stroke="currentColor" strokeWidth="2.5" />
          <line x1="0" y1="4" x2="0" y2="12" stroke="currentColor" strokeWidth="2.5" />
        </g>
        <text
          x="36"
          y="24"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="2px"
        >
          BOSCH
        </text>
      </svg>
    ),
  },
  {
    name: "Mercedes-Benz",
    svg: (
      <svg viewBox="0 0 145 36" fill="currentColor" className="brand-logo__svg" aria-label="Mercedes-Benz">
        <g transform="translate(18, 18)">
          <circle cx="0" cy="0" r="14" fill="none" stroke="currentColor" strokeWidth="1.8" />
          {/* 3-pointed star */}
          <polygon points="0,-12 2,-2 10,7 1,4 -10,7 -2,-2" fill="currentColor" />
        </g>
        <text
          x="40"
          y="23"
          fontFamily="'Times New Roman', Times, serif"
          fontWeight="600"
          fontSize="15"
          letterSpacing="1px"
        >
          Mercedes-Benz
        </text>
      </svg>
    ),
  },
  {
    name: "NOVARTIS",
    svg: (
      <svg viewBox="0 0 135 36" fill="currentColor" className="brand-logo__svg" aria-label="NOVARTIS">
        <g transform="translate(14, 18)">
          <path
            d="M -6,8 C -6,-4 2,-10 6,-10 C 6,-4 -2,2 6,8 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </g>
        <text
          x="30"
          y="23"
          fontFamily="'Times New Roman', Times, serif"
          fontWeight="700"
          fontSize="16"
          letterSpacing="2px"
        >
          NOVARTIS
        </text>
      </svg>
    ),
  },
  {
    name: "Wüstenrot",
    svg: (
      <svg viewBox="0 0 160 36" fill="currentColor" className="brand-logo__svg" aria-label="wüstenrot württembergische">
        <g transform="translate(8, 9)">
          <rect x="0" y="0" width="8" height="8" fill="currentColor" />
          <rect x="9" y="0" width="8" height="8" fill="currentColor" />
          <rect x="0" y="9" width="8" height="8" fill="currentColor" />
          <rect x="9" y="9" width="8" height="8" fill="currentColor" />
        </g>
        <text
          x="32"
          y="17"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="11"
          letterSpacing="0.5px"
        >
          wüstenrot
        </text>
        <text
          x="32"
          y="27"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="500"
          fontSize="9"
          letterSpacing="0.2px"
          opacity="0.85"
        >
          württembergische
        </text>
      </svg>
    ),
  },
];

export function BrandShowcase() {
  return (
    <section className="section brands-section" aria-labelledby="brands-title">
      <div className="wrap brands-section__inner">
        <div className="brands-section__head">
          <h2 id="brands-title" className="brands-section__title">
            Trusted by the best
          </h2>
          <p className="brands-section__sub">
            Partnering with global industry leaders and forward-thinking brands across regions.
          </p>
        </div>

        {/* Responsive Brand Grid matching reference */}
        <div className="brands-grid">
          {BRANDS.map((b) => (
            <div key={b.name} className="brands-grid__item" title={b.name}>
              {b.svg}
            </div>
          ))}
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
