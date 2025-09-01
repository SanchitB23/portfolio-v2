export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const isVisualEditingEnabled =
  process.env.NEXT_PUBLIC_ENABLE_VISUAL_EDITING || false;

export const isLiveEditingEnabled =
  process.env.NEXT_PUBLIC_ENABLE_LIVE_EDITING || false;

export const siteUrl = assertValue(
  process.env.NEXT_PUBLIC_SITE_URL,
  "Missing environment variable: NEXT_PUBLIC_SITE_URL"
);

// export const sanityViewerToken = assertValue(
//   process.env.SANITY_VIEWER_TOKEN,
//   "Missing environment variable: SANITY_VIEWER_TOKEN"
// );

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
