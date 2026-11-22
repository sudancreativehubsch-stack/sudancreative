import Link from "next/link";
import { GrowthArrow, PlayIcon } from "./Shapes";

export function AboutGlassSection({ aboutText }: { aboutText?: string }) {
  const defaultText =
    "A Sudanese creative agency, founded in 2020, working across Sudan, Egypt, India and the Arab Gulf. We combine strategy, creativity and production to help brands grow and make real impact.";

  return (
    <section className="section about-glass-section" aria-labelledby="about-section-title">
      <div className="wrap">
        <div className="about-glass-card">
          {/* Left Media Column with Studio Cameraman Video Shoot */}
          <div className="about-glass-card__media">
            <img
              src="/about-studio.jpg"
              alt="Sudan Creative Hub Studio Film and Video Production"
              className="about-glass-card__img"
              loading="lazy"
            />
            {/* Subtle Gradient Overlays */}
            <div className="about-glass-card__media-glow" />
            {/* Central Glowing Play Disc */}
            <div className="about-glass-card__play-disc" aria-hidden="true">
              <PlayIcon />
            </div>
            {/* Bottom-left Sudan Creative Hub Studio Badge */}
            <div className="about-glass-card__badge">
              <span className="about-glass-card__badge-logo">
                <svg viewBox="0 0 72.29 116.94" width="16" height="22" fill="currentColor">
                  <path d="M 33.95 0 L 0 19.63 L 0 58.84 L 17.32 68.84 L 17.33 68.85 L 17.33 104.81 L 20.89 106.87 L 38.33 116.93 L 72.29 97.32 L 72.29 58.11 L 61.80 52.07 L 54.66 47.94 L 54.64 47.93 L 54.64 16.45 L 54.66 16.44 L 54.66 11.98 L 51.37 10.09 Z" />
                </svg>
              </span>
              <span>Sudan Creative Hub</span>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="about-glass-card__content">
            <div className="section-head-glass__title-row" style={{ marginBottom: "1rem" }}>
              <span className="section-accent-dash" aria-hidden="true" />
              <h2 id="about-section-title" className="t-h2 section-head-glass__title">
                About Us
              </h2>
            </div>

            <p className="about-glass-card__text">
              {aboutText || defaultText}
            </p>

            <div className="about-glass-card__action">
              <Link href="/about" className="btn btn--glass-gold">
                Learn More <GrowthArrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
