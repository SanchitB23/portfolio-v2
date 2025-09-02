"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {
  apiVersion,
  dataset,
  projectId,
  // sanityViewerToken,
  siteUrl,
} from "./src/constants";
import { schema } from "./src/sanity/schemaTypes";
import { SINGLETON_TYPES, structure } from "./src/sanity/structure";
import { presentationTool } from "sanity/presentation";
import { assist } from "@sanity/assist";

export default defineConfig({
  basePath: "/admin/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    // Presentation/Visual Editing — keep but we’ll gate usage via env
    presentationTool({
      previewUrl: {
        origin: siteUrl, // your site origin
      },
    }),
  ],
  // token: sanityViewerToken, // A token with read access
  stega: {
    studioUrl: "/studio",
  },
  // OFFICIAL knobs for singleton UX
  document: {
    /**
     * Hide singleton types from the global "Create new" menu.
     * (Users can still create the single doc by opening its Structure item.)
     */
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((tpl) => !SINGLETON_TYPES.includes(tpl.templateId));
      }
      return prev;
    },

    /**
     * Limit actions available on singleton documents.
     * Keep Publish/Unpublish/Discard; remove Duplicate/Delete etc.
     */
    actions: (prev, { schemaType }) => {
      if (!SINGLETON_TYPES.includes(schemaType)) return prev;
      return prev.filter((action) =>
        ["publish", "unpublish", "discardChanges"].includes(action.action ?? "")
      );
    },
  },
});
