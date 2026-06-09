"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, SplitText } from "@/lib/gsap";

// "Über mich" — the artist speaks in first person. Receives an optional
// `portrait` ({ src, alt, width, height }) from the server; falls back to a
// painterly placeholder block until a photo is added in the Studio.
export default function AtelierAboutClient({ portrait }) {
  const rootRef = useRef(null);
  const portraitRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    let split;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // portrait wipes in like a brush stroke
        gsap.from(portraitRef.current, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: portraitRef.current, start: "top 80%" },
        });

        split = new SplitText(copyRef.current.querySelectorAll("[data-line]"), {
          type: "lines",
          linesClass: "overflow-hidden",
        });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: copyRef.current, start: "top 78%" },
        });

        gsap.from(rootRef.current.querySelectorAll("[data-fact]"), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current.querySelector("[data-facts]"), start: "top 85%" },
        });
      });
    }, rootRef);

    return () => {
      ctx.revert();
      split && split.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="ueber-mich"
      className="relative py-28 md:py-40 px-6 md:px-10"
    >
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16 items-center">
        {/* portrait */}
        <div className="md:col-span-5">
          <div
            ref={portraitRef}
            className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-ink/10 shadow-[0_30px_60px_-30px_rgba(28,24,21,0.4)]"
            style={
              portrait
                ? undefined
                : {
                    background:
                      "linear-gradient(140deg, #ece3d6 0%, #d9a6ab 45%, #c98a5e 100%)",
                  }
            }
          >
            {portrait ? (
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              <>
                <span className="absolute inset-0 flex items-center justify-center font-serif italic text-2xl text-ink/40 text-center px-8">
                  Portrait von
                  <br />
                  Birgit Silberg
                </span>
                <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em] text-ink/40">
                  Foto folgt
                </span>
              </>
            )}
          </div>
        </div>

        {/* copy */}
        <div ref={copyRef} className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.4em] text-ochre mb-8">
            Über mich
          </p>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight text-ink">
            <span data-line className="block">Digital gedacht,</span>
            <span data-line className="block italic text-plum">von Hand gestaltet.</span>
          </h2>
          <div className="mt-8 space-y-5 max-w-xl text-ink/70 leading-relaxed">
            <p data-line>
              Seit über 30 Jahren bin ich selbstständig im Kreativbereich — von
              Printmedien und Grafikdesign bis zur digitalen Illustration. Was
              als Skizze beginnt, entwickle ich am Bildschirm zu Bildern mit
              Charakter.
            </p>
            <p data-line>
              Mein Schwerpunkt liegt heute auf digitaler Illustration und
              Verpackungsdesign für Unternehmen — unter anderem für die
              Upländer Bauern Molkerei. Jede Gestaltung ist auf die Marke
              zugeschnitten: vom Konzept bis zum druckfertigen Ergebnis.
            </p>
          </div>

          <ul
            data-facts
            className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8"
          >
            {[
              { n: "30+", l: "Jahre Erfahrung" },
              { n: "Digital", l: "Illustration am Bildschirm" },
              { n: "Verpackung", l: "vom Konzept bis zum Druck" },
            ].map((f) => (
              <li key={f.l} data-fact>
                <p className="font-serif text-2xl md:text-3xl text-ink">{f.n}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink/50 leading-snug">
                  {f.l}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
