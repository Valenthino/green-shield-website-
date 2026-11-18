import type { Metadata } from "next";

/** The address search engines should show for this site. */
export const SITE_URL = "https://baooreagritrade.com";

/** Canonical and language alternates for a path that exists in both languages. */
export function pageAlternates(path: string): Metadata["alternates"] {
  return {
    canonical: path,
    languages: {
      en: path.replace(/^\/(en|fr)\//, "/en/"),
      fr: path.replace(/^\/(en|fr)\//, "/fr/"),
      "x-default": path.replace(/^\/(en|fr)\//, "/en/"),
    },
  };
}
