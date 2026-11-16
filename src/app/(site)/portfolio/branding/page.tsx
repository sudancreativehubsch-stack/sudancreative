import type { Metadata } from "next";
import Link from "next/link";
import { Pic } from "@/components/Pic";
import { getBrandProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Branding & Visual Identity",
  description: "Brand identity case studies: logos, colour palettes, typography and applications.",
  alternates: { canonical: "/portfolio/branding" },
};

export default async function BrandingIndex() {
  const projects = await getBrandProjects();
  return (
    <section className="section--tight" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,9vw,8rem)" }}>
      <div className="wrap">
        <h1 className="t-h1">Branding &amp; visual identity</h1>
        <p className="lead muted" style={{ margin: "1.5rem 0 3rem" }}>Each project is a full case study: logo, colour, type and how the identity lives in the real world.</p>
        {projects.length ? (
          <div className="work-split" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))" }}>
            {projects.map((b) => (
              <Link key={b.id} className="case-card" href={`/portfolio/branding/${b.slug}`}>
                <Pic src={b.cover} alt={`${b.title} brand identity`} sizes="(min-width: 900px) 33vw, 100vw" width={800} height={600} />
                <div className="case-card__title">{b.title}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty"><p>Branding case studies will appear here once they are added.</p></div>
        )}
      </div>
    </section>
  );
}
