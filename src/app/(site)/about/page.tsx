import type { Metadata } from "next";
import Link from "next/link";
import { GrowthArrow } from "@/components/Shapes";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Sudan Creative Hub is an integrated marketing and creative production agency established in 2020, serving Sudan, Egypt, India and the Gulf.",
  alternates: { canonical: "/about" },
};

export default async function About() {
  const s = await getSettings();
  return (
    <>
      <section className="section">
        <div className="wrap">
          <h1 className="t-h1" style={{ maxWidth: "14ch" }}>Strategy, creativity and craft under one roof.</h1>
          <div style={{ marginTop: "3rem", display: "grid", gap: "2rem" }} className="contact-grid">
            <div className="stack">
              {s.about_body.split("\n\n").map((p, i) => <p key={i} className="lead" style={{ maxWidth: "52ch" }}>{p}</p>)}
            </div>
            <dl className="contact-list" style={{ margin: 0 }}>
              <dt style={{ marginTop: 0 }}>Established</dt><dd>2020</dd>
              <dt>Markets</dt><dd>Sudan, Egypt, India and the Gulf region</dd>
              <dt>Branches</dt><dd>Egypt and India</dd>
              <dt>Who we work with</dt><dd>Companies, institutions, brands and entrepreneurs</dd>
            </dl>
          </div>
        </div>
      </section>

      <section className="section slab--blue" aria-labelledby="vision-title">
        <div className="wrap" style={{ display: "grid", gap: "3rem" }}>
          <div>
            <h2 id="vision-title" className="t-h2">Our vision</h2>
            <p className="statement" style={{ marginTop: "1.5rem", maxWidth: "26ch" }}>{s.vision}</p>
          </div>
        </div>
      </section>

      <section className="section slab--yellow" aria-labelledby="mission-title">
        <div className="wrap">
          <h2 id="mission-title" className="t-h2">Our mission</h2>
          <p className="statement" style={{ marginTop: "1.5rem", maxWidth: "26ch" }}>{s.mission}</p>
          <div className="btn-row">
            <Link className="btn btn--black" href="/services">What we do <GrowthArrow /></Link>
            <Link className="btn btn--ghost-dark" href="/contact">Work with us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
