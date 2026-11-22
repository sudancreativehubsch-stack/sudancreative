"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "./SpotlightEffect";

interface Step {
  num: string;
  phase: string;
  title: string;
  desc: string;
  deliverables: string[];
}

const STEPS: Step[] = [
  {
    num: "01",
    phase: "DISCOVER & STRATEGIZE",
    title: "Brand Audit & Blueprint",
    desc: "We diagnose your market position, dissect your competition, and sculpt a positioning strategy that commands attention across regional markets.",
    deliverables: ["Market & Audience Analysis", "Core Value Proposition", "Creative Direction Brief"],
  },
  {
    num: "02",
    phase: "CREATE & PRODUCE",
    title: "Commercial Film & Identity",
    desc: "From scriptwriting and talent casting to 4K cinematic film shoots and rapid 9:16 vertical edits, our in-house team executes every frame with precision.",
    deliverables: ["Cinematic Brand Video", "High-Retention Reels & TikToks", "Editorial Talent Casting"],
  },
  {
    num: "03",
    phase: "SCALE & DOMINATE",
    title: "Omnichannel Distribution",
    desc: "We deploy high-converting creative assets across social and digital channels, continuously monitoring retention metrics and scaling what converts.",
    deliverables: ["Targeted Paid Ads (Meta/TikTok)", "Influencer Co-creation", "Conversion Optimization"],
  },
];

export function ProcessFramework() {
  return (
    <section className="framework-section" aria-labelledby="framework-heading">
      <div className="wrap">
        <div className="framework-header">
          <span className="framework-pill-tag">Methodology</span>
          <h2 id="framework-heading" className="framework-title">
            Our brand-to-build framework<span className="framework-dot">.</span>
          </h2>
          <p className="framework-subtitle">
            A seamless three-stage production pipeline that eliminates friction and guarantees world-class creative output.
          </p>
        </div>

        <div className="framework-grid">
          {STEPS.map((step) => (
            <SpotlightCard key={step.num} className="framework-card">
              <div className="framework-card__top">
                <span className="framework-num">{step.num}</span>
                <span className="framework-phase">{step.phase}</span>
              </div>
              <h3 className="framework-card__title">{step.title}</h3>
              <p className="framework-card__desc">{step.desc}</p>
              <div className="framework-card__divider" />
              <ul className="framework-card__deliverables">
                {step.deliverables.map((item) => (
                  <li key={item}>
                    <span className="deliverable-bullet" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
