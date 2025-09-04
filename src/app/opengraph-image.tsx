// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

// Edge runtime is required for image generation
export const runtime = "edge";

// Optional: set size (defaults: 1200x630)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const title = "Sanchit Bhatnagar";
  const subtitle = "Software Engineer • React • Next.js • GraphQL";
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "sanchitb23.in";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          color: "white",
          background: "linear-gradient(135deg, #0b132b, #0e1b2a)",
          padding: 60,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 300px at 10% 20%, rgba(16, 185, 129, 0.25), transparent), radial-gradient(600px 300px at 90% 80%, rgba(16, 185, 129, 0.15), transparent)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 800 }}>{title}</div>
          <div style={{ fontSize: 28, opacity: 0.85 }}>{subtitle}</div>
          <div style={{ fontSize: 22, opacity: 0.6 }}>{site}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
