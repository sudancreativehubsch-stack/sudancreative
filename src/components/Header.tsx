"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { LogoMark } from "./Logo";
import { GrowthArrow } from "./Shapes";
import { PillNav } from "./template/PillNav";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap site-header__bar">
        <Link className="logo" href="/" aria-label="Sudan Creative Hub, home">
          <LogoMark />
          <span className="logo__word">Sudan<br />Creative Hub</span>
        </Link>

        {/* Desktop Magnetic Sliding Pill Navigation */}
        <div className="header-pill-nav-wrap">
          <PillNav
            links={NAV.map((n) => ({ label: n.label, href: n.href }))}
            textColor="rgba(255, 255, 255, 0.85)"
            activeTextColor="#050b4d"
            highlightColor="#fbc701"
            pillColor="rgba(11, 24, 140, 0.45)"
            borderColor="rgba(255, 255, 255, 0.2)"
            fontSize={15}
          />
        </div>

        <Link className="btn btn--primary-pill header-cta" href="/contact">
          Start a Project <GrowthArrow />
        </Link>

        <button
          type="button"
          className={`menu-btn menu-btn--glass ${open ? "menu-btn--open" : ""}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <nav id="mobile-nav" className="mobile-nav" aria-label="Main" hidden={!open}>
        {NAV.map((n) => (
          <Link key={n.href} className="mlink" href={n.href}>{n.label}</Link>
        ))}
        <Link className="btn btn--primary-glow" href="/contact" style={{ marginTop: "2rem" }}>
          Start a project <GrowthArrow />
        </Link>
      </nav>
    </header>
  );
}
