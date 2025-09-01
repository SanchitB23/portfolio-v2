// sanity/schema/documents/project.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "cover", type: "image", options: { hotspot: true } }), // or file if you prefer video/gif
    defineField({ name: "gallery", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "shortDesc", type: "text" }),
    defineField({ name: "longDesc", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "tech",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
    defineField({
      name: "links",
      type: "object",
      fields: [
        { name: "github", type: "url" },
        { name: "live", type: "url" },
        { name: "caseStudy", type: "url" },
      ],
    }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({ name: "priority", type: "number" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["active", "wip", "archived"] },
    }),
    defineField({ name: "year", type: "number" }),
  ],
});
