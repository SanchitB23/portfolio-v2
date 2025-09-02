"use client";

import { TProjectFacets } from "@/sanity/types/content";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

export default function ProjectsFilter({ tags, yearsRaw }: TProjectFacets) {
  const sp = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, start] = useTransition();

  const setParam = useCallback(
    (key: string, value?: string) => {
      const next = new URLSearchParams(sp);
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page"); // reset pagination on filter change
      start(() => router.replace(`${pathname}?${next.toString()}`));
    },
    [sp, pathname, router, start]
  );

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      {/* search */}
      <input
        defaultValue={sp.get("q") ?? ""}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            setParam(
              "q",
              (e.target as HTMLInputElement).value.trim() || undefined
            );
        }}
        placeholder="Search projects…"
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 outline-none"
      />

      {/* tags */}
      {/* <select
        defaultValue={sp.get("tag") ?? ""}
        onChange={(e) => setParam("tag", e.target.value || undefined)}
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
      >
        <option value="">All tags</option>
        {tags.map((t) => (
          <option key={t._id} value={t.slug}>
            {t.name}
          </option>
        ))}
      </select> */}

      {/* years */}
      {/* <select
        defaultValue={sp.get("year") ?? ""}
        onChange={(e) => setParam("year", e.target.value || undefined)}
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
      >
        <option value="">All years</option>
        {years.map((y) => (
          <option key={y} value={String(y)}>
            {y}
          </option>
        ))}
      </select> */}

      {isPending && <span className="text-xs text-slate-400">Updating…</span>}
    </div>
  );
}
