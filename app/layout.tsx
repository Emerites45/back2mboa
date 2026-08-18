// app/layout.tsx
import { Manrope, Oswald } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${oswald.variable}`}>
      <body className="bg-black text-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}