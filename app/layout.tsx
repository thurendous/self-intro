import type { Metadata } from "next";
import { resolveSiteConfig } from "@/lib/site.mjs";
import { contactLinks } from "@/lib/siteData";
import { translations } from "@/lib/translations";
import "./globals.css";

const { canonicalUrl } = resolveSiteConfig(process.env);
const en = translations.en.meta;

export const metadata: Metadata = {
  title: en.title,
  description: en.description,
  ...(canonicalUrl
    ? {
        alternates: { canonical: canonicalUrl },
        openGraph: { title: en.title, description: en.description, url: canonicalUrl, type: "website" },
      }
    : {}),
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mark Wu",
  jobTitle: "Blockchain engineer",
  homeLocation: { "@type": "Place", name: "Tokyo, Japan" },
  ...(canonicalUrl ? { url: canonicalUrl } : {}),
  sameAs: contactLinks.map((link) => link.url),
};

const personJson = JSON.stringify(person).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <noscript>
          <style>{".site-nav{display:block!important}.menu-toggle{display:none!important}"}</style>
        </noscript>
      </head>
      <body>
        {children}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: build-time constants only, "<" escaped */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJson }} />
      </body>
    </html>
  );
}
