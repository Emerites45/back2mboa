// app/layout.tsx
import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://back2mboa.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Back2Mboa | Les bâtisseurs-solutionneurs",
    template: "%s | Back2Mboa",
  },
  description:
    "Back2Mboa connecte les compétences locales camerounaises aux capitaux internationaux pour accélérer les projets territoriaux.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Back2Mboa",
    title: "Back2Mboa | Les bâtisseurs-solutionneurs",
    description:
      "Un rendez-vous pour connecter mairies, diaspora, investisseurs et partenaires au Cameroun.",
    url: "/",
    images: [{ url: "/images/logo-monochrome.webp", width: 200, height: 71 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Back2Mboa | Les bâtisseurs-solutionneurs",
    description:
      "Connecter les compétences locales camerounaises aux capitaux internationaux.",
    images: ["/images/logo-monochrome.webp"],
  },
  icons: { icon: "/favicon.ico" },
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
        {children}
      </body>
    </html>
  );
}
