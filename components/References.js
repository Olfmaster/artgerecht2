import ReferencesClient from "./ReferencesClient";

// Server Component: fetches the references from Sanity and hands them to the
// client (GSAP) component. Falls back to an empty list — which renders the
// placeholder monograms — when no Sanity project is configured yet or the
// fetch fails, so the homepage never breaks during setup.
export default async function References() {
  const items = await getReferences();
  return <ReferencesClient items={items} />;
}

async function getReferences() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
  try {
    const [{ client }, { urlFor }, { referencesQuery }] = await Promise.all([
      import("@/sanity/lib/client"),
      import("@/sanity/lib/image"),
      import("@/sanity/lib/queries"),
    ]);

    const data = await client.fetch(
      referencesQuery,
      {},
      { next: { revalidate: 60 } }
    );

    return (data || []).map((r) => ({
      _id: r._id,
      titel: r.titel,
      beschreibung: r.beschreibung || null,
      alt: r.alt || r.titel,
      src: urlFor(r.image).width(480).fit("max").auto("format").url(),
      width: r.dimensions?.width ?? 480,
      height: r.dimensions?.height ?? 480,
    }));
  } catch {
    return [];
  }
}
