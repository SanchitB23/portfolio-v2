"use client";
import Script from "next/script";

export default function ProjectJsonLd({
  name,
  slug,
  description,
  repoUrl,
  liveUrl,
}: {
  name: string;
  slug: string;
  description?: string;
  repoUrl?: string;
  liveUrl?: string;
}) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sanchitb23.in";
  const json = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name,
    description,
    codeRepository: repoUrl,
    url: `${site}/projects/${slug}`,
    programmingLanguage: "TypeScript",
    author: { "@type": "Person", name: "Sanchit Bhatnagar" },
    isAccessibleForFree: true,
  };
  return (
    <Script
      id="jsonld-project"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
