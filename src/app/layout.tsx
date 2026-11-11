import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site/site-footer";
import { ReleaseNotice } from "@/components/site/release-notice";
import { SiteHeader } from "@/components/site/site-header";
import { siteConfig } from "@/config/site";
import "./globals.css";

// The app's typeface (DESIGN_SYSTEM.md §3), used for everything.
// Stored in the site (src/app/fonts) so builds never depend on Google Fonts. Latin character set,
// variable weights 200 to 800, from Google Fonts (v12); licence: PlusJakartaSans-OFL.txt (SIL Open Font Licence 1.1).
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-latin.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · Kitchen management made simple`,
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
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={jakarta.variable}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-accent-600 px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <ReleaseNotice />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
