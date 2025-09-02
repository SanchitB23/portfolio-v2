// lib/queries.ts
import { groq } from "next-sanity";

export const HERO_QUERY = groq`*[_type=="hero"][0]{
  variant,
  heading,
  subheading,
  cta { label, href },
  "photoUrl": photo.asset->url
}`;

export const ABOUT_QUERY = groq`*[_type=="about"][0]{
  body,
  "skills": skills[defined(@._ref)]->{ _id, name, slug, icon }
}`;
