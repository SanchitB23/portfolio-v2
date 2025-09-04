import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_SETTINGS_QUERY } from "@/sanity/lib/queries";
import {
  TSanityResponse,
  TContactSettings,
  TContactSettingsChannel,
} from "@/sanity/types/content";

export default async function Contact() {
  const { data: c }: TSanityResponse<TContactSettings> = await sanityFetch({
    query: CONTACT_SETTINGS_QUERY,
    tags: ["contactSettings"],
  });

  if (!c) return null;

  return (
    <section id="contact" className="bg-bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-primary-400 sm:text-4xl">
          {c.headline}
        </h2>
        {c.subhead && <p className="mt-3 text-text-secondary">{c.subhead}</p>}

        <div className="mt-8">
          <Link
            href={`mailto:${c.email ?? "hello@sanchitb23.in"}`}
            className="rounded-xl border border-border-accent bg-primary-100 px-5 py-3 text-text-accent hover:bg-primary-200"
          >
            Email me
          </Link>
        </div>

        {c.channels?.length ? (
          <div className="mt-6 flex justify-center gap-4 text-sm">
            {c.channels.map((ch: TContactSettingsChannel, i: number) => (
              <a
                key={i}
                href={ch.href}
                target="_blank"
                className="text-text-secondary hover:text-text-accent"
                rel="noopener noreferrer"
              >
                {ch.label} →
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
