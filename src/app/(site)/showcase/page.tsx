import { ImageScroller } from "@/components/ImageScroller";

export const metadata = {
  title: "Interactive Showcase | Sudan Creative Hub",
  description: "Experience our scroll-driven commercial films, high-retention reels, and high-fashion talent showcase.",
};

export default function ShowcasePage() {
  return (
    <main className="showcase-page">
      <div className="showcase-page-intro wrap">
        <span className="bento-pill-tag">Interactive Presentation</span>
        <h1 className="t-h1" style={{ margin: "0.5rem 0 1rem" }}>
          Flagship Showcase<span style={{ color: "#f57210" }}>.</span>
        </h1>
        <p className="lead" style={{ maxWidth: "60ch", color: "rgba(255,255,255,0.75)" }}>
          A sticky, scroll-driven gallery featuring commercial films, 9:16 vertical social campaigns, and exclusive talent casting across Sudan, Egypt, India, and the Gulf.
        </p>
      </div>

      <ImageScroller />
    </main>
  );
}
