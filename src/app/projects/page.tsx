import ProjectCard from "@/components/projects/project-card";
import ProjectsFilter from "@/components/projects/project-filter";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PROJECTS_QUERY,
  PROJECT_FACETS_QUERY,
  THEME_FLAGS_QUERY,
} from "@/sanity/lib/queries";
import type {
  TProjectFacets,
  TProjectResult,
  TSearchParamsShape,
  TThemeFlags,
} from "@/sanity/types/content";
import { ContentSourceMap } from "next-sanity";
import { PageLink } from "./page-link";

// Revalidate via webhook + tags later; during build we can allow caching
export const revalidate = 60; // adjust later when webhooks are wired

const PAGE_SIZE = 12;

type ProjectsPageSanityResponse = [
  {
    data: TProjectResult;
    sourceMap: ContentSourceMap | null;
    tags: string[];
  },
  {
    data: TProjectFacets;
    sourceMap: ContentSourceMap | null;
    tags: string[];
  },
  {
    data: TThemeFlags;
    sourceMap: ContentSourceMap | null;
    tags: string[];
  },
];

export default async function ProjectsPage(props: {
  searchParams: Promise<TSearchParamsShape>;
}) {
  const searchParams = await props.searchParams;

  const page = Math.max(1, Number(searchParams.page ?? "1"));
  const limit = PAGE_SIZE;
  const offset = (page - 1) * limit;
  const end = offset + limit;
  const year = searchParams.year ? Number(searchParams.year) : null;
  const params = {
    q: searchParams.q ? `${searchParams.q}*` : null,
    tagSlug: searchParams.tag ?? null,
    year,
    offset,
    end,
    limit,
    nextYear: year ? year + 1 : null,
  } as const;

  const res: ProjectsPageSanityResponse = await Promise.all([
    sanityFetch({
      query: PROJECTS_QUERY,
      params,
      tags: ["project", "tag"],
    }),
    sanityFetch({
      query: PROJECT_FACETS_QUERY,
      params: {},
      tags: ["project", "tag"],
    }),
    sanityFetch({
      query: THEME_FLAGS_QUERY,
      params: {},
      tags: ["themeSettings"],
    }),
  ]);

  const [projectsRes, facetsRes, themeRes] = res;
  const {
    data: { total, items },
  } = projectsRes;
  const { data: facets } = facetsRes;
  const { data: theme } = themeRes;

  const totalPages = Math.max(1, Math.ceil((total ?? 0) / PAGE_SIZE));
  const flags = theme?.featureFlags ?? {};
  const enableTilt = !!flags.enableTiltOnProjectCards;
  const outlineGlow = !!flags.outlineGlowOnProjectCards;

  return (
    <section className="bg-slate-950 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl">
          All Projects
        </h1>

        <ProjectsFilter
          tags={facets?.tags ?? []}
          yearsRaw={facets?.yearsRaw ?? []}
        />

        {items?.length ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <ProjectCard
                  key={p._id}
                  p={p}
                  enableTilt={enableTilt}
                  outlineGlow={outlineGlow}
                />
              ))}
            </div>

            {/* pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3 text-sm">
                <PageLink page={page - 1} disabled={page <= 1}>
                  ← Prev
                </PageLink>
                <span className="text-slate-400">
                  Page {page} / {totalPages}
                </span>
                <PageLink page={page + 1} disabled={page >= totalPages}>
                  Next →
                </PageLink>
              </div>
            )}
          </>
        ) : (
          <p className="text-slate-400">No projects match your filters.</p>
        )}
      </div>
    </section>
  );
}
