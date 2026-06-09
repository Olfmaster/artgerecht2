import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// Custom desk structure with German labels: orderable lists for the homepage
// "Referenzen" and the Version 2 "Werke", plus a single "Über mich" portrait
// document. Birgit can drag the cards into the order she wants.
export const structure = (S, context) =>
  S.list()
    .title("Inhalte")
    .items([
      orderableDocumentListDeskItem({
        type: "referenz",
        title: "Referenzen",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "werk",
        title: "Werke (Version 2)",
        S,
        context,
      }),
      S.divider(),
      S.listItem()
        .title("Über mich – Portrait (V2)")
        .id("atelierProfil")
        .child(
          S.document()
            .schemaType("atelierProfil")
            .documentId("atelierProfil")
        ),
    ]);
