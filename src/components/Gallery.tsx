"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { srcSet, thumb } from "@/lib/utils";

export type GalleryImage = { src: string; alt: string; caption?: string | null };

/** Masonry gallery with a keyboard-accessible lightbox (Esc closes, arrows navigate). */
export function Gallery({ images, columns = true }: { images: GalleryImage[]; columns?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = (i: number, el: HTMLElement) => {
    opener.current = el;
    setIndex(i);
  };
  const close = useCallback(() => {
    ref.current?.close();
    setIndex(null);
    opener.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index !== null && ref.current && !ref.current.open) ref.current.showModal();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  if (!images.length) return null;
  const current = index !== null ? images[index] : null;

  return (
    <>
      <div className={columns ? "masonry" : undefined}>
        {images.map((img, i) => (
          <figure key={img.src + i} style={{ margin: 0 }}>
            <button
              type="button" className="masonry__item"
              aria-label={`Enlarge image: ${img.alt}`}
              onClick={(e) => open(i, e.currentTarget)}
            >
              <img
                src={thumb(img.src)} srcSet={srcSet(img.src)} sizes="(min-width: 900px) 33vw, 50vw"
                alt={img.alt} loading="lazy" decoding="async"
              />
            </button>
            {img.caption ? <figcaption className="masonry__cap">{img.caption}</figcaption> : null}
          </figure>
        ))}
      </div>

      <dialog ref={ref} className="lb" aria-label="Image viewer" onClose={() => setIndex(null)} onCancel={close}>
        {current ? (
          <div className="lb__inner">
            <div className="lb__top">
              <span aria-live="polite">{index! + 1} of {images.length}</span>
              <button type="button" onClick={close}>Close</button>
            </div>
            <div className="lb__stage">
              <img src={current.src} alt={current.alt} />
            </div>
            <div className="lb__bar">
              {images.length > 1 ? <button type="button" onClick={() => step(-1)}>Previous</button> : null}
              {images.length > 1 ? <button type="button" onClick={() => step(1)}>Next</button> : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
