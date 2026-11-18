import { SITE } from "./site";
import type { Service } from "./types";

export type SettingDef = {
  key: string;
  label: string;
  group: string;
  type: "text" | "textarea";
  help?: string;
  value: string;
};

export const SETTING_DEFS: SettingDef[] = [
  { key: "hero_title", group: "Home page", label: "Headline", type: "text", value: "Turning ideas into impact." },
  { key: "hero_intro", group: "Home page", label: "Introduction", type: "textarea", value: "Sudan Creative Hub is an integrated marketing and creative production agency. Strategy, campaigns, film, branding and talent, handled by one team." },
  { key: "hero_cta_primary", group: "Home page", label: "Main button text", type: "text", value: "Start a project" },
  { key: "hero_cta_secondary", group: "Home page", label: "Second button text", type: "text", value: "See our work" },
  { key: "about_intro", group: "Home page", label: "About summary", type: "textarea", value: "Since 2020 we have helped companies, institutions, brands and entrepreneurs in Sudan, Egypt, India and the Gulf say what they mean and be remembered for it." },
  { key: "cta_title", group: "Home page", label: "Closing call to action headline", type: "text", value: "Have something worth showing the world?" },
  { key: "cta_text", group: "Home page", label: "Closing call to action text", type: "textarea", value: "Tell us about your project. We reply with a plan, not a sales pitch." },

  { key: "about_body", group: "About page", label: "Company overview", type: "textarea", value: "Sudan Creative Hub is an integrated marketing and creative production agency established in 2020. We specialise in marketing strategy, advertising campaigns, brand development, creative content and professional media production.\n\nWe combine strategic thinking, creativity and careful execution to help businesses and brands strengthen their market presence, speak clearly to their audiences and reach their marketing objectives." },
  { key: "vision", group: "About page", label: "Vision", type: "textarea", value: "To become a leading creative and marketing agency recognised for innovation, quality and impactful communication across regional and international markets." },
  { key: "mission", group: "About page", label: "Mission", type: "textarea", value: "To empower businesses and brands through integrated marketing and creative production solutions that turn ideas into meaningful results." },

  { key: "email", group: "Contact and footer", label: "Public email", type: "text", value: SITE.email },
  { key: "whatsapp", group: "Contact and footer", label: "WhatsApp number (digits, with country code)", type: "text", help: "Example: 249963565781. Used by every WhatsApp button on the site.", value: SITE.whatsapp },
  { key: "branch_egypt", group: "Contact and footer", label: "Egypt branch address", type: "textarea", value: "Address to be announced." },
  { key: "branch_india", group: "Contact and footer", label: "India branch address", type: "textarea", value: "Address to be announced." },
  { key: "social_facebook", group: "Contact and footer", label: "Facebook link", type: "text", value: SITE.social.facebook },
  { key: "social_instagram", group: "Contact and footer", label: "Instagram link", type: "text", value: SITE.social.instagram },
  { key: "social_tiktok", group: "Contact and footer", label: "TikTok link", type: "text", value: SITE.social.tiktok },

  { key: "seo_description", group: "Search engines", label: "Default site description (about 150 characters)", type: "textarea", value: "Sudan Creative Hub is an integrated marketing and creative production agency: strategy, video, branding, design, photography, talent casting and digital campaigns for Sudan, Egypt, India and the Gulf." },
];

export const DEFAULT_SETTINGS: Record<string, string> = Object.fromEntries(
  SETTING_DEFS.map((s) => [s.key, s.value]),
);

export const DEFAULT_SERVICES: Omit<Service, "id">[] = [
  { sort_order: 1, title: "Marketing Strategy & Consulting", summary: "A clear plan before any money is spent.", details: ["Marketing strategy development", "Market and audience research", "Marketing planning and consulting"] },
  { sort_order: 2, title: "Video Production", summary: "Films and reels that hold attention to the last second.", details: ["Reels production", "Commercial advertising videos", "Filming and directing", "Editing and post-production"] },
  { sort_order: 3, title: "Branding & Visual Identity", summary: "An identity people recognise before they read the name.", details: ["Logo design", "Brand identity development", "Brand guidelines", "Brand applications"] },
  { sort_order: 4, title: "Graphic Design", summary: "Design that is built for the feed, the shelf and the street.", details: ["Social media designs", "Advertising creatives", "Marketing materials and print designs"] },
  { sort_order: 5, title: "Models & Talent Casting", summary: "The right faces for your campaign, coordinated for you.", details: ["Male and female commercial models", "Talent selection for campaigns", "Model coordination for photoshoots and video production"] },
  { sort_order: 6, title: "Photography & Commercial Production", summary: "Images that sell the product before the caption does.", details: ["Product photography", "Commercial photography", "Professional photoshoots"] },
  { sort_order: 7, title: "Creative Content & Scriptwriting", summary: "Ideas and words that sound like your brand.", details: ["Marketing content creation", "Video scriptwriting", "Creative concept development", "Advertising copywriting"] },
  { sort_order: 8, title: "Social Media Management", summary: "Consistent presence without the daily scramble.", details: ["Content planning", "Account management", "Content scheduling", "Performance monitoring"] },
  { sort_order: 9, title: "Digital Advertising & Campaign Management", summary: "Paid campaigns that are watched, measured and improved.", details: ["Digital advertising campaigns", "Paid advertising management", "Campaign performance analysis"] },
];

export const SERVICE_OPTIONS = [...DEFAULT_SERVICES.map((s) => s.title), "Not sure yet"];
