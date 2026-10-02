// app/layout.tsx
import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://back2mboa.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Back2Mboa | Les bâtisseurs-solutionneurs",
    template: "%s | Back2Mboa",
  },
  description:
    "Back2Mboa connecte les compétences locales camerounaises aux capitaux internationaux pour accélérer les projets territoriaux.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Back2Mboa",
    title: "Back2Mboa | Les bâtisseurs-solutionneurs",
    description:
      "Un rendez-vous pour connecter mairies, diaspora, investisseurs et partenaires au Cameroun.",
    url: "/",
    images: [
      {
        url: "/images/og-default.webp",
        width: 1280,
        height: 720,
        alt: "Back2Mboa — bâtisseurs-solutionneurs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Back2Mboa | Les bâtisseurs-solutionneurs",
    description:
      "Connecter les compétences locales camerounaises aux capitaux internationaux.",
    images: ["/images/og-default.webp"],
  },
  icons: { icon: "/favicon.ico" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Back2Mboa",
      url: siteUrl,
      logo: `${siteUrl}/images/logo.webp`,
      description:
        "Back2Mboa connecte les compétences locales camerounaises aux capitaux internationaux pour accélérer les projets territoriaux.",
      inLanguage: "fr-FR",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Back2Mboa",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "fr-FR",
    },
    {
      "@type": "Event",
      "@id": `${siteUrl}/#event`,
      name: "Back2Mboa",
      description:
        "Un rendez-vous pour connecter mairies, diaspora, investisseurs et partenaires au Cameroun.",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      startDate: "2026-12-16",
      endDate: "2026-12-18",
      image: [`${siteUrl}/images/og-default.webp`],
      organizer: { "@id": `${siteUrl}/#organization` },
      url: siteUrl,
      inLanguage: "fr-FR",
    },
  ],
};

const apfelGrotezk = localFont({
  src: [
    {
      path: "../public/fonts/apfel-grotezk/apfel-grotezk-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/apfel-grotezk/apfel-grotezk-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-apfel-grotezk",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${apfelGrotezk.variable} ${robotoMono.variable}`}>
      <body className="bg-black text-white font-sans antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
