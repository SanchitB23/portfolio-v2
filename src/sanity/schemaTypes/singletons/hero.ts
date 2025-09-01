// sanity/schema/singletons/hero.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    defineField({
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Text + Portrait", value: "text_photo" },
          { title: "Split (Text | Image)", value: "split" },
          { title: "Media Background", value: "media_bg" },
        ],
      },
      initialValue: "text_photo",
    }),
    defineField({
      name: "heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "subheading", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cta",
      type: "object",
      fields: [
        { name: "label", type: "string" },
        { name: "href", type: "string" },
      ],
    }),
    defineField({
      name: "media",
      type: "url",
      description: "Optional image/video URL when using media_bg variant",
    }),
  ],
});
