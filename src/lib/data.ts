import { DEFAULT_SERVICES, DEFAULT_SETTINGS } from "./defaults";
import {
  DEMO_BRANDS, DEMO_CLIENTS, DEMO_MODELS, DEMO_PORTFOLIO, DEMO_SERVICES, DEMO_VIDEOS,
} from "./demo";
import { hasDb, publicClient } from "./supabase/server";
import type { BrandProject, Client, Model, PortfolioItem, Service, VideoProject } from "./types";

// Short in-memory cache per edge instance. Keeps pages fast and the free
// database tier relaxed. Admin edits appear within ~30 seconds.
const TTL = 30_000;
const store = new Map<string, { t: number; v: unknown }>();

export function bustCache() {
  store.clear();
}

async function cached<T>(key: string, fallback: T, fn: () => Promise<T>): Promise<T> {
  const hit = store.get(key);
  if (hit && Date.now() - hit.t < TTL) return hit.v as T;
  try {
    const v = await fn();
    store.set(key, { t: Date.now(), v });
    return v;
  } catch (e) {
    console.error(`[data] ${key} failed`, e);
    return hit ? (hit.v as T) : fallback;
  }
}

const order = <Q extends { order: (c: string, o?: { ascending: boolean }) => Q }>(q: Q) =>
  q.order("sort_order", { ascending: true }).order("created_at", { ascending: false });

export const isDemoMode = () => !hasDb();

export function getSettings(): Promise<Record<string, string>> {
  if (!hasDb()) return Promise.resolve({ ...DEFAULT_SETTINGS });
  return cached("settings", { ...DEFAULT_SETTINGS }, async () => {
    const { data, error } = await publicClient().from("site_settings").select("key,value");
    if (error) throw error;
    const merged = { ...DEFAULT_SETTINGS };
    for (const r of data ?? []) if (r.value !== null && r.value !== "") merged[r.key] = r.value;
    return merged;
  });
}

export function getServices(): Promise<Service[]> {
  const fallback = DEMO_SERVICES;
  if (!hasDb()) return Promise.resolve(fallback);
  return cached("services", fallback, async () => {
    const { data, error } = await order(publicClient().from("services").select("*"));
    if (error) throw error;
    return (data as Service[]).length ? (data as Service[]) : DEFAULT_SERVICES.map((s, i) => ({ ...s, id: `d${i}` }));
  });
}

export function getModels(opts: { featured?: boolean; limit?: number; gender?: string } = {}): Promise<Model[]> {
  const key = `models:${opts.featured ? "f" : "a"}:${opts.gender ?? ""}:${opts.limit ?? ""}`;
  if (!hasDb()) {
    let list = DEMO_MODELS;
    if (opts.featured) list = list.filter((m) => m.featured);
    if (opts.gender) list = list.filter((m) => m.gender === opts.gender);
    return Promise.resolve(list.slice(0, opts.limit ?? 100));
  }
  return cached(key, [] as Model[], async () => {
    let q = publicClient().from("models").select("*");
    if (opts.featured) q = q.eq("featured", true);
    if (opts.gender) q = q.eq("gender", opts.gender);
    const { data, error } = await order(q).limit(opts.limit ?? 100);
    if (error) throw error;
    return data as Model[];
  });
}

export async function getModel(slug: string): Promise<Model | null> {
  if (!hasDb()) return DEMO_MODELS.find((m) => m.slug === slug) ?? null;
  return cached(`model:${slug}`, null as Model | null, async () => {
    const { data, error } = await publicClient().from("models").select("*").eq("slug", slug).maybeSingle();
    if (error) throw error;
    return (data as Model) ?? null;
  });
}

export function getVideos(): Promise<VideoProject[]> {
  if (!hasDb()) return Promise.resolve(DEMO_VIDEOS);
  return cached("videos", [] as VideoProject[], async () => {
    const { data, error } = await order(publicClient().from("video_projects").select("*"));
    if (error) throw error;
    return data as VideoProject[];
  });
}

export function getBrandProjects(opts: { featured?: boolean; limit?: number } = {}): Promise<BrandProject[]> {
  if (!hasDb()) {
    const list = opts.featured ? DEMO_BRANDS.filter((b) => b.featured) : DEMO_BRANDS;
    return Promise.resolve(list.slice(0, opts.limit ?? 100));
  }
  return cached(`brands:${opts.featured ? "f" : "a"}:${opts.limit ?? ""}`, [] as BrandProject[], async () => {
    let q = publicClient().from("brand_projects").select("*");
    if (opts.featured) q = q.eq("featured", true);
    const { data, error } = await order(q).limit(opts.limit ?? 100);
    if (error) throw error;
    return data as BrandProject[];
  });
}

export async function getBrandProject(slug: string): Promise<BrandProject | null> {
  if (!hasDb()) return DEMO_BRANDS.find((b) => b.slug === slug) ?? null;
  return cached(`brand:${slug}`, null as BrandProject | null, async () => {
    const { data, error } = await publicClient().from("brand_projects").select("*").eq("slug", slug).maybeSingle();
    if (error) throw error;
    return (data as BrandProject) ?? null;
  });
}

export function getPortfolioItems(category?: string): Promise<PortfolioItem[]> {
  if (!hasDb()) {
    return Promise.resolve(category ? DEMO_PORTFOLIO.filter((p) => p.category === category) : DEMO_PORTFOLIO);
  }
  return cached(`portfolio:${category ?? "all"}`, [] as PortfolioItem[], async () => {
    let q = publicClient().from("portfolio_items").select("*");
    if (category) q = q.eq("category", category);
    const { data, error } = await order(q);
    if (error) throw error;
    return data as PortfolioItem[];
  });
}

export function getClients(): Promise<Client[]> {
  if (!hasDb()) return Promise.resolve(DEMO_CLIENTS);
  return cached("clients", [] as Client[], async () => {
    const { data, error } = await order(publicClient().from("clients").select("*"));
    if (error) throw error;
    return data as Client[];
  });
}
