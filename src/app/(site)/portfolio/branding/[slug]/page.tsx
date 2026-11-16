import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { Pic } from "@/components/Pic";
import { GrowthArrow } from "@/components/Shapes";
import { getBrandProject, getBrandProjects } from "@/lib/data";
import { readableOn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBrandProject(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: `${p.title}: brand identity`,
    description: p.overview?.slice(0, 155) || `Brand identity case study for ${p.title}.`,
    alternates: { canonical: `/portfolio/branding/${p.slug}` },
    openGraph: p.cover ? { images: [{ url: p.cover }] } : undefined,
  };
}

export default async function BrandCase({ params }: Props) {
  const { slug } = await params;
  const [p, all] = await Promise.all([getBrandProject(slug), getBrandProjects()]);
  if (!p) notFound();

  const idx = all.findIndex((b) => b.id === p.id);
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null;
  const prev = all.length > 1 ? all[(idx - 1 + all.length) % all.length] : null;

  return (
    <article>
      <header className="section--tight" style={{ paddingTop: "clamp(2.5rem,6vw,5rem)" }}>
        <div className="wrap">
          <p><Link href="/portfolio/branding" className="small">Branding portfolio</Link></p>
          <h1 className="t-h1" style={{ marginTop: ".5rem" }}>{p.title}</h1>
          {p.year ? <p className="muted" style={{ marginTop: "1rem" }}>{p.year}</p> : null}
        </div>
      </header>

      {p.cover ? (
        <div className="case-hero" style={{ marginTop: "2rem" }}>
          <Pic src={p.cover} alt={`${p.title} cover`} priority sizes="100vw" width={1600} height={900} />
        </div>
      ) : null}

      {p.overview ? (
        <section className="section">
          <div className="wrap contact-grid">
            <h2 className="t-h2">Overview</h2>
            <div className="stack">{p.overview.split("\n\n").map((t, i) => <p key={i} className="lead" style={{ maxWidth: "52ch" }}>{t}</p>)}</div>
          </div>
        </section>
      ) : null}

      {p.logo_image ? (
        <section aria-labelledby="logo-title">
          <h2 id="logo-title" className="sr-only">Logo design</h2>
          <div className="logo-stage"><Pic src={p.logo_image} alt={`${p.title} logo`} sizes="80vw" /></div>
        </section>
      ) : null}

      {p.palette.length ? (
        <section className="section slab--white" aria-labelledby="palette-title" style={{ color: "#000" }}>
          <div className="wrap">
            <h2 id="palette-title" className="t-h2" style={{ marginBottom: "2rem" }}>Colour palette</h2>
          </div>
          <div className="swatches">
            {p.palette.map((c) => (
              <div key={c.hex + c.name} className="swatch" style={{ background: c.hex, color: readableOn(c.hex) }}>
                <span>{c.name}</span>
                <code>{c.hex.toUpperCase()}</code>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {p.fonts.length ? (
        <section className="section slab--yellow" aria-labelledby="type-title">
          <div className="wrap">
            <h2 id="type-title" className="t-h2" style={{ marginBottom: "2rem" }}>Typography</h2>
            <ul className="fonts">
              {p.fonts.map((f) => (<li key={f.name}><b>{f.name}</b><span>{f.usage}</span></li>))}
            </ul>
          </div>
        </section>
      ) : null}

      {p.images.length ? (
        <section className="section" aria-labelledby="apps-title">
          <div className="wrap">
            <h2 id="apps-title" className="t-h2" style={{ marginBottom: "2rem" }}>Brand applications</h2>
            <Gallery images={p.images.map((src, i) => ({ src, alt: `${p.title} brand application ${i + 1}` }))} />
          </div>
        </section>
      ) : null}

      {p.guidelines_pdf ? (
        <section className="section slab--orange" aria-labelledby="guide-title">
          <div className="wrap cta">
            <h2 id="guide-title" className="t-h2">Brand guidelines</h2>
            <div className="btn-row">
              <a className="btn btn--black" href={p.guidelines_pdf} target="_blank" rel="noopener noreferrer">View PDF</a>
              <a className="btn btn--ghost-dark" href={p.guidelines_pdf} download>Download PDF</a>
            </div>
          </div>
        </section>
      ) : null}

      {next && prev ? (
        <nav className="section--tight wrap pager" aria-label="More case studies" style={{ paddingBlock: "3rem" }}>
          <Link className="btn" href={`/portfolio/branding/${prev.slug}`}>Previous: {prev.title}</Link>
          <Link className="btn" href={`/portfolio/branding/${next.slug}`}>Next: {next.title} <GrowthArrow /></Link>
        </nav>
      ) : null}
    </article>
  );
}
