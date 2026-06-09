import AtelierGalleryClient from "./AtelierGalleryClient";

// Server Component: fetches the Version 2 works from Sanity and hands them to
// the client (GSAP) component. Falls back to an empty list — which renders the
// gradient placeholders — when no Sanity project is configured yet or the fetch
// fails, so the page never breaks during setup. Mirrors components/References.js.
export default async function AtelierGallery() {
  const items = await getWerke();
  return <AtelierGalleryClient items={items} />;
}

async function getWerke() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
  try {
    const [{ client }, { urlFor }, { werkeQuery }] = await Promise.all([
      import("@/sanity/lib/client"),
      import("@/sanity/lib/image"),
      import("@/sanity/lib/queries"),
    ]);

    const data = await client.fetch(werkeQuery, {}, { next: { revalidate: 60 } });

    return (data || []).map((w) => ({
      _id: w._id,
      titel: w.titel,
      technik: w.technik || null,
      jahr: w.jahr || null,
      alt: w.alt || w.titel,
      src: urlFor(w.image).width(900).fit("max").auto("format").url(),
      width: w.dimensions?.width ?? 900,
      height: w.dimensions?.height ?? 1200,
    }));
  } catch {
    return [];
  }
}
