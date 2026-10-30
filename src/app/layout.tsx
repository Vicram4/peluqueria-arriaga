import type { Metadata, Viewport } from "next";
import { ConceptBanner } from "@/components/layout/concept-banner";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { business } from "@/content/business";
import { concept } from "@/content/concept";
import { ui } from "@/content/ui";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `${business.name} · ${business.address.city} ${concept.titleSuffix}`,
  description: `${concept.notice} ${business.logoPrefix} de ${business.audience.toLowerCase()} en ${business.address.street}, ${business.address.city}.`,
  authors: [{ name: concept.author.name, url: concept.author.url }],
  creator: concept.author.name,
  // Es un concepto: que ningún buscador lo indexe ni lo confunda con la web oficial.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export const viewport: Viewport = {
  themeColor: "#13261e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${fontVariables} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          {ui.skipToContent}
        </a>
        <ConceptBanner />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}
