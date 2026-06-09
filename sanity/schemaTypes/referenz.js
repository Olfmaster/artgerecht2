import { orderRankField } from "@sanity/orderable-document-list";

// Document type for a single reference / client shown in the "Referenzen"
// section. Named `referenz` (not `reference`) because `reference` is a
// reserved Sanity field type.
export const referenz = {
  name: "referenz",
  title: "Referenz",
  type: "document",
  fields: [
    {
      name: "bild",
      title: "Bild (Logo / Foto)",
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
      description: "Name des Klienten oder Projekts.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "beschreibung",
      title: "Beschreibung",
      type: "text",
      rows: 3,
      description: "Kurzer Beschreibungstext (optional).",
    },
    // Hidden field that stores the manual drag-and-drop ordering.
    orderRankField({ type: "referenz" }),
  ],
  preview: {
    select: { title: "titel", subtitle: "beschreibung", media: "bild" },
  },
};
