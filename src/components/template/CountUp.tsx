"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";

export interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  size?: number;
  color?: string;
  suffixColor?: string;
  suffixScale?: number;
  replay?: boolean;
  unit?: string;
  weight?: number;
  style?: CSSProperties;
}

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function CountUp(props: CountUpProps) {
  const {
    value = 12,
    prefix = "",
    suffix = "+",
    duration = 2.4,
    size = 64,
    color = "#ffffff",
    suffixColor = "#fbc701",
    suffixScale = 0.62,
    replay = true,
    unit = "",
    weight = 700,
  } = props;

  const target = Math.max(0, Math.round(value));
  const places = String(target).length;
  const rootRef = useRef<HTMLSpanElement>(null);
  const stripRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const colRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const inView = useInView(rootRef, { once: !replay, amount: 0.6 });

  const paint = (v: number) => {
    for (let i = 0; i < places; i++) {
      const p = Math.pow(10, i);
      const whole = Math.floor(v / p);
      const carry = i === 0 ? v - Math.floor(v) : clamp01((v % p) - (p - 1));
      const pos = (whole % 10) + carry;
      const c = places - 1 - i;
      const strip = stripRefs.current[c];
      if (strip) strip.style.transform = `translate3d(0, ${(-pos * 100) / 11}%, 0)`;
      const col = colRefs.current[c];
      if (col) col.style.opacity = i === 0 ? "1" : String(clamp01(v - (p - 1)));
    }
  };

  useEffect(() => {
    if (!inView) {
      paint(0);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: paint,
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  const digit: CSSProperties = { display: "block", height: "1em", lineHeight: 1 };

  return (
    <span
      ref={rootRef}
      role="img"
      aria-label={`${prefix}${target}${unit}${suffix}`}
      style={{
        ...props.style,
        position: "relative",
        display: "inline-flex",
        alignItems: "flex-start",
        whiteSpace: "nowrap",
        minWidth: "max-content",
        color,
        fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: weight,
        fontSize: size,
        letterSpacing: `${-size * 0.047}px`,
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {prefix && <span>{prefix}</span>}
      {Array.from({ length: places }, (_, c) => (
        <span
          key={c}
          ref={(el) => {
            colRefs.current[c] = el;
          }}
          aria-hidden
          style={{ display: "inline-block", position: "relative", height: "1em", overflow: "hidden" }}
        >
          <span style={{ ...digit, visibility: "hidden" }}>0</span>
          <span
            ref={(el) => {
              stripRefs.current[c] = el;
            }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "1100%",
              willChange: "transform",
            }}
          >
            {DIGITS.map((d, k) => (
              <span key={k} style={{ ...digit, height: `${100 / 11}%` }}>
                {d}
              </span>
            ))}
          </span>
        </span>
      ))}
      {unit && <span>{unit}</span>}
      {suffix && (
        <span
          aria-hidden
          style={{ color: suffixColor, fontSize: size * suffixScale, lineHeight: 1, marginLeft: "0.06em", letterSpacing: 0 }}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}
