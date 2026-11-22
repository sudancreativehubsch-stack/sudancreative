"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "./SpotlightEffect";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "What regions does Sudan Creative Hub operate in?",
    a: "We operate actively with production bases and teams across Sudan, Egypt, India, and the Arab Gulf (UAE, Saudi Arabia). We handle cross-border logistics, remote casting, and on-location filming seamlessly.",
  },
  {
    q: "How fast is your commercial video and 9:16 reels turnaround?",
    a: "Our agile production pipeline delivers first cuts for social reels within 48 to 72 hours of shoot completion. Full cinematic commercial campaigns with color grading, sound design, and VFX typically deliver in 7 to 10 days.",
  },
  {
    q: "Can we hire models and talent separately from full production?",
    a: "Yes! Our Talent & Casting division provides male and female models, actors, and voiceover artists for commercials, editorial fashion shoots, runway shows, and brand activations. You can book talent directly via WhatsApp or our Contact form.",
  },
  {
    q: "What makes your 9:16 social reels perform better than standard video?",
    a: "We shoot specifically for vertical composition (9:16) with immediate 3-second hook design, dynamic captioning, pacing tuned to platform retention algorithms, and high-retention audio sync engineered for TikTok, Instagram Reels, and YouTube Shorts.",
  },
  {
    q: "How do we get started on a project?",
    a: "Simply click 'Start a Project' or message our team directly on WhatsApp (+249 96 356 5781). We will schedule a 20-minute discovery call, clarify your deliverables, and provide a transparent, fixed-scope proposal.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <div className="wrap">
        <div className="faq-header">
          <span className="faq-pill-tag">Clear Answers</span>
          <h2 id="faq-heading" className="faq-title">
            Frequently Asked Questions<span className="faq-dot">.</span>
          </h2>
          <p className="faq-subtitle">
            Everything you need to know about partnering with Sudan Creative Hub.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <SpotlightCard
                key={faq.q}
                className={`faq-item-card ${isOpen ? "faq-item-card--open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="faq-answer-wrap"
                    >
                      <p className="faq-answer-text">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
