import { defineType, defineField } from "sanity";

export default defineType({
  name: "resumeSettings",
  title: "Resume Settings",
  type: "document",
  fields: [
    defineField({
      name: "lastUpdated",
      type: "date",
      options: { dateFormat: "MMMM D, YYYY" },
      initialValue: new Date().toISOString().split("T")[0],
    }),
    defineField({ name: "file", type: "file" }),
    defineField({ name: "note", type: "text" }),
  ],
});
