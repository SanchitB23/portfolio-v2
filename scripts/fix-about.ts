// scripts/fix-about.ts
import { getCliClient } from "sanity/cli";
const client = getCliClient({ apiVersion: "2025-01-01" });

// Correct Portable Text content
const correctBody = [
  {
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        text: "I’m a full-stack engineer who enjoys the intersection of product, performance, and polish. At Yum! Brands, I’ve contributed to AI-powered initiatives, scalable GraphQL backends, and React/Next frontends that feel fast and intentional.",
        marks: [],
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
        marks: [],
      },
    ],
  },
];

// Tag ids we want (ensure these docs exist first)
const tagIds = [
  "tag.react",
  "tag.nextjs",
  "tag.typescript",
  "tag.node",
  "tag.graphql",
  "tag.express",
  "tag.tailwind",
  "tag.shadcn",
  "tag.postgresql",
  "tag.redis",
  "tag.aws",
  "tag.vercel",
  "tag.system-design",
  "tag.performance",
];

async function run() {
  // 0) Make sure tags exist
  const existing = await client.fetch<string[]>(
    `*[_type=="tag" && _id in $ids][]._id`,
    { ids: tagIds }
  );
  const missing = tagIds.filter((id) => !existing.includes(id));
  if (missing.length) {
    throw new Error(
      `Missing tag docs: ${missing.join(", ")}. Seed tags first, then rerun.`
    );
  }

  // 1) Patch 'about' with correct PT + references
  await client
    .patch("about") // singleton documentId
    .set({
      body: correctBody,
      skills: tagIds.map((_id) => ({ _type: "reference", _ref: _id })),
    })
    .commit();

  console.log("✅ Fixed `about` body and skills.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
