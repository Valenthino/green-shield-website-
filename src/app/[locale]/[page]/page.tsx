import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Website from "@/components/website";
import { copy, locales, type Locale, type Page } from "@/content/site";
import { pageAlternates, shareCard } from "@/lib/seo";

const subpages = ["about", "products", "gallery", "contact", "privacy", "terms"] as const;
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    subpages.map((page) => ({ locale, page })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}): Promise<Metadata> {
  const { locale, page } = await params;
  if (
    !locales.includes(locale as Locale) ||
    !subpages.includes(page as (typeof subpages)[number])
  )
    return {};
  return {
    alternates: pageAlternates(`/${locale}/${page}/`),
    ...shareCard(locale === "fr" ? "fr" : "en"),
    title: {
      absolute: `${copy[locale as Locale].nav[page as Page]} | BAOORE AgriTrade`,
    },
  };
}
export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { locale, page } = await params;
  if (
    !locales.includes(locale as Locale) ||
    !subpages.includes(page as (typeof subpages)[number])
  )
    notFound();
  return (
    <div lang={locale}>
      <Website locale={locale as Locale} page={page as Page} />
    </div>
  );
}
