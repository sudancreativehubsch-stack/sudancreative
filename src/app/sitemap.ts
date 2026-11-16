import type { MetadataRoute } from "next";
import { getBrandProjects, getModels } from "@/lib/data";
import { PORTFOLIO_CATEGORIES, SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [models, brands] = await Promise.all([getModels(), getBrandProjects()]);
  const now = new Date();
  const fixed = ["", "/about", "/services", "/portfolio", "/portfolio/video", "/portfolio/branding", "/models", "/clients", "/contact", "/privacy", "/terms", "/cookies"];
  return [
    ...fixed.map((p) => ({ url: `${SITE.url}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...PORTFOLIO_CATEGORIES.map((c) => ({ url: `${SITE.url}/portfolio/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...brands.map((b) => ({ url: `${SITE.url}/portfolio/branding/${b.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...models.map((m) => ({ url: `${SITE.url}/models/${m.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
