import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Website from "@/components/website";
import { locales, type Locale } from "@/content/site";
import { pageAlternates, shareCard } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: pageAlternates(`/${locale}/`),
    ...shareCard(locale === "fr" ? "fr" : "en"),
    title: {
      absolute:
        locale === "fr"
          ? "BAOORE AgriTrade | Café, cacao et anacarde"
          : "BAOORE AgriTrade | Coffee, cocoa & cashew trading",
    },
  };
}
export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return (
    <div lang={locale}>
      <Website locale={locale as Locale} page="home" />
    </div>
  );
}
