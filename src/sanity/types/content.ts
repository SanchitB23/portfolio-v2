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

export type TTagRef = {
  _id: string;
  name: string;
  slug?: { current?: string };
};

export type TProject = {
  _id: string;
  title?: string;
  slug?: string;
  shortDesc?: string;
  longDesc?: TypedObject | TypedObject[];
  featured?: boolean;
  priority?: number;
  status?: "draft" | "published" | "archived";
  date?: string | null;
  tech?: TTagRef[];
  links?: { github?: string; live?: string; caseStudy?: string };
  coverUrl?: string;
};
export type TProjectResult = { total: number; items: TProject[] };

export type TProjectFacets = {
  tags: TTagRef[];
  yearsRaw: string[];
};

export type TThemeFlags = { featureFlags?: Record<string, boolean> };

export type TSearchParamsShape = {
  q?: string;
  tag?: string; // tag slug
  year?: string; // e.g., "2024"
  page?: string; // 1-based
};
