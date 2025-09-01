// sanity/schema/singletons/about.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "skills",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
  ],
});
