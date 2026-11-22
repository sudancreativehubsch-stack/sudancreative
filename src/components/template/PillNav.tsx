"use client";

import { animate, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLink {
  label: string;
  href: string;
}

export interface PillNavProps {
  links?: NavLink[];
  textColor?: string;
  activeTextColor?: string;
  highlightColor?: string;
  pillColor?: string;
  borderColor?: string;
  fontSize?: number;
  activeIndex?: number;
  style?: CSSProperties;
}

const SPRING = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.8 };

function NavItem(props: {
  link: NavLink;
  index: number;
  lit: boolean;
  color: string;
  litColor: string;
  fontSize: number;
  onEnter: (i: number) => void;
  onClick: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
  register: (i: number, el: HTMLAnchorElement | null) => void;
}) {
  const { link, index, lit, color, litColor, fontSize, onEnter, onClick, register } = props;
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });
  const [hover, setHover] = useState(false);

  return (
    <motion.a
      ref={(el) => register(index, el)}
      href={link.href}
      onClick={(e) => onClick(e, link.href)}
      onMouseEnter={() => {
        setHover(true);
        onEnter(index);
      }}
      onMouseLeave={() => {
        setHover(false);
        x.set(0);
        y.set(0);
      }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 10);
        y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 6);
      }}
      style={{
        x,
        y,
        position: "relative",
        zIndex: 1,
        display: "inline-flex",
        alignItems: "center",
        minHeight: 40,
        boxSizing: "border-box",
        padding: "8px 20px",
        borderRadius: 999,
        textDecoration: "none",
        fontSize,
        fontWeight: 600,
        lineHeight: 1.2,
        color: lit ? litColor : color,
        transition: "color 0.25s ease",
        whiteSpace: "nowrap",
        cursor: "pointer",
        fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <span style={{ position: "relative", display: "inline-block", overflow: "hidden", height: "1.2em" }}>
        <motion.span
          style={{ display: "block" }}
          animate={{ y: hover ? "-50%" : "0%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ display: "block", height: "1.2em" }}>{link.label}</span>
          <span aria-hidden style={{ display: "block", height: "1.2em", color: "#fbc701" }}>
            {link.label}
          </span>
        </motion.span>
      </span>
    </motion.a>
  );
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Models", href: "/models" },
  { label: "Contact", href: "/contact" },
];

export function PillNav(props: PillNavProps) {
  const {
    links = DEFAULT_LINKS,
    textColor = "rgba(255, 255, 255, 0.8)",
    activeTextColor = "#050b4d",
    highlightColor = "#fbc701",
    pillColor = "rgba(11, 24, 140, 0.45)",
    borderColor = "rgba(255, 255, 255, 0.18)",
    fontSize = 15,
  } = props;

  const pathname = usePathname();
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  const initialIndex = links.findIndex(
    (l) => l.href === pathname || (l.href !== "/" && pathname.startsWith(l.href))
  );
  const [active, setActive] = useState<number>(initialIndex >= 0 ? initialIndex : 0);

  const hx = useMotionValue(0);
  const hw = useMotionValue(0);
  const ho = useMotionValue(1);
  const placed = useRef(false);

  const target = hovered ?? active;

  useEffect(() => {
    const el = itemRefs.current[target];
    if (!el) return;
    const left = el.offsetLeft;
    const width = el.offsetWidth;
    if (!placed.current) {
      hx.set(left);
      hw.set(width);
      placed.current = true;
    } else {
      animate(hx, left, SPRING);
      animate(hw, width, SPRING);
    }
    animate(ho, 1, { duration: 0.25 });
  }, [target, links.length, fontSize]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      onMouseLeave={() => setHovered(null)}
      style={{
        ...props.style,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        padding: 5,
        borderRadius: 999,
        background: pillColor,
        border: `1px solid ${borderColor}`,
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
        minWidth: "max-content",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
      }}
    >
      <motion.span
        aria-hidden
        style={{
          position: "absolute",
          top: 5,
          bottom: 5,
          left: 0,
          x: hx,
          width: hw,
          opacity: ho,
          borderRadius: 999,
          background: highlightColor,
          zIndex: 0,
          boxShadow: "0 2px 14px rgba(251, 199, 1, 0.45)",
        }}
      />
      {links.map((link, i) => (
        <NavItem
          key={link.href}
          link={link}
          index={i}
          lit={i === target}
          color={textColor}
          litColor={activeTextColor}
          fontSize={fontSize}
          onEnter={setHovered}
          onClick={handleClick}
          register={(idx, el) => (itemRefs.current[idx] = el)}
        />
      ))}
    </nav>
  );
}
