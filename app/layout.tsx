// app/layout.tsx
import localFont from "next/font/local";
import {
  Bricolage_Grotesque,
  Fraunces,
  Great_Vibes,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Inter,
  JetBrains_Mono,
  Manrope,
  Oswald,
  Roboto,
  Roboto_Mono,
} from "next/font/google";
import "./globals.css";

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

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-mono",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
});

const ibmSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-sans",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-mono",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bricolage",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${apfelGrotezk.variable} ${manrope.variable} ${oswald.variable} ${roboto.variable} ${robotoMono.variable} ${inter.variable} ${jetbrains.variable} ${ibmSans.variable} ${ibmMono.variable} ${bricolage.variable} ${fraunces.variable} ${greatVibes.variable}`}
      style={{ ["--font-ibm-plex-mono" as string]: "var(--font-ibm-mono)" }}
    >
      <body className="bg-black text-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
