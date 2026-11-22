"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { LogoMark } from "./Logo";
import { GrowthArrow } from "./Shapes";

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

  const current = (href: string) => {
    if (!path) return undefined;
    const isCurrent = href === "/" ? path === "/" : path === href || path.startsWith(href + "/");
    return isCurrent ? "page" : undefined;
  };

  return (
    <header className="site-header">
      <div className="wrap site-header__bar">
        <Link className="logo" href="/" aria-label="Sudan Creative Hub, home">
          <LogoMark />
          <span className="logo__word">Sudan<br />Creative Hub</span>
        </Link>

        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href)}>{n.label}</Link>
          ))}
        </nav>

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
          <Link key={n.href} className="mlink" href={n.href} aria-current={current(n.href)}>{n.label}</Link>
        ))}
        <Link className="btn btn--primary-glow" href="/contact" style={{ marginTop: "2rem" }}>
          Start a project <GrowthArrow />
        </Link>
      </nav>
    </header>
  );
}
