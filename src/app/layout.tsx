import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditing } from "next-sanity";
import { isLiveEditingEnabled, isVisualEditingEnabled } from "@/constants";
import { SanityLive } from "@/sanity/lib/live";
import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";

const SITE_QUERY = groq`*[_type=="siteSettings"][0]{ 
  title, 
  seo { metaTitleTemplate, metaDescription }, 
  "og": defaultOgImage.asset->url 
}`;

export async function generateMetadata() {
  const s = (await sanityFetch({
    query: SITE_QUERY,
    tags: ["siteSettings"],
  })) as {
    title?: string;
    seo?: { metaTitleTemplate?: string; metaDescription?: string };
    og?: string;
  };

  return {
    title: {
      default: s?.title ?? "Sanchit Bhatnagar",
      template: s?.seo?.metaTitleTemplate ?? "%s — Sanchit Bhatnagar",
    },
    description:
      s?.seo?.metaDescription ??
      "Full-stack engineer (React/Next, Node, GraphQL).",
    openGraph: {
      title: s?.title,
      description: s?.seo?.metaDescription,
      images: s?.og ? [{ url: s.og, width: 1200, height: 630 }] : [],
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  };
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {isVisualEditingEnabled ? <VisualEditing /> : null}
        {isLiveEditingEnabled ? <SanityLive /> : null}
      </body>
    </html>
  );
}
