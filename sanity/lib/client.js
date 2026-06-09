import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // `useCdn: true` serves cached, faster responses from Sanity's CDN. The
  // homepage revalidates references on an interval (see sanity/lib/queries.js),
  // so slightly stale CDN data is fine here.
  useCdn: true,
});
