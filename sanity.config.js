// Configuration for the embedded Sanity Studio mounted at /studio.
// See app/studio/[[...tool]]/page.jsx for where this is rendered.
"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision lets you test GROQ queries against the dataset from within the Studio.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
