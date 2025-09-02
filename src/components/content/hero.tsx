import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/lib/queries";
import PT from "@/components/portable-text";
import type { HeroData } from "@/sanity/types/content";
import { TypedObject } from "sanity";

export default async function Hero() {
  const { data }: { data: HeroData } = await sanityFetch({
    query: HERO_QUERY,
    tags: ["hero"],
  });
  const variant = data?.variant ?? "text_photo";

  // Simple guard if content missing
  if (!data?.heading) return null;

  return (
    <section id="hero" className="relative isolate overflow-hidden">
      {/* Subtle background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_80%_-10%,rgba(16,185,129,0.12),transparent_60%)]"
      />
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:py-32">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          {/* Text column */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
              {data.heading}
            </h1>
            <div className="max-w-2xl text-slate-300">
              <PT value={data.subheading as TypedObject | TypedObject[]} />
            </div>

            {data?.cta?.label && data?.cta?.href ? (
              <div>
                <a
                  href={data.cta.href}
                  className="inline-flex items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-emerald-200 hover:bg-emerald-500/20 transition"
                >
                  {data.cta.label}
                </a>
              </div>
            ) : null}
          </div>

          {/* Portrait column */}
          {variant === "text_photo" && data?.photoUrl ? (
            <div className="mx-auto w-44 sm:w-56 md:w-64 lg:w-72">
              <div className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-white/10">
                <Image
                  src={data.photoUrl}
                  alt="Portrait"
                  fill
                  sizes="(max-width:768px) 11rem, (max-width:1024px) 14rem, 18rem"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
