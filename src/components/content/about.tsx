import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import PT from "@/components/portable-text";
import { TAboutData } from "@/sanity/types/content";

export default async function About() {
  const { data }: { data: TAboutData } = await sanityFetch({
    query: ABOUT_QUERY,
    tags: ["about", "tag"],
  });

  if (!data) return null;

  return (
    <section id="about" className="relative bg-bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-primary-400 sm:text-4xl mb-8">
          About
        </h2>
        <div className="prose prose-invert max-w-none text-text-secondary">
          <PT value={data.body} />
        </div>

        {data?.skills &&
          data.skills.length > 0 &&
          data.skills.filter(Boolean).length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {data.skills.map((s) => (
                <span
                  key={s._id}
                  className="inline-flex items-center rounded-full border border-border-accent bg-primary-100 px-3 py-1 text-sm text-text-accent hover:bg-primary-200 transition"
                >
                  {s?.icon && <span className="mr-1">{s.icon}</span>}
                  {s?.name}
                </span>
              ))}
            </div>
          )}
      </div>
    </section>
  );
}
