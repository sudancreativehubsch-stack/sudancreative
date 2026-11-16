// Geometric composition built from the brand colours. Echoes the brand illustration
// language (squares, quarter circles, semicircles) and the growth arrow from the logo.
const C = { blue: "#0a13eb", orange: "#f57210", yellow: "#fbc701", white: "#ffffff", black: "#000000" };

type Cell = { x: number; y: number; shape: "sq" | "q" | "semi" | "tri" | "dot" | "ring" | "arrow"; fill: string; ink?: string; rot?: number };

const CELLS: Cell[] = [
  { x: 0, y: 0, shape: "q", fill: C.yellow, rot: 0 },
  { x: 1, y: 0, shape: "sq", fill: C.blue },
  { x: 2, y: 0, shape: "semi", fill: C.orange, rot: 180 },
  { x: 3, y: 0, shape: "dot", fill: C.white },
  { x: 0, y: 1, shape: "sq", fill: C.orange },
  { x: 1, y: 1, shape: "arrow", fill: C.yellow, ink: C.black },
  { x: 2, y: 1, shape: "q", fill: C.blue, rot: 90 },
  { x: 3, y: 1, shape: "sq", fill: C.yellow },
  { x: 0, y: 2, shape: "dot", fill: C.blue },
  { x: 1, y: 2, shape: "tri", fill: C.white, rot: 0 },
  { x: 2, y: 2, shape: "sq", fill: C.orange },
  { x: 3, y: 2, shape: "q", fill: C.orange, rot: 270 },
  { x: 0, y: 3, shape: "semi", fill: C.yellow, rot: 90 },
  { x: 1, y: 3, shape: "ring", fill: C.white },
  { x: 2, y: 3, shape: "tri", fill: C.blue, rot: 180 },
  { x: 3, y: 3, shape: "sq", fill: C.blue },
];

function Shape({ c }: { c: Cell }) {
  const rot = c.rot ?? 0;
  const inner = (() => {
    switch (c.shape) {
      case "sq": return <rect width="120" height="120" fill={c.fill} />;
      case "q": return <path d="M0 0H120A120 120 0 0 1 0 120Z" fill={c.fill} />;
      case "semi": return <path d="M0 120A60 60 0 0 1 120 120Z" fill={c.fill} />;
      case "tri": return <path d="M0 120H120V0Z" fill={c.fill} />;
      case "dot": return <circle cx="60" cy="60" r="56" fill={c.fill} />;
      case "ring": return <circle cx="60" cy="60" r="46" fill="none" stroke={c.fill} strokeWidth="20" />;
      case "arrow":
        return (
          <g>
            <rect width="120" height="120" fill={c.fill} />
            <path d="M30 90L90 30M42 30H90V78" fill="none" stroke={c.ink} strokeWidth="14" strokeLinecap="square" />
          </g>
        );
    }
  })();
  return (
    <g transform={`translate(${c.x * 120} ${c.y * 120})`}>
      <g className="pop" style={{ ["--i" as string]: c.y * 4 + c.x }} transform={`rotate(${rot} 60 60)`}>
        {inner}
      </g>
    </g>
  );
}

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 480 480" role="img" aria-label="Abstract composition of geometric shapes in the Sudan Creative Hub brand colours">
      {CELLS.map((c, i) => <Shape key={i} c={c} />)}
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 2.5v19L21 12z" fill="currentColor" /></svg>
  );
}

/** The growth arrow from the logo, used on calls to action. */
export function GrowthArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
      <path d="M5 19L19 5M8 5h11v11" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.27-1.38A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.25 15l-.3-.18-3.13.82.84-3.05-.2-.32A8.1 8.1 0 0 1 12.04 3.8Zm-3.3 4.2c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15s.92 2.5 1.05 2.67c.13.17 1.8 2.9 4.45 3.95 2.2.87 2.65.7 3.13.65.48-.04 1.55-.63 1.77-1.24.22-.6.22-1.13.15-1.24-.06-.1-.24-.17-.5-.3-.27-.13-1.55-.77-1.8-.86-.24-.09-.41-.13-.59.13-.17.26-.68.86-.83 1.03-.15.18-.3.2-.57.07-.26-.13-1.1-.4-2.1-1.3-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.12-.53.12-.12.26-.3.4-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.58-1.42-.8-1.94-.2-.5-.42-.43-.58-.44h-.5Z" />
    </svg>
  );
}
