"use client";

import { ShapeShiftCards, DEFAULT_SERVICES_ITEMS } from "./template/ShapeShiftCards";

export function ServicesGlassGrid() {
  return (
    <section className="section services-glass-section" aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-head-glass">
          <div className="section-head-glass__title-row">
            <span className="section-accent-dash" aria-hidden="true" />
            <h2 id="services-title" className="t-h2 section-head-glass__title">
              What we do
            </h2>
          </div>
          <p className="lead section-head-glass__sub">
            Nine services, one team. Use one or combine them.
          </p>
        </div>

        {/* Morphing ShapeShift Cards with Interactive Mathematical Curves */}
        <ShapeShiftCards
          items={DEFAULT_SERVICES_ITEMS}
          cardHeight={420}
          minCardWidth={280}
          cardGap={18}
          radius={22}
          cardPadding={24}
        />
      </div>
    </section>
  );
}
export default ServicesGlassGrid;
