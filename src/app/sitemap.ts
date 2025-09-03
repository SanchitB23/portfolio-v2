import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { siteUrl } from "@/constants";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";
import { TSanityResponse, TSitemapQueryResult } from "@/sanity/types/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    data: { projects },
  }: TSanityResponse<TSitemapQueryResult> = await sanityFetch({
    query: SITEMAP_QUERY,
    tags: ["project"],
  });

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date() },
    { url: `${siteUrl}/projects`, lastModified: new Date() },
    { url: `${siteUrl}/resume`, lastModified: new Date() },
  ];

  const projectPages: MetadataRoute.Sitemap = (projects ?? []).map((p) => ({
    url: `${siteUrl}${p.loc}`,
    lastModified: p.lastmod ? new Date(p.lastmod) : undefined,
  }));

  return [...staticPages, ...projectPages];
}
