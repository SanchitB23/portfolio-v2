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
    <section className="bg-bg-primary py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary-400 sm:text-4xl">
          Resume
        </h1>
        <p className="mt-2 text-text-secondary">
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
            className="mt-6 inline-block rounded-xl border border-border-primary bg-bg-secondary px-4 py-2 text-text-secondary hover:ring-border-accent"
            href={r.url}
            target="_blank"
            rel="noopener"
          >
            Download PDF
          </a>
        ) : (
          <p className="mt-6 text-text-tertiary">Upload a PDF in Studio.</p>
        )}
        {r?.note && <p className="mt-4 text-text-secondary">{r.note}</p>}
      </div>
    </section>
  );
}
