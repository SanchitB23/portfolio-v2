import type { StructureBuilder, StructureResolver } from "sanity/structure";
// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const SINGLETON_TYPES = [
  "siteSettings",
  "navigation",
  "themeSettings",
  "hero",
  "about",
  "resumeSettings",
  "contactSettings",
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
        .title("Resume Settings")
        .child(
          S.document().schemaType("resumeSettings").documentId("resumeSettings")
        ),
      S.listItem()
        .title("Contact Settings")
        .child(
          S.document()
            .schemaType("contactSettings")
            .documentId("contactSettings")
        ),
      S.divider(),

      // All non-singleton document types
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.includes(listItem.getId?.() ?? "")
      ),
    ]);
