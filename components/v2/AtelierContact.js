"use client";
import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { gsap } from "@/lib/gsap";
import { sendContactMessage } from "@/lib/contact-action";

// Version 2 contact — first-person artist voice, painterly styling. Reuses the
// same Resend-backed server action as V1 so nothing about delivery changes.
const initialState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-ink text-canvas rounded-full text-sm font-medium hover:bg-plum transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-plum focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      {pending ? "Wird gesendet …" : "Nachricht senden"}
      <span aria-hidden="true">→</span>
    </button>
  );
}

export default function AtelierContact() {
  const sectionRef = useRef(null);
  const [state, formAction] = useActionState(sendContactMessage, initialState);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll("[data-anim]"), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="atelier-kontakt"
      className="relative py-28 md:py-40 px-6 md:px-10 overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="v2-blob absolute -top-10 right-[-10vw] w-[40vw] h-[40vw] rounded-full"
        style={{ background: "radial-gradient(circle at 50% 50%, #d9a6ab, transparent 70%)" }}
      />
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p data-anim className="text-xs uppercase tracking-[0.4em] text-ochre mb-6">
            Kontakt
          </p>
          <h2 data-anim className="font-serif text-4xl md:text-6xl tracking-tight leading-[0.98] text-ink mb-8">
            Lassen Sie uns Ihre Marke gestalten.
          </h2>
          <p data-anim className="text-ink/70 leading-relaxed max-w-md mb-10">
            Ob digitale Illustration, ein frisches Verpackungsdesign oder ein
            komplettes Markenbild — schreiben Sie mir. Ich melde mich mit ersten
            Ideen zurück.
          </p>

          <ul data-anim className="space-y-3 text-sm text-ink/80">
            <li>
              <span className="text-ink/50 inline-block w-20">E-Mail</span>
              <a href="mailto:email@artgerecht.tv" className="font-medium hover:text-plum transition-colors">
                email@artgerecht.tv
              </a>
            </li>
            <li>
              <span className="text-ink/50 inline-block w-20">Telefon</span>
              <a href="tel:+4906454911981" className="font-medium hover:text-plum transition-colors">
                06454 911981
              </a>
            </li>
            <li>
              <span className="text-ink/50 inline-block w-20">Web</span>
              <a href="https://www.artgerecht.tv" rel="noopener" className="font-medium hover:text-plum transition-colors">
                artgerecht.tv
              </a>
            </li>
          </ul>
        </div>

        <form data-anim action={formAction} className="md:col-span-7 grid gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field name="name" label="Name" required autoComplete="name" />
            <Field name="email" type="email" label="E-Mail" required autoComplete="email" />
          </div>
          <Field name="phone" label="Telefon (optional)" type="tel" autoComplete="tel" />
          <Field name="message" label="Ihre Nachricht" required textarea />

          {state.status === "error" && (
            <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {state.message}
            </p>
          )}
          {state.status === "success" && (
            <p role="status" className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
              {state.message}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-ink/50 max-w-xs leading-relaxed">
              Mit dem Absenden stimmen Sie zu, dass ich Ihre Angaben zur
              Beantwortung Ihrer Anfrage verarbeite.
            </p>
            <SubmitButton />
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", required, autoComplete, textarea }) {
  const id = `atelier-${name}`;
  const base =
    "peer w-full bg-transparent border-b border-ink/25 pt-6 pb-2 px-0 text-base text-ink placeholder-transparent focus:outline-none focus:border-plum transition-colors";
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={name} rows={4} required={required} placeholder={label} className={base + " resize-none"} />
      ) : (
        <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} placeholder={label} className={base} />
      )}
      <label
        htmlFor={id}
        className="absolute left-0 top-1 text-xs uppercase tracking-widest text-ink/50 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:text-ink/40 peer-focus:top-1 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-ink/50"
      >
        {label}
      </label>
    </div>
  );
}
