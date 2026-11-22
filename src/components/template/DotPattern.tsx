import type { CSSProperties } from "react";

export interface DotPatternProps {
  dotColor?: string;
  dotOpacity?: number;
  dotSize?: number;
  spacing?: number;
  fade?: number;
  glow?: boolean;
  glowColor?: string;
  glowOpacity?: number;
  glowSize?: number;
  glowX?: number;
  glowY?: number;
  style?: CSSProperties;
}

export function DotPattern(props: DotPatternProps) {
  const {
    dotColor = "rgba(255, 255, 255, 0.3)",
    dotOpacity = 0.14,
    dotSize = 1.4,
    spacing = 24,
    fade = 70,
    glow = true,
    glowColor = "#0b188c",
    glowOpacity = 0.35,
    glowSize = 65,
    glowX = 50,
    glowY = 40,
  } = props;

  const mask = `radial-gradient(ellipse ${fade}% ${fade}% at 50% 50%, #000 35%, transparent 100%)`;

  return (
    <div
      aria-hidden
      style={{
        ...props.style,
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: dotOpacity,
          backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize + 0.6}px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
          backgroundPosition: "center center",
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
      {glow && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: glowOpacity,
            background: `radial-gradient(ellipse ${glowSize}% ${glowSize}% at ${glowX}% ${glowY}%, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
