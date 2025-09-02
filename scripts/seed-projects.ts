// scripts/seed-projects-verify.ts
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

const p = (text: string) => ({
  _type: "block" as const,
  style: "normal",
  markDefs: [],
  children: [{ _type: "span" as const, text, marks: [] }],
});

async function run() {
  const cfg = client.config();
  console.log("Using project/dataset:", {
    projectId: cfg.projectId,
    dataset: cfg.dataset,
  });

  // 0) quick sanity read
  const beforeCount = await client.fetch<number>(`count(*[_type=="project"])`);
  console.log("Existing project count BEFORE:", beforeCount);

  // 1) verify tags exist
  const tagIds = [
    "tag.nextjs",
    "tag.react",
    "tag.typescript",
    "tag.tailwind",
    "tag.shadcn",
    "tag.vercel",
    "tag.graphql",
    "tag.node",
    "tag.aws",
    "tag.postgresql",
    "tag.redis",
  ];
  const existing = await client.fetch<string[]>(
    `*[_type=="tag" && _id in $ids][]._id`,
    { ids: tagIds }
  );
  const missing = tagIds.filter((id) => !existing.includes(id));
  if (missing.length) {
    throw new Error(
      `Missing tag docs: ${missing.join(", ")} — seed tags first then rerun.`
    );
  }

  // 2) docs — EXACTLY your schema fields
  const docs = [
    {
      _id: "proj.portfolio-v2",
      _type: "project",
      title: "Personal Portfolio v2",
      slug: { current: "portfolio-v2" },
      cover: undefined,
      gallery: [],
      shortDesc:
        "Modern developer portfolio built with Next.js 15, Sanity, Tailwind, and shadcn/ui.",
      longDesc: [
        p("Static pages + tag-based revalidation via Sanity."),
        p("Focus on performance, a11y, and polished interactions."),
      ],
      tech: [
        { _type: "reference", _ref: "tag.nextjs" },
        { _type: "reference", _ref: "tag.react" },
        { _type: "reference", _ref: "tag.typescript" },
        { _type: "reference", _ref: "tag.tailwind" },
        { _type: "reference", _ref: "tag.shadcn" },
        { _type: "reference", _ref: "tag.vercel" },
      ],
      links: {
        github: "https://github.com/SanchitB23/portfolio-v2",
        live: "https://www.sanchitb23.in",
        caseStudy: undefined,
      },
      featured: true,
      priority: 1,
      status: "active",
      date: "2025-08-01", // Month+Year
    },
    {
      _id: "proj.ai-recommender",
      _type: "project",
      title: "AI-powered Menu Recommender",
      slug: { current: "ai-menu-recommender" },
      cover: undefined,
      gallery: [],
      shortDesc:
        "Prototype to personalize menu suggestions from behavior signals.",
      longDesc: [
        p("GraphQL + Node.js with batching and cache-aware resolvers."),
        p("Reduced p95 via connection pooling and selective hydration."),
      ],
      tech: [
        { _type: "reference", _ref: "tag.graphql" },
        { _type: "reference", _ref: "tag.node" },
        { _type: "reference", _ref: "tag.typescript" },
        { _type: "reference", _ref: "tag.aws" },
      ],
      links: {
        github: "https://github.com/SanchitB23/yum-ai-prototype",
        live: undefined,
        caseStudy: undefined,
      },
      featured: true,
      priority: 2,
      status: "wip",
      date: "2024-12-01",
    },
    {
      _id: "proj.analytics-dashboard-redesign",
      _type: "project",
      title: "Analytics Dashboard Redesign",
      slug: { current: "analytics-dashboard-redesign" },
      cover: undefined,
      gallery: [],
      shortDesc:
        "Modernized internal analytics dashboard (faster loads, clearer IA).",
      longDesc: [
        p("Migrated to app router; split critical vs non-critical data paths."),
        p("Server components reduced client JS, improved TTI."),
      ],
      tech: [
        { _type: "reference", _ref: "tag.react" },
        { _type: "reference", _ref: "tag.nextjs" },
        { _type: "reference", _ref: "tag.postgresql" },
        { _type: "reference", _ref: "tag.redis" },
      ],
      links: {
        live: "https://demo-dashboard.example.com",
        github: undefined,
        caseStudy: undefined,
      },
      featured: false,
      priority: 5,
      status: "archived",
      date: "2023-11-01",
    },
  ];

  let tx = client.transaction();
  for (const d of docs) tx = tx.createOrReplace(d);
  const commit = await tx.commit();
  console.log("Committed mutations:", commit?.transactionId);

  // 3) roundtrip read by IDs
  const roundtrip = await client.fetch(
    `*[_id in $ids]{ _id, _type, title, slug, date, featured, status } | order(title asc)`,
    { ids: docs.map((d) => d._id) }
  );
  console.log("Read-back (by _id):", roundtrip);

  // 4) show latest 5 projects in this dataset
  const latest = await client.fetch(
    `*[_type=="project"] | order(_updatedAt desc)[0...5]{ _id, title, _updatedAt }`
  );
  console.log("Latest projects in this dataset:", latest);

  const afterCount = await client.fetch<number>(`count(*[_type=="project"])`);
  console.log("Existing project count AFTER:", afterCount);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
