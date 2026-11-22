"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useReducedMotion, PanInfo } from "framer-motion";
import { WhatsAppIcon, GrowthArrow } from "../Shapes";
import { waLink } from "@/lib/utils";

export interface StackModelItem {
  id: string;
  name: string;
  category: string;
  specs: string;
  photo: string;
  slug?: string;
}

export const DEFAULT_STACK_MODELS: StackModelItem[] = [
  {
    id: "m-1",
    name: "Vanessa Noble",
    category: "Editorial & Runway",
    specs: "Height 178cm · Runway & High Fashion",
    photo: "/models/model-1.jpg",
    slug: "vanessa-noble",
  },
  {
    id: "m-2",
    name: "Tariq Malik",
    category: "Commercial & Film",
    specs: "Height 185cm · Commercial & Cinematic",
    photo: "/models/model-3.jpg",
    slug: "tariq-malik",
  },
  {
    id: "m-3",
    name: "Minerva Bridges",
    category: "Runway & Vogue",
    specs: "Height 180cm · Editorial & Luxury",
    photo: "/models/model-4.jpg",
    slug: "minerva-bridges",
  },
  {
    id: "m-4",
    name: "Karim Mansoor",
    category: "Commercial & Fitness",
    specs: "Height 183cm · Action & Fitness",
    photo: "/models/model-6.jpg",
    slug: "karim-mansoor",
  },
  {
    id: "m-5",
    name: "Amina Nour",
    category: "Beauty & Fashion",
    specs: "Height 175cm · Beauty & Commercial",
    photo: "/models/model-2.jpg",
    slug: "amina-nour",
  },
  {
    id: "m-6",
    name: "Zayn Hassan",
    category: "Lifestyle & Editorial",
    specs: "Height 182cm · Lifestyle & Fashion",
    photo: "/models/model-5.jpg",
    slug: "zayn-hassan",
  },
  {
    id: "m-7",
    name: "Layla Othman",
    category: "Commercial Ads",
    specs: "Height 176cm · Video Campaigns",
    photo: "/models/model-7.jpg",
    slug: "layla-othman",
  },
  {
    id: "m-8",
    name: "Farah Idris",
    category: "Runway & High Glamour",
    specs: "Height 179cm · Fashion Week & Stills",
    photo: "/models/model-8.jpg",
    slug: "farah-idris",
  },
];

// Aesthetic natural tilt angles mimicking a shuffled physical Polaroid deck
const TILT_ANGLES = [0, -3.5, 4, -2.5, 3, -4.5, 2.5, -2];

interface StackCardProps {
  model: StackModelItem;
  index: number;
  total: number;
  isTop: boolean;
  onSwipeOut: (dir: number) => void;
  whatsappNumber: string;
}

