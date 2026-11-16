import type { Metadata } from "next";
import Link from "next/link";
import { VideoShowcase } from "@/components/VideoShowcase";
import { GrowthArrow } from "@/components/Shapes";
import { getVideos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Video Production Portfolio",
  description: "Commercial ads, reels, brand videos, product videos and campaign films produced by Sudan Creative Hub.",
  alternates: { canonical: "/portfolio/video" },
};

export default async function VideoPortfolio() {
  const videos = await getVideos();
  return (
    <section className="section--tight" style={{ paddingTop: "clamp(2.5rem,5vw,4rem)", paddingBottom: "clamp(4rem,9vw,8rem)" }}>
      <div className="wrap">
        <h1 className="t-h1" style={{ marginBottom: "2.5rem" }}>Video production</h1>
        {videos.length ? (
          <VideoShowcase videos={videos} />
        ) : (
          <div className="empty">
            <p className="t-h3">Videos are on their way.</p>
            <p className="muted" style={{ marginTop: ".75rem" }}>Upload projects in the admin dashboard under Video portfolio and they play here.</p>
          </div>
        )}
        <p style={{ marginTop: "3rem" }}><Link className="btn" href="/contact">Plan a video with us <GrowthArrow /></Link></p>
      </div>
    </section>
  );
}
