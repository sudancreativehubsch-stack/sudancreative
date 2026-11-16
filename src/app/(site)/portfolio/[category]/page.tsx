import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { GrowthArrow } from "@/components/Shapes";
import { getPortfolioItems } from "@/lib/data";
import { PORTFOLIO_CATEGORIES } from "@/lib/site";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = PORTFOLIO_CATEGORIES.find((x) => x.slug === category);
  if (!c) return { title: "Not found" };
  return { title: `${c.label} Portfolio`, description: c.blurb, alternates: { canonical: `/portfolio/${c.slug}` } };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = PORTFOLIO_CATEGORIES.find((x) => x.slug === category);
  if (!c) notFound();
  const items = await getPortfolioItems(c.slug);

  return (
    <section className="section--tight" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,9vw,8rem)" }}>
      <div className="wrap">
        <h1 className="t-h1">{c.label}</h1>
        <p className="lead muted" style={{ margin: "1.5rem 0 3rem" }}>{c.blurb}</p>
        {items.length ? (
          <Gallery images={items.map((i) => ({ src: i.image, alt: i.title, caption: i.description ?? i.title }))} />
        ) : (
          <div className="empty"><p>Work in this category will appear here once it is added.</p></div>
        )}
        <p style={{ marginTop: "3rem" }}><Link className="btn" href="/contact">Start a project <GrowthArrow /></Link></p>
      </div>
    </section>
  );
}
