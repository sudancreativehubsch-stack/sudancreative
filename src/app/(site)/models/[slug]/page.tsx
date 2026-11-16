import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { WhatsAppIcon } from "@/components/Shapes";
import { ClickToPlay } from "@/components/VideoShowcase";
import { getModel, getSettings } from "@/lib/data";
import { modelWaMessage, waLink } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = await getModel(slug);
  if (!m) return { title: "Profile not found" };
  return {
    title: `${m.name}, ${m.gender} model`,
    description: m.bio?.slice(0, 155) || `Model profile: ${m.name}.`,
    alternates: { canonical: `/models/${m.slug}` },
    openGraph: m.photos[0] ? { images: [{ url: m.photos[0] }] } : undefined,
  };
}

export default async function ModelProfile({ params }: Props) {
  const { slug } = await params;
  const [m, s] = await Promise.all([getModel(slug), getSettings()]);
  if (!m) notFound();
  const wa = waLink(s.whatsapp, modelWaMessage(m.name, `/models/${m.slug}`));

  return (
    <article className="section--tight" style={{ paddingTop: "clamp(2.5rem,6vw,5rem)", paddingBottom: "clamp(4rem,9vw,8rem)" }}>
      <div className="wrap">
        <p><Link href="/models" className="small">All models</Link></p>
        <div className="profile" style={{ marginTop: "1.25rem" }}>
          <div>
            <Gallery images={m.photos.map((src, i) => ({ src, alt: `${m.name}, photo ${i + 1}` }))} />
            {m.showreel_url ? (
              <div style={{ marginTop: "2rem" }}>
                <h2 className="t-h3" style={{ marginBottom: "1rem" }}>Showreel</h2>
                <ClickToPlay src={m.showreel_url} poster={m.showreel_poster} title={`${m.name} showreel`} />
              </div>
            ) : null}
          </div>
          <div className="profile__info">
            <h1 className="t-h1" style={{ fontSize: "clamp(2.8rem,7vw,6rem)" }}>{m.name}</h1>
            {m.bio ? <p className="lead" style={{ marginTop: "1.5rem" }}>{m.bio}</p> : null}
            <dl>
              {m.skills.length ? (<><dt>Skills</dt><dd className="tags">{m.skills.map((t) => <span className="tag" key={t}>{t}</span>)}</dd></>) : null}
              {m.specialties.length ? (<><dt>Advertising specialties</dt><dd className="tags">{m.specialties.map((t) => <span className="tag" key={t}>{t}</span>)}</dd></>) : null}
            </dl>
            <p style={{ marginTop: "2.25rem" }}>
              <a className="btn btn--yellow" href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Choose this model</a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
