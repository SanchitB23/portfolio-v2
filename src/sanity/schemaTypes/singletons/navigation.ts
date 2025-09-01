// sanity/schema/singletons/navigation.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", validation: (r) => r.required() },
            {
              name: "href",
              type: "string",
              description: "/path or #anchor",
              validation: (r) => r.required(),
            },
            {
              name: "kind",
              type: "string",
              options: { list: ["anchor", "internal", "external"] },
            },
          ],
        },
      ],
    }),
  ],
});
