"use client";
import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";

// Version 2 hero — painterly, cursor-reactive colour fields and a
// brush-style headline reveal. Self-contained: no shared V1 styling.
export default function AtelierHero() {
  const rootRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const hintRef = useRef(null);
  const blobsRef = useRef([]);

  useEffect(() => {
    let split;
    let ctx;
    let cancelled = false;

    // Wait for fonts before splitting: SplitText measures line breaks from the
    // current layout, so running it before the serif has loaded splits against
    // the fallback metrics. On a cold first load the swap then reflows the
    // headline after the chars are positioned, leaving it clipped/broken until
    // a (cached) reload. document.fonts.ready guarantees correct measurement.
    const run = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        split = new SplitText(headlineRef.current, {
          type: "lines,chars",
          linesClass: "overflow-hidden",
        });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(eyebrowRef.current, { y: 24, opacity: 0, duration: 0.8 })
          .from(
            split.chars,
            {
              yPercent: 120,
              opacity: 0,
              rotateZ: 6,
              duration: 1.1,
              stagger: 0.018,
              ease: "power4.out",
            },
            "-=0.3",
          )
          .from(subRef.current, { y: 24, opacity: 0, duration: 0.9 }, "-=0.6")
          .from(ctaRef.current, { y: 24, opacity: 0, duration: 0.9 }, "-=0.6")
          .from(hintRef.current, { opacity: 0, duration: 0.9 }, "-=0.5");

        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          // ambient drift for the colour fields
          blobsRef.current.filter(Boolean).forEach((blob, i) => {
            gsap.to(blob, {
              xPercent: i % 2 === 0 ? 8 : -8,
              yPercent: i % 2 === 0 ? -6 : 9,
              duration: 9 + i * 2,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          });

          // cursor-reactive parallax on the colour fields (pointer = fine pointer)
          mm.add("(pointer: fine)", () => {
            const movers = blobsRef.current.filter(Boolean).map((blob, i) => ({
              x: gsap.quickTo(blob, "x", { duration: 1.1, ease: "power3" }),
              y: gsap.quickTo(blob, "y", { duration: 1.1, ease: "power3" }),
              depth: (i + 1) * 26,
            }));

            const onMove = (e) => {
              const nx = e.clientX / window.innerWidth - 0.5;
              const ny = e.clientY / window.innerHeight - 0.5;
              movers.forEach((m) => {
                m.x(nx * m.depth);
                m.y(ny * m.depth);
              });
            };
            window.addEventListener("pointermove", onMove);
            return () => window.removeEventListener("pointermove", onMove);
          });

          // parallax exit on scroll
          gsap.to(headlineRef.current, {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }, rootRef);
    };

    document.fonts?.ready.then(run);

    return () => {
      cancelled = true;
      ctx && ctx.revert();
      split && split.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="atelier-top"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-10 pt-28 overflow-hidden"
    >
      {/* painterly colour fields */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          ref={(el) => (blobsRef.current[0] = el)}
          className="v2-blob absolute -top-24 -left-16 w-[42vw] h-[42vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #d9a6ab, transparent 70%)",
          }}
        />
        <span
          ref={(el) => (blobsRef.current[1] = el)}
          className="v2-blob absolute top-1/4 -right-20 w-[46vw] h-[46vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, #c98a5e, transparent 70%)",
          }}
        />
        <span
          ref={(el) => (blobsRef.current[2] = el)}
          className="v2-blob absolute bottom-[-12vw] left-1/4 w-[40vw] h-[40vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #7c9082, transparent 70%)",
          }}
        />
      </div>

      <p
        ref={eyebrowRef}
        className="relative z-10 text-xs md:text-sm uppercase tracking-[0.4em] text-ink/60 mb-8"
      >
        Birgit Silberg · Digitale Illustration &amp; Verpackungsdesign
      </p>
      <h1
        ref={headlineRef}
        className="relative z-10 font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[8.5rem] tracking-tight leading-[0.95] md:leading-[0.92] max-w-5xl text-ink"
      >
        Illustration, die
        <br />
        <span className="italic text-plum">Marken</span> lebendig macht.
      </h1>
      <p
        ref={subRef}
        className="relative z-10 mt-10 text-base md:text-lg text-ink/70 max-w-xl leading-relaxed"
      >
        Seit über 30 Jahren gestalte und illustriere ich für Unternehmen —
        digital, von der ersten Idee bis zum fertigen Verpackungsdesign, das im
        Regal auffällt.
      </p>
      <div
        ref={ctaRef}
        className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#werke"
          className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-canvas rounded-full text-sm font-medium hover:bg-plum transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-plum focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          Arbeiten ansehen
          <span aria-hidden="true">↓</span>
        </a>
        <a
          href="#atelier-kontakt"
          className="inline-flex items-center gap-3 px-8 py-4 border border-ink/25 text-ink rounded-full text-sm font-medium hover:border-ink hover:bg-ink/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-plum focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          Kontakt aufnehmen
        </a>
      </div>
      <div
        ref={hintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ink/40 z-10"
        aria-hidden="true"
      >
        <span>scrollen</span>
        <span className="block w-px h-10 bg-gradient-to-b from-ink/20 to-ochre" />
      </div>
    </section>
  );
}
