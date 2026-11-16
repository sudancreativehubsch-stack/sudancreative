import type { Metadata } from "next";
import Link from "next/link";
import { GrowthArrow } from "@/components/Shapes";

export const metadata: Metadata = {
  title: "Our Portfolio",
  description: "Video production, branding case studies, graphic design, photography and advertising campaigns by Sudan Creative Hub.",
  alternates: { canonical: "/portfolio" },
};

const TILES = [
  { href: "/portfolio/video", title: "Video production", text: "Commercials, reels, brand and campaign films.", cls: "slab--blue", span: "span-2" },
  { href: "/portfolio/branding", title: "Branding & visual identity", text: "Full case studies with palettes, typography and mockups.", cls: "slab--yellow", span: "" },
  { href: "/portfolio/graphic-design", title: "Graphic design", text: "Social media, advertising creatives and print.", cls: "slab--orange", span: "" },
  { href: "/portfolio/photography", title: "Photography", text: "Product, commercial and campaign photography.", cls: "slab--white", span: "" },
  { href: "/portfolio/advertising-campaigns", title: "Advertising campaigns", text: "Campaigns built from idea to delivery.", cls: "slab--blue", span: "span-2" },
];

export default function Portfolio() {
  return (
    <section className="section--tight" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,9vw,8rem)" }}>
      <div className="wrap">
        <h1 className="t-h1">Our portfolio</h1>
        <p className="lead muted" style={{ margin: "1.5rem 0 3rem" }}>Pick a discipline. Each one opens in the format that shows the work best.</p>
        <ul className="tiles">
          {TILES.map((t) => (
            <li key={t.href} className={t.span === "span-2" ? "tile-wide" : undefined}>
              <Link href={t.href} className={`tile ${t.cls}`}>
                <span className="t-h2" style={{ fontSize: "clamp(2rem,4.4vw,3.8rem)" }}>{t.title}</span>
                <span className="tile__text">{t.text}</span>
                <span className="tile__go" aria-hidden="true"><GrowthArrow /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
