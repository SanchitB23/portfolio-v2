import { TypedObject } from "sanity";

// types/content.ts
export type THeroData = {
  variant?: "text_photo" | "split" | "media_bg";
  heading?: string;
  subheading: TypedObject | TypedObject[]; // Portable Text
  cta?: { label?: string; href?: string };
  photoUrl?: string;
};

export type TAboutData = {
  body: TypedObject | TypedObject[];
  skills: TSkill[];
};

export type TSkill = {
  _id: string;
  name: string;
  slug: { current: string };
  icon?: string;
};
