import { srcSet, thumb } from "@/lib/utils";

type Props = {
  src: string | null | undefined;
  alt: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  className?: string;
  small?: boolean;
};

/** Plain <img> with a small variant for phones. Images are resized and converted to WebP at upload time. */
export function Pic({ src, alt, sizes = "(min-width: 900px) 33vw, 100vw", priority, width, height, className, small }: Props) {
  if (!src) return <div className={`ph ${className ?? ""}`} role="img" aria-label={alt} />;
  return (
    <img
      src={small ? thumb(src) : src}
      srcSet={small ? undefined : srcSet(src)}
      sizes={small ? undefined : sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
