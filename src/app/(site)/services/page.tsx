import type { Metadata } from "next";
import Link from "next/link";
import { GrowthArrow } from "@/components/Shapes";
import { getServices } from "@/lib/data";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Marketing strategy, video production, branding, graphic design, models and talent casting, photography, content, social media and digital advertising.",
  alternates: { canonical: "/services" },
};

export default async function Services() {
  const services = await getServices();
  return (
    <>
      <section className="section--tight" style={{ paddingTop: "clamp(3rem,7vw,6rem)" }}>
        <div className="wrap">
          <h1 className="t-h1">Our services</h1>
          <p className="lead muted" style={{ marginTop: "1.5rem" }}>
            From the first strategy session to the final cut. Start with one service or bring us the whole campaign.
          </p>
        </div>
      </section>
      <section className="section--tight" style={{ paddingBottom: "clamp(4rem,9vw,8rem)" }}>
        <div className="wrap">
          {services.map((s) => (
            <article key={s.id} id={slugify(s.title)} className="service">
              <div>
                <h2 className="t-h2" style={{ fontSize: "clamp(2rem,4.8vw,4rem)" }}>{s.title}</h2>
                <p className="lead muted" style={{ marginTop: "1rem" }}>{s.summary}</p>
              </div>
              <ul>{s.details.map((d) => <li key={d}>{d}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
      <section className="section--tight slab--orange" style={{ paddingBlock: "clamp(3rem,6vw,5rem)" }}>
        <div className="wrap btn-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <p className="t-h3" style={{ margin: 0, maxWidth: "26ch" }}>Not sure which service fits? Tell us the goal and we will map it.</p>
          <Link className="btn btn--black" href="/contact">Start a project <GrowthArrow /></Link>
        </div>
      </section>
    </>
  );
}
