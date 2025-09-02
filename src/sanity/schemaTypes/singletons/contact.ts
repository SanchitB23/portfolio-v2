import { defineType, defineField } from "sanity";
export default defineType({
  name: "contactSettings",
  title: "Contact Settings",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      type: "string",
      initialValue: "Let’s talk",
    }),
    defineField({ name: "subhead", type: "text" }),
    defineField({ name: "email", type: "string" }), // hello@sanchitb23.in
    defineField({
      name: "successCopy",
      type: "text",
      initialValue: "Thanks! I’ll get back to you soon.",
    }),
    defineField({
      name: "errorCopy",
      type: "text",
      initialValue: "Something went wrong. Try again later or email me.",
    }),
    defineField({
      name: "channels",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            {
              name: "href",
              type: "string",
              validation: (Rule) =>
                Rule.required().custom((value) => {
                  if (typeof value !== "string") return "Must be a string";
                  // Regex for http(s) URLs
                  const urlPattern =
                    /^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=.]+$/i;
                  // Regex for mailto links
                  const mailtoPattern =
                    /^mailto:([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/;
                  if (urlPattern.test(value) || mailtoPattern.test(value)) {
                    return true;
                  }
                  return "Must be a valid http(s) URL or mailto link";
                }),
            },
          ],
        },
      ],
    }),
  ],
});
