// scripts/seed-experience.ts
import { getCliClient } from "sanity/cli";
const client = getCliClient({ apiVersion: "2025-01-01" });

async function run() {
  await client.createIfNotExists({
    _id: "exp.yum",
    _type: "experience",
    company: "Yum! Brands",
    companyUrl: "https://www.yum.com",
    role: "Software Engineer 3",
    location: "Gurugram, India (Hybrid)",
    startDate: "2022-01-01",
    isCurrent: true,
    featured: true,
    tech: [
      { _type: "reference", _ref: "tag.react" },
      { _type: "reference", _ref: "tag.nextjs" },
      { _type: "reference", _ref: "tag.typescript" },
      { _type: "reference", _ref: "tag.graphql" },
      { _type: "reference", _ref: "tag.node" },
      { _type: "reference", _ref: "tag.vercel" },
    ],
    highlights: [
      {
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            text: "Led Next.js 15 migration and app-router adoption; improved TTI by ~35% and simplified data fetching via RSC.",
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
            text: "Designed GraphQL APIs for AI-powered features; reduced over-fetching and cut p95 latency by ~25%.",
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
            text: "Introduced caching and image pipeline optimizations; dropped payload by ~40% on high-traffic pages.",
          },
        ],
      },
    ],
  });
  console.log("Seeded example experience.");
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
