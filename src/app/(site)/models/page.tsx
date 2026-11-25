import type { Metadata } from "next";
import Link from "next/link";
import { GalleryStack, type StackModelItem } from "@/components/template/GalleryStack";
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

  const stackModels: StackModelItem[] = models.map((m) => ({
    id: m.id,
    name: m.name,
    category: m.skills?.[0] || "Media Presenter",
    specs: m.specialties?.length ? `${m.skills?.[0] || "Media Presenter"} · ${m.specialties.slice(0, 2).join(" & ")}` : "Media Presenter · Commercial Talent",
    photo: m.photos?.[0] || "/showcase/1.webp",
    slug: m.slug,
  }));

  return (
    <div style={{ paddingTop: "clamp(5.5rem, 9vw, 7.5rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
      <div className="wrap">
        <nav className="filters" aria-label="Filter models" style={{ justifyContent: "center", marginBottom: "0.5rem" }}>
          {tabs.map((t) => (
            <Link key={t.label} href={t.href} aria-current={t.on ? "true" : undefined}>
              {t.label}
            </Link>
          ))}
        </nav>
      </div>

      {stackModels.length ? (
        <GalleryStack
          models={stackModels}
          whatsapp={s.whatsapp}
          title="Models & Talent Casting"
          subtitle="Click, swipe, or tap to shuffle through our 9 featured talent and book directly via WhatsApp."
          hideFooterCta={true}
        />
      ) : (
        <div className="wrap">
          <div className="empty"><p>No profiles here yet. Check back soon, or message us for a custom casting.</p></div>
        </div>
      )}
    </div>
  );
}
