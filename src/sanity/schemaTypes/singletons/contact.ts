// sanity/schema/singletons/contact.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({ name: "ctaTitle", type: "string" }),
    defineField({ name: "ctaBody", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({
      name: "formCopy",
      type: "object",
      fields: [
        {
          name: "successMsg",
          type: "string",
          initialValue: "Thanks! I’ll get back to you soon.",
        },
        {
          name: "errorMsg",
          type: "string",
          initialValue: "Something went wrong. Please try again.",
        },
      ],
    }),
  ],
});
