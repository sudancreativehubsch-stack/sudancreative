"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { GrowthArrow, PlayIcon } from "./Shapes";

export interface ScrollerItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  metric: string;
  image: string;
  video?: string;
  ctaText?: string;
  ctaHref?: string;
}

const DEFAULT_SCROLLER_ITEMS: ScrollerItem[] = [
  {
    id: "scroller-1",
    title: "Cinematic Commercial Direction",
    subtitle: "High-production brand film shot on 4K cinema cameras with bespoke sound engineering and Davinci color grading.",
    category: "Commercial Film",
    badge: "Cinema DCI · 60 FPS",
    metric: "4.8M+ Views",
    image: "/about-studio.jpg",
    video: "/sample-reel.mp4",
    ctaText: "Watch Full Showreel",
    ctaHref: "/portfolio/video",
  },
  {
    id: "scroller-2",
    title: "High-Retention 9:16 Social Reels",
    subtitle: "Paced specifically for immediate hook retention, dynamic motion typography, and algorithm optimization on Instagram & TikTok.",
    category: "Vertical Media",
    badge: "9:16 Vertical · High Viral Retention",
    metric: "+104.9% Lift",
    image: "/models/model-1.jpg",
    video: "/reels/reel-1.mp4",
    ctaText: "Explore Social Reels",
    ctaHref: "/portfolio",
  },
  {
    id: "scroller-3",
    title: "High-Fashion & Commercial Casting",
    subtitle: "Exclusive runway, commercial and editorial talent casting tailored for global and regional luxury fashion houses.",
    category: "Talent & Casting",
    badge: "Editorial & Runway Roster",
    metric: "12+ Exclusive Models",
    image: "/models/model-3.jpg",
    ctaText: "Browse Talent Roster",
    ctaHref: "/models",
  },
  {
    id: "scroller-4",
    title: "Digital Growth & Performance Campaigns",
    subtitle: "Data-driven creative deployment across Sudan, Egypt, India, and the Gulf, scaling brand revenue with targeted paid media.",
    category: "Growth Marketing",
    badge: "Omnichannel Scale",
    metric: "25M+ Impressions",
    image: "/models/model-4.jpg",
    video: "/reels/reel-2.mp4",
    ctaText: "Start a Project",
    ctaHref: "/contact",
  },
  {
    id: "scroller-5",
    title: "Brand Strategy & Visual Systems",
    subtitle: "Bilingual Arabic and Latin typography, distinctive packaging, and comprehensive brand identity guidelines.",
    category: "Visual Identity",
    badge: "Bilingual Design System",
    metric: "120+ Brand Launches",
    image: "/models/model-6.jpg",
    ctaText: "View Brand Case Studies",
    ctaHref: "/services",
  },
];

export function ImageScroller({ items = DEFAULT_SCROLLER_ITEMS }: { items?: ScrollerItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = items.length;

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate progress through container
      const totalScrollable = containerHeight - windowHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      const index = Math.min(total - 1, Math.floor(progress * total));

      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [total]);

  const scrollToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetScroll = container.offsetTop + (index / (total - 1)) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
    setActiveIndex(index);
  };

  const current = items[activeIndex] || items[0];

  return (
    <div
      ref={containerRef}
      className="framer-scroller-container"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="framer-scroller-sticky">
        {/* Ambient Darkened Backdrop with Aurora Shimmer */}
        <div className="framer-scroller-bg-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="framer-scroller-media"
            >
              {current.video ? (
                <video
                  src={current.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="framer-scroller-video"
                />
              ) : (
                <img
                  src={current.image}
                  alt={current.title}
                  className="framer-scroller-img"
                />
              )}
              <div className="framer-scroller-scrim" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlay */}
        <div className="wrap framer-scroller-content-grid">
          <div className="framer-scroller-text-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="framer-scroller-copy"
              >
                <div className="framer-scroller-badges">
                  <span className="framer-scroller-cat-pill">{current.category}</span>
                  <span className="framer-scroller-spec-pill">{current.badge}</span>
                </div>

                <h2 className="framer-scroller-title">{current.title}</h2>
                <p className="framer-scroller-subtitle">{current.subtitle}</p>

                <div className="framer-scroller-stat-pill">
                  <span className="scroller-metric-val">{current.metric}</span>
                  <span className="scroller-metric-dot" />
                </div>

                {current.ctaHref && (
                  <div className="framer-scroller-cta-row">
                    <Link
                      href={current.ctaHref}
                      className="btn btn--primary-glow framer-scroller-btn"
                    >
                      {current.ctaText || "Explore Work"} <GrowthArrow />
                    </Link>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Vertical Thumbnail Dock (Interactive Switcher) */}
          <div className="framer-scroller-dock-col">
            <div className="framer-scroller-dock" role="tablist" aria-label="Select Showcase Slide">
              <div className="framer-scroller-dock-header">
                <span className="dock-title">SELECTED WORK</span>
                <span className="dock-count">{activeIndex + 1} / {total}</span>
              </div>

              <div className="framer-scroller-thumbs-list">
                {items.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`framer-dock-thumb-btn ${isActive ? "framer-dock-thumb-btn--active" : ""}`}
                      onClick={() => scrollToSlide(idx)}
                      title={item.title}
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="framer-dock-thumb-img"
                      />
                      {isActive && (
                        <motion.div
                          layoutId="activeDockOutline"
                          className="framer-dock-thumb-outline"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="framer-dock-thumb-num">0{idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="framer-scroller-bottom-hint">
          <span className="framer-scroller-hint-text">Scroll to explore campaigns</span>
          <div className="framer-scroller-hint-arrow">↓</div>
        </div>
      </div>
    </div>
  );
}
