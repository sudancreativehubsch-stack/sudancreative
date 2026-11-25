"use client";

import { useEffect, useRef, useState } from "react";

export function ReelShowcase({
  src = "https://res.cloudinary.com/npq7nirg/video/upload/v1795628342/%D8%A7%D9%84%D9%82%D8%B1%D9%88%D8%B4_%D8%B9%D9%85%D8%B1%D9%87%D8%A7_%D9%85%D8%A7_%D9%83%D8%A7%D9%86%D8%AA_%D8%B1%D9%82%D9%85_%D9%88%D8%A8%D8%B3.mp4",
  poster,
  title = "Sudan Creative Hub",
  subtitle = "Brand Reel & Commercial Production",
}: {
  src?: string;
  poster?: string;
  title?: string;
  subtitle?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {
      setPlaying(false);
    });
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) {
      v.play();
      setPlaying(true);
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="reel-frame-wrap">
      {/* Decorative brand floating accent shapes */}
      <div className="reel-decor-star reel-decor-star--yellow" aria-hidden="true">
        ✦
      </div>
      <div className="reel-decor-star reel-decor-star--orange" aria-hidden="true">
        ✦
      </div>

      <div
        className="reel-card"
        onClick={togglePlay}
        role="region"
        aria-label="Vertical video showcase"
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          autoPlay
          loop
          muted={muted}
          preload="metadata"
          className="reel-video"
        />

        {/* Top badge & sound control */}
        <div className="reel-top-bar">
          <span className="reel-badge">
            <span className="reel-badge-dot" />
            Featured Reel
          </span>

          <button
            type="button"
            className="reel-sound-btn"
            onClick={toggleSound}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>

        {/* Center play icon when paused */}
        {!playing && (
          <div className="reel-play-overlay">
            <div className="reel-play-disc">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        )}

        {/* Bottom caption overlay */}
        <div className="reel-caption">
          <span className="reel-caption__tag">9:16 Vertical Video</span>
          <h3 className="reel-caption__title">{title}</h3>
          <p className="reel-caption__sub">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