function StackCard({ model, index, total, isTop, onSwipeOut, whatsappNumber }: StackCardProps) {
  const reduced = useReducedMotion() ?? false;
  const x = useMotionValue(0);
  const rotateDrag = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 0.8, 1, 0.8, 0]);

  // Stack depth properties
  const tilt = TILT_ANGLES[index % TILT_ANGLES.length];
  const depthScale = Math.max(0.88, 1 - index * 0.032);
  const depthY = index * 10;
  const zIndex = total - index;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isTop) return;
    const swipeThreshold = 100;
    const velocityThreshold = 400;

    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      onSwipeOut(1);
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      onSwipeOut(-1);
    }
  };

  return (
    <motion.div
      className="gallery-stack__card"
      style={{
        zIndex,
        x: isTop ? x : 0,
        rotate: isTop ? rotateDrag : tilt,
        opacity: isTop ? opacity : Math.max(0.5, 1 - index * 0.14),
        scale: depthScale,
        y: depthY,
        cursor: isTop ? "grab" : "default",
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileTap={isTop ? { cursor: "grabbing" } : {}}
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 28 }}
    >
      <div className="gallery-stack__card-inner">
        {/* Model Photo */}
        <img
          src={model.photo}
          alt={model.name}
          className="gallery-stack__photo"
          draggable={false}
          loading={index < 3 ? "eager" : "lazy"}
        />

        {/* Ambient Glass Glow Edge */}
        <div className="gallery-stack__edge-glow" aria-hidden="true" />

        {/* Top Pill: Index Counter + Category */}
        <div className="gallery-stack__top-bar">
          <span className="gallery-stack__counter-pill">
            0{index + 1} · {model.category}
          </span>
          <span className="gallery-stack__live-dot" aria-hidden="true" />
        </div>

        {/* Bottom Glass Overlay Info */}
        <div className="gallery-stack__bottom-info">
          <div className="gallery-stack__meta">
            <h3 className="gallery-stack__name">{model.name}</h3>
            <p className="gallery-stack__specs">{model.specs}</p>
          </div>

          <div className="gallery-stack__actions">
            <a
              href={waLink(whatsappNumber, `Hello Sudan Creative Hub, I would like to book model ${model.name} for a project.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-stack__book-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <WhatsAppIcon /> Book Talent
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export interface GalleryStackProps {
  models?: StackModelItem[];
  whatsapp?: string;
  title?: string;
  subtitle?: string;
}

export function GalleryStack({
  models = DEFAULT_STACK_MODELS,
  whatsapp = "249963565781",
  title = "Models & Talent Casting",
  subtitle = "Interactive talent deck. Click, swipe, or tap to shuffle through our roster.",
}: GalleryStackProps) {
  const [deck, setDeck] = React.useState<StackModelItem[]>(models);
  const [swipeCount, setSwipeCount] = React.useState(0);

  const handleNext = () => {
    setDeck((prev) => {
      if (prev.length <= 1) return prev;
      const [top, ...rest] = prev;
      return [...rest, top];
    });
    setSwipeCount((c) => c + 1);
  };

  const handlePrev = () => {
    setDeck((prev) => {
      if (prev.length <= 1) return prev;
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
    setSwipeCount((c) => Math.max(0, c - 1));
  };

  const activeModel = deck[0];
  const activeNumber = ((swipeCount % models.length) + models.length) % models.length + 1;

  return (
    <section className="section gallery-stack-section" aria-labelledby="gallery-stack-title">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-glass">
          <div className="section-head-glass__title-row">
            <span className="section-accent-dash" aria-hidden="true" />
            <h2 id="gallery-stack-title" className="t-h2 section-head-glass__title">
              {title}
            </h2>
          </div>
          <p className="lead section-head-glass__sub">
            {subtitle}
          </p>
        </div>

        {/* 3D Interactive Card Deck Container */}
        <div className="gallery-stack__container">
          {/* Ambient Lighting Behind Deck */}
          <div className="gallery-stack__ambient-glow" aria-hidden="true" />

          {/* Cards Stage */}
          <div
            className="gallery-stack__stage"
            onClick={handleNext}
            role="region"
            aria-label="Model photo stack. Click to cycle to next model"
          >
            {deck.slice(0, 5).map((model, idx) => (
              <StackCard
                key={model.id}
                model={model}
                index={idx}
                total={Math.min(5, deck.length)}
                isTop={idx === 0}
                onSwipeOut={handleNext}
                whatsappNumber={whatsapp}
              />
            ))}
          </div>

          {/* Stack Navigation & Controls Bar */}
          <div className="gallery-stack__controls">
            <button
              type="button"
              className="gallery-stack__nav-btn"
              onClick={handlePrev}
              aria-label="Previous model"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              className="gallery-stack__shuffle-pill"
              onClick={handleNext}
              aria-label="Shuffle card stack"
            >
              <span className="shuffle-dot" />
              <span>Tap or swipe to flip · {activeNumber} / {models.length}</span>
              <span className="shuffle-arrow">↻</span>
            </button>

            <button
              type="button"
              className="gallery-stack__nav-btn"
              onClick={handleNext}
              aria-label="Next model"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Direct CTA: View All 24+ Models */}
          <div className="gallery-stack__footer-actions">
            <Link href="/models" className="btn btn--primary-glow">
              Explore Full Talent Roster (24+ Models) <GrowthArrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GalleryStack;
