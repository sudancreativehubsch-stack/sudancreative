import Link from "next/link";
import { GlassHeroArt } from "@/components/GlassHeroArt";
import { BentoServices } from "@/components/BentoServices";
import { ProcessFramework } from "@/components/ProcessFramework";
import { ResultsShowcase } from "@/components/ResultsShowcase";
import { BrandShowcase } from "@/components/BrandShowcase";
import { AboutGlassSection } from "@/components/AboutGlassSection";
import { ModelGallery } from "@/components/ModelGallery";
import { ReelsStrip } from "@/components/ReelsStrip";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AmbientOrbCta } from "@/components/AmbientOrbCta";
import { GrowthArrow, WhatsAppIcon } from "@/components/Shapes";
import { FadeIn, MotionPillButton } from "@/components/MotionTransitions";
import { getSettings } from "@/lib/data";
import { SITE } from "@/lib/site";
import { waLink } from "@/lib/utils";

export default async function Home() {
  const s = await getSettings();

  return (
    <div className="home-page">
      {/* Dynamic Animated Ambient Aurora Glows for Top Hero */}
      <div className="home-ambient-glow home-ambient-glow--top" aria-hidden="true" />
      <div className="home-ambient-glow home-ambient-glow--mid" aria-hidden="true" />

      {/* ==============================================================
          1. TOP HERO: Luminous Iridescent Aurora & Grotesque Typography
          ============================================================== */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero__grid">
          <div className="hero__content-col">
            <FadeIn delay={0.1}>
              {/* World-Class Live Agency Beacon */}
              <div className="hero__status-pill">
                <span className="hero__status-dot" aria-hidden="true" />
                <span>Available for Select Commercial Films &amp; Campaigns · 2026</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 id="hero-title" className="t-hero hero__title">
                Turning ideas
                <br />
                into{" "}
                <span className="hero__impact-wrap">
                  <em className="hero__impact-word">impact.</em>
                  <svg
                    className="hero__impact-underline"
                    viewBox="0 0 240 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M 4 16 C 60 6, 170 4, 236 14 C 180 20, 100 22, 20 22"
                      fill="#f57210"
                      opacity="0.95"
                    />
                  </svg>
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="lead hero__intro">
                {s.hero_intro ||
                  "Sudan Creative Hub is an integrated marketing and creative production agency. Strategy, campaigns, film, branding and talent, handled by one dedicated team."}
              </p>
            </FadeIn>

            {/* Action Buttons: Framer Motion Magnetic Soft Pills */}
            <FadeIn delay={0.4}>
              <div className="btn-row hero__actions">
                <MotionPillButton as={Link} className="btn btn--primary-glow" href="/contact">
                  {s.hero_cta_primary || "Start a Project"} <GrowthArrow />
                </MotionPillButton>

                <MotionPillButton
                  as="a"
                  className="btn btn--glass-pill"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={waLink(s.whatsapp, `Hello ${SITE.name}, I would like to get a quote.`)}
                >
                  <WhatsAppIcon /> WhatsApp us
                </MotionPillButton>
              </div>
            </FadeIn>

            {/* Mobile Hero Art Insert (Under Buttons on Mobile) */}
            <div className="hero__art-col hero__art-col--mobile">
              <GlassHeroArt />
            </div>

            {/* 3 Frosted Glass Quick Metric Badges */}
            <FadeIn delay={0.5}>
              <div className="hero__badges-row">
                <div className="hero__badge-pill">
                  <span className="hero__badge-num">5+</span>
                  <span className="hero__badge-label">Years of Impact</span>
                </div>
                <div className="hero__badge-pill">
                  <span className="hero__badge-num">9</span>
                  <span className="hero__badge-label">Core Disciplines</span>
                </div>
                <div className="hero__badge-pill">
                  <span className="hero__badge-num">4</span>
                  <span className="hero__badge-label">Regional Hubs</span>
                </div>
              </div>
            </FadeIn>

            {/* Checklist items with Soft Rounded Glowing Amber Boxes */}
            <FadeIn delay={0.6}>
              <ul className="hero__checklist">
                <li>
                  <span className="chk-box-glow" aria-hidden="true" />
                  <span>Commercial shoot &amp; cinematic post-production under one dedicated team</span>
                </li>
                <li>
                  <span className="chk-box-glow" aria-hidden="true" />
                  <span>Fast turnaround tailored for high-retention Instagram Reels, TikTok &amp; YouTube Shorts</span>
                </li>
                <li>
                  <span className="chk-box-glow" aria-hidden="true" />
                  <span>Full creative direction: scriptwriting, talent casting &amp; dynamic motion</span>
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.7}>
              <p className="hero__markets">
                Active production across Sudan, Egypt, India and the Arab Gulf. Direct WhatsApp: +249 96 356 5781
              </p>
            </FadeIn>
          </div>

          {/* Desktop Hero Art (Right Column) with Floating Animation */}
          <div className="hero__art-col hero__art-col--desktop">
            <GlassHeroArt />
          </div>
        </div>
      </section>

      {/* ==============================================================
          2. THE 3 BENTO SERVICE SHOWCASES (MATCHING REFERENCE IMAGE)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <BentoServices />
      </FadeIn>

      {/* ==============================================================
          3. OUR BRAND-TO-BUILD FRAMEWORK (PROCESS METHODOLOGY)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <ProcessFramework />
      </FadeIn>

      {/* ==============================================================
          4. CINEMATIC DARK CANVAS TRANSITION: OUR WORK & REELS STRIP
          ============================================================== */}
      <section className="dark-cinema-section" aria-labelledby="work-heading">
        <div className="wrap">
          <div className="dark-cinema-header">
            <span className="dark-pill-tag">Portfolio &amp; Selected Works</span>
            <h2 id="work-heading" className="dark-cinema-title">
              OUR WORK<span className="dark-dot">.</span>
            </h2>
            <p className="dark-cinema-subtitle">
              Making waves with high-retention commercial films and viral 9:16 social campaigns.
            </p>
          </div>
        </div>

        {/* 9:16 Client Reels Strip with Interactive Carousel & Modal */}
        <ReelsStrip />
      </section>

      {/* ==============================================================
          5. OUR RESULTS (DATA & SCALE METRICS)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <ResultsShowcase />
      </FadeIn>

      {/* ==============================================================
          6. OUR TALENT (COMPACT SPOTLIGHT WITH BUTTON TO FULL ROSTER)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <ModelGallery whatsapp={s.whatsapp} />
      </FadeIn>

      {/* ==============================================================
          7. OUR PARTNERS (TRUSTED BY THE BEST LOGOS GRID)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <BrandShowcase />
      </FadeIn>

      {/* ==============================================================
          8. WHAT OUR CLIENTS SAY (TESTIMONIAL CARD BUBBLE)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <TestimonialCard />
      </FadeIn>

      {/* ==============================================================
          9. ABOUT US (SPLIT GLASS STUDIO CARD)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <AboutGlassSection aboutText={s.about_intro} />
      </FadeIn>

      {/* ==============================================================
          10. FREQUENTLY ASKED QUESTIONS (ACCORDION)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <FaqAccordion />
      </FadeIn>

      {/* ==============================================================
          11. GIANT AMBIENT GLOWING ORB CTA FOOTER
          ============================================================== */}
      <FadeIn delay={0.1}>
        <AmbientOrbCta whatsapp={s.whatsapp} email={s.email} />
      </FadeIn>
    </div>
  );
}
