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
        "group relative rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-sm",
        outlineGlow ? "hover:ring-emerald-400/30 transition" : "",
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
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
            —
          </div>
        )}

        {outlineGlow && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(16,185,129,0.30)",
            }}
          />
        )}
      </div>

      {/* body */}
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-slate-100">{p.title}</h3>
          {p.featured && (
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
              featured
            </span>
          )}
          {formattedDate && (
            <span className="ml-auto text-xs text-slate-400">
              {formattedDate}
            </span>
          )}
        </div>
        {p.shortDesc && (
          <p className="text-sm leading-6 text-slate-300">{p.shortDesc}</p>
        )}

        {tech && (
          <div className="mt-1 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t._id}
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300"
              >
                {t?.name}
              </span>
            ))}
          </div>
        )}

        {(p.links?.live || p.links?.github) && (
          <div className="mt-2 flex gap-3">
            {p.links?.live && (
              <Link
                href={p.links.live}
                className="text-emerald-300 hover:text-emerald-200"
                target="_blank"
              >
                Live →
              </Link>
            )}
            {p.links?.github && (
              <Link
                href={p.links.github}
                className="text-slate-300 hover:text-emerald-300"
                target="_blank"
              >
                GitHub
              </Link>
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
