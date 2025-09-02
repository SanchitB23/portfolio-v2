// sanity/schema/singletons/themeSettings.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "themeSettings",
  title: "Theme Settings",
  type: "document",
  fields: [
    defineField({
      name: "accent",
      type: "string",
      options: { list: ["emerald", "teal", "indigo", "blue"] },
      initialValue: "emerald",
    }),
    defineField({
      name: "featureFlags",
      type: "object",
      fields: [
        { name: "heroAnimatedText", type: "boolean", initialValue: false },
        {
          name: "enableTiltOnProjectCards",
          type: "boolean",
          initialValue: true,
        },
        { name: "useFancyPatternBg", type: "boolean", initialValue: true },
        {
          name: "outlineGlowOnProjectCards",
          type: "boolean",
          initialValue: false,
        },
      ],
    }),
  ],
});
