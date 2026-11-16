export type Service = {
  id: string;
  title: string;
  summary: string;
  details: string[];
  sort_order: number;
};

export type Model = {
  id: string;
  slug: string;
  name: string;
  gender: "female" | "male";
  bio: string;
  skills: string[];
  specialties: string[];
  photos: string[];
  showreel_url: string | null;
  showreel_poster: string | null;
  featured: boolean;
};

export type VideoProject = {
  id: string;
  title: string;
  description: string;
  category: string;
  video_url: string;
  thumbnail: string | null;
  featured: boolean;
};

export type PaletteColor = { name: string; hex: string };
export type FontSpec = { name: string; usage: string };

export type BrandProject = {
  id: string;
  slug: string;
  title: string;
  year: string | null;
  overview: string;
  cover: string | null;
  logo_image: string | null;
  palette: PaletteColor[];
  fonts: FontSpec[];
  images: string[];
  guidelines_pdf: string | null;
  featured: boolean;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string | null;
  featured: boolean;
};

export type Client = { id: string; name: string; logo: string };

export type Inquiry = {
  id: string;
  name: string;
  contact: string;
  service: string;
  details: string;
  status: "new" | "handled";
  created_at: string;
};

export type Role = "admin" | "editor" | "viewer";
