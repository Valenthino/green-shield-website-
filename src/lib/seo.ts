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

/** Link preview (WhatsApp, LinkedIn, Facebook): the BAOORE logo card in the page's language. */
export function shareCard(locale: "en" | "fr"): Pick<Metadata, "openGraph" | "twitter"> {
  const image = {
    url: `/brand/og-image-${locale}.png`,
    width: 1200,
    height: 630,
    alt: "BAOORE AgriTrade",
  };
  return {
    openGraph: {
      type: "website",
      siteName: "BAOORE AgriTrade",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image.url] },
  };
}
