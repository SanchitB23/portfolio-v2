// sanity/schema/singletons/resume.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  fields: [
    defineField({ name: "pdf", type: "file", validation: (r) => r.required() }),
    defineField({ name: "updatedAt", type: "date" }),
  ],
});
