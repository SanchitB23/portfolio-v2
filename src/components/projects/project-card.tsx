"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { TProject } from "@/sanity/types/content";

export default function ProjectCard({
  p,
  enableTilt,
  outlineGlow,
}: {
  p: TProject;
  enableTilt?: boolean;
  outlineGlow?: boolean;
}) {
  const formattedDate = useMemo(() => formatMonthYear(p?.date), [p.date]);

  const tech = p.tech && p.tech.filter((item) => item !== null);

  return (
    <Link
      href={`/projects/${p.slug}`}
      className={[
        "group relative rounded-2xl ring-1 ring-border-primary bg-bg-secondary backdrop-blur-sm",
        outlineGlow ? "hover:ring-border-accent transition" : "",
        enableTilt
          ? "will-change-transform hover:-translate-y-1.5 hover:rotate-[0.2deg] duration-300"
          : "transition",
      ].join(" ")}
    >
      {/* cover */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
        {p.coverUrl ? (
          <Image
            src={p.coverUrl}
            alt={p.title ?? "Project cover"}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
            className="object-cover"
            priority={p.featured}
            placeholder={p.coverLqip ? "blur" : "empty"}
            blurDataURL={p.coverLqip ?? undefined}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-text-tertiary">
            —
          </div>
        )}

        {outlineGlow && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              boxShadow: "inset 0 0 0 1px var(--color-border-accent)",
            }}
          />
        )}
      </div>

      {/* body */}
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-text-primary">
            {p.title}
          </h3>
          {p.featured && (
            <span className="rounded bg-primary-100 px-2 py-0.5 text-xs text-text-accent">
              featured
            </span>
          )}
          {formattedDate && (
            <span className="ml-auto text-xs text-text-tertiary">
              {formattedDate}
            </span>
          )}
        </div>
        {p.shortDesc && (
          <p className="text-sm leading-6 text-text-secondary">{p.shortDesc}</p>
        )}

        {tech && (
          <div className="mt-1 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t._id}
                className="rounded-full border border-border-accent bg-primary-100 px-2.5 py-1 text-xs text-text-accent"
              >
                {t?.name}
              </span>
            ))}
          </div>
        )}

        {(p.links?.live || p.links?.github) && (
          <div className="mt-2 flex gap-3">
            {p.links?.live && (
              <a
                href={p.links.live}
                className="text-text-accent hover:text-text-accent-hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live →
              </a>
            )}
            {p.links?.github && (
              <a
                href={p.links.github}
                className="text-text-secondary hover:text-text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

function formatMonthYear(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("en-US", { month: "short", year: "numeric" }); // e.g., "Aug 2025"
}
