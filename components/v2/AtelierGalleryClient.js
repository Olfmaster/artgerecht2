"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

// Fallback shown until works are added in the Studio (/studio). Gradient
// placeholders themed around packaging / illustration projects.
const placeholders = [
  { titel: "Molkerei-Verpackung", technik: "Verpackungsdesign · Illustration", jahr: "2024", grad: "linear-gradient(160deg,#f2dcde,#c98a5e 70%)", span: "md:row-span-2" },
  { titel: "Produktlinie", technik: "Etiketten- & Verpackungsdesign", jahr: "2023", grad: "linear-gradient(160deg,#7c9082,#ece3d6)", span: "" },
  { titel: "Markenillustration", technik: "Digitale Illustration", jahr: "2024", grad: "linear-gradient(160deg,#8a5a6b,#d9a6ab)", span: "" },
  { titel: "Editorial", technik: "Illustration · Printdesign", jahr: "2022", grad: "linear-gradient(160deg,#c98a5e,#8a5a6b 80%)", span: "md:row-span-2" },
  { titel: "Logo & Branding", technik: "Corporate Design", jahr: "2023", grad: "linear-gradient(160deg,#d9a6ab,#7c9082)", span: "" },
  { titel: "Saisonmotive", technik: "Digitale Illustration", jahr: "2024", grad: "linear-gradient(160deg,#ece3d6,#b76e79 90%)", span: "" },
];

const mediums = ["Digitale Illustration", "Verpackungsdesign", "Etiketten", "Branding", "Editorial", "Printdesign"];

// Keep the masonry rhythm consistent for real works: every 3rd card is tall.
const spanFor = (i) => (i % 3 === 0 ? "md:row-span-2" : "");

export default function AtelierGalleryClient({ items }) {
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeRef = useRef(null);

  const hasContent = Array.isArray(items) && items.length > 0;
  const cards = hasContent
    ? items.map((it, i) => ({
        key: it._id,
        titel: it.titel,
        technik: it.technik || null,
        jahr: it.jahr || null,
        span: spanFor(i),
        image: it.src
          ? { src: it.src, alt: it.alt || it.titel, width: it.width, height: it.height }
          : null,
      }))
    : placeholders.map((p) => ({ key: p.titel, ...p, image: null }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(headerRef.current.querySelectorAll("[data-anim]"), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 82%" },
        });

        gsap.utils.toArray(".v2-work").forEach((card) => {
          gsap.from(card, {
            y: 70,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          });
          const img = card.querySelector("[data-img]");
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        // looping medium marquee
        if (marqueeRef.current) {
          const inner = marqueeRef.current.querySelector("[data-track]");
          gsap.to(inner, {
            xPercent: -50,
            duration: 22,
            ease: "none",
            repeat: -1,
          });
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [hasContent]);

  // pointer tilt — fine pointers only, applied via inline handlers
  const handleMove = (e) => {
    const card = e.currentTarget;
    // Skip on touch/coarse pointers (avoids jitter while scrolling) and when
    // the user prefers reduced motion.
    if (
      e.pointerType === "touch" ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateY: px * 8,
      rotateX: -py * 8,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };
  const handleLeave = (e) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
  };

  return (
    <section ref={rootRef} id="werke" className="relative py-28 md:py-36">
      <div
        ref={headerRef}
        className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-8 mb-16 md:mb-24"
      >
        <p data-anim className="md:col-span-3 text-xs uppercase tracking-[0.4em] text-ochre">
          Arbeiten
        </p>
        <div className="md:col-span-9">
          <h2 data-anim className="font-serif text-3xl md:text-5xl tracking-tight leading-tight text-ink max-w-3xl">
            Eine Auswahl meiner <span className="italic text-plum">Projekte.</span>
          </h2>
          <p data-anim className="mt-6 max-w-xl text-ink/70 leading-relaxed">
            Von der Markenillustration bis zum kompletten Verpackungsdesign —
            ein Einblick in meine digitale Arbeit für Unternehmen.
          </p>
        </div>
      </div>

      {/* works grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 md:auto-rows-[20rem] [perspective:1200px]">
        {cards.map((card) => (
          <article
            key={card.key}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            className={`v2-work group relative overflow-hidden rounded-2xl border border-ink/10 bg-canvas-deep will-change-transform ${card.span}`}
          >
            <div data-img className="absolute inset-0 scale-110">
              {card.image ? (
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="block w-full h-full"
                  style={{ background: card.grad }}
                />
              )}
            </div>
            <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-500" />
            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="font-serif text-xl md:text-2xl text-canvas drop-shadow">{card.titel}</p>
              {card.technik || card.jahr ? (
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-canvas/80">
                  {[card.technik, card.jahr].filter(Boolean).join(" · ")}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {!hasContent ? (
        <p className="max-w-6xl mx-auto px-6 md:px-10 mt-10 text-sm text-ink/50 leading-relaxed">
          Die gezeigten Flächen sind Platzhalter — die echten Projektbilder werden
          hier ergänzt und lassen sich später bequem selbst pflegen.
        </p>
      ) : null}

      {/* medium marquee */}
      <div
        ref={marqueeRef}
        className="mt-20 md:mt-28 overflow-hidden border-y border-ink/10 py-6"
        aria-hidden="true"
      >
        <div data-track className="flex w-max gap-12 whitespace-nowrap will-change-transform">
          {[...mediums, ...mediums].map((m, i) => (
            <span
              key={i}
              className="font-serif italic text-2xl md:text-4xl text-ink/30"
            >
              {m}
              <span className="not-italic text-ochre"> · </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
