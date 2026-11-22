"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export interface RibbonMarqueeProps {
  images?: string[];
  ribbonColor?: string;
  cardColor?: string;
  ribbonWidth?: number;
  amplitude?: number;
  wavelength?: number;
  cardWidth?: number;
  cardHeight?: number;
  gap?: number;
  speed?: number;
  twistSpeed?: number;
  radius?: number;
  style?: CSSProperties;
}

const DEFAULT_IMAGES = [
  "/models/model-1.jpg",
  "/models/model-2.jpg",
  "/models/model-3.jpg",
  "/models/model-4.jpg",
  "/models/model-6.jpg",
  "/models/model-7.jpg",
  "/models/model-8.jpg",
  "/models/model-9.jpg",
];

export function RibbonMarquee(props: RibbonMarqueeProps) {
  const images = props.images && props.images.length ? props.images : DEFAULT_IMAGES;
  const ribbonColor = props.ribbonColor || "linear-gradient(90deg, #f57210, #fbc701)";
  const cardColor = props.cardColor || "#050b4d";
  const ribbonWidth = props.ribbonWidth ?? 70;
  const amplitude = props.amplitude ?? 65;
  const wavelength = props.wavelength ?? 900;
  const cardW = props.cardWidth ?? 90;
  const cardH = props.cardHeight ?? 120;
  const gap = props.gap ?? 70;
  const speed = props.speed ?? 55;
  const twistSpeed = props.twistSpeed ?? 0.6;
  const radius = props.radius ?? 12;

  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spacing = cardW + gap;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let offset = 0;
    let t = 0;

    const draw = () => {
      const w = root.clientWidth || 1440;
      const h = root.clientHeight || 320;
      const cy = h / 2;
      const k = (Math.PI * 2) / wavelength;
      const yAt = (x: number) => cy + amplitude * Math.sin(k * x + t * 0.35);
      const twistAt = (x: number) => Math.cos(k * 0.75 * x - t * twistSpeed * 2);

      const top: string[] = [];
      const bot: string[] = [];
      for (let x = -20; x <= w + 20; x += 8) {
        const y = yAt(x);
        const half = (ribbonWidth / 2) * Math.max(0.08, Math.abs(twistAt(x)));
        top.push(`${x},${(y - half).toFixed(1)}`);
        bot.unshift(`${x},${(y + half).toFixed(1)}`);
      }
      if (pathRef.current) pathRef.current.setAttribute("d", `M${top.join(" L")} L${bot.join(" L")} Z`);

      const loop = images.length * spacing;
      const count = Math.ceil((w + spacing * 2) / loop) * images.length;
      for (let i = 0; i < cardRefs.current.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        if (i >= count) {
          el.style.display = "none";
          continue;
        }
        el.style.display = "block";
        let x = (i * spacing - offset) % (count * spacing);
        if (x < -spacing) x += count * spacing;
        const cx = x + cardW / 2;
        const y = yAt(cx);
        const slope = (yAt(cx + 1) - yAt(cx - 1)) / 2;
        const angle = (Math.atan(slope) * 180) / Math.PI;
        const tw = twistAt(cx);
        const sy = 0.35 + 0.65 * Math.abs(tw);
        el.style.transform = `translate(${x.toFixed(1)}px, ${(y - cardH / 2).toFixed(1)}px) rotate(${angle.toFixed(2)}deg) scaleY(${sy.toFixed(3)})`;
        el.style.filter = `brightness(${(0.75 + 0.25 * Math.abs(tw)).toFixed(2)})`;
      }
    };

    const loopLength = images.length * spacing || 1;
    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      offset = (offset + speed * dt) % loopLength;
      t += dt;
      draw();
      if (visible) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    draw();
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) start();
      });
      io.observe(root);
    } else start();

    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [images.length, ribbonWidth, amplitude, wavelength, cardW, cardH, gap, speed, twistSpeed]);

  const total = images.length * Math.max(2, Math.ceil(2600 / (images.length * spacing)));

  return (
    <div ref={rootRef} aria-hidden style={{ ...props.style, position: "relative", width: "100%", height: 320, overflow: "hidden", pointerEvents: "none" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f57210" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#fbc701" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0b188c" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path ref={pathRef} fill="url(#ribbonGrad)" />
      </svg>
      {Array.from({ length: total }).map((_, i) => {
        const img = images[i % images.length];
        return (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: cardW,
              height: cardH,
              borderRadius: radius,
              overflow: "hidden",
              background: cardColor,
              boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.2)",
              willChange: "transform",
            }}
          >
            <img src={img} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        );
      })}
    </div>
  );
}
