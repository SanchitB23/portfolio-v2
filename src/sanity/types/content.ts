// types/content.ts
export type HeroData = {
  variant?: "text_photo" | "split" | "media_bg";
  heading?: string;
  subheading?: unknown; // Portable Text
  cta?: { label?: string; href?: string };
  photoUrl?: string;
};
