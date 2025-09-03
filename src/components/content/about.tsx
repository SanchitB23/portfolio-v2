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
    <section id="about" className="relative bg-slate-950 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl mb-8">
          About Me
        </h2>
        <div className="prose prose-invert max-w-none text-slate-300">
          <PT value={data.body} />
        </div>

        {data?.skills &&
          data.skills.length > 0 &&
          data.skills.filter(Boolean).length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {data.skills.map((s) => (
                <span
                  key={s._id}
                  className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300 hover:bg-emerald-500/20 transition"
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
