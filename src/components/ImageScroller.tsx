"use client";

import { useEffect, useState, useRef, useMemo, startTransition } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

export interface ScrollerItem {
  id: string;
  text: string;
  subtext?: string;
  category?: string;
  image: { src: string; alt?: string };
  video?: string;
}

const DEFAULT_ITEMS: ScrollerItem[] = [
  {
    id: "item-1",
    text: "Cinematic Commercials",
    subtext: "4K Cinema DCI · High-Production Brand Films",
    category: "Commercial Film",
    image: { src: "/about-studio.jpg", alt: "Cinematic Commercials" },
    video: "/sample-reel.mp4",
  },
  {
    id: "item-2",
    text: "High-Retention 9:16 Reels",
    subtext: "+104.9% Lift · Engineered for TikTok & Instagram",
    category: "Vertical Video",
    image: { src: "/models/model-1.jpg", alt: "9:16 Reels" },
    video: "/reels/reel-1.mp4",
  },
  {
    id: "item-3",
    text: "Editorial Fashion & Talent",
    subtext: "12+ Exclusive Models · Runway & Commercial Roster",
    category: "Talent & Casting",
    image: { src: "/models/model-3.jpg", alt: "Model Casting" },
  },
  {
    id: "item-4",
    text: "Digital Growth Campaigns",
    subtext: "25M+ Views · Sudan · Egypt · India · Gulf",
    category: "Growth & Scale",
    image: { src: "/models/model-4.jpg", alt: "Growth Campaigns" },
    video: "/reels/reel-2.mp4",
  },
  {
    id: "item-5",
    text: "Brand Identity Systems",
    subtext: "Bespoke Arabic & Latin Typography · Packaging",
    category: "Visual Identity",
    image: { src: "/models/model-6.jpg", alt: "Brand Identity" },
  },
];

export function ImageScroller({
  items = DEFAULT_ITEMS,
  dockPosition = "right",
}: {
  items?: ScrollerItem[];
  dockPosition?: "right" | "left" | "center";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = items.length;

  // Sync activeIndex with scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (total === 0) return;
      const newIndex = Math.min(Math.floor(latest * total), total - 1);
      startTransition(() => {
        setActiveIndex(newIndex);
      });
    });
    return () => unsubscribe();
  }, [scrollYProgress, total]);

  const handleThumbnailClick = (index: number) => {
    if (typeof window !== "undefined" && containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const sectionHeight = window.innerHeight;
      const scrollTarget = containerTop + index * sectionHeight;
      window.scrollTo({ top: scrollTarget, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  const current = items[activeIndex] || items[0];

  return (
    <div
      ref={containerRef}
      className="framer-scroller-root"
      style={{
        position: "relative",
        width: "100%",
        height: `${total * 100}vh`,
        backgroundColor: "#030617",
      }}
    >
      <div
        ref={stickyRef}
        className="framer-scroller-stage"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Full-bleed background media with crossfade */}
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.div
              key={item.id}
              className="framer-scroller-slide"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
              }}
              initial={{ opacity: index === 0 ? 1 : 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {item.video ? (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    position: "absolute",
                    inset: 0,
                  }}
                />
              ) : (
                <img
                  src={item.image.src}
                  alt={item.image.alt || item.text}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    position: "absolute",
                    inset: 0,
                  }}
                />
              )}

              {/* Luminous Scrim / Gradient for contrast */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(3, 6, 23, 0.45) 0%, rgba(3, 6, 23, 0.82) 100%), linear-gradient(to top, rgba(3, 6, 23, 0.9) 0%, transparent 40%, rgba(3, 6, 23, 0.7) 100%)",
                }}
              />
            </motion.div>
          );
        })}

        {/* Centered Editorial Typography (Matches original Framer component) */}
        <div
          className="framer-scroller-text-overlay"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pointerEvents: "none",
            padding: "0 1.5rem",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "850px",
              }}
            >
              {current.category && (
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#fbc701",
                    background: "rgba(251, 199, 1, 0.15)",
                    border: "1px solid rgba(251, 199, 1, 0.35)",
                    padding: "0.35rem 0.95rem",
                    borderRadius: "999px",
                    marginBottom: "1.25rem",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {current.category}
                </span>
              )}

              <h2
                style={{
                  fontSize: "clamp(2.5rem, 6.5vw, 5.2rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  color: "#ffffff",
                  margin: "0 0 1rem",
                  textShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
                }}
              >
                {current.text}
              </h2>

              {current.subtext && (
                <p
                  style={{
                    fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.85)",
                    maxWidth: "60ch",
                    lineHeight: 1.5,
                    margin: 0,
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  {current.subtext}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Vertical Thumbnail Dock (Matches original Framer ImageScroller) */}
        <div
          ref={dockRef}
          className="framer-scroller-dock-container"
          style={{
            position: "absolute",
            top: "50%",
            right: "2.5rem",
            transform: "translateY(-50%)",
            zIndex: 10,
            pointerEvents: "auto",
          }}
        >
          <div
            style={{
              position: "relative",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              borderRadius: 20,
              padding: "10px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* Drag Handle Bar (Signature feature from Framer component) */}
            <div
              style={{
                width: 32,
                height: 5,
                borderRadius: 999,
                background: "rgba(255, 255, 255, 0.35)",
                marginBottom: 4,
              }}
              aria-label="Dock Handle"
            />

            {/* Thumbnail Stack */}
            <div
              className="framer-scroller-thumb-stack"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {items.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleThumbnailClick(index)}
                    style={{
                      position: "relative",
                      width: 64,
                      height: 64,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 14,
                    }}
                  >
                    {/* Active White Outline Spring Animation */}
                    {isActive && (
                      <motion.div
                        layoutId="framer-thumb-outline"
                        style={{
                          position: "absolute",
                          inset: -3,
                          border: "2.5px solid #ffffff",
                          borderRadius: 16,
                          pointerEvents: "none",
                          zIndex: 5,
                          boxShadow: "0 0 16px rgba(255, 255, 255, 0.7)",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}

                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 12,
                        overflow: "hidden",
                        opacity: isActive ? 1 : 0.6,
                        transition: "opacity 0.25s ease, transform 0.25s ease",
                        transform: isActive ? "scale(1)" : "scale(0.96)",
                      }}
                    >
                      <img
                        src={item.image.src}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll helper indicator at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            pointerEvents: "none",
          }}
        >
          <span>Scroll to transition</span>
          <span style={{ color: "#fbc701" }}>↓</span>
        </div>
      </div>
    </div>
  );
}
