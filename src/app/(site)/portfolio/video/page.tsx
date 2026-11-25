import type { Metadata } from "next";
import Link from "next/link";
import { ReelShowcase } from "@/components/ReelShowcase";
import { VideoShowcase } from "@/components/VideoShowcase";
import { GrowthArrow, WhatsAppIcon } from "@/components/Shapes";
import { getVideos, getSettings } from "@/lib/data";
import { SITE } from "@/lib/site";
import { waLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Video Production Portfolio",
  description: "Commercial ads, reels, brand videos, product videos and campaign films produced by Sudan Creative Hub.",
  alternates: { canonical: "/portfolio/video" },
};

export default async function VideoPortfolio() {
  const [videos, s] = await Promise.all([getVideos(), getSettings()]);

  return (
    <section className="section--tight" style={{ paddingTop: "clamp(2.5rem,5vw,4rem)", paddingBottom: "clamp(4rem,9vw,8rem)" }}>
      <div className="wrap">
        <div className="hero__grid" style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
          <div>
            <h1 className="t-h1" style={{ marginBottom: "1.25rem" }}>Shot &amp; cut by the same team.</h1>
            <p className="lead" style={{ color: "rgba(255,255,255,0.92)", maxWidth: "560px" }}>
              Video shoots and high-retention post-production in one seamless package. Brief us on your requirements and get finished commercial videos tailored for Reels, TikTok, YouTube, and paid ad campaigns.
            </p>
            <div className="btn-row" style={{ marginTop: "1.75rem" }}>
              <Link className="btn btn--yellow" href="/contact">Get a video quote <GrowthArrow /></Link>
              <a className="btn btn--ghost-dark" target="_blank" rel="noopener noreferrer" href={waLink(s.whatsapp, `Hello ${SITE.name}, I would like to get a video quote.`)}>
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
            </div>
            <ul className="hero__checklist">
              <li>
                <span className="chk-box" aria-hidden="true" />
                <span>Crew shooting on-location across Sudan, Egypt, India &amp; the Gulf</span>
              </li>
              <li>
                <span className="chk-box" aria-hidden="true" />
                <span>First cut delivered with fast turnaround tailored for mobile retention</span>
              </li>
              <li>
                <span className="chk-box" aria-hidden="true" />
                <span>Full creative direction, sound design, colour grading &amp; revisions included</span>
              </li>
            </ul>
          </div>
          <div className="hero__reel-col">
            <ReelShowcase
              src="https://res.cloudinary.com/npq7nirg/video/upload/v1795628342/%D8%A7%D9%84%D9%82%D8%B1%D9%88%D8%B4_%D8%B9%D9%85%D8%B1%D9%87%D8%A7_%D9%85%D8%A7_%D9%83%D8%A7%D9%86%D8%AA_%D8%B1%D9%82%D9%85_%D9%88%D8%A8%D8%B3.mp4"
              title="Sudan Creative Hub"
              subtitle="Brand Reels, Ads & Commercial Video"
            />
          </div>
        </div>

        {videos.length ? (
          <>
            <h2 className="t-h2" style={{ marginBottom: "2rem" }}>Recent productions</h2>
            <VideoShowcase videos={videos} />
          </>
        ) : null}

        <p style={{ marginTop: "3rem" }}>
          <Link className="btn" href="/contact">Plan a video with us <GrowthArrow /></Link>
        </p>
      </div>
    </section>
  );
}
