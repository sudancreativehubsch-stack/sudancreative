"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GrowthArrow, PlayIcon } from "./Shapes";
import { SpotlightCard } from "./SpotlightEffect";

export function BentoServices() {
  return (
    <section className="bento-section" aria-labelledby="bento-heading">
      <div className="wrap">
        <div className="bento-header">
          <span className="bento-pill-tag">Core Disciplines</span>
          <h2 id="bento-heading" className="bento-title">
            Engineered for <span className="bento-title-accent">impact</span>.
          </h2>
          <p className="bento-subtitle">
            Three core pillars designed to take your brand from initial spark to market domination.
          </p>
        </div>

        <div className="bento-cards-stack">
          {/* ========== CARD 1: Video Production & 9:16 Reels ========== */}
          <SpotlightCard className="bento-card bento-card--video">
            <div className="bento-card__inner">
              <div className="bento-card__content">
                <span className="bento-card__tag">Film &amp; 9:16 Vertical Media</span>
                <h3 className="bento-card__title">
                  Commercial Video Production &amp; High-Retention Reels
                </h3>
                <p className="bento-card__desc">
                  Cinematic brand films, high-energy commercial reels, and viral vertical video engineered specifically for high viewer retention on TikTok, Instagram Reels, and YouTube Shorts.
                </p>
                <div className="bento-card__features">
                  <span className="bento-card__feat-pill">4K Cinema Cameras</span>
                  <span className="bento-card__feat-pill">Fast 48h Turnaround</span>
                  <span className="bento-card__feat-pill">Full Sound Design &amp; Color Grade</span>
                </div>
                <div className="bento-card__btn-wrap">
                  <Link href="/portfolio" className="btn btn--primary-glow">
                    Explore Films <GrowthArrow />
                  </Link>
                </div>
              </div>

              <div className="bento-card__visual bento-card__visual--video">
                <div className="bento-visual-frame">
                  <div className="bento-visual-bg bento-visual-bg--video">
                    {/* Visual Mockup for Cinema & Reels */}
                    <div className="bento-video-preview">
                      <div className="bento-video-preview__header">
                        <span className="rec-dot" aria-hidden="true" />
                        <span className="rec-text">REC · 4K DCI · 60 FPS</span>
                        <span className="rec-aspect">9:16 &amp; 16:9</span>
                      </div>
                      <div className="bento-video-preview__center">
                        <div className="bento-play-disc">
                          <PlayIcon />
                        </div>
                      </div>
                      <div className="bento-video-preview__footer">
                        <span className="bento-reel-badge">Sudan Creative Hub Studio</span>
                        <div className="bento-audio-bars">
                          <span /><span /><span /><span /><span />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* ========== CARD 2: Brand Strategy & Visual Identity ========== */}
          <SpotlightCard className="bento-card bento-card--brand">
            <div className="bento-card__inner">
              <div className="bento-card__content">
                <span className="bento-card__tag">Branding &amp; Design Systems</span>
                <h3 className="bento-card__title">
                  Brand Strategy &amp; Visual Identity
                </h3>
                <p className="bento-card__desc">
                  Distinctive visual systems, bespoke bilingual Arabic &amp; English typography, premium packaging, and brand guidelines that make your business unmistakable in crowded markets.
                </p>
                <div className="bento-card__features">
                  <span className="bento-card__feat-pill">Bespoke Arabic &amp; Latin Fonts</span>
                  <span className="bento-card__feat-pill">Packaging &amp; Print</span>
                  <span className="bento-card__feat-pill">Complete Design Systems</span>
                </div>
                <div className="bento-card__btn-wrap">
                  <Link href="/services" className="btn btn--glass-pill">
                    View Identities <GrowthArrow />
                  </Link>
                </div>
              </div>

              <div className="bento-card__visual bento-card__visual--brand">
                <div className="bento-visual-frame">
                  <div className="bento-visual-bg bento-visual-bg--brand">
                    {/* Visual Mockup for Brand Identity */}
                    <div className="bento-brand-mockup">
                      <div className="bento-brand-swatches">
                        <span className="swatch swatch--blue" />
                        <span className="swatch swatch--orange" />
                        <span className="swatch swatch--yellow" />
                        <span className="swatch swatch--glass" />
                      </div>
                      <div className="bento-brand-card-top">
                        <span className="brand-logo-mark">SCH.</span>
                        <span className="brand-font-spec">Lyon Arabic / Grotesque Bold</span>
                      </div>
                      <div className="bento-brand-specimen">
                        <span className="bento-specimen-title">Sudan Creative Hub</span>
                        <span className="bento-specimen-arabic">مركز السودان الإبداعي</span>
                        <span className="bento-specimen-tags">Identity · Strategy · Packaging · Motion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* ========== CARD 3: Growth Marketing & Campaign Direction ========== */}
          <SpotlightCard className="bento-card bento-card--growth">
            <div className="bento-card__inner">
              <div className="bento-card__content">
                <span className="bento-card__tag">Performance &amp; Scale</span>
                <h3 className="bento-card__title">
                  Growth Marketing &amp; Campaign Direction
                </h3>
                <p className="bento-card__desc">
                  Data-backed digital advertising, influencer orchestration, and multi-channel campaign deployment across Sudan, Egypt, India, and the Gulf.
                </p>
                <div className="bento-card__features">
                  <span className="bento-card__feat-pill">Meta &amp; TikTok Ads</span>
                  <span className="bento-card__feat-pill">Influencer &amp; Talent Pairing</span>
                  <span className="bento-card__feat-pill">Conversion Funnels</span>
                </div>
                <div className="bento-card__btn-wrap">
                  <Link href="/contact" className="btn btn--primary-glow">
                    See Campaigns <GrowthArrow />
                  </Link>
                </div>
              </div>

              <div className="bento-card__visual bento-card__visual--growth">
                <div className="bento-visual-frame">
                  <div className="bento-visual-bg bento-visual-bg--growth">
                    {/* Visual Mockup for Growth Metrics */}
                    <div className="bento-growth-mockup">
                      <div className="bento-growth-stat">
                        <span className="growth-number">+104.9%</span>
                        <span className="growth-label">Engagement Lift with 9:16 Reels</span>
                      </div>
                      <div className="bento-chart-bars">
                        <div className="chart-bar" style={{ height: "35%" }} />
                        <div className="chart-bar" style={{ height: "55%" }} />
                        <div className="chart-bar" style={{ height: "45%" }} />
                        <div className="chart-bar" style={{ height: "70%" }} />
                        <div className="chart-bar" style={{ height: "85%" }} />
                        <div className="chart-bar chart-bar--highlight" style={{ height: "100%" }} />
                      </div>
                      <div className="bento-growth-footer">
                        <span>Regional Reach: 25M+ Impressions</span>
                        <span className="live-metric-dot" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
