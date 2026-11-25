"use client";

import { useRef, useState } from "react";

export interface ReelItem {
  id: string;
  src: string;
  client: string;
  tag?: string;
  dotColor?: string;
}

const DEFAULT_REELS: ReelItem[] = [
  {
    id: "reel-1",
    src: "https://res.cloudinary.com/npq7nirg/video/upload/v1795628342/%D8%A7%D9%84%D9%82%D8%B1%D9%88%D8%B4_%D8%B9%D9%85%D8%B1%D9%87%D8%A7_%D9%85%D8%A7_%D9%83%D8%A7%D9%86%D8%AA_%D8%B1%D9%82%D9%85_%D9%88%D8%A8%D8%B3.mp4",
    client: "Sudan Creative Hub",
    tag: "Commercial Brand Video",
    dotColor: "#fbc701",
  },
  {
    id: "reel-2",
    src: "https://res.cloudinary.com/npq7nirg/video/upload/v1795630040/3.mp4",
    client: "Digital Medha Advertising",
    tag: "High-Retention Commercial",
    dotColor: "#f57210",
  },
  {
    id: "reel-3",
    src: "https://res.cloudinary.com/npq7nirg/video/upload/v1795630062/%D8%B9%D9%85%D8%B1%D8%A9_%D8%A8%D8%AE%D8%AF%D9%85%D8%A7%D8%AA.mp4",
    client: "High-Retention Reel",
    tag: "Social Campaign & Ads",
    dotColor: "#fbc701",
  },
  {
    id: "reel-4",
    src: "https://res.cloudinary.com/npq7nirg/video/upload/v1795630100/4.mp4",
    client: "Vision Rainbow",
    tag: "Brand Motion Reel",
    dotColor: "#f57210",
  },
];

function ReelCard({ item, active = false }: { item: ReelItem; active?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(active);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className={`reels-strip__card ${active ? "reels-strip__card--active" : ""}`}
      onClick={togglePlay}
      role="region"
      aria-label={`${item.client} reel`}
    >
      <video
        ref={videoRef}
        src={item.src}
        playsInline
        autoPlay={active}
        loop
        muted={muted}
        preload={active ? "metadata" : "none"}
        className="reels-strip__video"
      />

      {/* Center play icon when paused */}
      {!playing && (
        <div className="reels-strip__paused-overlay">
          <div className="reels-strip__play-disc">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom overlay: Client pill + Sound button */}
      <div className="reels-strip__bottom">
        <div className="reels-strip__pill">
          <span
            className="reels-strip__dot"
            style={{ backgroundColor: item.dotColor || "var(--yellow)" }}
          />
          <span className="reels-strip__client-name">{item.client}</span>
        </div>

        <button
          type="button"
          className="reels-strip__sound-btn"
          onClick={toggleSound}
          aria-label={muted ? `Unmute ${item.client}` : `Mute ${item.client}`}
        >
          {muted ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export function ReelsStrip({
  title = "Client Reels",
  subtitle = "High-retention vertical videos cut for Instagram Reels, TikTok & YouTube Shorts",
  reels = DEFAULT_REELS,
}: {
  title?: string;
  subtitle?: string;
  reels?: ReelItem[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    trackRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <section className="section slab--dark reels-strip-section" aria-labelledby="reels-strip-title">
      <div className="wrap">
        <div className="reels-strip__header">
          <div>
            <h2 id="reels-strip-title" className="t-h2 reels-strip__title">
              {title}
            </h2>
            {subtitle && <p className="lead muted reels-strip__sub">{subtitle}</p>}
          </div>

          {/* Navigation Controls */}
          <div className="reels-strip__nav">
            <button
              type="button"
              className="reels-strip__nav-btn"
              onClick={scrollLeft}
              aria-label="Scroll reels left"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="reels-strip__nav-btn"
              onClick={scrollRight}
              aria-label="Scroll reels right"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div className="reels-strip__track-wrapper">
          <div ref={trackRef} className="reels-strip__track">
            {reels.map((item, idx) => (
              <ReelCard key={item.id} item={item} active={idx === 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
