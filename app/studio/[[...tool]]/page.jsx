/**
 * Embedded Sanity Studio, mounted at /studio (catch-all so every sub-route
 * of the Studio resolves here). This route lives outside the (site) route
 * group, so it does NOT inherit the site's Navbar/Footer chrome.
 *
 * Birgit logs in here with her Sanity account to manage the references.
 */
import { NextStudio } from "next-sanity/studio";

import config from "../../../sanity.config";

export const dynamic = "force-static";

// `metadata` and `viewport` from next-sanity set the proper title and the
// mobile-friendly viewport for the Studio (and mark it noindex).
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
