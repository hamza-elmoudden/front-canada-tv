"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 767px)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Mobile (<768px) plays mobile.mp4; tablet and desktop play pc.mp4. Both loop continuously. */
export function HeroVideo({ poster }: { poster?: string }) {
  const isMobile = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => null,
  );

  if (isMobile === null) return null; // image underneath acts as the fallback

  return (
    <video
      key={isMobile ? "mobile" : "pc"}
      src={isMobile ? "/mobile.mp4" : "/pc.mp4"}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 -z-[15] size-full object-cover"
    />
  );
}
