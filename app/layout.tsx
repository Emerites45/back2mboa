// app/layout.tsx
import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";
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
