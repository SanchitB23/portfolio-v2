// app/projects/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch, sanityFetchISR } from "@/sanity/lib/live";
import {
  PROJECT_BY_SLUG_QUERY,
  RELATED_PROJECTS_QUERY,
} from "@/sanity/lib/queries";
import type { TypedObject } from "sanity";
import ProjectJsonLd from "@/components/seo/project-json-ld";
import { TProject, TSanityResponse } from "@/sanity/types/content";
import PT from "@/components/portable-text";
import { compact } from "@/utils";

type ProjectDoc = {
  _id: string;
  title: string;
  slug: string;
  shortDesc?: string;
  longDesc?: TypedObject[];
  date?: string;
  tech?: { _id: string; name: string; slug?: { current?: string } }[];
  links?: { github?: string; live?: string; caseStudy?: string };
  coverUrl?: string;
  coverLqip?: string;
};

export async function generateStaticParams() {
  // optional: prebuild slugs
  const { data: slugs }: TSanityResponse<{ slug: string }[]> =
    await sanityFetchISR({
      query: `*[_type=="project" && defined(slug.current)][]{'slug': slug.current}`,
    });
  return (slugs ?? []).map((s) => ({ slug: s.slug }));
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const { data: project }: TSanityResponse<TProject> = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
    tags: ["project", "tag"],
  });

  if (!project) return notFound();

  const { data: related }: TSanityResponse<ProjectDoc[]> = await sanityFetch({
    query: RELATED_PROJECTS_QUERY,
    params: {
      id: project._id,
      techIds: (compact(project.tech) ?? []).map((t) => t._id),
    },
    tags: ["project", "tag"],
  });

  return (
    <section className="bg-slate-950 py-12">
      <div className="mx-auto max-w-5xl px-6">
        {/* JSON-LD */}
        <ProjectJsonLd
          name={project.title}
          slug={project.slug}
          description={project.shortDesc}
          repoUrl={project.links?.github}
          liveUrl={project.links?.live}
        />

        <h1 className="text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl">
          {project.title}
        </h1>
        {project.shortDesc && (
          <p className="mt-2 text-slate-300">{project.shortDesc}</p>
        )}

        {/* cover */}
        {project.coverUrl && (
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-white/10">
            <Image
              src={project.coverUrl}
              alt={project.title || ""}
              fill
              className="object-cover"
              sizes="100vw"
              placeholder={project.coverLqip ? "blur" : "empty"}
              blurDataURL={project.coverLqip ?? undefined}
            />
          </div>
        )}

        {/* meta */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
          {project.date && (
            <span>
              {new Date(project.date).toLocaleString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
          {compact(project.tech)?.length ? (
            <div className="flex flex-wrap gap-2">
              {compact(project.tech).map((t) => (
                <span
                  key={t._id}
                  className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-300 text-xs"
                >
                  {t.name}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <article className="prose prose-invert mt-6 max-w-none">
          <PT value={project.longDesc} />
        </article>

        {/* links */}
        {(project.links?.live ||
          project.links?.github ||
          project.links?.caseStudy) && (
          <div className="mt-6 flex flex-wrap gap-4">
            {project.links?.live && (
              <a
                href={project.links.live}
                className="text-emerald-300 hover:text-emerald-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live →
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                className="text-slate-300 hover:text-emerald-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}
            {project.links?.caseStudy && (
              <a
                href={project.links.caseStudy}
                className="text-slate-300 hover:text-emerald-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Case study
              </a>
            )}
          </div>
        )}

        {/* related */}
        {related?.length ? (
          <div className="mt-12">
            <h2 className="mb-4 text-xl font-semibold text-slate-100">
              Related projects
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <li
                  key={r._id}
                  className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                >
                  <Link
                    href={`/projects/${r.slug}`}
                    className="text-emerald-300 hover:text-emerald-200"
                  >
                    {r.title}
                  </Link>
                  {r.shortDesc && (
                    <p className="mt-1 text-sm text-slate-300">{r.shortDesc}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
