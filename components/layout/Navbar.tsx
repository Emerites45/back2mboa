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

/**
 * Nav chrome : gutter fixe (--page-gutter).
 * Pas d’adaptation par section au scroll — un chrome qui “respire”
 * avec le contenu attire l’œil et casse la confiance (Google / Amazon).
 */
export function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useLenis(() => {
    setScrolled(window.scrollY > 48);
  });

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
          "fixed top-0 right-0 left-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
          scrolled
            ? "border-white/10 bg-black/78 backdrop-blur-md"
            : "border-white/5 bg-black/36 backdrop-blur-[10px]",
        )}
      >
        <div
          className="mx-auto flex h-20 w-full max-w-[min(100%,92rem)] items-center justify-between"
          style={{
            paddingInline: "var(--page-gutter, clamp(1.25rem, 4vw, 3.5rem))",
          }}
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex h-10 items-center justify-center rounded-2xl bg-white px-2 py-1 sm:h-12 sm:rounded-[1.15rem] sm:px-2.5"
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

          <nav className="hidden items-center gap-5 text-[0.68rem] font-bold tracking-[0.12em] text-gray-200 uppercase lg:flex xl:gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="transition-colors duration-300 hover:text-amber-400"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              asChild
              className="rounded-full bg-[#ff6a00] px-4 py-4 text-[0.65rem] font-extrabold tracking-[0.04em] text-black uppercase transition-[background-color,transform] duration-300 hover:bg-[#ff7a1a] sm:px-6 sm:py-5 sm:text-xs"
            >
              <Link href="/inscription">
                S&apos;INSCRIRE <span aria-hidden="true">→</span>
              </Link>
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 flex-col justify-center gap-[5px] rounded-md bg-white/10 backdrop-blur-sm lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <span className="mx-auto block h-[2px] w-5 rounded bg-white" />
              <span className="mx-auto block h-[2px] w-5 rounded bg-white" />
              <span className="mx-auto block h-[2px] w-5 rounded bg-white" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/95 backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-[var(--page-gutter,1.25rem)] flex h-11 w-11 items-center justify-center rounded-full bg-white/10"
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

        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="text-2xl font-bold tracking-wider text-white/80 uppercase transition-colors duration-300 hover:text-amber-400"
            >
              {label}
            </Link>
          ))}

          <Button
            asChild
            className="mt-4 rounded-full bg-[#ff6a00] px-10 py-6 text-sm font-extrabold text-black uppercase hover:bg-[#ff7a1a]"
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
