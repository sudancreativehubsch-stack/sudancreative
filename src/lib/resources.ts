import { PORTFOLIO_CATEGORIES, VIDEO_CATEGORIES } from "./site";

export type FieldType =
  | "text" | "textarea" | "select" | "number" | "checkbox" | "tags"
  | "image" | "images" | "video" | "file" | "palette" | "fonts";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  help?: string;
  folder?: string;
  max?: number;
};

export type Resource = {
  key: string;
  table: string;
  singular: string;
  plural: string;
  hint: string;
  titleField: string;
  slugFrom?: string;
  publicPath?: (r: Record<string, unknown>) => string | null;
  columns: { name: string; label: string }[];
  fields: Field[];
};

const common: Field[] = [
  { name: "featured", label: "Featured on the home page", type: "checkbox" },
  { name: "published", label: "Visible on the website", type: "checkbox" },
  { name: "sort_order", label: "Order (smaller numbers appear first)", type: "number" },
];

export const RESOURCES: Record<string, Resource> = {
  models: {
    key: "models", table: "models", singular: "model", plural: "Models & talent",
    hint: "Profiles shown on the Models & Talent page. Each has a Choose This Model button that opens WhatsApp.",
    titleField: "name", slugFrom: "name",
    publicPath: (r) => (r.slug ? `/models/${r.slug}` : null),
    columns: [{ name: "gender", label: "Gender" }, { name: "published", label: "Visible" }, { name: "featured", label: "Featured" }],
    fields: [
      { name: "name", label: "Name or stage name", type: "text", required: true, max: 80 },
      { name: "gender", label: "Gender", type: "select", required: true, options: [{ value: "female", label: "Female" }, { value: "male", label: "Male" }] },
      { name: "photos", label: "Photos (first photo is the cover)", type: "images", folder: "models", help: "Use the arrows to reorder." },
      { name: "bio", label: "Short biography", type: "textarea", max: 1200 },
      { name: "skills", label: "Skills", type: "tags", help: "Press Enter after each one." },
      { name: "specialties", label: "Advertising specialties", type: "tags", help: "Press Enter after each one." },
      { name: "showreel_url", label: "Sample video / showreel", type: "video", folder: "models" },
      { name: "showreel_poster", label: "Showreel cover image", type: "image", folder: "models" },
      ...common,
    ],
  },
  videos: {
    key: "videos", table: "video_projects", singular: "video project", plural: "Video portfolio",
    hint: "Videos play on the cinematic Video Production page. Only the project title is shown, never a client name.",
    titleField: "title", publicPath: () => "/portfolio/video",
    columns: [{ name: "category", label: "Category" }, { name: "published", label: "Visible" }, { name: "featured", label: "Featured" }],
    fields: [
      { name: "title", label: "Project title", type: "text", required: true, max: 120 },
      { name: "category", label: "Category", type: "select", required: true, options: VIDEO_CATEGORIES.map((c) => ({ value: c, label: c })) },
      { name: "video_url", label: "Video file", type: "video", required: true, folder: "videos", help: "MP4, 1080p, under 100 MB gives the fastest playback." },
      { name: "thumbnail", label: "Thumbnail", type: "image", folder: "videos", help: "Created automatically from the video if you leave it empty." },
      { name: "description", label: "Description", type: "textarea", max: 600 },
      ...common,
    ],
  },
  branding: {
    key: "branding", table: "brand_projects", singular: "branding project", plural: "Branding projects",
    hint: "Each project gets its own case study page with gallery, palette, typography and optional guidelines PDF.",
    titleField: "title", slugFrom: "title",
    publicPath: (r) => (r.slug ? `/portfolio/branding/${r.slug}` : null),
    columns: [{ name: "year", label: "Year" }, { name: "published", label: "Visible" }, { name: "featured", label: "Featured" }],
    fields: [
      { name: "title", label: "Project title", type: "text", required: true, max: 120 },
      { name: "year", label: "Year", type: "text", max: 10 },
      { name: "overview", label: "Short project overview", type: "textarea", max: 1500 },
      { name: "cover", label: "Cover image", type: "image", folder: "branding" },
      { name: "logo_image", label: "Logo design presentation", type: "image", folder: "branding" },
      { name: "palette", label: "Brand colour palette", type: "palette" },
      { name: "fonts", label: "Typography and fonts", type: "fonts" },
      { name: "images", label: "Gallery: applications and mockups", type: "images", folder: "branding", help: "Use the arrows to set the order." },
      { name: "guidelines_pdf", label: "Brand Guidelines PDF", type: "file", folder: "branding" },
      ...common,
    ],
  },
  portfolio: {
    key: "portfolio", table: "portfolio_items", singular: "portfolio item", plural: "Design, photo & campaign work",
    hint: "Graphic design, photography and advertising campaign work shown in image galleries.",
    titleField: "title", publicPath: (r) => (r.category ? `/portfolio/${r.category}` : null),
    columns: [{ name: "category", label: "Category" }, { name: "published", label: "Visible" }],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, max: 120 },
      { name: "category", label: "Category", type: "select", required: true, options: PORTFOLIO_CATEGORIES.map((c) => ({ value: c.slug, label: c.label })) },
      { name: "image", label: "Image", type: "image", required: true, folder: "portfolio" },
      { name: "description", label: "Caption (optional)", type: "textarea", max: 300 },
      ...common,
    ],
  },
  clients: {
    key: "clients", table: "clients", singular: "client logo", plural: "Client logos",
    hint: "Logos appear in one uniform grid. Use transparent PNG or SVG, ideally a single colour or full colour on transparent.",
    titleField: "name", publicPath: () => "/clients",
    columns: [{ name: "published", label: "Visible" }],
    fields: [
      { name: "name", label: "Client name (used for accessibility only, not displayed)", type: "text", required: true, max: 80 },
      { name: "logo", label: "Logo", type: "image", required: true, folder: "clients" },
      { name: "published", label: "Visible on the website", type: "checkbox" },
      { name: "sort_order", label: "Order (smaller numbers appear first)", type: "number" },
    ],
  },
  services: {
    key: "services", table: "services", singular: "service", plural: "Services",
    hint: "The nine services shown on the home page and the Our Services page.",
    titleField: "title", publicPath: () => "/services",
    columns: [{ name: "published", label: "Visible" }, { name: "sort_order", label: "Order" }],
    fields: [
      { name: "title", label: "Service name", type: "text", required: true, max: 100 },
      { name: "summary", label: "One-line summary", type: "text", max: 160 },
      { name: "details", label: "What it includes", type: "tags", help: "Press Enter after each item." },
      { name: "published", label: "Visible on the website", type: "checkbox" },
      { name: "sort_order", label: "Order (smaller numbers appear first)", type: "number" },
    ],
  },
};

export const RESOURCE_ORDER = ["models", "videos", "branding", "portfolio", "clients", "services"];

export function defaultsFor(r: Resource): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of r.fields) {
    if (f.type === "checkbox") out[f.name] = f.name === "published";
    else if (f.type === "number") out[f.name] = 0;
    else if (["tags", "images", "palette", "fonts"].includes(f.type)) out[f.name] = [];
    else out[f.name] = "";
  }
  return out;
}
