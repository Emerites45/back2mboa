"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      lenis?.scrollTo(href, { offset: 0 });
    },
    [lenis],
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setMobileOpen(false);
      lenis?.scrollTo(0);
    },
    [lenis],
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-300",
          scrolled
            ? "bg-black/80 backdrop-blur-md"
            : "bg-black/40 backdrop-blur-md",
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center justify-center rounded-lg bg-white px-1 py-1 h-10 sm:h-12"
          >
            <Image
              src="/images/logo.png"
              alt="Back2Mboa"
              width={120}
              height={32}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
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

          <div className="flex items-center gap-3">
            {/* CTA Button */}
            <Button
              asChild
              className="bg-amber-400 hover:bg-amber-500 text-black font-extrabold uppercase text-[0.65rem] px-4 py-4 rounded-md sm:text-xs sm:px-6 sm:py-5"
            >
              <Link href="/inscription">S&apos;INSCRIRE →</Link>
            </Button>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex lg:hidden flex-col justify-center gap-[5px] w-10 h-10 rounded-md bg-white/10 backdrop-blur-sm"
              aria-label="Ouvrir le menu"
            >
              <span className="block h-[2px] w-5 mx-auto rounded bg-white" />
              <span className="block h-[2px] w-5 mx-auto rounded bg-white" />
              <span className="block h-[2px] w-5 mx-auto rounded bg-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/95 backdrop-blur-md transition-all duration-300 lg:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10"
          aria-label="Fermer le menu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-5 w-5 text-white"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Nav links */}
        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="text-2xl font-bold uppercase tracking-wider text-white/80 transition-colors hover:text-amber-400"
            >
              {label}
            </Link>
          ))}

          <Button
            asChild
            className="mt-4 bg-amber-400 hover:bg-amber-500 text-black font-extrabold uppercase text-sm px-10 py-6 rounded-md"
          >
            <Link href="/inscription" onClick={() => setMobileOpen(false)}>
              S&apos;INSCRIRE →
            </Link>
          </Button>
        </nav>
      </div>
    </>
  );
}
