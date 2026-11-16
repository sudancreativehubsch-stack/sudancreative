import type { Metadata } from "next";
import Link from "next/link";
import { Pic } from "@/components/Pic";
import { GrowthArrow } from "@/components/Shapes";
import { getClients } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Clients",
  description: "Companies, institutions and brands that work with Sudan Creative Hub.",
  alternates: { canonical: "/clients" },
};

export default async function Clients() {
  const clients = await getClients();
  return (
    <section className="section--tight" style={{ paddingTop: "clamp(3rem,7vw,6rem)", paddingBottom: "clamp(4rem,9vw,8rem)" }}>
      <div className="wrap">
        <h1 className="t-h1">Our clients</h1>
        <p className="lead muted" style={{ margin: "1.5rem 0 3rem" }}>The companies, institutions and brands we have built work for.</p>
        {clients.length ? (
          <ul className="logos">
            {clients.map((c) => <li key={c.id}><Pic src={c.logo} alt={c.name} small sizes="170px" /></li>)}
          </ul>
        ) : (
          <div className="empty"><p>Client logos will appear here once they are added.</p></div>
        )}
        <p style={{ marginTop: "3rem" }}><Link className="btn btn--yellow" href="/contact">Become our next client <GrowthArrow /></Link></p>
      </div>
    </section>
  );
}
