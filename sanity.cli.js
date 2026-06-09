// Used by the Sanity CLI (e.g. `npx sanity deploy`, `npx sanity dataset ...`).
import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // The Studio is embedded in the Next.js app, not deployed standalone.
  studioHost: undefined,
});
