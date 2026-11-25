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
    name: "Khatab Alfarogi",
    category: "Media Presenter",
    specs: "Media Presenter · Commercial & Brand Campaigns",
    photo: "/showcase/1.webp",
    slug: "khatab-alfarogi",
  },
  {
    id: "m-2",
    name: "Moumen Kholousi",
    category: "Media Presenter",
    specs: "Media Presenter · Video & Hosting",
    photo: "/showcase/2.webp",
    slug: "moumen-kholousi",
  },
  {
    id: "m-3",
    name: "Elshafeai Abdelmonim",
    category: "Media Presenter",
    specs: "Media Presenter · Brand & Commercial",
    photo: "/showcase/3.webp",
    slug: "elshafeai-abdelmonim",
  },
  {
    id: "m-4",
    name: "Nagham Sid Ahmad",
    category: "Media Presenter",
    specs: "Media Presenter · Editorial & Campaigns",
    photo: "/showcase/4.webp",
    slug: "nagham-sid-ahmad",
  },
  {
    id: "m-5",
    name: "Abdalla Ghandi Abdalla",
    category: "Media Presenter",
    specs: "Media Presenter · Film & Commercials",
    photo: "/showcase/5.webp",
    slug: "abdalla-ghandi-abdalla",
  },
  {
    id: "m-6",
    name: "Qaba Ja'far",
    category: "Media Presenter",
    specs: "Media Presenter · Digital & Brand Reels",
    photo: "/showcase/6.webp",
    slug: "qaba-jafar",
  },
  {
    id: "m-7",
    name: "Rana Ali Hajo",
    category: "Media Presenter",
    specs: "Media Presenter · Lifestyle & Commercial",
    photo: "/showcase/7.webp",
    slug: "rana-ali-hajo",
  },
  {
    id: "m-8",
    name: "Tasabih",
    category: "Media Presenter",
    specs: "Media Presenter · Hosting & Campaigns",
    photo: "/showcase/8.webp",
    slug: "tasabih",
  },
  {
    id: "m-9",
    name: "Saad Al-Faki",
    category: "Media Presenter",
    specs: "Media Presenter · Broadcast & Brand Ads",
    photo: "/showcase/9.webp",
    slug: "saad-al-faki",
  },
];

// Aesthetic natural tilt angles mimicking a shuffled physical Polaroid deck
const TILT_ANGLES = [0, -3.5, 4, -2.5, 3, -4.5, 2.5, -2, 3.5];

interface StackCardProps {
  model: StackModelItem;
  index: number;
  total: number;
  cardNumber: number;
  rosterTotal: number;
  isTop: boolean;
  onSwipeOut: (dir: number) => void;
  whatsappNumber: string;
}

function StackCard({ model, index, total, cardNumber, rosterTotal, isTop, onSwipeOut, whatsappNumber }: StackCardProps) {
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
        {/* Full Unobstructed Model Poster */}
        <div className="gallery-stack__media">
          <img
            src={model.photo}
            alt={model.name}
            className="gallery-stack__photo"
            draggable={false}
            loading={index < 3 ? "eager" : "lazy"}
          />
        </div>

        {/* Dedicated Footer Bar Below Poster (No Image Overlap) */}
        <div className="gallery-stack__bottom-info">
          <span className="gallery-stack__counter-pill">
            {String(cardNumber).padStart(2, "0")} / {String(rosterTotal).padStart(2, "0")}
          </span>

          <div className="gallery-stack__actions">
            <a
              href={waLink(whatsappNumber, `Hello Sudan Creative Hub, I would like to book ${model.name} for a project.`)}
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
  hideFooterCta?: boolean;
}

export function GalleryStack({
  models = DEFAULT_STACK_MODELS,
  whatsapp = "249963565781",
  title = "Models & Talent Casting",
  subtitle = "Interactive talent deck. Click, swipe, or tap to shuffle through our roster.",
  hideFooterCta = false,
}: GalleryStackProps) {
  const [deck, setDeck] = React.useState<StackModelItem[]>(models);
  const [swipeCount, setSwipeCount] = React.useState(0);

  React.useEffect(() => {
    setDeck(models);
    setSwipeCount(0);
  }, [models]);

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
    setSwipeCount((c) => c - 1);
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
                cardNumber={Math.max(1, models.findIndex((m) => m.id === model.id) + 1)}
                rosterTotal={models.length}
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

          {/* Direct CTA: View All Talent */}
          {!hideFooterCta && (
            <div className="gallery-stack__footer-actions">
              <Link href="/models" className="btn btn--primary-glow">
                Explore Full Talent Roster ({models.length} Talent) <GrowthArrow />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default GalleryStack;
