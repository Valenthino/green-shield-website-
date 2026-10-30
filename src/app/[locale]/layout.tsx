import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/content/site";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Green Shield | Coffee, cocoa & cashew trading — website preview",
    template: "%s | Green Shield",
  },
  description:
    "Green Shield — coffee, cocoa & cashew / café, cacao et anacarde. Website preview / aperçu du site.",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = { themeColor: "#2d3b2e" };
export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
