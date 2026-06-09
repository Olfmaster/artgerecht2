import AtelierAboutClient from "./AtelierAboutClient";

// Server Component: fetches the "Über mich" portrait from Sanity and hands it
// to the client (GSAP) component. Falls back to null — which renders the
// painterly placeholder — when no Sanity project is configured yet or the fetch
// fails. Mirrors components/References.js.
export default async function AtelierAbout() {
  const portrait = await getPortrait();
  return <AtelierAboutClient portrait={portrait} />;
}

async function getPortrait() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  try {
    const [{ client }, { urlFor }, { portraitQuery }] = await Promise.all([
      import("@/sanity/lib/client"),
      import("@/sanity/lib/image"),
      import("@/sanity/lib/queries"),
    ]);

    const data = await client.fetch(portraitQuery, {}, { next: { revalidate: 60 } });
    if (!data?.image?.asset) return null;

    return {
      alt: data.alt || "Portrait von Birgit Silberg",
      src: urlFor(data.image).width(800).fit("max").auto("format").url(),
      width: data.dimensions?.width ?? 800,
      height: data.dimensions?.height ?? 1000,
    };
  } catch {
    return null;
  }
}
