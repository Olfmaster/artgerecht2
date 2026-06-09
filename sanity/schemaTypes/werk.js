import { orderRankField } from "@sanity/orderable-document-list";

// Document type for a single work shown in the "Arbeiten" gallery of Version 2
// (digital illustration / packaging projects). Mirrors `referenz` but adds
// technique and year. Named `werk` to stay in German like the rest of the CMS.
export const werk = {
  name: "werk",
  title: "Werk (Version 2)",
  type: "document",
  fields: [
    {
      name: "bild",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "alt",
          title: "Alternativtext",
          type: "string",
          description:
            "Kurze Bildbeschreibung für Screenreader und SEO. Fällt auf den Titel zurück, wenn leer.",
        },
      ],
    },
    {
      name: "titel",
      title: "Titel",
      type: "string",
      description: "Name des Projekts.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "technik",
      title: "Technik / Leistung",
      type: "string",
      description: 'z. B. "Verpackungsdesign · Illustration" (optional).',
    },
    {
      name: "jahr",
      title: "Jahr",
      type: "string",
      description: 'z. B. "2024" (optional).',
    },
    // Hidden field that stores the manual drag-and-drop ordering.
    orderRankField({ type: "werk" }),
  ],
  preview: {
    select: { title: "titel", subtitle: "technik", media: "bild" },
  },
};
