import type { StructureBuilder, StructureResolver } from "sanity/structure";
// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const SINGLETON_TYPES = [
  "siteSettings",
  "navigation",
  "themeSettings",
  "hero",
  "about",
  "resume",
  "contact",
];

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Explicit singleton entries (fixed documentId)
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Navigation")
        .child(S.document().schemaType("navigation").documentId("navigation")),
      S.listItem()
        .title("Theme Settings")
        .child(
          S.document().schemaType("themeSettings").documentId("themeSettings")
        ),
      S.listItem()
        .title("Hero")
        .child(S.document().schemaType("hero").documentId("hero")),
      S.listItem()
        .title("About")
        .child(S.document().schemaType("about").documentId("about")),
      S.listItem()
        .title("Resume")
        .child(S.document().schemaType("resume").documentId("resume")),
      S.listItem()
        .title("Contact")
        .child(S.document().schemaType("contact").documentId("contact")),

      S.divider(),

      // All non-singleton document types
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.includes(listItem.getId?.() ?? "")
      ),
    ]);
