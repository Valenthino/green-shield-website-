import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Website from "@/components/website";
import { copy, locales, type Locale, type Page } from "@/content/site";

const subpages = ["about", "cocoa", "contact"] as const;
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
    title: {
      absolute: `${copy[locale as Locale].nav[page as Page]} | Green Shield`,
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
