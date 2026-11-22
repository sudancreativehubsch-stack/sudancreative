"use client";

import { useRef, useState, useEffect } from "react";

/**
 * Creates an interactive mouse spotlight effect on glass containers,
 * identical to modern Linear.app and Framer Motion showcase designs.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(0, 210, 255, 0.15)",
  as: Component = "div",
  href,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  as?: any;
  href?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Component
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href={href}
      onClick={onClick}
      {...props}
    >
      {/* Interactive Cursor-Tracking Ambient Spotlight */}
      <div
        className="spotlight-card__spotlight"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Animated Glass Shimmer Reflection */}
      <div className="spotlight-card__shimmer" aria-hidden="true" />

      {/* Card Content */}
      <div className="spotlight-card__inner">{children}</div>
    </Component>
  );
}
