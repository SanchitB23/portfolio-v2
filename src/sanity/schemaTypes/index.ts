import { type SchemaTypeDefinition } from "sanity";

import siteSettings from "./singletons/siteSettings";
import navigation from "./singletons/navigation";
import themeSettings from "./singletons/themeSettings";
import hero from "./singletons/hero";
import about from "./singletons/about";
import resume from "./singletons/resume";
import contact from "./singletons/contact";
import tag from "./documents/tag";
import experience from "./documents/experience";
import project from "./documents/project";
import redirect from "./documents/redirect"; // optional

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    navigation,
    themeSettings,
    hero,
    about,
    resume,
    contact,
    tag,
    experience,
    project,
    redirect,
  ],
};
