export const SITE = {
  name: "Sudan Creative Hub",
  tagline: "Turning Ideas Into Impact.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  founded: 2020,
  email: "sudancreativehubsch@gmail.com",
  // The brief lists +24996356578. Change it here or in Admin > Site text.
  whatsapp: "24996356578",
  social: {
    facebook: "https://www.facebook.com/share/1Hzfzewp77/",
    instagram: "https://www.instagram.com/sudan_creative_hub?stkn=MW9waGIxZDRycmRpNw==",
    tiktok: "https://www.tiktok.com/@sudansch?_r=1&_t=ZS-99tGBqJvdS6",
  },
  markets: ["Sudan", "Egypt", "India", "the Gulf"],
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/portfolio", label: "Our Portfolio" },
  { href: "/models", label: "Models & Talent" },
  { href: "/clients", label: "Our Clients" },
  { href: "/contact", label: "Contact Us" },
] as const;

export const VIDEO_CATEGORIES = [
  "Commercial Ads",
  "Reels Production",
  "Brand Videos",
  "Product Videos",
  "Campaign Videos",
  "Creative Videos",
] as const;

export const PORTFOLIO_CATEGORIES = [
  { slug: "graphic-design", label: "Graphic Design", blurb: "Social media designs, advertising creatives and print." },
  { slug: "photography", label: "Photography", blurb: "Product, commercial and campaign photography." },
  { slug: "advertising-campaigns", label: "Advertising Campaigns", blurb: "Campaigns built from idea to delivery." },
] as const;
