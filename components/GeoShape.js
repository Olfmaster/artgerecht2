"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const SHAPES = {
  ring: (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="100" cy="100" r="62" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="100" cy="100" r="32" stroke="currentColor" strokeWidth="0.9" opacity="0.35" />
    </svg>
  ),
  triangle: (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <polygon points="100,12 186,176 14,176" stroke="currentColor" strokeWidth="1.25" />
      <polygon points="100,52 156,158 44,158" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
    </svg>
  ),
  square: (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <rect x="14" y="14" width="172" height="172" stroke="currentColor" strokeWidth="1.25" />
      <rect x="46" y="46" width="108" height="108" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
    </svg>
  ),
  hexagon: (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <polygon points="100,10 182,55 182,145 100,190 18,145 18,55" stroke="currentColor" strokeWidth="1.25" />
      <polygon points="100,50 148,77 148,123 100,150 52,123 52,77" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
    </svg>
  ),
  diamond: (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <polygon points="100,8 192,100 100,192 8,100" stroke="currentColor" strokeWidth="1.25" />
      <line x1="100" y1="8" x2="100" y2="192" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      <line x1="8" y1="100" x2="192" y2="100" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
    </svg>
  ),
  arcs: (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <path d="M 10 100 A 90 90 0 0 1 190 100" stroke="currentColor" strokeWidth="1.25" />
      <path d="M 30 100 A 70 70 0 0 1 170 100" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M 50 100 A 50 50 0 0 1 150 100" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
      <path d="M 70 100 A 30 30 0 0 1 130 100" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    </svg>
  ),
  cross: (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="1.25" />
      <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  ),
};

export default function GeoShape({
  variant = "ring",
  className = "",
  size = 280,
  rotate = 360,
  y = -160,
  scrub = 1.2,
  opacity = 0.55,
  reverseRotate = false,
}) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { rotate: 0, y: 0 },
          {
            rotate: reverseRotate ? -rotate : rotate,
            y,
            ease: "none",
            scrollTrigger: {
              trigger: parent,
              start: "top bottom",
              end: "bottom top",
              scrub,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [rotate, y, scrub, reverseRotate]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute text-rose-gold will-change-transform ${className}`}
      style={{ width: size, height: size, opacity }}
    >
      {SHAPES[variant]}
    </div>
  );
}
