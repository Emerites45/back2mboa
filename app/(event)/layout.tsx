import React from "react";
import { Navbar } from "@/components/layout/Navbar";
// app/layout.tsx ou fonts.ts
import { Bricolage_Grotesque, Poppins } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});
export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Navbar />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
