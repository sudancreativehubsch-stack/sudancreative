"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Transition } from "framer-motion";

export interface ShapeShiftCardItem {
  eyebrow: string;
  title: string;
  description: string;
  detail?: string;
  cta?: string;
  link?: string;
  icon?: string;
  shape?: "flower" | "orbit" | "diamond" | "star";
  background?: string;
  shapeColor?: string;
  detailColor?: string;
}

export const DEFAULT_SERVICES_ITEMS: ShapeShiftCardItem[] = [
  {
    eyebrow: "01  /  STRATEGY",
    title: "Marketing Strategy & Consulting",
    description: "A clear plan before any money is spent.",
    detail: "Comprehensive market positioning, competitor analysis & high-converting campaign roadmaps.",
    cta: "Explore Strategy",
    link: "/services#marketing-strategy-consulting",
    icon: "/icons/strategy.webp",
    shape: "flower",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(11, 24, 140, 0.5) 100%)",
    shapeColor: "#f57210",
    detailColor: "#fbc701",
  },
  {
    eyebrow: "02  /  FILM",
    title: "Video Production",
    description: "Films and reels that hold attention to the last second.",
    detail: "4K cinema cameras, bespoke sound design, cinematic color grade & fast 48h turnaround.",
    cta: "Explore Films",
    link: "/services#video-production",
    icon: "/icons/video.webp",
    shape: "orbit",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(9, 18, 107, 0.55) 100%)",
    shapeColor: "#00d2ff",
    detailColor: "#fbc701",
  },
  {
    eyebrow: "03  /  IDENTITY",
    title: "Branding & Visual Identity",
    description: "An identity people recognise before they read the name.",
    detail: "Bespoke bilingual Arabic & English typography, luxury packaging & distinctive design systems.",
    cta: "Explore Branding",
    link: "/services#branding-visual-identity",
    icon: "/icons/branding.webp",
    shape: "diamond",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(14, 28, 120, 0.5) 100%)",
    shapeColor: "#fbc701",
    detailColor: "#f57210",
  },
  {
    eyebrow: "04  /  GRAPHICS",
    title: "Graphic Design",
    description: "Design that is built for the feed, the shelf and the street.",
    detail: "High-impact social assets, street-level out-of-home campaigns & print packaging.",
    cta: "Explore Design",
    link: "/services#graphic-design",
    icon: "/icons/graphics.webp",
    shape: "orbit",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(11, 24, 140, 0.5) 100%)",
    shapeColor: "#a855f7",
    detailColor: "#00d2ff",
  },
  {
    eyebrow: "05  /  TALENT",
    title: "Models & Talent Casting",
    description: "Male and female talent for commercials, films and brand campaigns.",
    detail: "Direct access to our curated roster of commercial models & editorial talent across the region.",
    cta: "View Talent",
    link: "/models",
    icon: "/icons/models.webp",
    shape: "flower",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(15, 23, 85, 0.55) 100%)",
    shapeColor: "#f57210",
    detailColor: "#ff775f",
  },
  {
    eyebrow: "06  /  STILLS",
    title: "Photography & Commercial Production",
    description: "High-quality shoots for products, brands and campaigns.",
    detail: "Studio commercial photography, editorial fashion sets & dynamic location coverage.",
    cta: "Explore Shoots",
    link: "/services#photography-commercial-production",
    icon: "/icons/photography.webp",
    shape: "diamond",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(11, 24, 140, 0.5) 100%)",
    shapeColor: "#00d2ff",
    detailColor: "#fbc701",
  },
  {
    eyebrow: "07  /  NARRATIVE",
    title: "Creative Content & Scriptwriting",
    description: "Ideas, scripts and storylines that connect and convert.",
    detail: "Bilingual hooks, episodic commercial series & high-retention social script treatments.",
    cta: "Explore Content",
    link: "/services#creative-content-scriptwriting",
    icon: "/icons/creative.webp",
    shape: "flower",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(9, 18, 107, 0.55) 100%)",
    shapeColor: "#fbc701",
    detailColor: "#f57210",
  },
  {
    eyebrow: "08  /  COMMUNITY",
    title: "Social Media Management",
    description: "From content to community and real results.",
    detail: "End-to-end community moderation, viral trends curation & active retention growth.",
    cta: "Explore Social",
    link: "/services#social-media-management",
    icon: "/icons/socialmedia.webp",
    shape: "orbit",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(14, 28, 120, 0.5) 100%)",
    shapeColor: "#f57210",
    detailColor: "#00d2ff",
  },
  {
    eyebrow: "09  /  PERFORMANCE",
    title: "Digital Advertising & Campaign Management",
    description: "Targeted campaigns that drive visibility, leads and growth.",
    detail: "Data-driven media buying across Meta & TikTok with conversion funnel optimization.",
    cta: "Explore Ads",
    link: "/services#digital-advertising-campaign-management",
    icon: "/icons/digitalservice.webp",
    shape: "diamond",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(11, 24, 140, 0.5) 100%)",
    shapeColor: "#00d2ff",
    detailColor: "#fbc701",
  },
];

