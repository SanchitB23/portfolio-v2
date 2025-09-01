// sanity/schema/singletons/siteSettings.ts
import { defineField, defineType } from "sanity";
export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", type: "string" }),
    defineField({
      name: "favicon",
      type: "image",
      options: { storeOriginalFilename: false },
    }),
    defineField({ name: "defaultOgImage", type: "image" }),
    defineField({
      name: "seo",
      type: "object",
      fields: [
        { name: "metaTitleTemplate", type: "string" },
        { name: "metaDescription", type: "text" },
        { name: "twitterHandle", type: "string" },
      ],
    }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    }),
  ],
});
