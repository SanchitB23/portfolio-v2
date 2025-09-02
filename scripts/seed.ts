// scripts/seed.ts
import { getCliClient } from "sanity/cli";
const client = getCliClient({ apiVersion: "2025-01-01" });

// --- 1) TAGS FIRST (these _ids must exist before refs point to them) ---
const tagDocs = [
  { _id: "tag.react", _type: "tag", name: "React", slug: { current: "react" } },
  {
    _id: "tag.nextjs",
    _type: "tag",
    name: "Next.js",
    slug: { current: "nextjs" },
  },
  {
    _id: "tag.typescript",
    _type: "tag",
    name: "TypeScript",
    slug: { current: "typescript" },
  },
  { _id: "tag.node", _type: "tag", name: "Node.js", slug: { current: "node" } },
  {
    _id: "tag.graphql",
    _type: "tag",
    name: "GraphQL",
    slug: { current: "graphql" },
  },
  {
    _id: "tag.express",
    _type: "tag",
    name: "Express.js",
    slug: { current: "express" },
  },
  {
    _id: "tag.tailwind",
    _type: "tag",
    name: "Tailwind CSS",
    slug: { current: "tailwind" },
  },
  {
    _id: "tag.shadcn",
    _type: "tag",
    name: "shadcn/ui",
    slug: { current: "shadcn" },
  },
  {
    _id: "tag.postgresql",
    _type: "tag",
    name: "PostgreSQL",
    slug: { current: "postgresql" },
  },
  { _id: "tag.redis", _type: "tag", name: "Redis", slug: { current: "redis" } },
  { _id: "tag.aws", _type: "tag", name: "AWS", slug: { current: "aws" } },
  {
    _id: "tag.vercel",
    _type: "tag",
    name: "Vercel",
    slug: { current: "vercel" },
  },
  {
    _id: "tag.system-design",
    _type: "tag",
    name: "System Design",
    slug: { current: "system-design" },
  },
  {
    _id: "tag.performance",
    _type: "tag",
    name: "Performance",
    slug: { current: "performance" },
  },
];

// --- 2) EVERYTHING ELSE (refs now resolve) ---
const otherDocs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Sanchit Bhatnagar — Software Engineer",
    tagline:
      "Full-stack engineer building fast, maintainable web apps with React/Next and GraphQL.",
    seo: {
      metaTitleTemplate: "%s — Sanchit Bhatnagar",
      metaDescription:
        "Software Engineer (5+ YOE) focused on React/Next.js, Node.js & GraphQL. At Yum! Brands, I design and ship performant, maintainable products with polished UX.",
      twitterHandle: "@sanchitb23",
    },
    socials: [
      { label: "GitHub", url: "https://github.com/SanchitB23" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/sanchitb23" },
      { label: "X", url: "https://x.com/sanchitb23" },
      { label: "Email", url: "mailto:hello@sanchitb23.in" },
    ],
  },
  {
    _id: "navigation",
    _type: "navigation",
    items: [
      { label: "Home", href: "#hero", kind: "anchor", enabled: true },
      {
        label: "Experience",
        href: "#experience",
        kind: "anchor",
        enabled: true,
      },
      { label: "Projects", href: "/projects", kind: "internal", enabled: true },
      { label: "Resume", href: "/resume", kind: "internal", enabled: true },
      { label: "Contact", href: "#contact", kind: "anchor", enabled: true },
      { label: "Now", href: "/now", kind: "internal", enabled: false },
      { label: "Uses", href: "/uses", kind: "internal", enabled: false },
    ],
  },
  {
    _id: "themeSettings",
    _type: "themeSettings",
    accent: "emerald",
    featureFlags: {
      heroAnimatedText: false,
      enableTiltOnProjectCards: true,
      useFancyPatternBg: true,
      outlineGlowOnProjectCards: true,
    },
  },
  {
    _id: "hero",
    _type: "hero",
    variant: "text_photo",
    heading: "Hi, I’m Sanchit — I ship fast, reliable web apps.",
    subheading: [
      {
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            text: "Software Engineer at Yum! Brands (5+ years). I work across React/Next.js, Node.js, and GraphQL—turning fuzzy ideas into clean, production-ready systems that balance DX, UX, and business impact.",
          },
        ],
      },
    ],
    cta: { label: "See my work", href: "/projects" },
  },
  {
    _id: "about",
    _type: "about",
    body: [
      {
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            text: "I’m a full-stack engineer who enjoys the intersection of product, performance, and polish. At Yum! Brands, I’ve contributed to AI-powered initiatives, scalable GraphQL backends, and React/Next frontends that feel fast and intentional.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            text: "I like clean architectures, measurable performance wins, and UI details that quietly delight. I optimize for systems that are easy to evolve, observability that tells the truth, and code future-me won’t hate.",
          },
        ],
      },
    ],
    skills: [
      { _type: "reference", _ref: "tag.react" },
      { _type: "reference", _ref: "tag.nextjs" },
      { _type: "reference", _ref: "tag.typescript" },
      { _type: "reference", _ref: "tag.node" },
      { _type: "reference", _ref: "tag.graphql" },
      { _type: "reference", _ref: "tag.express" },
      { _type: "reference", _ref: "tag.tailwind" },
      { _type: "reference", _ref: "tag.shadcn" },
      { _type: "reference", _ref: "tag.postgresql" },
      { _type: "reference", _ref: "tag.redis" },
      { _type: "reference", _ref: "tag.aws" },
      { _type: "reference", _ref: "tag.vercel" },
      { _type: "reference", _ref: "tag.system-design" },
      { _type: "reference", _ref: "tag.performance" },
    ],
  },
  { _id: "resume", _type: "resume", updatedAt: "2025-09-02" },
  {
    _id: "contact",
    _type: "contact",
    ctaTitle: "Let’s build something useful.",
    ctaBody: [
      {
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            text: "Whether it’s shipping a new feature, shaping a system, or improving performance—I’m up for it. The best messages include a problem worth solving and a hint of constraints.",
          },
        ],
      },
    ],
    email: "hello@sanchitb23.in",
    phone: "",
    formCopy: {
      successMsg: "Thanks! I’ll get back within 24–48 hours.",
      errorMsg:
        "Something went wrong. Please try again or email me at hello@sanchitb23.in.",
    },
  },
  {
    _type: "redirect",
    _id: "redir.resume",
    from: "/resume",
    to: "/resume.pdf",
    type: "permanent",
    enabled: true,
  },
  {
    _type: "redirect",
    _id: "redir.github",
    from: "/github",
    to: "https://github.com/SanchitB23",
    type: "temporary",
    enabled: true,
  },
  {
    _type: "redirect",
    _id: "redir.x",
    from: "/x",
    to: "https://x.com/sanchitb23",
    type: "temporary",
    enabled: true,
  },
  {
    _type: "redirect",
    _id: "redir.linkedin",
    from: "/linkedin",
    to: "https://linkedin.com/in/sanchitb23",
    type: "temporary",
    enabled: true,
  },
];

async function run() {
  // 1) ensure tag docs exist
  let tx = client.transaction();
  for (const d of tagDocs) tx = tx.createIfNotExists(d);
  await tx.commit();

  // 2) then upsert everything else
  let tx2 = client.transaction();
  for (const d of otherDocs) tx2 = tx2.createOrReplace(d);
  await tx2.commit();

  console.log("Seed complete.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
