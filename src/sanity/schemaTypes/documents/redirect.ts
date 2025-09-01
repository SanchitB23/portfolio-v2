// sanity/schema/documents/redirect.ts (optional)
import { defineType, defineField } from "sanity";
export default defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "from",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "to",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      options: { list: ["permanent", "temporary"] },
      initialValue: "permanent",
    }),
    defineField({ name: "enabled", type: "boolean", initialValue: true }),
  ],
});
