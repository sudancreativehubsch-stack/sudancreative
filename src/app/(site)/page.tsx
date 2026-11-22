import Link from "next/link";
import { TwistBand } from "@/components/template/TwistBand";
import { DotPattern } from "@/components/template/DotPattern";
import { BandUnroll } from "@/components/template/BandUnroll";
import { RibbonMarquee } from "@/components/template/RibbonMarquee";
import { ServicesGlassGrid } from "@/components/ServicesGlassGrid";
import { ProcessFramework } from "@/components/ProcessFramework";
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
    <div className="home-page" style={{ position: "relative", overflowX: "hidden" }}>
      {/* Dynamic Animated Ambient Aurora Glows */}
      <div className="home-ambient-glow home-ambient-glow--top" aria-hidden="true" />
      <div className="home-ambient-glow home-ambient-glow--mid" aria-hidden="true" />

      {/* ==============================================================
          1. HERO SECTION WITH 3D TWIST BAND & DOT PATTERN (FROM TEMPLATE)
          ============================================================== */}
      <section className="hero" aria-labelledby="hero-title" style={{ position: "relative" }}>
        {/* Soft Dot Pattern with Ambient Glow */}
        <DotPattern
          dotColor="rgba(255, 255, 255, 0.3)"
          dotOpacity={0.15}
          dotSize={1.4}
          spacing={24}
          fade={75}
          glow={true}
          glowColor="#0b188c"
          glowOpacity={0.4}
          glowSize={70}
        />

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
            <FadeIn delay={0.1}>
              {/* Live Agency Beacon Pill */}
              <div className="hero__status-pill" style={{ margin: "0 auto 1.5rem" }}>
                <span className="hero__status-dot" aria-hidden="true" />
                <span>Available for Select Commercial Films &amp; Campaigns · 2026</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 id="hero-title" className="t-hero hero__title" style={{ margin: "0 auto 1.25rem" }}>
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
              <p className="lead hero__intro" style={{ margin: "0 auto 2rem", maxWidth: "62ch" }}>
                {s.hero_intro ||
                  "Sudan Creative Hub is an integrated marketing and creative production agency. Strategy, campaigns, film, branding and talent, handled by one dedicated team."}
              </p>
            </FadeIn>

            {/* Action Buttons: Framer Motion Magnetic Soft Pills */}
            <FadeIn delay={0.4}>
              <div className="btn-row hero__actions" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>
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
          </div>

          {/* 3D TwistBand Interactive WebGL Canvas (Curved Spinning Ring of Cards) */}
          <FadeIn delay={0.5}>
            <div className="twistband-stage">
              <TwistBand
                pillColor="#fbc701"
                pillTextColor="#050b4d"
                hint="Drag to spin 3D showcase · Click any card"
                hintBottom={15}
                cardCount={10}
                autoSpeed={5}
                radius={4.2}
                tilt={18}
                twist={34}
                pattern={false}
                background="transparent"
                borderWidth={1}
                borderColor="rgba(255, 255, 255, 0.28)"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==============================================================
          2. BAND UNROLL: 3D UNROLLING PERSPECTIVE STATS (FROM TEMPLATE)
          ============================================================== */}
      <section className="band-unroll-wrap">
        <div className="wrap">
          <BandUnroll
            stats={[
              { value: 5, suffix: "+", label: "Years Active in Creative Production", image: "/about-studio.jpg" },
              { value: 120, suffix: "+", label: "Brand Films & Campaigns Built", image: "/models/model-1.jpg" },
              { value: 98, suffix: "%", label: "Client Retention Across Regions", image: "/models/model-3.jpg" },
              { value: 4, suffix: " Hubs", label: "Sudan · Egypt · India · Arab Gulf", image: "/models/model-4.jpg" },
            ]}
            cardColor="linear-gradient(135deg, rgba(11, 24, 140, 0.8) 0%, rgba(5, 11, 77, 0.95) 100%)"
            textColor="#ffffff"
            suffixColor="#fbc701"
            cardHeight={140}
            radius={20}
          />
        </div>
      </section>

      {/* ==============================================================
          3. RIBBON MARQUEE: WAVING ENDLESS CARD RIBBON (FROM TEMPLATE)
          ============================================================== */}
      <section className="ribbon-marquee-wrap">
        <RibbonMarquee
          ribbonWidth={75}
          amplitude={55}
          wavelength={950}
          cardWidth={85}
          cardHeight={115}
          gap={60}
          speed={50}
        />
      </section>

      {/* ==============================================================
          4. WHAT WE DO: 9 LUXURY FROSTED GLASS SERVICES GRID
          ============================================================== */}
      <FadeIn delay={0.1}>
        <ServicesGlassGrid />
      </FadeIn>

      {/* ==============================================================
          5. OUR BRAND-TO-BUILD FRAMEWORK (PROCESS METHODOLOGY)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <ProcessFramework />
      </FadeIn>

      {/* ==============================================================
          6. CINEMATIC DARK CANVAS: OUR WORK & REELS STRIP
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
          7. OUR TALENT: COMPACT SPOTLIGHT (LINKING TO FULL ROSTER)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <ModelGallery whatsapp={s.whatsapp} />
      </FadeIn>

      {/* ==============================================================
          8. OUR PARTNERS (TRUSTED BY THE BEST LOGOS GRID)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <BrandShowcase />
      </FadeIn>

      {/* ==============================================================
          9. WHAT OUR CLIENTS SAY (TESTIMONIAL CARD BUBBLE)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <TestimonialCard />
      </FadeIn>

      {/* ==============================================================
          10. ABOUT US (SPLIT GLASS STUDIO CARD)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <AboutGlassSection aboutText={s.about_intro} />
      </FadeIn>

      {/* ==============================================================
          11. FREQUENTLY ASKED QUESTIONS (ACCORDION)
          ============================================================== */}
      <FadeIn delay={0.1}>
        <FaqAccordion />
      </FadeIn>

      {/* ==============================================================
          12. GIANT AMBIENT GLOWING ORB CTA FOOTER
          ============================================================== */}
      <FadeIn delay={0.1}>
        <AmbientOrbCta whatsapp={s.whatsapp} email={s.email} />
      </FadeIn>
    </div>
  );
}
