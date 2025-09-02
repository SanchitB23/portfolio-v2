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

type TSkill = {
  _id: string;
  name: string;
  slug: { current: string };
  icon?: string;
};

type Tag = { _id: string; name: string; slug?: { current: string } };

export type TExperience = {
  _id: string;
  company?: string;
  companyUrl?: string;
  role?: string;
  location?: string;
  startDate?: string;
  endDate?: string | null;
  isCurrent?: boolean;
  featured?: boolean;
  tech?: Tag[];
  highlights: TypedObject | TypedObject[];
  logoUrl?: string;
};
