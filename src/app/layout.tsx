import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { siteConfig } from "@/config/site";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const body = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · Food safety records for busy UK kitchens`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: siteConfig.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: siteConfig.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d110f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-herb-400 px-5 py-3 font-semibold text-forest-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
