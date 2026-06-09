import { groq } from "next-sanity";

// All references that have an image, in the drag-and-drop order set in the
// Studio (orderRank, provided by @sanity/orderable-document-list). We project
// the image asset's dimensions so next/image can size it without layout shift.
export const referencesQuery = groq`
  *[_type == "referenz" && defined(bild.asset)] | order(orderRank) {
    _id,
    titel,
    beschreibung,
    "alt": coalesce(bild.alt, titel),
    "image": bild,
    "dimensions": bild.asset->metadata.dimensions
  }
`;

// Version 2 "Arbeiten" gallery — works with an image, in the Studio order.
export const werkeQuery = groq`
  *[_type == "werk" && defined(bild.asset)] | order(orderRank) {
    _id,
    titel,
    technik,
    jahr,
    "alt": coalesce(bild.alt, titel),
    "image": bild,
    "dimensions": bild.asset->metadata.dimensions
  }
`;

// Version 2 "Über mich" portrait (single document).
export const portraitQuery = groq`
  *[_type == "atelierProfil"][0]{
    "alt": coalesce(portrait.alt, "Portrait von Birgit Silberg"),
    "image": portrait,
    "dimensions": portrait.asset->metadata.dimensions
  }
`;
