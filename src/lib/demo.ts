// Preview content, shown ONLY when Supabase is not configured (local preview).
// Once Supabase env vars are set, the site reads your real content instead.
import { DEFAULT_SERVICES } from "./defaults";
import type { BrandProject, Client, Model, PortfolioItem, Service, VideoProject } from "./types";

const P = "/placeholders";

export const DEMO_SERVICES: Service[] = DEFAULT_SERVICES.map((s, i) => ({ ...s, id: `svc-${i}` }));

export const DEMO_MODELS: Model[] = [
  { id: "m1", slug: "khatab-alfarogi", name: "Khatab Alfarogi", gender: "male", bio: "Media Presenter for commercial and brand campaigns.", skills: ["Media Presenter", "On Camera"], specialties: ["Commercial", "Brand Campaigns"], photos: ["/showcase/1.webp"], showreel_url: null, showreel_poster: null, featured: true },
  { id: "m2", slug: "moumen-kholousi", name: "Moumen Kholousi", gender: "male", bio: "Media Presenter for video production and hosting.", skills: ["Media Presenter", "Hosting"], specialties: ["Video", "Hosting"], photos: ["/showcase/2.webp"], showreel_url: null, showreel_poster: null, featured: true },
  { id: "m3", slug: "elshafeai-abdelmonim", name: "Elshafeai Abdelmonim", gender: "male", bio: "Media Presenter for brand storytelling and commercials.", skills: ["Media Presenter", "Acting"], specialties: ["Brand", "Commercial"], photos: ["/showcase/3.webp"], showreel_url: null, showreel_poster: null, featured: true },
  { id: "m4", slug: "nagham-sid-ahmad", name: "Nagham Sid Ahmad", gender: "female", bio: "Media Presenter for editorial and digital campaigns.", skills: ["Media Presenter", "Hosting"], specialties: ["Editorial", "Campaigns"], photos: ["/showcase/4.webp"], showreel_url: null, showreel_poster: null, featured: true },
  { id: "m5", slug: "abdalla-ghandi-abdalla", name: "Abdalla Ghandi Abdalla", gender: "male", bio: "Media Presenter for film and commercial shoots.", skills: ["Media Presenter", "On Camera"], specialties: ["Film", "Commercials"], photos: ["/showcase/5.webp"], showreel_url: null, showreel_poster: null, featured: true },
  { id: "m6", slug: "qaba-jafar", name: "Qaba Ja'far", gender: "female", bio: "Media Presenter for digital reels and brand campaigns.", skills: ["Media Presenter", "Hosting"], specialties: ["Digital", "Brand Reels"], photos: ["/showcase/6.webp"], showreel_url: null, showreel_poster: null, featured: true },
  { id: "m7", slug: "rana-ali-hajo", name: "Rana Ali Hajo", gender: "female", bio: "Media Presenter for lifestyle and commercial productions.", skills: ["Media Presenter", "On Camera"], specialties: ["Lifestyle", "Commercial"], photos: ["/showcase/7.webp"], showreel_url: null, showreel_poster: null, featured: true },
  { id: "m8", slug: "tasabih", name: "Tasabih", gender: "female", bio: "Media Presenter for brand hosting and video campaigns.", skills: ["Media Presenter", "Hosting"], specialties: ["Hosting", "Campaigns"], photos: ["/showcase/8.webp"], showreel_url: null, showreel_poster: null, featured: true },
  { id: "m9", slug: "saad-al-faki", name: "Saad Al-Faki", gender: "male", bio: "Media Presenter for broadcast and brand advertisements.", skills: ["Media Presenter", "Voice Over"], specialties: ["Broadcast", "Brand Ads"], photos: ["/showcase/9.webp"], showreel_url: null, showreel_poster: null, featured: true },
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
