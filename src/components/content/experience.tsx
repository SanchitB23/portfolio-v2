// components/sections/Experience.tsx
import Image from "next/image";
import type { TypedObject } from "sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { EXPERIENCE_QUERY } from "@/sanity/lib/queries";
import { TExperience } from "@/sanity/types/content";

function formatRange(start?: string, end?: string | null, isCurrent?: boolean) {
  if (!start) return "";
  const fmt = (s: string) =>
    new Date(s).toLocaleString("en-US", { month: "short", year: "numeric" });
  const from = fmt(start);
  const to = isCurrent || !end ? "Present" : fmt(end);
  return `${from} — ${to}`;
}

/**
 * Extract plain text lines from Portable Text blocks for bullet rendering.
 * Keeps types strict with `TypedObject`; we narrow safely at runtime.
 */
function ptToLines(blocks: TypedObject[]): string[] {
  return blocks
    .filter(
      (
        b
      ): b is TypedObject & {
        _type: "block";
        children?: Array<{ _type?: string; text?: string }>;
      } => {
        return (b as TypedObject)?._type === "block";
      }
    )
    .flatMap((b) =>
      (b.children ?? [])
        .filter((c) => c && c._type === "span" && typeof c.text === "string")
        .map((c) => c.text as string)
    )
    .filter(Boolean);
}

function Highlights({ value }: { value: TypedObject[] | TypedObject }) {
  if (!value) return null;

  // If it's already an array of strings
  if (Array.isArray(value) && typeof value[0] === "string") {
    return (
      <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-text-secondary">
        {value.map((t, i) => (
          <li key={i}>{String(t)}</li>
        ))}
      </ul>
    );
  }

  // If it's Portable Text (TypedObject[])
  if (Array.isArray(value)) {
    const lines = ptToLines(value as TypedObject[]);
    if (lines.length === 0) return null;
    return (
      <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-text-secondary">
        {lines.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    );
  }

  return null;
}

export default async function Experience() {
  const { data: items }: { data: TExperience[] } = await sanityFetch({
    query: EXPERIENCE_QUERY,
    tags: ["experience", "tag"],
  });
  if (!items || items.length === 0) return null;

  return (
    <section id="experience" className="relative bg-bg-primary py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
      />
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary-400 sm:text-4xl mb-10">
          Experience
        </h2>

        <ol className="relative border-s border-border-primary">
          {items.map((exp) => (
            <li key={exp._id} className="mb-12 ms-6">
              <span className="absolute -start-1.5 mt-2 h-3 w-3 rounded-full border border-border-accent-hover bg-primary-200" />

              <div className="grid gap-4 rounded-2xl bg-bg-secondary p-5 ring-1 ring-border-primary backdrop-blur-sm transition hover:ring-border-accent md:grid-cols-[64px,1fr]">
                {/* logo */}
                <div className="relative h-12 w-12 overflow-hidden rounded-xl ring-1 ring-border-primary">
                  {exp.logoUrl ? (
                    <Image
                      src={exp.logoUrl}
                      alt={`${exp.company ?? "Company"} logo`}
                      fill
                      className="object-contain p-1.5"
                      sizes="48px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-text-tertiary">
                      —
                    </div>
                  )}
                </div>

                {/* content */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {exp.role ?? "Engineer"}
                    </h3>
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        className="text-text-secondary hover:text-text-accent"
                        rel="noopener noreferrer"
                      >
                        @ {exp.company}
                      </a>
                    ) : (
                      <span className="text-text-secondary">
                        @ {exp.company}
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-text-tertiary">
                    <span>
                      {formatRange(exp.startDate, exp.endDate, exp.isCurrent)}
                    </span>
                    {exp.location && <span> • {exp.location}</span>}
                    {exp.featured && (
                      <span className="ml-2 rounded bg-primary-100 px-2 py-0.5 text-text-accent">
                        featured
                      </span>
                    )}
                  </div>
                  <Highlights value={exp.highlights} />
                  {exp.tech && exp.tech.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t._id}
                          className="rounded-full border border-border-accent bg-primary-100 px-2.5 py-1 text-xs text-text-accent"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
