// Preview content, shown ONLY when Supabase is not configured (local preview).
// Once Supabase env vars are set, the site reads your real content instead.
import { DEFAULT_SERVICES } from "./defaults";
import type { BrandProject, Client, Model, PortfolioItem, Service, VideoProject } from "./types";

const P = "/placeholders";

export const DEMO_SERVICES: Service[] = DEFAULT_SERVICES.map((s, i) => ({ ...s, id: `svc-${i}` }));

export const DEMO_MODELS: Model[] = [
  { id: "m1", slug: "sample-model-one", name: "Sample Model One", gender: "female", bio: "Placeholder profile. Add real models, photos and showreels in the admin dashboard.", skills: ["Runway", "On camera"], specialties: ["Fashion", "Beauty"], photos: [`${P}/portrait-a.svg`, `${P}/portrait-b.svg`], showreel_url: null, showreel_poster: null, featured: true },
  { id: "m2", slug: "sample-model-two", name: "Sample Model Two", gender: "male", bio: "Placeholder profile. Add real models, photos and showreels in the admin dashboard.", skills: ["Voice over", "Acting"], specialties: ["Corporate", "Lifestyle"], photos: [`${P}/portrait-c.svg`, `${P}/portrait-d.svg`], showreel_url: null, showreel_poster: null, featured: true },
  { id: "m3", slug: "sample-model-three", name: "Sample Model Three", gender: "female", bio: "Placeholder profile. Add real models, photos and showreels in the admin dashboard.", skills: ["Hosting", "Product demos"], specialties: ["Commercial", "Product"], photos: [`${P}/portrait-b.svg`], showreel_url: null, showreel_poster: null, featured: true },
  { id: "m4", slug: "sample-model-four", name: "Sample Model Four", gender: "male", bio: "Placeholder profile. Add real models, photos and showreels in the admin dashboard.", skills: ["Fitness", "Action"], specialties: ["Sport", "Automotive"], photos: [`${P}/portrait-d.svg`], showreel_url: null, showreel_poster: null, featured: true },
];

export const DEMO_VIDEOS: VideoProject[] = [];

export const DEMO_BRANDS: BrandProject[] = [
  { id: "b1", slug: "sample-brand-one", title: "Sample Brand One", year: "2025", overview: "Placeholder case study. Upload a logo presentation, palette, typography, mockups and a guidelines PDF in the admin dashboard.", cover: `${P}/wide-a.svg`, logo_image: null, palette: [{ name: "Royal Blue", hex: "#0a13eb" }, { name: "Vivid Orange", hex: "#f57210" }, { name: "Golden Yellow", hex: "#fbc701" }, { name: "Pure Black", hex: "#000000" }], fonts: [{ name: "Archivo", usage: "Headlines and interface" }], images: [`${P}/wide-a.svg`, `${P}/wide-b.svg`, `${P}/square-a.svg`], guidelines_pdf: null, featured: true },
  { id: "b2", slug: "sample-brand-two", title: "Sample Brand Two", year: "2025", overview: "Placeholder case study. Replace it with your own work.", cover: `${P}/wide-b.svg`, logo_image: null, palette: [{ name: "Orange", hex: "#f57210" }, { name: "Black", hex: "#000000" }], fonts: [], images: [`${P}/wide-b.svg`], guidelines_pdf: null, featured: true },
];

export const DEMO_PORTFOLIO: PortfolioItem[] = [
  { id: "p1", title: "Sample design one", category: "graphic-design", image: `${P}/square-a.svg`, description: null, featured: false },
  { id: "p2", title: "Sample design two", category: "graphic-design", image: `${P}/portrait-a.svg`, description: null, featured: false },
  { id: "p3", title: "Sample photograph", category: "photography", image: `${P}/wide-b.svg`, description: null, featured: false },
  { id: "p4", title: "Sample campaign", category: "advertising-campaigns", image: `${P}/wide-a.svg`, description: null, featured: false },
];

export const DEMO_CLIENTS: Client[] = [];
