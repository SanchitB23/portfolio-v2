// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive, QueryParams } from "next-sanity";
import { client } from "./client";
import { apiVersion } from "@/constants";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Live content is currently only available on the experimental API
    // https://www.sanity.io/docs/api-versioning
    apiVersion,
  }),
});

// A fetch helper for ISR, supporting Next.js caching options
export async function sanityFetchISR<QueryString extends string>({
  query,
  params = {},
  revalidate = 60, // seconds, adjust as needed
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
}) {
  return client.fetch(query, params, {
    cache: "force-cache", // explicitly cache for static generation / ISR
    next: {
      revalidate, // enables ISR, refetch after this time
    },
  });
}
