"use client";

import { SpotlightCard } from "./SpotlightEffect";

interface ResultStat {
  metric: string;
  label: string;
  detail: string;
}

const STATS: ResultStat[] = [
  {
    metric: "+104.9%",
    label: "Average Engagement Lift",
    detail: "Achieved through custom-paced 9:16 vertical storytelling and hook retention engineering.",
  },
  {
    metric: "25M+",
    label: "Organic & Paid Video Views",
    detail: "Delivered across campaigns in Sudan, Egypt, Saudi Arabia, UAE, and India.",
  },
  {
    metric: "120+",
    label: "Brand Projects Delivered",
    detail: "From commercial films and identity revamps to high-volume social campaigns.",
  },
  {
    metric: "100%",
    label: "In-House Execution",
    detail: "No middlemen. Direct collaboration with directors, editors, colorists, and talent agents.",
  },
];

export function ResultsShowcase() {
  return (
    <section className="results-section" aria-labelledby="results-heading">
      <div className="wrap">
        <div className="results-header">
          <span className="results-pill-tag">Data-Driven Creative</span>
          <h2 id="results-heading" className="results-title">
            OUR RESULTS<span className="results-dot">.</span>
          </h2>
          <p className="results-subtitle">
            Creative excellence measured in genuine business growth and audience loyalty.
          </p>
        </div>

        <div className="results-grid">
          {STATS.map((stat, i) => (
            <SpotlightCard key={stat.label} className="results-card">
              <div className="results-card__metric">{stat.metric}</div>
              <h3 className="results-card__label">{stat.label}</h3>
              <p className="results-card__detail">{stat.detail}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
