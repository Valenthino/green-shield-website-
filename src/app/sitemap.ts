import type { MetadataRoute } from "next";
import { locales } from "@/content/site";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const paths = ["", "about/", "products/", "contact/", "privacy/", "terms/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}/${path}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((other) => [other, `${SITE_URL}/${other}/${path}`]),
        ),
      },
    })),
  );
}
