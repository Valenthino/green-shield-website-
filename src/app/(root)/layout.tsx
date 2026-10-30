import type { Metadata, Viewport } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Green Shield | Coffee, cocoa & cashew trading",
    template: "%s | Green Shield",
  },
  description:
    "Green Shield: a coffee, cocoa and cashew trading business introduction. A personal approach to agricultural trade in West Africa.",
  robots: { index: false, follow: false },
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
