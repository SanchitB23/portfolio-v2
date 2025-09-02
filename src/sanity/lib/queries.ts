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
  tech[defined(@._ref)]-> { _id, name, slug },
  highlights,               // Portable Text (or array of strings if you ever want)
  "logoUrl": logo.asset->url
}`;

/**
 * All Projects page:
 * - optional filters: $q (search), $tagSlug, $year
 * - pagination: $limit, $offset
 * - sorts: featured desc, date desc, _updatedAt desc
 */

export const PROJECTS_QUERY = groq`
{
  "total": count(*[_type=="project"
    && (!defined($q) || title match $q || shortDesc match $q)
    && (!defined($tagSlug) || $tagSlug in tech[]->slug.current)
    && (!defined($year) || (
      dateTime(date) >= dateTime(string($year) + "-01-01") &&
      dateTime(date) <  dateTime(string($nextYear) + "-01-01")
    ))
  ]),
  "items": *[_type=="project"
    && (!defined($q) || title match $q || shortDesc match $q)
    && (!defined($tagSlug) || $tagSlug in tech[]->slug.current)
    && (!defined($year) || (
      dateTime(date) >= dateTime(string($year) + "-01-01") &&
      dateTime(date) <  dateTime(string($year + 1) + "-01-01")
    ))
  ] | order(featured desc, coalesce(priority, 9999) asc, coalesce(date, _updatedAt) desc, _updatedAt desc)
    [$offset...$end]{
      _id,
      title,
      "slug": slug.current,
      shortDesc,
      longDesc,
      featured,
      priority,
      status,
      date,
      tech[defined(@._ref)]->{ _id, name, slug },
      links{ github, live, caseStudy },
      "coverUrl": cover.asset->url
    }
}
`;

export const PROJECT_FACETS_QUERY = groq`
{
  "tags": *[_type=="tag" && count(*[_type=="project" && references(^._id)]) > 0]{
    _id, name, "slug": slug.current
  } | order(name asc),
  "yearsRaw": *[_type=="project" && defined(date)].date
}
`;

/** Theme flags used for card effects */
export const THEME_FLAGS_QUERY = groq`*[_type=="themeSettings"][0]{
  featureFlags
}`;

export const FEATURED_PROJECTS_QUERY = groq`
*[_type=="project" && featured == true]
| order(coalesce(priority, 9999) asc, coalesce(date, _updatedAt) desc, _updatedAt desc)[0...6]{
  _id,
  title,
  "slug": slug.current,
  shortDesc,
  date,
  tech[]->{ _id, name, slug },
  links{ github, live, caseStudy },
  "coverUrl": cover.asset->url
}
`;

export const CONTACT_SETTINGS_QUERY = groq`*[_type=="contactSettings"][0]{
  headline, subhead, email, successCopy, errorCopy, channels
}`;
