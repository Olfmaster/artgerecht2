"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import GeoShape from "./GeoShape";

// Fallback shown until Birgit has added references in the Studio (/studio).
// These read as a typographic placeholder set, not real clients.
const placeholders = [
  { monogram: "I",    label: "Kommune"        },
  { monogram: "II",   label: "Handwerk"       },
  { monogram: "III",  label: "Kultur"         },
  { monogram: "IV",   label: "Gastronomie"    },
  { monogram: "V",    label: "Verband"        },
  { monogram: "VI",   label: "Verein"         },
  { monogram: "VII",  label: "Bildung"        },
  { monogram: "VIII", label: "Tourismus"      },
  { monogram: "IX",   label: "Soziales"       },
  { monogram: "X",    label: "Existenzgründer"},
  { monogram: "XI",   label: "Landwirtschaft" },
  { monogram: "XII",  label: "Stiftung"       },
];

export default function ReferencesClient({ items }) {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const headerRef = useRef(null);

  const hasContent = Array.isArray(items) && items.length > 0;
  const cards = hasContent
    ? items.map((it) => ({
        key: it._id,
        label: it.titel,
        beschreibung: it.beschreibung,
        image: it.src
          ? { src: it.src, alt: it.alt || it.titel, width: it.width, height: it.height }
          : null,
      }))
    : placeholders.map((p, i) => ({
        key: `${p.monogram}-${i}`,
        label: p.label,
        monogram: p.monogram,
      }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.querySelectorAll("[data-anim]"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
        }
      );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const getDistance = () => track.scrollWidth - window.innerWidth;

        // Few cards: the track already fits within the viewport, so there's
        // nothing to scroll horizontally. Skip the pin and reveal the cards in
        // place — otherwise the containerAnimation-based reveals below never
        // fire and the cards stay invisible (opacity 0).
        if (getDistance() <= 0) {
          gsap.fromTo(
            ".ref-card",
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: pinRef.current, start: "top 75%" },
            }
          );
          return;
        }

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => "+=" + getDistance(),
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.utils.toArray(".ref-card").forEach((card) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
          // subtle monogram float — keeps placeholder cards from feeling static
          const monogram = card.querySelector("[data-monogram]");
          if (monogram) {
            gsap.to(monogram, {
              yPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            });
          }
        });

        return () => tween.kill();
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          ".ref-card",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: { trigger: trackRef.current, start: "top 80%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasContent]);

  return (
    <section ref={sectionRef} id="referenzen" className="relative overflow-hidden">
      <GeoShape
        variant="diamond"
        size={360}
        y={-220}
        rotate={90}
        opacity={0.3}
        className="top-20 right-[-4rem] md:right-10"
      />
      <div
        ref={headerRef}
        className="relative max-w-6xl mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-16 grid md:grid-cols-12 gap-8"
      >
        <p
          data-anim
          className="md:col-span-3 text-xs uppercase tracking-[0.3em] text-rose-gold"
        >
          Referenzen
        </p>
        <div className="md:col-span-9">
          <h2
            data-anim
            className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight"
          >
            Vertrauen, das aus
            <br className="hidden md:block" /> Zusammenarbeit entsteht.
          </h2>
          <p
            data-anim
            className="mt-6 max-w-xl text-zinc-600 leading-relaxed"
          >
            Eine kuratierte Auswahl an Wegbegleitern aus Wirtschaft, Kultur und
            öffentlicher Hand — vom Einzelunternehmen bis zum Verband.
          </p>
        </div>
      </div>

      <div
        ref={pinRef}
        className="md:h-screen md:overflow-hidden flex md:items-center"
      >
        <div
          ref={trackRef}
          className="flex gap-6 md:gap-8 px-6 md:px-[14vw] will-change-transform overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Auswahl von Wegbegleitern"
        >
          {cards.map((card, i) => (
            <article
              key={card.key}
              className="ref-card group relative shrink-0 snap-center flex flex-col justify-between h-72 md:h-[60vh] w-72 md:w-[26vw] border border-zinc-200 rounded-2xl bg-white p-7 md:p-9 overflow-hidden transition-colors hover:border-rose-gold"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                Klient · {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 flex items-center justify-center">
                {card.image ? (
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    width={card.image.width}
                    height={card.image.height}
                    sizes="(min-width: 768px) 26vw, 18rem"
                    className="max-h-[60%] w-auto object-contain"
                  />
                ) : (
                  <span
                    data-monogram
                    className="font-serif italic text-6xl md:text-8xl text-zinc-800 tracking-tight will-change-transform"
                    aria-hidden="true"
                  >
                    {card.monogram}
                    <span className="text-rose-gold">.</span>
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                  <span>{card.label}</span>
                  <span
                    aria-hidden="true"
                    className="text-rose-gold-soft group-hover:text-rose-gold transition-colors"
                  >
                    ↗
                  </span>
                </div>
                {card.beschreibung ? (
                  <p className="mt-3 text-xs leading-relaxed text-zinc-500 line-clamp-3 normal-case tracking-normal">
                    {card.beschreibung}
                  </p>
                ) : null}
              </div>
              <span className="pointer-events-none absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-rose-gold/5 group-hover:bg-rose-gold/10 transition-colors" />
            </article>
          ))}
        </div>
      </div>

      {!hasContent ? (
        <p className="mt-12 md:mt-20 mb-32 md:mb-40 max-w-xl text-sm text-zinc-500 mx-auto text-center px-6 leading-relaxed">
          Logos und vollständige Projekt­namen werden ergänzt — die hier
          gezeigten Monogramme dienen vorerst als typografische Layout-Referenz.
        </p>
      ) : (
        <div className="mt-12 md:mt-20 mb-32 md:mb-40" />
      )}
    </section>
  );
}
