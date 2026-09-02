"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#contraste", label: "Le Problème" },
  { href: "#methode", label: "La Méthode" },
  { href: "#modele", label: "Les Secteurs" },
  { href: "#team", label: "L'Équipe" },
  { href: "#potentialites", label: "Le Territoire" },
  { href: "#resultats", label: "Les Résultats" },
  { href: "#agenda", label: "L'Événement" },
] as const;

export function Navbar() {
  const lenis = useLenis();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      lenis?.scrollTo(href, { offset: 0 });
    },
    [lenis],
  );

  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    lenis?.scrollTo(0);
  }, [lenis]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center justify-center bg-white rounded-lg px-1 py-1 h-12"
        >
          <Image
            src="/images/logo.png"
            alt="Back2Mboa"
            width={120}
            height={32}
            className="object-contain"
            priority
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-200">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="hover:text-amber-400 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div
          className={`transition-opacity duration-300 ${pastHero ? "pointer-events-none opacity-0" : "opacity-100"}`}
          aria-hidden={!pastHero ? undefined : true}
        >
          <Button
            asChild
            className="bg-amber-400 hover:bg-amber-500 text-black font-extrabold uppercase text-xs px-6 py-5 rounded-md"
          >
            <Link href="/inscription">Je m&apos;inscris</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
