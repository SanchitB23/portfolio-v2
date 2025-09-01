// sanity/schema/documents/tag.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "tag",
  title: "Tag/Tech",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "icon", type: "string" }),
  ],
});
