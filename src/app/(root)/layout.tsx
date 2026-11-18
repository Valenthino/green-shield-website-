import type { Metadata, Viewport } from "next";
import { SITE_URL, pageAlternates } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BAOORE AgriTrade | Coffee, cocoa & cashew trading",
    template: "%s | BAOORE AgriTrade",
  },
  description:
    "BAOORE AgriTrade (African Origins. Global Trade.): a coffee, cocoa and cashew trading business introduction. A personal approach to agricultural trade in West Africa.",
  robots: { index: true, follow: true },
  alternates: { ...pageAlternates("/en/"), canonical: "/en/" },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = { themeColor: "#2d3b2e" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
