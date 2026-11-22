"use client";

import { SpotlightCard } from "./SpotlightEffect";

export function TestimonialCard() {
  return (
    <section className="testimonial-section" aria-labelledby="testimonial-heading">
      <div className="wrap">
        <div className="testimonial-container">
          <div className="testimonial-header">
            <span className="testimonial-pill-tag">Client Feedback</span>
            <h2 id="testimonial-heading" className="testimonial-title">
              What our clients say<span className="testimonial-dot">.</span>
            </h2>
          </div>

          <SpotlightCard className="testimonial-card-bubble">
            <div className="testimonial-card-bubble__badge">
              <span className="star-icon">★</span> VERIFIED CLIENT
            </div>
            <blockquote className="testimonial-card-bubble__quote">
              &ldquo;Sudan Creative Hub transformed our entire brand presence. Their commercial film production and 9:16 vertical reels set a completely new standard for our marketing, delivering a noticeable jump in audience engagement across Egypt and the Gulf.&rdquo;
            </blockquote>
            <div className="testimonial-card-bubble__author">
              <div className="author-avatar">
                <span>TM</span>
              </div>
              <div className="author-info">
                <span className="author-name">Tariq Al-Mansoor</span>
                <span className="author-role">Head of Brand &amp; Digital Marketing · Regional Retail Group</span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
