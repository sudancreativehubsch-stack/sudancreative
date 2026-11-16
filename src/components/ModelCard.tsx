import Link from "next/link";
import type { Model } from "@/lib/types";
import { modelWaMessage, waLink } from "@/lib/utils";
import { Pic } from "./Pic";
import { WhatsAppIcon } from "./Shapes";

export function ModelCard({ m, whatsapp }: { m: Model; whatsapp: string }) {
  return (
    <article className="model">
      <Link className="model__photo" href={`/models/${m.slug}`} aria-label={`View profile: ${m.name}`}>
        <Pic src={m.photos[0]} alt={`${m.name}, ${m.gender} model`} sizes="(min-width: 900px) 25vw, 50vw" width={600} height={800} />
        <span className="model__name">{m.name}</span>
      </Link>
      {m.specialties.length ? <p className="model__meta">{m.specialties.slice(0, 3).join(", ")}</p> : null}
      <a
        className="btn btn--white" style={{ justifyContent: "center" }} target="_blank" rel="noopener noreferrer"
        href={waLink(whatsapp, modelWaMessage(m.name, `/models/${m.slug}`))}
      >
        <WhatsAppIcon /> Choose this model
      </a>
    </article>
  );
}
