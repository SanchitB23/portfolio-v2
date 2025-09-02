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

export const EXPERIENCE_QUERY = groq`*[_type=="experience"] 
| order(isCurrent desc, coalesce(endDate, now()) desc, startDate desc) {
  _id,
  company,
  companyUrl,
  role,
  location,
  startDate,
  endDate,
  isCurrent,
  featured,
  tech[]-> { _id, name, slug },
  highlights,               // Portable Text (or array of strings if you ever want)
  "logoUrl": logo.asset->url
}`;