const safeHex = (v?: string, fallback = "#4652ED") => (typeof v === "string" && v ? v : fallback);

function pathFor(kind: string, animated: boolean) {
  const out: string[] = [];
  const n = 64;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    let r: number;
    if (kind === "flower") {
      r = animated ? 87 + 14 * Math.cos(7 * a) : 76 + 29 * Math.cos(7 * a);
    } else if (kind === "orbit") {
      r = animated ? 81 + 14 * Math.sin(5 * a + 0.6) : 77 + 26 * Math.sin(5 * a + 0.6);
    } else if (kind === "star") {
      r = animated ? 85 + 18 * Math.cos(5 * a) : 75 + 28 * Math.cos(5 * a);
    } else {
      r = animated ? 83 + 15 * Math.cos(4 * a + 0.55) : 76 + 28 * Math.cos(4 * a + 0.55);
    }
    const x = 150 + Math.cos(a) * r * 1.19;
    const y = 121 + Math.sin(a) * r * 0.93;
    out.push((i ? "L" : "M") + x.toFixed(2) + "," + y.toFixed(2));
  }
  return out.join(" ") + " Z";
}

function ShapeArt({ item, active, reduced }: { item: ShapeShiftCardItem; active: boolean; reduced: boolean }) {
  const kind = item.shape || "flower";
  const path = pathFor(kind, active);
  const transition: Transition = reduced ? { duration: 0 } : { duration: 0.55, ease: [0.18, 0.76, 0.22, 1] as [number, number, number, number] };

  if (item.icon) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          width: "100%",
          height: 220,
          flexShrink: 0,
          overflow: "hidden",
          background: "#020a6b",
        }}
      >
        <motion.img
          src={item.icon}
          alt=""
          loading="eager"
          initial={false}
          animate={{
            scale: active ? 1.07 : 1,
          }}
          transition={transition}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        {/* Soft bottom blend into card text area */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(2, 10, 107, 0.25) 0%, transparent 25%, transparent 68%, rgba(5, 11, 77, 0.96) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        minHeight: 150,
        flex: "1 1 auto",
        display: "grid",
        placeItems: "center",
        overflow: "visible",
      }}
    >
      <motion.svg
        viewBox="0 0 300 242"
        initial={false}
        animate={{ rotate: active ? 13 : -11, scale: active ? 1.06 : 0.96 }}
        transition={transition}
        style={{ width: "100%", height: "100%", maxWidth: 280, maxHeight: 210, overflow: "visible", display: "block" }}
      >
        <motion.path
          d={path}
          initial={false}
          animate={{ d: path }}
          transition={transition}
          fill={safeHex(item.shapeColor, "#f57210")}
        />
        <motion.circle
          cx="185"
          cy="87"
          r="33"
          initial={false}
          animate={{ cx: active ? 203 : 184, cy: active ? 76 : 96, scale: active ? 0.75 : 1 }}
          transition={transition}
          fill="none"
          stroke={safeHex(item.detailColor, "#fbc701")}
          strokeWidth="10"
        />
        <circle cx="97" cy="162" r="10" fill={safeHex(item.detailColor, "#fbc701")} />
      </motion.svg>
      <motion.div
        initial={false}
        animate={{ rotate: active ? -21 : 15, y: active ? -8 : 4 }}
        transition={transition}
        style={{
          position: "absolute",
          width: 30,
          height: 30,
          border: "2.5px solid " + safeHex(item.shapeColor, "#f57210"),
          borderRadius: kind === "orbit" ? "50%" : 7,
          right: "6%",
          bottom: "12%",
          transform: "rotate(16deg)",
        }}
      />
    </div>
  );
}

