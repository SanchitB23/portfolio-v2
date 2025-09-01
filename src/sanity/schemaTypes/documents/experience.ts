// sanity/schema/documents/experience.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "company",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "companyUrl", type: "url" }),
    defineField({ name: "logo", type: "image" }),
    defineField({
      name: "role",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "startDate",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({ name: "endDate", type: "date" }),
    defineField({ name: "isCurrent", type: "boolean" }),
    defineField({
      name: "tech",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
    defineField({ name: "highlights", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "featured", type: "boolean" }),
  ],
});
