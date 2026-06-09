const SITE_URL = "https://www.artgerecht.tv";
const DESCRIPTION =
  "Birgit Silberg gestaltet digital für Unternehmen: digitale Illustration und Verpackungsdesign — von der ersten Idee bis zum druckfertigen Ergebnis.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#studio`,
      name: "artgerecht — Birgit Silberg",
      alternateName: "artgerecht",
      url: SITE_URL,
      email: "email@artgerecht.tv",
      telephone: "+4906454911981",
      image: `${SITE_URL}/opengraph-image`,
      logo: `${SITE_URL}/Logo_artgerecht.png`,
      areaServed: "DE",
      priceRange: "€€",
      description: DESCRIPTION,
      founder: {
        "@type": "Person",
        name: "Birgit Silberg",
        jobTitle: "Illustratorin & Designerin",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "DE",
      },
      makesOffer: [
        "Digitale Illustration",
        "Verpackungsdesign",
        "Etiketten- & Verpackungsdesign",
        "Markenillustration",
        "Editorial & Printdesign",
        "Corporate Design",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "artgerecht",
      inLanguage: "de-DE",
      publisher: { "@id": `${SITE_URL}/#studio` },
    },
  ],
};

// Standalone atelier site — no shared V1 navbar/footer. The page (v2) brings
// its own hero and contact section, so the layout only provides the skip link,
// the <main> landmark, and the site-level JSON-LD.
export default function SiteLayout({ children }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-black focus:text-white focus:text-sm focus:shadow-lg"
      >
        Zum Inhalt springen
      </a>
      <main id="main">{children}</main>
      <script
        type="application/ld+json"
        // JSON-LD payload is a constant we author — safe to inject
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
