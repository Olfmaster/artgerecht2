// Singleton document holding the "Über mich" portrait for Version 2. Edited via
// a fixed document id (see sanity/structure.js) so there's always exactly one.
export const atelierProfil = {
  name: "atelierProfil",
  title: "Über mich (Version 2)",
  type: "document",
  fields: [
    {
      name: "portrait",
      title: "Portrait-Foto",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alternativtext",
          type: "string",
          description:
            "Kurze Bildbeschreibung für Screenreader und SEO. Fällt auf einen Standardtext zurück, wenn leer.",
        },
      ],
    },
  ],
  preview: {
    select: { media: "portrait" },
    prepare: ({ media }) => ({ title: "Über mich – Portrait", media }),
  },
};
