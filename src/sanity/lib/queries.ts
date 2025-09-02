// lib/queries.ts
import { groq } from "next-sanity";

export const HERO_QUERY = groq`*[_type=="hero"][0]{
  variant,
  heading,
  subheading,
  cta { label, href },
  "photoUrl": photo.asset->url
}`;
