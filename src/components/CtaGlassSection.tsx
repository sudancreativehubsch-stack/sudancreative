import Link from "next/link";
import { GrowthArrow } from "./Shapes";

export function CtaGlassSection({
  title = "Have something worth creating?",
  text = "Let's turn your idea into a powerful campaign, film or brand experience.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section cta-glass-section" aria-labelledby="cta-heading">
      <div className="wrap">
        <div className="cta-glass-card">
          {/* Internal Ambient Light Wave Streaks */}
          <div className="cta-glass-card__glow-blue" aria-hidden="true" />
          <div className="cta-glass-card__glow-orange" aria-hidden="true" />

          <div className="cta-glass-card__grid">
            <div className="cta-glass-card__title-col">
              <h2 id="cta-heading" className="cta-glass-card__title">
                {title}
              </h2>
            </div>

            <div className="cta-glass-card__action-col">
              <p className="cta-glass-card__text">{text}</p>
              <div className="cta-glass-card__btn-wrap">
                <Link className="btn btn--primary-glow" href="/contact">
                  Get in Touch <GrowthArrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
