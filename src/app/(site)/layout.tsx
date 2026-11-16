import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import { getSettings } from "@/lib/data";
import { SITE } from "@/lib/site";

// Always render fresh so edits made in the admin dashboard show up without a rebuild.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(SITE.url),
    title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
    description: s.seo_description,
    applicationName: SITE.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website", siteName: SITE.name, title: `${SITE.name} | ${SITE.tagline}`, description: s.seo_description,
      url: SITE.url, images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }], locale: "en",
    },
    twitter: { card: "summary_large_image", title: SITE.name, description: s.seo_description, images: ["/og.png"] },
    verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
    robots: { index: true, follow: true },
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    description: s.seo_description,
    url: SITE.url,
    logo: `${SITE.url}/logo/icon-blue.svg`,
    image: `${SITE.url}/og.png`,
    email: s.email,
    telephone: `+${s.whatsapp}`,
    foundingDate: String(SITE.founded),
    areaServed: ["Sudan", "Egypt", "India", "Gulf region"],
    sameAs: [s.social_facebook, s.social_instagram, s.social_tiktok],
    slogan: SITE.tagline,
  };
  return (
    <>
      <SiteChrome>{children}</SiteChrome>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
