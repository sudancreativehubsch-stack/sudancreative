"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { VideoProject } from "@/lib/types";
import { PlayIcon } from "./Shapes";

/**
 * Cinematic player: one large featured video, titles only (no client names).
 * The video file is not requested until the visitor presses play.
 */
export function VideoShowcase({ videos, initialId }: { videos: VideoProject[]; initialId?: string }) {
  const categories = useMemo(() => [...new Set(videos.map((v) => v.category))], [videos]);
  const [cat, setCat] = useState<string>("All");
  const first = videos.find((v) => v.id === initialId) ?? videos.find((v) => v.featured) ?? videos[0];
  const [activeId, setActiveId] = useState(first?.id);
  const [playing, setPlaying] = useState(false);
  const vref = useRef<HTMLVideoElement>(null);

  const list = cat === "All" ? videos : videos.filter((v) => v.category === cat);
  const active = videos.find((v) => v.id === activeId) ?? first;

  useEffect(() => {
    if (playing) vref.current?.play().catch(() => { /* user can press play */ });
  }, [playing, activeId]);

  if (!active) return null;

  const choose = (id: string) => {
    setActiveId(id);
    setPlaying(true);
  };

  return (
    <div className="cine">
      <div>
        <div className="cine__stage">
          {playing ? (
            <video
              key={active.id} ref={vref} src={active.video_url} poster={active.thumbnail ?? undefined}
              controls playsInline preload="metadata" controlsList="nodownload"
              aria-label={`Video: ${active.title}`}
            />
          ) : (
            <>
              {active.thumbnail ? <img src={active.thumbnail} alt="" decoding="async" /> : null}
              <button type="button" className="cine__play" onClick={() => setPlaying(true)} aria-label={`Play video: ${active.title}`}>
                <span className="disc"><PlayIcon /></span>
              </button>
            </>
          )}
        </div>
        <div className="cine__cap">
          <p className="muted small" style={{ margin: "0 0 .35rem" }}>{active.category}</p>
          <h2 className="t-h2">{active.title}</h2>
          {active.description ? <p className="muted" style={{ marginTop: ".9rem" }}>{active.description}</p> : null}
        </div>
      </div>

      <div>
        {categories.length > 1 ? (
          <div className="cine__filters" role="group" aria-label="Filter videos by category">
            {["All", ...categories].map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        ) : null}
        <ul className="cine__list" aria-label="Video projects">
          {list.map((v) => (
            <li key={v.id}>
              <button type="button" className="cine__item" aria-current={v.id === active.id} onClick={() => choose(v.id)}>
                <b>{v.title}</b>
                <span>{v.category}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Single click-to-play video (used for model showreels). */
export function ClickToPlay({ src, poster, title }: { src: string; poster?: string | null; title: string }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (playing) ref.current?.play().catch(() => {});
  }, [playing]);
  return (
    <div className="cine__stage">
      {playing ? (
        <video ref={ref} src={src} poster={poster ?? undefined} controls playsInline preload="metadata" aria-label={title} />
      ) : (
        <>
          {poster ? <img src={poster} alt="" decoding="async" loading="lazy" /> : null}
          <button type="button" className="cine__play" onClick={() => setPlaying(true)} aria-label={`Play: ${title}`}>
            <span className="disc"><PlayIcon /></span>
          </button>
        </>
      )}
    </div>
  );
}
