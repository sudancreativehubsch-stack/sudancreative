import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { GrowthArrow } from "@/components/Shapes";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="section">
        <div className="wrap">
          <h1 className="t-hero" style={{ color: "var(--orange)" }}>404</h1>
          <p className="lead" style={{ margin: "1.5rem 0 2rem" }}>That page does not exist or has moved.</p>
          <Link className="btn btn--yellow" href="/">Back to home <GrowthArrow /></Link>
        </div>
      </section>
    </SiteChrome>
  );
}
