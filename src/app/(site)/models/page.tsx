import type { Metadata } from "next";
import Link from "next/link";
import { ModelCard } from "@/components/ModelCard";
import { getModels, getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Models & Talent",
  description: "Male and female commercial models and talent for campaigns, photoshoots and video production. Choose a model and message us on WhatsApp.",
  alternates: { canonical: "/models" },
};

type Props = { searchParams: Promise<{ g?: string }> };

export default async function Models({ searchParams }: Props) {
  const { g } = await searchParams;
  const gender = g === "female" || g === "male" ? g : undefined;
  const [s, models] = await Promise.all([getSettings(), getModels({ gender })]);
  const tabs = [
    { label: "All", href: "/models", on: !gender },
    { label: "Women", href: "/models?g=female", on: gender === "female" },
    { label: "Men", href: "/models?g=male", on: gender === "male" },
  ];
  return (
    <section className="section--tight" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,9vw,8rem)" }}>
      <div className="wrap">
        <h1 className="t-h1">Models &amp; talent</h1>
        <p className="lead muted" style={{ margin: "1.5rem 0 2.5rem" }}>
          Open a profile for photos, skills and showreel. When you have found the one, press Choose this model and we continue on WhatsApp.
        </p>
        <nav className="filters" aria-label="Filter models">
          {tabs.map((t) => <Link key={t.label} href={t.href} aria-current={t.on ? "true" : undefined}>{t.label}</Link>)}
        </nav>
        {models.length ? (
          <div className="models">{models.map((m) => <ModelCard key={m.id} m={m} whatsapp={s.whatsapp} />)}</div>
        ) : (
          <div className="empty"><p>No profiles here yet. Check back soon, or message us for a custom casting.</p></div>
        )}
      </div>
    </section>
  );
}
