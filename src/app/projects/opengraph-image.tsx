// app/projects/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { TProject, TSanityResponse, TTagRef } from "@/sanity/types/content";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: p }: TSanityResponse<TProject> = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ["project", "tag"],
  });

  // Fallbacks if project missing
  const title = p?.title ?? "Project";
  const tech = (p?.tech ?? [])
    .map((t: TTagRef) => t?.name)
    .filter(Boolean)
    .slice(0, 5)
    .join(" • ");
  const subtitle = tech || p?.shortDesc || "Sanchit Bhatnagar";
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "sanchitb23.in";

  // If you want to incorporate the cover, you can draw it with a background-image <div>.
  const cover = p?.coverUrl;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          color: "white",
          background: cover
            ? `linear-gradient(0deg, rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${cover}) center/cover no-repeat`
            : "linear-gradient(135deg, #0b132b, #0e1b2a)",
          padding: 60,
          position: "relative",
        }}
      >
        {!cover && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(600px 300px at 10% 20%, rgba(16, 185, 129, 0.25), transparent), radial-gradient(600px 300px at 90% 80%, rgba(16, 185, 129, 0.15), transparent)",
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            zIndex: 1,
            maxWidth: 1000,
          }}
        >
          <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 26, opacity: 0.85 }}>{subtitle}</div>
          )}
          <div style={{ fontSize: 22, opacity: 0.6 }}>
            {site}/projects/{params.slug}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
