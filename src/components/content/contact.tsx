import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_SETTINGS_QUERY } from "@/sanity/lib/queries";
import {
  SanityResponse,
  TContactSettings,
  TContactSettingsChannel,
} from "@/sanity/types/content";

export default async function Contact() {
  const { data: c }: SanityResponse<TContactSettings> = await sanityFetch({
    query: CONTACT_SETTINGS_QUERY,
    tags: ["contactSettings"],
  });

  if (!c) return null;

  return (
    <section id="contact" className="bg-slate-950 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl">
          {c.headline ?? "Let’s talk"}
        </h2>
        {c.subhead && <p className="mt-3 text-slate-300">{c.subhead}</p>}

        <div className="mt-8">
          <Link
            href={`mailto:${c.email ?? "hello@sanchitb23.in"}`}
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-emerald-300 hover:bg-emerald-500/20"
          >
            Email me
          </Link>
        </div>

        {c.channels?.length ? (
          <div className="mt-6 flex justify-center gap-4 text-sm">
            {c.channels.map((ch: TContactSettingsChannel, i: number) => (
              <Link
                key={i}
                href={ch.href}
                target="_blank"
                className="text-slate-300 hover:text-emerald-300"
              >
                {ch.label} →
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
