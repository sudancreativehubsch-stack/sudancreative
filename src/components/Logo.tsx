import { ICON_PATH, ICON_TRANSFORM, ICON_VIEWBOX } from "@/lib/icon";

/** Logo mark from the brand files. Use white on dark backgrounds (per brand guidelines). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={ICON_VIEWBOX} aria-hidden="true" focusable="false">
      <path fill="currentColor" transform={ICON_TRANSFORM} d={ICON_PATH} />
    </svg>
  );
}

export function Logo() {
  return (
    <a className="logo" href="/" aria-label="Sudan Creative Hub, home">
      <LogoMark />
      <span className="logo__word">
        Sudan<br />Creative Hub
      </span>
    </a>
  );
}
