// components/sections/FeaturedProjects.tsx
import { sanityFetch } from "@/sanity/lib/live";
import {
  FEATURED_PROJECTS_QUERY,
  THEME_FLAGS_QUERY,
} from "@/sanity/lib/queries";
import ProjectCard from "@/components/projects/project-card";
import type {
  TProjectResult,
  TFeatureFlags,
  TFeaturedProject,
} from "@/sanity/types/content";
import { ContentSourceMap } from "next-sanity";

type TFeaturedProjectsSanityResponse = [
  {
    data: TFeaturedProject[];
    sourceMap: ContentSourceMap | null;
    tags: string[];
  },
  {
    data: TFeatureFlags;
    sourceMap: ContentSourceMap | null;
    tags: string[];
  },
];

export default async function FeaturedProjects() {
  // [{ data: items }, { data: theme }]: TFeaturedProjectsProps
  const [{ data: items }, { data: theme }]: TFeaturedProjectsSanityResponse =
    await Promise.all([
      sanityFetch({ query: FEATURED_PROJECTS_QUERY, tags: ["project"] }),
      sanityFetch({
        query: THEME_FLAGS_QUERY,
        tags: ["themeSettings"],
      }),
    ]);

  if (!items?.length) return null;
  const flags = theme?.featureFlags ?? {};
  const enableTilt = !!flags.enableTiltOnProjectCards;
  const outlineGlow = !!flags.outlineGlowOnProjectCards;

  return (
    <section id="featured" className="bg-slate-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl">
          Featured Projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p: TFeaturedProject) => (
            <ProjectCard
              key={p._id}
              p={p}
              enableTilt={enableTilt}
              outlineGlow={outlineGlow}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
