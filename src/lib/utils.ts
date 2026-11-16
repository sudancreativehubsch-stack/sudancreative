import { SITE } from "./site";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function waLink(number: string, text: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function modelWaMessage(name: string, path?: string): string {
  const url = path ? ` ${SITE.url}${path}` : "";
  return `Hello Sudan Creative Hub, I would like to choose the model "${name}" for a project.${url}`;
}

/** Use the small variant of an uploaded image when one exists (-640.webp). */
export function thumb(url: string | null | undefined, width = 640): string {
  if (!url) return "";
  if (/\/m\//.test(url) && /\.webp$/.test(url) && !/-\d+\.webp$/.test(url)) {
    return url.replace(/\.webp$/, `-${width}.webp`);
  }
  return url;
}

export function srcSet(url: string | null | undefined, full = 1600): string | undefined {
  if (!url) return undefined;
  const small = thumb(url);
  return small !== url ? `${small} 640w, ${url} ${full}w` : undefined;
}

/** Pick black or white text for a given hex background. */
export function readableOn(hex: string): "#000" | "#fff" {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return "#fff";
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.35 ? "#000" : "#fff";
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}