export interface ShapeShiftCardsProps {
  items?: ShapeShiftCardItem[];
  cardHeight?: number;
  cardGap?: number;
  minCardWidth?: number;
  radius?: number;
  cardPadding?: number;
  selectionLift?: number;
  motionSpeed?: number;
  surface?: string;
  textColor?: string;
  mutedColor?: string;
  style?: React.CSSProperties;
}

export function ShapeShiftCards({
  items = DEFAULT_SERVICES_ITEMS,
  cardHeight = 470,
  cardGap = 16,
  minCardWidth = 260,
  radius = 22,
  cardPadding = 24,
  selectionLift = 6,
  motionSpeed = 0.45,
  surface = "transparent",
  textColor = "#ffffff",
  mutedColor = "rgba(255, 255, 255, 0.75)",
  style,
}: ShapeShiftCardsProps) {
  const safeItems = Array.isArray(items) && items.length ? items : DEFAULT_SERVICES_ITEMS;
  const reduced = useReducedMotion() ?? false;
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [focused, setFocused] = React.useState<number | null>(null);

  const headingStyle: React.CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 800,
    fontSize: "1.25rem",
    lineHeight: "1.2em",
    letterSpacing: "-0.02em",
    margin: 0,
    color: textColor,
  };

  const bodyStyle: React.CSSProperties = {
    fontFamily: 'inherit',
    fontSize: "0.92rem",
    lineHeight: "1.5em",
    fontWeight: 400,
    margin: 0,
    color: mutedColor,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'inherit',
    fontSize: "0.72rem",
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  const transition: Transition = reduced ? { duration: 0 } : { duration: Math.max(0.12, motionSpeed), ease: [0.2, 0.78, 0.22, 1] as [number, number, number, number] };

  return (
    <div
      className="shapeshift-container"
      style={{
        width: "100%",
        height: "auto",
        minWidth: 0,
        boxSizing: "border-box",
        backgroundColor: surface,
        ...style,
      }}
    >
      <style>{`
        .ssc-card {
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .ssc-card:hover {
          border-color: rgba(251, 199, 1, 0.45);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45), 0 0 25px rgba(245, 114, 16, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }
        .ssc-link:focus-visible {
          outline: 3px solid #fbc701;
        }
        @media (hover: none), (pointer: coarse) {
          .ssc-hover-cta {
            opacity: 1 !important;
            transform: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ssc-hover-cta {
            transition: none !important;
          }
        }
        @media (max-width: 639px) {
          .ssc-card {
            border-radius: 18px !important;
            min-height: 400px !important;
          }
        }
      `}</style>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${Math.max(220, minCardWidth)}px), 1fr))`,
          gap: Math.max(0, cardGap),
          width: "100%",
          boxSizing: "border-box",
          alignItems: "stretch",
        }}
      >
        {safeItems.map((item, index) => {
          const active = hovered === index || focused === index;
          const href = (item.link || "").trim();
          const hasLink = href.length > 0;
          const isExternal = href.startsWith("http");

          return (
            <motion.div
              key={index}
              className="ssc-card"
              initial={false}
              animate={{
                y: active ? -selectionLift : 0,
                scale: active ? 1.015 : 1,
              }}
              transition={transition}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                minHeight: Math.max(360, cardHeight),
                height: "100%",
                minWidth: 0,
                borderRadius: Math.max(0, radius),
                background: item.background || "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(10, 24, 85, 0.5) 100%)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                padding: item.icon ? 0 : Math.max(14, cardPadding),
                isolation: "isolate",
              }}
            >
              {/* Header: Eyebrow + Accent Dot */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 8,
                  alignItems: "center",
                  flexShrink: 0,
                  padding: item.icon ? `${Math.max(16, cardPadding * 0.7)}px ${Math.max(16, cardPadding)}px 10px` : 0,
                  background: item.icon ? "rgba(3, 10, 74, 0.85)" : "transparent",
                  borderBottom: item.icon ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                  zIndex: 1,
                }}
              >
                <span style={{ ...labelStyle, color: item.shapeColor || textColor }}>
                  {item.eyebrow}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    height: 8,
                    width: 8,
                    backgroundColor: item.shapeColor || "#fbc701",
                    borderRadius: "50%",
                    boxShadow: `0 0 10px ${item.shapeColor || "#fbc701"}`,
                  }}
                />
              </div>

              {/* Full-Width 3D Service Icon or Parametric SVG */}
              <ShapeArt item={item} active={active} reduced={reduced} />

              {/* Title & Description / Detail */}
              <div
                style={{
                  flex: "1 1 auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  position: "relative",
                  minHeight: 110,
                  padding: item.icon ? `14px ${Math.max(16, cardPadding)}px ${hasLink ? Math.max(46, cardPadding + 28) : Math.max(18, cardPadding)}px` : `0 0 ${hasLink ? 36 : 0}px`,
                  pointerEvents: "none",
                }}
              >
                <h3 style={{ ...headingStyle, marginBottom: 8, overflowWrap: "anywhere" }}>
                  {item.title}
                </h3>
                <p style={{ ...bodyStyle, maxWidth: 300, overflowWrap: "anywhere" }}>
                  {active && item.detail ? item.detail : item.description}
                </p>
              </div>

              {/* Hover Sliding CTA Button */}
              {hasLink && (
                isExternal ? (
                  <a
                    className="ssc-link"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onFocus={(event) => {
                      if (event.currentTarget.matches(":focus-visible")) setFocused(index);
                    }}
                    onBlur={() => setFocused(null)}
                    onClick={() => setFocused(null)}
                    aria-label={`${item.cta || "Get Started"}: ${item.title}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "block",
                      cursor: "pointer",
                      zIndex: 2,
                      borderRadius: Math.max(0, radius),
                      textDecoration: "none",
                    }}
                  >
                    <span
                      className="ssc-hover-cta"
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        bottom: Math.max(12, cardPadding),
                        left: Math.max(12, cardPadding),
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        color: textColor,
                        ...labelStyle,
                        letterSpacing: "0.02em",
                        fontSize: "0.82rem",
                        textTransform: "none",
                        opacity: active ? 1 : 0,
                        transform: active ? "translateY(0px)" : "translateY(8px)",
                        transition: reduced ? "none" : `opacity ${Math.max(0.12, motionSpeed)}s ease, transform ${Math.max(0.12, motionSpeed)}s ease`,
                      }}
                    >
                      <span style={{ fontWeight: 700, color: "#fbc701" }}>{item.cta || "Get Started"}</span>
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          border: "1.5px solid #fbc701",
                          color: "#fbc701",
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 13,
                          lineHeight: 1,
                        }}
                      >
                        ↗
                      </span>
                    </span>
                  </a>
                ) : (
                  <Link
                    className="ssc-link"
                    href={href}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(":focus-visible")) setFocused(index);
                    }}
                    onBlur={() => setFocused(null)}
                    onClick={() => setFocused(null)}
                    aria-label={`${item.cta || "Get Started"}: ${item.title}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "block",
                      cursor: "pointer",
                      zIndex: 2,
                      borderRadius: Math.max(0, radius),
                      textDecoration: "none",
                    }}
                  >
                    <span
                      className="ssc-hover-cta"
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        bottom: Math.max(12, cardPadding),
                        left: Math.max(12, cardPadding),
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        color: textColor,
                        ...labelStyle,
                        letterSpacing: "0.02em",
                        fontSize: "0.82rem",
                        textTransform: "none",
                        opacity: active ? 1 : 0,
                        transform: active ? "translateY(0px)" : "translateY(8px)",
                        transition: reduced ? "none" : `opacity ${Math.max(0.12, motionSpeed)}s ease, transform ${Math.max(0.12, motionSpeed)}s ease`,
                      }}
                    >
                      <span style={{ fontWeight: 700, color: "#fbc701" }}>{item.cta || "Get Started"}</span>
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          border: "1.5px solid #fbc701",
                          color: "#fbc701",
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 13,
                          lineHeight: 1,
                        }}
                      >
                        ↗
                      </span>
                    </span>
                  </Link>
                )
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ShapeShiftCards;
