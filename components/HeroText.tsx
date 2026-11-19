"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/** Hero headline: typewriter loop: types, holds, erases, repeats. */
export function HeroTitle({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = Array.from(el.querySelectorAll<HTMLElement>(".hc"));
    const caret = "3px 0 0 #5cb6d6";
    const len = chars.length;
    const render = (n: number) => {
      chars.forEach((c, k) => {
        c.style.opacity = k < n ? "1" : "0";
        c.style.boxShadow = k === n - 1 ? caret : "none";
      });
      // caret sits before the first character while the text is empty
      if (n === 0 && chars[0]) chars[0].style.boxShadow = "-3px 0 0 #5cb6d6";
    };
    render(0);

    const ctx = gsap.context(() => {
      const state = { n: 0 };
      const update = () => render(Math.round(state.n));
      // type -> hold -> erase -> pause -> repeat forever
      const tl = gsap.timeline({ repeat: -1, delay: 0.3 });
      tl.to(state, { n: len, duration: 6, ease: "none", onUpdate: update })
        .to(state, { n: len, duration: 5 })
        .to(state, { n: 0, duration: 5, ease: "none", onUpdate: update })
        .to(state, { n: 0, duration: 4 });
    }, el);

    return () => {
      ctx.revert();
      chars.forEach((c) => {
        c.style.opacity = "";
        c.style.boxShadow = "";
      });
    };
  }, [text]);

  return (
    <h1 ref={ref} className={`text-white ${className ?? ""}`} aria-label={text}>
      {text.split(" ").map((w, i, arr) => (
        <span
          key={i}
          aria-hidden
          className="inline-block whitespace-nowrap motion-safe:animate-word-hue"
          style={{ animationDelay: `${-8 + i * 0.6}s` }}
        >
          {Array.from(w).map((c, j) => (
            <span key={j} className="hc">
              {c}
            </span>
          ))}
          {i < arr.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </h1>
  );
}

/** Fades/slides a block of children in sequence (used for the hero paragraph, buttons, stats). */
export function HeroReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(el.children, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.7,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
