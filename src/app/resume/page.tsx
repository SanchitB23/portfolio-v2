import { sanityFetch } from "@/sanity/lib/live";
import { TResumeResponse, TSanityResponse } from "@/sanity/types/content";
import { groq } from "next-sanity";

const RESUME_QUERY = groq`*[_type=="resumeSettings"][0]{ lastUpdated, "url": file.asset->url, note }`;

export default async function ResumePage() {
  const { data: r }: TSanityResponse<TResumeResponse> = await sanityFetch({
    query: RESUME_QUERY,
    tags: ["resumeSettings"],
  });

  return (
    <section className="bg-slate-950 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl">
          Resume
        </h1>
        <p className="mt-2 text-slate-300">
          Last updated:{" "}
          {r?.lastUpdated
            ? new Date(r.lastUpdated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "—"}
        </p>
        {r?.url ? (
          <a
            className="mt-6 inline-block rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-200 hover:ring-emerald-400/30"
            href={r.url}
            target="_blank"
            rel="noopener"
          >
            Download PDF
          </a>
        ) : (
          <p className="mt-6 text-slate-400">Upload a PDF in Studio.</p>
        )}
        {r?.note && <p className="mt-4 text-slate-300">{r.note}</p>}
      </div>
    </section>
  );
}
