// Sanity project environment. These are read both in the browser (embedded
// Studio) and on the server, hence the NEXT_PUBLIC_ prefix.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue(v, errorMessage) {
  if (v === undefined || v === "") {
    throw new Error(errorMessage);
  }
  return v;
}
