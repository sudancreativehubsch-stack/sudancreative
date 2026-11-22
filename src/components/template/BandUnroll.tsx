"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  image?: string;
}

export interface BandUnrollProps {
  stats?: Stat[];
  cardColor?: string;
  textColor?: string;
  suffixColor?: string;
  backColor?: string;
  numberSize?: number;
  labelSize?: number;
  cardHeight?: number;
  gap?: number;
  radius?: number;
  twist?: number;
  duration?: number;
  dots?: boolean;
  dotColor?: string;
  style?: CSSProperties;
}

const DEFAULT_STATS: Stat[] = [
  { value: 5, suffix: "+", label: "Years Active in Creative Production", image: "/about-studio.jpg" },
  { value: 120, suffix: "+", label: "Brand Films & Campaigns Built", image: "/models/model-1.jpg" },
  { value: 98, suffix: "%", label: "Client Satisfaction Across Regions", image: "/models/model-3.jpg" },
  { value: 4, suffix: " Hubs", label: "Sudan · Egypt · India · Arab Gulf", image: "/models/model-4.jpg" },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function useProgress(ref: { current: HTMLElement | null }, enabled: boolean) {
  const [p, setP] = useState(1);
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    let raf = 0;
    let target = 0;
    let cur = -1;
    const read = () => {
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight || 1;
      const top = el.getBoundingClientRect().top;
      target = clamp((vh * 0.98 - top) / (vh * 0.68));
    };
    const tick = () => {
      raf = 0;
      read();
      if (cur < 0) cur = target;
      cur += (target - cur) * 0.09;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      setP(cur);
      if (cur !== target) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    kick();
    const t = window.setTimeout(kick, 400);
    document.addEventListener("scroll", kick, { capture: true, passive: true });
    window.addEventListener("resize", kick);
    return () => {
      document.removeEventListener("scroll", kick, true);
      window.removeEventListener("resize", kick);
      window.clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);
  return p;
}

function useCount(to: number, run: boolean, duration: number) {
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!run) {
      setN(0);
      return;
    }
    if (typeof window === "undefined") return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = clamp((now - t0) / (duration * 1000));
      setN(Math.round(to * easeOut(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, duration]);
  return n;
}

const RW = 300;
const RH = 170;

function DotsBg(props: { color: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg aria-hidden viewBox={`0 0 ${RW} ${RH}`} preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <defs>
        <pattern id={`d${id}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.6" fill={props.color} />
        </pattern>
        <linearGradient id={`g${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id={`m${id}`}>
          <rect width={RW} height={RH} fill={`url(#g${id})`} />
        </mask>
      </defs>
      <rect width={RW} height={RH} fill={`url(#d${id})`} mask={`url(#m${id})`} />
    </svg>
  );
}

function Card(props: { stat: Stat; index: number; count: number; progress: number; p: BandUnrollProps; animate: boolean }) {
  const { stat, index, count, progress, p, animate } = props;
  const c = count > 1 ? index / (count - 1) - 0.5 : 0;
  const phase = c * Math.PI * 1.7;

  const a = easeInOut(clamp(progress / 0.55));
  const flipStart = 0.42 + index * 0.08;
  const flipEnd = Math.min(1, flipStart + 0.32);
  const f = easeInOut(clamp((progress - flipStart) / (flipEnd - flipStart)));

  const ry = lerp(180 + Math.sin(phase) * (p.twist ?? 55), 180, a) * (1 - f);
  const rx = lerp(Math.cos(phase) * 18, 0, a);
  const rz = lerp(-Math.sin(phase) * 9, 0, a);
  const y = lerp(Math.sin(phase * 1.25) * 70 - 40, 0, a);
  const s = lerp(0.84, 1, a);
  const front = Math.cos((ry * Math.PI) / 180) >= 0;

  const run = !animate || progress >= flipStart + (flipEnd - flipStart) * 0.5;
  const n = useCount(stat.value, run, animate ? (p.duration ?? 2) : 0.0001);

  const face: CSSProperties = { position: "absolute", inset: 0, borderRadius: p.radius, overflow: "hidden" };

  return (
    <div style={{ position: "relative", height: p.cardHeight, perspective: 1400 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: animate ? `translateY(${y}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${s})` : "none",
          willChange: animate ? "transform" : undefined,
        }}
      >
        {front ? (
          <div
            style={{
              ...face,
              background: p.cardColor,
              display: "flex",
              alignItems: "center",
              gap: 15,
              padding: "0 24px",
              boxSizing: "border-box",
              fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
              color: p.textColor,
              border: "1px solid rgba(255, 255, 255, 0.16)",
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            {p.dots && <DotsBg color={p.dotColor || "rgba(255, 255, 255, 0.15)"} />}
            <div style={{ position: "relative", display: "flex", alignItems: "flex-start", fontSize: p.numberSize, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
              {n}
              <span style={{ fontSize: (p.numberSize ?? 64) * 0.5, lineHeight: 1, marginTop: -2, color: p.suffixColor }}>{stat.suffix}</span>
            </div>
            <div style={{ position: "relative", fontSize: p.labelSize, fontWeight: 500, lineHeight: 1.3, color: "rgba(255, 255, 255, 0.9)" }}>{stat.label}</div>
          </div>
        ) : (
          <div style={{ ...face, transform: "scaleX(-1)", background: p.backColor, border: "1px solid rgba(255, 255, 255, 0.15)" }}>
            <img
              src={stat.image || "/about-studio.jpg"}
              alt=""
              draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function BandUnroll(props: BandUnrollProps) {
  const stats = props.stats && props.stats.length ? props.stats : DEFAULT_STATS;
  const p: BandUnrollProps = {
    ...props,
    stats,
    cardColor: props.cardColor || "linear-gradient(135deg, rgba(11, 24, 140, 0.85) 0%, rgba(5, 11, 77, 0.95) 100%)",
    textColor: props.textColor || "#ffffff",
    suffixColor: props.suffixColor || "#fbc701",
    backColor: props.backColor || "#09126b",
    numberSize: props.numberSize ?? 56,
    labelSize: props.labelSize ?? 17,
    cardHeight: typeof props.cardHeight === "number" ? props.cardHeight : 150,
    gap: props.gap ?? 20,
    radius: props.radius ?? 20,
    twist: props.twist ?? 55,
    duration: props.duration ?? 2,
    dots: props.dots ?? true,
    dotColor: props.dotColor || "rgba(255, 255, 255, 0.18)",
  };

  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const animate = mounted;
  const progress = useProgress(ref, animate);

  const [cols, setCols] = useState(stats.length);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      const next = w < 600 ? 1 : w < 1000 ? 2 : stats.length;
      setCols((c) => (c === next ? c : next));
    };
    update();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [stats.length]);

  return (
    <div
      ref={ref}
      style={{
        ...props.style,
        position: "relative",
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${Math.max(1, cols)}, minmax(0, 1fr))` as any,
        gap: p.gap,
      }}
    >
      {stats.map((s, i) => (
        <Card key={i} stat={s} index={i} count={stats.length} progress={animate ? progress : 1} p={p} animate={animate} />
      ))}
    </div>
  );
}
