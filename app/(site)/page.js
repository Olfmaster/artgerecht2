import AtelierHero from "@/components/v2/AtelierHero";
import AtelierAbout from "@/components/v2/AtelierAbout";
import AtelierGallery from "@/components/v2/AtelierGallery";
import References from "@/components/References";
import AtelierContact from "@/components/v2/AtelierContact";

const TITLE = "Digitale Illustration & Verpackungsdesign — Birgit Silberg";
const DESCRIPTION =
  "Birgit Silberg gestaltet digital für Unternehmen: digitale Illustration und Verpackungsdesign — von der ersten Idee bis zum druckfertigen Ergebnis.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "artgerecht",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Homepage — the artist-focused atelier site. Reuses the shared References
// component and the Resend-backed contact action via AtelierContact.
export default function Home() {
  return (
    <div className="v2-root relative bg-canvas text-ink">
      <div className="v2-grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative z-10">
        <AtelierHero />
        <AtelierAbout />
        <AtelierGallery />
        <References />
        <AtelierContact />
      </div>
    </div>
  );
}
