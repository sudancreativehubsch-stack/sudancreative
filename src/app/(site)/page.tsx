import Link from "next/link";
import { Pic } from "@/components/Pic";
import { ModelCard } from "@/components/ModelCard";
import { ReelShowcase } from "@/components/ReelShowcase";
import { ReelsStrip } from "@/components/ReelsStrip";
import { BrandShowcase } from "@/components/BrandShowcase";
import { GrowthArrow, PlayIcon, WhatsAppIcon } from "@/components/Shapes";
import { getBrandProjects, getClients, getModels, getServices, getSettings, getVideos } from "@/lib/data";
import { SITE } from "@/lib/site";
import { slugify, waLink } from "@/lib/utils";

export default async function Home() {
  const [s, services, videos, brands, models, clients] = await Promise.all([
    getSettings(), getServices(), getVideos(), getBrandProjects({ featured: true, limit: 2 }),
    getModels({ featured: true, limit: 4 }), getClients(),
  ]);
  const featuredVideo = videos.find((v) => v.featured) ?? videos[0];

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero__grid">
          <div>
            <h1 id="hero-title" className="t-hero">{s.hero_title}</h1>
            <p className="lead hero__intro">{s.hero_intro}</p>
            <div className="btn-row hero__actions">
              <Link className="btn btn--yellow" href="/contact">{s.hero_cta_primary} <GrowthArrow /></Link>
              <a className="btn btn--white" target="_blank" rel="noopener noreferrer" href={waLink(s.whatsapp, `Hello ${SITE.name}, I would like to get a quote.`)}>
                <WhatsAppIcon /> WhatsApp us
              </a>
            </div>
            <ul className="hero__checklist">
              <li>
                <span className="chk-box" aria-hidden="true" />
                <span>Commercial shoot &amp; cinematic post-production under one dedicated team</span>
              </li>
              <li>
                <span className="chk-box" aria-hidden="true" />
                <span>Fast turnaround tailored for high-retention Instagram Reels, TikTok &amp; YouTube Shorts</span>
              </li>
              <li>
                <span className="chk-box" aria-hidden="true" />
                <span>Full creative direction: scriptwriting, talent casting &amp; dynamic motion</span>
              </li>
            </ul>
            <p className="hero__markets">Working across Sudan, Egypt, India and the Gulf. Direct WhatsApp: +249 96 356 5781</p>
          </div>
          <div className="hero__reel-col">
            <ReelShowcase
              src="/sample-reel.mp4"
              title="Sudan Creative Hub"
              subtitle="Brand Reels, Ads & Commercial Production"
            />
          </div>
        </div>
      </section>

      {/* ---------- about ---------- */}
      <section className="section slab--blue" aria-labelledby="about-title">
        <div className="wrap">
          <h2 id="about-title" className="sr-only">About Sudan Creative Hub</h2>
          <p className="statement">{s.about_intro}</p>
          <Link className="btn btn--white" href="/about">About Us <GrowthArrow /></Link>
        </div>
      </section>

      {/* ---------- services ---------- */}
      <section className="section" aria-labelledby="services-title">
        <div className="wrap">
          <div className="head">
            <h2 id="services-title" className="t-h2">What we do</h2>
            <p className="lead muted">Nine services, one team. Use one or combine them.</p>
          </div>
          <ul className="index">
            {services.map((sv) => (
              <li key={sv.id}>
                <Link className="index__row" href={`/services#${slugify(sv.title)}`}>
                  <span className="index__title">{sv.title}</span>
                  <span className="index__sum">{sv.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- client reels strip (between 3rd and 4th section) ---------- */}
      <ReelsStrip />

      {/* ---------- featured projects ---------- */}
      <section className="section slab--yellow" aria-labelledby="work-title">
        <div className="wrap">
          <div className="head">
            <h2 id="work-title" className="t-h2">Selected work</h2>
            <Link className="btn btn--yellow" href="/portfolio">Full portfolio <GrowthArrow /></Link>
          </div>
          <div className="work-split">
            {featuredVideo ? (
              <Link className="case-card" href="/portfolio/video" aria-label={`Watch: ${featuredVideo.title}`}>
                <div className="cine__stage">
                  {featuredVideo.thumbnail ? <img src={featuredVideo.thumbnail} alt="" loading="lazy" decoding="async" /> : null}
                  <span className="cine__play" aria-hidden="true"><span className="disc"><PlayIcon /></span></span>
                </div>
                <div className="case-card__title">{featuredVideo.title}</div>
              </Link>
            ) : (
              <div className="empty" style={{ background: "var(--black)", color: "var(--white)", borderColor: "var(--black)" }}>
                <p className="t-h3">Our showreel is being cut.</p>
                <p className="muted" style={{ marginTop: ".75rem" }}>Video projects appear here as soon as they are uploaded.</p>
              </div>
            )}
            <div className="case-stack">
              {brands.map((b) => (
                <Link key={b.id} className="case-card" href={`/portfolio/branding/${b.slug}`}>
                  <Pic src={b.cover} alt={`${b.title} brand identity`} sizes="(min-width: 900px) 30vw, 100vw" width={800} height={600} />
                  <div className="case-card__title">{b.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- models ---------- */}
      <section className="section" aria-labelledby="models-title">
        <div className="wrap">
          <div className="head">
            <h2 id="models-title" className="t-h2">Models &amp; talent</h2>
            <p className="lead muted">Pick the face for your campaign. One tap opens WhatsApp with their name already in the message.</p>
          </div>
          {models.length ? (
            <div className="models">{models.map((m) => <ModelCard key={m.id} m={m} whatsapp={s.whatsapp} />)}</div>
          ) : (
            <div className="empty"><p>Model profiles will appear here once they are added.</p></div>
          )}
          <p style={{ marginTop: "2.5rem" }}>
            <Link className="btn btn--yellow" href="/models">See all models <GrowthArrow /></Link>
          </p>
        </div>
      </section>

      {/* ---------- brand showcase (Trusted by the best) ---------- */}
      <BrandShowcase />

      {/* ---------- call to action ---------- */}
      <section className="section slab--orange" aria-labelledby="cta-title">
        <div className="wrap cta">
          <div>
            <h2 id="cta-title" className="t-h1">{s.cta_title}</h2>
            <p className="lead" style={{ marginTop: "1.5rem" }}>{s.cta_text}</p>
          </div>
          <div className="btn-row">
            <Link className="btn btn--yellow" href="/contact">Start a project <GrowthArrow /></Link>
            <a className="btn btn--white" target="_blank" rel="noopener noreferrer" href={waLink(s.whatsapp, `Hello ${SITE.name}, I would like to start a project.`)}>
              <WhatsAppIcon /> WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
