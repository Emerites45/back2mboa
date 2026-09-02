"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.webp"
            alt="Back2Mboa"
            width={120}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-200">
          <Link href="#plateforme" className="hover:text-amber-400 transition-colors">
  La Plateforme
</Link>
          <Link href="#secteurs" className="hover:text-amber-400 transition-colors">
            Secteurs
          </Link>
          <Link href="#acteurs" className="hover:text-amber-400 transition-colors">
            Acteurs
          </Link>
          <Link href="#double-flux" className="hover:text-amber-400 transition-colors">
            Double Flux
          </Link>
          <Link href="#evenement" className="hover:text-amber-400 transition-colors">
            L’Événement
          </Link>
          <Link href="#unlock-millions" className="hover:text-amber-400 transition-colors">
            Unlock Millions™
          </Link>
          <Link href="#digital-twin" className="hover:text-amber-400 transition-colors">
            Digital Twin™
          </Link>
        </nav>

        {/* CTA Button */}
        <div>
          <Button
            asChild
            className="bg-amber-400 hover:bg-amber-500 text-black font-extrabold uppercase text-xs px-6 py-5 rounded-md"
          >
            <Link href="/inscription">Je m’inscris</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
