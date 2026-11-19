import type { CSSProperties } from "react";

/** Position, size and timing of each eagle. Negative delays desync them from the first frame. */
const EAGLES = [
  { top: "6%", left: "4%", size: 220, drift: "26s", driftDelay: "0s", hueDelay: "0s", opacity: 0.22, flip: false },
  { top: "12%", left: "72%", size: 160, drift: "20s", driftDelay: "-6s", hueDelay: "-2s", opacity: 0.18, flip: true },
  { top: "48%", left: "40%", size: 280, drift: "32s", driftDelay: "-12s", hueDelay: "-4s", opacity: 0.12, flip: false },
  { top: "62%", left: "8%", size: 130, drift: "18s", driftDelay: "-3s", hueDelay: "-6s", opacity: 0.2, flip: true },
  { top: "70%", left: "80%", size: 190, drift: "24s", driftDelay: "-9s", hueDelay: "-1s", opacity: 0.16, flip: false },
  { top: "34%", left: "88%", size: 110, drift: "16s", driftDelay: "-14s", hueDelay: "-5s", opacity: 0.2, flip: true },
];

/** Stylised crowned eagle (Polish coat-of-arms style), filled with currentColor. */
function EagleShape({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="currentColor">
      {/* crown */}
      <path d="M43 15 L44 9 L47 12 L50 7 L53 12 L56 9 L57 15 Z" />
      {/* head + beak */}
      <path d="M56 32 C58 24 55 17 49 17 C45 17 42 20 38 21 L41 23 L37 25 L43 26 C45 27 46 29 45 32 Z" />
      {/* wings, body, legs and tail */}
      <path d="M45 31 L42 36 L30 22 L10 14 L15 22 L5 25 L14 30 L3 35 L15 38 L6 45 L21 44 L16 52 L32 47 L42 52 L40 63 L30 70 L39 70 L35 79 L45 74 L50 92 L55 74 L65 79 L61 70 L70 70 L60 63 L58 52 L68 47 L84 52 L79 44 L94 45 L85 38 L97 35 L86 30 L95 25 L85 22 L90 14 L70 22 L58 36 L56 31 Z" />
    </svg>
  );
}

/** Decorative layer of drifting, colour-shifting eagles. Place inside a `relative` container. */
export function EagleBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {EAGLES.map((e, i) => (
        <div
          key={i}
          className="absolute animate-eagle-drift motion-reduce:animate-none"
          style={{
            top: e.top,
            left: e.left,
            width: e.size,
            height: e.size,
            opacity: e.opacity,
            animationDuration: e.drift,
            animationDelay: e.driftDelay,
          }}
        >
          <EagleShape
            className={`size-full animate-word-hue motion-reduce:animate-none drop-shadow-[0_0_24px_currentColor] ${e.flip ? "-scale-x-100" : ""}`}
            style={{ animationDelay: e.hueDelay }}
          />
        </div>
      ))}
    </div>
  );
}
